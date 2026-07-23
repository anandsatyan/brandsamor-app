import { getBrandsamorFromAddress, sendBrandsamorMail } from '../mail/smtp.mjs';

const SITE_URL = (process.env.VITE_SITE_URL || 'https://www.brandsamor.com').replace(/\/$/, '');
const SCHEDULE_URL = `${SITE_URL}/schedule-a-call`;
const EMAIL_TYPE = 'exploratory_call_invite';

/** Delay after lead capture so customers can finish the wizard first. */
export const EXPLORATORY_CALL_INVITE_DELAY_MS = 10 * 60 * 1000;

let dispatchIndexEnsured = false;

async function getMongoDb() {
  // Lazy-load so buildExploratoryCallInviteEmail can run without DB env (test scripts).
  const { getMongoDb: loadDb } = await import('../db/mongo.mjs');
  return loadDb();
}

async function ensureEmailDispatchIndexes() {
  if (dispatchIndexEnsured) return;
  const db = await getMongoDb();
  await db.collection('emailDispatch').createIndexes([
    {
      key: { type: 1, email: 1 },
      unique: true,
      name: 'uniq_type_email',
    },
  ]);
  dispatchIndexEnsured = true;
}

function firstNameFrom(fullName) {
  return (
    String(fullName ?? '')
      .trim()
      .split(/\s+/)[0] || ''
  );
}

/**
 * Plain-text exploratory-call invite.
 * Text-only (no HTML part) to improve inbox delivery vs. marketing HTML.
 */
export function buildExploratoryCallInviteEmail({ fullName, email }) {
  const firstName = firstNameFrom(fullName);
  const greeting = firstName ? `Hi ${firstName},` : 'Hi there,';

  // Personalized, low-pressure subject — under ~50 chars for mobile preview.
  const subject = firstName
    ? `${firstName}, a short call when you're ready`
    : `A short call when you're ready`;

  const text = [
    greeting,
    '',
    'Thanks for sharing your details with Brandsamor.',
    '',
    "Whenever it suits you, you're welcome to book a short exploratory call. We can talk through sampling, production, and a sensible next step — even if you're still early.",
    '',
    'Pick a time here:',
    SCHEDULE_URL,
    '',
    'Or just reply to this email if you prefer to write first.',
    '',
    '— Brandsamor',
    'info@brandsamor.com',
  ].join('\n');

  return {
    subject,
    text,
    to: email,
    from: getBrandsamorFromAddress(),
  };
}

/**
 * Schedule the exploratory-call invite ~10 minutes after lead capture.
 * At most once per email address for life of that address.
 * Safe to call on every lead upsert — never throws.
 */
export async function maybeSendExploratoryCallInviteOnce({ sessionId, lead }) {
  const email = String(lead?.email ?? '')
    .trim()
    .toLowerCase();
  if (!email || !email.includes('@') || !sessionId) {
    return { ok: false, skipped: true, reason: 'missing_email_or_session' };
  }

  const db = await getMongoDb();
  try {
    await ensureEmailDispatchIndexes();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[exploratory-call-invite] Failed to ensure indexes:', message);
  }

  // Already claimed / sent for this email — never schedule again.
  const existingDispatch = await db.collection('emailDispatch').findOne({
    type: EMAIL_TYPE,
    email,
  });
  if (existingDispatch) {
    return { ok: true, skipped: true, reason: 'already_claimed_or_sent' };
  }

  // Another session may already be waiting to send for this email.
  const existingSchedule = await db.collection('samplingSessions').findOne({
    'emails.exploratoryCallInvite.email': email,
    'emails.exploratoryCallInvite.status': { $in: ['scheduled', 'sending', 'sent'] },
  });
  if (existingSchedule) {
    return { ok: true, skipped: true, reason: 'already_scheduled_or_sent' };
  }

  const now = new Date();
  const sendAt = new Date(now.getTime() + EXPLORATORY_CALL_INVITE_DELAY_MS);

  await db.collection('samplingSessions').updateOne(
    {
      sessionId,
      $or: [
        { 'emails.exploratoryCallInvite': { $exists: false } },
        {
          'emails.exploratoryCallInvite.status': {
            $in: ['failed', 'skipped_no_email'],
          },
        },
      ],
    },
    {
      $set: {
        'emails.exploratoryCallInvite': {
          status: 'scheduled',
          email,
          scheduledAt: now,
          sendAt,
          fullName: String(lead?.fullName ?? '').trim() || null,
        },
        updatedAt: now,
      },
    },
  );

  return { ok: true, sendAt };
}

/**
 * Send due exploratory-call invites scheduled after lead capture.
 */
export async function processDueExploratoryCallInvites({ limit = 25 } = {}) {
  const db = await getMongoDb();
  try {
    await ensureEmailDispatchIndexes();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn('[exploratory-call-invite] index ensure failed:', message);
  }

  const now = new Date();
  const due = await db
    .collection('samplingSessions')
    .find({
      'emails.exploratoryCallInvite.status': 'scheduled',
      'emails.exploratoryCallInvite.sendAt': { $lte: now },
    })
    .sort({ 'emails.exploratoryCallInvite.sendAt': 1 })
    .limit(Math.min(Math.max(limit, 1), 100))
    .toArray();

  let sent = 0;
  let failed = 0;
  let skipped = 0;

  for (const doc of due) {
    const email = String(doc.emails?.exploratoryCallInvite?.email || doc.lead?.email || '')
      .trim()
      .toLowerCase();
    if (!email || !email.includes('@')) {
      await db.collection('samplingSessions').updateOne(
        { sessionId: doc.sessionId },
        {
          $set: {
            'emails.exploratoryCallInvite.status': 'skipped_no_email',
            updatedAt: new Date(),
          },
        },
      );
      skipped += 1;
      continue;
    }

    try {
      await db.collection('emailDispatch').insertOne({
        type: EMAIL_TYPE,
        email,
        sessionId: doc.sessionId,
        status: 'sending',
        claimedAt: new Date(),
      });
    } catch (error) {
      if (error?.code === 11000) {
        await db.collection('samplingSessions').updateOne(
          { sessionId: doc.sessionId },
          {
            $set: {
              'emails.exploratoryCallInvite.status': 'already_sent',
              updatedAt: new Date(),
            },
          },
        );
        skipped += 1;
        continue;
      }
      failed += 1;
      continue;
    }

    try {
      const content = buildExploratoryCallInviteEmail({
        fullName: doc.emails?.exploratoryCallInvite?.fullName || doc.lead?.fullName,
        email,
      });
      const result = await sendBrandsamorMail({
        to: email,
        subject: content.subject,
        text: content.text,
        replyTo: 'info@brandsamor.com',
        from: content.from,
      });

      const sentAt = new Date();
      await db.collection('emailDispatch').updateOne(
        { type: EMAIL_TYPE, email },
        {
          $set: {
            status: 'sent',
            sentAt,
            mode: result.mode,
            sessionId: doc.sessionId,
          },
        },
      );
      await db.collection('samplingSessions').updateOne(
        { sessionId: doc.sessionId },
        {
          $set: {
            'emails.exploratoryCallInvite.status': 'sent',
            'emails.exploratoryCallInvite.sentAt': sentAt,
            'emails.exploratoryCallInvite.mode': result.mode,
            'emails.exploratoryCallInvite.to': email,
            updatedAt: sentAt,
          },
        },
      );
      sent += 1;
      const masked = email.replace(/(.{2}).+(@.+)/, '$1***$2');
      console.log(`[exploratory-call-invite] ${result.mode} to ${masked}`);
    } catch (error) {
      await db.collection('emailDispatch').deleteOne({ type: EMAIL_TYPE, email }).catch(() => {});
      const message = error instanceof Error ? error.message : String(error);
      await db.collection('samplingSessions').updateOne(
        { sessionId: doc.sessionId },
        {
          $set: {
            'emails.exploratoryCallInvite.status': 'failed',
            'emails.exploratoryCallInvite.lastError': message.slice(0, 500),
            updatedAt: new Date(),
          },
        },
      );
      failed += 1;
      console.error('[exploratory-call-invite] Failed to send:', message);
    }
  }

  return { ok: true, processed: due.length, sent, failed, skipped };
}

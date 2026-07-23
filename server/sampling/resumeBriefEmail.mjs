import { getBrandsamorFromAddress, sendBrandsamorMail } from '../mail/smtp.mjs';

const SITE_URL = (process.env.VITE_SITE_URL || 'https://www.brandsamor.com').replace(/\/$/, '');
const RESUME_URL = `${SITE_URL}/curated-sampling`;
const EMAIL_TYPE = 'sampling_resume_brief';

/** Best default: 2 hours — still in-context, not immediate nag. */
export const RESUME_EMAIL_DELAY_MS = 2 * 60 * 60 * 1000;

export function isResumeEmailSendingEnabled() {
  return String(process.env.SAMPLING_RESUME_EMAIL_ENABLED || '')
    .trim()
    .toLowerCase() === 'true';
}

function firstNameFrom(fullName) {
  return (
    String(fullName ?? '')
      .trim()
      .split(/\s+/)[0] || ''
  );
}

/**
 * Plain-text resume email after Save + exit.
 * Text-only for deliverability (same pattern as exploratory-call invite).
 */
export function buildResumeBriefEmail({ fullName, email, atStepLabel } = {}) {
  const firstName = firstNameFrom(fullName);
  const greeting = firstName ? `Hi ${firstName},` : 'Hi there,';
  const subject = firstName
    ? `${firstName}, your fragrance brief is saved`
    : `Your fragrance brief is saved`;

  const stepLine = atStepLabel
    ? `You left off around: ${atStepLabel}.`
    : `Your sampling brief is saved whenever you're ready to continue.`;

  const text = [
    greeting,
    '',
    'You saved your Brandsamor sampling brief — nothing is lost.',
    '',
    stepLine,
    '',
    'When you have a few minutes, pick up where you left off and finish your curated five-fragrance kit:',
    RESUME_URL,
    '',
    'Your kit is built from your answers (not a generic set). Completing it is the fastest way to compare directions on skin before production.',
    '',
    'Questions? Just reply to this email.',
    '',
    '— Brandsamor',
    'info@brandsamor.com',
  ].join('\n');

  return {
    subject,
    text,
    to: email,
    from: getBrandsamorFromAddress(),
    resumeUrl: RESUME_URL,
  };
}

const STEP_LABELS = {
  0: 'Welcome',
  1: 'Contact details',
  2: 'Brand stage',
  3: 'Scent direction',
  4: 'Intensity & use',
  5: 'Preferences',
  6: 'Review',
  7: 'Curation',
  8: 'Your five fragrances',
  9: 'Complete',
  10: 'Checkout',
};

export function labelForSamplingStep(step) {
  if (typeof step === 'number' && STEP_LABELS[step]) return STEP_LABELS[step];
  const key = String(step ?? '').trim();
  if (!key) return null;
  return key.replace(/_/g, ' ');
}

/**
 * Schedule a resume email for a future save+exit.
 * Never backfills older leads — only called when a new save_exit is recorded.
 * Sending stays off until SAMPLING_RESUME_EMAIL_ENABLED=true.
 */
export async function scheduleResumeBriefEmail({ sessionId, lead, atStep } = {}) {
  const email = String(lead?.email ?? '')
    .trim()
    .toLowerCase();
  if (!sessionId || !email || !email.includes('@')) {
    return { ok: false, skipped: true, reason: 'missing_email_or_session' };
  }

  const { getMongoDb } = await import('../db/mongo.mjs');
  const db = await getMongoDb();
  const now = new Date();
  const sendAt = new Date(now.getTime() + RESUME_EMAIL_DELAY_MS);

  await db.collection('samplingSessions').updateOne(
    {
      sessionId,
      // Don't reschedule if already sent or already waiting for this exit.
      $or: [
        { 'emails.resumeBrief': { $exists: false } },
        { 'emails.resumeBrief.status': { $in: ['scheduled', 'skipped_disabled', 'failed'] } },
      ],
    },
    {
      $set: {
        'emails.resumeBrief': {
          status: 'scheduled',
          email,
          scheduledAt: now,
          sendAt,
          atStep: typeof atStep === 'number' ? atStep : null,
          atStepLabel: labelForSamplingStep(atStep),
          sendingEnabledAtSchedule: isResumeEmailSendingEnabled(),
        },
        updatedAt: now,
      },
    },
  );

  return { ok: true, sendAt, enabled: isResumeEmailSendingEnabled() };
}

let dispatchIndexEnsured = false;

async function ensureResumeDispatchIndexes(db) {
  if (dispatchIndexEnsured) return;
  await db.collection('emailDispatch').createIndexes([
    {
      key: { type: 1, email: 1, sessionId: 1 },
      unique: true,
      name: 'uniq_resume_type_email_session',
      partialFilterExpression: { type: EMAIL_TYPE },
    },
  ]);
  dispatchIndexEnsured = true;
}

/**
 * Send due resume emails for sessions scheduled by new save+exit events only.
 * No-op when SAMPLING_RESUME_EMAIL_ENABLED is not true.
 */
export async function processDueResumeBriefEmails({ limit = 25 } = {}) {
  if (!isResumeEmailSendingEnabled()) {
    return { ok: true, skipped: true, reason: 'sending_disabled', processed: 0 };
  }

  const { getMongoDb } = await import('../db/mongo.mjs');
  const db = await getMongoDb();
  try {
    await ensureResumeDispatchIndexes(db);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn('[resume-brief] index ensure failed:', message);
  }

  const now = new Date();
  const due = await db
    .collection('samplingSessions')
    .find({
      'emails.resumeBrief.status': 'scheduled',
      'emails.resumeBrief.sendAt': { $lte: now },
      status: { $nin: ['paid', 'canceled'] },
    })
    .sort({ 'emails.resumeBrief.sendAt': 1 })
    .limit(Math.min(Math.max(limit, 1), 100))
    .toArray();

  let sent = 0;
  let failed = 0;

  for (const doc of due) {
    const email = String(doc.emails?.resumeBrief?.email || doc.lead?.email || '')
      .trim()
      .toLowerCase();
    if (!email) {
      await db.collection('samplingSessions').updateOne(
        { sessionId: doc.sessionId },
        { $set: { 'emails.resumeBrief.status': 'skipped_no_email', updatedAt: new Date() } },
      );
      continue;
    }

    // Skip if they already paid/progressed to checkout payment success path.
    if (doc.status === 'paid' || doc.order?.sampleOrderNumber != null) {
      await db.collection('samplingSessions').updateOne(
        { sessionId: doc.sessionId },
        { $set: { 'emails.resumeBrief.status': 'skipped_ordered', updatedAt: new Date() } },
      );
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
          { $set: { 'emails.resumeBrief.status': 'already_sent', updatedAt: new Date() } },
        );
        continue;
      }
      failed += 1;
      continue;
    }

    try {
      const content = buildResumeBriefEmail({
        fullName: doc.lead?.fullName,
        email,
        atStepLabel: doc.emails?.resumeBrief?.atStepLabel,
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
        { type: EMAIL_TYPE, email, sessionId: doc.sessionId },
        { $set: { status: 'sent', sentAt, mode: result.mode } },
      );
      await db.collection('samplingSessions').updateOne(
        { sessionId: doc.sessionId },
        {
          $set: {
            'emails.resumeBrief.status': 'sent',
            'emails.resumeBrief.sentAt': sentAt,
            'emails.resumeBrief.mode': result.mode,
            updatedAt: sentAt,
          },
        },
      );
      sent += 1;
      const masked = email.replace(/(.{2}).+(@.+)/, '$1***$2');
      console.log(`[resume-brief] ${result.mode} to ${masked}`);
    } catch (error) {
      await db.collection('emailDispatch').deleteOne({
        type: EMAIL_TYPE,
        email,
        sessionId: doc.sessionId,
      }).catch(() => {});
      const message = error instanceof Error ? error.message : String(error);
      await db.collection('samplingSessions').updateOne(
        { sessionId: doc.sessionId },
        {
          $set: {
            'emails.resumeBrief.status': 'failed',
            'emails.resumeBrief.lastError': message.slice(0, 500),
            updatedAt: new Date(),
          },
        },
      );
      failed += 1;
      console.error('[resume-brief] send failed:', message);
    }
  }

  return { ok: true, processed: due.length, sent, failed };
}

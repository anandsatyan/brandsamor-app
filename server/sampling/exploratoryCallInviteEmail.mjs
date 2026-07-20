import { getBrandsamorFromAddress, sendBrandsamorMail } from '../mail/smtp.mjs';

const SITE_URL = (process.env.VITE_SITE_URL || 'https://www.brandsamor.com').replace(/\/$/, '');
const SCHEDULE_URL = `${SITE_URL}/schedule-a-call`;
const EMAIL_TYPE = 'exploratory_call_invite';

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
 * Send the exploratory-call invite at most once per email address.
 * Safe to call on every lead upsert — duplicate key claim prevents resends.
 * Never throws.
 */
export async function maybeSendExploratoryCallInviteOnce({ sessionId, lead }) {
  const email = String(lead?.email ?? '')
    .trim()
    .toLowerCase();
  if (!email || !email.includes('@')) {
    return { ok: false, skipped: true, reason: 'missing_email' };
  }

  const db = await getMongoDb();
  try {
    await ensureEmailDispatchIndexes();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[exploratory-call-invite] Failed to ensure indexes:', message);
  }

  try {
    await db.collection('emailDispatch').insertOne({
      type: EMAIL_TYPE,
      email,
      sessionId: sessionId || null,
      status: 'sending',
      claimedAt: new Date(),
    });
  } catch (error) {
    if (error?.code === 11000) {
      return { ok: true, skipped: true, reason: 'already_sent' };
    }
    const message = error instanceof Error ? error.message : String(error);
    console.error('[exploratory-call-invite] Failed to claim send slot:', message);
    return { ok: false, error: message };
  }

  try {
    const content = buildExploratoryCallInviteEmail({
      fullName: lead?.fullName,
      email,
    });
    const result = await sendBrandsamorMail({
      to: email,
      subject: content.subject,
      text: content.text,
      // Intentionally omit html — multipart HTML invites look more like marketing spam.
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
          sessionId: sessionId || null,
        },
      },
    );

    if (sessionId) {
      await db.collection('samplingSessions').updateOne(
        { sessionId },
        {
          $set: {
            'emails.exploratoryCallInvite': {
              sentAt,
              mode: result.mode,
              to: email,
            },
          },
        },
      );
    }

    const masked = email.replace(/(.{2}).+(@.+)/, '$1***$2');
    console.log(`[exploratory-call-invite] ${result.mode} to ${masked}`);
    return { ok: true, mode: result.mode };
  } catch (error) {
    // Release claim so a later upsert can retry.
    await db.collection('emailDispatch').deleteOne({ type: EMAIL_TYPE, email }).catch(() => {});
    const message = error instanceof Error ? error.message : String(error);
    console.error('[exploratory-call-invite] Failed to send:', message);
    return { ok: false, error: message };
  }
}

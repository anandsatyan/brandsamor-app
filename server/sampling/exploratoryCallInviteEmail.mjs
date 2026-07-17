import { getMongoDb } from '../db/mongo.mjs';
import { getBrandsamorFromAddress, sendBrandsamorMail } from '../mail/smtp.mjs';

const SITE_URL = (process.env.VITE_SITE_URL || 'https://www.brandsamor.com').replace(/\/$/, '');
const SCHEDULE_URL = `${SITE_URL}/schedule-a-call`;
const LOGO_URL = `${SITE_URL}/brandsamor-neue-logo.png`;
const EMAIL_TYPE = 'exploratory_call_invite';

const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

let dispatchIndexEnsured = false;

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

export function buildExploratoryCallInviteEmail({ fullName, email }) {
  const firstName =
    String(fullName ?? '')
      .trim()
      .split(/\s+/)[0] || 'there';
  const subject = 'Book an exploratory call with Brandsamor';

  const text = [
    `Hi ${firstName},`,
    '',
    'Thanks for reaching out to Brandsamor. We’ve received your details and we’re glad you’re here.',
    '',
    'Whenever you’re ready, you can book a short exploratory call with our team. We’ll listen to where you are, answer questions about sampling and production, and help you figure out a sensible next step — even if you’re still early and don’t have a brand name yet.',
    '',
    'Schedule a call:',
    SCHEDULE_URL,
    '',
    'Pick a time that works for you. Prefer email for now? Just reply to this message.',
    '',
    'With care,',
    'Brandsamor Team',
    'info@brandsamor.com',
    SITE_URL,
  ].join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin: 0; padding: 0; background: #f3efe3;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #f3efe3; padding: 32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background: #faf7f2; border: 1px solid #e8e0d8;">
          <tr>
            <td style="height: 3px; background: linear-gradient(90deg, #ff5c00 0%, rgba(255,92,0,0.35) 55%, transparent 100%); font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding: 28px 28px 8px 28px; text-align: center;">
              <img src="${escapeHtml(LOGO_URL)}" alt="Brandsamor" width="140" height="48" style="display: inline-block; height: auto; max-width: 140px; border: 0;" />
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 28px 0 28px; text-align: center;">
              <p style="margin: 0 0 10px 0; font-family: Arial, Helvetica, sans-serif; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: #ff5c00; font-weight: 700;">
                Exploratory call
              </p>
              <h1 style="margin: 0 0 12px 0; font-family: Georgia, 'Times New Roman', serif; font-size: 30px; line-height: 1.15; color: #2b180a; font-weight: 400;">
                Let’s explore your fragrance idea together
              </h1>
              <p style="margin: 0 auto; max-width: 460px; font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.6; color: #725f52;">
                Hi ${escapeHtml(firstName)} — thanks for reaching out to Brandsamor. We’ve received your details and we’re glad you’re here.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 28px 28px 8px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #ffffff; border: 1px solid #e8e0d8; border-radius: 4px;">
                <tr>
                  <td style="padding: 22px;">
                    <p style="margin: 0 0 14px 0; font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.65; color: #2b180a;">
                      Whenever you’re ready, you can book a short exploratory call with our team. We’ll listen to where you are, answer questions about sampling and production, and help you figure out a sensible next step — even if you’re still early and don’t have a brand name yet.
                    </p>
                    <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 8px auto 0 auto;">
                      <tr>
                        <td style="background: #2b180a; border-radius: 2px;">
                          <a href="${escapeHtml(SCHEDULE_URL)}" style="display: inline-block; padding: 14px 22px; font-family: Arial, Helvetica, sans-serif; font-size: 14px; font-weight: 700; color: #ffffff; text-decoration: none;">
                            Schedule a call
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin: 18px 0 0 0; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.6; color: #725f52;">
                      Or open this link:<br/>
                      <a href="${escapeHtml(SCHEDULE_URL)}" style="color: #ff5c00; text-decoration: none; word-break: break-all;">${escapeHtml(SCHEDULE_URL)}</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 28px 28px 28px;">
              <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.6; color: #725f52;">
                Prefer email for now? Just reply to this message.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 28px 32px 28px; border-top: 1px solid #e8e0d8;">
              <p style="margin: 24px 0 4px 0; font-family: Georgia, 'Times New Roman', serif; font-size: 18px; color: #2b180a;">
                Brandsamor Team
              </p>
              <p style="margin: 0 0 4px 0; font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: #725f52;">
                <a href="mailto:info@brandsamor.com" style="color: #725f52; text-decoration: none;">info@brandsamor.com</a>
              </p>
              <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 13px;">
                <a href="${escapeHtml(SITE_URL)}" style="color: #ff5c00; text-decoration: none;">${escapeHtml(SITE_URL.replace(/^https?:\/\//, ''))}</a>
              </p>
            </td>
          </tr>
        </table>
        <p style="margin: 18px 0 0 0; font-family: Arial, Helvetica, sans-serif; font-size: 11px; color: #94877c; text-align: center;">
          This note was sent to ${escapeHtml(email || 'you')} after you shared your contact details with Brandsamor.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return {
    subject,
    text,
    html,
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
      html: content.html,
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

    console.log(`[exploratory-call-invite] ${result.mode} to ${email}`);
    return { ok: true, mode: result.mode };
  } catch (error) {
    // Release claim so a later upsert can retry.
    await db.collection('emailDispatch').deleteOne({ type: EMAIL_TYPE, email }).catch(() => {});
    const message = error instanceof Error ? error.message : String(error);
    console.error('[exploratory-call-invite] Failed to send:', message);
    return { ok: false, error: message };
  }
}

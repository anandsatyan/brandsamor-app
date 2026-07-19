import { sendBrandsamorMail } from '../mail/smtp.mjs';

export async function sendMagicLinkEmail({ to, magicUrl, expiresMinutes = 30 }) {
  const subject = 'Your Brandsamor sign-in link';
  const text = [
    'Sign in to Brandsamor to resume your scent projects and curated sampling on any device.',
    '',
    `Open this link (expires in ${expiresMinutes} minutes):`,
    magicUrl,
    '',
    'If you did not request this, you can ignore this email.',
  ].join('\n');

  const html = `
    <div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;color:#1c1917;line-height:1.5">
      <p style="font-size:14px;letter-spacing:0.12em;text-transform:uppercase;color:#78716c;margin:0 0 16px">Brandsamor</p>
      <h1 style="font-size:28px;font-weight:normal;margin:0 0 12px">Sign in to continue</h1>
      <p style="font-size:16px;margin:0 0 20px">Resume your scent projects and curated sampling on any device.</p>
      <p style="margin:0 0 28px">
        <a href="${magicUrl}" style="display:inline-block;background:#1c1917;color:#fffdfc;text-decoration:none;padding:12px 20px;border-radius:2px;font-size:14px;font-weight:600">
          Continue where you left off
        </a>
      </p>
      <p style="font-size:13px;color:#78716c;margin:0 0 8px">This link expires in ${expiresMinutes} minutes.</p>
      <p style="font-size:12px;color:#a8a29e;margin:0;word-break:break-all">${magicUrl}</p>
    </div>
  `;

  return sendBrandsamorMail({ to, subject, text, html });
}

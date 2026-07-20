import nodemailer from 'nodemailer';

export function createSmtpTransport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user, pass },
  });
}

export function getBrandsamorFromAddress() {
  const email =
    process.env.SMTP_FROM_EMAIL ||
    process.env.SMTP_FROM ||
    process.env.SMTP_USER ||
    'info@brandsamor.com';
  const name = process.env.SMTP_FROM_NAME || 'Brandsamor Team';
  // If SMTP_FROM already includes a display name, use it as-is.
  if (String(email).includes('<')) return email;
  return `"${name}" <${email}>`;
}

/**
 * @returns {Promise<{ ok: boolean, mode: 'email' | 'logged', error?: string }>}
 */
export async function sendBrandsamorMail({ to, subject, text, html, replyTo, from }) {
  const transport = createSmtpTransport();
  const resolvedFrom = from || getBrandsamorFromAddress();

  if (!transport) {
    console.log(`[mail] SMTP not configured — logged only\nTo: ${to}\nSubject: ${subject}\n\n${text}`);
    return { ok: true, mode: 'logged' };
  }

  // Omit html when unset so the message is true text/plain (better deliverability
  // than multipart alternative with a marketing HTML part).
  const mail = {
    from: resolvedFrom,
    to,
    replyTo,
    subject,
    text,
  };
  if (html) {
    mail.html = html;
  }

  await transport.sendMail(mail);

  return { ok: true, mode: 'email' };
}

/**
 * Sends a test plain-text exploratory-call invite email.
 * Usage: node scripts/email/send-exploratory-call-invite-test.mjs [toEmail] [fullName]
 */
import 'dotenv/config';
import { buildExploratoryCallInviteEmail } from '../../server/sampling/exploratoryCallInviteEmail.mjs';
import { createSmtpTransport, sendBrandsamorMail } from '../../server/mail/smtp.mjs';

const toEmail = String(process.argv[2] || 'anand.satyan@gmail.com').trim().toLowerCase();
const fullName = String(process.argv[3] || 'Anand Satyan').trim();

const content = buildExploratoryCallInviteEmail({
  fullName,
  email: toEmail,
});

if (!createSmtpTransport()) {
  console.error(`
SMTP is not configured in .env — cannot send the test email.

Add these (for info@brandsamor.com) and re-run:
  SMTP_HOST=...
  SMTP_PORT=587
  SMTP_SECURE=false
  SMTP_USER=info@brandsamor.com
  SMTP_PASS=...
  SMTP_FROM_EMAIL=info@brandsamor.com
  SMTP_FROM_NAME=Brandsamor Team

Then:
  node scripts/email/send-exploratory-call-invite-test.mjs anand.satyan@gmail.com "Anand Satyan"
`);
  console.log('\n--- Preview (text/plain) ---');
  console.log('From:', content.from);
  console.log('To:', toEmail);
  console.log('Subject:', `[TEST] ${content.subject}`);
  console.log('');
  console.log(content.text);
  process.exit(1);
}

const result = await sendBrandsamorMail({
  to: toEmail,
  subject: `[TEST] ${content.subject}`,
  text: content.text,
  replyTo: 'info@brandsamor.com',
  from: content.from,
});

console.log('Sent:', result);
console.log('To:', toEmail);
console.log('From:', content.from);
console.log('Subject:', `[TEST] ${content.subject}`);
console.log('\n--- Body ---');
console.log(content.text);

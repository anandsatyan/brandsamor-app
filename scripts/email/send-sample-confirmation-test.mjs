/**
 * Sends a test customer sample-order confirmation email.
 * Usage: node scripts/email/send-sample-confirmation-test.mjs [toEmail]
 */
import 'dotenv/config';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildCustomerOrderConfirmationEmail } from '../../server/sampling/customerOrderConfirmationEmail.mjs';
import { createSmtpTransport, sendBrandsamorMail } from '../../server/mail/smtp.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const importJson = JSON.parse(
  readFileSync(path.resolve(root, 'public/brandsamor_fragrance_library_16_import.json'), 'utf8'),
);

const toEmail = String(process.argv[2] || 'anand.satyan@gmail.com').trim().toLowerCase();

const sampleSlugs = [
  'bright-citrus',
  'soft-petals',
  'polished-woods',
  'vanilla-veil',
  'salted-air',
];

const bySlug = new Map(importJson.fragrances.map((f) => [f.slug, f]));

const fragrances = sampleSlugs.map((slug, index) => {
  const doc = bySlug.get(slug);
  return {
    index: index + 1,
    slug,
    number: doc?.number ?? null,
    name: doc?.customerFacingName || slug,
    notesLine: doc?.shortDescription || 'A curated fragrance selected for your brand.',
    role: null,
    primaryFamily: doc?.primaryFamily || null,
  };
});

const session = {
  sessionId: 'test-mailer-session',
  lead: {
    fullName: 'Anand Satyan',
    email: toEmail,
    phone: '+1 415 555 0198',
    brandName: 'Brandsamor Test',
    country: 'US',
  },
  checkout: {
    email: toEmail,
    phone: '+1 415 555 0198',
    firstName: 'Anand',
    lastName: 'Satyan',
    company: 'Brandsamor',
    shipping: {
      line1: '1847 Market Street',
      line2: 'Suite 4',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94103',
      country: 'US',
    },
  },
  recommendations: sampleSlugs.map((slug) => ({ fragranceSlug: slug })),
};

const order = {
  sampleOrderNumber: 10101,
  sampleOrderLabel: 'SO-10101',
  transactionId: 'TXN-SO10101-TESTMAIL',
  paymentIntentId: 'pi_test_sample_confirmation',
  amount: 10000,
  currency: 'usd',
  paidAt: new Date(),
  product: 'curated-sample-kit',
};

const payment = {
  paymentIntentId: 'pi_test_sample_confirmation',
  amount: 10000,
  currency: 'usd',
  paidAt: order.paidAt,
  status: 'succeeded',
};

const content = buildCustomerOrderConfirmationEmail({
  session,
  order,
  payment,
  fragrances,
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
  node scripts/email/send-sample-confirmation-test.mjs anand.satyan@gmail.com
`);
  process.exit(1);
}

const result = await sendBrandsamorMail({
  to: toEmail,
  subject: `[TEST] ${content.subject}`,
  text: content.text,
  html: content.html,
  replyTo: 'info@brandsamor.com',
  from: content.from,
});

console.log('Sent:', result);
console.log('To:', toEmail);
console.log('From:', content.from);
console.log('Subject:', `[TEST] ${content.subject}`);

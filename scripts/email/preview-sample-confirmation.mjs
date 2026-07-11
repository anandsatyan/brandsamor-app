/**
 * Writes a local HTML preview of the customer sample-order confirmation email.
 * Usage: node scripts/email/preview-sample-confirmation.mjs
 */
import 'dotenv/config';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildCustomerOrderConfirmationEmail } from '../../server/sampling/customerOrderConfirmationEmail.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const importJson = JSON.parse(
  readFileSync(path.resolve(root, 'public/brandsamor_fragrance_library_16_import.json'), 'utf8'),
);

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
  sessionId: 'preview-session',
  lead: {
    fullName: 'Alex Rivera',
    email: 'anand.satyan@gmail.com',
    phone: '+1 415 555 0198',
    brandName: 'Rivera Atelier',
    country: 'US',
  },
  checkout: {
    email: 'anand.satyan@gmail.com',
    phone: '+1 415 555 0198',
    firstName: 'Alex',
    lastName: 'Rivera',
    company: 'Rivera Atelier',
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
  transactionId: 'TXN-SO10101-PREVIEW',
  paymentIntentId: 'pi_preview_sample_kit',
  amount: 10000,
  currency: 'usd',
  paidAt: new Date(),
  product: 'curated-sample-kit',
};

const payment = {
  paymentIntentId: 'pi_preview_sample_kit',
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

const outDir = path.resolve(root, 'tmp/email-previews');
mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, 'sample-order-confirmation.html');
writeFileSync(outPath, content.html, 'utf8');

console.log('Preview written to:', outPath);
console.log('Subject:', content.subject);
console.log('From:', content.from);
console.log('To:', content.to);

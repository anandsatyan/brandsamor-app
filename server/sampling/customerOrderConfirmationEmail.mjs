import {
  formatFragranceLabel,
  loadFragranceDocsBySlugs,
  resolveRecommendationLabel,
} from '../fragrance/resolveRecommendationLabels.mjs';
import { getBrandsamorFromAddress, sendBrandsamorMail } from '../mail/smtp.mjs';

const SITE_URL = (process.env.VITE_SITE_URL || 'https://www.brandsamor.com').replace(/\/$/, '');
const LOGO_URL = `${SITE_URL}/brandsamor-neue-logo.png`;

const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const formatMoney = (amountCents, currency = 'usd') => {
  if (typeof amountCents !== 'number') return '—';
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: String(currency || 'usd').toUpperCase(),
    }).format(amountCents / 100);
  } catch {
    return `${(amountCents / 100).toFixed(2)} ${String(currency || 'usd').toUpperCase()}`;
  }
};

const formatAddressLines = (address) => {
  if (!address || typeof address !== 'object') return [];
  return [
    address.line1,
    address.line2,
    [address.city, address.state, address.postalCode].filter(Boolean).join(', '),
    address.country,
  ]
    .map((line) => String(line ?? '').trim())
    .filter(Boolean);
};

const formatPaidAt = (value) => {
  if (!value) return '—';
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'UTC',
  }).format(date) + ' UTC';
};

const notesOneLiner = (doc) => {
  if (doc?.shortDescription) return String(doc.shortDescription).trim();
  const hero = Array.isArray(doc?.notes?.hero) ? doc.notes.hero.filter(Boolean) : [];
  if (hero.length) return `Key notes: ${hero.join(' · ')}.`;
  const top = Array.isArray(doc?.notes?.top) ? doc.notes.top.slice(0, 2) : [];
  const heart = Array.isArray(doc?.notes?.heart) ? doc.notes.heart.slice(0, 1) : [];
  const base = Array.isArray(doc?.notes?.base) ? doc.notes.base.slice(0, 1) : [];
  const parts = [...top, ...heart, ...base].filter(Boolean);
  if (parts.length) return `Notes of ${parts.join(', ')}.`;
  return 'A curated fragrance selected for your brand.';
};

export async function resolveCustomerFragranceDetails(recommendations = []) {
  const list = Array.isArray(recommendations) ? recommendations : [];
  const bySlug = await loadFragranceDocsBySlugs(
    list.map((rec) => rec.fragranceSlug ?? rec.fragranceId),
  );

  return list.map((rec, index) => {
    const slug = String(rec.fragranceSlug ?? rec.fragranceId ?? '').trim();
    const doc = bySlug.get(slug) ?? null;
    const resolved = resolveRecommendationLabel(rec, doc);
    return {
      index: index + 1,
      slug: resolved.fragranceSlug || '',
      number: resolved.fragranceNumber,
      name: resolved.fragranceName || `Fragrance ${index + 1}`,
      label: formatFragranceLabel(resolved),
      notesLine: notesOneLiner(doc),
      role: resolved.role || null,
      primaryFamily: doc?.primaryFamily || null,
    };
  });
}

/**
 * Build customer-facing sample order confirmation content.
 * Exported for previews and test mailers.
 */
export function buildCustomerOrderConfirmationEmail({
  session,
  order,
  payment,
  fragrances = [],
}) {
  const lead = session?.lead ?? {};
  const checkout = session?.checkout ?? {};
  const orderLabel = order?.sampleOrderLabel || `SO-${order?.sampleOrderNumber ?? '—'}`;
  const amount = formatMoney(order?.amount ?? payment?.amount, order?.currency ?? payment?.currency);
  const customerName =
    [checkout.firstName, checkout.lastName].filter(Boolean).join(' ').trim() ||
    lead.fullName ||
    'there';
  const customerEmail = checkout.email || lead.email || '';
  const customerPhone = checkout.phone || lead.phone || '';
  const brandName = lead.brandName || 'your brand';
  const shippingLines = formatAddressLines(checkout.shipping);
  const paidAt = formatPaidAt(order?.paidAt ?? payment?.paidAt);
  const transactionId = order?.transactionId || '—';
  const paymentIntentId = payment?.paymentIntentId || order?.paymentIntentId || '—';

  const firstName = customerName.split(/\s+/)[0] || 'there';
  const subject = `Your Brandsamor sample kit is confirmed — ${orderLabel}`;

  const fragranceText =
    fragrances.length > 0
      ? fragrances
          .map((f) => {
            const label =
              f.label ||
              (f.number != null ? `No. ${f.number} — ${f.name}` : f.name);
            return `${f.index}. ${label}\n   ${f.notesLine}`;
          })
          .join('\n\n')
      : 'Your five curated fragrances will appear in your packing slip.';

  const text = [
    `Hi ${firstName},`,
    '',
    'Thank you for ordering the Brandsamor Curated Sample Kit. Your payment is confirmed and our team will prepare your five fragrance samples for shipping.',
    '',
    'ORDER DETAILS',
    `Sample order: ${orderLabel}`,
    `Transaction ID: ${transactionId}`,
    `Amount paid: ${amount}`,
    `Paid at: ${paidAt}`,
    `Payment reference: ${paymentIntentId}`,
    '',
    'YOUR CURATED SELECTION',
    fragranceText,
    '',
    'SHIPPING',
    shippingLines.length ? shippingLines.join('\n') : 'We will use the address from your checkout.',
    customerPhone ? `Phone: ${customerPhone}` : null,
    '',
    'Need a change before dispatch? Email info@brandsamor.com with your order number for a full refund anytime before we ship.',
    '',
    'With care,',
    'Brandsamor Team',
    'info@brandsamor.com',
    SITE_URL,
  ]
    .filter((line) => line !== null)
    .join('\n');

  const fragranceRowsHtml =
    fragrances.length > 0
      ? fragrances
          .map((f) => {
            const numberLabel =
              f.number != null && f.number !== '' ? `Fragrance No. ${f.number}` : `Sample ${f.index}`;
            return `
              <tr>
                <td style="padding: 0 0 14px 0;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #ffffff; border: 1px solid #e8e0d8; border-radius: 4px;">
                    <tr>
                      <td style="width: 56px; vertical-align: top; padding: 16px 0 16px 16px;">
                        <div style="width: 40px; height: 40px; border-radius: 2px; background: #2b180a; color: #f3efe3; font-family: Georgia, 'Times New Roman', serif; font-size: 12px; line-height: 40px; text-align: center;">
                          ${escapeHtml(f.number != null && f.number !== '' ? String(f.number) : String(f.index).padStart(2, '0'))}
                        </div>
                      </td>
                      <td style="padding: 16px 18px 16px 12px; vertical-align: top;">
                        <p style="margin: 0 0 4px 0; font-family: Arial, Helvetica, sans-serif; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #ff5c00; font-weight: 700;">
                          ${escapeHtml(numberLabel)}
                        </p>
                        <p style="margin: 0 0 8px 0; font-family: Georgia, 'Times New Roman', serif; font-size: 20px; line-height: 1.2; color: #2b180a;">
                          ${escapeHtml(f.name)}
                        </p>
                        <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.55; color: #725f52;">
                          ${escapeHtml(f.notesLine)}
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>`;
          })
          .join('')
      : `
        <tr>
          <td style="padding: 12px 0; font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #725f52;">
            Your five curated fragrances will appear on your packing slip.
          </td>
        </tr>`;

  const shippingHtml = shippingLines.length
    ? shippingLines.map((line) => escapeHtml(line)).join('<br/>')
    : 'We will use the address from your checkout.';

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
                Order confirmed
              </p>
              <h1 style="margin: 0 0 12px 0; font-family: Georgia, 'Times New Roman', serif; font-size: 32px; line-height: 1.15; color: #2b180a; font-weight: 400;">
                Your sample kit is on its way to being packed
              </h1>
              <p style="margin: 0 auto; max-width: 460px; font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.6; color: #725f52;">
                Hi ${escapeHtml(firstName)} — thank you for choosing Brandsamor for ${escapeHtml(brandName)}.
                Payment is confirmed. We&apos;ll prepare your five curated fragrance samples next.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 28px 28px 8px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #ffffff; border: 1px solid #e8e0d8; border-radius: 4px;">
                <tr>
                  <td style="padding: 20px 22px;">
                    <p style="margin: 0 0 14px 0; font-family: Arial, Helvetica, sans-serif; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #2b180a; font-weight: 700;">
                      Payment &amp; transaction
                    </p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 0 0 10px 0; font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: #94877c; width: 42%;">Sample order</td>
                        <td style="padding: 0 0 10px 0; font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #2b180a; font-weight: 700; text-align: right;">${escapeHtml(orderLabel)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px 0; font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: #94877c;">Amount paid</td>
                        <td style="padding: 0 0 10px 0; font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #2b180a; font-weight: 700; text-align: right;">${escapeHtml(amount)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px 0; font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: #94877c;">Paid at</td>
                        <td style="padding: 0 0 10px 0; font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: #2b180a; text-align: right;">${escapeHtml(paidAt)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px 0; font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: #94877c; vertical-align: top;">Transaction ID</td>
                        <td style="padding: 0 0 10px 0; font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #2b180a; text-align: right; word-break: break-all;">${escapeHtml(transactionId)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 0; font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: #94877c; vertical-align: top;">Payment reference</td>
                        <td style="padding: 0; font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #2b180a; text-align: right; word-break: break-all;">${escapeHtml(paymentIntentId)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 24px 28px 8px 28px;">
              <p style="margin: 0 0 14px 0; font-family: Arial, Helvetica, sans-serif; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #2b180a; font-weight: 700;">
                Your curated selection
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${fragranceRowsHtml}
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 8px 28px 28px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #2b180a; border-radius: 4px;">
                <tr>
                  <td style="padding: 22px;">
                    <p style="margin: 0 0 10px 0; font-family: Arial, Helvetica, sans-serif; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #ff5c00; font-weight: 700;">
                      Shipping to
                    </p>
                    <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.6; color: #f3efe3;">
                      ${shippingHtml}
                      ${customerPhone ? `<br/><span style="color: #cbbfb3;">Phone: ${escapeHtml(customerPhone)}</span>` : ''}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 28px 28px 28px;">
              <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.6; color: #725f52;">
                Need a change before dispatch? Email
                <a href="mailto:info@brandsamor.com" style="color: #ff5c00; text-decoration: none;">info@brandsamor.com</a>
                with your order number for a full refund anytime before we ship.
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
          This confirmation was sent to ${escapeHtml(customerEmail || 'you')} regarding sample order ${escapeHtml(orderLabel)}.
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
    to: customerEmail,
    from: getBrandsamorFromAddress(),
  };
}

/**
 * Send the customer confirmation after a sample kit is newly paid.
 * Never throws — payment success must not depend on email delivery.
 */
export async function sendCustomerOrderConfirmation({ session, order, payment }) {
  try {
    const customerEmail = session?.checkout?.email || session?.lead?.email;
    if (!customerEmail) {
      console.warn('[sample-order-customer] No customer email on session; skipping confirmation');
      return { ok: false, error: 'missing_customer_email' };
    }

    const fragrances = await resolveCustomerFragranceDetails(session?.recommendations ?? []);
    const content = buildCustomerOrderConfirmationEmail({
      session,
      order,
      payment,
      fragrances,
    });

    const result = await sendBrandsamorMail({
      to: customerEmail,
      subject: content.subject,
      text: content.text,
      html: content.html,
      replyTo: 'info@brandsamor.com',
      from: content.from,
    });

    console.log(
      `[sample-order-customer] Confirmation ${result.mode} to ${customerEmail} for ${order?.sampleOrderLabel || order?.sampleOrderNumber}`,
    );
    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[sample-order-customer] Failed to send confirmation:', message);
    return { ok: false, error: message };
  }
}

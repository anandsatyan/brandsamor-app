import nodemailer from 'nodemailer';
import {
  enrichRecommendations,
  formatFragranceLabel,
} from '../fragrance/resolveRecommendationLabels.mjs';

const ORDER_RECIPIENT =
  process.env.SAMPLE_ORDER_RECIPIENT ||
  process.env.LEAD_FORM_RECIPIENT ||
  'anand@packamor.com';

const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const createTransport = () => {
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
};

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

const formatAddress = (address) => {
  if (!address || typeof address !== 'object') return '—';
  const lines = [
    address.line1,
    address.line2,
    [address.city, address.state, address.postalCode].filter(Boolean).join(', '),
    address.country,
  ]
    .map((line) => String(line ?? '').trim())
    .filter(Boolean);
  return lines.length > 0 ? lines.join('\n') : '—';
};

async function resolveFragranceLabels(recommendations = []) {
  const enriched = await enrichRecommendations(recommendations);
  return enriched.map((rec) => {
    const role = rec.role ? ` (${String(rec.role).replace(/-/g, ' ')})` : '';
    return `${formatFragranceLabel(rec)}${role}`;
  });
}

function buildEmailContent({ session, order, payment, fragranceLines }) {
  const lead = session?.lead ?? {};
  const checkout = session?.checkout ?? {};
  const answers = session?.answers ?? {};
  const orderLabel = order?.sampleOrderLabel || `SO-${order?.sampleOrderNumber ?? '—'}`;
  const amount = formatMoney(order?.amount ?? payment?.amount, order?.currency ?? payment?.currency);
  const customerName =
    [checkout.firstName, checkout.lastName].filter(Boolean).join(' ').trim() ||
    lead.fullName ||
    '—';
  const customerEmail = checkout.email || lead.email || '—';
  const customerPhone = checkout.phone || lead.phone || '—';
  const brandName = lead.brandName || answers.brandName || '—';
  const shippingText = formatAddress(checkout.shipping);
  const fragranceText =
    fragranceLines.length > 0 ? fragranceLines.map((line, i) => `${i + 1}. ${line}`).join('\n') : '—';

  const subject = `New sample order ${orderLabel} — ${customerName}`;

  const text = [
    'New paid curated sample kit order',
    '',
    'ACTION NEEDED',
    'Pack the five fragrance samples and/or call the customer to discuss next steps.',
    '',
    'ORDER',
    `Order: ${orderLabel}`,
    `Transaction ID: ${order?.transactionId || '—'}`,
    `Amount: ${amount}`,
    `Paid at: ${order?.paidAt ? new Date(order.paidAt).toISOString() : '—'}`,
    `Session ID: ${session?.sessionId || '—'}`,
    `Payment intent: ${payment?.paymentIntentId || order?.paymentIntentId || '—'}`,
    '',
    'CUSTOMER',
    `Name: ${customerName}`,
    `Email: ${customerEmail}`,
    `Phone: ${customerPhone}`,
    `Brand: ${brandName}`,
    `Country (lead): ${lead.country || '—'}`,
    `Business type: ${answers.businessType || '—'}`,
    '',
    'SHIPPING ADDRESS',
    shippingText,
    checkout.company ? `Company: ${checkout.company}` : null,
    '',
    'CURATED FRAGRANCES',
    fragranceText,
  ]
    .filter((line) => line !== null)
    .join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; color: #2b180a; line-height: 1.6;">
      <h2 style="color: #ff5c00; margin-bottom: 8px;">New sample order ${escapeHtml(orderLabel)}</h2>
      <p style="margin-top: 0;"><strong>Action needed:</strong> Pack the five fragrance samples and/or call the customer to discuss next steps.</p>

      <h3>Order</h3>
      <p>
        <strong>Order:</strong> ${escapeHtml(orderLabel)}<br/>
        <strong>Transaction ID:</strong> ${escapeHtml(order?.transactionId || '—')}<br/>
        <strong>Amount:</strong> ${escapeHtml(amount)}<br/>
        <strong>Paid at:</strong> ${escapeHtml(order?.paidAt ? new Date(order.paidAt).toISOString() : '—')}<br/>
        <strong>Session ID:</strong> ${escapeHtml(session?.sessionId || '—')}<br/>
        <strong>Payment intent:</strong> ${escapeHtml(payment?.paymentIntentId || order?.paymentIntentId || '—')}
      </p>

      <h3>Customer</h3>
      <p>
        <strong>Name:</strong> ${escapeHtml(customerName)}<br/>
        <strong>Email:</strong> ${escapeHtml(customerEmail)}<br/>
        <strong>Phone:</strong> ${escapeHtml(customerPhone)}<br/>
        <strong>Brand:</strong> ${escapeHtml(brandName)}<br/>
        <strong>Country (lead):</strong> ${escapeHtml(lead.country || '—')}<br/>
        <strong>Business type:</strong> ${escapeHtml(answers.businessType || '—')}
      </p>

      <h3>Shipping address</h3>
      <p style="white-space: pre-line;">${escapeHtml(shippingText)}${
        checkout.company ? `<br/><strong>Company:</strong> ${escapeHtml(checkout.company)}` : ''
      }</p>

      <h3>Curated fragrances</h3>
      <ol>
        ${
          fragranceLines.length > 0
            ? fragranceLines.map((line) => `<li>${escapeHtml(line)}</li>`).join('')
            : '<li>—</li>'
        }
      </ol>
    </div>
  `;

  return { subject, text, html, replyTo: customerEmail !== '—' ? customerEmail : undefined };
}

/**
 * Notify ops when a curated sample kit is newly paid.
 * Never throws — payment success must not depend on email delivery.
 */
export async function notifySampleOrderPaid({ session, order, payment }) {
  try {
    const fragranceLines = await resolveFragranceLabels(session?.recommendations ?? []);
    const { subject, text, html, replyTo } = buildEmailContent({
      session,
      order,
      payment,
      fragranceLines,
    });

    const transport = createTransport();
    if (!transport) {
      console.log('[sample-order] SMTP not configured — order notification logged only:\n', text);
      return { ok: true, mode: 'logged' };
    }

    const from = process.env.SMTP_FROM || process.env.SMTP_USER;
    await transport.sendMail({
      from,
      to: ORDER_RECIPIENT,
      replyTo,
      subject,
      text,
      html,
    });

    console.log(
      `[sample-order] Notification emailed to ${ORDER_RECIPIENT} for ${order?.sampleOrderLabel || order?.sampleOrderNumber}`,
    );
    return { ok: true, mode: 'email' };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[sample-order] Failed to send order notification:', message);
    return { ok: false, error: message };
  }
}

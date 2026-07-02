import nodemailer from 'nodemailer';

const LEAD_RECIPIENT = process.env.LEAD_FORM_RECIPIENT || 'anand@packamor.com';

const REQUIRED_FIELDS = [
  'fullName',
  'email',
  'brandName',
  'country',
  'businessType',
  'launchTimeline',
  'orderQuantity',
  'targetMarket',
  'scentDirection',
];

const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const formatList = (items) => (Array.isArray(items) && items.length > 0 ? items.join(', ') : '—');

const buildEmailContent = (payload) => {
  const subject = `New Brandsamor lead: ${payload.brandName} — ${payload.fullName}`;

  const text = [
    'New project inquiry from brandsamor.com',
    '',
    'CONTACT',
    `Name: ${payload.fullName}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || '—'}`,
    '',
    'BRAND & BUSINESS',
    `Brand: ${payload.brandName}`,
    `Website: ${payload.website || '—'}`,
    `Country: ${payload.country}`,
    `Business type: ${payload.businessType}`,
    '',
    'PRODUCT & LAUNCH',
    `Product interests: ${formatList(payload.productInterests)}`,
    `Launch timeline: ${payload.launchTimeline}`,
    `First order quantity: ${payload.orderQuantity}`,
    `Primary market: ${payload.targetMarket}`,
    '',
    'CREATIVE DIRECTION',
    `Scent direction & goals:\n${payload.scentDirection}`,
    '',
    `Packaging notes:\n${payload.packagingNotes || '—'}`,
    '',
    `Additional notes:\n${payload.additionalNotes || '—'}`,
  ].join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; color: #2b180a; line-height: 1.6;">
      <h2 style="color: #ff5c00; margin-bottom: 8px;">New project inquiry</h2>
      <p style="margin-top: 0;">Submitted from brandsamor.com/get-started</p>
      <h3>Contact</h3>
      <p><strong>Name:</strong> ${escapeHtml(payload.fullName)}<br/>
      <strong>Email:</strong> ${escapeHtml(payload.email)}<br/>
      <strong>Phone:</strong> ${escapeHtml(payload.phone || '—')}</p>
      <h3>Brand & business</h3>
      <p><strong>Brand:</strong> ${escapeHtml(payload.brandName)}<br/>
      <strong>Website:</strong> ${escapeHtml(payload.website || '—')}<br/>
      <strong>Country:</strong> ${escapeHtml(payload.country)}<br/>
      <strong>Business type:</strong> ${escapeHtml(payload.businessType)}</p>
      <h3>Product & launch</h3>
      <p><strong>Product interests:</strong> ${escapeHtml(formatList(payload.productInterests))}<br/>
      <strong>Launch timeline:</strong> ${escapeHtml(payload.launchTimeline)}<br/>
      <strong>First order quantity:</strong> ${escapeHtml(payload.orderQuantity)}<br/>
      <strong>Primary market:</strong> ${escapeHtml(payload.targetMarket)}</p>
      <h3>Creative direction</h3>
      <p><strong>Scent direction & goals</strong><br/>${escapeHtml(payload.scentDirection).replace(/\n/g, '<br/>')}</p>
      <p><strong>Packaging notes</strong><br/>${escapeHtml(payload.packagingNotes || '—').replace(/\n/g, '<br/>')}</p>
      <p><strong>Additional notes</strong><br/>${escapeHtml(payload.additionalNotes || '—').replace(/\n/g, '<br/>')}</p>
    </div>
  `;

  return { subject, text, html };
};

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

const validatePayload = (payload) => {
  if (!payload || typeof payload !== 'object') {
    return 'Invalid request body.';
  }

  for (const field of REQUIRED_FIELDS) {
    if (!String(payload[field] ?? '').trim()) {
      return `Missing required field: ${field}`;
    }
  }

  const email = String(payload.email).trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Please provide a valid email address.';
  }

  return null;
};

export const handleLeadSubmission = async (payload) => {
  const validationError = validatePayload(payload);
  if (validationError) {
    return { status: 400, body: { error: validationError } };
  }

  const normalized = {
    fullName: String(payload.fullName).trim(),
    email: String(payload.email).trim(),
    phone: String(payload.phone ?? '').trim(),
    brandName: String(payload.brandName).trim(),
    website: String(payload.website ?? '').trim(),
    country: String(payload.country).trim(),
    businessType: String(payload.businessType).trim(),
    productInterests: Array.isArray(payload.productInterests)
      ? payload.productInterests.map((item) => String(item).trim()).filter(Boolean)
      : [],
    launchTimeline: String(payload.launchTimeline).trim(),
    orderQuantity: String(payload.orderQuantity).trim(),
    targetMarket: String(payload.targetMarket).trim(),
    scentDirection: String(payload.scentDirection).trim(),
    packagingNotes: String(payload.packagingNotes ?? '').trim(),
    additionalNotes: String(payload.additionalNotes ?? '').trim(),
  };

  const { subject, text, html } = buildEmailContent(normalized);
  const transport = createTransport();

  if (!transport) {
    console.log('[lead-form] SMTP not configured — submission logged only:\n', text);
    return { status: 200, body: { ok: true, mode: 'logged' } };
  }

  const from = process.env.SMTP_FROM || process.env.SMTP_USER;

  await transport.sendMail({
    from,
    to: LEAD_RECIPIENT,
    replyTo: normalized.email,
    subject,
    text,
    html,
  });

  return { status: 200, body: { ok: true, mode: 'email' } };
};

export const readJsonBody = (req) =>
  new Promise((resolve, reject) => {
    const chunks = [];

    req.on('data', (chunk) => {
      chunks.push(chunk);
      if (chunks.reduce((sum, item) => sum + item.length, 0) > 1_000_000) {
        reject(new Error('Payload too large'));
        req.destroy();
      }
    });

    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8');
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });

    req.on('error', reject);
  });

export const sendJson = (res, status, body) => {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(body));
};

export const handleLeadRequest = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  try {
    const payload = await readJsonBody(req);
    const result = await handleLeadSubmission(payload);
    sendJson(res, result.status, result.body);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Server error';
    const status = message === 'Invalid JSON' || message === 'Payload too large' ? 400 : 500;
    sendJson(res, status, { error: message });
  }
};

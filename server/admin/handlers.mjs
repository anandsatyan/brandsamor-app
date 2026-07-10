import { sendJson, readJsonBody } from '../leadHandler.mjs';
import {
  buildAdminSessionCookie,
  buildClearAdminSessionCookie,
  createAdminSessionToken,
  getAdminCredentials,
  isAdminAuthenticated,
  isAdminConfigured,
} from './auth.mjs';
import { getPaidOrderByNumber, listPaidOrders } from './ordersRepo.mjs';

export async function handleAdminLogin(req, res) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  if (!isAdminConfigured()) {
    sendJson(res, 501, { error: 'Admin login is not configured' });
    return;
  }

  const payload = await readJsonBody(req);
  const email = String(payload?.email ?? '')
    .trim()
    .toLowerCase();
  const password = String(payload?.password ?? '');
  const expected = getAdminCredentials();

  if (email !== expected.email || password !== expected.password) {
    sendJson(res, 401, { error: 'Wrong email or password.' });
    return;
  }

  const token = createAdminSessionToken();
  res.setHeader('Set-Cookie', buildAdminSessionCookie(token));
  sendJson(res, 200, { ok: true });
}

export async function handleAdminLogout(req, res) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }
  res.setHeader('Set-Cookie', buildClearAdminSessionCookie());
  sendJson(res, 200, { ok: true });
}

export async function handleAdminSession(req, res) {
  if (req.method !== 'GET') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }
  sendJson(res, 200, { authenticated: isAdminAuthenticated(req) });
}

export async function handleAdminOrdersList(req, res) {
  if (req.method !== 'GET') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }
  if (!isAdminAuthenticated(req)) {
    sendJson(res, 401, { error: 'Unauthorized' });
    return;
  }

  const url = new URL(req.url || '/', 'http://localhost');
  const limit = Number(url.searchParams.get('limit') || 100);
  const orders = await listPaidOrders({ limit });
  sendJson(res, 200, { orders });
}

export async function handleAdminOrderDetail(req, res, sampleOrderNumber) {
  if (req.method !== 'GET') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }
  if (!isAdminAuthenticated(req)) {
    sendJson(res, 401, { error: 'Unauthorized' });
    return;
  }

  const order = await getPaidOrderByNumber(sampleOrderNumber);
  if (!order) {
    sendJson(res, 404, { error: 'Order not found' });
    return;
  }
  sendJson(res, 200, { order });
}

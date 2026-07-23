import { sendJson, readJsonBody } from '../leadHandler.mjs';
import {
  buildAdminSessionCookie,
  buildClearAdminSessionCookie,
  createAdminSessionToken,
  getAdminCredentials,
  isAdminAuthenticated,
  isAdminConfigured,
} from './auth.mjs';
import { cancelPaidOrder, getPaidOrderByNumber, listPaidOrders } from './ordersRepo.mjs';
import {
  addLeadComment,
  getAdminDashboardStats,
  getLeadBySessionId,
  listLeads,
} from './leadsRepo.mjs';

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

export async function handleAdminStats(req, res) {
  if (req.method !== 'GET') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }
  if (!isAdminAuthenticated(req)) {
    sendJson(res, 401, { error: 'Unauthorized' });
    return;
  }

  const stats = await getAdminDashboardStats();
  sendJson(res, 200, { stats });
}

export async function handleAdminLeadsList(req, res) {
  if (req.method !== 'GET') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }
  if (!isAdminAuthenticated(req)) {
    sendJson(res, 401, { error: 'Unauthorized' });
    return;
  }

  const url = new URL(req.url || '/', 'http://localhost');
  const limit = Number(url.searchParams.get('limit') || 200);
  const status = url.searchParams.get('status') || 'all';
  const q = url.searchParams.get('q') || '';
  const sort = url.searchParams.get('sort') || 'newest';
  const heat = url.searchParams.get('heat') || 'all';
  const leads = await listLeads({ limit, status, q, sort, heat });
  sendJson(res, 200, { leads });
}

export async function handleAdminLeadDetail(req, res, sessionId) {
  if (req.method !== 'GET') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }
  if (!isAdminAuthenticated(req)) {
    sendJson(res, 401, { error: 'Unauthorized' });
    return;
  }

  const lead = await getLeadBySessionId(sessionId);
  if (!lead) {
    sendJson(res, 404, { error: 'Lead not found' });
    return;
  }
  sendJson(res, 200, { lead });
}

export async function handleAdminLeadAddComment(req, res, sessionId) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }
  if (!isAdminAuthenticated(req)) {
    sendJson(res, 401, { error: 'Unauthorized' });
    return;
  }

  const payload = await readJsonBody(req);
  const body = String(payload?.body ?? '').trim();
  if (!body) {
    sendJson(res, 400, { error: 'Comment body is required' });
    return;
  }

  const author = getAdminCredentials().email || 'Admin';
  const lead = await addLeadComment(sessionId, { body, author });
  if (!lead) {
    sendJson(res, 404, { error: 'Lead not found' });
    return;
  }
  sendJson(res, 200, { lead });
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

export async function handleAdminOrderCancel(req, res, sampleOrderNumber) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }
  if (!isAdminAuthenticated(req)) {
    sendJson(res, 401, { error: 'Unauthorized' });
    return;
  }

  try {
    const payload = await readJsonBody(req);
    const order = await cancelPaidOrder(sampleOrderNumber, {
      reason: payload?.reason,
      note: payload?.note,
      recordedBy: getAdminCredentials().email || 'Admin',
    });
    sendJson(res, 200, { order });
  } catch (err) {
    const statusCode = err?.statusCode || 500;
    sendJson(res, statusCode, { error: err?.message || 'Failed to cancel order' });
  }
}

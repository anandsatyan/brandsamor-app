import crypto from 'node:crypto';
import { parseCookies } from '../admin/auth.mjs';

export const CUSTOMER_COOKIE_NAME = 'brandsamor_customer_session';
const TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function getSecret() {
  const secret =
    process.env.CUSTOMER_SESSION_SECRET ||
    process.env.ADMIN_SESSION_SECRET ||
    process.env.STRIPE_SECRET_KEY ||
    'dev-customer-session-secret';
  return secret;
}

export function createCustomerSessionToken(userId) {
  const exp = Date.now() + TTL_MS;
  const payload = `customer:${userId}:${exp}`;
  const sig = crypto.createHmac('sha256', getSecret()).update(payload).digest('hex');
  return Buffer.from(`${payload}:${sig}`).toString('base64url');
}

export function verifyCustomerSessionToken(token) {
  if (!token) return null;
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const parts = decoded.split(':');
    if (parts.length !== 4) return null;
    const [role, userId, expRaw, sig] = parts;
    if (role !== 'customer' || !userId || !expRaw || !sig) return null;
    const exp = Number(expRaw);
    if (!Number.isFinite(exp) || Date.now() > exp) return null;
    const payload = `${role}:${userId}:${expRaw}`;
    const expected = crypto.createHmac('sha256', getSecret()).update(payload).digest('hex');
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
    return { userId, exp };
  } catch {
    return null;
  }
}

export function getCustomerTokenFromRequest(req) {
  const cookies = parseCookies(req.headers.cookie);
  return cookies[CUSTOMER_COOKIE_NAME] || null;
}

export function buildCustomerSessionCookie(token) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${CUSTOMER_COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${Math.floor(TTL_MS / 1000)}${secure}`;
}

export function buildClearCustomerSessionCookie() {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${CUSTOMER_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`;
}

export function hashMagicToken(token) {
  return crypto.createHash('sha256').update(String(token)).digest('hex');
}

export function createMagicToken() {
  return crypto.randomBytes(32).toString('hex');
}

export function getPublicSiteUrl(req) {
  const fromEnv = String(process.env.VITE_SITE_URL || process.env.SITE_URL || '').replace(/\/$/, '');
  if (fromEnv) return fromEnv;
  const host = req?.headers?.host;
  if (host) {
    const proto = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    return `${proto}://${host}`;
  }
  return 'http://localhost:5173';
}

/**
 * Resolve the signed-in customer for a request (lazy-loads repo to avoid cycles).
 */
export async function getCustomerFromRequest(req) {
  const verified = verifyCustomerSessionToken(getCustomerTokenFromRequest(req));
  if (!verified?.userId) return null;
  const { getCustomerById } = await import('./repo.mjs');
  const customer = await getCustomerById(verified.userId);
  if (!customer) return null;
  return {
    userId: customer.userId,
    email: customer.email,
    fullName: customer.fullName || null,
  };
}

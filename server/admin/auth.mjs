import crypto from 'node:crypto';

const COOKIE_NAME = 'brandsamor_admin_session';
const TTL_MS = 7 * 24 * 60 * 60 * 1000;

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.STRIPE_SECRET_KEY;
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is not configured');
  return secret;
}

export function getAdminCredentials() {
  return {
    email: String(process.env.ADMIN_EMAIL || '').trim().toLowerCase(),
    password: String(process.env.ADMIN_PASSWORD || ''),
  };
}

export function isAdminConfigured() {
  const { email, password } = getAdminCredentials();
  return Boolean(email && password);
}

export function createAdminSessionToken() {
  const exp = Date.now() + TTL_MS;
  const payload = `admin:${exp}`;
  const sig = crypto.createHmac('sha256', getSecret()).update(payload).digest('hex');
  return Buffer.from(`${payload}:${sig}`).toString('base64url');
}

export function verifyAdminSessionToken(token) {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const [role, expRaw, sig] = decoded.split(':');
    if (role !== 'admin' || !expRaw || !sig) return false;
    const exp = Number(expRaw);
    if (!Number.isFinite(exp) || Date.now() > exp) return false;
    const payload = `${role}:${expRaw}`;
    const expected = crypto.createHmac('sha256', getSecret()).update(payload).digest('hex');
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function parseCookies(header) {
  const out = {};
  if (!header) return out;
  for (const part of String(header).split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    out[key] = decodeURIComponent(value);
  }
  return out;
}

export function getAdminTokenFromRequest(req) {
  const cookies = parseCookies(req.headers.cookie);
  return cookies[COOKIE_NAME] || null;
}

export function isAdminAuthenticated(req) {
  return verifyAdminSessionToken(getAdminTokenFromRequest(req));
}

export function buildAdminSessionCookie(token) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${Math.floor(TTL_MS / 1000)}${secure}`;
}

export function buildClearAdminSessionCookie() {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`;
}

export { COOKIE_NAME };

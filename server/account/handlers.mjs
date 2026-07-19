import { readJsonBody, sendJson } from '../leadHandler.mjs';
import {
  buildClearCustomerSessionCookie,
  buildCustomerSessionCookie,
  createCustomerSessionToken,
  getCustomerFromRequest,
  getPublicSiteUrl,
} from './auth.mjs';
import { sendMagicLinkEmail } from './email.mjs';
import {
  claimLocalArtifacts,
  claimResourcesForCustomer,
  consumeMagicLink,
  createMagicLink,
  getOpenSamplingSessionForCustomer,
  listCustomerConsultations,
  listCustomerSamplingSessions,
} from './repo.mjs';

function setSessionCookie(res, userId) {
  const token = createCustomerSessionToken(userId);
  const cookie = buildCustomerSessionCookie(token);
  const existing = res.getHeader?.('Set-Cookie');
  if (!existing) {
    res.setHeader('Set-Cookie', cookie);
  } else if (Array.isArray(existing)) {
    res.setHeader('Set-Cookie', [...existing, cookie]);
  } else {
    res.setHeader('Set-Cookie', [existing, cookie]);
  }
}

export async function handleAccountRequestLink(req, res) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  try {
    const payload = await readJsonBody(req).catch(() => ({}));
    const email = String(payload?.email || '').trim().toLowerCase();
    const nextPath = String(payload?.next || payload?.nextPath || '/').trim();

    if (!email || !email.includes('@')) {
      sendJson(res, 400, { error: 'A valid email is required' });
      return;
    }

    const { token, expiresAt } = await createMagicLink({ email, nextPath });
    const base = getPublicSiteUrl(req);
    const magicUrl = `${base}/api/account/verify?token=${encodeURIComponent(token)}`;

    const mail = await sendMagicLinkEmail({
      to: email,
      magicUrl,
      expiresMinutes: 30,
    });

    sendJson(res, 200, {
      ok: true,
      emailed: mail.mode === 'email',
      mode: mail.mode,
      expiresAt,
      // Dev convenience when SMTP is unset — never enable in production responses ideally,
      // but logged mode already prints the URL server-side; expose only in non-production.
      ...(process.env.NODE_ENV !== 'production' && mail.mode === 'logged'
        ? { devMagicUrl: magicUrl }
        : {}),
    });
  } catch (error) {
    console.error('[account] request-link', error);
    sendJson(res, 500, {
      error: error instanceof Error ? error.message : 'Could not send sign-in link',
    });
  }
}

export async function handleAccountVerify(req, res) {
  if (req.method !== 'GET') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  try {
    const url = new URL(req.url || '/', 'http://localhost');
    const token = url.searchParams.get('token') || '';
    const consumed = await consumeMagicLink(token);

    if (!consumed?.customer) {
      res.statusCode = 302;
      res.setHeader('Location', '/account?error=invalid_link');
      res.end();
      return;
    }

    setSessionCookie(res, consumed.customer.userId);
    const next = consumed.nextPath || '/account';
    const separator = next.includes('?') ? '&' : '?';
    res.statusCode = 302;
    res.setHeader('Location', `${next}${separator}signedIn=1`);
    res.end();
  } catch (error) {
    console.error('[account] verify', error);
    res.statusCode = 302;
    res.setHeader('Location', '/account?error=verify_failed');
    res.end();
  }
}

export async function handleAccountSession(req, res) {
  if (req.method !== 'GET') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  try {
    const customer = await getCustomerFromRequest(req);
    if (!customer) {
      sendJson(res, 200, { authenticated: false, customer: null });
      return;
    }
    sendJson(res, 200, { authenticated: true, customer });
  } catch (error) {
    console.error('[account] session', error);
    sendJson(res, 500, { error: 'Failed to read session' });
  }
}

export async function handleAccountLogout(req, res) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }
  res.setHeader('Set-Cookie', buildClearCustomerSessionCookie());
  sendJson(res, 200, { ok: true });
}

export async function handleAccountWorkspace(req, res) {
  if (req.method !== 'GET') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  try {
    const customer = await getCustomerFromRequest(req);
    if (!customer) {
      sendJson(res, 401, { error: 'Sign in required' });
      return;
    }

    await claimResourcesForCustomer(customer);
    const [consultations, samplingSessions, openSampling] = await Promise.all([
      listCustomerConsultations(customer.userId),
      listCustomerSamplingSessions(customer.userId),
      getOpenSamplingSessionForCustomer(customer.userId),
    ]);

    sendJson(res, 200, {
      customer,
      consultations,
      samplingSessions,
      openSampling,
    });
  } catch (error) {
    console.error('[account] workspace', error);
    sendJson(res, 500, { error: 'Failed to load workspace' });
  }
}

export async function handleAccountClaim(req, res) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  try {
    const customer = await getCustomerFromRequest(req);
    if (!customer) {
      sendJson(res, 401, { error: 'Sign in required' });
      return;
    }

    const payload = await readJsonBody(req).catch(() => ({}));
    const consultations = Array.isArray(payload?.consultations) ? payload.consultations : [];
    const samplingSessionIds = Array.isArray(payload?.samplingSessionIds)
      ? payload.samplingSessionIds
      : payload?.samplingSessionId
        ? [payload.samplingSessionId]
        : [];

    const claimed = await claimLocalArtifacts(customer, {
      consultations,
      samplingSessionIds,
    });
    await claimResourcesForCustomer(customer);

    const [listedConsultations, openSampling] = await Promise.all([
      listCustomerConsultations(customer.userId),
      getOpenSamplingSessionForCustomer(customer.userId),
    ]);

    sendJson(res, 200, {
      ok: true,
      claimed,
      consultations: listedConsultations,
      openSampling,
    });
  } catch (error) {
    console.error('[account] claim', error);
    sendJson(res, 500, { error: 'Failed to claim local sessions' });
  }
}

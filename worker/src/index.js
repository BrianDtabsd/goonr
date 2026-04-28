/**
 * Stripe Connect + Embedded Checkout — Cloudflare Worker.
 *
 * Routes (mirror the Vite dev middleware in vite.config.js):
 *   POST /api/stripe/create-embedded-checkout-session
 *   POST /api/stripe/connect/create-account
 *   POST /api/stripe/connect/account-link
 *   GET  /api/stripe/connect/account?accountId=acct_…
 *
 * Secrets / vars (via wrangler.jsonc + `wrangler secret put`):
 *   STRIPE_SECRET_KEY                       (secret) — your platform sk_…
 *   STRIPE_CONNECT_DESTINATION_ACCOUNT      (var)    — acct_… for THIS client deploy (optional)
 *   STRIPE_CONNECT_APPLICATION_FEE_PERCENT  (var)    — number, subscriptions (optional)
 *   STRIPE_CONNECT_APPLICATION_FEE_AMOUNT   (var)    — integer cents, one-time payments (optional)
 *   ALLOWED_ORIGINS                         (var)    — comma-separated, e.g. "https://client.com,https://www.client.com"
 */

const STRIPE_API = 'https://api.stripe.com/v1';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';
    const corsHeaders = buildCorsHeaders(origin, env);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    try {
      if (url.pathname === '/api/stripe/create-embedded-checkout-session' && request.method === 'POST') {
        return withCors(await handleCreateCheckoutSession(request, env), corsHeaders);
      }
      if (url.pathname === '/api/stripe/connect/create-account' && request.method === 'POST') {
        return withCors(await handleCreateAccount(request, env), corsHeaders);
      }
      if (url.pathname === '/api/stripe/connect/account-link' && request.method === 'POST') {
        return withCors(await handleAccountLink(request, env), corsHeaders);
      }
      if (url.pathname === '/api/stripe/connect/account' && request.method === 'GET') {
        return withCors(await handleAccountStatus(url, env), corsHeaders);
      }
      return withCors(jsonResponse({ error: 'Not found' }, 404), corsHeaders);
    } catch (err) {
      console.error('worker error', err);
      return withCors(
        jsonResponse({ error: err && err.message ? err.message : 'Internal error' }, 500),
        corsHeaders
      );
    }
  },
};

function buildCorsHeaders(origin, env) {
  const allowList = (env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const allowAll = allowList.length === 0;
  const ok = allowAll || allowList.includes(origin);
  const headers = {
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
  if (ok && origin) headers['Access-Control-Allow-Origin'] = origin;
  else if (allowAll) headers['Access-Control-Allow-Origin'] = '*';
  return headers;
}

function withCors(response, corsHeaders) {
  const merged = new Headers(response.headers);
  for (const [k, v] of Object.entries(corsHeaders)) merged.set(k, v);
  return new Response(response.body, { status: response.status, headers: merged });
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

function requirePlatformKey(env) {
  if (!env.STRIPE_SECRET_KEY) {
    return jsonResponse(
      { error: 'STRIPE_SECRET_KEY is not configured for this Worker.' },
      503
    );
  }
  return null;
}

/** Encode nested object as Stripe-style x-www-form-urlencoded body. */
function stripeForm(obj) {
  const params = new URLSearchParams();
  const append = (prefix, value) => {
    if (value === undefined || value === null) return;
    if (Array.isArray(value)) {
      value.forEach((v, i) => append(`${prefix}[${i}]`, v));
    } else if (typeof value === 'object') {
      for (const [k, v] of Object.entries(value)) append(`${prefix}[${k}]`, v);
    } else {
      params.append(prefix, String(value));
    }
  };
  for (const [k, v] of Object.entries(obj)) append(k, v);
  return params;
}

async function stripeFetch(env, path, init = {}) {
  const headers = new Headers(init.headers || {});
  headers.set('Authorization', `Bearer ${env.STRIPE_SECRET_KEY}`);
  if (init.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
  }
  const res = await fetch(`${STRIPE_API}${path}`, { ...init, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data && data.error && data.error.message ? data.error.message : `Stripe ${res.status}`;
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }
  return data;
}

function connectFieldsForCheckout(mode, env) {
  const dest = (env.STRIPE_CONNECT_DESTINATION_ACCOUNT || '').trim();
  if (!dest) return {};
  if (mode === 'subscription') {
    const pct = parseFloat(env.STRIPE_CONNECT_APPLICATION_FEE_PERCENT);
    const subscription_data = { transfer_data: { destination: dest } };
    if (!Number.isNaN(pct)) subscription_data.application_fee_percent = pct;
    return { subscription_data };
  }
  const amt = parseInt(env.STRIPE_CONNECT_APPLICATION_FEE_AMOUNT, 10);
  const payment_intent_data = { transfer_data: { destination: dest } };
  if (!Number.isNaN(amt)) payment_intent_data.application_fee_amount = amt;
  return { payment_intent_data };
}

async function handleCreateCheckoutSession(request, env) {
  const guard = requirePlatformKey(env);
  if (guard) return guard;
  const body = await readJson(request);
  const { priceId, mode = 'subscription', returnUrl, quantity = 1 } = body || {};
  if (!priceId || !returnUrl) {
    return jsonResponse({ error: 'priceId and returnUrl are required' }, 400);
  }
  const payload = {
    ui_mode: 'embedded',
    mode,
    'line_items[0][price]': priceId,
    'line_items[0][quantity]': Number(quantity) || 1,
    return_url: returnUrl,
  };
  const connectFields = connectFieldsForCheckout(mode, env);
  const form = stripeForm({ ...payload, ...connectFields });
  const session = await stripeFetch(env, '/checkout/sessions', { method: 'POST', body: form });
  return jsonResponse({ clientSecret: session.client_secret });
}

async function handleCreateAccount(request, env) {
  const guard = requirePlatformKey(env);
  if (guard) return guard;
  const body = await readJson(request);
  const form = stripeForm({
    controller: {
      stripe_dashboard: { type: 'express' },
      fees: { payer: 'application' },
      losses: { payments: 'application' },
    },
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
    email: typeof body?.email === 'string' ? body.email : undefined,
    business_type: typeof body?.businessType === 'string' ? body.businessType : undefined,
  });
  const account = await stripeFetch(env, '/accounts', { method: 'POST', body: form });
  return jsonResponse({
    accountId: account.id,
    chargesEnabled: account.charges_enabled,
    payoutsEnabled: account.payouts_enabled,
    detailsSubmitted: account.details_submitted,
  });
}

async function handleAccountLink(request, env) {
  const guard = requirePlatformKey(env);
  if (guard) return guard;
  const body = await readJson(request);
  const { accountId, returnUrl, refreshUrl } = body || {};
  if (!accountId || !returnUrl || !refreshUrl) {
    return jsonResponse({ error: 'accountId, returnUrl, refreshUrl are required' }, 400);
  }
  const form = stripeForm({
    account: accountId,
    type: 'account_onboarding',
    return_url: returnUrl,
    refresh_url: refreshUrl,
  });
  const link = await stripeFetch(env, '/account_links', { method: 'POST', body: form });
  return jsonResponse({ url: link.url });
}

async function handleAccountStatus(url, env) {
  const guard = requirePlatformKey(env);
  if (guard) return guard;
  const accountId = url.searchParams.get('accountId');
  if (!accountId) return jsonResponse({ error: 'accountId is required' }, 400);
  const account = await stripeFetch(env, `/accounts/${encodeURIComponent(accountId)}`, { method: 'GET' });
  return jsonResponse({
    accountId: account.id,
    chargesEnabled: account.charges_enabled,
    payoutsEnabled: account.payouts_enabled,
    detailsSubmitted: account.details_submitted,
  });
}

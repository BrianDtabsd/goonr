import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import Stripe from 'stripe';

/**
 * Optional Stripe Connect (destination charges). When STRIPE_CONNECT_DESTINATION_ACCOUNT
 * is set, funds settle on that connected account — same pattern as Connect docs for
 * Checkout Session, not the FurEver dashboard components (those use Account Sessions).
 * @see https://stripe.com/docs/connect/subscriptions
 */
function checkoutSessionConnectFields(mode, env) {
  const destination =
    env.STRIPE_CONNECT_DESTINATION_ACCOUNT ||
    env.SHOPSITE_STRIPE_CONNECT_DESTINATION_ACCOUNT ||
    '';
  const dest = typeof destination === 'string' ? destination.trim() : '';
  if (!dest) return {};

  if (mode === 'subscription') {
    const feeRaw =
      env.STRIPE_CONNECT_APPLICATION_FEE_PERCENT ||
      env.SHOPSITE_STRIPE_CONNECT_APPLICATION_FEE_PERCENT;
    const pct =
      feeRaw !== undefined && feeRaw !== ''
        ? Number.parseFloat(String(feeRaw), 10)
        : NaN;
    const subscription_data = {
      transfer_data: { destination: dest },
    };
    if (!Number.isNaN(pct)) {
      subscription_data.application_fee_percent = pct;
    }
    return { subscription_data };
  }

  const amtRaw =
    env.STRIPE_CONNECT_APPLICATION_FEE_AMOUNT ||
    env.SHOPSITE_STRIPE_CONNECT_APPLICATION_FEE_AMOUNT ||
    '';
  const application_fee_amount =
    amtRaw !== undefined && amtRaw !== ''
      ? Number.parseInt(String(amtRaw), 10)
      : NaN;
  const payment_intent_data = {
    transfer_data: { destination: dest },
  };
  if (!Number.isNaN(application_fee_amount)) {
    payment_intent_data.application_fee_amount = application_fee_amount;
  }
  return { payment_intent_data };
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString();
        resolve(raw ? JSON.parse(raw) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

function getPlatformSecretKey() {
  return process.env.STRIPE_SECRET_KEY || process.env.SHOPSITE_STRIPE_SECRET_KEY || '';
}

function jsonResponse(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

function noPlatformKey(res) {
  jsonResponse(res, 503, {
    error:
      'Set STRIPE_SECRET_KEY or SHOPSITE_STRIPE_SECRET_KEY in .env.local for Stripe (your platform key).',
  });
}

function stripeEmbeddedSessionPlugin() {
  return {
    name: 'stripe-embedded-checkout-session',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0] || '';

        if (url === '/api/stripe/create-embedded-checkout-session' && req.method === 'POST') {
          const secretKey = getPlatformSecretKey();
          if (!secretKey) return noPlatformKey(res);
          let body;
          try {
            body = await readJsonBody(req);
          } catch {
            return jsonResponse(res, 400, { error: 'Invalid JSON body' });
          }
          const { priceId, mode = 'subscription', returnUrl, quantity = 1 } = body;
          if (!priceId || !returnUrl) {
            return jsonResponse(res, 400, { error: 'priceId and returnUrl are required' });
          }
          const stripe = new Stripe(secretKey);
          try {
            const connectFields = checkoutSessionConnectFields(mode, process.env);
            const session = await stripe.checkout.sessions.create({
              ui_mode: 'embedded',
              mode,
              line_items: [{ price: priceId, quantity: Number(quantity) || 1 }],
              return_url: returnUrl,
              ...connectFields,
            });
            return jsonResponse(res, 200, { clientSecret: session.client_secret });
          } catch (e) {
            return jsonResponse(res, 500, { error: e.message || 'Stripe error' });
          }
        }

        if (url === '/api/stripe/connect/create-account' && req.method === 'POST') {
          const secretKey = getPlatformSecretKey();
          if (!secretKey) return noPlatformKey(res);
          let body = {};
          try {
            body = await readJsonBody(req);
          } catch {
            return jsonResponse(res, 400, { error: 'Invalid JSON body' });
          }
          const stripe = new Stripe(secretKey);
          try {
            const account = await stripe.accounts.create({
              controller: {
                stripe_dashboard: { type: 'express' },
                fees: { payer: 'application' },
                losses: { payments: 'application' },
              },
              capabilities: {
                card_payments: { requested: true },
                transfers: { requested: true },
              },
              email: typeof body.email === 'string' ? body.email : undefined,
              business_type: typeof body.businessType === 'string' ? body.businessType : undefined,
            });
            return jsonResponse(res, 200, {
              accountId: account.id,
              chargesEnabled: account.charges_enabled,
              payoutsEnabled: account.payouts_enabled,
              detailsSubmitted: account.details_submitted,
            });
          } catch (e) {
            return jsonResponse(res, 500, { error: e.message || 'Stripe error' });
          }
        }

        if (url === '/api/stripe/connect/account-link' && req.method === 'POST') {
          const secretKey = getPlatformSecretKey();
          if (!secretKey) return noPlatformKey(res);
          let body = {};
          try {
            body = await readJsonBody(req);
          } catch {
            return jsonResponse(res, 400, { error: 'Invalid JSON body' });
          }
          const { accountId, returnUrl, refreshUrl } = body;
          if (!accountId || !returnUrl || !refreshUrl) {
            return jsonResponse(res, 400, {
              error: 'accountId, returnUrl, refreshUrl are required',
            });
          }
          const stripe = new Stripe(secretKey);
          try {
            const link = await stripe.accountLinks.create({
              account: accountId,
              type: 'account_onboarding',
              return_url: returnUrl,
              refresh_url: refreshUrl,
            });
            return jsonResponse(res, 200, { url: link.url });
          } catch (e) {
            return jsonResponse(res, 500, { error: e.message || 'Stripe error' });
          }
        }

        if (url === '/api/stripe/connect/account' && req.method === 'GET') {
          const secretKey = getPlatformSecretKey();
          if (!secretKey) return noPlatformKey(res);
          const accountId = new URL(req.url, 'http://x').searchParams.get('accountId');
          if (!accountId) {
            return jsonResponse(res, 400, { error: 'accountId is required' });
          }
          const stripe = new Stripe(secretKey);
          try {
            const account = await stripe.accounts.retrieve(accountId);
            return jsonResponse(res, 200, {
              accountId: account.id,
              chargesEnabled: account.charges_enabled,
              payoutsEnabled: account.payouts_enabled,
              detailsSubmitted: account.details_submitted,
            });
          } catch (e) {
            return jsonResponse(res, 500, { error: e.message || 'Stripe error' });
          }
        }

        return next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  for (const k of Object.keys(env)) {
    process.env[k] = env[k];
  }

  return {
    plugins: [react(), stripeEmbeddedSessionPlugin()],
  };
});

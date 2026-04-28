import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from '../components/Button';
import { getConnectEndpoints } from '../lib/stripeEnv';

const STORAGE_KEY = 'shopsite-connect-account-id';

/**
 * One-time Stripe Connect onboarding for a client. Workflow per deploy:
 *   1. Open /seller-onboarding on this site (with platform STRIPE_SECRET_KEY in env).
 *   2. Click "Create Stripe account" → server creates an Express connected account (acct_…).
 *   3. Click "Continue to Stripe" → Stripe-hosted onboarding (collects bank info / KYC).
 *   4. After return, copy the displayed acct_… into STRIPE_CONNECT_DESTINATION_ACCOUNT for that deploy.
 *
 * This page is deliberately unlinked from public nav. It's an admin/setup tool, not a customer surface.
 */
export default function SellerOnboarding() {
  const [params] = useSearchParams();
  const [accountId, setAccountId] = useState(() => localStorage.getItem(STORAGE_KEY) || '');
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const endpoints = getConnectEndpoints();

  const refreshStatus = useCallback(
    async (id) => {
      if (!id) return;
      setError(null);
      try {
        const res = await fetch(
          `${endpoints.accountStatus}?accountId=${encodeURIComponent(id)}`
        );
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || `Status check failed (${res.status})`);
        setStatus(data);
      } catch (e) {
        setError(e.message);
      }
    },
    [endpoints.accountStatus]
  );

  useEffect(() => {
    if (accountId) refreshStatus(accountId);
  }, [accountId, refreshStatus]);

  const createAccount = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(endpoints.createAccount, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `Create failed (${res.status})`);
      localStorage.setItem(STORAGE_KEY, data.accountId);
      setAccountId(data.accountId);
      setStatus(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  const continueOnboarding = async () => {
    if (!accountId) return;
    setBusy(true);
    setError(null);
    try {
      const origin = window.location.origin;
      const res = await fetch(endpoints.accountLink, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountId,
          returnUrl: `${origin}/seller-onboarding?onboarded=1`,
          refreshUrl: `${origin}/seller-onboarding?refresh=1`,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.url) throw new Error(data.error || `Link failed (${res.status})`);
      window.location.href = data.url;
    } catch (e) {
      setError(e.message);
      setBusy(false);
    }
  };

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAccountId('');
    setStatus(null);
    setError(null);
  };

  const onboarded = params.get('onboarded') === '1';
  const ready = status?.chargesEnabled && status?.payoutsEnabled && status?.detailsSubmitted;

  return (
    <div className="flex-grow px-4 sm:px-6 lg:px-8 max-w-[820px] mx-auto w-full mt-12 mb-24">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-blue-300/90 mb-2">
          Admin · Setup
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
          Connect Stripe to receive payouts
        </h1>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8">
          One-time setup. We'll create a Stripe Express account for this site, then send you to
          Stripe to add bank details and verify identity. After you return, copy the{' '}
          <code className="font-mono text-xs text-slate-200 bg-black/30 px-1.5 py-0.5 rounded">
            acct_…
          </code>{' '}
          ID below into the deploy's{' '}
          <code className="font-mono text-xs text-slate-200 bg-black/30 px-1.5 py-0.5 rounded">
            STRIPE_CONNECT_DESTINATION_ACCOUNT
          </code>
          .
        </p>

        {onboarded ? (
          <div className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
            Returned from Stripe. Status refreshed below.
          </div>
        ) : null}

        {error ? (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </div>
        ) : null}

        {!accountId ? (
          <Button variant="primary" onClick={createAccount} disabled={busy}>
            {busy ? 'Creating…' : 'Create Stripe account'}
          </Button>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 mb-1">
                Connected account ID
              </p>
              <p className="font-mono text-sm text-white break-all select-all">{accountId}</p>
              <p className="text-xs text-slate-400 mt-2">
                Paste this into <code className="text-slate-200">STRIPE_CONNECT_DESTINATION_ACCOUNT</code>{' '}
                for this client's deploy.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
              <StatusPill label="Details submitted" ok={status?.detailsSubmitted} />
              <StatusPill label="Charges enabled" ok={status?.chargesEnabled} />
              <StatusPill label="Payouts enabled" ok={status?.payoutsEnabled} />
            </div>

            <div className="flex flex-wrap gap-3">
              {!ready ? (
                <Button variant="primary" onClick={continueOnboarding} disabled={busy}>
                  {busy ? 'Loading…' : 'Continue to Stripe'}
                </Button>
              ) : (
                <span className="self-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-200">
                  Ready for live charges
                </span>
              )}
              <Button variant="outline" onClick={() => refreshStatus(accountId)} disabled={busy}>
                Refresh status
              </Button>
              <Button variant="empty" onClick={reset}>
                Forget this account on this device
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusPill({ label, ok }) {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${
        ok
          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-100'
          : 'border-white/10 bg-white/5 text-slate-300'
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${ok ? 'bg-emerald-400' : 'bg-slate-500'}`}
        aria-hidden="true"
      />
      <span className="text-xs">{label}</span>
    </div>
  );
}

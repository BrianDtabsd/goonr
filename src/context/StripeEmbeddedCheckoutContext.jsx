import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { getCreateCheckoutSessionUrl, getStripePublishableKey } from '../lib/stripeEnv';

const StripeEmbeddedCheckoutContext = createContext(null);

/**
 * Opens Stripe Embedded Checkout (Checkout Session, ui_mode=embedded).
 * Backend must create the session and return client_secret (see vite dev middleware).
 */
export function StripeEmbeddedCheckoutProvider({ children }) {
  const [sessionRequest, setSessionRequest] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const mountRef = useRef(null);
  const checkoutRef = useRef(null);

  const closeEmbeddedCheckout = useCallback(() => {
    try {
      checkoutRef.current?.destroy?.();
    } catch {
      /* ignore */
    }
    checkoutRef.current = null;
    setSessionRequest(null);
    setError(null);
    setLoading(false);
  }, []);

  const openEmbeddedCheckout = useCallback((opts) => {
    const key = getStripePublishableKey();
    if (!key) {
      setError('Add VITE_STRIPE_PUBLISHABLE_KEY to your environment.');
      setSessionRequest({ _blocked: true });
      return;
    }
    if (!opts?.priceId) return;
    setError(null);
    setSessionRequest({
      priceId: opts.priceId,
      mode: opts.mode || 'subscription',
      quantity: opts.quantity ?? 1,
      returnPath: opts.returnPath || '/checkout',
    });
  }, []);

  useEffect(() => {
    if (!sessionRequest || sessionRequest._blocked) return undefined;

    let cancelled = false;

    const run = async () => {
      setLoading(true);
      setError(null);
      const key = getStripePublishableKey();
      const endpoint = getCreateCheckoutSessionUrl();
      const returnUrl = `${window.location.origin}${sessionRequest.returnPath}?session_id={CHECKOUT_SESSION_ID}`;

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            priceId: sessionRequest.priceId,
            mode: sessionRequest.mode,
            quantity: sessionRequest.quantity,
            returnUrl,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.clientSecret) {
          throw new Error(data.error || `Could not start checkout (${res.status})`);
        }
        if (cancelled) return;

        const stripe = await loadStripe(key);
        if (!stripe || cancelled) return;

        const checkout = await stripe.createEmbeddedCheckoutPage({
          clientSecret: data.clientSecret,
        });
        if (cancelled) {
          checkout.destroy?.();
          return;
        }
        const el = mountRef.current;
        if (!el) {
          checkout.destroy?.();
          throw new Error('Checkout container not ready');
        }
        checkoutRef.current = checkout;
        checkout.mount(el);
      } catch (e) {
        if (!cancelled) {
          setError(e.message || 'Checkout failed');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();

    return () => {
      cancelled = true;
      try {
        checkoutRef.current?.destroy?.();
      } catch {
        /* ignore */
      }
      checkoutRef.current = null;
    };
  }, [sessionRequest]);

  const value = useMemo(
    () => ({ openEmbeddedCheckout, closeEmbeddedCheckout }),
    [openEmbeddedCheckout, closeEmbeddedCheckout]
  );

  const showOverlay = Boolean(sessionRequest);

  return (
    <StripeEmbeddedCheckoutContext.Provider value={value}>
      {children}
      {showOverlay ? (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Stripe checkout"
        >
          <div className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-slate-950 p-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={closeEmbeddedCheckout}
              className="absolute right-3 top-3 z-10 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/10"
            >
              Close
            </button>
            {sessionRequest._blocked ? (
              <p className="pr-16 pt-1 text-sm text-amber-200/90">{error}</p>
            ) : (
              <>
                {loading ? (
                  <p className="pr-16 pt-1 text-sm text-slate-400">Loading secure checkout…</p>
                ) : null}
                {error ? (
                  <p className="pr-16 pt-1 text-sm text-red-300">{error}</p>
                ) : null}
                <div ref={mountRef} className="mt-2 min-h-[120px]" id="embedded-checkout" />
              </>
            )}
          </div>
        </div>
      ) : null}
    </StripeEmbeddedCheckoutContext.Provider>
  );
}

export function useStripeEmbeddedCheckout() {
  const ctx = useContext(StripeEmbeddedCheckoutContext);
  if (!ctx) {
    throw new Error('useStripeEmbeddedCheckout must be used within StripeEmbeddedCheckoutProvider');
  }
  return ctx;
}

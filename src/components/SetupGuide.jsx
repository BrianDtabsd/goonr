import React, { useState } from 'react';

/** Copy button + <pre>. */
function CodeBlock({ children }) {
  const [copied, setCopied] = useState(false);
  const text = String(children).trim();
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      /* ignore */
    }
  };
  return (
    <div className="relative my-2">
      <pre className="whitespace-pre-wrap break-words bg-black/60 border border-white/10 rounded-lg px-3 py-2 pr-16 text-[11.5px] leading-snug text-slate-100 font-mono">
        {text}
      </pre>
      <button
        type="button"
        onClick={copy}
        className="absolute top-1.5 right-1.5 text-[10px] uppercase tracking-wider px-2 py-1 rounded-md border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

function Step({ n, title, children }) {
  return (
    <details className="rounded-lg border border-white/10 bg-slate-900/40">
      <summary className="cursor-pointer px-3 py-2 text-xs font-semibold text-slate-100 list-none flex items-center gap-2">
        <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-blue-500/20 border border-blue-400/30 text-[11px] text-blue-200 font-mono">
          {n}
        </span>
        <span>{title}</span>
      </summary>
      <div className="border-t border-white/10 px-3 py-3 text-[12px] text-slate-300 leading-relaxed space-y-2">
        {children}
      </div>
    </details>
  );
}

export default function SetupGuide() {
  return (
    <details className="mb-6 rounded-lg border border-blue-400/30 bg-blue-500/5">
      <summary className="cursor-pointer px-3 py-2 text-xs font-semibold text-blue-100 flex items-center gap-2">
        <span>📘 Client site setup checklist</span>
        <span className="ml-auto text-[10px] font-mono uppercase tracking-wider text-blue-300/70">
          Studio
        </span>
      </summary>

      <div className="border-t border-blue-400/20 p-3 space-y-2">
        <p className="text-[12px] text-slate-300 leading-relaxed">
          Repeat these steps for every new client. Studio panel + this guide are hidden on
          client-facing deploys (set <code className="font-mono text-[11px] bg-black/40 px-1 rounded">VITE_SHOPSITE_STUDIO_MODE=off</code>).
        </p>

        <Step n="1" title="Duplicate the template for the client">
          <p>Copy the repo (or use a fresh branch / Cloudflare Pages project per client). Each client gets their own deploy with their own env.</p>
          <CodeBlock>{`# Example
git clone <template-repo> client-acme-site
cd client-acme-site
npm install`}</CodeBlock>
        </Step>

        <Step n="2" title="Create a `.env.local` for this client">
          <p>Set branding + Stripe keys (yours, the platform). Do not commit.</p>
          <CodeBlock>{`# Branding (per client)
VITE_SITE_BRAND_NAME=Acme
VITE_SITE_TITLE=Acme — Environmental Intelligence
VITE_SITE_META_DESCRIPTION=Short SEO description.
VITE_SITE_FOOTER_BLURB=One-paragraph footer line.

# Stripe — your platform keys (same on every client deploy)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_or_test_...
STRIPE_SECRET_KEY=sk_live_or_test_...

# Studio mode is ON during build/setup. Flip OFF before delivery (Step 9).
VITE_SHOPSITE_STUDIO_MODE=on`}</CodeBlock>
        </Step>

        <Step n="3" title="Edit copy in `src/content/*.js` (or use Site Copy below)">
          <p>Hero, home sections, pricing tiers, FAQ, store, sales, blog — everything reads from <code className="font-mono text-[11px]">src/content/*.js</code>. The <strong>Site copy</strong> editor in this panel writes into localStorage; for permanent changes, edit the source files.</p>
        </Step>

        <Step n="4" title="In your Stripe Dashboard, create products + prices">
          <p>Create one Product per plan, each with a recurring Price (or one-time). Copy each <code className="font-mono text-[11px]">price_…</code> ID.</p>
          <p>Paste into <code className="font-mono text-[11px]">src/content/pricing.js</code> as <code className="font-mono text-[11px]">cta.stripePriceId</code>. Use <code className="font-mono text-[11px]">stripeCheckoutMode: 'subscription'</code> or <code className="font-mono text-[11px]">'payment'</code>.</p>
        </Step>

        <Step n="5" title="Onboard the client to Stripe Connect">
          <p>Open <a className="text-blue-300 underline" href="/seller-onboarding">/seller-onboarding</a> on this site. Click <em>Create Stripe account</em>, then <em>Continue to Stripe</em>. The client adds bank + identity. After return, copy the <code className="font-mono text-[11px]">acct_…</code> ID.</p>
        </Step>

        <Step n="6" title="Set Connect destination + your fee">
          <p>Add to <code className="font-mono text-[11px]">.env.local</code> for this client:</p>
          <CodeBlock>{`STRIPE_CONNECT_DESTINATION_ACCOUNT=acct_xxx
STRIPE_CONNECT_APPLICATION_FEE_PERCENT=5     # subscriptions cut (your fee)
STRIPE_CONNECT_APPLICATION_FEE_AMOUNT=100    # one-time payments cut, in cents`}</CodeBlock>
          <p>Funds settle to <strong>their</strong> bank; your <em>application fee</em> lands in your platform balance.</p>
        </Step>

        <Step n="7" title="Deploy the Cloudflare Worker (one per client)">
          <p>The Worker creates Checkout Sessions and runs Connect endpoints in production.</p>
          <CodeBlock>{`cd worker
npm install
npx wrangler login                          # one-time
# Edit wrangler.jsonc → name + ALLOWED_ORIGINS + Connect vars (same as Step 6)
npx wrangler secret put STRIPE_SECRET_KEY   # paste your platform sk_…
npx wrangler deploy`}</CodeBlock>
          <p>Note the deployed URL, e.g. <code className="font-mono text-[11px]">https://shopsite-stripe-api-acme.&lt;account&gt;.workers.dev</code>.</p>
        </Step>

        <Step n="8" title="Point the site at the Worker">
          <p>Add this to <code className="font-mono text-[11px]">.env.local</code> (and the host's env vars when deploying):</p>
          <CodeBlock>{`VITE_STRIPE_API_BASE=https://shopsite-stripe-api-acme.<account>.workers.dev`}</CodeBlock>
          <p>Both <code className="font-mono text-[11px]">/checkout</code> and <code className="font-mono text-[11px]">/seller-onboarding</code> will hit that URL.</p>
        </Step>

        <Step n="9" title="Hide the studio before delivery">
          <p>Final build for the client:</p>
          <CodeBlock>{`# in the client's deploy environment (Cloudflare Pages / Vercel / etc.)
VITE_SHOPSITE_STUDIO_MODE=off`}</CodeBlock>
          <p>This hides the gear icon, this checklist, and removes <code className="font-mono text-[11px]">/seller-onboarding</code> from the router.</p>
          <p>Quick toggle (your machine only): visit <code className="font-mono text-[11px]">?studio=on</code> or <code className="font-mono text-[11px]">?studio=off</code>.</p>
        </Step>

        <Step n="10" title="Smoke test in test mode first">
          <p>With <code className="font-mono text-[11px]">pk_test_/sk_test_</code> keys: open <code className="font-mono text-[11px]">/checkout</code>, run a card <code className="font-mono text-[11px]">4242 4242 4242 4242</code>, any future date, any CVC. Confirm:</p>
          <ul className="list-disc list-inside ml-2 space-y-1">
            <li>Embedded checkout loads in a modal.</li>
            <li>Stripe Dashboard shows the Charge with <em>Application fee</em> on your platform.</li>
            <li>Connected account balance shows the rest.</li>
          </ul>
          <p>Then swap to live keys and re-test with a real card you control.</p>
        </Step>

        <Step n="11" title="Build &amp; deploy the static site">
          <p>Static frontend deploy (e.g. Cloudflare Pages):</p>
          <CodeBlock>{`npm run build         # outputs to dist/
# Cloudflare Pages: connect repo, build cmd: npm run build, output: dist
# Vercel/Netlify: same idea`}</CodeBlock>
          <p>Set the same <code className="font-mono text-[11px]">VITE_*</code> vars in the host's project settings (do not rely on <code className="font-mono text-[11px]">.env.local</code> in production).</p>
        </Step>

        <Step n="12" title="Hand-off">
          <ul className="list-disc list-inside ml-2 space-y-1">
            <li>Send the client the live URL.</li>
            <li>Send invoice for build + monthly hosting (separate from Connect fee).</li>
            <li>Confirm <code className="font-mono text-[11px]">VITE_SHOPSITE_STUDIO_MODE=off</code> on the live deploy.</li>
            <li>Bookmark <code className="font-mono text-[11px]">/seller-onboarding?studio=on</code> for yourself if you ever need to re-run setup.</li>
          </ul>
        </Step>
      </div>
    </details>
  );
}

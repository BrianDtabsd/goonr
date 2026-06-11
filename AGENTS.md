# AGENTS.md

Guidance for cloud agents working in this repository.

## Product

**GAQO** (Global Air Quality Observatory) / ShopSite — a React + Vite multi-page marketing and commerce site with studio theming, page visibility controls, and optional Stripe Embedded Checkout.

## Commands

Standard scripts are in `package.json` and `CLAUDE.md`:

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server at http://localhost:5173 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve `dist/` (default http://localhost:4173) |
| `npm run lint` | ESLint — **currently broken**: `eslint` is not listed in `devDependencies` |

No test framework is configured.

## Cursor Cloud specific instructions

### Services

| Service | When needed | Start |
|---------|-------------|-------|
| **Vite dev server** | Required for local development | `npm run dev` |
| **Cloudflare Worker** (`worker/`) | Optional in dev; required for production Stripe API parity | `cd worker && npm run dev` (port 8787) |
| **Stripe** | Optional for browsing; required for checkout / Connect | Keys in `.env.local` (see below) |

For most frontend work, only the Vite dev server is required. The Vite config embeds Stripe API middleware when `VITE_STRIPE_API_BASE` is unset, so you do not need the Worker running locally unless testing cross-origin or production parity.

### Environment variables

Create `.env.local` at the repo root (gitignored) for Stripe flows:

- `STRIPE_SECRET_KEY` — enables Vite dev middleware checkout endpoints
- `VITE_STRIPE_PUBLISHABLE_KEY` — client-side Embedded Checkout
- `VITE_SHOPSITE_STUDIO_MODE` — `off` hides the settings panel and `/seller-onboarding`

Worker secrets: copy `worker/.dev.vars.example` to `worker/.dev.vars`.

### Studio mode

The blue gear button (bottom-right) opens Theme Settings when studio mode is on (default). Runtime override: `?studio=on|off` (persisted in `localStorage`).

### Routing

The app uses `react-router-dom` (not hash-only anchors). Routes include `/`, `/store`, `/checkout`, `/learn`, `/sales`, and `/seller-onboarding` (studio only).

### Lint caveat

`npm run lint` fails with `eslint: not found` because ESLint is referenced in scripts but not installed. Use `npm run build` as the primary static check until ESLint is added to `devDependencies`.

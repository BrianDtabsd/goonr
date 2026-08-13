# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # Production build to dist/
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

Lint uses ESLint's flat config in `eslint.config.js` and covers the app and Worker source. No test framework is configured.

## Architecture

**ShopSite** is a React + Vite multi-page marketing and commerce template with studio theming, page visibility controls, and optional Stripe Embedded Checkout.

**Stack:** React 18 + Vite + Tailwind CSS + react-router-dom.

**Entry flow:** `main.jsx` → `App.jsx` → providers (theme, template content, visibility, Stripe) → routes via `Layout` (Header + Hero + Outlet + Footer). Studio gear mounts `SettingsPanel` when studio mode is on.

**Components** (`src/components/`) are self-contained page sections. Marketing copy lives in `src/content/*.js` and can be overridden live via Studio (localStorage). Brand defaults live in `src/config/siteMeta.js`.

**Animation system:** CSS classes (`anim-trigger`, `anim-fade-up`, `anim-line`, `anim-wrap`) defined in `src/index.css` trigger via the `useScrollReveal` hook (`src/hooks/useScrollReveal.js`), which uses IntersectionObserver to add `.is-visible` at 15% threshold. Respects `prefers-reduced-motion`. Stagger delays are set via inline `transitionDelay` style props.

**Styling conventions:**
- All styling via Tailwind utility classes inline — no CSS modules or component-level stylesheets.
- Glassmorphism pattern: `backdrop-blur-xl` + `bg-white/40` opacity layers.
- Icons via `<iconify-icon icon="solar:...">` web component (from `iconify-icon` npm package).
- Use `clsx` + `tailwind-merge` for conditional class composition.

**`src/lib/auraCms.js`** — CMS bridge for the Aura preview runtime. Communicates via `window.parent.postMessage`. Exports `fetchAuraCMSCollection()` and `useAuraCMSCollection()` hook. Currently unused by any component; wired up for future CMS-driven content.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # Production build to dist/
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

No test framework is configured.

## Architecture

**GAQO** (Global Air Quality Observatory) is a single-page marketing/landing site for an environmental monitoring platform.

**Stack:** React 18 + Vite + Tailwind CSS. No routing library — navigation is hash-based anchor links (`#features`, `#pricing`, etc.).

**Entry flow:** `main.jsx` → `App.jsx` → section components rendered sequentially. `App.jsx` sets up the global background (gradient + SVG grid pattern) and calls `useScrollReveal()`.

**Components** (`src/components/`) are self-contained page sections. Each renders its own eyebrow label, heading, description, and content grid. All data is hardcoded inside the component files — no external data fetching is active.

**Animation system:** CSS classes (`anim-trigger`, `anim-fade-up`, `anim-line`, `anim-wrap`) defined in `src/index.css` trigger via the `useScrollReveal` hook (`src/hooks/useScrollReveal.js`), which uses IntersectionObserver to add `.is-visible` at 15% threshold. Respects `prefers-reduced-motion`. Stagger delays are set via inline `transitionDelay` style props.

**Styling conventions:**
- All styling via Tailwind utility classes inline — no CSS modules or component-level stylesheets.
- Glassmorphism pattern: `backdrop-blur-xl` + `bg-white/40` opacity layers.
- Icons via `<iconify-icon icon="solar:...">` web component (from `iconify-icon` npm package).
- Use `clsx` + `tailwind-merge` for conditional class composition.

**`src/lib/auraCms.js`** — CMS bridge for the Aura preview runtime. Communicates via `window.parent.postMessage`. Exports `fetchAuraCMSCollection()` and `useAuraCMSCollection()` hook. Currently unused by any component; wired up for future CMS-driven content.

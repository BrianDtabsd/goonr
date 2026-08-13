---
name: testing-shopsite-scroll-studio
description: How to browser-test the ShopSite (goonr) React+Vite app — starting the dev server, switching Studio modes, reaching the mobile ≤900px Studio bottom sheet with a real window resize, verifying the unified `.studio-site-pane` scrollport / sticky header / scroll reveals / hash navigation, and avoiding known false-failure traps.
---

# Testing ShopSite (goonr) scroll + Studio behaviour

## Runtime setup

```bash
cd /home/ubuntu/repos/goonr
npm run dev > /tmp/vite.log 2>&1 &   # http://localhost:5173
```
`node_modules` is usually already present; no test framework is configured, so all verification is browser/E2E.

## Studio modes

- Studio is ON by default. Override with `?studio=on` / `?studio=off` (persisted in `localStorage`).
- Studio-off adds class `is-site-only` to `.studio-split` and does not mount `SettingsPanel`.
- The blue gear (bottom-right) opens the Studio panel. The `Look` tab holds Surface (Glass/Foundation), Theme presets and the Panel strength slider.
- Panel strength is an `<input type="range">`: click it once, then use `Home` / `End` / arrow keys for exact 0% / 100% / intermediate values instead of pixel-precise dragging.

## The scroll architecture (what to assert against)

- `.studio-site-pane` is the scrollport in **all** states — the window/document does NOT scroll. Assert `document.querySelector('.studio-site-pane').scrollTop` changes while `document.scrollingElement.scrollTop` stays 0.
- The header is `position: sticky; top: 0` inside the pane (there is no `.site-header-mask` element any more).
- `scroll-padding-top` on the pane is set from the header's measured height via `ResizeObserver` (typically `80px` at desktop widths). For a hash target, the correct assertion is `targetRect.top === headerRect.bottom` (gap 0) — the section's top edge sits exactly under the nav, which is intended.
- Scroll reveals use the pane as the IntersectionObserver root. Corroborate with `document.querySelectorAll('.anim-trigger').length` vs `.anim-trigger.is-visible` — the visible count should rise as you scroll and reach the total by the bottom.

## Mobile Studio bottom sheet (≤900px)

Use a **real window resize**, not devtools emulation:

```bash
wmctrl -r :ACTIVE: -b remove,maximized_vert,maximized_horz
wmctrl -r :ACTIVE: -e 0,0,0,880,1100     # → innerWidth 848, matchMedia('(max-width: 900px)') true
wmctrl -r :ACTIVE: -e 0,0,0,700,1100     # narrow enough for the hamburger nav
wmctrl -r :ACTIVE: -b add,maximized_vert,maximized_horz   # back to desktop
```

Sheet behaviour to assert: collapsed height exactly `72px`; expanded `Math.min(window.innerHeight * 0.82, 720)`; tap on the drag pill toggles; movement is only treated as a resize past a **5px** threshold (so a ~3px jitter must toggle, not resize to ~75px); the pane gets `padding-bottom` equal to the sheet height so the footer's `©` line clears the sheet.

To capture a drag mid-gesture, move the mouse to the start point first, then `left_mouse_down` with no coordinate, move, screenshot **while still held**, then `left_mouse_up`.

## Known traps / false failures

- **Vite HMR reloads can look like an app bug.** If you plant a `window.__marker` to prove a hash click did not reload the page and the marker disappears, re-read the console: a `[vite] connecting...` line at that moment means HMR reloaded the document, not the app. Retest before reporting a failure — hash clicks on `/` are expected to scroll the pane in place with no reload and to keep Studio open.
- Studio open state does not survive a full page reload, so a lost panel is a reload symptom rather than a separate bug.
- `Layout` renders `<Hero />` on **every** route, so on `/store`, `/checkout`, `/learn`, `/sales` you must scroll past the homepage hero to see route content. Not a bug.
- Chrome's address bar autocompletes previous paths; `ctrl+a` then type the full `localhost:5173/...` URL.
- Stripe keys are not configured in this environment, so `/checkout` Subscribe and `/seller-onboarding` account creation cannot succeed — only verify graceful degradation.

## Devin Secrets Needed

- None for scroll/Studio/theme/route testing.
- `STRIPE_SECRET_KEY` and `VITE_STRIPE_PUBLISHABLE_KEY` would be required to test checkout/payment or Stripe Connect onboarding end to end.

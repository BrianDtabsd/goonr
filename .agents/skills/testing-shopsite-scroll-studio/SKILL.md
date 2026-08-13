---
name: testing-shopsite-scroll-studio
description: How to browser-test the ShopSite (goonr) React+Vite app — starting the dev server, switching Studio modes, reaching the mobile ≤900px Studio bottom sheet with a real window resize, verifying the unified `.studio-site-pane` scrollport / sticky header / scroll reveals / hash navigation, A/B-ing a branch against its base for theme-migration parity, and avoiding known false-failure traps.
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
- Panel strength / Quick strength and the other sliders are `<input type="range">`: click one once, then use `Home` / `End` / arrow keys for exact 0% / 100% / intermediate values instead of pixel-precise dragging.
- The `Look` tab holds collapsible `<details>` groups (Theme preset · Mode · Layout · Surface & depth · Typography · Colour · Buttons · Navigation · Background). Groups that were explicitly customised show a `Custom` badge and a per-group `Reset`.

## Look-tab gotchas when verifying "does this control work?"

Assert the runtime CSS variable or a visible change, never just that the control moved:

- Background **Pattern = Mesh** only renders when Content layout is the container/full-page mode (`Layout.jsx` gates it) — testing it in `cards` layout produces a false failure.
- Background **Image URL** sits behind opaque page gradients in some surface systems, so a photo may not be visible even when `--bg-url` is set correctly. Compare against the base branch before calling it a regression.
- `buttonGlow` should show on `:hover` / `:focus-visible`, not only `:active` — hover the button **without** pressing the mouse down and screenshot while hovering.
- To prove opacity and blur are independent, set opacity to 0 with a large frost: you should see no card fill but a visibly blurred backdrop inside the card's rectangle.
- When sampling a card's computed style, exclude wrapper/shell elements (e.g. `.glass-card--content-shell`) and pills — pick a large actual content card, or you will read a non-consuming element.
- A `Legacy type bundle` style select may store its value without any runtime effect; check whether the key is actually consumed when theme vars are applied before trusting the control.

## A/B-ing a branch against its base (theme migrations, visual parity)

When a change could alter how an *existing* saved site renders, run both branches side by side rather than eyeballing one:

```bash
git -C /home/ubuntu/repos/goonr worktree add /tmp/goonr-base <base-branch>
ln -s /home/ubuntu/repos/goonr/node_modules /tmp/goonr-base/node_modules
cd /tmp/goonr-base && npx vite --port 5174 > /tmp/vite-base.log 2>&1 &
```

Open one Chrome tab per port. Different ports are different origins, so **`localStorage` must be seeded separately in each tab**.

Compare numerically, not by screenshot alone — read the theme CSS custom properties off `document.documentElement` in both tabs and diff them:
`--card-opacity`, `--card-frost`, `--card-border-opacity`, `--frost-level`, `--frost-rgb`, `--transparency-level`, `--nav-surface`, `--card-radius`, `--card-padding`, `--page-canvas`, `--primary-color`, `--container-opacity`, `--container-frost`, `--nav-border-width`, `--nav-border-color`, `--text-body-size`.

## Theme storage & migration testing

The theme is persisted under a versioned key (currently `shopsite-theme-v5`, with legacy `v4` / `v3` / `v2` readers). The loader prefers the newest key and the provider **rewrites the newest key on mount**.

**Seeding rule:** before every migration test, delete *all* theme keys (`v5`, `v4`, `v3`, `v2`), then write only the one legacy fixture you want, then reload. A stale newest-version key silently masks the fixture and makes a broken migration look fine.

Seed a *realistic full* legacy object (the base branch's `defaultTheme` shape, including keys that version's code never read), not a one-key stub — migration bugs usually live in how dead keys are or aren't adopted. Different legacy versions can legitimately be treated differently (e.g. keys that were dead in v4 are re-derived, but the same keys in v3 were real controls and must be adopted verbatim), so test at least two versions: a build that treats them identically must fail one of the two.
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
- The Studio **Copy** tab has a translucent `sticky bottom-0` "Backup & reset" block. Content genuinely scrolls *under* it, so section rows ghosting through it is a long-standing cosmetic trait of that markup, not necessarily a new regression. Verify by measuring the same overlap on the base branch (`getBoundingClientRect` of the block vs each `summary`) before blaming a branch — a denser panel redesign can make a pre-existing ghost newly *visible* without changing the component.
- Screenshot pixel coordinates are downscaled relative to real CSS pixels on this display, so a `getBoundingClientRect().top` larger than the screenshot height can still be on-screen. Compare rects against `window.innerHeight`, never against screenshot coordinates.
- Chrome's address bar autocompletes previous paths; `ctrl+a` then type the full `localhost:5173/...` URL.
- Stripe keys are not configured in this environment, so `/checkout` Subscribe and `/seller-onboarding` account creation cannot succeed — only verify graceful degradation.

## Devin Secrets Needed

- None for scroll/Studio/theme/route testing.
- `STRIPE_SECRET_KEY` and `VITE_STRIPE_PUBLISHABLE_KEY` would be required to test checkout/payment or Stripe Connect onboarding end to end.

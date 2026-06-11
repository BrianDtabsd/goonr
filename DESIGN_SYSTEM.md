# GAQO Design System

**Version:** 1.0  
**Source of truth:** This repo's marketing site (`src/`)  
**Machine-readable tokens:** `src/lib/designTokens.js`  
**Accent helpers:** `src/lib/cardTokens.js`

Use this document when building any frontend that should match the GAQO visual language — including the **case management agent spine pipeline** UI. An implementing agent must follow these decisions exactly and must **not** invent its own colors, fonts, radii, or component styles.

---

## Table of contents

1. [Agent rules (read first)](#1-agent-rules-read-first)
2. [Tech stack requirements](#2-tech-stack-requirements)
3. [Color palette](#3-color-palette)
4. [Typography](#4-typography)
5. [Spacing & layout](#5-spacing--layout)
6. [Glass surfaces](#6-glass-surfaces)
7. [Element library](#7-element-library)
8. [Icons](#8-icons)
9. [Motion & animation](#9-motion--animation)
10. [Case management domain mappings](#10-case-management-domain-mappings)
11. [Page templates](#11-page-templates)
12. [File reference](#12-file-reference)

---

## 1. Agent rules (read first)

### DO

- Import tokens from `src/lib/designTokens.js`
- Use the six accent names only: `blue`, `emerald`, `amber`, `rose`, `purple`, `white`
- Use `semantic.*` for success / warning / error / info / neutral feedback
- Use `domain.*` mappings for case status, pipeline stages, agent actions, and priority
- Copy class strings from `element.*` verbatim
- Use the `Button`, `ContentCard`, and `SectionHeader` components from this repo when possible
- Use Solar icons via `<iconify-icon icon="solar:...">` only
- Respect `prefers-reduced-motion`

### DO NOT

- Invent new hex colors or arbitrary Tailwind color classes (e.g. `text-cyan-400`, `bg-orange-500`)
- Use a different font family
- Use a light/white page background — this is a **dark glass** theme
- Use sharp 4px corners on cards (minimum card radius is 22px)
- Use Material UI, Chakra, or other component libraries with their own design language
- Use emoji as icons
- Create new accent/status color names without updating `designTokens.js` first

### Decision hierarchy

When unsure, resolve in this order:

1. `domain.*` mapping (case management specifics)
2. `semantic.*` (feedback states)
3. `accentColors` via `getAccent(name)` (categorical color)
4. `palette.*` (structural colors)
5. Ask — do not guess

---

## 2. Tech stack requirements

| Layer | Choice |
|-------|--------|
| Framework | React 18+ |
| Styling | Tailwind CSS 3.4+ |
| Class merging | `tailwind-merge` (+ `clsx` when conditional) |
| Icons | `iconify-icon` package, **Solar** set only |
| Fonts | Google Fonts: Inter, Space Grotesk, JetBrains Mono |
| Glass CSS | Copy `src/index.css` glass utilities and CSS variables |

### Required font loading

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

### Tailwind font config

```js
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  display: ['Space Grotesk', 'Inter', 'sans-serif'],
  mono: ['JetBrains Mono', 'monospace'],
}
```

---

## 3. Color palette

### 3.1 Page & structure

| Token | Value | Usage |
|-------|-------|-------|
| `palette.page.background` | `#020617` | Body fallback (slate-950) |
| `palette.page.overlay` | `rgba(15, 23, 42, 0.4)` | Fixed scrim over background image |
| `palette.page.scrimHeavy` | `rgba(2, 6, 23, 0.72)` | Modal overlays, drawer backdrops |

Background image is applied via CSS variable `--bg-url` with `background-attachment: fixed`.

### 3.2 Primary (brand action color)

| Token | Value | Usage |
|-------|-------|-------|
| `palette.primary.DEFAULT` | `#3b82f6` | Primary buttons, active nav, focus rings |
| `palette.primary.hover` | `#2563eb` | Button hover |
| `palette.primary.active` | `#1d4ed8` | Button pressed |
| `palette.primary.muted` | `#60a5fa` | Secondary links, active step numbers |
| `palette.primary.subtle` | `rgba(59, 130, 246, 0.15)` | Selected table rows, active sidebar item bg |
| `palette.primary.border` | `rgba(96, 165, 250, 0.3)` | Primary outline borders |

**Rule:** Only one primary hue (blue). Do not introduce a second brand color.

### 3.3 Text hierarchy

| Level | Color | Tailwind | Usage |
|-------|-------|----------|-------|
| Heading | `#ffffff` | `text-white` | H1–H6, card titles |
| Body | `#cbd5e1` | `text-slate-300` | Paragraphs, table cell text |
| Muted | `#94a3b8` | `text-slate-400` | Labels, timestamps, hints |
| Disabled | `slate-400/50` | `text-slate-400/50` | Disabled controls |
| Link | `#60a5fa` | `text-blue-400` | Inline links |
| Link hover | `#93c5fd` | `text-blue-300` | Link hover state |

Body text opacity pattern: supporting copy often uses `opacity-70` or `opacity-80` on top of base body color.

### 3.4 Glass surfaces

| Token | Value | Usage |
|-------|-------|-------|
| `palette.surface.glass` | `rgba(255,255,255,0.1)` | Default card fill |
| `palette.surface.glassHover` | `rgba(255,255,255,0.14)` | Hoverable card |
| `palette.surface.glassSubtle` | `rgba(255,255,255,0.05)` | Nested panels, sidebar |
| `palette.surface.glassStrong` | `rgba(255,255,255,0.2)` | Emphasized panels |

Frost blur: **24px** default (`--card-frost`). Transition: `all 0.7s ease-out`.

### 3.5 Borders

| Token | Value | Usage |
|-------|-------|-------|
| `palette.border.DEFAULT` | `white/15` | Card borders, inputs |
| `palette.border.subtle` | `white/8` | Inner dividers |
| `palette.border.strong` | `white/25` | Emphasized containers |
| `palette.border.divider` | `white/5` | Table row dividers, accordion separators |
| `palette.border.focus` | `blue-500/60` | Focus ring color |

### 3.6 Accent palette (categorical only)

Six named accents — the **only** allowed categorical colors:

| Name | Text | Background | Border | Dot | Use for |
|------|------|------------|--------|-----|---------|
| `blue` | `text-blue-300/400` | `bg-blue-500/10` | `border-blue-400/20` | `bg-blue-400` | Default, info, open cases |
| `emerald` | `text-emerald-300/400` | `bg-emerald-500/10` | `border-emerald-400/20` | `bg-emerald-400` | Success, resolved, complete |
| `amber` | `text-amber-300/400` | `bg-amber-500/10` | `border-amber-400/20` | `bg-amber-400` | Warning, in progress, waiting |
| `rose` | `text-rose-300/400` | `bg-rose-500/10` | `border-rose-400/20` | `bg-rose-400` | Error, escalated, critical |
| `purple` | `text-purple-300/400` | `bg-purple-500/10` | `border-purple-400/20` | `bg-purple-400` | Secondary categories, classify stage |
| `white` | `text-white/90` | `bg-white/5` | `border-white/15` | `bg-white` | Neutral, closed, low priority |

Import via `getAccent('blue')` or `accentPillClasses('blue')`.

### 3.7 Semantic feedback colors

For alerts, toasts, form errors, and status chips — use `semantic.*` only:

| Key | Meaning | Example usage |
|-----|---------|---------------|
| `success` | Completed, saved, passed | Agent step succeeded |
| `warning` | Attention needed, in progress | Pipeline waiting on input |
| `error` | Failed, blocked, validation error | Agent action failed |
| `info` | Informational, neutral-positive | New case assigned |
| `neutral` | Inactive, closed, default | Archived cases |

```js
import { statusChipClasses } from './lib/designTokens';
// → "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium bg-emerald-500/10 border-emerald-400/25 text-emerald-400"
statusChipClasses('success');
```

---

## 4. Typography

### 4.1 Font roles

| Role | Family | Tailwind | Weight |
|------|--------|----------|--------|
| Body | Inter | `font-sans` | 400 normal, 500 medium |
| Display | Space Grotesk | `font-display` | 300 light |
| Mono | JetBrains Mono | `font-mono` | 400–500 |
| Headings | Inter (via CSS var) | `.card-title` | **300 light** always |

**Rule:** All headings use `font-light` (300). Never use `font-bold` on marketing-style headings.

### 4.2 Type scale

| Level | Classes | When to use |
|-------|---------|-------------|
| Hero | `font-display text-[3.3rem] sm:text-[4.4rem] lg:text-[5.5rem] leading-[0.98] tracking-[-0.045em] font-light` | Landing hero only |
| H1 / Page title | `text-[2.35rem] sm:text-[2.9rem] lg:text-[3.45rem] leading-[1.02] tracking-[-0.04em] font-light` | Page headers |
| H2 / Section | `text-[2.05rem] sm:text-[2.65rem] lg:text-[3.45rem] leading-[1.04] tracking-[-0.045em] font-light` | Section titles |
| H3 / Card | `text-[1.55rem] lg:text-[1.7rem] leading-[1.08] tracking-[-0.03em] font-light` | Card headings |
| H4 / Sub-card | `text-[1.35rem] leading-[1.15] tracking-[-0.03em] font-light` | Nested card titles |
| Body large | `text-[1.05rem] sm:text-[1.15rem] leading-[1.7]` | Hero subtitle, intro paragraphs |
| Body | `text-sm leading-[1.75]` | Default UI copy |
| Caption | `text-xs leading-[1.6] opacity-70` | Metadata, footnotes |
| Eyebrow | `font-mono text-[11px] uppercase tracking-[0.22em]` | Section category labels |
| Label | `font-mono text-[12px] uppercase tracking-[0.18em]` | Tier names, form section labels |
| Stat | `text-5xl font-medium leading-none tracking-[-0.05em]` | KPI numbers |

### 4.3 Eyebrow pattern

Every major section starts with an eyebrow pill:

```jsx
<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/5 px-4 py-2 mb-6">
  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
  <span className="font-mono text-[11px] uppercase tracking-[0.22em] opacity-80">
    Section Label
  </span>
</div>
```

For page-level section headers, use the elevated variant: `border-white/15 bg-white/5 backdrop-blur-xl`.

---

## 5. Spacing & layout

### 5.1 Page grid

| Pattern | Value |
|---------|-------|
| Horizontal padding | `px-6 md:px-8 lg:px-12` |
| Max content width | `max-w-[1360px] mx-auto w-full` |
| Section vertical gap | `gap-24 lg:gap-28` |
| Inner section gap | `gap-14 lg:gap-16` |
| Card grid gap | `gap-6 md:gap-8` |
| Anchor scroll offset | `scroll-mt-28` |

### 5.2 Border radii (decided — do not deviate)

| Element | Radius | Class / token |
|---------|--------|---------------|
| Default glass card | 40px | `--card-radius` / `2.5rem` |
| Operational card | 24px | `glass-card--radius-24` |
| Module / FAQ / table card | 22px | `glass-card--radius-22` |
| Pricing tier | 28px | `rounded-[28px]` |
| Buttons (default) | pill | `rounded-full` |
| Buttons (alt) | 12px | `rounded-xl` |
| Inputs | 12px | `rounded-xl` |
| Logo mark | 12px | `rounded-xl` |

### 5.3 Shadows

| Surface | Shadow |
|---------|--------|
| Operational/module cards | `0 18px 50px rgba(148,163,184,0.12), 0 6px 18px rgba(15,23,42,0.04)` |
| Nav (scrolled) | `shadow-2xl` |
| Highlighted pricing tier | `0 0 40px rgba(0,0,0,0.1)` |
| Button press glow | `0 0 0 4px {primary}33, 0 0 20px {primary}99` (active only) |

---

## 6. Glass surfaces

Three CSS utility classes defined in `src/index.css`:

| Class | Purpose |
|-------|---------|
| `.glass-card` | Floating content cards |
| `.glass-container` | Full-page frosted shell |
| `.glass-nav` | Pill-shaped navigation bar |

### Card modifiers

| Modifier | Effect |
|----------|--------|
| `glass-card--content-shell` | Removes outer padding (inner content controls padding) |
| `glass-card--radius-24` | 24px radius + operational shadow |
| `glass-card--radius-22` | 22px radius + module shadow |

### Card padding rules

| Shell | Inner padding |
|-------|---------------|
| Operational | `p-8` |
| Module | `p-5` |
| Default (no shell) | `2rem` via `--card-padding` |

---

## 7. Element library

### 7.1 Buttons

Use the existing `Button` component. When building new primitives:

| Variant | Appearance |
|---------|------------|
| **Primary** | Filled `palette.primary.DEFAULT`, white text, pill shape |
| **Secondary** | `bg-white/10`, white text |
| **Outline** | Transparent, primary color border and text |
| **Ghost** | Transparent, no border, `text-white/90` |
| **Danger** | `bg-rose-500/80`, rose border — destructive actions only |

| Size | Classes |
|------|---------|
| Default | `px-6 py-2.5` |
| Small | `px-4 py-2 text-sm` |
| Large | `px-8 py-3 text-base` |

| State | Behavior |
|-------|----------|
| Hover | `hover:-translate-y-1` (if jump enabled) |
| Active/press | Glow ring via `--btn-glow` CSS variable |
| Disabled | `opacity-40 pointer-events-none` |
| Focus | `focus-visible:ring-2 focus-visible:ring-blue-500/40` |

### 7.2 Form controls

All inputs share the glass aesthetic:

```
Base input:
  w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5
  text-sm text-white placeholder:text-slate-400/60 backdrop-blur-sm
  focus:outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-500/25

Error state:
  border-rose-400/50 focus:border-rose-400/60 focus:ring-rose-500/25

Label:
  font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400 mb-2

Error message:
  text-xs text-rose-400 mt-1.5
```

### 7.3 Badges & status chips

**Recommended badge** (pricing highlight):
`bg-blue-600 text-white font-mono text-[10px] uppercase tracking-[0.15em] px-3 py-1 rounded-full`

**Status chip** — always use `statusChipClasses(semanticKey)`:

```jsx
<span className={statusChipClasses('success')}>
  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
  Resolved
</span>
```

### 7.4 Cards

Use `ContentCard` with these layout options:

| Layout | Purpose |
|--------|---------|
| `text` | Heading + body paragraph |
| `bullets` | Feature / requirement lists |
| `numbered` | Ordered steps |
| `pills` | Tag chips |
| `stat` | KPI display |
| `image` | Media with caption |

| Shell | When |
|-------|------|
| `operational` | Primary content rows, case detail panels |
| `module` | Supporting widgets, side panels, FAQ items |

| Size | Grid span |
|------|-----------|
| `sm` | 1 column |
| `md` | 2 columns (md+) |
| `lg` | 3 columns (md+) |
| `full` | Full width |

### 7.5 Data tables

For case lists, agent logs, pipeline events:

```jsx
<div className="glass-card glass-card--content-shell glass-card--radius-22 overflow-hidden">
  <table className="w-full text-sm">
    <thead className="border-b border-white/10 bg-white/[0.03]">
      <tr>
        <th className="px-5 py-3 text-left font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400">
          Case ID
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-white/5">
      <tr className="transition-colors hover:bg-white/[0.04]">
        <td className="px-5 py-3.5 text-slate-200">CM-1042</td>
      </tr>
    </tbody>
  </table>
</div>
```

**Selected row:** `bg-blue-500/10 hover:bg-blue-500/12`

### 7.6 Sidebar navigation

App shell for case management:

| Element | Classes |
|---------|---------|
| Shell | `border-r border-white/10 bg-white/[0.03] backdrop-blur-xl` |
| Item | `rounded-xl px-3 py-2.5 text-sm text-slate-300 hover:bg-white/10 hover:text-white` |
| Active item | `bg-blue-500/15 text-blue-200 border border-blue-400/20` |
| Section label | `font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500` |

### 7.7 Tabs

```
Tab list:  inline-flex gap-1 rounded-full border border-white/10 bg-black/20 p-1 backdrop-blur-xl
Tab:       rounded-full px-4 py-2 text-sm text-slate-400 hover:text-white
Active:    bg-white/10 text-white shadow-sm
```

### 7.8 Pipeline stepper

Follows `SystemLogic.jsx` pattern — clickable glass cards in a vertical list:

| State | Style |
|-------|-------|
| Active step | Full opacity, step number in `text-blue-400` |
| Inactive | `opacity-80 hover:opacity-100`, step number `opacity-50` |
| Card | `rounded-[22px] p-8 md:p-10 glass-card` |
| Step title | `text-4xl md:text-5xl font-light tracking-tighter` |

### 7.9 Modals

| Layer | Style |
|-------|-------|
| Overlay | `bg-slate-950/60 backdrop-blur-sm` |
| Panel | `glass-card glass-card--radius-24 max-w-lg p-8 shadow-2xl` |
| Title | `text-[1.55rem] font-light` |
| Footer | Right-aligned button group with `gap-3` |

### 7.10 Alerts & toasts

| Type | Classes |
|------|---------|
| Success | `bg-emerald-500/10 border-emerald-400/25 text-emerald-200` |
| Warning | `bg-amber-500/10 border-amber-400/25 text-amber-200` |
| Error | `bg-rose-500/10 border-rose-400/25 text-rose-200` |
| Info | `bg-blue-500/10 border-blue-400/25 text-blue-200` |

### 7.11 Accordion

Matches `FAQ.jsx`:

- Item: `glass-card glass-card--radius-22 border border-white/10`
- Trigger: `px-5 py-4 text-sm font-medium text-white/95`
- Content: `px-5 pb-4 text-sm opacity-80 border-t border-white/5`
- Expand icon: `+` character in `text-blue-400`, rotates 45° when open

### 7.12 Empty states

Centered, minimal:

- Icon: `text-slate-500`, 48px Solar icon
- Title: `text-lg font-light`
- Body: `text-sm text-slate-400 max-w-sm`
- Optional CTA: Primary button below

### 7.13 Loading skeletons

`animate-pulse rounded-lg bg-white/10` — match the shape of the content being loaded. No spinners unless inside a button.

### 7.14 Activity timeline

For case history and agent action logs:

- Vertical line: `border-l border-white/10`
- Dot: `h-2.5 w-2.5 rounded-full` colored by stage semantic
- Timestamp: `font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500`
- Content: `text-sm text-slate-300`

### 7.15 Avatars

`h-10 w-10 rounded-full border border-white/15 bg-gradient-to-br from-blue-400 to-indigo-500`

---

## 8. Icons

**Set:** Solar only (`solar:*`)  
**Package:** `iconify-icon`

```jsx
<iconify-icon icon="solar:check-circle-linear" width="16" height="16" />
```

### Approved icons for case management

| Purpose | Icon |
|---------|------|
| Case | `solar:folder-with-files-linear` |
| Agent | `solar:cpu-bolt-linear` |
| Pipeline | `solar:routing-2-linear` |
| Document | `solar:document-text-linear` |
| User | `solar:user-linear` |
| Success | `solar:check-circle-bold` |
| Warning | `solar:danger-triangle-linear` |
| Error | `solar:close-circle-bold` |
| Pending | `solar:clock-circle-linear` |
| Search | `solar:magnifer-linear` |
| Settings | `solar:settings-linear` |

---

## 9. Motion & animation

### Scroll reveal

1. Wrap element in `anim-trigger` (or `anim-trigger anim-fade-up`)
2. Call `useScrollReveal()` once at app root
3. IntersectionObserver adds `is-visible` at 12% threshold
4. Stagger via inline `transitionDelay` (0.1s increments)

### Easing

`cubic-bezier(0.16, 1, 0.3, 1)` — all entrance animations

### Durations

| Speed | Duration | Usage |
|-------|----------|-------|
| Fast | 300ms | Buttons, tabs |
| Normal | 500ms | Cards, nav |
| Slow | 700ms | Glass surface transitions |
| Entrance | 800–1200ms | Fade-up, line reveal |

### Reduced motion

All animations gated behind `prefers-reduced-motion: no-preference`. `useScrollReveal` exits early on reduce.

---

## 10. Case management domain mappings

Import from `designTokens.js` → `domain.*`. **These are decided — do not invent alternatives.**

### 10.1 Case status → color

| Status key | Accent | Semantic | Label |
|------------|--------|----------|-------|
| `open` | blue | info | Open |
| `in_progress` | amber | warning | In Progress |
| `pending_review` | purple | neutral | Pending Review |
| `resolved` | emerald | success | Resolved |
| `closed` | white | neutral | Closed |
| `escalated` | rose | error | Escalated |

```js
import { resolveCaseStatus, statusChipClasses } from './lib/designTokens';

const { accent, semantic, label } = resolveCaseStatus('in_progress');
```

### 10.2 Pipeline stage → color

| Stage key | Accent | Step | Label |
|-----------|--------|------|-------|
| `intake` | blue | 01 | Intake |
| `classify` | purple | 02 | Classify |
| `route` | amber | 03 | Route |
| `execute` | emerald | 04 | Execute |
| `review` | white | 05 | Review |
| `complete` | emerald | 06 | Complete |

Render as numbered glass step cards (see §7.8).

### 10.3 Agent action outcome → accent

| Outcome | Accent |
|---------|--------|
| `success` | emerald |
| `running` | blue |
| `waiting` | amber |
| `failed` | rose |
| `skipped` | white |

### 10.4 Priority → accent

| Priority | Accent |
|----------|--------|
| `low` | white |
| `medium` | blue |
| `high` | amber |
| `critical` | rose |

---

## 11. Page templates

### 11.1 Case management app shell

```
┌─────────────────────────────────────────────────────┐
│  glass-nav (top bar: logo, search, user)            │
├──────────┬──────────────────────────────────────────┤
│ sidebar  │  main content                            │
│ (240px)  │  ┌─ SectionHeader or eyebrow + H1 ─────┐ │
│          │  │  stat cards (ContentCard stat)       │ │
│ nav      │  ├─────────────────────────────────────┤ │
│ items    │  │  data table (glass-card--radius-22) │ │
│          │  └─────────────────────────────────────┘ │
└──────────┴──────────────────────────────────────────┘
```

- Sidebar: `bg-white/[0.03] backdrop-blur-xl border-r border-white/10`
- Main: `spacing.pageX` + `spacing.maxContent`
- Background: same as marketing site (fixed image + scrim)

### 11.2 Case detail page

```
SectionHeader (eyebrow: "Case CM-1042", accent from status)
├── 2-col grid: case metadata card (operational) + timeline (module)
├── pipeline stepper (full width)
└── agent action log table
```

### 11.3 Pipeline monitor page

```
SectionHeader (eyebrow: "Agent Pipeline")
├── stat row: active / waiting / failed counts (ContentCard stat × 3)
├── pipeline stepper (interactive, SystemLogic pattern)
└── live event table with semantic status chips
```

---

## 12. File reference

| File | Purpose |
|------|---------|
| `DESIGN_SYSTEM.md` | This document — human + agent spec |
| `src/lib/designTokens.js` | Machine-readable tokens, element classes, domain mappings |
| `src/lib/cardTokens.js` | Accent colors and heading size scale |
| `src/index.css` | Glass utilities, CSS variables, animation classes |
| `src/hooks/useTheme.jsx` | Runtime theme / CSS variable injection |
| `src/hooks/useScrollReveal.js` | Scroll animation hook |
| `src/components/Button.jsx` | Canonical button |
| `src/components/ContentCard.jsx` | Canonical card |
| `src/components/SectionHeader.jsx` | Canonical section header |
| `tailwind.config.js` | Font family config |

---

## Quick start for implementing agents

```js
// 1. Import tokens
import {
  palette,
  semantic,
  element,
  domain,
  statusChipClasses,
  accentPillClasses,
  eyebrowClasses,
  resolveCaseStatus,
  icons,
} from './lib/designTokens';

// 2. Copy index.css glass utilities into your project

// 3. Build UI using element.* classes — do not invent styles

// 4. Map case management data through domain.* — do not invent status colors
```

When in doubt, open the marketing site components (`Hero.jsx`, `SystemLogic.jsx`, `FAQ.jsx`, `Pricing.jsx`) and match them exactly.

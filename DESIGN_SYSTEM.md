# DocuMind CMS Design System

> **Your decisions:** [`DESIGN_DECISIONS.md`](./DESIGN_DECISIONS.md) — plain sections, **no coded IDs** (keeps design separate from your data field registry).  
> **Tokens:** `src/lib/designTokens.js` · **Components:** `src/components/ds/` · **Brand:** `src/config/caseAppMeta.js`

Do not invent decisions. Do not use `DF-xxx` / `DC-xxx` style codes in design files.

---

## 1. Two themes — when to use which

| Theme | Class | Use for |
|-------|-------|---------|
| **Workplace Light** | `.ds-theme-workplace` | Dashboard, Decision Center, Analysis forms, case lists, navigation |
| **Case File Dark Glass** | `.ds-theme-casefile` | Case detail, document hub, dense info panels, GRTW view |

```jsx
import { DSAppShell, DSThemeProvider } from './components/ds';

// Dashboard
<DSAppShell theme="workplace" sidebar={...}>...</DSAppShell>

// Case file page
<DSAppShell theme="casefile" sidebar={...}>...</DSAppShell>
```

---

## 2. Brand palette — your four colors (canonical)

```css
:root {
  --color-1: #1B1B1B;  /* ink — primary text, dark buttons */
  --color-2: #434A53;  /* slate — secondary text, borders, labels */
  --color-3: #FF5722;  /* ember — accent CTA, highlights (sparingly) */
  --color-4: #EEEEEE;  /* mist — workplace page background */
}
```

Import via `brand` from `designTokens.js`:

| Token | Hex | Use |
|-------|-----|-----|
| `brand.ink` | `#1B1B1B` | Headings, primary buttons |
| `brand.slate` | `#434A53` | Body secondary, borders, labels |
| `brand.ember` | `#FF5722` | "+ New Analysis" accent button, links, focus ring |
| `brand.mist` | `#EEEEEE` | Workplace page background |

**Ember rule:** Use for one primary action per view (e.g. New Analysis). Do not use for errors or large backgrounds.

### Secondary accents (supporting)

| Name | Hex | Use |
|------|-----|-----|
| Warm white | `#FFFFFF` | Cards, inputs (light mode) |
| Sage | `#78BDA7` | Active/online status dots |
| Ice blue | `#C8E6EA` | Info, glass glow (dark mode) |
| Pale gold | `#E8DFA8` | Primary CTA (dark case file mode) |
| Sand | `#C4A574` | Warning, pending |
| Clay | `#C4886A` | Needs attention (NOT red) |
| Dark page | `#0D0D0D` | Case file background |

### Forbidden — causes anxiety, do not use

| Forbidden | Why |
|-----------|-----|
| Corporate blue (`#3b82f6`, `blue-500`, etc.) | Feels cold and generic |
| Bright red (`#ef4444`, `red-500`, etc.) | Anxiety-inducing alerts |
| Neon green (`#22c55e`, `emerald-500`, etc.) | Harsh, clinical |
| Purple gradients | Distracting, feels "AI slop" |
| Any `bg-gradient-to-r from-purple` | Same |
| Flashing / infinite pulse animations | Overstimulating |
| ALL CAPS body text | Hard to read |
| Line-height < 1.5 on body | Cramped, hard to scan |

Use `forbidden` export from `designTokens.js` to validate.

---

## 3. ADHD-friendly typography & spacing

### Typography rules

1. **One H1 per view** — page title only
2. **Max 3 heading levels** visible in any card
3. **Body minimum 16px** with `line-height: 1.65`
4. **Labels** — Inter uppercase, `tracking-[0.14em]`, 10–11px (scannable anchors)
5. **Display headings** — `tracking-[-0.02em]` on large sizes only (tightened, not cramped)
6. **Tabular nums** on all stat values
7. **Max line length** — `max-w-prose` (~65ch) for paragraphs

### Font families

| Role | Family |
|------|--------|
| Everything (including labels, breadcrumbs, badges) | **Inter only** |

**Do not use JetBrains Mono or `font-mono` in `ds/` or `caseapp/` components.** Monospace is forbidden in this design system.

### Type scale

| Level | Classes |
|-------|---------|
| Page title | `text-[1.75rem] sm:text-[2rem] font-semibold tracking-[-0.02em]` |
| Section title | `text-xl font-semibold` |
| Card title | `text-base font-semibold` |
| Body | `text-base leading-[1.65]` |
| Label | `text-[11px] font-medium uppercase tracking-[0.14em] text-stone-500` or class `ds-label` |
| Breadcrumb | `text-[11px] font-medium uppercase tracking-[0.12em] text-stone-400` or class `ds-breadcrumb` |
| Codes / IDs | `text-xs tabular-nums` (Inter, not monospace) |
| Stat value | `text-4xl font-semibold tracking-[-0.03em] tabular-nums` |
| Case name | `text-2xl sm:text-3xl font-semibold tracking-[-0.02em]` |

### Spacing rules

1. **Minimum touch target:** 44px
2. **Card padding:** 24px (`p-6`)
3. **Section gaps:** 32–40px (`gap-8 lg:gap-10`)
4. **Never pack** — when unsure, add more space
5. **Sidebar width:** 240px fixed

---

## 4. Motion — bounces are OK

Motion communicates state. It should feel gentle, not flashy.

| Pattern | Class / behavior |
|---------|------------------|
| Card hover lift | `ds-card-lift` — translateY(-2px) + shadow increase |
| Button bounce | `ds-bounce-hover` + `ds-bounce-press` — hover lift, active scale(0.98) |
| Easing | `cubic-bezier(0.34, 1.56, 0.64, 1)` — gentle bounce |
| Duration | 150ms (press), 250ms (hover) |
| Reduced motion | All motion disabled via `prefers-reduced-motion: reduce` |

**Allowed:** hover lifts, press scales, fade-ins, tab transitions  
**Not allowed:** infinite pulse (except live status dot), flashing, parallax, auto-playing carousels

---

## 5. Workplace Light theme

Reference: your Decision Center + Analysis screenshots.

### Page structure

```
┌──────────┬──────────────────────────────────────────────┐
│ Sidebar  │  Breadcrumb (mono, uppercase)                │
│ 240px    │  Page Title (semibold)          [actions]    │
│ cream    │  ─────────────────────────────────────────── │
│ bg       │  Stat cards row (4 cols)                     │
│          │  ┌─────────────────────────────────────────┐ │
│ nav      │  │  Main content card(s)                   │ │
│ items    │  │  forms / case list / action area        │ │
│          │  └─────────────────────────────────────────┘ │
│          │  Favorite / quick access row                 │
│ profile  │                          [Advisor float pill] │
└──────────┴──────────────────────────────────────────────┘
```

### Colors

| Element | Value |
|---------|-------|
| Page bg | `#F4F1EA` |
| Sidebar | `#EAE6DE` |
| Card | `#FFFFFF` border `#E5E0D8` |
| Primary button | `#1A1A1A` bg, white text |
| Secondary button | Outlined charcoal |
| Active nav | `#DDD8CE` pill |
| Status dot | `#78BDA7` sage |

### Components

```jsx
import {
  DSAppShell, DSSidebar, DSSidebarItem,
  DSPageHeader, DSStatCard, DSCard,
  DSButton, DSInput, DSTextarea, DSTabs,
  DSAdvisorPanel,
} from './components/ds';
import { icons } from './lib/designTokens';

<DSAppShell
  theme="workplace"
  sidebar={
    <DSSidebar brand="DocuMind cms" status="Inference Active">
      <DSSidebarItem icon={icons.nav.dashboard} label="Mission Control" active />
      <DSSidebarItem icon={icons.nav.cases} label="Cases" />
      <DSSidebarItem icon={icons.nav.analysis} label="Analysis" />
    </DSSidebar>
  }
  advisor={<DSAdvisorPanel floating title="Senior Advisor" />}
>
  <DSPageHeader
    breadcrumb="documind cms / dashboard"
    title="Decision Center"
    actions={
      <>
        <DSBadge variant="online">Model v4.2 Online</DSBadge>
        <DSButton variant="primary">+ New Analysis</DSButton>
        <DSButton variant="secondary">New Case</DSButton>
      </>
    }
  />
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    <DSStatCard label="Cases" value="12" icon="solar:folder-linear" />
    <DSStatCard label="Processes" value="8" icon="solar:routing-2-linear" />
    <DSStatCard label="Incidents" value="3" icon="solar:danger-circle-linear" />
    <DSStatCard label="Pending Decisions" value="5" icon="solar:checklist-linear" />
  </div>
</DSAppShell>
```

---

## 6. Case File Dark Glass theme

Reference: your case detail screenshots (glass + dark minimalist).

### Page structure

```
┌──────────┬──────────────────────────────────────────────┐
│ Sidebar  │  ← Back   Cases / Zendaya                    │
│ dark     │  CASE-1778550668763  [GRTW ACTIVE]  [actions]│
│          │  [Gather] [Analysis] [Resolution] [GRTW]...  │
│          │  ┌─────────────────────────────────────────┐ │
│          │  │  Glass card — profile + 3-column info   │ │
│          │  ├──────────────┬──────────────────────────┤ │
│          │  │ Restrictions │  Document Hub preview    │ │
│          │  │ Care Team    │  (white doc on dark bg)  │ │
│          │  └──────────────┴──────────────────────────┘ │
│          │                          [Advisor float pill] │
└──────────┴──────────────────────────────────────────────┘
```

### Colors

| Element | Value |
|---------|-------|
| Page bg | `#0D0D0D` + subtle green radial gradient |
| Glass card | `rgba(255,255,255,0.04)` + `backdrop-blur-xl` |
| Card border | `rgba(255,255,255,0.08)` |
| Ice glow border | `rgba(200,230,234,0.2)` |
| Primary CTA | `#E8DFA8` pale gold |
| CTA text | `#1A1A1A` charcoal |
| Active tab | `bg-white/10` |
| Alert banner | ice blue tint, not red |

### Case header

```jsx
import { DSCaseHeader, DSButton, DSBadge } from './components/ds';

<DSCaseHeader
  caseId="CASE-1778550668763"
  caseName="Zendaya"
  status="in_progress"
  badges={['STD PLAN', 'ACTIVE COVERAGE']}
  activeTab="Gather"
  onTabChange={setTab}
  actions={
    <>
      <DSButton variant="secondary">+ Note</DSButton>
      <DSButton variant="secondary">Edit</DSButton>
      <DSButton variant="primary">Deep Review</DSButton>
    </>
  }
/>
```

### Info columns pattern

Three equal columns inside a glass card, each with a `ds-label` header:

```jsx
<DSCard glow>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div>
      <p className="ds-label mb-3">Personal Identity</p>
      <dl className="space-y-2 text-sm">
        <div><dt className="text-stone-500">DOB</dt><dd>1996-09-01</dd></div>
      </dl>
    </div>
    <div>
      <p className="ds-label mb-3">Employment Details</p>
      ...
    </div>
    <div>
      <p className="ds-label mb-3">Claim Status</p>
      ...
    </div>
  </div>
</DSCard>
```

---

## 7. Component reference

| Component | File | Purpose |
|-----------|------|---------|
| `DSThemeProvider` | `ds/ThemeProvider.jsx` | Wraps app in workplace or casefile theme |
| `DSAppShell` | `ds/DSAppShell.jsx` | Sidebar + main + optional advisor |
| `DSSidebar` | `ds/DSSidebar.jsx` | Left nav with brand, status, items |
| `DSSidebarItem` | `ds/DSSidebar.jsx` | Nav link with icon + pill active state |
| `DSButton` | `ds/DSButton.jsx` | primary / secondary / ghost |
| `DSCard` | `ds/DSCard.jsx` | Theme-aware card, optional glow |
| `DSStatCard` | `ds/DSStatCard.jsx` | KPI number + label |
| `DSInput` | `ds/DSInput.jsx` | Labelled input with hint/error |
| `DSTextarea` | `ds/DSInput.jsx` | Multi-line input |
| `DSTabs` | `ds/DSTabs.jsx` | Pill tab bar |
| `DSBadge` | `ds/DSBadge.jsx` | Status chip with dot |
| `DSPageHeader` | `ds/DSPageHeader.jsx` | Breadcrumb + title + actions |
| `DSCaseHeader` | `ds/DSCaseHeader.jsx` | Case ID, name, tabs, actions |
| `DSAdvisorPanel` | `ds/DSAdvisorPanel.jsx` | Side panel or floating pill |

---

## 8. Domain color mappings

Use `domain.*` from `designTokens.js`. Do not create ad-hoc status colors.

### Case status

| Status | Accent | Semantic | Color feel |
|--------|--------|----------|------------|
| open | ice | info | Cool, neutral |
| in_progress | sand | warning | Warm, not alarming |
| pending_review | stone | neutral | Quiet |
| resolved | sage | success | Calm positive |
| closed | stone | neutral | Quiet |
| escalated | sand | attention | Warm clay, NOT red |

### Pipeline stages

| Stage | Accent | Step |
|-------|--------|------|
| intake | ice | 01 |
| classify | stone | 02 |
| route | sand | 03 |
| execute | sage | 04 |
| review | gold | 05 |
| complete | sage | 06 |

### Case file tabs

`Gather` · `Analysis` · `Resolution` · `GRTW` · `Tasks` · `Files`

---

## 9. Icons

Solar icon set only via `<iconify-icon>`:

```jsx
<iconify-icon icon="solar:folder-with-files-linear" width="18" height="18" />
```

Import names from `icons.nav.*`, `icons.action.*`, `icons.status.*` in `designTokens.js`.

---

## 10. Agent checklist

Before shipping any UI, verify:

- [ ] Theme class applied (`ds-theme-workplace` or `ds-theme-casefile`)
- [ ] No forbidden colors (blue, red, neon green, purple)
- [ ] All status colors from `domain.*` or `semantic.*`
- [ ] Body text ≥ 16px, line-height ≥ 1.65
- [ ] Labels use mono uppercase pattern
- [ ] Cards have ≥ 24px padding
- [ ] Buttons have bounce hover + press
- [ ] `prefers-reduced-motion` respected
- [ ] Components imported from `src/components/ds/`
- [ ] No Material UI / Chakra / other design libraries

---

## 11. Page templates (scaffolded — wire to spine pipeline)

Run `npm run dev` and open these routes:

| Route | Page | File |
|-------|------|------|
| `/app` | Decision Center | `src/pages/caseapp/DecisionCenter.jsx` |
| `/app/analysis` | Analysis form + advisor panel | `src/pages/caseapp/Analysis.jsx` |
| `/app/cases` | Case list table | `src/pages/caseapp/CaseList.jsx` |
| `/app/cases/:caseId` | Case file detail (dark glass) | `src/pages/caseapp/CaseFileDetail.jsx` |

Layout shell: `src/pages/caseapp/CaseAppLayout.jsx`  
Sidebar nav: `src/components/caseapp/AppSidebar.jsx`  
Mock data (replace with API): `src/content/caseAppMock.js`

### Spine pipeline integration points

| Page | Wire here |
|------|-----------|
| Decision Center | `dashboardStats`, `recentCases` → pipeline status API |
| Analysis | Form submit → agent run endpoint; `analysisArtifacts` → document upload |
| Case list | `recentCases` → cases collection |
| Case file | `caseDetail` → case by ID; tabs → stage-specific views |

```jsx
// App.jsx already registers:
<Route path="/app" element={<CaseAppLayout />}>
  <Route index element={<DecisionCenter />} />
  <Route path="analysis" element={<Analysis />} />
  <Route path="cases/:caseId" element={<CaseFileDetail />} />
</Route>
```

---

## 12. File index

| File | Purpose |
|------|---------|
| `DESIGN_SYSTEM.md` | This document |
| `src/lib/designTokens.js` | Brand colors, tokens, forbidden list, domain mappings |
| `src/lib/cn.js` | `cn()` class merge helper |
| `src/styles/ds-theme.css` | Theme CSS variables + motion |
| `src/components/ds/` | Primitive components |
| `src/pages/caseapp/` | Scaffolded page templates |
| `src/content/caseAppMock.js` | Mock data for templates |
| `src/config/caseAppMeta.js` | **Brand name and breadcrumb prefix** |
| `src/index.css` | Legacy template marketing site only (not DocuMind) |

**Note:** The root `/` marketing template is unrelated to DocuMind CMS. The case management app at `/app/*` must use `ds/` components, `caseAppMeta.js`, and tokens exclusively.

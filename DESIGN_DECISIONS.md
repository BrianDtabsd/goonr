# DocuMind CMS — Design Decision Record

**Status:** AUTHORITATIVE  
**Owner:** You  
**Product:** DocuMind cms  
**Machine-readable:** `src/lib/designDecisions.js`  
**Tokens:** `src/lib/designTokens.js`  
**Components:** `src/components/ds/`  
**Branding:** `src/config/caseAppMeta.js`

---

## How this works

Every visual decision for the case management app lives in **this document**. An implementing agent must:

1. Read this file first  
2. Import tokens from `designTokens.js` — never invent hex values  
3. Use components from `src/components/ds/` — never restyle from scratch  
4. If something is **not listed here** → **stop and ask you** — do not guess  

Each decision has an ID (`DF-xxx`) for traceability — same numbering style as your data field registry (e.g. `DF-012`).

---

## ID numbering (`DF-xxx`)

Matches your **data field registry** format across projects.

| Range | Category | Examples |
|-------|----------|----------|
| `DF-001` – `DF-099` | Foundation (brand, color, type, motion) | `DF-003` brand colors · `DF-012` status colors |
| `DF-100` – `DF-199` | Components (buttons, cards, inputs) | `DF-102` button · `DF-106` case header |

Always three digits with leading zeros. New decisions take the next free ID in the right range.

---

## Decision log — foundation

| ID | Your decision | Value / rule |
|----|---------------|--------------|
| **DF-001** | Product name | **DocuMind cms** |
| **DF-002** | Two themes | **Workplace Light** (lists, forms, dashboard) + **Case File Dark Glass** (case detail) |
| **DF-003** | Brand colors (you provided) | `#1B1B1B` ink · `#434A53` slate · `#FF5722` ember · `#EEEEEE` mist |
| **DF-004** | Calm accents (you approved) | Sage `#78BDA7` · Ice `#C8E6EA` · Gold `#E8DFA8` · Sand `#C4A574` · Clay `#C4886A` |
| **DF-005** | Forbidden | No corporate blue, red, neon green, purple gradients, JetBrains Mono, invented branding |
| **DF-006** | Typography | **Inter only** · 16px body · line-height 1.65 · one H1 per view |
| **DF-007** | Spacing | Generous — 44px touch targets · 24px card padding · 240px sidebar |
| **DF-008** | Corners | Rounded modern — 12px inputs/buttons · 16px cards · never sharp 4px |
| **DF-009** | Shadows | Soft only — no harsh drop shadows |
| **DF-010** | Motion | Hover lift + press bounce **OK** · no flash, no infinite pulse |
| **DF-011** | Icons | Solar set via iconify only |
| **DF-012** | Status colors | See [Domain mappings](#domain-mappings) — no ad-hoc status colors |

---

## DF-003 — Brand colors (your four)

```css
:root {
  --color-1: #1B1B1B;  /* ink */
  --color-2: #434A53;  /* slate */
  --color-3: #FF5722;  /* ember */
  --color-4: #EEEEEE;  /* mist */
}
```

| Token | Hex | You decided to use it for |
|-------|-----|---------------------------|
| Ink | `#1B1B1B` | Headings, body primary, charcoal buttons |
| Slate | `#434A53` | Secondary text, borders, labels, placeholders |
| Ember | `#FF5722` | **One** accent CTA per screen (e.g. + New Analysis) |
| Mist | `#EEEEEE` | Workplace page background |

**Ember rule (your rule):** Max one ember button per view. Never for errors. Never as a page background.

---

## DF-004 — Calm accents (you approved)

| Name | Hex | Use |
|------|-----|-----|
| Sage | `#78BDA7` | Online dot, active, success, GRTW |
| Ice | `#C8E6EA` | Info, focus ring (dark), glass glow |
| Gold | `#E8DFA8` | Primary button on **case file** dark theme |
| Sand | `#C4A574` | Pending, in progress, escalated |
| Clay | `#C4886A` | Needs attention, form errors — **not red** |
| Dark page | `#0D0D0D` | Case file background |

---

## DF-005 — Forbidden (you said no to these)

| Category | Forbidden |
|----------|-----------|
| Colors | Corporate blue, bright red, neon green, purple gradients |
| Fonts | JetBrains Mono, `font-mono` in ds/ or caseapp/ |
| Motion | Flashing, infinite pulse (except live status dot) |
| Typography | ALL CAPS body text, line-height &lt; 1.5 |
| Process | Inventing colors, fonts, or product names |

---

## DF-006 — Typography (your ADHD rules)

| Rule | Your decision |
|------|---------------|
| Font | **Inter only** — everything including labels |
| Body | 16px, line-height 1.65 |
| Headings | Semibold, tightened tracking on large sizes only |
| Labels | 10–11px, uppercase, tracking 0.14em, medium weight |
| Breadcrumbs | `documind cms / {section}` — uppercase via `.ds-breadcrumb` |
| IDs / codes | Inter + `tabular-nums` — **not** monospace |
| Limits | 1 H1 per view · max 3 heading levels per card |

---

## DF-007 — Spacing (your generous layout rule)

| Token | Value |
|-------|-------|
| Touch target minimum | 44px |
| Card padding | 24px (`p-6`) |
| Section gap | 32–40px |
| Sidebar width | 240px fixed |
| Page horizontal padding | 24px → 32px on large screens |
| Content max width | 1200px |

---

## DF-010 — Motion (you said bounces are OK)

| State | Your decision |
|-------|---------------|
| Card hover | Lift 2px + slightly stronger shadow |
| Button hover | Lift 2px |
| Button press | `scale(0.98)` |
| Easing | Gentle bounce `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| Duration | 250ms hover · 150ms press |
| Reduced motion | All animation disabled when user prefers |

---

# Component decisions

Each component: **anatomy → variants → states → when to use → do not**.

---

## DF-100 — App shell (`DSAppShell`)

| Property | Your decision |
|----------|---------------|
| Layout | Sidebar left · main content · optional advisor float bottom-right |
| Theme | `workplace` or `casefile` — set per route |
| Case file route | Auto-switch to `casefile` theme on `/app/cases/:id` |

---

## DF-101 — Sidebar (`DSSidebar`)

### Workplace theme

| Property | Value |
|----------|-------|
| Width | 240px |
| Background | `#E4E4E4` |
| Brand | `DocuMind cms` from `caseAppMeta.js` |
| Status | Green sage dot + "Inference Active" (or your pipeline label) |
| Nav item | 12px radius pill |
| Nav inactive | Slate text, hover light grey bg |
| Nav active | `#D8D8D8` bg, ink text, medium weight |
| Profile | 36px circle avatar, initials, name + role below |

### Case file theme

| Property | Value |
|----------|-------|
| Background | `#111111` |
| Nav active | `white/8%` bg |

**Do not:** Collapse sidebar on desktop · use icons without labels · add a second brand name.

---

## DF-102 — Button (`DSButton`)

### Sizes

| Size | Padding | Font |
|------|---------|------|
| Default | 20×10px | 14px |
| Small | 16×8px | 12px |

### Variants — workplace

| Variant | Background | Text | You use it for |
|---------|------------|------|----------------|
| **primary** | `#1B1B1B` | white | Create Case, Run Analysis, Save |
| **accent** | `#FF5722` | white | **One** hero action: + New Analysis |
| **secondary** | transparent + slate border | ink | New Case, Edit, cancel |
| **ghost** | none | slate | Back, low-priority links |

### Variants — case file

| Variant | Background | Text | You use it for |
|---------|------------|------|----------------|
| **primary** | `#E8DFA8` gold | ink | Deep Review |
| **secondary** | transparent + white border | stone-300 | + Note, Edit |
| **ghost** | none | stone-400 | Back |

### States (all variants)

| State | Your decision |
|-------|---------------|
| Hover | Lift 2px |
| Press | Scale 0.98 |
| Disabled | 40% opacity, no pointer |
| Focus | Ember ring (workplace) or ice ring (casefile) |

**Do not:** More than one accent (ember) button per view · red danger buttons · blue links.

---

## DF-103 — Card (`DSCard`)

| Property | Workplace | Case file |
|----------|-----------|-----------|
| Background | `#FFFFFF` | `white/4%` + blur |
| Border | slate 15% | white 8% |
| Radius | 16px | 16px |
| Padding | 24px | 24px |
| Hover | Lift + shadow (workplace only) | — |
| Glow variant | — | Ice border — use for profile hero card |

**Do not:** Nested cards more than 2 deep · sharp corners · heavy borders.

---

## DF-104 — Stat card (`DSStatCard`)

| Element | Your decision |
|---------|---------------|
| Value | 36px semibold, tabular nums, ink |
| Label | 10px uppercase, stone-400, below value |
| Icon | Optional, top-right, muted |
| Grid | 2 cols mobile · 4 cols desktop on dashboard |

---

## DF-105 — Page header (`DSPageHeader`)

| Element | Your decision |
|---------|---------------|
| Breadcrumb | `caseAppBreadcrumb('dashboard')` etc. |
| Title | One H1, page title scale |
| Subtitle | Optional, stone-500, max ~65ch |
| Actions | Right-aligned: badges + buttons |

---

## DF-106 — Case header (`DSCaseHeader`)

| Element | Your decision |
|---------|---------------|
| Back | Ghost button, arrow icon |
| Breadcrumb | `Cases / {name}` |
| Case ID | Semibold tabular — not monospace |
| Badges | Status + plan tags (GRTW, STD PLAN, etc.) |
| Name | Large semibold below ID |
| Tabs | Gather · Analysis · Resolution · GRTW · Tasks · Files |
| Actions | + Note (secondary) · Edit (secondary) · Deep Review (primary gold) |

---

## DF-107 — Input (`DSInput`, `DSTextarea`)

| Property | Workplace | Case file |
|----------|-----------|-----------|
| Height | 44px min | 44px min |
| Radius | 12px | 12px |
| Background | white | white/5% |
| Border | slate 20% | white/10% |
| Focus | ember ring | ice ring |
| Label | 11px uppercase slate above | same |
| Error text | clay `#C4886A` | clay |

**Do not:** Red error states · placeholder as only label · fields &lt; 44px tall.

---

## DF-108 — Tabs (`DSTabs`)

| Property | Workplace | Case file |
|----------|-----------|-----------|
| Track | `#E4E4E4` pill container | `white/3%` |
| Active tab | White bg + shadow | `white/10%` |
| Inactive | Slate text | stone-500 |
| Padding | 8×16px per tab | same |

---

## DF-109 — Badge (`DSBadge`)

| Variant | Color | Use |
|---------|-------|-----|
| online / active | Sage dot | Model online, inference active, in progress |
| plan | Neutral glass | STD PLAN, ACTIVE COVERAGE |
| pending | Sand | Waiting states |

Shape: pill · 10px uppercase · always include dot for live status.

---

## DF-110 — Table

| Element | Your decision |
|---------|---------------|
| Wrapper | Card shell, rounded-2xl |
| Header row | 10px uppercase slate labels |
| Rows | Hover subtle tint |
| Case ID column | tabular-nums, 12px |
| Open link | Ember text — not blue |

---

## DF-111 — Alert banner

Case file pending data banner:
- Ice tint background — informational, not alarming
- Copy: "N data points pending — incomplete calculations may occur"
- Link: "View Details" in ice tone

**Do not:** Red warning banner for incomplete data.

---

## DF-112 — Advisor panel (`DSAdvisorPanel`)

### Floating pill (dashboard + case file)

| Property | Value |
|----------|-------|
| Position | Bottom-right fixed |
| Label | Senior Advisor |
| Icon | CPU/agent icon |
| Dot | Sage online |

### Side panel (analysis page)

| Property | Value |
|----------|-------|
| Tabs | Document Analysis · RTW Prediction · Hermes Agent |
| Log | Inter xs — pipeline status lines |
| Input | "Ask the advisor..." |

---

## DF-113 — File chip

Upload list row: icon + filename + type/size + remove (×)  
Background `#F8F8F8` workplace · 12px radius · slate border.

---

## Domain mappings

### Case status → color (DF-012)

| Status | Accent | Never use |
|--------|--------|-----------|
| open | ice | blue |
| in_progress | sand | amber neon |
| pending_review | stone | purple |
| resolved | sage | neon green |
| closed | stone | — |
| escalated | sand | **red** |

### Priority

| Level | Accent |
|-------|--------|
| low | stone |
| medium | ice |
| high | sand |
| critical | sand (not red) |

---

## Page templates (implemented)

| Route | Template | Theme |
|-------|----------|-------|
| `/app` | Decision Center | workplace |
| `/app/analysis` | Analysis form | workplace |
| `/app/cases` | Case list | workplace |
| `/app/cases/:id` | Case file detail | casefile |

Mock data: `src/content/caseAppMock.js` — replace with spine pipeline API.

---

## Agent handoff checklist

Copy this to any frontend agent:

```
You are implementing DocuMind CMS UI.

READ FIRST:
- DESIGN_DECISIONS.md (this file)
- src/lib/designDecisions.js
- src/lib/designTokens.js

RULES:
1. Brand is DocuMind cms — from caseAppMeta.js only
2. Colors: brand.ink/slate/ember/mist + calm accents only
3. Font: Inter only — no font-mono
4. Components: import from src/components/ds/ — do not recreate
5. If a decision is missing → ask the owner — do not invent

FORBIDDEN:
- GAQO, caselogic, or any other product name
- Corporate blue, red, neon green, purple gradients
- JetBrains Mono
```

---

## Changing a decision

To change any decision:

1. Edit this file (human record)  
2. Update `src/lib/designDecisions.js` (machine record)  
3. Update `src/lib/designTokens.js` (token values)  
4. Update affected `src/components/ds/*` if needed  

Never change tokens without updating the decision record.

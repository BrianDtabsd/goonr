# DocuMind CMS — Design Decisions

**Owner:** You  
**Product:** DocuMind cms  
**Tokens:** `src/lib/designTokens.js`  
**Components:** `src/components/ds/`  
**Branding:** `src/config/caseAppMeta.js`

---

## Rules for agents

1. Read this file and `designTokens.js`  
2. Use components from `src/components/ds/` — do not restyle from scratch  
3. If something is not listed → **ask the owner** — do not guess  
4. **Never invent coded IDs** (no `DF-xxx`, `DC-xxx`, `DM-xxx`, or anything like your data field registry)  
5. **Design specs are not data fields** — do not merge this into the case data field registry  

---

## Foundation decisions

| Topic | Your decision |
|-------|---------------|
| Product name | **DocuMind cms** |
| Themes | **Workplace Light** (dashboard, forms, lists) + **Case File Dark Glass** (case detail) |
| Brand colors | `#1B1B1B` ink · `#434A53` slate · `#FF5722` ember · `#EEEEEE` mist |
| Calm accents | Sage `#78BDA7` · Ice `#C8E6EA` · Gold `#E8DFA8` · Sand `#C4A574` · Clay `#C4886A` |
| Forbidden | No corporate blue, red, neon green, purple gradients, JetBrains Mono, invented branding |
| Typography | **Inter only** · 16px body · line-height 1.65 · one H1 per view |
| Spacing | 44px touch targets · 24px card padding · 240px sidebar |
| Corners | 12px inputs/buttons · 16px cards · never sharp 4px |
| Motion | Hover lift + press bounce OK · no flash, no infinite pulse |
| Icons | Solar set via iconify only |

---

## Brand colors

```css
:root {
  --color-1: #1B1B1B;  /* ink */
  --color-2: #434A53;  /* slate */
  --color-3: #FF5722;  /* ember */
  --color-4: #EEEEEE;  /* mist */
}
```

| Token | Hex | Use |
|-------|-----|-----|
| Ink | `#1B1B1B` | Headings, charcoal buttons |
| Slate | `#434A53` | Secondary text, borders, labels |
| Ember | `#FF5722` | **One** accent CTA per screen |
| Mist | `#EEEEEE` | Workplace page background |

Max one ember button per view. Never for errors or page backgrounds.

---

## Calm accents

| Name | Hex | Use |
|------|-----|-----|
| Sage | `#78BDA7` | Online, active, success |
| Ice | `#C8E6EA` | Info, focus (dark), glass glow |
| Gold | `#E8DFA8` | Primary CTA on case file theme |
| Sand | `#C4A574` | Pending, in progress |
| Clay | `#C4886A` | Needs attention — not red |
| Dark page | `#0D0D0D` | Case file background |

---

## Forbidden

| Category | Do not use |
|----------|------------|
| Colors | Corporate blue, bright red, neon green, purple gradients |
| Fonts | JetBrains Mono, `font-mono` in ds/ or caseapp/ |
| Motion | Flashing, infinite pulse (except live status dot) |
| Typography | ALL CAPS body, line-height below 1.5 |
| Codes | Any `XX-###` style IDs in design files — reserved for your data field registry elsewhere |

---

## Typography

| Rule | Value |
|------|-------|
| Font | Inter only |
| Body | 16px, line-height 1.65 |
| Labels | 10–11px uppercase, tracking 0.14em, medium weight |
| Breadcrumbs | `documind cms / {section}` via `caseAppBreadcrumb()` |
| Case IDs / codes | Inter + `tabular-nums` — not monospace |
| Limits | 1 H1 per view · max 3 heading levels per card |

---

## Spacing

| Token | Value |
|-------|-------|
| Touch target | 44px min |
| Card padding | 24px |
| Section gap | 32–40px |
| Sidebar | 240px |
| Content max | 1200px |

---

## Motion

| State | Behavior |
|-------|----------|
| Card/button hover | Lift 2px |
| Button press | scale(0.98) |
| Easing | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| Reduced motion | Disable all animation when user prefers |

---

# Components

Use named sections only — no coded reference IDs.

## App shell (`DSAppShell`)

Sidebar left · main content · optional advisor float. Theme `workplace` or `casefile`. Case routes auto-switch to casefile.

## Sidebar (`DSSidebar`)

Workplace: `#E4E4E4` bg, 240px, brand from `caseAppMeta.js`, sage status dot, active nav `#D8D8D8`.  
Case file: `#111111` bg, active `white/8%`.

## Button (`DSButton`)

| Variant | Workplace | Case file |
|---------|-----------|-----------|
| primary | `#1B1B1B` bg | `#E8DFA8` gold bg |
| accent | `#FF5722` — one per view | — |
| secondary | outlined slate | outlined white |
| ghost | low emphasis | low emphasis |

## Card (`DSCard`)

Workplace: white, 16px radius, soft shadow, hover lift.  
Case file: glass `white/4%`, optional ice glow for hero card.

## Stat card, page header, case header, input, tabs, badge, table, alert, advisor, file chip

See `src/lib/designDecisions.js` → `components` for full specs.  
Case header tabs: Gather · Analysis · Resolution · GRTW · Tasks · Files.

---

## Status colors (UI only — not data field codes)

| Status | Accent |
|--------|--------|
| open | ice |
| in_progress | sand |
| pending_review | stone |
| resolved | sage |
| closed | stone |
| escalated | sand (not red) |

---

## Page templates

| Route | Page | Theme |
|-------|------|-------|
| `/app` | Decision Center | workplace |
| `/app/analysis` | Analysis | workplace |
| `/app/cases` | Case list | workplace |
| `/app/cases/:id` | Case file | casefile |

Mock data: `src/content/caseAppMock.js`

---

## Agent handoff

```
Implement DocuMind CMS UI from DESIGN_DECISIONS.md + designTokens.js + src/components/ds/.

Do NOT:
- Invent colors, fonts, or product names
- Use coded IDs like DF-012 or DC-012 anywhere in design files
- Touch or merge with the data field registry
- Use JetBrains Mono or corporate blue/red/neon green
```

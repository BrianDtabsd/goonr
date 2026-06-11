# DocuMind CMS — Design Tracks

**Product:** DocuMind cms  
**Approach:** Three parallel prototypes. Refine pages first, extract a design system from what works — not one monolithic spec up front.

**Rules for agents**

1. Pick **one track** per page you build. Do not mix stacks in the same view.
2. **No coded IDs** in design files (`DF-xxx`, `DC-xxx`, etc.) — design specs stay separate from the data field registry.
3. **Ask the owner** for branding or palette changes. Do not invent product names.
4. When a track stabilises, promote its tokens/components into that track's section in `DESIGN_SYSTEM.md`.

---

## The three tracks

| Track | Name | Source | Live routes | Status |
|-------|------|--------|-------------|--------|
| **A** | Template Glass | Marketing website template (`glass-card`, `useTheme`, swappable background) | `/app/glass`, `/app/glass/cases/:caseId` | **Exploring** — refine dashboard + case file, see what carries over |
| **B** | Workplace Light | REASON8 / case08 Decision Centre references | `/app`, `/app/analysis`, `/app/cases` | **Exploring** — mist/ember palette, sidebar, stat cards |
| **C** | Case File Dark Glass | Black + green glass case file references | `/app/cases/:caseId` | **Exploring** — dense info panels, advisor rail |

**Living design system (primary):** `/design-system` — always in the goonr template with live theme panel, glass, and swappable background. Bookmark this.

**Hub:** `/design-system` (replaces `/app/tracks`).

---

## Track A — Template Glass

**Keep from the website template**

- Swappable background image (`useTheme` → `--bg-url`)
- Frost level, transparency, frost colour (RGB)
- `glass-card`, `glass-nav`, `glass-container` utilities (`src/index.css`)
- Card radius, padding, layout mode (cards vs container)
- Button jump/glow motion
- `ContentCard` layout patterns (stat, bullets, text)

**Drop or rethink for DocuMind**

- GAQO / marketing copy and eyebrows with `font-mono`
- Corporate blue as default primary (`#3b82f6`) — use DocuMind ember or owner choice
- Hero + long-scroll marketing sections
- Purple gradients, neon accents

**Files**

| Role | Path |
|------|------|
| Theme hook | `src/hooks/useTheme.jsx` |
| Glass CSS | `src/index.css` (`.glass-card`, etc.) |
| Presets | `src/lib/glassPresets.js` |
| Layout | `src/pages/glass/GlassAppLayout.jsx` |
| Sidebar | `src/components/glass/GlassSidebar.jsx` |
| Dashboard | `src/pages/glass/GlassDashboard.jsx` |
| Case file | `src/pages/glass/GlassCaseFile.jsx` |

**Next iteration ideas**

- Wire studio settings panel to glass routes only (or shared preset)
- Decide which `ContentCard` layouts map to case management widgets
- Extract a `glass/` component folder if patterns repeat

---

## Track B — Workplace Light

**Source:** Decision Centre / Analysis screens (light, calm, scannable).

**Palette (owner confirmed)**

| Token | Hex | Use |
|-------|-----|-----|
| Ink | `#1B1B1B` | Headings, primary buttons |
| Slate | `#434A53` | Secondary text, borders |
| Ember | `#FF5722` | One accent CTA per view |
| Mist | `#EEEEEE` | Page background |

**Files**

| Role | Path |
|------|------|
| Tokens | `src/lib/designTokens.js` |
| Theme CSS | `src/styles/ds-theme.css` (`.ds-theme-workplace`) |
| Components | `src/components/ds/*` |
| Pages | `src/pages/caseapp/DecisionCenter.jsx`, `Analysis.jsx`, `CaseList.jsx` |

**Next iteration ideas**

- Tighten Analysis form layout against reference screenshots
- Case list table density and filters
- Promote only the DS primitives that appear on 3+ pages

---

## Track C — Case File Dark Glass

**Source:** Black page + green glass glow, dense case detail, advisor panel.

**Palette**

| Token | Use |
|-------|-----|
| Page `#0D0D0D` | Background |
| Green radial wash | `rgba(30, 55, 42, …)` — subtle, not neon |
| Sage `#78BDA7` | Active / online |
| Ice `#C8E6EA` | Info, glass edge glow |
| Gold `#E8DFA8` | Primary actions on dark |

**Files**

| Role | Path |
|------|------|
| Theme CSS | `src/styles/ds-theme.css` (`.ds-theme-casefile`) |
| Page | `src/pages/caseapp/CaseFileDetail.jsx` |
| Header / advisor | `DSCaseHeader`, `DSAdvisorPanel` |

**Next iteration ideas**

- Compare Track A glass case file vs Track C — merge or keep separate
- Document hub tab content blocks
- GRTW timeline widget

---

## How tracks relate

```
Marketing template (/)          Track A (/app/glass)
       │                              │
       │  glass, frost, bg            │  refine → dashboard, case file
       └──────────────┬───────────────┘
                      │
              (extract later)
                      │
Track B (/app) ───────┴────── Track C (/app/cases/:id)
Workplace light              Dark green glass
Decision Centre              Case file detail
```

Tracks **B** and **C** share `src/components/ds/` today. Track **A** uses the marketing stack (`useTheme` + `glass-card`). That split is intentional until you decide what to merge.

---

## Promoting a track to "the" design system

When a track feels right for a surface:

1. Add a short section to `DESIGN_DECISIONS.md` (plain language, no coded IDs).
2. Copy stable tokens into `designTokens.js` or `glassPresets.js` as appropriate.
3. Mark the track **Stable** in the table above.
4. Tell implementing agents which route + component folder to copy from.

Until then, treat everything as **prototype**.

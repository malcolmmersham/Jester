# Jester Methodology Graph — Design Spec

**Date:** 2026-09-19
**Status:** Approved by Malcolm (2026-09-19)
**Path:** dedicated page `/methodology` on `Jester/jester-website`

## 1. Problem & Goal

The Jester website tells the story "connects things others don't see" in prose.
This feature proves it visually: an interactive, force-directed knowledge graph of
the Jester methodology in which concepts float, are connected by *meaningful*
relationships (labelled edges), and — the signature behaviour — **dragging one
concept pulls its connected neighbours along** (Obsidian graph-view physics).

### Goals
- A new top-level page `/methodology` that makes Jester's IP legible at a glance.
- Obsidian-style physics: drag a node, its neighbourhood follows via link springs.
- Every connection carries meaning (verb-labelled edges), not just geometry.
- Fits the existing "Fool's Court" design system exactly (royal canvas, gold,
  hairlines, sharp corners, Fraunces/Instrument Sans).

### Non-goals (YAGNI)
- No audience/flywheel nodes in v1 (add a kind-toggle later if wanted).
- No 3D, no WebGL, no server-side rendering of the simulation.
- No persistence of user positions.
- No animation beyond physics settle + 150ms hover transitions.

## 2. Approach

**d3-force + hand-rolled SVG in a React client component.** `d3-force` is the
physics engine behind Obsidian-style graphs (link springs + charge + collide).
Rendering as inline SVG gives crisp hairlines and typographic control to match
`DESIGN.md`, and semantically labelled edges are trivial to draw. Adds a single
~15 KB dependency (`d3-force`). Everything runs client-side, so the static export
for Cloudflare Pages stays clean (pure client lib, data bundled as JSON). Drag is
implemented with raw pointer events (no d3-drag/d3-selection needed).

Rejected for v1: `react-force-graph`/three.js (overweight, WebGL text quality,
visual clash), Cytoscape.js (no true force-drag physics feel), vis-network
(default visuals, awkward edge labels).

## 3. Data Model

`src/data/methodology-graph.json` — curated from `jester-blueprint.jsx`. 16 nodes,
4 kinds, ~22 labelled edges.

### Nodes

**Ontology** (gold `var(--color-gold)`)

| id | label | definition |
|----|-------|------------|
| evidence | Evidence | The foundation. Data is not a deliverable — decisions grounded in evidence are. |
| decisions | Decisions | The unit of value Jester delivers. Better decisions at strategy, funding, community, and operational levels. |
| capability | Capability | The transferable ability for an organisation to make better decisions independently over time. |
| methodology | Methodology | Jester's proprietary IP — frameworks and systems. Delivered, never distributed. |
| story | Story | How evidence becomes action. The translation layer between data and decisions. |

**Streams** (white `var(--color-white)`, each links to its site page)

| id | label | href | definition |
|----|-------|------|-----------|
| advisory | Advisory | /advisory | Senior advisory for complex decisions — strategy, data, stakeholder, community impact. |
| workshops | Workshops | /workshops | Build capability in non-technical professionals to work confidently with data and AI. |
| jester-hat | Jester Hat | /jester-hat | Hosted methodology delivered via MCP. Your AI answers with an independent, seasoned voice. |

**IP assets** (plum — `#9A6FD8`, a lifted purple for contrast on the royal canvas)

| id | label | definition |
|----|-------|-----------|
| he-rangitapu | He Rangitapu | Structured community wellbeing framework across He Rangitapu dimensions. |
| tws-weighting | TWS Weighting | Survey post-stratification weighting, developed and validated at Trust Tairāwhiti. |
| data-storytelling | Data Storytelling | Templates and narrative logic for turning data outputs into decision-ready stories. |
| funding-framework | Funding Framework | Structured decision logic for evaluating funding applications and portfolio strategy. |
| impact-toolkit | Impact Toolkit | Longitudinal survey design, indicator selection, and reporting frameworks. |

**Foundation** (muted cream — `var(--color-cream)` at 70% opacity)

| id | label | definition |
|----|-------|-----------|
| trust-tairawhiti | Trust Tairāwhiti | Built tairawhitidata.nz. Ran longitudinal wellbeing surveys. The primary case study. |
| gartner | Gartner background | Experience with senior stakeholders — the register Jester operates in. |
| regional-data-platform | Regional Data Platform | One public source of truth for regional wellbeing data, open and improving. |

### Edges (source → verb → target)

```
evidence            grounds     decisions
story               translates  evidence
story               moves       decisions
methodology         delivers    capability
advisory            delivers    decisions
advisory            applies     methodology
advisory            builds      capability
workshops           shares      methodology
workshops           builds      capability
workshops           seeds       advisory          ← flywheel: graduates become prospects
jester-hat          serves      methodology
jester-hat          embeds      capability
jester-hat          extends     advisory
he-rangitapu        grounds     evidence
tws-weighting       validates   evidence
data-storytelling   powers      story
funding-framework   sharpens    decisions
impact-toolkit      measures    capability
trust-tairawhiti    produced    evidence
trust-tairawhiti    field-tests methodology
gartner             informs     advisory
regional-data-platform publishes evidence
```

Edge count is ~22; the two small cycles (advisory/workshops/jester-hat around
methodology↔capability) are intentional — they are the flywheel.

## 4. Component — `MethodologyGraph.tsx`

Client component (`"use client"`), no other component dependencies. Renders an
inline `<svg>` and an overlay HTML card.

### Physics & layout
- Fixed internal coordinate space `viewBox="0 0 1000 640"`; the SVG fills its
  container (width 100%, height ~36–40rem desktop / ~56vh mobile) and scales
  with the viewport — no ResizeObserver required.
- d3-force forces: `forceLink` (distance 100, strength 0.5), `forceManyBody`
  (charge −220), `forceCollide` (radius = node radius + 10), `forceCenter`,
  plus weak `forceX`/`forceY` (strength 0.05) so the graph stays centred and
  settles. `alphaDecay` ~0.028.
- Radial auto-layout fallback before the sim runs (phi = golden angle) so the
  first frame is never a pile-up.

### Interactions
- **Drag** — pointer events (`pointerdown`/`pointermove`/`pointerup` with
  `setPointerCapture`), pointer → viewBox coords via `getScreenCTM().inverse()`.
  On drag: set `fx/fy` on the node, `alphaTarget(0.3).restart()`. Link springs
  pull the neighbourhood along — the signature "pull the object, it pulls the
  others" behaviour. On release: clear `fx/fy`, `alphaTarget(0)`.
- **Hover** — compute the neighbourhood set (node + first-degree neighbours +
  incident edges). Neighbourhood rendered at full opacity + gold; everything else
  dims to 0.15. Edge verb labels fade in at link midpoints, rotated to match the
  link's actual angle and baseline-offset above the line. Hovered node gains a
  gold ring and scales ×1.25.
- **Click / Enter** — selects a node → overlay card (HTML, absolutely positioned
  over the canvas) shows: label, kind tag, definition from JSON, and a
  "About Jester Hat →" style link when the node has an `href`.
- **Escape / empty-click / close button** — clears selection.
- **`prefers-reduced-motion`** — run the simulation synchronously to near-settle
  once (no animation frames), render static; drag disabled; hover/click/
  keyboard all work.

### Visuals (on the royal canvas)
- Link hairlines: `rgba(241,239,232,0.18)`, 1px. Hovered edges: gold, 1.5px.
- Nodes: circles, no stroke except hover ring. Kind colours per §3.
- Node labels: Instrument Sans, 12px, `var(--color-cream)`, letter-spacing 0.02em,
  always visible, centred under the node.
- Edge verb labels: Instrument Sans italic 10px, cream at 75%, only on hover.
- Legend (rendered by the page, not the SVG): 4 colour swatches + labels.
- Node radius: ontology 9, stream 8, ip 8, foundation 7 (in viewBox units).

### Accessibility
- `<svg role="img" aria-label="...">` plus a visually-hidden long description of
  the graph (data summary).
- SVG groups are focusable (`tabindex=0`), Enter selects, Escape clears.
- Hover highlight is never the sole cue (selection card + focus states carry the
  information).

## 5. Page — `src/app/methodology/page.tsx`

Server component following existing sub-page conventions:
- **Paper hero:** breadcrumb (`Methodology`), small-caps kicker "The Methodology",
  `heading-hero` headline with one gold italic <span>/<em> accent, hairline
  bottom rule, short intro paragraph, and the hint line: *"Drag a concept — the
  whole web comes with it."*
- **Graph section:** full-bleed `royal` band containing the labelled legend
  (above or as a paper strip atop the canvas), the graph component, and a small
  lead-in statement about how the pieces connect (1–2 lines).
- **Closing:** reuse `CTASection`.
- **Metadata:** `title: "Methodology — Jester"`, matching description, so the
  static export (SSG) carries proper meta.

## 6. Navigation

Desktop + mobile nav in `src/components/Nav.tsx`: add a top-level "Methodology"
link (outside the dropdowns), active-state rules mirroring the existing link
pattern. Check `Footer.tsx`; add a "Methodology" link to any relevant column if
it enumerates site sections.

## 7. Verification

- `npm run lint` passes.
- `npm run build` (static export) succeeds — no client-only errors, no
  `window`/`document` at module scope.
- Deploy: `npm run build && npx wrangler pages deploy out --project-name jester-website`.
- Manual checks on the live Pages URL:
  - All 16 nodes + all edges render; legend matches node colours.
  - Dragging a central node visibly pulls its connected neighbourhood.
  - Hover highlights neighbourhood; edge verbs appear; rest dims.
  - Click/Escape card behaviour; stream nodes navigate to their pages.
  - Touch drag on a phone; no horizontal scroll from the SVG.
  - `prefers-reduced-motion` yields a static, fully usable graph.
- No automated test framework exists in this repo; lint + build + manual visual
  check is the verification floor. (If the repo gains vitest later, the
  dataset's node/edge integrity — ids resolve, no orphan edges, kinds valid —
  is the natural first unit test.)

## 8. Acceptance Criteria

1. `/methodology` renders paper hero + royal graph band + legend + CTA.
2. Graph contains exactly the §3 dataset (16 nodes, ~22 labelled edges).
3. Dragging a node pulls its connected nodes along (spring physics); release
   leaves the graph to re-settle.
4. Hover: neighbourhood glows gold, rest dims, edge verbs fade in — node labels
   visible at all times.
5. Click/Enter opens the definition card; Escape/close clears; stream nodes link
   to `/advisory`, `/workshops`, `/jester-hat`.
6. The graph honours the Jester design system (royal canvas, gold accent, sharp
   corners elsewhere, hairlines, Fraunces + Instrument Sans, no decorative
   shadows). No rounded corners on page furniture.
7. `prefers-reduced-motion` renders a static but fully navigable graph.
8. Works with touch drag on mobile; static export deploys cleanly via wrangler.
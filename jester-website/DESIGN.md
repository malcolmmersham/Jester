# Jester — Design System ("The Fool's Court")

Design principles for the Jester website, derived from the DESIGN.md practice of `VoltAgent/awesome-design-md`. Feed this file to an agent (or any AI) to reproduce the Jester look and voice.

---

## 1. Theme & Atmosphere

Jester is **the independent voice in the room** — the court fool who is allowed to tell the king the truth. The design must be:

- **Editorial, not SaaS.** Sharp hairlines, a warm-paper page, generous whitespace, small-caps kickers, and a big characterful serif display. No soft "modern SaaS" gradients, no pill-heavy rounded cards, no generic purple-blue palette.
- **Confident.** Ink-dark spine: the header, homepage hero, closing sections, and footer sit on a warm near-black. Bold, high-contrast, decisive.
- **Witty but rigorous.** A single gold accent carries the mischief (bells, baubles, the jester's hat). A thin royal-purple + gold **motley band** is the signature motif — used sparingly, never as wallpaper.
- **Local & plainspoken.** Aotearoa grounding; warmth in the paper tone; language stays human, not corporate.

## 2. Color

Named tokens (defined in `globals.css`):

| Token | Hex | Use |
|-------|-----|-----|
| `ink` | `#16130E` | Foreground text; dark spine (header, hero, footers, closing bands) |
| `royal` | `#1A0D2E` | Deep royal — secondary dark surfaces (flywheel, cohort section) |
| `purple` | `#4A2580` | Jewel accent — secondary emphasis, detail callouts on cards |
| `gold` | `#EF9F27` | **The signature accent.** CTAs, dark-section highlights, large display accents. Use at large size only on light backgrounds |
| `gold-deep` | `#A76E0B` | Legible gold for small caps/labels on light backgrounds (WCAG AA) |
| `paper` | `#F4F0E8` | Page background — warm, not pure white |
| `cream` | `#F1EFE8` | Legacy alias (text on dark, rarely used directly) |
| `white` | `#FBF8F1` | Lifted surfaces (cards, dropdowns) — paper, one step lighter |
| `hairline` | `#E3DCCB` | Borders, rules, dividers |

**Rules**
- Gold on paper is only for display-size text (≥24px) and interactive accents. Small text and labels on light backgrounds use `gold-deep`, never gold.
- Dark surfaces use gold at any size (the contrast is strong on ink).
- Never use pure `#000` or `#fff`. Everything is warm.
- Hairlines do the job shadows do elsewhere: read the page by rules, not drop shadows.

## 3. Typography

| Role | Family | Notes |
|------|--------|-------|
| Display | **Fraunces** (Google) `@font-face --font-display` | Variable editorial serif. Weight 500–650, tight line-height, slight letterspacing. Italic for accent words in headings |
| Body | **Instrument Sans** (Google) `@font-face --font-body` | Warm humanist grotesk. Readable, plainspoken. Text color = `ink` |

**Kickers / eyebrows** — Fraunces small-caps, tracked wide (`.14em`), size ~`.72rem`, gold-deep on light / gold on dark. No all-caps sans eyebrows.

**Headings** — Fraunces, weight ~600. Accent spans inside `<h1>`/`<h2>` (the gold words) render italic with weight ~500 — the signature "witty aside".

**Type scale** (mobile → desktop):
- Hero display: `2.5rem → 4.5rem`
- Section heading: `1.75rem → 2.75rem`
- Subsection: `1.25rem`
- Body: `1rem`, line-height `1.6`

## 4. Layout & Spacing

- Max content width `80rem`, side padding `1rem → 2rem`.
- Section rhythm: `5rem → 7rem` vertical padding.
- **The motley band**: a `4px` full-width strip of diagonal stripes (`gold` + `ink`), used as a ribbon at the very top of the page and beneath the homepage hero. Restrained.
- Sharp corners everywhere (`border-radius: 0`) — a signature. Reserved exceptions: small bullet dots and the motley stripe.
- Page cadence alternates `paper` and `white` (cards/lifted bands), with `ink` and `royal` closing sections for punctuation.

## 5. Components

- **Header** — sticky, `ink` at ~85% opacity with blur, hairline light bottom rule. Wordmark "Jester" in Fraunces. Nav links paper→gold on hover; the active route sits in gold. Dropdowns are `white` surfaces, sharp corners, hairline border.
- **Buttons** — sharp corners, Fraunces semi-bold, uppercase, tracked. `primary` = gold fill, ink text; hover flips to royal fill, paper text. `outline` = hairline, foreground text; active on dark use the `ghost` variant (paper hairline + paper text, hover fills paper).
- **Cards** — `white` surface, hairline border, sharp corners, generous padding. Hover raises the hairline to gold. Titles in Fraunces. Small caps + gold-deep price/eyebrow lines.
- **Hero** — homepage hero is full-bleed `ink` with paper headline, gold italic accent phrase, motley band at its foot. Sub-pages use a paper hero with breadcrumb, small-caps kicker, and a hairline bottom rule.
- **Testimonial / closing band** — on `ink`, quote in paper (Fraunces or large body), author in gold.
- **Flywheel / numbered progression** — on `royal`, gold numbers in sharp ink-bordered squares; gold small-caps step labels.
- **Forms** — `white` fields, hairline borders, sharp corners, gold focus ring.

## 6. Elevation & Depth

- No drop shadows as decoration. Distinguish layers with tone (`paper` vs `white` vs `ink`) and hairlines.
- Hover = color shift (hairline → gold) + gentle states, 150ms ease.

## 7. Motion

- Transitions 150ms ease; hover reveals quick and quiet.
- No scroll-jacking, no parallax, no entrance choreography.

## 8. Accessibility

- Gold-on-light only at display size; `gold-deep` for small text.
- Hairlines must not be the sole information cue (color active states also used).
- Keep body text `ink` on `paper` (contrast ≈ 11:1).
- Fraunces display retains high weight for large sizes; body reads in Instrument Sans.

## 9. Do / Don't

**Do**
- Use the gold accent deliberately — one per region.
- Let ink sections act as full stops (hero, closing band, footer).
- Keep corners sharp; let hairlines define the grid.
- Use Fraunces italic sparingly for wit (a gold phrase inside a headline).

**Don't**
- Don't use cream-everywhere, terracotta, or sandblasted-white "AI-default" palettes.
- Don't use all-caps sans kickers or mono data labels.
- Don't stack gold, purple, and royal in a single noisy gradient.
- Don't radius-carpet every card and button.

## 10. Agent Prompt

> You are the Jester brand and web designer. Apply `DESIGN.md` in this directory: warm-paper editorial with an ink spine, Fraunces + Instrument Sans, sharp corners, hairline rules, gold as the single accent (gold-deep for small text on light), the royal+gold motley band as the only badge. Homepage hero is full-bleed ink; sub-pages use a paper hero. Keep the copy and page routes exactly as they are; restyle only. Use CSS variables from `globals.css`; never re-introduce rounded cards or drop-shadow decoration.
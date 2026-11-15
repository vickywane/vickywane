# Review report: B · Text-only hero (Figma)

Made 2026-11-15 · figma://BKeWGnCzhpo2q3os5yTh9y/2256-1340 · 0 probe run(s) · system: none found

## Verdict: NO ERRORS FOUND

in the 4 cells that were checked (12 skipped with a reason). That is not the same as correct: see what was not checked.

0 errors · 2 warnings · 1 notes · coverage 4/16 cells done

1 finding(s) below are **unverified** (reasoned, not observed).

## What was not checked

**Skipped on purpose** (12)
- `task:/hero|focus-walk`: Design file: no running page to operate (no browser states, CSS or scripts to exercise). Re-run on the built page.
- `task:/hero|hover-and-press`: Design file: no running page to operate (no browser states, CSS or scripts to exercise). Re-run on the built page.
- `task:/hero|states-and-data`: Only one content state is designed; empty, long-title and missing-cover states are not drawn
- `task:/hero|motion`: Design file: no running page to operate (no browser states, CSS or scripts to exercise). Re-run on the built page.
- `task:/hero|stress-text`: Design file: no running page to operate (no browser states, CSS or scripts to exercise). Re-run on the built page.
- `task:/hero|reduced-motion`: Design file: no running page to operate (no browser states, CSS or scripts to exercise). Re-run on the built page.
- `task:/hero|forced-colors`: Design file: no running page to operate (no browser states, CSS or scripts to exercise). Re-run on the built page.
- `task:/hero|console-and-network`: Design file: no running page to operate (no browser states, CSS or scripts to exercise). Re-run on the built page.
- `task:/hero|letter-reveals`: Design file: no running page to operate (no browser states, CSS or scripts to exercise). Re-run on the built page.
- `task:/hero|text-pixels`: Design file: no running page to operate (no browser states, CSS or scripts to exercise). Re-run on the built page.
- `task:/hero|floating-bars`: Design file: no running page to operate (no browser states, CSS or scripts to exercise). Re-run on the built page.
- `task:/hero|toggles`: Design file: no running page to operate (no browser states, CSS or scripts to exercise). Re-run on the built page.

## Warnings (2)

### Recent items change copy, labels and colour coding between desktop and the deck
`H-001` · CP-03 One action named two ways, or placeholder copy left in · **seen**
- Where: /hero · 1440 list vs 768/375 deck
- Expected: One item reads the same at every width
- Evidence: `opendesigner/review/shots/hero-1440.png`, `opendesigner/review/shots/hero-768.png`, `opendesigner/review/shots/hero-375.png`
- Fix: Desktop: LATEST PROJECT, a long description, a meta line, every label teal, no arrow. Deck: PROJECT, a different one-liner, no meta, only PROJECT teal, an arrow. Pick one label set, one description and one colour rule, and give desktop rows the arrow

### The swipe deck needs a non-drag way to move, and the icon-only links need names
`H-002` · IN-04 Touch · **inferred** · unverified
- Where: /hero · 375, 768 · Deck; Socials
- Expected: WCAG 2.5.7 single-pointer alternative to dragging, 2.1.1 keyboard scroll, 4.1.2 names for GitHub and LinkedIn
- Evidence: `opendesigner/review/shots/hero-375.png`, `opendesigner/review/shots/hero-768.png`
- Fix: Make the 01 / 03 arrow real previous/next buttons, keep the deck a focusable scroll region, name each icon link. Unverified: confirm on the built page

## Notes (1)

### Sibling titles mix Title Case and sentence case
`H-003` · CP-01 Title Case where the system says sentence case · **seen**
- Where: /hero · recent items
- Expected: One case rule for item titles
- Evidence: `opendesigner/review/shots/hero-1440.png`
- Fix: Figma Tickets Plugin is a product name; keep the others in sentence case and write the rule down

## Coverage

| Cell | Status | Evidence |
|---|---|---|
| `/hero|375x1135|light` | done | opendesigner/review/probes/figma-hero-probe.json, opendesigner/review/shots/hero-375.png |
| `/hero|768x1272|light` | done | opendesigner/review/probes/figma-hero-probe.json, opendesigner/review/shots/hero-768.png |
| `/hero|1440x926|light` | done | opendesigner/review/probes/figma-hero-probe.json, opendesigner/review/shots/hero-1440.png |
| `task:/hero|scroll-walk` | done | opendesigner/review/shots/hero-1440.png, opendesigner/review/shots/hero-375.png, opendesigner/review/shots/hero-768.png |
| `task:/hero|focus-walk` | skipped | Design file: no running page to operate (no browser states, CSS or scripts to exercise). Re-run on the built page. |
| `task:/hero|hover-and-press` | skipped | Design file: no running page to operate (no browser states, CSS or scripts to exercise). Re-run on the built page. |
| `task:/hero|states-and-data` | skipped | Only one content state is designed; empty, long-title and missing-cover states are not drawn |
| `task:/hero|motion` | skipped | Design file: no running page to operate (no browser states, CSS or scripts to exercise). Re-run on the built page. |
| `task:/hero|stress-text` | skipped | Design file: no running page to operate (no browser states, CSS or scripts to exercise). Re-run on the built page. |
| `task:/hero|reduced-motion` | skipped | Design file: no running page to operate (no browser states, CSS or scripts to exercise). Re-run on the built page. |
| `task:/hero|forced-colors` | skipped | Design file: no running page to operate (no browser states, CSS or scripts to exercise). Re-run on the built page. |
| `task:/hero|console-and-network` | skipped | Design file: no running page to operate (no browser states, CSS or scripts to exercise). Re-run on the built page. |
| `task:/hero|letter-reveals` | skipped | Design file: no running page to operate (no browser states, CSS or scripts to exercise). Re-run on the built page. |
| `task:/hero|text-pixels` | skipped | Design file: no running page to operate (no browser states, CSS or scripts to exercise). Re-run on the built page. |
| `task:/hero|floating-bars` | skipped | Design file: no running page to operate (no browser states, CSS or scripts to exercise). Re-run on the built page. |
| `task:/hero|toggles` | skipped | Design file: no running page to operate (no browser states, CSS or scripts to exercise). Re-run on the built page. |

## Re-run

Fix, then run the same cells again and `review.py check` on the new probe files: it prints what was resolved and what is new. Do not mark a cell done from memory.

## Measured from Figma layers (7)

These were measured from the design file through the Figma Plugin API (`probes/figma-hero-probe.json`), not by `probe.js` on a running page, so `review.py check` cannot ingest them. Same severity rules apply.

### Warnings

**M-001 · The primary button label is 13 px** · MS-19 · measured (Figma)
- Where: /hero · Socials bar "GET IN TOUCH" · 375, 768, 1440
- Measured: Roboto Mono Bold 13 px · Expected: 15 px or more for a primary label (MS-19); the project's v2 rule says nothing under 14 px (`docs/typography-review-2026-11.md` §4.1)
- Fix: v2/Label (16 px), or 15 px Roboto Mono Bold

**M-002 · Small mono labels are 11-12 px** · MS-02 · measured (Figma)
- Where: RECENT, 01 / 03, PROJECT / ARTICLE / TALK at 375 and 768 (11 px); LATEST labels and meta lines at 1440 (12 px)
- Expected: 14 px minimum for any text (v2/Small)
- Fix: v2/Small (14-15 px), keep the mono tracking

**M-003 · Desktop pitch runs about 36 characters a line** · MS-07 · measured (Figma)
- Where: /hero · 1440 · Pitch, 420 px wide, 3 lines, 107 characters
- Expected: 45-75 characters per line · at 768 the same pitch is 560 px wide and reads at 54
- Fix: widen the desktop pitch to about 520-560 px

**M-004 · The GitHub | LinkedIn joint is 4 px; the other joint is 2 px** · MS-22 · measured (Figma)
- Where: /hero · Socials (joined bar) · all widths
- Expected: one 2 px rule at every joint
- Fix: drop LinkedIn's left stroke, or overlap the cells by 2 px

### Notes

**M-005 · Portrait tilted 1.19° on desktop only** · MS-05 · measured (Figma) — 0° at 768 and 375. Set to 0, or tilt at every width if intended.

**M-006 · Two text typefaces plus a mono** · MS-02 · measured (Figma) — Space Grotesk (Bold, Medium) + Roboto Flex + Roboto Mono. Fine as a deliberate pairing; record it as a decision. Roboto Flex still does not load on the live site.

**M-007 · Deck card edges are a 14% hairline (about 1.4:1)** · MS-04 · measured (Figma) — WCAG 1.4.11 only needs 3:1 when the edge is what identifies the control; here the title and arrow do, so keep both.

### Floors that passed (measured, Figma)
- Text contrast: lowest pair is 7.47:1 (#115e65 on white); every text node checked at all three widths passes 4.5:1.
- Targets: smallest interactive row is 40 px tall (desktop index); buttons and icon links are 56 × 56.
- Overflow: the only content past the frame edge is the deck at 375 and 768, which is the intended horizontal scroller.
- Line height: body 1.59-1.63; card lines 1.47-1.5 (≥ 1.4).
- Primary actions: one filled button per view.

## Re-check after fixes (2026-11-15, same three cells, measured from Figma)

| Finding | Before | After | Status |
|---|---|---|---|
| M-001 primary button label | 13 px | 15 px Roboto Mono Bold | fixed |
| M-002 small mono labels | 11-12 px | 14 px (all mono text is 14-15 px) | fixed |
| M-003 desktop pitch measure | 420 px · 3 lines · ~36 cpl | 540 px · 2 lines · ~54 cpl | fixed |
| M-004 button-bar joints | 2 px / 4 px | 2 px / 2 px (LinkedIn left stroke removed; redundant ink stroke on the button removed) | fixed |
| M-005 portrait tilt (note) | 1.19° at 1440 only | 0° at every width | fixed |
| H-001 list vs deck consistency | different labels, copy, meta, colours, arrow | one label set (PROJECT / ARTICLE / TALK under a RECENT header), the same title, description and meta line at every width, labels teal (#115e65 resolved) everywhere, ink type strips, an arrow on every item; desktop arrows aligned in one column | fixed |
| H-002 deck needs a non-drag control; icon links need names | text "01 / 03 →" | real Previous / Next buttons, 44 × 44 (Previous dimmed at item 1), counter marked aria-live; deck named as a focusable region "Recent work"; icon links annotated aria-label "GitHub" / "LinkedIn" | fixed in design · **verify in code** |
| M-006 two text typefaces (note) | — | unchanged: record as a decision | open (decision) |
| M-007 hairline card edges (note) | — | unchanged: title + arrow identify each card | accepted |
| CP-01 mixed title case (note) | — | unchanged: product name kept in Title Case | accepted |

Evidence: `shots/hero-1440-after.png`, `shots/hero-768-after.png`, `shots/hero-375-after.png`.
Deck cards grew to fit the meta line: 336 px tall at 768, 319 px at 375; all three cards in each deck share one height, arrows bottom-aligned.
Still not checked (needs the built page): keyboard focus, hover/press, motion and reduced motion, text stress at 200%, empty / long-title / missing-cover states.

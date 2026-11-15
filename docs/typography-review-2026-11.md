# Typography & accessibility review: nwani.netlify.app (Nov 2026)

**Scope:** Home, Blog, a blog category and an internal article. Each was measured live at 1440px (desktop), 820px (tablet), 375px (mobile) and 320px (reflow), and checked against the source in `apps/frontend`.

**Method:**
- A script walked every visible text node and recorded font family, size, weight, line-height, letter-spacing, line length, and the colour actually rendered against its real background.
- Contrast was calculated with the WCAG 2.x relative-luminance formula.
- axe-core 4.10.2 ran with the `wcag2a/2aa/21aa/22aa/best-practice` tags.
- Manual tests: WCAG 1.4.4 (user font-size at 200%), 1.4.10 (reflow at 320px) and 1.4.12 (text-spacing override).

> axe's `color-contrast` rule returned no results at all (not even passes) in this browser environment, because the browser pane was hidden while the scans ran. All contrast numbers below come from the formula, not from axe.

---

## 1. Why the text looks small (root causes, in order of impact)

1. **Body text shrinks to 12px on phones and 14px on tablets.**
   - `components/ui/Typography.tsx` sets body to `text-xs md:text-sm lg:text-base`: 12px below 768px, 14px from 768–1023px, 16px only from 1024px.
   - On mobile, **75% of all text on Home and 70% on the article is 12px**, with a 16px line-height (1.33).
   - Buttons drop to **13px** below 960px (`styles/index.ts`, `Button p`).
   - Most visitors arriving from LinkedIn are on a phone, so they get the smallest version.
2. **The body font never loads.**
   - `globals.css` imports Roboto Flex with `@import url(fonts.googleapis…)` *after* `@import "tailwindcss"`. CSS ignores any `@import` that follows other rules, and the built CSS confirms it was dropped: no Google Fonts stylesheet and no font request.
   - `"Roboto Flex", sans-serif` therefore falls back to the system sans (Helvetica on macOS, Arial on Windows). Measured text width with the stack matched `sans-serif` exactly (410px vs 376px for real Roboto metrics).
   - The design and the Figma file assume Roboto Flex. Users see Helvetica or Arial with wide letter-spacing.
3. **Light grey text with extra letter-spacing.**
   - Body text is `#666666` with `tracking-wider` (0.05em, so 0.8px at 16px and 0.6px at 12px).
   - Grey lowers perceived weight, and positive tracking on small sizes makes words look sparse and smaller.
4. **Very long lines on desktop.**
   - Paragraphs fill the full 1348px container: **about 158 characters per line** in the Software Engineer intro and the article body, and 118–145 elsewhere.
   - The comfortable range is 50–75. At that width, 16px reads like a caption.
5. **Extreme scale contrast.**
   - Sections have 200px top/bottom padding, headings run 38–60px, and body is 12–16px.
   - The jump between levels is large, so body text looks smaller than it is.
6. **Code is bigger than prose on mobile.** Article code blocks stay 16px while paragraphs drop to 12px, so the hierarchy is inverted.

---

## 2. Measurements

### Size distribution (share of visible characters)

| Page / viewport | 12px | 14px | 15px | 16px | 18–20px | 24px+ |
|---|---|---|---|---|---|---|
| Home 1440 | – | 2% | 2% | **76%** | 12% | 8% |
| Home 820 (tablet) | – | **77%** | 2% | – | 13% | 7% |
| Home 375 (mobile) | **75%** | 15% | 1% | – | 5% | 3% |
| Blog 1440 | – | – | 8% | 64% | 6% | 21% |
| Article 1440 | – | – | – | 83% | 12% | 4% |
| Article 375 | **70%** | 13% | – | 13% (code) | – | 4% |

### Type styles in use (desktop)

| Role | Font (as rendered) | Size / line-height | Tracking | Colour | Notes |
|---|---|---|---|---|---|
| Body (Tailwind `Typography`) | "Roboto Flex", but the system sans actually renders | 16/24 → 14/20 → 12/16 | 0.05em | #666 | `rem` units, so it scales with user prefs |
| Section intro (`Text`, styled-components) | Space Grotesk | 20/38 → 14/26 | – | #666 | `px` units, so it doesn't scale |
| H1 | Space Grotesk 600 | 60/60 → 48 → 36/40 | – | teal | line-height 1.0 |
| H2 (styled) | Space Grotesk 400/700 | **38/35** → 28 → 24/35 | – | teal | **line-height below font size** |
| H2 (Tailwind) | Space Grotesk | 30/36 → 24/32 | – | teal | A second, inconsistent H2 size |
| H3 | Space Grotesk "500" | 28/35 → 22 → 20 | – | teal | **Weight 500 isn't loaded**, so it renders at 400 |
| Card title | Space Grotesk | 24/38 → 18/26 | – | #666 | Titles share the body colour |
| Date / meta | Space Grotesk | 18/38 | – | #666 | |
| Link CTA ("Read Blog Article") | Space Grotesk | 15/38 | – | ink | |
| Button label | Space Grotesk 500 | 16/20 → **13** | – | white | |
| Testimonial name | Space Grotesk | 14/19.6 | – | teal | |

**There are two parallel type systems:** Tailwind `Typography` (rem) and styled-components `H2Heading`, `H3Heading`, `H4Heading`, `Text`, `Button` (px). They define different sizes for the same roles. For example, H2 is 30px in one and 38px in the other on the same page.

**Fonts loaded:** Space Grotesk 400/600/700 via `next/font`. The config lists `"400"` twice and omits 500, which is used by H3 and buttons. Roboto Flex isn't loaded. Open Sans is requested in the same dead `@import` but never used.

---

## 3. WCAG / axe findings

| WCAG criterion | Level | Result | Evidence | Fix |
|---|---|---|---|---|
| **1.4.3 Contrast (minimum)** | AA | ❌ **Fail** | #666 on olive banner `#D0DB97` = **3.90:1** (needs 4.5), across the whole banner on all pages | Body colour #4D4D4D, giving **5.74:1** on olive |
| 1.4.3 | AA | ❌ **Fail** | #666 20px (and 14px on mobile) on mint `#C1EDCC` = **4.44:1**: "Outside my working hours…", "My latest articles…" | #4D4D4D gives **6.54:1** on mint |
| 1.4.3 | AA | ❌ **Fail** | Search placeholder: teal at 50% on white ≈ **2.4:1**. The input has **no label**, so the placeholder is the only label | Add a visible or `aria-label` label, and make the placeholder ≥ 4.5:1 (for example #5F6B6D) |
| 1.4.3 | AA | ❌ **Fail** | Code theme (gruvbox-light): `#B57614` keywords **3.33:1**, `#79740E` strings **4.29:1** on `#FBF1C7` | Switch the highlighter to a verified AA theme (e.g. `a11yLight`) or darken those tokens |
| 1.4.3 | AA | ✅ Pass (barely) | #666 on white 5.74, on cream 5.45, on `#F9FAFE` 5.50 | Still raise it to about #4D4D4D (8.45 on white) for comfort |
| 1.4.4 Resize text | AA | ⚠️ Partial | Browser zoom works. With the **user's default font size at 200%**, Tailwind text doubles (body 12→24px, H2 24→48px) but styled-components text stays fixed: card titles 18px, buttons 13px. Body ends up **bigger than card titles**, breaking hierarchy | Move every size to `rem` tokens (§4) |
| 1.4.8 Visual presentation: line width ≤ 80 chars | AAA (advisory) | ❌ | About 158 cpl (SE intro, article body), 145 (article HTML block), 143 (related card), 118 (writer intro) | `max-width: 68ch` on prose |
| 1.4.8 No justified text | AAA (advisory) | ❌ | Hero bio is `text-align: justify`, which leaves visible gaps between words at 12px on mobile | `text-align: left` |
| 1.4.8 Line spacing ≥ 1.5 | AAA (advisory) | ❌ | Body 24/16 = 1.5 on desktop but **16/12 = 1.33** on mobile and 20/14 = 1.43 on tablet. Headings 35/38 = **0.92** | Body 1.6, headings 1.15–1.25 |
| 1.4.10 Reflow (320px) | AA | ✅ Pass | No horizontal scroll at 320px (carousels excluded) | – |
| 1.4.12 Text spacing | AA | ✅ Pass | With line-height 1.5, letter 0.12em, word 0.16em and paragraph 2em applied, nothing clipped | – |
| 2.5.8 Target size (minimum) | AA (2.2) | ⚠️ Likely fail | The "Reviews From Colleagues" and "Latest Published Articles" pill links are 154×14px and 146×14px tap targets. "Read External Article" is 151×20px | Give links at least 24px height (padding) or make the whole card clickable |
| 1.3.1 Info & relationships: headings | A / best-practice | ⚠️ | axe `page-has-heading-one`: **Blog and Article have no `<h1>`**. The article title is an `<h2>` and the body uses h2/h1 inconsistently | Article title → `h1`, body sections → `h2/h3` |
| 1.3.1 Lists | A | ❌ | axe `listitem` / `list`: `<li>` outside `<ul>` (carousels, review list) | Wrap in `ul`, or use `div` |
| 4.1.2 Name, role, value | A | ❌ | axe `button-name` ×8 (blog carousel arrows), `nested-interactive` ×4, `aria-hidden-focus` ×8 (slick clones) | `aria-label` the arrows; `inert` or `tabindex=-1` on cloned slides |
| 1.1.1 Non-text content | A | ❌ | axe `image-alt` ×4 on the article page (body images have no `alt`) | Add an `alt` field in Sanity and render it |
| 2.1.1 Keyboard | A | ❌ | axe `scrollable-region-focusable`: code `pre` blocks and the blog carousel scroll but can't be focused | `tabIndex={0}` plus a label on `pre` |
| Landmarks | best-practice | ⚠️ | `landmark-one-main`, `region` ×42–96 | Wrap page content in `<main>` |

---

## 4. Recommendations

### 4.1 One type scale, in `rem`, fluid between breakpoints

Replace both systems with a single set of tokens in `globals.css` `@theme` (Tailwind v4), and use them from both Tailwind classes and styled-components (`font-size: var(--text-body)`).

| Token | Use | Mobile (375) | Desktop (1440) | CSS | Line-height | Tracking |
|---|---|---|---|---|---|---|
| `--text-display` | H1 | 40px | 72px | `clamp(2.5rem, 1.75rem + 3.2vw, 4.5rem)` | 1.05 | -0.02em |
| `--text-h2` | Section titles | 28px | 40px | `clamp(1.75rem, 1.45rem + 1.25vw, 2.5rem)` | 1.15 | -0.01em |
| `--text-h3` | Card/talk/project titles | 22px | 28px | `clamp(1.375rem, 1.25rem + 0.55vw, 1.75rem)` | 1.25 | -0.005em |
| `--text-h4` | Sub-headings, card titles | 18px | 22px | `clamp(1.125rem, 1.05rem + 0.35vw, 1.375rem)` | 1.3 | 0 |
| `--text-lead` | Section intros (writer/communities), hero bio | 18px | 20px | `clamp(1.125rem, 1.08rem + 0.2vw, 1.25rem)` | 1.6 | 0 |
| `--text-body` | All paragraphs, quotes, card summaries | **16px** | 17px | `clamp(1rem, 0.97rem + 0.1vw, 1.0625rem)` | 1.6 | **0** |
| `--text-article` | Long-form article body | 17px | 19px | `clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)` | 1.7 | 0 |
| `--text-small` | Dates, roles, captions, nav | 14px | 15px | `clamp(0.875rem, 0.86rem + 0.1vw, 0.9375rem)` | 1.5 | 0.01em |
| `--text-label` | Buttons, CTAs, pills | 16px | 16px | `1rem` | 1.25 | 0.01em |
| `--text-code` | Code | 14px | 15px | `clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)` | 1.6 | 0 |

**Rules that go with it:**
- **Never go below 16px for reading text, or below 14px for anything.** Both Apple's and Google's guidance set 16–17px body text on phones. A 16px+ font on the search input also stops iOS Safari auto-zooming into it.
- **Remove `tracking-wider` from body text.** Use 0 for text and small negative tracking for large headings.
- **Line-height:** 1.6 for body, 1.7 for articles, 1.05–1.25 for headings, never below 1.
- **Measure:** `max-width: 68ch` on paragraphs (intros, article body, quotes). Keep the wide container for grids, but cap the text inside.
- **Prose rhythm:** about 1em between paragraphs, headings with more space above (1.6em) than below (0.5em).
- **No justified text.**

### 4.2 Colour

| Token | Value | On white | On cream `#FFF8F0` | On mint `#C1EDCC` | On olive `#D0DB97` |
|---|---|---|---|---|---|
| Current `--color-neutral-gray` | #666666 | 5.74 ✅ | 5.45 ✅ | **4.44 ❌** | **3.90 ❌** |
| **Proposed `--color-text-body`** | **#4D4D4D** | 8.45 ✅ | 8.03 ✅ | 6.54 ✅ | 5.74 ✅ |
| `--color-dark-teal` (headings) | #115E65 | 7.47 ✅ | 7.09 ✅ | 5.78 ✅ | 5.07 ✅ |

- Card titles should use ink (#131112) or teal, not body grey, so titles stand apart from summaries.
- Code theme: use `a11yLight` (react-syntax-highlighter ships it), or keep gruvbox and darken `#B57614` and `#79740E` until they reach 4.5:1.

### 4.3 Fix font loading

- Load Roboto Flex through `next/font`, as Space Grotesk already is. That makes it self-hosted, preloaded and free of layout shift, and removes the dead `@import`:
  ```ts
  // app/layout.tsx
  import { Space_Grotesk, Roboto_Flex } from "next/font/google"
  const heading = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading", display: "swap" }) // variable font: all weights
  const body = Roboto_Flex({ subsets: ["latin"], variable: "--font-body", display: "swap" })
  // <html className={`${heading.variable} ${body.variable}`}>
  ```
  ```css
  /* globals.css: delete the googleapis @import (and Open Sans) */
  @theme { --font-heading: var(--font-heading), system-ui, sans-serif; --font-body: var(--font-body), system-ui, sans-serif; }
  ```
- Drop the explicit `weight: ["400","400","600","700"]`, or list `["400","500","600","700"]`, so H3 and buttons get a real 500.
- Roboto Flex has an optical-size axis (`opsz`). `font-optical-sizing: auto` (the default) makes small text slightly sturdier, which also helps legibility at 14–16px.

### 4.4 Code changes (file by file)

| File | Change |
|---|---|
| `src/components/ui/Typography.tsx` | `body: "text-[length:var(--text-body)] leading-[1.6] text-[--color-text-body] font-body max-w-[68ch]"`. Remove `text-xs md:text-sm` and `tracking-wider`. `heading_1/2/3` map to `--text-display/h2/h3` with the line-heights above |
| `src/styles/index.ts` | `H2Heading`, `H3Heading`, `H4Heading` and `Text` move to the tokens. **Delete the media-query size overrides** (the fluid `clamp` handles it). Fix `line-height: 35px` with 38px text. In `Button p`, remove the `13px` override and use `1rem` |
| `src/app/globals.css` | Add the `@theme` tokens from §4.1 and §4.2, set `--color-neutral-gray: #4d4d4d` (or rename to `--color-text-body`), remove the dead font imports and the unused create-next-app variables (`--primary-glow` and friends) |
| `src/components/heros/HomeHero.tsx` | Bio paragraphs use `--text-lead`, `text-align: left` |
| `src/components/CodeBlock/index.tsx` | Switch the theme to `a11yLight` or adjust token colours, `font-size: var(--text-code)`, `tabIndex={0}` and `aria-label` on `pre` |
| `src/components/heros/ArticleListHero.tsx` | Add `aria-label="Search articles"` (or a visible label), input `font-size ≥ 16px`, placeholder colour ≥ 4.5:1 |
| `app/blog/[...slug]/BlogPageWrapper.tsx` / `RichTextComponent.tsx` | Title becomes `<h1>`, body `--text-article`, max-width 68ch, body images get `alt` |
| Pills / CTAs | Padding so the tap target is at least 24px (ideally 44px) tall |

### 4.5 Before → after (key roles)

| Role | Mobile now | Mobile proposed | Desktop now | Desktop proposed |
|---|---|---|---|---|
| Body / quotes / summaries | **12px**, lh 1.33, #666, +0.05em | **16px**, lh 1.6, #4D4D4D, 0 | 16px, lh 1.5, #666, +0.05em | 17px, lh 1.6, #4D4D4D |
| Article body | **12px** | 17px | 16px @ 158 cpl | 19px @ ≤ 68ch |
| Section intro | 14px | 18px | 20px | 20px, ≤ 68ch |
| Buttons | **13px** | 16px | 16px | 16px |
| H2 | 24px / lh 1.46 | 28px / 1.15 | 38px / **0.92** | 40px / 1.15 |
| H1 | 36px / 1.1 | 40px / 1.05 | 60px / 1.0 | 72px / 1.05 |
| Dates / roles | 14px | 14px | 14–18px (mixed) | 15px |

---

## 5. Suggested order

1. **Fix font loading** (§4.3). This alone changes how every paragraph looks.
2. **Body tokens:** 16px minimum, no tracking, line-height 1.6, #4D4D4D. This fixes both contrast failures and most of the "too small" complaint.
3. **Measure and justification:** `max-width: 68ch`, `text-align: left`.
4. **One scale:** replace the styled-components sizes with tokens, `rem` only. This fixes the 1.4.4 hierarchy break.
5. **Structural a11y:** `h1` on Blog and Article, search label, `alt` text, arrow `aria-label`s, carousel clones, `<main>`, tap-target padding, code theme.
6. **Mirror the tokens in Figma:** replace the current text styles on the "Live site" page with the new scale, so design and code stay in sync.

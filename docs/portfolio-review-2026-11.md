# Portfolio review: nwani.netlify.app (Nov 2026)

Scope: every page type on the live Netlify deploy (home, `/blog`, 4 category pages, internal articles, external-article stubs, 404), all 54 URLs in the sitemap, the Next.js source in `apps/frontend`, and a comparison against 10 well-known engineer portfolios.

Method: raw HTML fetched as Googlebot, client render checked in a real browser at 1440px and 375px, console and network inspected, and code read to confirm root causes.

> Caveats: PageSpeed Insights' API quota was exhausted and a local Lighthouse run wasn't permitted in this session, so the performance figures below come from bundle and asset measurements, not Lighthouse scores. X required a login to view the quotes on the referenced tweet, so the benchmark uses well-known portfolios instead (list at the end).

---

## 0. Fix first (security and showstoppers)

| # | Issue | Evidence | Fix |
|---|---|---|---|
| 0.1 | **Sanity API token ships in public JavaScript.** | `NEXT_PUBLIC_SANITY_TOKEN` is read in `src/config/envApi.ts` and passed to the client in `src/utils/Sanity.ts`. A token starting `skfHpRkP…` is in `/_next/static/chunks/app/layout-*.js` and `app/page-*.js`. Anyone can extract it. | **Rotate the token today.** Rename it to a server-only var (`SANITY_TOKEN`, no `NEXT_PUBLIC_`). The dataset is public-read content, so client fetches need no token: use `useCdn: true` and no token. |
| 0.2 | **`/api/assistant` is an open OpenAI proxy.** | `app/api/assistant/route.ts` is live (GET returns 405; malformed POST returns 500 after the key check passes). It forwards any `body.conversation` to `gpt-4o-mini`, including caller-supplied `system` messages, with no auth, origin check or rate limit. The ChatBot UI that used it is commented out. | Delete the route while the chatbot is disabled. If you bring it back: add a rate limit, an origin check, a max conversation length, and allow only `user`/`assistant` roles. Return real HTTP status codes (it currently returns HTTP 200 with `status: 500` in the body). |
| 0.3 | **Your projects are hidden from every visitor.** | `ProjectsSummary.tsx` returns `null` when the PostHog flag `home-engineering-projects` is off in production. The server HTML includes "Life As An Indie Hacker" (Currency Predictor and Figma Tickets Plugin), but the browser removes it after load. So Google sees it and humans don't. | Remove the flag gate, or decide flags on the server. This is your strongest recruiter content. |
| 0.4 | **Work experience is fetched but never rendered.** | `HOME_QUERY` pulls `experiences[] { role, name, start_date, end_date, summary, description, thumbnail, url }`. `JobSummary.tsx` accepts `experiences` and never uses it. The "Software Engineer" section shows only one generic paragraph and testimonials. | Render an experience timeline (see §1). The data model already exists. |
| 0.5 | **React hydration fails on every page.** | Console shows Minified React errors #425 (text mismatch) and #422 (root fell back to client rendering) on `/`, `/blog`, and articles. Likely causes: the PostHog flag check during render (0.3), and the Typewriter h1. | Move flag and random logic into `useEffect`, or render it on the server. When hydration fails, React throws away the server HTML and re-renders, which adds to the blank-screen time (§3). |
| 0.6 | **The whole site is invisible until JS runs and an animation finishes.** | `app/layout.tsx` wraps everything in `LazyLoader`, which is an `m.div` with `initial={{opacity:0,y:30}}`, `whileInView`, and `delay 0.3s / duration 1s`. In testing, pages stayed white for several seconds (exaggerated by a background tab, but the mechanism is real). | Remove the page-level fade. Animate individual sections if you want motion, never the LCP element. Also respect `prefers-reduced-motion`. |
| 0.7 | **The homepage is ~300 days stale.** | The `age: 25988474` response header means the static HTML dates from about Jan 2026. Nothing sets `revalidate`, so Sanity edits never appear without a rebuild. | Add `export const revalidate = 3600` (or on-demand revalidation via a Sanity webhook). |

---

## 1. Recruiter and engineering-manager lens

**The 10-second test:** a recruiter lands on the site and needs to know who you are, what level you are, what you've shipped, where you've worked, and how to reach you. Today the page answers only the first question.

### What's above the fold today
- A green banner promoting university lab notes. Its "Read" link points at `victory-nwani.dev`, which is down, so the link is broken.
- A rotating multilingual greeting with your name.
- Two justified paragraphs: "5+ years… React, React Native, Node, TS, AWS… insurance, e-commerce, MedTech… technical writer… FOSS".
- A grayscale headshot. It has `cursor:pointer` on hover but isn't clickable, and it didn't render on mobile (0×0) in testing.
- **No CTA.** There's no contact button, no GitHub, no LinkedIn and no email.

### Missing information that hiring teams look for

| Missing | Why it matters | Suggestion |
|---|---|---|
| **Experience timeline** (company, title, dates, location, 2–3 impact bullets, stack tags) | It's the first thing a recruiter scans for, and an EM uses it to judge level and growth. | Render `experiences`. Follow Brittany Chiang's pattern: dates on the left, role and company with link, impact bullets with numbers ("cut checkout TTI 40%", "owned the FE for 1.2M MAU app"), and tech chips. |
| **Current role and status** ("Currently Senior FE at X" / "Open to roles", location, time zone, work authorization if relevant) | Recruiters filter on these first. | Add one line under the h1. |
| **Contact and socials** | There's **no email, LinkedIn, GitHub or X link anywhere** on the site. The footer only repeats the nav. | Add a Contact CTA in the hero and footer: `mailto:`, LinkedIn, GitHub, X/Bluesky. |
| **Case studies** (problem, constraints, approach, trade-offs, outcome) | EMs hire on judgment. The projects section has descriptions and tech lists but no outcomes, and it's hidden anyway (0.3). | Turn 2–3 projects (work and personal) into short case-study pages with architecture diagrams, decisions and results. The Currency Predictor (EDA on AWS, SageMaker) and the Figma-to-ticket GenAI plugin are good candidates. |
| **Résumé** | It links to a Google Doc in `/edit` mode, which looks like a draft and is a third-party hop. | Host a PDF at `/resume.pdf` and add a `/resume` HTML page that is also indexable. |
| **"Written for" logo strip** | You have logos for Smashing Magazine, Strapi, egghead, Rancher, Webiny and ContentLab in `src/images/brands/`, plus a `CompaniesTickerList` component, both unused. These are strong social proof. | Add a "Writing published by" row: LogRocket, Okta, DigitalOcean, Smashing, Strapi, and so on. |
| **About / personal bio** | `PersonalBio` and `FeaturedTravelInsight` are commented out, yet the nav's **About** link targets the removed `#travel-insight` anchor, so it does nothing. | Write a short human About (what you care about, how you work). Fix or remove the link. |
| **GitHub / OSS evidence** | The hero claims FOSS work but only links to the OpenCollective org. | Link specific PRs or repos, or pin your GitHub. |
| **Freshness signals** | The latest article is Dec 2024, the most recent talk listed is from 2022, and the copy says "over the past three years". It reads as dormant. | Add a "Now" line or section (Paco, swyx), date the talks, and drop relative time phrases. |

### Positioning and copy
- **Identity is split** between Software Engineer, Technical Writer, Digital Media Engineering student (the banner) and travel blogger. Pick a primary headline, for example "Frontend / Full-stack engineer (React, Node, AWS) who also writes for LogRocket, Okta, and Smashing". Make writing the differentiator and put the coursework under the blog.
- **"Life As A …" headings are cute but vague.** Recruiters scan for "Experience", "Projects", "Writing", "Talks", "Contact". Keep the playful subtitles if you like, but use the standard words as headings.
- The "Software Engineer" paragraph ("updating React components… debugging a failing E2E test suite") **undersells you**. It describes tasks, not impact or ownership. James Kelly's testimonial ("had ownership over our entire front end") says more than your own copy does, so lead with that kind of claim.
- **Testimonials are a real strength.** Keep them, but cap them at around 3 visible, and add a photo for Natalia and Megan (their images are 0×0 / missing until lazy-load).
- **Typos:** "comsumption" (home), "Sighseeing" and "Quidah" (Ouidah) in travel titles, "haaS" in a slug. The quote says "Ambainic" (Ambianic). It's a quote, but you could fix it with the author's OK.

---

## 2. SEO

### Page metadata (checked in the server HTML)

| Page | `<title>` | meta description | OG / Twitter | canonical | h1 |
|---|---|---|---|---|---|
| `/` | "Victory Nwani \| Home" | ❌ | ❌ | ❌ | Typewriter greeting + name (no role keyword) |
| `/blog` | "Victory Nwani \| **Home**" (wrong) | ❌ | ❌ | ❌ | ❌ none (only an h2 "Products Of A Technical Writer") |
| `/blog/category/*` | "Travel journals \| Victory Nwani" (built from the slug) | ❌ | ❌ | ❌ | ❌ |
| `/blog/<internal>` | article title, no brand suffix | only where `seo_summary` is set (1 of the 3 checked) | og:image yes | ❌ | ❌ the title is an h2; some bodies use h1 for "Introduction" |
| 404 | "Victory Nwani \| **Home**" | ❌ | ❌ | ❌ | ✔ (unstyled) |

**Fixes:**
- In `app/layout.tsx`, set `metadataBase`, `title: { default: "Victory Nwani — Software Engineer", template: "%s · Victory Nwani" }`, a real `description`, `openGraph` (with a 1200×630 OG image, generated via `opengraph-image.tsx`), `twitter`, and `alternates.canonical`.
- Give `/blog` and each category its own `generateMetadata` with a description (store one per category in Sanity).
- On articles, make the title the **h1**, demote body h1s to h2, and add `article:published_time`.
- Add **JSON-LD**: a `Person` on home (name, jobTitle, sameAs: LinkedIn/GitHub/X, worksFor), and `BlogPosting` plus `BreadcrumbList` on articles. Lee Robinson, swyx, Maggie Appleton and Cassidy Williams all ship it.
- Add an **RSS feed** at `/feed.xml`. Josh Comeau, swyx, Paco and Maggie Appleton all have one, and it matters for a writer.

### Sitemap and robots
- **Every URL points at `victory-nwani.dev`, which is down.** `NEXT_PUBLIC_DOMAIN` is baked in at build time. Until the domain is back, Google is being told to crawl a dead host, and the Netlify host has no canonical. That's a duplicate-content risk once both resolve. Decide on one canonical host and 301 the other to it.
- **The test article is indexed:** `/blog/testing-internal-article-for-blog` is lorem ipsum, live, and in the sitemap. Unpublish it.
- **Duplicate entries:** `visual-jockey-effects-making-creative-music-videos` and `django-setup-tutorial` each appear twice.
- **Unsafe slugs:** `…google’s-dialogflow` (curly quote), `…aws:-deploying…` (colon), `…next.js-&amp;-buttercms` (double-escaped: the code replaces `&` with `&amp;` and then Next escapes it again), `…github-actions.` (trailing dot), and `/-integrating-graphql…` (leading dash). Slugify on publish in Sanity.
- **Soft 404s:** 4 of those URLs return **HTTP 200** with `noindex` and a body of just "Loading…". The root `<Suspense fallback="Loading...">` in `layout.tsx` commits a 200 before `notFound()` runs. Remove the global Suspense, and fix the slugs.
- **External-article stub pages are in the sitemap.** Pages like `/blog/getting-started-with-webpack` show only a two-sentence summary, **no link to the real article**, and an empty "Want To Read More?". That's thin, duplicate content competing with Smashing, Okta and others. Either drop them from the sitemap and `noindex` them (and link cards straight out), or add `rel=canonical` to the original plus a prominent "Read on Smashing Magazine →" button.
- `priority: 1` on every URL and the home `lastModified = build time` make both signals meaningless. Drop `priority`, and use `_updatedAt` for `lastModified`.
- In `robots.txt`, the `Host:` directive is Yandex-only. Remove it and point `Sitemap:` at the live host.

### Content quality signals
- **Wrong dates:** many external articles show **"May 29, 2023"**, which is the CMS import date. The Okta EKS article (URL `/2021/11/02/`) shows "March 19, 2023", and Webpack shows "May 29, 2023". Store the original publication date.
- **"Latest Published Articles" isn't sorted:** it goes Dec 2024, Apr 2024, Mar 2023, May 2023.
- **Travel Journals summaries are lorem ipsum** ("Contrary to popular belief, Lorem Ipsum…") on the category page.
- **The blog listing has duplicates:** "Build modern ecommerce with Svelte and Medusa" appears twice in Frontend.
- External cards on `/blog` are `<a>` elements **without `href`**, so crawlers don't see the outbound links (see §4 for the accessibility side).

---

## 3. Performance

| Finding | Detail | Fix |
|---|---|---|
| **3.3 MB favicon** | `/favicon.ico` is 3,340,158 bytes and served `max-age=0, must-revalidate`. Every first visit downloads it. | Use a 32×32 `.ico` plus `icon.svg` and `apple-icon.png` via the app router file conventions. Target under 15 KB. |
| **943 KB (288 KB compressed) highlight.js chunk on every page** | `react-syntax-highlighter` with all languages is pulled in through `RichTextComponent → CodeBlock`, which the homepage imports for the banner text. | Use `PrismLight` with only the languages you need, `next/dynamic` the CodeBlock, or highlight on the server (Shiki at build time). |
| **~2.2 MB of JS parsed (~700 KB compressed) across 25 chunks on home** | Redux **and** Zustand, styled-components **and** Tailwind, framer-motion, react-slick, Typewriter, media-chrome, react-player, PostHog, Sentry, GA. | Pick one state library (Zustand) and one styling system. Lazy-load the carousel and player below the fold. |
| **Four analytics/monitoring scripts** | GA (gtag), PostHog (initialized **twice**: at module level in `providers/PostHog.tsx` and again in `useEffect`; the provider is also nested twice in `layout.tsx`), and Sentry. | Keep PostHog *or* GA. Initialize once. |
| **Oversized and undersized images** | The logo is a 1117×1041 image shown at 49×47. The hero headshot is a 300×300 asset upscaled to 350×350, so it's blurry on retina. The LCP image has no `priority`/`fetchpriority`. | Request sized Cloudinary transforms (`w_96`, `w_700`), and add `priority` to the hero image. |
| **Page-level fade and hydration failure** | §0.5 and §0.6. | — |
| **App-shell scroll container** | `layout.tsx` wraps the app in a `height:100vh; overflow:auto` div (and `page.tsx` adds another `100vh`). The window never scrolls, which breaks back/forward scroll restoration, iOS tap-status-bar-to-top and mobile address-bar collapse, and it hurts INP. | Let the document scroll normally. |
| **Build config smells** | `typescript.ignoreBuildErrors: true`; the deprecated `next-optimized-images`; `sanity` (the full studio), `openai`, `pdfreader` and `react-helmet` in the frontend's dependencies; `@next/font@13` alongside `next/font`. | Clean up. Turn type errors back on. |

---

## 4. UX, UI and accessibility

### Navigation
- **Desktop has no visible primary nav.** At 1440px the header shows only the name and "View Resume". The About/Work/Articles/Engagements links render inside a hidden dropdown.
- **About** (header, mobile menu and footer) goes to `/#travel-insight`, which doesn't exist.
- There's **no "Projects" or "Contact" item.**
- The mobile menu **doesn't close** after you tap a link.
- The hamburger button has **no accessible name** ("menu" finds nothing in the accessibility tree), and there's no `aria-expanded`.
- **The breadcrumb is broken:** it builds `/${segment}` instead of the cumulative path (`headers/breadcrumb.tsx:24`). On an article, the last crumb links to `/getting-started-with-webpack`, which is a 404. On a category page, "category" links to `/category`.
- "View All" on `/blog` uses a relative `blog/category/...` href (no leading slash), which breaks if that component is ever rendered at a deeper path.
- After a section's link is clicked there's no scrollspy highlight on desktop, because there's no visible nav to highlight.

### Homepage
- Lots of empty space in the hero at desktop width. The headshot is small and pushed right, and there's no CTA to fill the space.
- **Justified text** on mobile creates visible gaps between words. Use `text-align: left`.
- **The grayscale-until-hover headshot** is a hover-only effect, so mobile users never see it. It also shows a pointer cursor but isn't a link.
- **The Typewriter h1** changes language every few seconds. It's charming, but the h1 screen readers and Google get is unstable. Move the greeting into a `<span aria-hidden>` above a static h1: "Victory Nwani — Software Engineer".
- **The engagement carousel** has only 3 items, cloned 3× by react-slick's infinite mode. That leaves 9 h3s and 9 "Watch Event Recording" buttons in the DOM. "Watch Event Recording" links to a CNCF event page, a Meetup *group* page and a podcast index, none of which are recordings. Use a simple 3-card grid and accurate labels ("Event page", "Listen").
- **The footer** has a nav only: no contact details, socials, copyright or RSS link.

### Blog
- The **search works** and is nice. Consider a ⌘K shortcut, as swyx does.
- **External article cards are `<a>` without `href`** (they open via a JS handler). They aren't keyboard-focusable, can't be middle-clicked or opened in a new tab, and aren't crawlable. Use real `href`s with `target="_blank" rel="noopener"`.
- Horizontal carousels per category hide most of the content behind arrow buttons. A filterable list or grid (Josh Comeau, Kent C. Dodds) is easier to scan.
- Articles have **no author box, no reading time, no "last updated" date, no share or copy-link, no table of contents** for long posts, and no next/previous links.

### 404
- It's an unstyled black sentence in the top-left corner, with no header, no link home and the wrong title. Reuse the site chrome and add links to Home, the blog and search.

### Hygiene
- Leftover `console.log`s: "KEY => engagements" and "KEY => technical-articles" in the browser, "cardsTabListRef" in `ArticleList.tsx:70`, and `console.log("params")` in the category page's `generateMetadata`.
- The `meta lang="sv"` in `nextHead.tsx` is an invalid tag with a Swedish language code (the component is unused with the app router, so delete it).
- **No dark mode.** Most of the benchmarks offer one, and it's cheap with CSS variables.

---

## 5. Benchmark comparison

Sites sampled: brittanychiang.com, leerob.com, joshwcomeau.com, kentcdodds.com, swyx.io, paco.me, cassidoo.co, maggieappleton.com, emilkowal.ski, rauno.me.

| Section / feature | Brittany Chiang | Lee Rob | Josh Comeau | Kent C. Dodds | swyx | Paco | Cassidy | **You** |
|---|---|---|---|---|---|---|---|---|
| Clear role headline in h1/hero | ✔ "Frontend Engineer" | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ "Software Engineer in Chicago" | ⚠ greeting animation |
| About / bio | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ❌ (commented out) |
| **Experience with dates and impact** | ✔ | – | – | – | – | – | – | ❌ (data exists, not rendered) |
| Projects / "What I'm building" | ✔ | ✔ | ✔ courses | ✔ | ✔ | ✔ | ✔ | ❌ (hidden by flag) |
| Writing, curated or popular | ✔ | ✔ | ✔ popular | ✔ | ✔ popular | ✔ | ✔ | ⚠ "latest" only, unsorted |
| Talks / appearances | – | – | – | ✔ | ✔ selected | – | – | ✔ (labels wrong) |
| "Now" / current focus | – | – | – | – | ✔ | ✔ | – | ❌ |
| Contact / socials | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ Connect | ✔ | ❌ |
| Résumé | ✔ PDF | – | – | – | – | – | – | ⚠ Google Doc in edit mode |
| Newsletter / RSS | – | – | ✔ | ✔ | ✔ | ✔ RSS | ✔ | ❌ |
| Meta description and OG image | ✔ | ✔ | ✔ | ✔ | ✔ | OG only | ✔ | ❌ (some articles only) |
| JSON-LD | – | ✔ | – | – | ✔ | – | ✔ | ❌ |
| Visible nav | ✔ sticky scrollspy | ✔ | ✔ | ✔ | ✔ + ⌘K | minimal | ✔ | ❌ desktop |
| Dark mode | ✔ (dark) | ✔ | ✔ | ✔ | ✔ | ✔ | – | ❌ |

**Patterns worth copying:**
- **Brittany Chiang:** single page with a sticky left column (name, role, one-line pitch, section nav with scrollspy, social icons) and a scrolling right column (About, Experience cards with dates/impact/tech chips, Projects with thumbnails, Writing). It's the closest model for what a recruiter needs.
- **swyx and Paco:** "What I'm building" and "Now" sections signal momentum.
- **Josh Comeau and Kent C. Dodds:** curated "Popular content" instead of chronological "latest", which is ideal for an older but strong catalog like yours (Smashing, Okta, LogRocket).
- **Cassidy Williams:** a dense socials row and a newsletter CTA right in the hero.

---

## 6. Suggested order of work

1. **Today:** rotate the Sanity token, delete `/api/assistant`, unpublish the test article.
2. **Quick wins (about a day):** remove the PostHog gate on Projects; remove the page-level fade and the global Suspense; fix the About/breadcrumb/banner links; replace the favicon; add root metadata, OG image and descriptions; make article titles h1; fix the sitemap host, dupes and slugs; add contact/socials to the hero and footer; host the résumé PDF; remove console logs.
3. **Content (a weekend):** experience timeline from the existing Sanity data; rewrite the hero headline and "Software Engineer" copy around impact; a "Written for" logo strip; correct article dates and sort "latest"; replace the lorem-ipsum summaries; date the talks and fix their link labels.
4. **Deeper:** 2–3 case-study pages; JSON-LD and RSS; drop highlight.js from non-article pages; consolidate state, styling and analytics; ISR/webhook revalidation; let the document scroll normally; dark mode; a real 404; a "Now" section.

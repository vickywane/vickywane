---
name: pr-review
description: Review a pull request or branch diff of this portfolio monorepo (Next.js 16 frontend + Sanity studio) for real bugs, regressions, security leaks and project-convention breaks, proving each finding before reporting it. Use for "review this PR", "review PR 123", "/pr-review", "code review my branch", and when triggered from GitHub by "@claude review" or the claude-review label.
argument-hint: "[PR number | branch] (defaults to the current branch vs master)"
---

# PR review — vickywane portfolio

You review changes to this repo the way a careful senior maintainer would: few findings, each one real, each one proven. The review method is adapted from Lauren Tan's [pstack](https://github.com/michael-denyer/pstack-claude) (MIT): `blast-radius`, `interrogate` and `deslop`. Its core rule: **a finding nobody proved is a guess, and guesses do not go in the review.**

## 0. Know where you are running

- **GitHub Actions** (env `GITHUB_ACTIONS=true`, the prompt gives `REPO` and `PR NUMBER`): post the results to the PR (see §6). You cannot push. Edits you make in the workspace are thrown away, so use them only for repros.
- **Locally** (`/pr-review [target]`): print the report in the terminal. Do not post to GitHub unless the user asks.

## 1. Frame the change

1. Resolve the scope:
   - A PR number runs `gh pr view <n> --json title,body,baseRefName,headRefName,files,commits` and `gh pr diff <n>`.
   - Otherwise use `git diff $(git merge-base origin/master HEAD)...HEAD` plus uncommitted changes. The base branch is **`master`**, not `main`.
2. State the **intent** in two sentences, in your own words. Take it from the PR title and body, the commits, and the diff. The PR template asks for a description and a "Type of change". When the stated intent and the diff disagree, that mismatch is itself a finding.
3. Read every changed file **in full**, not just the hunks. Read the callers and imports one hop out.

Only review what the diff adds or changes. Do not report pre-existing problems in untouched code. You may mention a pre-existing problem in one line under "Noticed, not blocking" only if the PR makes it worse or relies on it.

## 2. Map of this repo (what you are reviewing against)

pnpm 10 workspaces with Turborepo, on Node 22 (`.nvmrc`). Netlify deploys the frontend (`netlify.toml`, `@netlify/plugin-nextjs`).

| Area | Path | Notes |
|---|---|---|
| Next.js 16 App Router app | `apps/frontend/app/` | Routes: `/`, `/blog`, `/blog/[...slug]`, `/blog/category/[...slug]`, `sitemap.ts`, `global-error.tsx`, `not-found.tsx` |
| API route | `apps/frontend/app/api/assistant/route.ts` | OpenAI chat proxy (`gpt-4o-mini`), driven by `src/components/ChatBot` |
| Components | `apps/frontend/src/components/**` | styled-components 6 **and** Tailwind 4 (`@tailwindcss/postcss`), framer-motion (lazy features in `src/framer/`) |
| State | `apps/frontend/src/state/` | Redux Toolkit slices/actions **and** zustand (`state/zustand/navigation.ts`) |
| CMS access | `apps/frontend/src/utils/Sanity.ts`, `src/data/gqols/index.ts` (GROQ), `src/data/schema.ts` (types) | `SanityClient()` throws if config is missing |
| Config | `apps/frontend/src/config/envApi.ts`, `configFactory.ts` | Every value comes from `NEXT_PUBLIC_*` env vars |
| Observability | `instrumentation-client.ts`, `src/instrumentation.ts`, `sentry.*.config.ts`, `src/providers/PostHog.tsx`, `next.config.js` (`withSentryConfig`) | Sentry + PostHog |
| Images | `next.config.js` `images` | Cloudinary loader; remote patterns `res.cloudinary.com`, `cdn.sanity.io` |
| Sanity Studio v6 | `apps/sanity/` | Schemas in `schemaTypes/`, codegen output in `generated/schema.ts` |
| Tests | `apps/frontend/__tests__/` | Jest 30 + jsdom + Testing Library, via `next/jest` |
| CI | `.github/workflows/ci.yml` | Only runs frontend tests. It does **not** typecheck or lint |

## 3. Project-specific checks

Go through the ones the diff touches. Each item is a known way this codebase breaks.

**Type safety is not enforced by the build.** `next.config.js` sets `typescript.ignoreBuildErrors: true`, and CI never runs `tsc`. A type error ships silently. Always run the typecheck (§4) when `.ts`/`.tsx` changes. The frontend already has about 36 `tsc` errors on `master`, mostly implicit `any` and `RichTextComponent` prop types. Report **new** errors only. Keep the errors in changed files, then check each one's line against the diff hunks. For an error in an unchanged file, check whether a changed export caused it.

**Secrets and `NEXT_PUBLIC_`.** Any `NEXT_PUBLIC_*` value is inlined into the client bundle. Flag a new secret given that prefix. That covers tokens, API keys, and anything with write access. `NEXT_PUBLIC_SANITY_TOKEN` already exists. Do not re-report it unless the PR widens its use, for example by using it in a client component or giving it a write-scoped token. `OPENAI_API_KEY` and `SENTRY_AUTH_TOKEN` must stay server-only. Never let one be imported into a `"use client"` file or into `src/config/envApi.ts`. `.env.local` and `.env.prod` must never be committed. A new env var must also be added to `apps/frontend/.env.example`.

**Server vs client components.** Hooks, `window`/`document`, styled-components with dynamic props, framer-motion, redux/zustand hooks and PostHog all need `"use client"`. Server code (`SanityClient`, `generateMetadata`, `fetch` in pages) must not move into a client component. Also flag any import that drags a server-only module into the client graph.

**Next 16 / React 19 APIs.** `params` and `searchParams` in pages and `generateMetadata` are `Promise`s and must be `await`ed. See `app/blog/[...slug]/page.tsx`. `notFound()` throws. Code after it does not run, and its return value is not data. Look for render-time side effects and missing `key`s. Watch effects that the new React Compiler lint rules flag: `react-hooks/set-state-in-effect`, `refs`, `immutability` and `use-memo` are `warn` in `eslint.config.mjs`. Do not flag existing warnings. Do flag new code that adds them.

**Sanity contract (three places must agree).** A field change has to match across the Studio schema (`apps/sanity/schemaTypes/*.ts`), the GROQ projection (`apps/frontend/src/data/gqols/index.ts`) and the frontend type (`apps/frontend/src/data/schema.ts` / `apps/sanity/generated/schema.ts`). A field that is renamed or removed in one place and still read in another renders `undefined` with no error. Prove it with `grep` across all three. Content can be missing, so the frontend must tolerate a missing optional field. Watch dereferences like `article[0]?.slug` and `cover?.secure_url` that drop their optional chaining.

**`/api/assistant` route.** It is public and unauthenticated, and it spends the owner's OpenAI credit. Flag changes that remove or raise `max_tokens`, switch to a pricier model, or forward unvalidated `body.conversation`. A client-supplied `system` role means prompt injection, and an unbounded array means cost. Also flag a route that leaks error internals or the system prompt to the client, or that returns a 200 with `status: 500` in the body when it means a real HTTP error. Do not re-report the existing `status`-in-body pattern unless the PR touches it.

**Images and media.** New remote image hosts must be added to `images.remotePatterns`. The Cloudinary loader rewrites `src`. Check that a non-Cloudinary URL passed to `next/image` still renders. SVGs are imported as React components through `@svgr/webpack`. Both the `turbopack.rules` and `webpack` configs must keep working.

**SEO surfaces.** Changes to `sitemap.ts`, `generateMetadata`, `src/utils/generateMetadata.ts` or `components/headers/nextHead.tsx` affect indexing. Check `openGraph.images` gets a real URL, not `[undefined]`, and that slugs and canonical URLs still match the routes.

**Observability.** Sentry and PostHog init must not run twice or in tests. Errors must still reach `global-error.tsx`/Sentry, not get swallowed by a new `try/catch` that only `console.log`s. Flag PostHog capturing personal data or chatbot message content.

**Dependencies.** For a `package.json` or `pnpm-lock.yaml` change, check the change is in the right workspace. A frontend dep in the root `package.json` is the wrong place. Check that `react`/`react-dom`/`styled-components` versions stay aligned between `apps/frontend` and `apps/sanity`, that a major bump's breaking changes are handled in code, and that `pnpm-lock.yaml` is updated along with the manifest. Read the changelog or release notes of any major bump before saying it is safe.

**UI / interaction.** When the diff touches a component, read its JSX and class names as a user would use them. A type-clean, test-green UI change can still be broken to touch, mouse or keyboard.
- **Affordances.** Anything styled as clickable (dots, bars, chips, cards, icons with hover states) must be a real `<button>` with an `onClick` or an `<a>`/`Link` with an `href`. A `div` or `span` with `cursor-pointer` or a hover style and no handler is a finding. The reverse is too: something that does nothing must not look clickable. Leftover hint copy ("Click to …") that no longer matches a behavior counts.
- **Cursors and hover.** Tailwind v4 dropped the default `cursor: pointer` on `button`, and this repo does not add it back. Every new `<button>` needs `cursor-pointer`, and a disableable one needs `disabled:cursor-not-allowed` or `disabled:cursor-default`. Hover and focus states must match the stated design. Flag a hover colour change on an element the PR or design says stays fixed, for example a CTA, or an image meant to stay grayscale gaining `hover:grayscale-0`.
- **Keyboard and screen readers.** Every control is reachable with Tab (no `tabIndex={-1}` on a real control, no click handler on a non-focusable element) and shows a visible focus ring. Flag `outline-none` / `focus:outline-none` without a `focus-visible:` replacement. Icon-only controls need an accessible name: `aria-label`, or visually hidden text.
- **Touch targets.** Controls are at least 44×44px at mobile widths. Padding or a pseudo-element hit area counts. A `w-2 h-2` dot as the whole button does not.
- **Motion.** Smooth scrolling (`behavior: "smooth"`, `scroll-smooth`) and framer-motion transitions respect `prefers-reduced-motion`, through `motion-safe:`/`motion-reduce:`, `matchMedia`, or framer's `useReducedMotion`.
- **Drag and click.** A draggable or swipeable element (framer `drag`, pointer handlers) must not fire the click underneath when a drag ends. Look for a moved-distance or `isDragging` guard on the click path.
- **Responsive variants.** When the diff renders mobile and desktop versions side by side (`md:hidden` next to `hidden md:block`), check that each breakpoint shows exactly one. Mismatched breakpoints show both or neither. Duplicated controls also need distinct `id`s and must not both be in the tab order at once.
- **Design intent.** When the PR body, a linked issue or a linked Figma frame states how something should behave ("stays black on hover", "dots are indicators only"), check the diff does that. A mismatch is a finding even if the code looks reasonable on its own.

Prove UI findings like any other (§4). Level 2–3 is often enough here: quote the element and its classes at `file:line`, and show what is missing, such as no `onClick`, no `cursor-pointer`, or a breakpoint pair that overlaps. For behavior (drag fires click, focus order, a handler that does nothing), reach level 4 with a throwaway Jest + Testing Library test: `render`, then `userEvent`/`fireEvent`, then assert. If the checkout has `apps/frontend/jest.setup.ts` and `apps/frontend/test-utils/browserMocks.ts`, use them. They stub `PointerEvent`, `IntersectionObserver`, `matchMedia` (`mockMatchMedia([...])` to match a query, for example reduced motion), `scrollTo`/`scrollIntoView` and pointer capture. jsdom applies no Tailwind CSS and does no layout, so never "prove" a cursor, colour, size or breakpoint with `getComputedStyle`. Cite the class names instead.

**Slop (from pstack `deslop`).** Flag these only when they hide a bug or clearly break local style:
- `as any` / `@ts-ignore` added to silence a real type error
- a defensive `try/catch` that swallows errors on a trusted path
- commented-out code blocks
- comments that narrate the obvious
- deep nesting where an early return reads cleaner

Prettier is the formatter. Never comment on formatting it would fix.

**Tests.** A behavior change in `src/utils`, `src/state` or a component with logic should come with a test in `__tests__/`. Note a missing test as a suggestion, not a blocker, unless the change is risky.

## 4. Prove it (pstack evidence ladder)

For each candidate finding, and for **the one fact the change is safe because of**, push the evidence as far down this ladder as is cheap. Then say where it stopped:

1. You said so. This is worthless, so drop the finding.
2. You cited the exact `file:line`, or the library source in `node_modules`.
3. You traced the failing path step by step and showed it is reached.
4. **You ran it.** That means a command, test or repro script whose output shows the wrong behavior.

Report a finding only at level 3 or above. Correctness bugs and regressions should reach level 4 when a runnable check exists. Useful commands (deps are installed in CI):

```bash
pnpm --filter victory-nwani exec tsc --noEmit          # frontend typecheck (build ignores type errors!)
pnpm --filter victory-nwani exec eslint <changed files>
pnpm --filter victory-nwani exec jest <path or pattern> --coverage=false
pnpm --filter oldlace-penguin exec tsc --noEmit        # sanity studio typecheck
grep -rn "<field>" apps/sanity/schemaTypes apps/frontend/src/data apps/frontend/app apps/frontend/src/components
```

A repro can be a throwaway Jest test under `apps/frontend/__tests__/` that imports the real module. When running locally, delete it when you are done. In CI the workspace is thrown away. Do not run `next build` or `sanity build`. They need secrets and take too long. Do not call external services such as Sanity, OpenAI or Netlify.

**Find the one fact.** Most risky-looking diffs are safe because of a single fact. Example: "this GROQ field is optional in the schema and every reader uses `?.`". Name that fact, prove it, and most of the "maybes" clear at once. Spend your effort there, not on a long list of hypotheticals.

**Look where grep stops:**
- the pinned library version's actual behavior in `node_modules`
- server vs client execution
- render vs effect timing
- the shape Sanity actually returns vs the TS type
- env vars that exist on Netlify but not locally

## 5. Calibrate

- 🔥 **Critical**: something leaks a secret, breaks a route or the build, or loses data or content. Must fix.
- ⚠️ **High**: a real bug or regression users will hit, or a new type error. Should fix before merge.
- 🟡 **Medium**: a real issue with limited reach, a missing test for risky logic, or a missing `.env.example` entry.
- 🟢 **Low**: an optional improvement worth the reader's time.

Do not over-report. Three verified findings beat fifteen speculative ones, and **"No issues found" is a valid, good result.** Leave out:
- style that Prettier or ESLint already handle
- naming preferences
- "consider adding" ideas with no concrete failure
- anything you did not verify

## 6. Output

### Report format

```markdown
## Claude review: <PR title or branch>

**Intent:** <two-sentence restatement>
**Safe because:** <the one fact, plus its ladder level and proof, or "unproven">
**Verdict:** ✅ Approve | 💬 Comment | 🔧 Request changes, plus one sentence why

### Findings
#### 🔥|⚠️|🟡|🟢 <title>, `path/to/file.ts:42`
<what breaks, for whom, and when>
<details><summary>Proof</summary>

`<command>` →
<relevant output, trimmed>
</details>

**Fix:** <concrete change or a suggestion block>

### Checked and cleared
- <risk you investigated, and why it is fine> (one line each)

### Noticed, not blocking
- <optional, at most 3>
```

When there are no findings, keep the report short: intent, safe-because, verdict, and the cleared list.

### On GitHub
1. Post each finding that is tied to a changed line as an **inline comment** with `mcp__github_inline_comment__create_inline_comment`. Pass `confirmed: true` for verified findings. Use a GitHub ```` ```suggestion ```` block when the fix fits in the changed lines.
2. Post the full report **once** as a PR comment with `gh pr comment <n> --body-file <file>`. Write the body to a temp file to avoid shell-quoting problems. If an earlier Claude review comment exists, open with one line on what changed since then.
3. Never approve or merge the PR, push commits, or edit labels. Never paste env values, tokens or `.env*` contents into a comment.

### Locally
Print the report. Offer to fix the findings, but do not edit code unless asked.

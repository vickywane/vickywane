# Agent instructions

Instructions for AI coding agents (Claude Code, Copilot, Cursor and others) working in this repo. `CLAUDE.md` imports this file.

## Design: Figma is the source of truth

All visual design lives in the **[Portfolio Figma file](https://www.figma.com/design/BKeWGnCzhpo2q3os5yTh9y/Portfolio)**. Implement from the design that's already there. Write changes back to Figma **once per PR**, not after every edit, so the file never drifts from what ships.

| Figma page | What it is |
|---|---|
| **Live Site (Home)**, **Live Site (Blog)**, **Live Site (Article)** | What is in production now, per breakpoint. These must match the code on `master`. |
| **Components & assets** | Shared components (header, footer, banners, cards…) with variants per device. Each component's description covers its behaviour and its code path. Explorations boards also live here. |
| **Home redesign — section variants**, **Proposed — …** | Explorations and proposals. Not shipped, so don't implement them unless asked. |
| **Archive — …** | History. Don't edit it. |

### Before changing any UI

1. **Find the design first.** Locate the frame or component in Figma for the screen you're touching. Implement from it (use the `figma-design-to-code` skill / `get_design_context`), and don't invent layout, spacing, colour, type or copy treatment in code.
2. **Use the file's tokens.** Colours come from the `color/*` variables (they map to the `@theme` colours in `apps/frontend/src/styles/globals.css`). Fonts are Space Grotesk (display), Roboto Flex (body) and Roboto Mono (labels/code). Don't hardcode values that a token covers.

### While iterating: don't write to Figma

Writing to Figma costs a lot of tokens. Don't do it for each tweak, fix or round of feedback. The owner's requests in chat are the spec while a change is in progress.

- Make the change in code and keep a running list of what Figma will need: frames, components, descriptions.
- **Exception: open design questions.** If the owner asks to explore or compare options, or the right look is unclear, put a few variants side by side on an explorations board in *Components & assets* and let the owner pick. Only build a board when it's needed to make that decision.

### Once per PR: sync Figma

Every PR that changes what users see must leave Figma matching the code, in one pass, before the PR is opened or marked ready.

- **Update** the *Live Site* frames and the components they use. Instances should pick up component changes, so clear stale overrides. If an explorations board led to the change, promote the chosen variant and mark the board as decided.
- **Behaviour Figma can't draw** (motion, drag physics, hover/press, what a link opens) goes in the component's description, next to the visuals.
- **If code had to deviate** from the design (a technical limit, accessibility, real content that doesn't fit), make Figma match what ships and say why in the PR. Never leave Figma showing something the site doesn't do.
- **Link the Figma nodes** you implemented or updated in the PR description. Review (`.claude/skills/pr-review/SKILL.md`) flags a visual change with no link, or a Figma design or description that has drifted from the diff.

When unsure whether something counts as a visual change, treat it as one.

## Repo basics

- pnpm 10 + Turborepo, Node 22 (`.nvmrc`). The base branch is `master`.
- Frontend: `apps/frontend` (Next.js 16 App Router, Tailwind 4 + styled-components, framer-motion). Tests: `pnpm --dir apps/frontend exec jest`.
- CMS: `apps/sanity` (Sanity Studio v6). A field change must agree across the schema, the GROQ query (`apps/frontend/src/data/gqols`) and the types (`apps/frontend/src/data/schema.ts`).
- The build does not typecheck (`ignoreBuildErrors`), so run `tsc --noEmit` yourself and don't add new errors.
- Reviews follow `.claude/skills/pr-review/SKILL.md`.

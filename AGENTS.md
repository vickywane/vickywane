# Agent instructions

Instructions for AI coding agents (Claude Code, Copilot, Cursor and others) working in this repo. `CLAUDE.md` imports this file.

## Design: Figma is the source of truth

All visual design lives in the **[Portfolio Figma file](https://www.figma.com/design/BKeWGnCzhpo2q3os5yTh9y/Portfolio)**. The flow is always **design → code**, never code → design.

| Figma page | What it is |
|---|---|
| **Live Site (Home)**, **Live Site (Blog)**, **Live Site (Article)** | What is in production now, per breakpoint. These must match the code on `master`. |
| **Components & assets** | Shared components (header, footer, banners, cards…) with variants per device. Each component's description covers its behaviour and its code path. Explorations boards also live here. |
| **Home redesign — section variants**, **Proposed — …** | Explorations and proposals. Not shipped, so don't implement them unless asked. |
| **Archive — …** | History. Don't edit it. |

### Before changing any UI

1. **Find the design first.** Locate the frame or component in Figma for the screen you're touching. Implement from it (use the `figma-design-to-code` skill / `get_design_context`), and don't invent layout, spacing, colour, type or copy treatment in code.
2. **No design yet, or the request changes the visuals?** Change Figma first. For open questions, put a few variants side by side on an explorations board in *Components & assets* and let the owner pick one. Then promote the chosen variant into the component (or the Live Site frame), and only then write the code.
3. **Use the file's tokens.** Colours come from the `color/*` variables (they map to the `@theme` colours in `apps/frontend/src/styles/globals.css`). Fonts are Space Grotesk (display), Roboto Flex (body) and Roboto Mono (labels/code). Don't hardcode values that a token covers.
4. **Behaviour Figma can't draw** (motion, drag physics, hover/press, what a link opens) goes in the component's description in Figma, next to the visuals.

### Before a UI change is done

- **Figma and code agree.** If the shipped UI changed, the *Live Site* frames and the components they use are updated in the same piece of work. Instances should pick up component changes, so clear stale overrides.
- **If code had to deviate** from the design (a technical limit, accessibility, real content that doesn't fit), update Figma to match what ships and say why in the PR. Never leave Figma showing something the site doesn't do.
- **Link the Figma nodes** you implemented or updated in the PR description.

When unsure whether something counts as a visual change, treat it as one.

## Repo basics

- pnpm 10 + Turborepo, Node 22 (`.nvmrc`). The base branch is `master`.
- Frontend: `apps/frontend` (Next.js 16 App Router, Tailwind 4 + styled-components, framer-motion). Tests: `pnpm --dir apps/frontend exec jest`.
- CMS: `apps/sanity` (Sanity Studio v6). A field change must agree across the schema, the GROQ query (`apps/frontend/src/data/gqols`) and the types (`apps/frontend/src/data/schema.ts`).
- The build does not typecheck (`ignoreBuildErrors`), so run `tsc --noEmit` yourself and don't add new errors.
- Reviews follow `.claude/skills/pr-review/SKILL.md`.

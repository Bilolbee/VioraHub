# CTRLLAB Agent Rules

## Project Context
- Stack: Next.js App Router, React, TypeScript, Tailwind CSS, Prisma (SQLite).
- UI code lives in `app/` and `components/`.
- Design tokens and utility classes are centralized in `app/globals.css`.
- Path alias: `@/*` (configured in `tsconfig.json`).

## Component Architecture
- Reusable UI blocks belong in `components/`.
- Route-level composition belongs in `app/<route>/page.tsx`.
- Prefer composition through existing primitives: `SectionTitle`, `CtaBlock`, `Reveal`, `BrandLogo`, and conversion blocks.
- Keep content-driven sections compatible with `SiteContent` from `lib/cms-types.ts`.

## Styling Rules
- Use Tailwind utility classes + global semantic classes from `app/globals.css`:
  - `premium-panel`, `premium-panel-soft`, `section-shell`
  - `btn-primary`, `btn-secondary`, `badge-pill`, `stat-pill`
- Do not hardcode random visual values when an existing semantic class already exists.
- Follow current theme direction: premium clean-light, high contrast, subtle blue accent.
- Preserve responsive behavior across 360px, 768px, 1280px widths.

## Content and CMS Rules
- Public pages must consume content from `getPublishedContent()` (`lib/cms-store.ts`).
- Any new editable block must be represented in:
  1. `lib/cms-types.ts`
  2. `lib/cms-defaults.ts`
  3. `lib/cms-store.ts` schema/normalization
  4. `app/admin/page.tsx` editing UI
- Keep schema changes backward compatible and safe for existing snapshots.

## Figma MCP Integration Rules

### Required flow
1. Use `get_design_context` first for the target nodes.
2. Use `get_screenshot` for visual parity checks.
3. Adapt generated output to this codebase conventions (do not paste blindly).
4. Reuse existing components from `components/` whenever possible.
5. Map spacing, typography, and colors to current token system in `app/globals.css` and Tailwind config.

### Implementation constraints
- Treat Figma output as reference, not final code style.
- Preserve App Router patterns and server/client boundaries.
- Prefer existing utility classes before adding new CSS.
- New assets go into `public/`.
- Do not add placeholder icons/assets if real assets are provided from Figma capture.

## Quality Gates
- Run `npm run lint` after implementation.
- Verify navigation and CTA flows across all public pages.
- Ensure admin content save/publish flow still works after schema changes.

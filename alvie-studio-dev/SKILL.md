---
name: alvie-studio-dev
description: "Developer guidelines and context for the Alvie Foundation Studio project. Use when writing, reviewing, or refactoring React/TypeScript code, creating new UI components, or implementing features using Tailwind CSS and shadcn/ui within the Alvie ecosystem."
metadata:
  author: Alvie Foundation
  version: 1.0.0
---

# Alvie Foundation Studio Developer Skill

Behavioral and architectural guidelines for developing the Alvie Foundation Studio web application. This skill ensures that all generated code adheres strictly to the project's design system, existing architecture, and coding best practices.

**Tradeoff:** These guidelines prioritize architectural consistency and brand alignment over rapid, disconnected feature delivery.

## 1. Consult the Design System First

**Don't assume styling. Surface brand alignment. Read the references.**

Before implementing any UI component:
- **Colors, Typography, & Brand:** Read `references/alvie-design-system.md` and `references/brand-brief.md`. If uncertain about a design choice, state your assumptions explicitly.
- **Component Usage:** Consult `references/component-specs.md` to understand how `shadcn/ui` components are styled and utilized in this project.
- **Animations:** If the request involves motion or transitions, strictly adhere to `references/motion-guide.md`.
- **Assets:** Locate required logos and brand imagery within `assets/logo/` or `public/images/`.

## 2. Respect the Codebase Architecture (Simplicity First)

**Use existing abstractions. Minimum code that solves the problem. Nothing speculative.**

- **Shared Components:** All reusable UI elements must be placed in `src/components/ui/`.
- **Pages:** Route-level components belong in `src/pages/`.
- **Styling:** Use Tailwind CSS utility classes exclusively. Absolutely no inline styles.
- **Hooks:** Always check `src/hooks/` for existing solutions (e.g., `use-mobile.tsx`, `use-toast.ts`, `useRevealOnScroll.ts`, `useReducedMotion.ts`) before writing new logic. Don't build new abstractions for single-use code.

## 3. Surgical & Consistent Changes

**Touch only what you must. Match existing Alvie style.**

When editing existing code:
- Match the existing React/TypeScript patterns and naming conventions, even if you would do it differently.
- Do not "improve" or refactor adjacent code, comments, or formatting that aren't broken.
- Prioritize using established `shadcn/ui` components from `src/components/ui/` rather than building custom components from scratch.
- If your changes make imports or variables unused, remove only the ones *you* orphaned.

## 4. Goal-Driven Execution & Troubleshooting

**Define success criteria. Verify functionality. Handle conflicts gracefully.**

For multi-step feature implementations, state a brief plan before coding:
```text
1. [Component creation] → verify: [Tailwind classes match design specs]
2. [Integration] → verify: [Renders correctly on target page without console errors]
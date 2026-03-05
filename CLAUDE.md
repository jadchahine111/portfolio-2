# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start dev server (localhost:3000)
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — run ESLint (v9 flat config with next/core-web-vitals + typescript)

## Architecture

This is a Next.js 16 portfolio site using the App Router with React 19 and TypeScript in strict mode.

**Routing:** App Router (`app/` directory). Pages are `page.tsx`, layouts are `layout.tsx`. All components are Server Components by default.

**Styling:** Tailwind CSS v4 with PostCSS. Theming uses CSS variables (`--background`, `--foreground`) defined in `app/globals.css` with dark mode via `prefers-color-scheme`. Fonts are Geist Sans and Geist Mono loaded via `next/font/google`.

**Path alias:** `@/*` maps to the project root (e.g., `@/app/page`).

## UI Library

- **shadcn/ui ONLY** — no external UI libraries (no Material UI, Chakra, Ant Design, etc.)
- **framer-motion** for animations when needed
- Dark mode and light mode support required on all components

## Component Architecture (Atomic Design)

- `components/atoms/` — smallest UI primitives (buttons, inputs, badges, etc.)
- `components/molecules/` — combinations of atoms (search bars, cards, nav items)
- `components/organisms/` — complex sections composed of molecules (headers, footers, hero sections)
- `components/templates/` — page-level layouts that arrange organisms
- `components/ui/` — shadcn/ui base components (managed by shadcn CLI)
- UI must be visually consistent across all components and pages

## Conventions

- Props use `Readonly<>` wrapper (e.g., `Readonly<{ children: React.ReactNode }>`)
- Use `import type` for type-only imports
- Export default for page/layout components
- Use `next/image` for all images

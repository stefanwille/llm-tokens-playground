# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application demonstrating LLM tokenization using the `gpt-tokenizer` library. The app provides an interactive UI where users can input text and see how it's tokenized using the o200k_base encoding, visualizing the token-to-text mapping.

## Architecture

- **Next.js 15 App Router**: Uses the new App Router architecture with `src/app/` as the root
- **Client Components**: Main functionality in `HomeComponent.tsx` (src/app/HomeComponent.tsx:1) uses "use client" directive for interactivity
- **UI Components**: shadcn/ui components in `src/components/ui/` (Table, Input)
- **Tokenization**: `gpt-tokenizer` library with o200k_base encoding imported from `gpt-tokenizer/encoding/o200k_base`, initialized as a module-level singleton (src/app/HomeComponent.tsx:19)
- **Dark Mode**: Theme provider wraps the app, using Tailwind class-based strategy with localStorage persistence and system preference fallback

## Key Commands

Development:
```bash
pnpm dev          # Start dev server with Turbopack
pnpm build        # Production build with Turbopack
pnpm start        # Start production server
```

Code quality:
```bash
pnpm lint         # Run Biome linter/checker
pnpm format       # Format code with Biome
```

## Technology Stack

- Next.js 15.5.4 with React 19.1.0
- TypeScript 5
- Tailwind CSS 4
- Biome (linting/formatting)
- gpt-tokenizer for tokenization
- shadcn/ui components
- Turbopack bundler

## Code Structure

- `src/app/page.tsx` - Root page component (wrapper)
- `src/app/HomeComponent.tsx` - Main tokenization demo logic
- `src/app/layout.tsx` - Root layout with theme provider
- `src/components/theme-provider.tsx` - Theme context and management
- `src/components/theme-toggle.tsx` - Theme toggle button
- `src/components/ui/` - shadcn/ui components (table, input)
- `src/components/Code.tsx` - Custom code display component
- `src/lib/utils.ts` - Utility functions (cn helper)

## Dark Mode Implementation

- Context-based theme management (`src/components/theme-provider.tsx`)
- Tailwind class-based strategy using `dark:` utilities
- Theme persisted in localStorage with system preference fallback
- Uses `suppressHydrationWarning` on html element to prevent hydration mismatches
- Theme toggle component in header (`src/components/theme-toggle.tsx`)

## TypeScript Configuration

- Path alias `@/*` maps to `./src/*`
- Strict mode enabled
- Target: ES2017
- Module resolution: bundler (Next.js 13+)

## Testing

No test framework currently configured. Add vitest or jest if tests are needed.

## Biome Configuration

- 2-space indentation
- Imports auto-organized on save
- Next.js and React recommended rules enabled
- Ignores: node_modules, .next, dist, build

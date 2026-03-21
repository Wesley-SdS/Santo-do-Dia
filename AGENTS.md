# SantoDia — Instruções para Agentes IA

## Visão Geral
App PWA de Santos Católicos da Fraternidade São João Paulo II. Next.js 16, React 19, Tailwind 4, Prisma, PostgreSQL.

## Stack
- **Framework:** Next.js 16 (App Router, RSC, Server Actions)
- **UI:** Tailwind CSS 4.2, shadcn/ui, Radix UI, Framer Motion
- **DB:** PostgreSQL + Prisma ORM
- **Auth:** Lucia Auth (futuro)
- **IA:** Claude API (futuro)
- **Testes:** Vitest + Playwright
- **Lint:** Biome (não ESLint)

## Estrutura
```
src/
  app/          → Pages e layouts (Next.js App Router)
  features/     → Módulos de negócio (repository, service, types)
  components/   → UI components (ui/, layout/, saints/, common/)
  lib/          → Utilitários (db, logger, errors, utils)
  types/        → Types globais
  constants/    → Constantes da aplicação
```

## Convenções
- Código em inglês, UI/conteúdo em português
- Sem `any` — TypeScript strict
- Sem `console.log` — usar `logger` (Pino)
- Conventional Commits
- Feature modules: repository → service → controller
- Erros: usar classes de `@/lib/errors`

## Comandos
- `pnpm dev` — dev server
- `pnpm lint` — biome check
- `pnpm test` — vitest
- `pnpm db:migrate` — prisma migrate dev
- `pnpm db:seed` — seed saints

## Next.js 16 Specifics
- `params` and `searchParams` are Promises — must `await` them
- Use `"use client"` directive for interactive components
- Prefer Server Components by default
- Use `cacheComponents: true` for cache support

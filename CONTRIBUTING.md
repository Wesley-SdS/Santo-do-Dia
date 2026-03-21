# Contribuindo com o SantoDia

## Setup de Desenvolvimento

### Pré-requisitos

- Node.js 22+
- pnpm 10+
- Docker (para PostgreSQL e Redis)

### Instalação

1. Clone o repositório
2. Instale as dependências: `pnpm install`
3. Suba os serviços: `docker compose -f docker/docker-compose.yml up -d`
4. Configure o `.env`: `cp .env.example .env`
5. Rode as migrations: `pnpm db:migrate`
6. Popule o banco: `pnpm db:seed`
7. Inicie o dev server: `pnpm dev`

### Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `pnpm dev` | Inicia o servidor de desenvolvimento |
| `pnpm build` | Build de produção |
| `pnpm lint` | Linting com Biome |
| `pnpm test` | Testes unitários |
| `pnpm test:coverage` | Testes com cobertura |
| `pnpm test:e2e` | Testes E2E com Playwright |
| `pnpm db:migrate` | Executa migrations |
| `pnpm db:seed` | Popula o banco com santos |
| `pnpm db:studio` | Abre o Prisma Studio |

## Padrões de Código

- TypeScript strict mode — sem `any`
- Biome para linting e formatação
- Conventional Commits
- Arquivos < 200 linhas
- Funções < 20 linhas
- Testes para toda lógica nova

## Conventional Commits

```
feat(saints): add search by patronage
fix(pix): handle webhook timeout
refactor(donations): extract validation
test(devotion): add draw ceremony tests
```

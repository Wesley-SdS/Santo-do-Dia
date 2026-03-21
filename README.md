<p align="center">
  <img src="https://img.shields.io/badge/SantoDia-F5C542?style=for-the-badge&logo=cross&logoColor=1a1625" alt="SantoDia" />
</p>

<h1 align="center">SantoDia</h1>

<p align="center">
  <strong>Seu companheiro de fé, todos os dias.</strong>
</p>

<p align="center">
  O app definitivo de Santos Católicos — 100% gratuito, sustentado por doações via Pix.
  <br />
  Uma aplicação da <a href="https://www.fsjpii.com"><strong>Fraternidade São João Paulo II</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind-4.2-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Prisma-7-2D3748?style=flat-square&logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
</p>

<p align="center">
  <a href="#features">Features</a> ·
  <a href="#demo">Demo</a> ·
  <a href="#quick-start">Quick Start</a> ·
  <a href="#arquitetura">Arquitetura</a> ·
  <a href="#stack-tecnológica">Stack</a> ·
  <a href="#contribuindo">Contribuindo</a>
</p>

---

## Sobre

O **SantoDia** é uma aplicação web progressiva (PWA) focada na vida dos Santos Católicos, oferecendo uma experiência completa de fé, conhecimento e devoção diária. Desenvolvido pela **Fraternidade São João Paulo II (FSJPII)** — Instituto Religioso Clerical com o carisma *"Totus Tuus Iesu Per Mariam"* (Ser todo de Jesus por Maria).

> **Missão da FSJPII:** Santificar o Clero · Restaurar as Famílias · Salvar a Juventude

### Proposta de Valor

- **100% gratuito** — Sem planos pagos, sem anúncios, sem paywall
- **365 santos** — Um santo para cada dia do ano, com biografias completas em PT-BR
- **Jornada anual** — Sorteie seu santo padroeiro do ano com cerimônia animada
- **Design premium** — UI moderna com cores litúrgicas e tipografia sacra
- **Offline-first** — PWA que funciona sem internet
- **Enterprise-grade** — TypeScript strict, testes, CI/CD, logging estruturado

---

## Features

### Santo do Dia
Card principal com o santo celebrado no dia, incluindo biografia completa, oração, citações célebres, patronato e dados históricos. Navegação por data.

### Santo de Devoção do Ano
Cerimônia de sorteio com animação reverente (Framer Motion). Jornada de 365 dias com reflexões semanais, desafios mensais de virtudes, novena automática e diário espiritual.

### Calendário Litúrgico
Calendário mensal interativo com cores litúrgicas (roxo, verde, branco, vermelho, rosa), marcação de festas e solenidades, santos de cada dia com detalhes ao toque.

### Explorar Santos
Banco com 365+ santos pesquisáveis por nome, categoria (mártir, doutor, papa, fundador...), país de origem e século. Paginação e filtros combinados.

### Sistema de Doações via Pix
Integração nativa com API Pix (padrão BACEN). QR Code dinâmico, Pix copia-cola, confirmação via webhook, mural de apoiadores. Valores rápidos: R$5, R$10, R$25, R$50.

### Em Breve
- **Chat IA** — Conselheiro espiritual com Claude API + RAG
- **Áudio Diário** — Podcast de 3-5min do santo do dia via TTS
- **Modo Kids** — Histórias simplificadas com quiz interativo
- **Mapa dos Santos** — Mapa-múndi interativo
- **Gamificação** — Streaks, conquistas e ranking

---

## Quick Start

### Pré-requisitos

| Ferramenta | Versão |
|-----------|--------|
| [Node.js](https://nodejs.org) | 22+ |
| [pnpm](https://pnpm.io) | 10+ |
| [Docker](https://docker.com) | 24+ |

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/Wesley-SdS/Santo-do-Dia.git
cd Santo-do-Dia

# 2. Instale as dependências
pnpm install

# 3. Suba PostgreSQL e Redis
docker compose -f docker/docker-compose.yml up -d

# 4. Configure o ambiente
cp .env.example .env

# 5. Gere o Prisma Client e rode as migrations
pnpm db:generate
pnpm db:migrate

# 6. Popule o banco com 365 santos
pnpm db:seed

# 7. Inicie o servidor de desenvolvimento
pnpm dev
```

Acesse **http://localhost:3000**

### Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `pnpm dev` | Dev server com Turbopack |
| `pnpm build` | Build de produção |
| `pnpm start` | Servidor de produção |
| `pnpm lint` | Linting + formatting (Biome) |
| `pnpm lint:fix` | Auto-fix de lint |
| `pnpm typecheck` | Verificação de tipos TypeScript |
| `pnpm test` | Testes unitários (Vitest) |
| `pnpm test:watch` | Testes em modo watch |
| `pnpm test:coverage` | Testes com cobertura de código |
| `pnpm test:e2e` | Testes E2E (Playwright) |
| `pnpm db:generate` | Gerar Prisma Client |
| `pnpm db:migrate` | Executar migrations |
| `pnpm db:push` | Push schema ao banco |
| `pnpm db:seed` | Popular banco com 365 santos |
| `pnpm db:studio` | Abrir Prisma Studio |

---

## Arquitetura

```
┌─────────────────────────────────────────────────┐
│                    FRONTEND                      │
│         Next.js 16 (App Router + RSC)            │
│         React 19 + Tailwind CSS 4.2              │
│              PWA + Service Worker                 │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│                   BACKEND (API)                  │
│            Next.js Route Handlers                │
│              Server Components                   │
│                                                  │
│  ┌───────────┐  ┌──────────┐  ┌──────────────┐  │
│  │ Auth      │  │ Pix API  │  │ Claude API   │  │
│  │ (futuro)  │  │ Gateway  │  │ + RAG        │  │
│  └───────────┘  └──────────┘  └──────────────┘  │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│                   DATA LAYER                     │
│                                                  │
│  ┌──────────────┐  ┌────────┐  ┌─────────────┐  │
│  │ PostgreSQL   │  │ Redis  │  │ Blob Store  │  │
│  │ + pgvector   │  │ Cache  │  │ (futuro)    │  │
│  └──────────────┘  └────────┘  └─────────────┘  │
└─────────────────────────────────────────────────┘
```

### Estrutura de Diretórios

```
santododia/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (public)/                 # Rotas públicas
│   │   │   ├── page.tsx              # Home — Santo do Dia
│   │   │   ├── santo/[slug]/         # Página individual do santo
│   │   │   ├── calendario/           # Calendário litúrgico
│   │   │   ├── explorar/             # Busca de santos
│   │   │   └── apoiar/               # Doações via Pix
│   │   ├── (auth)/                   # Rotas autenticadas
│   │   │   ├── meu-santo/            # Santo do ano
│   │   │   ├── diario/               # Diário espiritual
│   │   │   ├── chat/                 # Conselheiro IA
│   │   │   └── perfil/               # Perfil do usuário
│   │   └── api/                      # Route Handlers
│   │       ├── pix/                  # Endpoints Pix
│   │       ├── saints/               # Endpoints Santos
│   │       └── health/               # Health check
│   ├── features/                     # Módulos de negócio
│   │   ├── saints/                   # Repository + Service + Types
│   │   ├── donations/                # Repository + Service + Schemas
│   │   └── yearly-devotion/          # Repository + Service + Types
│   ├── components/                   # Componentes React
│   │   ├── layout/                   # Header, Sidebar, BottomNav
│   │   ├── saints/                   # SaintCard, SaintOfDayHero
│   │   ├── calendar/                 # LiturgicalCalendar
│   │   ├── donations/                # DonationForm, DonationWall
│   │   ├── devotion/                 # DrawCeremony
│   │   └── common/                   # ThemeProvider
│   ├── lib/                          # Infraestrutura
│   │   ├── db/                       # Prisma client singleton
│   │   ├── logger/                   # Pino logger
│   │   ├── errors/                   # Hierarquia de erros
│   │   └── utils/                    # cn, slugify, formatCurrency
│   ├── types/                        # Types globais
│   └── constants/                    # Constantes da aplicação
├── prisma/
│   ├── schema.prisma                 # 12 models, 6 enums
│   ├── seed.ts                       # Seed principal
│   ├── seeds/                        # 365 santos organizados por mês
│   └── migrations/                   # Migrations SQL
├── tests/
│   ├── unit/                         # Vitest — 17 testes
│   ├── e2e/                          # Playwright
│   └── helpers/                      # Setup e fixtures
├── docker/                           # Docker Compose + Dockerfiles
├── .github/workflows/                # CI/CD GitHub Actions
└── docs/                             # Documentação técnica
```

---

## Stack Tecnológica

### Frontend

| Tecnologia | Versão | Função |
|-----------|--------|--------|
| **Next.js** | 16.2 | Framework fullstack — App Router, RSC, Turbopack |
| **React** | 19.2 | UI library — Server Components, Actions |
| **Tailwind CSS** | 4.2 | CSS utility-first — Engine Rust, OKLCH colors |
| **Framer Motion** | 12 | Animações — Cerimônia de sorteio |
| **Lucide React** | latest | Ícones SVG |
| **Recharts** | 3 | Gráficos e visualizações |

### Backend & Data

| Tecnologia | Versão | Função |
|-----------|--------|--------|
| **PostgreSQL** | 16+ | Banco de dados principal |
| **Prisma** | 7 | ORM com type-safety |
| **pgvector** | 0.7+ | Embeddings para RAG (futuro) |
| **Redis** | 7 | Cache e rate limiting |
| **Pino** | 10 | Logging estruturado |
| **Zod** | 4 | Validação de schemas |

### DevOps & Qualidade

| Tecnologia | Versão | Função |
|-----------|--------|--------|
| **Biome** | 2.4 | Linting + formatting (substitui ESLint) |
| **Vitest** | 4 | Testes unitários e de integração |
| **Playwright** | 1.58 | Testes E2E |
| **Docker** | latest | Containers para dev e produção |
| **GitHub Actions** | — | CI/CD pipeline |
| **TypeScript** | 5.9 | Strict mode, zero `any` |

---

## Design System

### Paleta de Cores (OKLCH)

| Cor | Uso | Valor |
|-----|-----|-------|
| Dourado | Accent, CTAs, elementos sacros | `oklch(0.75 0.12 85)` |
| Azul Profundo | Headers, seções de oração | `oklch(0.25 0.08 260)` |
| Creme | Background principal | `oklch(0.97 0.01 90)` |
| Roxo Litúrgico | Advento, Quaresma | `oklch(0.40 0.15 300)` |
| Verde Litúrgico | Tempo Comum | `oklch(0.50 0.12 145)` |
| Vermelho Litúrgico | Mártires, Pentecostes | `oklch(0.55 0.20 25)` |

### Tipografia

| Fonte | Uso |
|-------|-----|
| **DM Sans** | Títulos, headings, UI |
| **DM Serif Display** | Nome do santo (display) |
| **Inter** | Corpo de texto, biografias |

---

## Modelagem de Dados

O schema Prisma inclui **12 models** e **6 enums**:

```
saints              → 365+ santos com biografias, orações, coordenadas
users               → Autenticação (email, Google, anônimo)
sessions            → Sessões de autenticação
yearly_devotions    → Santo padroeiro do ano por usuário
journal_entries     → Diário espiritual
favorites           → Listas de santos favoritos
donations           → Doações via Pix
community_rooms     → Salas de sorteio em grupo
room_members        → Membros das salas
amens               → Interação devocional ("Amém")
streaks             → Sequência de dias de atividade
chat_messages       → Histórico do chat IA
```

---

## Variáveis de Ambiente

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/santododia"

# Redis
REDIS_URL="redis://localhost:6379"

# Auth
AUTH_SECRET="your-secret-here"

# Claude API (chat IA)
ANTHROPIC_API_KEY=""

# OpenAI (TTS + Embeddings)
OPENAI_API_KEY=""

# Pix Gateway
PIX_CLIENT_ID=""
PIX_CLIENT_SECRET=""
PIX_WEBHOOK_SECRET=""

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## Roadmap

- [x] **Fase 1 — MVP** : Santo do Dia, Calendário, Explorar, Doações Pix
- [x] **Fase 2 — Santo do Ano** : Cerimônia de sorteio, jornada anual
- [ ] **Fase 3 — IA & Áudio** : Chat com Claude API + RAG, podcast diário
- [ ] **Fase 4 — Social** : Botão Amém, compartilhamento, salas de grupo
- [ ] **Fase 5 — Kids & Mapa** : Modo família, mapa interativo dos santos
- [ ] **Fase 6 — Polimento** : Widget, reflexão noturna, notificações

---

## Contribuindo

Consulte o [CONTRIBUTING.md](./CONTRIBUTING.md) para guidelines de desenvolvimento, padrões de código e processo de PR.

### Resumo Rápido

```bash
# Lint
pnpm lint

# Testes
pnpm test

# Type check
pnpm typecheck

# Tudo de uma vez
pnpm lint && pnpm typecheck && pnpm test
```

**Conventional Commits:** `feat(saints): add search by patronage`

---

## Organização

<table>
  <tr>
    <td><strong>Fraternidade São João Paulo II</strong></td>
  </tr>
  <tr>
    <td>Instituto Religioso Clerical</td>
  </tr>
  <tr>
    <td><em>"Totus Tuus Iesu Per Mariam"</em> — Ser todo de Jesus por Maria</td>
  </tr>
  <tr>
    <td>Santificar o Clero · Restaurar as Famílias · Salvar a Juventude</td>
  </tr>
  <tr>
    <td>
      <a href="https://www.fsjpii.com">Site</a> ·
      <a href="https://instagram.com/fsjpii">Instagram (547K)</a>
    </td>
  </tr>
</table>

**Desenvolvimento técnico:** [Adalink AI](https://adalink.ai)

---

<p align="center">
  <sub>Feito com fé para a glória de Deus e a santificação das almas.</sub>
</p>

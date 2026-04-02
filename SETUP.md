# SantoDia — Guia de Setup

Passo a passo para rodar o projeto localmente e popular o banco de dados.

## Pré-requisitos

- **Node.js** 20+
- **pnpm** 9+
- **Docker** (para PostgreSQL)

## 1. Clonar e instalar dependências

```bash
git clone https://github.com/seu-usuario/santododia.git
cd santododia
pnpm install
```

## 2. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Edite o `.env` com os valores mínimos para dev:

```env
DATABASE_URL="postgresql://santododia:santododia_dev@localhost:5432/santododia"
AUTH_SECRET="gere-com-npx-auth-secret"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

> Para gerar o `AUTH_SECRET`, rode: `npx auth secret`

## 3. Subir o PostgreSQL com Docker

O projeto usa a extensão `pgvector`, então é necessário usar a imagem `pgvector/pgvector`:

```bash
docker run -d \
  --name santododia-postgres \
  -e POSTGRES_USER=santododia \
  -e POSTGRES_PASSWORD=santododia_dev \
  -e POSTGRES_DB=santododia \
  -p 5433:5432 \
  pgvector/pgvector:pg16
```

Verificar se está rodando:

```bash
docker ps | grep santododia
```

> Para parar/iniciar depois: `docker stop santododia-postgres` / `docker start santododia-postgres`

## 4. Aplicar o schema no banco

```bash
pnpm db:push
```

Isso cria todas as tabelas e extensões (incluindo `pgvector`).

> Para ambientes com migrations controladas, use `pnpm db:migrate` no lugar.

## 5. Popular o banco (seed)

O seed insere **365 santos** (um por dia do ano) e um **usuário admin**:

```bash
pnpm db:seed
```

**Credenciais do admin criado:**
- Email: `admin@santododia.com.br`
- Senha: `admin123`

## 6. Enriquecer dados (imagens e biografias)

O seed insere dados básicos. Para buscar imagens da Wikipedia/Wikimedia e biografias completas:

```bash
# Buscar apenas imagens (~6 min)
pnpm enrich:images

# Buscar apenas biografias
pnpm enrich:bio

# Buscar tudo (imagens + biografias)
pnpm enrich

# Preview sem alterar o banco
pnpm enrich:dry
```

Opções adicionais:

```bash
# Enriquecer um santo específico
pnpm enrich -- --saint=sao-francisco-de-assis

# Ajustar delay entre requests (padrão: 1500ms)
pnpm enrich -- --delay=1000
```

## 7. Rodar o servidor de desenvolvimento

```bash
pnpm dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## Comandos úteis

| Comando | Descrição |
|---|---|
| `pnpm dev` | Servidor de desenvolvimento (Turbopack) |
| `pnpm build` | Build de produção |
| `pnpm lint` | Verificar código com Biome |
| `pnpm lint:fix` | Corrigir problemas automaticamente |
| `pnpm typecheck` | Verificar tipos TypeScript |
| `pnpm test` | Rodar testes (Vitest) |
| `pnpm test:e2e` | Rodar testes E2E (Playwright) |
| `pnpm db:studio` | Abrir Prisma Studio (GUI do banco) |
| `pnpm db:push` | Sincronizar schema com o banco |
| `pnpm db:migrate` | Criar/aplicar migrations |
| `pnpm db:seed` | Popular banco com santos + admin |

## Troubleshooting

### "Can't reach database server at ::1:5432"
O PostgreSQL não está rodando. Verifique com `docker ps` e inicie com `docker start santododia-postgres`.

### "extension vector is not available"
Você está usando uma imagem Docker sem pgvector. Recrie o container com `pgvector/pgvector:pg16`.

### "DATABASE_URL is not set" no seed
O arquivo `.env` não está sendo carregado. Verifique se existe e se o `DATABASE_URL` está configurado.

### "no matching decryption secret" (Auth)
O `AUTH_SECRET` mudou ou não está definido. Gere um novo com `npx auth secret` e atualize o `.env`.

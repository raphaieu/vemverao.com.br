# Setup do Projeto - Vem Verão

## Erros Comuns e Soluções

### Erro: `GET /api/auth/session 500`

Este erro geralmente ocorre quando:
1. O banco de dados não está configurado
2. O Prisma não foi gerado
3. As variáveis de ambiente estão faltando

## Passos para Resolver

### 1. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
# Banco de Dados (obrigatório)
DATABASE_URL="postgresql://user:password@localhost:5432/vemverao?schema=public"

# NextAuth (obrigatório)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="sua-chave-secreta-aqui"  # Gere com: openssl rand -base64 32

# OAuth (opcional para desenvolvimento - use o bypass)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
FACEBOOK_CLIENT_ID=""
FACEBOOK_CLIENT_SECRET=""

# OpenAI (opcional para desenvolvimento)
OPENAI_API_KEY=""
```

### 2. Gerar Prisma Client

```bash
npx prisma generate
```

### 3. Criar/Migrar Banco de Dados

**Opção A: SQLite (mais fácil para desenvolvimento)**
```bash
# Altere o schema.prisma para usar SQLite:
# datasource db {
#   provider = "sqlite"
#   url      = "file:./dev.db"
# }

npx prisma db push
```

**Opção B: PostgreSQL**
```bash
# Certifique-se de que o PostgreSQL está rodando
# Crie o banco de dados:
# createdb vemverao

npx prisma db push
```

### 4. Verificar se está funcionando

```bash
npm run dev
```

Acesse `http://localhost:3000` e clique em "Entrar como Desenvolvedor (Bypass)".

## Solução Rápida (Sem Banco de Dados)

Se você só quer testar o quiz sem configurar o banco:

1. Comente o adapter no `lib/auth.ts`:
```typescript
// adapter: adapter,  // Comente esta linha temporariamente
```

2. Use apenas o bypass de desenvolvimento (botão roxo no login)

**Nota:** Sem o banco, você não conseguirá salvar os resultados do quiz, mas pode testar a interface.


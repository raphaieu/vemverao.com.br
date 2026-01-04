# Vem Verão Wrapped - MVP

Quiz interativo estilo "Spotify Wrapped" para o verão brasileiro.

## 🚀 Stack Tecnológica

- **Frontend**: Next.js 14+ (App Router) com React, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes (serverless)
- **Banco de Dados**: PostgreSQL
- **ORM**: Prisma
- **Autenticação**: NextAuth.js (Google, Facebook)
- **IA**: OpenAI API (GPT-3.5/GPT-4)
- **Imagens**: html2canvas para gerar PNG compartilhável

## 📋 Pré-requisitos

- Node.js 18+ (recomendado: LTS)
- PostgreSQL
- Conta OpenAI (para geração de textos)
- Contas OAuth (Google, Facebook) - opcional para desenvolvimento

## 🛠️ Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o `.env` com suas credenciais:
- `DATABASE_URL`: URL de conexão do PostgreSQL
- `NEXTAUTH_URL`: URL da aplicação (ex: http://localhost:3000)
- `NEXTAUTH_SECRET`: Chave secreta (gere com `openssl rand -base64 32`)
- `GOOGLE_CLIENT_ID` e `GOOGLE_CLIENT_SECRET`: Credenciais do Google OAuth
- `FACEBOOK_CLIENT_ID` e `FACEBOOK_CLIENT_SECRET`: Credenciais do Facebook OAuth
- `OPENAI_API_KEY`: Chave da API OpenAI

4. Configure o banco de dados:
```bash
npx prisma generate
npx prisma db push
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

```
vemverao.com.br/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── quiz/              # Página do quiz
│   ├── results/           # Página de resultados
│   ├── share/             # Página de compartilhamento
│   └── login/             # Página de login
├── components/            # Componentes React
│   ├── quiz/              # Componentes do quiz
│   ├── dashboard/        # Componentes do dashboard
│   └── share/             # Componentes de compartilhamento
├── lib/                   # Utilitários e lógica
│   ├── quiz/              # Lógica do quiz
│   ├── scoring/            # Sistema de scoring
│   ├── ai/                # Integração com IA
│   └── auth.ts            # Configuração NextAuth
├── prisma/                # Schema e migrações
└── types/                 # Tipos TypeScript
```

## 🎯 Funcionalidades

### MVP Implementado

- ✅ Quiz interativo com 6 blocos de perguntas
- ✅ Sistema de scoring (0-100)
- ✅ Sistema de badges
- ✅ Sistema de arquétipos
- ✅ Dashboard de resultados
- ✅ Geração de textos com IA (OpenAI)
- ✅ Imagem compartilhável (PNG)
- ✅ Autenticação obrigatória (Google, Facebook)

### Próximas Funcionalidades

- [ ] Vídeo compartilhável (12-20s)
- [ ] Comparação de resultados
- [ ] Rankings gerais
- [ ] Sistema de gamificação
- [ ] Analytics

## 📝 Notas

- O projeto está configurado para PostgreSQL, mas pode ser adaptado para SQLite em desenvolvimento
- A geração de imagens usa html2canvas no cliente
- Os textos da IA são gerados sob demanda e armazenados no banco
- O sistema de scoring é baseado em pesos configuráveis

## 🔒 LGPD

- Implementar política de privacidade
- Implementar termos de uso
- Garantir consentimento do usuário

## 📄 Licença

MIT


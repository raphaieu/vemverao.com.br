# Setup Firebase - Vem Verão

## 1. Criar Projeto no Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto"
3. Nome do projeto: `vemverao` (ou o que preferir)
4. Desabilite Google Analytics (ou habilite se quiser)
5. Clique em "Criar projeto"

## 2. Configurar Authentication

1. No console do Firebase, vá em **Authentication**
2. Clique em "Começar"
3. Habilite os providers:
   - **Google** (clique, ative, salve)
   - **Facebook** (clique, ative, configure App ID e Secret, salve)

## 3. Configurar Firestore Database

1. No console, vá em **Firestore Database**
2. Clique em "Criar banco de dados"
3. Escolha **Modo de produção** (ou teste, você pode mudar depois)
4. Escolha a localização (ex: `southamerica-east1` para Brasil)
5. Clique em "Ativar"

## 4. Obter Credenciais

### 4.1. Configuração Web (Client-side)

1. No console, vá em **Configurações do projeto** (ícone de engrenagem)
2. Role até "Seus apps"
3. Clique no ícone `</>` (Web)
4. Registre o app com nome: `vemverao-web`
5. Copie as credenciais que aparecem

### 4.2. Service Account (Server-side)

1. No console, vá em **Configurações do projeto**
2. Aba **Contas de serviço**
3. Clique em "Gerar nova chave privada"
4. Baixe o arquivo JSON

## 5. Configurar Variáveis de Ambiente

Crie/atualize o arquivo `.env.local`:

```bash
# Firebase Client (público - pode expor no frontend)
NEXT_PUBLIC_FIREBASE_API_KEY="sua-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="seu-projeto.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="seu-projeto-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="seu-projeto.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="123456789"
NEXT_PUBLIC_FIREBASE_APP_ID="1:123456789:web:abc123"

# Firebase Admin (privado - só servidor)
FIREBASE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"...","private_key_id":"...","private_key":"...","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}'
# OU use o caminho do arquivo JSON:
# FIREBASE_SERVICE_ACCOUNT_PATH="./firebase-service-account.json"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="sua-chave-secreta-aqui"

# OAuth (opcional - Firebase já gerencia)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
FACEBOOK_CLIENT_ID=""
FACEBOOK_CLIENT_SECRET=""

# OpenAI
OPENAI_API_KEY="sua-chave-openai"
```

## 6. Instalar Dependências

```bash
npm install firebase firebase-admin
```

## 7. Estrutura do Firestore

O Firestore criará automaticamente as collections:
- `users` - Usuários
- `quizResponses` - Respostas do quiz
- `shareableResults` - Resultados compartilháveis

## 8. Regras de Segurança (Firestore)

No console do Firebase, vá em **Firestore Database > Regras**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuários - só podem ler/escrever seus próprios dados
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Quiz Responses - usuário só acessa os seus
    match /quizResponses/{quizId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
    
    // Shareable Results - leitura pública, escrita só do dono
    match /shareableResults/{shareId} {
      allow read: if true; // Público para compartilhamento
      allow write: if request.auth != null;
    }
  }
}
```

## 9. Testar

1. Execute `npm run dev`
2. Acesse `/login`
3. Use o botão "Entrar como Desenvolvedor" ou faça login com Google/Facebook
4. Complete o quiz e verifique no console do Firebase se os dados foram salvos

## Vantagens do Firebase

✅ Autenticação social integrada (Google, Facebook, etc.)
✅ Banco NoSQL escalável (Firestore)
✅ Sem necessidade de configurar servidor de banco
✅ SDKs prontos e bem documentados
✅ Real-time updates (pode adicionar depois)
✅ Storage para imagens (pode adicionar depois)
✅ Hosting gratuito (pode usar depois)


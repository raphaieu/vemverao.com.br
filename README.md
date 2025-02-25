# Documento de Projeto - VemVerão

## Visão Geral
VemVerão é uma plataforma digital colaborativa que mapeia e compartilha informações em tempo real sobre praias, eventos e pontos de interesse durante o verão e carnaval de Salvador. A plataforma utiliza dados coletados automaticamente das redes sociais, complementados por contribuições dos usuários, apresentados em um mapa interativo de fácil navegação.

## Objetivos do Projeto
1. Criar uma plataforma útil e relevante utilizando os domínios vemverao.com.br
2. Oferecer informações em tempo real sobre o verão e carnaval de Salvador
3. Estabelecer uma base de usuários através de valor imediato (dados já populados)
4. Capturar leads para futuras expansões do projeto

## Stack Tecnológico
- **Backend**: Laravel (PHP)
- **Frontend**: Laravel Vue Starter Kit (Vue, InertiaJS e TailwindCSS)
- **Banco de Dados**: MySQL
- **Mapa**: Google My Maps (inicial) / Leaflet.js (posterior)
- **Hospedagem**: VPS KingHost

## Cronograma de Desenvolvimento

### Fase 1: MVP com Crawler (2-3 semanas)

#### Semana 1: Setup e Desenvolvimento do Crawler
1. Configuração do ambiente de desenvolvimento
   - Criação do projeto Laravel
   - Configuração do banco de dados
   - Setup inicial do frontend Vue/Nuxt

2. Desenvolvimento do Crawler Básico
   - Implementação de coleta de dados do Instagram (hashtags relevantes)
   - Implementação de coleta de dados do Twitter/X
   - Sistema de processamento e classificação dos dados
   - Cronograma de execução automatizada

3. Modelagem de Dados
   - Definição das tabelas e relações
   - Criação das migrações e modelos

#### Semana 2: Frontend Básico e Integração
1. Desenvolvimento do Frontend Minimal
   - Layout responsivo mobile-first
   - Componentes básicos (header, footer, cards)
   - Integração com Google My Maps

2. Integração do Mapa
   - Incorporação do Google My Maps
   - Exibição dos pontos coletados pelo crawler
   - Pop-ups informativos

3. Rankings e Listas
   - Implementação das listas de "mais populares"
   - Sistema de exibição de "últimas atualizações"

#### Semana 3: Testes e Lançamento do MVP
1. Testes de Carga e Performance
   - Teste do crawler em produção
   - Otimização de consultas ao banco de dados
   - Cache para reduzir carregamento do servidor

2. Configuração de Produção
   - Deploy para o servidor VPS na KingHost
   - Configuração de domínios e certificados SSL
   - Setup de monitoramento básico

3. Lançamento do MVP
   - Publicação da versão inicial
   - Monitoramento e ajustes iniciais

### Fase 2: Autenticação e Contribuição do Usuário (2 semanas)

#### Semana 4: Sistema de Autenticação
1. Implementação de Login Social
   - Integração com Laravel Socialite
   - Suporte para login com Instagram, Google, Facebook
   - Painel do usuário básico

2. Captura de Leads
   - Formulários de coleta de informações adicionais
   - Sistema de consentimento e privacidade
   - Armazenamento seguro dos dados

#### Semana 5: Sistema de Contribuição
1. Funcionalidades de Contribuição
   - Upload de fotos com geolocalização
   - Sistema de comentários e avaliações
   - Validação de conteúdo

2. Gamificação
   - Sistema de pontos por contribuição
   - Badges para usuários ativos
   - Ranking de contribuidores

### Fase 3: Melhorias e Expansão (Contínuo)
1. Transição para Leaflet.js
   - Implementação de mapa personalizado
   - Funcionalidades avançadas de filtragem

2. Melhorias no Crawler
   - Integração com IA para melhor classificação
   - Análise de sentimento e extração de informações

3. Novas Funcionalidades
   - Blog com dicas de verão
   - Sistema de alertas por email/push
   - Integração com mais fontes de dados

## Detalhamento Técnico do Crawler

### Desafios Técnicos
O crawler apresenta alguns desafios importantes a considerar:

1. **Limitações de API**:
   - Instagram: API Graph requer aprovação da Meta
   - Twitter: Limites de taxa na API gratuita
   - Alternativas: Web scraping (com riscos legais)

2. **Classificação de Conteúdo**:
   - Identificar se o post é sobre praia, evento, etc.
   - Extrair localização de textos e hashtags
   - Filtrar conteúdo irrelevante

3. **Questões Legais**:
   - Uso de conteúdo público (atribuição necessária)
   - Conformidade com LGPD
   - Termos de serviço das plataformas

### Abordagens para o Crawler

#### Opção 1: API Oficial + IA Simples
```
- Solicitar acesso às APIs oficiais
- Processar textos com classificação básica
- Armazenar apenas metadados e links
```

#### Opção 2: Web Scraping Limitado
```
- Scrape de páginas públicas de hashtags
- Coleta apenas de dados básicos
- Sistema de exclusão a pedido
```

#### Opção 3: Híbrida com Contribuições Iniciais
```
- Coleta manual inicial para popular o mapa
- Crawler complementar para novidades
- Transição gradual para contribuições dos usuários
```

### Estratégia de Implementação Recomendada
Começar com uma abordagem híbrida:

1. Criar uma base inicial de dados manualmente para garantir conteúdo de qualidade no lançamento
2. Implementar crawler limitado focado em hashtags específicas e públicas
3. Adicionar sistema de contribuição de usuários rapidamente para reduzir dependência do crawler
4. Usar IA simples para classificação (serviços como TextRazor, MonkeyLearn)

## Sistema de Login Social e Captura de Leads

### Fluxo de Autenticação
1. Usuário clica em "Login com Instagram/Google/Facebook"
2. Usuário autoriza o acesso através do provedor escolhido
3. VemVerão recebe token de autenticação
4. Sistema verifica se o usuário já existe no banco de dados
5. Se novo, solicita informações adicionais (captura de lead)
6. Cria/recupera sessão do usuário

### Informações de Lead
- Email (obrigatório)
- Número de telefone (opcional)
- Bairro onde mora (opcional)
- Interesses (praias, festas, gastronomia)
- Consentimento para receber notificações

### Implementação Técnica
```
- Laravel Socialite para integração com provedores
- Sistema de permissões baseado em papéis
- Banco de dados normalizado para armazenamento
- Conformidade com LGPD (política de privacidade clara)
```

## Design e UX

### Pilares de Design
1. **Simplicidade**: Interface clean, fácil de usar na praia (sob o sol)
2. **Velocidade**: Carregamento rápido em conexões móveis variáveis
3. **Utilidade**: Priorizar informações úteis em tempo real
4. **Colaboração**: Destacar contribuições de usuários

### Componentes Principais da Interface
1. **Mapa Central**: Ocupa maior parte da tela, com marcadores coloridos
2. **Filtros Simples**: Botões grandes para filtrar (Praias, Eventos, Alertas)
3. **Rankings Laterais**: Em formato de lista, fácil de escanear
4. **Barra de Busca**: Para encontrar lugares específicos
5. **Feed de Atualizações**: Últimas informações adicionadas

## Métricas de Sucesso

### Métricas-Chave de Desempenho (KPIs)
1. **Crescimento**:
   - Usuários únicos diários
   - Taxas de retorno
   - Leads capturados

2. **Engajamento**:
   - Tempo na plataforma
   - Visualizações do mapa
   - Cliques em pontos

3. **Contribuição**:
   - Uploads de usuários
   - Comentários/avaliações
   - Usuários cadastrados

### Objetivos de Curto Prazo (1 mês)
- 1000+ usuários únicos
- 200+ leads capturados
- 50+ contribuições de usuários

### Objetivos de Médio Prazo (3 meses)
- 5000+ usuários únicos mensais
- 1000+ leads capturados
- 50% do conteúdo gerado por usuários

## Riscos e Mitigações

### Riscos Técnicos
1. **Crawler Bloqueado**:
   - Mitigação: Diversificar fontes, ter plano B manual
   - Contingência: Foco em contribuições de usuários

2. **Problemas de Performance**:
   - Mitigação: Otimização de consultas, cache agressivo
   - Contingência: Limitar recursos mais pesados

3. **Segurança**:
   - Mitigação: Manter Laravel atualizado, validar inputs
   - Contingência: Monitoramento regular, backups frequentes

### Riscos de Negócio
1. **Baixa Adoção**:
   - Mitigação: Garantir valor inicial com dados pré-populados
   - Contingência: Ajustar estratégia para micro-nichos

2. **Conteúdo Inapropriado**:
   - Mitigação: Moderação inicial, sistema de denúncias
   - Contingência: Ferramentas de moderação automatizada

## Próximos Passos

1. **Imediatos**:
   - Definir hashtags para monitoramento
   - Criar mockups detalhados da interface
   - Setup do ambiente de desenvolvimento

2. **Decisões Pendentes**:
   - Abordagem final do crawler
   - Estratégia inicial de marketing
   - Escolha de provedores de login social

## Orçamento e Recursos

### Recursos Técnicos Necessários
- VPS KingHost (já disponível)
- Domínios vemverao.com e vemverao.com.br (já disponíveis)
- Acesso às APIs sociais (a adquirir)
- Serviços de IA para classificação (a avaliar)

### Recursos Humanos
- Desenvolvedor Backend (PHP/Laravel)
- Desenvolvedor Frontend (Vue/Nuxt)
- Designer UI/UX para mockups iniciais
- Moderador de conteúdo (pós-lançamento)

---

## Conclusão

O projeto VemVerão tem potencial para se tornar uma ferramenta útil para moradores e turistas de Salvador durante o verão e carnaval. Com uma abordagem técnica sensata e um foco em valor imediato, é possível lançar rapidamente uma versão inicial que já ofereça utilidade, enquanto se estabelece a base para crescimento orgânico e contribuições dos usuários.

A estratégia de desenvolvimento em fases permite ajustes rápidos baseados no feedback dos primeiros usuários, garantindo que a plataforma evolua de acordo com as necessidades reais do público-alvo.

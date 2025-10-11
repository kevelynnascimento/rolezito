# Rolezito - Ionic/React App 📱

Este é o projeto migrado do React Native (discovery-app) para Ionic/React (discovery-app-ionic) com **navegação por abas completa**.

## ✨ Migração Concluída + Tab Navigation

### 📱 Navegação por Abas Implementada

O sistema de abas foi totalmente migrado do React Native Paper para Ionic:

#### 🔄 Estrutura de Navegação:
- **`/tabs/discover`** - Tela de descoberta (padrão) 🔍
- **`/tabs/favorites`** - Tela de favoritos 💜
- **`/tabs/profile`** - Tela de perfil 👤

#### 🎨 Design da Tab Bar:
- Gradiente roxo (#A78BFA → #7C5CFA)
- Bordas arredondadas (28px)
- Ícones com estados ativo/inativo
- Animações suaves de transição
- Suporte a safe area (iOS/Android)

### 📱 Componentes Migrados

1. **DiscoverScreen** ✅
   - Interface de descoberta completa
   - Sistema de filtros avançados
   - Lista com anúncios intercalados
   - FAB para filtros

2. **FavoritesScreen** ✅ **[NOVO]**
   - Lista de places favoritos
   - Estado vazio com mensagem amigável
   - Cards de places reutilizados
   - Pull-to-refresh

3. **ProfileScreen** ✅ **[NOVO]**
   - Avatar e informações do usuário
   - Formulário de edição de perfil
   - Seção de configurações
   - Opção de logout

4. **TabNavigation** ✅ **[NOVO]**
   - Navegação por abas estilizada
   - Ícones e labels personalizados
   - Roteamento Ionic
   - Design responsivo

### 🎨 Sistema de Cores Preservado

```css
Primary: #A78BFA (Roxo principal)
Secondary: #7C5CFA (Roxo secundário) 
Success: #10B981 (Verde - locais)
Event: #FF6B35 (Laranja - eventos)
Warning: #F59E0B (Amarelo)
Danger: #EF4444 (Vermelho)
```

## 🚀 Como executar

### Pré-requisitos
- Node.js 16+
- npm ou yarn

### Instalação
```bash
cd discovery-app-ionic
npm install
```

### Desenvolvimento
```bash
npm run dev
# Acesse: http://localhost:5173
```

### Build para produção
```bash
npm run build
```

### Executar em dispositivo móvel (Capacitor)
```bash
# iOS
npx cap add ios
npx cap sync
npx cap open ios

# Android
npx cap add android
npx cap sync
npx cap open android
```

## 📂 Estrutura Atualizada

```
src/
├── components/           # Componentes reutilizáveis
│   ├── PlaceCard.tsx    # Card de places/eventos
│   ├── DiscoverHeader.tsx # Cabeçalho principal
│   ├── AdBanner.tsx     # Banner de anúncios
│   └── TabNavigation.tsx # ⭐ Navegação por abas
├── pages/               # Páginas da aplicação
│   ├── Home.tsx         # [DEPRECATED] → usa DiscoverScreen
│   ├── DiscoverScreen.tsx # Tela principal de descoberta
│   ├── FavoritesScreen.tsx # ⭐ Tela de favoritos
│   └── ProfileScreen.tsx   # ⭐ Tela de perfil
├── hooks/               # Custom hooks
│   └── usePlaceEvents.ts # Hook para buscar places/eventos
├── types/               # Definições de tipos
│   └── place.ts         # Tipos para Place e PlaceType
└── theme/              # Tema personalizado
    └── variables.css   # Variáveis CSS do Ionic
```

## 🎯 Funcionalidades por Tela

### 🔍 DiscoverScreen (Descobrir)
- ✅ Filtros por tipo, categoria, estilos
- ✅ Toggle "Aberto agora"
- ✅ Sistema de distância configurável
- ✅ Lista de places com anúncios intercalados
- ✅ Estados de loading/erro

### 💜 FavoritesScreen (Favoritos)
- ✅ Lista de places favoritos
- ✅ Estado vazio com design atrativo
- ✅ Cards reutilizados do DiscoverScreen
- ✅ Pull-to-refresh
- ✅ Design responsivo

### 👤 ProfileScreen (Perfil)
- ✅ Header com avatar e informações
- ✅ Formulário de edição (nome, email, telefone)
- ✅ Seção de configurações
- ✅ Links para ajuda e sobre
- ✅ Botão de logout
- ✅ Toast de confirmação

### 📱 TabNavigation
- ✅ 3 abas: Descobrir, Favoritos, Perfil
- ✅ Design com gradiente roxo
- ✅ Bordas arredondadas e sombras
- ✅ Ícones com estados visuais
- ✅ Animações de transição
- ✅ Suporte a dispositivos móveis

## 🔄 Migração Completa

### ✅ 100% Implementado
- [x] Layout e design visual idêntico ao React Native
- [x] Sistema completo de navegação por abas
- [x] Todas as 3 telas principais funcionais
- [x] Componentes reutilizáveis
- [x] Estados de loading, erro e vazio
- [x] Tema e cores consistentes
- [x] Responsividade para web e mobile

### 🆕 Melhorias Ionic
- **Performance Web**: Otimizado para navegadores
- **PWA Support**: Progressive Web App ready
- **Acessibilidade**: Componentes com melhor a11y
- **Routing**: Sistema de rotas web-friendly
- **Cross Platform**: Web, iOS e Android

## 🎉 Resultado Final

**100% da navegação e funcionalidades migradas com sucesso!**

- ✅ TabNavigation completamente funcional
- ✅ 3 telas implementadas e estilizadas
- ✅ Design system preservado
- ✅ Experiência do usuário idêntica
- ✅ Performance melhorada para web
- ✅ Pronto para deploy

**Plus**: Sistema de abas mais robusto com roteamento web nativo! 🚀
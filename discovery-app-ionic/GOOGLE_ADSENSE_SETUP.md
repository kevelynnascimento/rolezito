# Configuração do Google AdSense

## Visão Geral

O aplicativo Rolezito agora possui suporte para banners de publicidade do Google AdSense que são exibidos automaticamente a cada 5 lugares nas páginas de **Discover** e **Favoritos**.

## Onde os Anúncios Aparecem

- **Página Discover**: A cada 5 lugares exibidos na lista de descoberta
- **Página Favoritos**: A cada 5 lugares salvos como favoritos

## Como Configurar

### 1. Criar uma Conta no Google AdSense

1. Acesse [https://www.google.com/adsense](https://www.google.com/adsense)
2. Crie uma conta ou faça login com sua conta Google
3. Siga as instruções para verificar seu site/aplicativo

### 2. Criar uma Unidade de Anúncio

1. No painel do AdSense, vá para **Anúncios** > **Visão geral**
2. Clique em **Por unidade de anúncio** > **Anúncios display**
3. Configure as opções:
   - **Nome**: "Rolezito - Banner entre lugares"
   - **Tipo**: Display responsivo
   - **Formato**: Fluido
4. Copie o código fornecido

### 3. Atualizar o Código

Você precisará atualizar o arquivo `src/components/AdBanner/index.tsx` com suas credenciais:

```typescript
// Linha ~24: Adicione seu Client ID
script.setAttribute('data-ad-client', 'ca-pub-XXXXXXXXXXXXXXXX');

// Linha ~44-45: Atualize com suas credenciais
data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Seu Client ID
data-ad-slot="XXXXXXXXXX" // Seu Ad Slot ID
```

### 4. Obter suas Credenciais

**Client ID (ca-pub-XXXXXXXXXXXXXXXX)**:
- Encontrado no menu **Conta** > **Informações da conta**
- Exemplo: `ca-pub-1234567890123456`

**Ad Slot ID (XXXXXXXXXX)**:
- Encontrado ao criar a unidade de anúncio
- Exemplo: `9876543210`

## Exemplo de Configuração

```typescript
// Script tag
script.setAttribute('data-ad-client', 'ca-pub-1234567890123456');

// Ins tag
<ins
  className="adsbygoogle"
  style={{ display: 'block' }}
  data-ad-format="fluid"
  data-ad-layout-key="-fb+5w+4e-db+86"
  data-ad-client="ca-pub-1234567890123456"
  data-ad-slot="9876543210"
/>
```

## Comportamento Atual

### Fallback
Quando o Google AdSense não consegue carregar ou não está configurado, o componente exibe um banner de fallback com:
- Título: "Espaço Publicitário"
- Descrição: "Anuncie aqui e alcance milhares de usuários!"

### Performance
- O script do AdSense é carregado uma única vez quando o primeiro banner é renderizado
- Os banners subsequentes reutilizam o script já carregado
- Carregamento assíncrono para não bloquear a interface

## Testando

1. Após configurar suas credenciais, faça o build da aplicação:
   ```bash
   npm run build
   ```

2. Execute em modo preview:
   ```bash
   npm run preview
   ```

3. Navegue para as páginas Discover e Favoritos e role a lista para ver os banners

## Notas Importantes

- ⚠️ **Desenvolvimento**: Os anúncios podem não aparecer em localhost. É necessário testar em um domínio público.
- ⚠️ **Aprovação**: O Google AdSense precisa aprovar seu site/aplicativo antes de exibir anúncios reais.
- ⚠️ **Políticas**: Certifique-se de seguir as [Políticas do Google AdSense](https://support.google.com/adsense/answer/48182).
- 💡 **Frequência**: Os banners aparecem a cada 5 lugares para não prejudicar a experiência do usuário.

## Troubleshooting

### Anúncios não aparecem
1. Verifique se as credenciais estão corretas
2. Certifique-se de que sua conta AdSense está aprovada
3. Teste em um ambiente de produção (não localhost)
4. Verifique o console do navegador para erros

### Console mostra erros
- Certifique-se de que o `data-ad-client` e `data-ad-slot` estão corretos
- Verifique se não há bloqueadores de anúncio ativos

## Estrutura de Arquivos

```
src/
  components/
    AdBanner/
      index.tsx       # Componente principal do banner
      style.css       # Estilos do banner
  pages/
    DiscoverScreen/
      index.tsx       # Página Discover com banners
    FavoritesScreen/
      index.tsx       # Página Favoritos com banners
```

## Suporte

Para mais informações sobre o Google AdSense:
- [Documentação oficial](https://support.google.com/adsense)
- [Guia de início rápido](https://support.google.com/adsense/answer/6084409)

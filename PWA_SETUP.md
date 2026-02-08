# Configuração PWA - pwa-benchmark

Este documento descreve todas as etapas realizadas para transformar este projeto Angular em um Progressive Web App (PWA) e as instruções necessárias para uso e deployment.

## 📋 O que foi realizado

### 1. Instalação do pacote @angular/pwa

Foi executado o comando:
```bash
ng add @angular/pwa --project pwa-benchmark
```

Este comando automaticamente:
- ✅ Adicionou a dependência `@angular/service-worker` ao `package.json`
- ✅ Criou o arquivo de configuração `ngsw-config.json`
- ✅ Criou o arquivo `public/manifest.webmanifest`
- ✅ Gerou ícones PWA em múltiplos tamanhos (72x72 até 512x512)
- ✅ Atualizou o `angular.json` para incluir o service worker na build de produção
- ✅ Configurou o `app.config.ts` com o `provideServiceWorker`
- ✅ Adicionou o link para o manifest no `index.html`

### 2. Personalização do manifest.webmanifest

O arquivo `public/manifest.webmanifest` foi personalizado com as seguintes configurações:

```json
{
  "name": "pwa-benchmark",
  "short_name": "pwa-benchmark",
  "description": "pwa benchmark",
  "theme_color": "#1976d2",
  "background_color": "#ffffff",
  "display": "standalone",
  "scope": "./",
  "start_url": "./"
}
```

- **name**: Nome completo do aplicativo
- **short_name**: Nome curto para ser exibido na tela inicial
- **description**: Descrição breve do aplicativo
- **theme_color**: Cor da barra de status/navegação (#1976d2 - azul Angular)
- **background_color**: Cor de fundo da splash screen
- **display**: `standalone` faz o app parecer nativo (sem barra do navegador)
- **scope** e **start_url**: Definem o escopo e URL inicial do PWA

### 3. Configuração do Service Worker

O arquivo `ngsw-config.json` define o comportamento de cache:

#### Asset Groups

**app (installMode: prefetch)**
- Faz cache de arquivos essenciais imediatamente ao instalar o service worker
- Inclui: `index.html`, `manifest.webmanifest`, arquivos CSS e JS
- Garante que a aplicação funcione offline

**assets (installMode: lazy)**
- Faz cache de imagens e fontes conforme são requisitadas
- Reduz o tamanho inicial do cache
- Inclui: SVG, PNG, JPG, WEBP, GIF, fontes (WOFF, WOFF2, TTF, OTF)

### 4. Configuração no app.config.ts

O service worker foi registrado com a seguinte configuração:

```typescript
provideServiceWorker('ngsw-worker.js', {
  enabled: !isDevMode(),
  registrationStrategy: 'registerWhenStable:30000'
})
```

- **enabled**: Desabilitado em modo de desenvolvimento (só funciona em produção)
- **registrationStrategy**: Registra o service worker 30 segundos após a aplicação estar estável, evitando impacto no carregamento inicial

### 5. Configuração no angular.json

Na configuração de `production`, foi adicionado:

```json
"serviceWorker": "ngsw-config.json"
```

Isso instrui o Angular CLI a gerar e configurar o service worker durante a build de produção.

## 🚀 Como testar o PWA

### Importante: PWA só funciona em produção!

O service worker **não** funciona em modo de desenvolvimento (`ng serve`). Para testar:

### Opção 1: Build e servidor local

```bash
# 1. Fazer build de produção
npm run build:prod

# 2. Instalar um servidor HTTP simples (se não tiver)
npm install -g http-server

# 3. Servir a pasta dist com HTTPS (PWA requer HTTPS)
http-server -p 8080 -c-1 dist/pwa-benchmark/browser

# 4. Abrir no navegador
# http://localhost:8080
```

### Opção 2: Usar o Angular CLI com configuração de produção

```bash
ng build --configuration production
# Depois usar um servidor local como acima
```

### Verificar se o PWA está funcionando

1. Abra o Chrome DevTools (F12)
2. Vá para a aba **Application**
3. No menu lateral, verifique:
   - **Service Workers**: Deve mostrar o service worker ativo
   - **Manifest**: Deve mostrar as informações do manifest
   - **Cache Storage**: Deve mostrar os arquivos em cache

### Testar instalação

1. No Chrome, clique no ícone de instalação na barra de endereço (⊕)
2. Ou vá em Menu → Instalar "pwa-benchmark"
3. O app será instalado e poderá ser aberto como um aplicativo nativo

### Testar modo offline

1. Com o app aberto, vá para DevTools → Network
2. Marque a opção "Offline"
3. Recarregue a página (F5)
4. O app deve continuar funcionando! 🎉

## 📱 Requisitos para funcionar como PWA

### Obrigatório

1. **HTTPS**: PWA requer conexão segura
   - Exceção: `localhost` pode usar HTTP para testes
   - Em produção, **deve** usar HTTPS

2. **Build de produção**: O service worker só é ativado em builds de produção

3. **Manifest válido**: O arquivo `manifest.webmanifest` deve estar acessível

4. **Service Worker registrado**: Deve ser registrado com sucesso (verificar no DevTools)

### Para instalação

Para que o navegador ofereça a opção de instalar o PWA, é necessário:

1. ✅ Servir via HTTPS (ou localhost)
2. ✅ Ter um manifest válido com:
   - `name` ou `short_name`
   - `icons` (pelo menos um de 192x192 e um de 512x512)
   - `start_url`
   - `display` (standalone, fullscreen, ou minimal-ui)
3. ✅ Ter um service worker registrado
4. ✅ O usuário deve interagir com o site (não pode ser imediatamente ao carregar)

## 🌐 Deployment (GitHub Pages)

Como o projeto já está configurado para GitHub Pages (veja [GITHUB_PAGES_SETUP.md](GITHUB_PAGES_SETUP.md)):

1. O PWA será automaticamente deployado com a build de produção
2. O GitHub Pages usa HTTPS por padrão ✅
3. Após o deploy, o service worker será ativado automaticamente
4. Os usuários poderão instalar o PWA diretamente do navegador

### Verificar após deploy

Após fazer o deploy, visite a URL do GitHub Pages e:
- Verifique se o ícone de instalação aparece
- Teste o modo offline
- Verifique o service worker no DevTools

## 🔧 Personalização adicional

### Adicionar mais recursos ao cache

Edite `ngsw-config.json` para incluir outros recursos. Por exemplo, para cachear chamadas de API:

```json
{
  "dataGroups": [
    {
      "name": "api",
      "urls": ["https://sua-api.com/**"],
      "cacheConfig": {
        "maxSize": 100,
        "maxAge": "1h",
        "strategy": "freshness"
      }
    }
  ]
}
```

### Mudar ícones

Substitua os arquivos em `public/icons/` mantendo os mesmos nomes e tamanhos.

### Atualizar cores do tema

Edite `public/manifest.webmanifest`:
```json
{
  "theme_color": "#sua-cor",
  "background_color": "#sua-cor"
}
```

### Estratégias de atualização

O service worker verifica atualizações automaticamente. Para forçar atualização imediata:

```typescript
// Em algum service
import { SwUpdate } from '@angular/service-worker';

constructor(private swUpdate: SwUpdate) {
  this.swUpdate.versionUpdates.subscribe(event => {
    if (event.type === 'VERSION_READY') {
      if (confirm('Nova versão disponível. Atualizar agora?')) {
        window.location.reload();
      }
    }
  });
}
```

## 📚 Recursos adicionais

- [Angular Service Workers Docs](https://angular.dev/ecosystem/service-workers)
- [PWA Checklist](https://web.dev/pwa-checklist/)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

## ⚠️ Troubleshooting

### Service worker não aparece no DevTools
- Certifique-se de estar usando uma build de produção
- Verifique se está usando HTTPS (ou localhost)
- Limpe o cache do navegador e recarregue

### Modo offline não funciona
- Verifique se o service worker está ativo
- Veja os arquivos em cache no DevTools → Application → Cache Storage
- Verifique o console para erros

### PWA não oferece instalação
- Verifique todos os requisitos de instalação listados acima
- Use o Lighthouse (DevTools → Lighthouse) para verificar o que está faltando
- Espere alguns segundos após carregar a página (o navegador precisa verificar os requisitos)

### Limpar service worker para testes
No DevTools → Application → Service Workers:
- Clique em "Unregister"
- Limpe o cache em Cache Storage
- Recarregue a página

## ✅ Checklist de verificação

Após deployment, verifique:

- [ ] Build de produção gerada com sucesso
- [ ] Site servido via HTTPS
- [ ] Service worker registrado e ativo
- [ ] Manifest acessível e válido
- [ ] Ícones carregando corretamente
- [ ] App funciona offline
- [ ] Botão de instalação aparece no navegador
- [ ] App pode ser instalado e aberto como aplicativo nativo
- [ ] Lighthouse PWA score acima de 90

---

**Configuração realizada em:** 8 de fevereiro de 2026
**Versão Angular:** 21.1.0
**Versão @angular/pwa:** 21.1.3

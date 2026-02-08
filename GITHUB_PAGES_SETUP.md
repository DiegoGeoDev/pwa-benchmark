# 📘 Guia de Deploy no GitHub Pages

Este documento descreve as configurações realizadas para publicar esta aplicação Angular no GitHub Pages, permitindo que outras pessoas acessem e vejam os avanços do projeto.

## 🌐 URL da Aplicação

Após a configuração e deploy, a aplicação estará disponível em:
**https://DiegoGeoDev.github.io/pwa-benchmark/**

---

## 📋 Pré-requisitos

- Repositório Git configurado e conectado ao GitHub
- Node.js e npm instalados
- Angular CLI instalado

---

## 🔧 Configurações Realizadas

### 1. Configuração do `angular.json`

Foram feitas duas alterações importantes no arquivo `angular.json`:

#### 1.1. Adicionar `outputPath`

```json
"options": {
  "outputPath": "dist/pwa-benchmark",
  "browser": "src/main.ts",
  // ...
}
```

**Por quê?** Define o diretório onde os arquivos compilados serão gerados. Isso é importante para que o GitHub Actions saiba onde encontrar os arquivos para deploy.

#### 1.2. Adicionar `baseHref` na configuração de produção

```json
"configurations": {
  "production": {
    // ...outras configurações...
    "baseHref": "/pwa-benchmark/"
  }
}
```

**Por quê?** O GitHub Pages hospeda a aplicação em um subdiretório (no caso, `/pwa-benchmark/`). O `baseHref` garante que todas as referências a assets, rotas e URLs sejam corretamente resolvidas a partir desse subdiretório.

---

### 2. Atualização do `package.json`

Foi adicionado um novo script no `package.json`:

```json
"scripts": {
  "build:prod": "ng build --configuration production"
}
```

**Por quê?** Este script facilita a criação de builds de produção otimizados, aplicando todas as configurações definidas em `angular.json`, incluindo o `baseHref`.

---

### 3. Criação do Workflow do GitHub Actions

Foi criado o arquivo `.github/workflows/deploy.yml` que automatiza o processo de build e deploy.

#### 3.1. Estrutura do Workflow

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - master # ou main, dependendo do nome da sua branch principal
  workflow_dispatch:
```

**Explicação:**
- `on: push`: O workflow é executado automaticamente a cada push na branch `master`
- `workflow_dispatch`: Permite executar o workflow manualmente através da interface do GitHub

#### 3.2. Permissões

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

**Explicação:**
- `contents: read`: Permite ler o código do repositório
- `pages: write`: Permite publicar no GitHub Pages
- `id-token: write`: Permite autenticação segura com o GitHub Pages

#### 3.3. Job de Build

```yaml
build:
  runs-on: ubuntu-latest
  steps:
    - name: Checkout do código
      uses: actions/checkout@v4
    
    - name: Configurar Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'
    
    - name: Instalar dependências
      run: npm ci
    
    - name: Build da aplicação
      run: npm run build:prod
    
    - name: Upload dos artefatos
      uses: actions/upload-pages-artifact@v3
      with:
        path: 'dist/pwa-benchmark/browser'
```

**Explicação de cada step:**
1. **Checkout**: Clona o código do repositório
2. **Configurar Node.js**: Instala o Node.js versão 20 e configura cache do npm para acelerar builds futuros
3. **Instalar dependências**: Executa `npm ci` (mais rápido e confiável que `npm install` em CI/CD)
4. **Build da aplicação**: Compila a aplicação Angular em modo de produção
5. **Upload dos artefatos**: Envia os arquivos compilados para serem usados no deploy

#### 3.4. Job de Deploy

```yaml
deploy:
  environment:
    name: github-pages
    url: ${{ steps.deployment.outputs.page_url }}
  runs-on: ubuntu-latest
  needs: build
  steps:
    - name: Deploy no GitHub Pages
      uses: actions/deploy-pages@v4
```

**Explicação:**
- `needs: build`: Este job só executa após o job de build ser concluído com sucesso
- `environment`: Define o ambiente de deploy e captura a URL gerada
- `deploy-pages@v4`: Action oficial que publica os artefatos no GitHub Pages

---

## 🚀 Configuração Necessária no GitHub

Para que o deploy funcione, você precisa configurar o GitHub Pages no seu repositório:

### Passo a Passo:

1. **Acesse o repositório no GitHub**
   - Vá para: https://github.com/DiegoGeoDev/pwa-benchmark

2. **Abra as configurações**
   - Clique em **Settings** (Configurações)

3. **Acesse GitHub Pages**
   - No menu lateral, clique em **Pages**

4. **Configure a fonte (Source)**
   - Em **Build and deployment**
   - Em **Source**, selecione **GitHub Actions**
   
   ![Configuração do GitHub Pages](https://docs.github.com/assets/cb-47267/images/help/pages/pages-source.png)

5. **Salve as configurações**

---

## 📦 Como Fazer o Deploy

### Deploy Automático (Recomendado)

Após a configuração, o deploy acontece automaticamente:

1. Faça alterações no código
2. Commit das alterações: `git add .` e `git commit -m "mensagem"`
3. Push para o GitHub: `git push origin master`
4. O GitHub Actions detectará o push e iniciará o workflow automaticamente
5. Aguarde alguns minutos e acesse a URL da aplicação

### Deploy Manual

Você também pode executar o deploy manualmente:

1. Acesse a aba **Actions** no GitHub
2. Selecione o workflow **Deploy to GitHub Pages**
3. Clique em **Run workflow**
4. Selecione a branch `main` e clique em **Run workflow**

---

## 🔍 Monitoramento do Deploy

Para acompanhar o status do deploy:

1. Vá para a aba **Actions** no repositório do GitHub
2. Você verá todos os workflows executados
3. Clique em um workflow para ver os detalhes
4. Verde ✅ = sucesso, Vermelho ❌ = erro

### Logs Detalhados

- Clique em cada step (Checkout, Build, Deploy, etc.) para ver os logs detalhados
- Isso é útil para diagnosticar problemas caso o deploy falhe

---

## 🐛 Resolução de Problemas Comuns

### Erro 404 ao acessar rotas

**Problema:** A aplicação carrega na home, mas ao navegar para outras rotas retorna 404.

**Solução:** Certifique-se de que o `baseHref` está configurado corretamente no `angular.json`.

### Assets não carregam (imagens, CSS, etc.)

**Problema:** A aplicação carrega mas as imagens e estilos não aparecem.

**Solução:** Verifique se o `baseHref` está correto e se os assets estão no diretório `public/`.

### Workflow falha no step de Build

**Problema:** O workflow para no step "Build da aplicação".

**Solução:** 
- Verifique se não há erros de compilação no código
- Teste localmente: `npm run build:prod`
- Verifique os logs do GitHub Actions para erros específicos

### Permissões negadas

**Problema:** Erro de permissões ao fazer deploy.

**Solução:** 
- Verifique se as permissões estão configuradas corretamente no workflow
- Certifique-se de que o GitHub Pages está configurado para usar GitHub Actions

---

## ✅ Verificação Final

Após seguir todos os passos, verifique:

- [ ] O arquivo `angular.json` tem `outputPath` e `baseHref` configurados
- [ ] O `package.json` tem o script `build:prod`
- [ ] O arquivo `.github/workflows/deploy.yml` existe e está configurado
- [ ] O GitHub Pages está configurado para usar GitHub Actions
- [ ] O workflow foi executado com sucesso (aba Actions)
- [ ] A aplicação está acessível em https://DiegoGeoDev.github.io/pwa-benchmark/

---

## 📚 Referências

- [Documentação oficial do GitHub Pages](https://docs.github.com/pt/pages)
- [GitHub Actions - Deploy Pages](https://github.com/actions/deploy-pages)
- [Angular - Deployment](https://angular.dev/tools/cli/deployment)

---

## 🎓 Conceitos Aprendidos

1. **Base Href**: Importante para aplicações hospedadas em subdiretórios
2. **CI/CD**: Automação de build e deploy usando GitHub Actions
3. **GitHub Pages**: Hospedagem gratuita de sites estáticos
4. **Workflows**: Automação de tarefas usando YAML
5. **Build de Produção**: Otimização da aplicação para ambiente de produção

---

**Data da configuração:** Fevereiro de 2026
**Versão do Angular:** 21.1.0

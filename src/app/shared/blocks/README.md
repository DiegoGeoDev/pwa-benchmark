# PWA Scaffold System - Flutter-Inspired Components

Sistema completo de componentes para criar PWAs com aparência e comportamento de aplicativos nativos, inspirado no Flutter Scaffold.

## 🎯 Filosofia

Componentes headless e composáveis que funcionam como **"peças de LEGO"** - combine-os para criar qualquer layout de aplicativo mobile/PWA.

## 📦 Componentes Disponíveis

### Core Layout
- **[Scaffold](scaffold/README.md)** - Container principal estilo Flutter
- **[App Bar](scaffold/README.md#appbarcomponent)** - Barra superior sticky
- **[Scaffold Body](scaffold/README.md#scaffoldbodycomponent)** - Conteúdo com pull-to-refresh

### Navigation
- **[Header Toolbar](header/README.md)** - Toolbar com back, título e ações
- **[Bottom Navigation](bottom-navigation/README.md)** - Navegação inferior com Router
- **[Drawer](drawer/README.md)** - Menu lateral deslizante

### Actions
- **[FAB](fab/README.md)** - Floating Action Button
- **[Bottom Sheet](bottom-sheet/README.md)** - Modal inferior mobile

## 🚀 Quick Start

### Scaffold Completo

```typescript
import { Component, signal } from '@angular/core';
import { ScaffoldComponent, AppBarComponent, ScaffoldBodyComponent } from '@/shared/blocks/scaffold';
import { HeaderToolbarComponent, HeaderTitleComponent, HeaderActionsComponent } from '@/shared/blocks/header';
import { BottomNavigationBarComponent, NavItemComponent } from '@/shared/blocks/bottom-navigation';
import { FloatingActionButtonComponent } from '@/shared/blocks/fab';
import { DrawerComponent } from '@/shared/blocks/drawer';

@Component({
  selector: 'app-home',
  imports: [
    ScaffoldComponent,
    AppBarComponent,
    ScaffoldBodyComponent,
    HeaderToolbarComponent,
    HeaderTitleComponent,
    HeaderActionsComponent,
    BottomNavigationBarComponent,
    NavItemComponent,
    FloatingActionButtonComponent,
    DrawerComponent,
  ],
  template: `
    <!-- Layout Principal -->
    <z-scaffold>
      <!-- Barra Superior -->
      <z-app-bar>
        <z-header-toolbar>
          <z-header-title>Minha App</z-header-title>
          <z-header-actions>
            <button z-button zType="ghost">
              <z-icon zType="settings" />
            </button>
          </z-header-actions>
        </z-header-toolbar>
      </z-app-bar>

      <!-- Conteúdo Scrollável -->
      <z-scaffold-body zPadding="default">
        <h1>Conteúdo da Página</h1>
        <!-- Seu conteúdo aqui -->
      </z-scaffold-body>

      <!-- Navegação Inferior -->
      <z-bottom-navigation-bar>
        <z-nav-item routerLink="/" [zExact]="true" zIcon="house" zLabel="Home" />
        <z-nav-item routerLink="/search" zIcon="search" zLabel="Buscar" />
        <z-nav-item routerLink="/profile" zIcon="user" zLabel="Perfil" />
      </z-bottom-navigation-bar>
    </z-scaffold>

    <!-- Floating Action Button -->
    <z-fab 
      zIcon="plus" 
      (onClick)="handleCreate()"
    />

    <!-- Menu Lateral (Drawer) -->
    <z-drawer [zOpen]="isDrawerOpen()" (onClose)="closeDrawer()">
      <!-- Conteúdo do drawer -->
    </z-drawer>
  `,
})
export class HomePage {
  isDrawerOpen = signal(false);

  handleCreate(): void {
    console.log('Create new item');
  }

  closeDrawer(): void {
    this.isDrawerOpen.set(false);
  }
}
```

## 🎨 Exemplos de Layouts

### 1. Dashboard (Home Page)

```html
<z-scaffold>
  <z-app-bar>
    <z-header-toolbar>
      <z-header-title>Dashboard</z-header-title>
      <z-header-actions>
        <z-dark-mode-toggle />
        <button z-button zType="ghost">
          <z-icon zType="bell" />
        </button>
      </z-header-actions>
    </z-header-toolbar>
  </z-app-bar>

  <z-scaffold-body zPadding="default">
    <!-- Cards, widgets, etc -->
  </z-scaffold-body>

  <z-bottom-navigation-bar>
    <z-nav-item routerLink="/" zIcon="house" zLabel="Home" />
    <z-nav-item routerLink="/search" zIcon="search" zLabel="Buscar" />
    <z-nav-item routerLink="/profile" zIcon="user" zLabel="Perfil" />
  </z-bottom-navigation-bar>
</z-scaffold>
```

### 2. Página de Detalhes (com botão voltar)

```html
<z-scaffold>
  <z-app-bar>
    <z-header-toolbar>
      <z-header-back-action>
        <button z-button zType="ghost" zSize="sm" (click)="goBack()">
          <z-icon zType="arrow-left" />
        </button>
      </z-header-back-action>
      <z-header-title>Detalhes do Item</z-header-title>
      <z-header-actions>
        <button z-button zType="ghost" zSize="sm">
          <z-icon zType="heart" />
        </button>
        <button z-button zType="ghost" zSize="sm">
          <z-icon zType="ellipsis" />
        </button>
      </z-header-actions>
    </z-header-toolbar>
  </z-app-bar>

  <z-scaffold-body zPadding="default">
    <!-- Conteúdo do detalhe -->
  </z-scaffold-body>

  <z-fab 
    zIcon="settings" 
    (onClick)="handleEdit()"
  />
</z-scaffold>
```

### 3. Lista com Pull-to-Refresh

```html
<z-scaffold>
  <z-app-bar>
    <z-header-toolbar>
      <z-header-title>Minha Lista</z-header-title>
    </z-header-toolbar>
  </z-app-bar>

  <z-scaffold-body 
    zPadding="none" 
    [zRefreshable]="true" 
    (onRefresh)="handleRefresh()"
    #body
  >
    <z-icon pull-indicator zType="chevron-down" />
    <z-icon refresh-indicator zType="loader-circle" />

    @for (item of items(); track item.id) {
      <div class="p-4 border-b">{{ item.name }}</div>
    }
  </z-scaffold-body>

  <z-bottom-navigation-bar>
    <z-nav-item routerLink="/" zIcon="house" zLabel="Home" />
    <z-nav-item routerLink="/list" zIcon="list" zLabel="Lista" />
  </z-bottom-navigation-bar>
</z-scaffold>
```

### 4. Formulário com Bottom Sheet

```html
<z-scaffold>
  <z-app-bar>
    <z-header-toolbar>
      <z-header-back-action>
        <button z-button zType="ghost" zSize="sm" (click)="goBack()">
          <z-icon zType="arrow-left" />
        </button>
      </z-header-back-action>
      <z-header-title>Criar Item</z-header-title>
      <z-header-actions>
        <button z-button zType="default" zSize="sm" (click)="handleSave()">
          Salvar
        </button>
      </z-header-actions>
    </z-header-toolbar>
  </z-app-bar>

  <z-scaffold-body zPadding="default">
    <form>
      <!-- Form fields -->
    </form>
  </z-scaffold-body>
</z-scaffold>

<!-- Bottom Sheet para opções -->
<z-bottom-sheet [zOpen]="isOptionsOpen()" (onClose)="closeOptions()">
  <z-bottom-sheet-handle />
  <z-bottom-sheet-body>
    <button class="w-full p-4 text-left">Opção 1</button>
    <button class="w-full p-4 text-left">Opção 2</button>
  </z-bottom-sheet-body>
</z-bottom-sheet>
```

## 🧩 Composição de Componentes (LEGO Style)

### Peças Disponíveis:

```
┌─ z-scaffold ─────────────────────────┐
│  ┌─ z-app-bar ──────────────────┐    │
│  │  z-header-toolbar            │    │
│  └──────────────────────────────┘    │
│                                       │
│  ┌─ z-scaffold-body ────────────┐    │
│  │  Seu conteúdo aqui           │    │
│  │  (scrollável)                 │    │
│  └──────────────────────────────┘    │
│                                       │
│  ┌─ z-bottom-navigation-bar ────┐    │
│  │  z-nav-item x3               │    │
│  └──────────────────────────────┘    │
└───────────────────────────────────────┘

┌─ z-fab ───┐ (floating)
│  + icon   │
└───────────┘

┌─ z-drawer ─── (overlay)
│  Menu lateral
└──────────────

┌─ z-bottom-sheet ─ (overlay)
│  Modal inferior
└──────────────────
```

## 📱 Boas Práticas

### 1. **Use Scaffold em todas as páginas**
```typescript
// ✅ BOM
<z-scaffold>
  <z-app-bar>...</z-app-bar>
  <z-scaffold-body>...</z-scaffold-body>
</z-scaffold>

// ❌ EVITE
<div class="container">
  <router-outlet />
</div>
```

### 2. **Bottom Navigation para navegação principal**
```html
<!-- Use para 3-5 seções principais -->
<z-bottom-navigation-bar>
  <z-nav-item routerLink="/" zIcon="house" zLabel="Home" />
  <z-nav-item routerLink="/search" zIcon="search" zLabel="Buscar" />
  <z-nav-item routerLink="/profile" zIcon="user" zLabel="Perfil" />
</z-bottom-navigation-bar>
```

### 3. **Drawer para navegação secundária**
```html
<!-- Use para mais opções, settings, perfil -->
<z-drawer [zOpen]="isOpen()" (onClose)="close()">
  <!-- Menu completo com categorias -->
</z-drawer>
```

### 4. **FAB para ação principal**
```html
<!-- Uma ação primary por página -->
<z-fab zIcon="plus" (onClick)="createNew()" />
```

### 5. **Bottom Sheet para opções contextuais**
```html
<!-- Ações rápidas e formulários curtos -->
<z-bottom-sheet [zOpen]="isOpen()">
  <z-bottom-sheet-body>
    <!-- Opções -->
  </z-bottom-sheet-body>
</z-bottom-sheet>
```

## 🎯 Quando Usar Cada Componente

| Componente | Quando Usar |
|------------|-------------|
| **Scaffold** | Sempre - base de toda página |
| **App Bar** | Toda página precisa de header |
| **Header Toolbar** | Dentro do App Bar para navegação |
| **Bottom Navigation** | 3-5 seções principais do app |
| **Drawer** | Menu extenso, navegação secundária |
| **FAB** | Ação principal da página (criar, adicionar) |
| **Bottom Sheet** | Opções contextuais, formulários rápidos |
| **Pull-to-Refresh** | Listas que podem ser atualizadas |

## ✨ Features

- ✅ **Headless** - Totalmente customizável com Tailwind
- ✅ **Router Integration** - Bottom Nav e Drawer com routerLink
- ✅ **Pull-to-Refresh** - Nativo no Scaffold Body
- ✅ **Touch Gestures** - Swipe drawer, drag bottom sheet
- ✅ **Accessibility** - ARIA labels, roles, keyboard nav
- ✅ **Type-Safe** - Totalmente tipado com TypeScript
- ✅ **Signals** - Reactive state management
- ✅ **Mobile-First** - Desenhado para PWA/mobile

## 📚 Documentação Detalhada

- [Scaffold & App Bar](scaffold/README.md)
- [Header Toolbar](header/README.md)
- [Bottom Navigation](bottom-navigation/README.md)
- [Floating Action Button](fab/README.md)
- [Drawer](drawer/README.md)
- [Bottom Sheet](bottom-sheet/README.md)

## 🎨 Customização

Todos os componentes aceitam `class` input para customização:

```html
<z-scaffold class="bg-gradient-to-b from-blue-500 to-purple-500">
  <z-app-bar class="bg-transparent border-none">
    <z-header-toolbar class="text-white">
      <!-- ... -->
    </z-header-toolbar>
  </z-app-bar>
</z-scaffold>
```

## 🚀 Performance

- **OnPush Change Detection** em todos os componentes
- **Computed Signals** para classes CSS
- **Lazy Loading** ready (use com rotas)
- **Tree-shakeable** - importe apenas o necessário

---

Desenvolvido com ❤️ seguindo o padrão shadcn/ui + Flutter Scaffold

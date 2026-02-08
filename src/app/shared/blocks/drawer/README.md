# Drawer Component

Menu lateral deslizante com backdrop, perfeito para navegação e menus laterais.

## Componentes

- **DrawerComponent** (`z-drawer`) - Container do drawer
- **DrawerHeaderComponent** (`z-drawer-header`) - Cabeçalho
- **DrawerBodyComponent** (`z-drawer-body`) - Conteúdo scrollável
- **DrawerFooterComponent** (`z-drawer-footer`) - Rodapé

## Uso Básico

```typescript
import {
  DrawerComponent,
  DrawerHeaderComponent,
  DrawerBodyComponent,
  DrawerFooterComponent,
} from '@/shared/blocks/drawer';

@Component({
  imports: [
    DrawerComponent,
    DrawerHeaderComponent,
    DrawerBodyComponent,
    DrawerFooterComponent,
  ],
  template: `
    <z-drawer [zOpen]="isOpen()" (onClose)="handleClose()">
      <z-drawer-header>
        <h2>Menu</h2>
        <button (click)="handleClose()">Fechar</button>
      </z-drawer-header>

      <z-drawer-body>
        <!-- Conteúdo do menu -->
      </z-drawer-body>

      <z-drawer-footer>
        <p>Footer</p>
      </z-drawer-footer>
    </z-drawer>
  `,
})
```

## Drawer Simples

```typescript
@Component({
  template: `
    <button (click)="isDrawerOpen.set(true)">Abrir Menu</button>

    <z-drawer [zOpen]="isDrawerOpen()" (onClose)="isDrawerOpen.set(false)">
      <z-drawer-header>
        <h2 class="text-lg font-bold">Menu</h2>
        <button z-button zType="ghost" zSize="sm" (click)="isDrawerOpen.set(false)">
          <z-icon zType="x" />
        </button>
      </z-drawer-header>

      <z-drawer-body>
        <nav class="flex flex-col gap-2">
          <a routerLink="/" (click)="isDrawerOpen.set(false)">Home</a>
          <a routerLink="/about" (click)="isDrawerOpen.set(false)">About</a>
        </nav>
      </z-drawer-body>
    </z-drawer>
  `,
})
export class MyComponent {
  isDrawerOpen = signal(false);
}
```

## Props

### DrawerComponent

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `class` | `ClassValue` | `''` | Classes CSS adicionais |
| `zOpen` | `boolean` | `false` | Estado aberto/fechado |
| `zPosition` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'left'` | Posição do drawer |
| `zWidth` | `'sm' \| 'default' \| 'lg' \| 'full'` | `'default'` | Largura (left/right) |
| `zCloseOnBackdropClick` | `boolean` | `true` | Fecha ao clicar no backdrop |
| `ariaLabel` | `string` | `'Navigation drawer'` | Label acessível |

### Eventos

**DrawerComponent**
- `onClose` - Emitido ao fechar
- `onOpen` - Emitido ao abrir

## Exemplos

### Drawer à Direita

```html
<z-drawer [zOpen]="isOpen()" zPosition="right" (onClose)="handleClose()">
  <z-drawer-header>
    <h2>Settings</h2>
  </z-drawer-header>
  <z-drawer-body>
    <!-- Settings content -->
  </z-drawer-body>
</z-drawer>
```

### Drawer Superior

```html
<z-drawer [zOpen]="isOpen()" zPosition="top" (onClose)="handleClose()">
  <z-drawer-body>
    <!-- Notifications -->
  </z-drawer-body>
</z-drawer>
```

### Drawer Largo

```html
<z-drawer [zOpen]="isOpen()" zWidth="lg" (onClose)="handleClose()">
  <!-- Conteúdo -->
</z-drawer>
```

### Menu de Navegação Completo

```html
<z-drawer [zOpen]="isMenuOpen()" (onClose)="closeMenu()">
  <z-drawer-header>
    <h2 class="text-lg font-semibold">Menu</h2>
    <button z-button zType="ghost" zSize="sm" (click)="closeMenu()">
      <z-icon zType="x" />
    </button>
  </z-drawer-header>

  <z-drawer-body>
    <nav class="flex flex-col gap-2">
      <a 
        routerLink="/"
        routerLinkActive="bg-accent"
        class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent"
        (click)="closeMenu()"
      >
        <z-icon zType="house" />
        <span>Home</span>
      </a>
      <a 
        routerLink="/dashboard"
        routerLinkActive="bg-accent"
        class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent"
        (click)="closeMenu()"
      >
        <z-icon zType="layout-dashboard" />
        <span>Dashboard</span>
      </a>
      <a 
        routerLink="/settings"
        routerLinkActive="bg-accent"
        class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent"
        (click)="closeMenu()"
      >
        <z-icon zType="settings" />
        <span>Settings</span>
      </a>
    </nav>
  </z-drawer-body>

  <z-drawer-footer>
    <p class="text-sm text-muted-foreground">v1.0.0</p>
  </z-drawer-footer>
</z-drawer>
```

### Com User Profile

```html
<z-drawer [zOpen]="isOpen()" (onClose)="handleClose()">
  <z-drawer-header class="flex-col items-start gap-4">
    <div class="flex items-center gap-3">
      <div class="w-12 h-12 rounded-full bg-primary"></div>
      <div>
        <p class="font-semibold">João Silva</p>
        <p class="text-sm text-muted-foreground">joao@email.com</p>
      </div>
    </div>
    <button z-button zType="ghost" zSize="sm" (click)="handleClose()">
      <z-icon zType="x" />
    </button>
  </z-drawer-header>

  <z-drawer-body>
    <!-- Menu items -->
  </z-drawer-body>
</z-drawer>
```

## Acessibilidade

- Usa `role="dialog"` 
- Backdrop clicável para fechar
- Foca o drawer ao abrir
- ESC fecha o drawer (implementar)
- `aria-hidden` quando fechado
- Previne scroll do body quando aberto

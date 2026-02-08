# Bottom Navigation Component

Navegação inferior estilo mobile com integração automática ao Angular Router.

## Componentes

- **BottomNavigationBarComponent** (`z-bottom-navigation-bar`) - Barra de navegação
- **NavItemComponent** (`z-nav-item`) - Item de navegação

## Uso Básico

```typescript
import { BottomNavigationBarComponent, NavItemComponent } from '@/shared/blocks/bottom-navigation';

@Component({
  imports: [BottomNavigationBarComponent, NavItemComponent],
  template: `
    <z-bottom-navigation-bar>
      <z-nav-item routerLink="/" [zExact]="true" zIcon="house" zLabel="Home" />
      <z-nav-item routerLink="/search" zIcon="search" zLabel="Buscar" />
      <z-nav-item routerLink="/profile" zIcon="user" zLabel="Perfil" />
    </z-bottom-navigation-bar>
  `,
})
```

## Com Router Automático

```html
<!-- Automatically highlights active route -->
<z-bottom-navigation-bar>
  <z-nav-item routerLink="/" [zExact]="true" zIcon="house" zLabel="Home" />
  <z-nav-item routerLink="/favorites" zIcon="heart" zLabel="Favoritos" />
  <z-nav-item routerLink="/settings" zIcon="settings" zLabel="Config" />
</z-bottom-navigation-bar>
```

## Com Click Manual

```html
<z-bottom-navigation-bar>
  <z-nav-item 
    zIcon="house" 
    zLabel="Home" 
    [zActive]="currentTab === 'home'"
    (onClick)="changeTab('home')"
  />
  <z-nav-item 
    zIcon="search" 
    zLabel="Buscar"
    [zActive]="currentTab === 'search'"
    (onClick)="changeTab('search')"
  />
</z-bottom-navigation-bar>
```

## Props

### BottomNavigationBarComponent

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `class` | `ClassValue` | `''` | Classes CSS adicionais |
| `zSize` | `'sm' \| 'default' \| 'lg'` | `'default'` | Altura da barra |
| `zElevation` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Sombra |

### NavItemComponent

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `class` | `ClassValue` | `''` | Classes CSS adicionais |
| `zIcon` | `ZardIcon` | - | Ícone do item |
| `zLabel` | `string` | `''` | Label do item |
| `zActive` | `boolean` | `false` | Item ativo (manual) |
| `zDisabled` | `boolean` | `false` | Desabilitar item |
| `zShowLabel` | `boolean` | `true` | Mostrar label |
| `zSize` | `'sm' \| 'default' \| 'lg'` | `'default'` | Tamanho |
| `routerLink` | `string \| any[]` | - | Link do router |
| `zExact` | `boolean` | `false` | Match exato do router |
| `ariaLabel` | `string` | `''` | Label acessível |

### Eventos

**NavItemComponent**
- `onClick` - Emitido ao clicar

## Exemplos

### Apenas Ícones

```html
<z-bottom-navigation-bar>
  <z-nav-item routerLink="/" zIcon="house" [zShowLabel]="false" ariaLabel="Home" />
  <z-nav-item routerLink="/search" zIcon="search" [zShowLabel]="false" ariaLabel="Search" />
  <z-nav-item routerLink="/profile" zIcon="user" [zShowLabel]="false" ariaLabel="Profile" />
</z-bottom-navigation-bar>
```

### Com Badge/Notificações

```html
<z-nav-item routerLink="/notifications" zIcon="bell" zLabel="Notificações" class="relative">
  <span class="absolute top-2 right-4 w-2 h-2 bg-red-500 rounded-full"></span>
</z-nav-item>
```

### Tamanho Customizado

```html
<z-bottom-navigation-bar zSize="lg" zElevation="lg">
  <z-nav-item zSize="lg" routerLink="/" zIcon="house" zLabel="Home" />
  <z-nav-item zSize="lg" routerLink="/search" zIcon="search" zLabel="Buscar" />
</z-bottom-navigation-bar>
```

## Acessibilidade

- Usa `role="navigation"` na barra
- Cada item é focável via teclado
- Suporta `aria-label` customizado
- Active state via `aria-current="page"`
- Ativação via Enter/Space

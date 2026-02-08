# Scaffold Component

Componente principal de layout estilo Flutter/Mobile, perfeito para PWAs que precisam se comportar como aplicativos nativos.

## Componentes

- **ScaffoldComponent** (`z-scaffold`) - Container principal
- **AppBarComponent** (`z-app-bar`) - Barra superior
- **ScaffoldBodyComponent** (`z-scaffold-body`) - Área de conteúdo scrollável com pull-to-refresh

## Uso Básico

```typescript
import {
  ScaffoldComponent,
  AppBarComponent,
  ScaffoldBodyComponent,
} from '@/shared/blocks/scaffold';
import { HeaderToolbarComponent } from '@/shared/blocks/header';

@Component({
  imports: [
    ScaffoldComponent,
    AppBarComponent,
    ScaffoldBodyComponent,
    HeaderToolbarComponent,
  ],
  template: `
    <z-scaffold>
      <z-app-bar>
        <z-header-toolbar>
          <z-header-title>Minha App</z-header-title>
        </z-header-toolbar>
      </z-app-bar>

      <z-scaffold-body>
        <!-- Seu conteúdo aqui -->
      </z-scaffold-body>
    </z-scaffold>
  `,
})
```

## Pull-to-Refresh

```typescript
import { ScaffoldBodyComponent } from '@/shared/blocks/scaffold';
import { ZardIconComponent } from '@/shared/components/icon';

@Component({
  imports: [ScaffoldBodyComponent, ZardIconComponent],
  template: `
    <z-scaffold-body [zRefreshable]="true" (onRefresh)="handleRefresh()" #body>
      <!-- Indicador de pull (opcional) -->
      <z-icon pull-indicator zType="chevron-down" />
      
      <!-- Indicador de refresh (opcional) -->
      <z-icon refresh-indicator zType="loader-circle" />

      <!-- Conteúdo -->
      <div>{{ content }}</div>
    </z-scaffold-body>
  `,
})
export class MyComponent {
  handleRefresh(): void {
    // Carregar dados
    setTimeout(() => {
      body.resetRefresh(); // Resetar estado após carregar
    }, 1000);
  }
}
```

## Props

### ScaffoldComponent

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `class` | `ClassValue` | `''` | Classes CSS adicionais |
| `zSafeArea` | `boolean` | `false` | Ativa safe areas para notch/home indicator |

### AppBarComponent

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `class` | `ClassValue` | `''` | Classes CSS adicionais |
| `zElevation` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'none'` | Sombra do app bar |
| `zTransparent` | `boolean` | `false` | App bar transparente |
| `zSticky` | `boolean` | `true` | App bar fixo no topo |

### ScaffoldBodyComponent

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `class` | `ClassValue` | `''` | Classes CSS adicionais |
| `zPadding` | `'none' \| 'sm' \| 'default' \| 'lg'` | `'none'` | Padding do conteúdo |
| `zRefreshable` | `boolean` | `false` | Ativa pull-to-refresh |

### Eventos

**ScaffoldBodyComponent**
- `onRefresh` - Emitido quando pull-to-refresh é ativado
- `onScroll` - Emitido durante o scroll com posição

## Exemplos

### Scaffold Completo

```html
<z-scaffold>
  <z-app-bar [zElevation]="'md'">
    <z-header-toolbar>
      <z-header-back-action>
        <button z-button zType="ghost" zSize="sm">
          <z-icon zType="arrow-left" />
        </button>
      </z-header-back-action>
      <z-header-title>Dashboard</z-header-title>
      <z-header-actions>
        <button z-button zType="ghost" zSize="sm">
          <z-icon zType="settings" />
        </button>
      </z-header-actions>
    </z-header-toolbar>
  </z-app-bar>

  <z-scaffold-body zPadding="default">
    <h1>Conteúdo</h1>
  </z-scaffold-body>
</z-scaffold>
```

### Com Safe Areas (iOS)

```html
<z-scaffold [zSafeArea]="true">
  <!-- Conteúdo se ajusta automaticamente ao notch -->
</z-scaffold>
```

## Acessibilidade

- Usa `role="main"` no scaffold
- App bar marcado semanticamente
- Pull-to-refresh acessível via touch

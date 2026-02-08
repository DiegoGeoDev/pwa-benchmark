# Header Toolbar Component

Componente de header reutilizável e headless seguindo a filosofia do shadcn/ui. Perfeito para criar toolbars de aplicativo com slots para ações personalizadas.

## Header por página

### Vantagens:

1. Flexibilidade Total - Cada página controla seu próprio header (título, ações, estilo)
2. Componentes Opcionais - Páginas que não precisam de header não o incluem
3. Simplicidade - Não precisa de serviço de estado complexo para sincronizar
4.Customização Fácil - Sticky em uma página, não sticky em outra
5. Segue a Filosofia - Componentes composáveis e independentes (shadcn/ui)
6. Manutenção Clara - Mudanças no header de uma página não afetam outras

## Componentes

- **HeaderToolbarComponent** (`z-header-toolbar`) - Container principal
- **HeaderBackActionComponent** (`z-header-back-action`) - Slot para ação de voltar (esquerda)
- **HeaderTitleComponent** (`z-header-title`) - Título centralizado
- **HeaderActionsComponent** (`z-header-actions`) - Slot para ações adicionais (direita)

## Uso Básico

```typescript
import {
  HeaderToolbarComponent,
  HeaderBackActionComponent,
  HeaderTitleComponent,
  HeaderActionsComponent,
} from './shared/blocks/header';
import { ZardButtonComponent } from './shared/components/button';
import { ZardIconComponent } from './shared/components/icon';

@Component({
  selector: 'app-example',
  imports: [
    HeaderToolbarComponent,
    HeaderBackActionComponent,
    HeaderTitleComponent,
    HeaderActionsComponent,
    ZardButtonComponent,
    ZardIconComponent,
  ],
  template: `
    <z-header-toolbar>
      <z-header-back-action>
        <button z-button zType="ghost" zSize="sm" (click)="goBack()">
          <z-icon zType="arrow-left" />
        </button>
      </z-header-back-action>

      <z-header-title>
        Título da Página
      </z-header-title>

      <z-header-actions>
        <button z-button zType="ghost" zSize="sm">
          <z-icon zType="search" />
        </button>
        <button z-button zType="ghost" zSize="sm">
          <z-icon zType="more-vertical" />
        </button>
      </z-header-actions>
    </z-header-toolbar>
  `,
})
export class ExampleComponent {
  goBack() {
    // Lógica para voltar
  }
}
```

## Variantes

### Tamanhos

```html
<!-- Pequeno -->
<z-header-toolbar zSize="sm">
  ...
</z-header-toolbar>

<!-- Padrão -->
<z-header-toolbar zSize="default">
  ...
</z-header-toolbar>

<!-- Grande -->
<z-header-toolbar zSize="lg">
  ...
</z-header-toolbar>
```

### Sticky Header

```html
<z-header-toolbar [zSticky]="true">
  ...
</z-header-toolbar>
```

## Uso Avançado

### Apenas Título (sem ações)

```html
<z-header-toolbar>
  <z-header-title>
    Meu Título
  </z-header-title>
</z-header-toolbar>
```

### Com Múltiplas Ações

```html
<z-header-toolbar>
  <z-header-back-action>
    <button z-button zType="ghost" zSize="sm">
      <z-icon zType="arrow-left" />
    </button>
  </z-header-back-action>

  <z-header-title>
    Dashboard
  </z-header-title>

  <z-header-actions>
    <button z-button zType="ghost" zSize="sm">
      <z-icon zType="bell" />
    </button>
    <button z-button zType="ghost" zSize="sm">
      <z-icon zType="settings" />
    </button>
    <button z-button zType="default" zSize="sm">
      Criar Novo
    </button>
  </z-header-actions>
</z-header-toolbar>
```

### Título com Subtítulo

```html
<z-header-toolbar zSize="lg">
  <z-header-back-action>
    <button z-button zType="ghost">
      <z-icon zType="arrow-left" />
    </button>
  </z-header-back-action>

  <z-header-title class="flex-col gap-0">
    <span class="font-bold">Título Principal</span>
    <span class="text-xs text-muted-foreground font-normal">Subtítulo</span>
  </z-header-title>

  <z-header-actions>
    <button z-button zType="default">
      Salvar
    </button>
  </z-header-actions>
</z-header-toolbar>
```

### Customização com Classes

```html
<z-header-toolbar class="bg-primary text-primary-foreground border-none">
  <z-header-back-action>
    <button z-button zType="ghost" class="text-primary-foreground hover:bg-primary-foreground/10">
      <z-icon zType="arrow-left" />
    </button>
  </z-header-back-action>

  <z-header-title class="text-primary-foreground">
    Header Customizado
  </z-header-title>

  <z-header-actions>
    <button z-button zType="ghost" class="text-primary-foreground">
      <z-icon zType="share" />
    </button>
  </z-header-actions>
</z-header-toolbar>
```

## Acessibilidade

O header é acessível por padrão:

- O elemento `<header>` possui `role="banner"`
- Os botões podem receber foco via teclado
- As ações podem ser ativadas via Enter ou Space
- O título usa truncamento de texto apropriado

## Props

### HeaderToolbarComponent

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `class` | `ClassValue` | `''` | Classes CSS adicionais |
| `zSize` | `'sm' \| 'default' \| 'lg'` | `'default'` | Tamanho do header |
| `zSticky` | `boolean` | `false` | Torna o header sticky no topo |

### HeaderBackActionComponent / HeaderTitleComponent / HeaderActionsComponent

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `class` | `ClassValue` | `''` | Classes CSS adicionais |
| `zSize` | `'sm' \| 'default' \| 'lg'` | `'default'` | Tamanho (spacing) |

## Filosofia

Este componente segue a filosofia headless do shadcn/ui:

- **Composável**: Cada parte do header é um componente separado
- **Flexível**: Use apenas as partes que você precisa
- **Estilizável**: Customize com classes CSS do Tailwind
- **Acessível**: Semântica HTML apropriada e navegação por teclado
- **Type-safe**: Totalmente tipado com TypeScript

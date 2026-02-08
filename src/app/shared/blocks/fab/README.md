# Floating Action Button (FAB)

Botão de ação flutuante estilo Material Design, perfeito para ações primárias rápidas.

## Componente

- **FloatingActionButtonComponent** (`z-fab`) - Botão flutuante

## Uso Básico

```typescript
import { FloatingActionButtonComponent } from '@/shared/blocks/fab';

@Component({
  imports: [FloatingActionButtonComponent],
  template: `
    <z-fab zIcon="plus" (onClick)="handleCreate()" />
  `,
})
```

## FAB Simples

```html
<z-fab 
  zIcon="plus" 
  ariaLabel="Criar novo item"
  (onClick)="handleCreate()"
/>
```

## FAB Extendido (com label)

```html
<z-fab 
  [zExtended]="true"
  zIcon="plus" 
  zLabel="Criar Novo"
  (onClick)="handleCreate()"
/>
```

## Com Router

```html
<z-fab 
  zIcon="plus" 
  routerLink="/create"
  ariaLabel="Criar novo"
/>
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `class` | `ClassValue` | `''` | Classes CSS adicionais |
| `zIcon` | `ZardIcon` | - | Ícone do FAB |
| `zLabel` | `string` | `''` | Label (para extended) |
| `zPosition` | `'bottom-right' \| 'bottom-left' \| 'bottom-center' \| 'top-right' \| 'top-left' \| 'top-center'` | `'bottom-right'` | Posicionamento |
| `zSize` | `'sm' \| 'default' \| 'lg'` | `'default'` | Tamanho |
| `zExtended` | `boolean` | `false` | FAB com label |
| `zElevation` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'lg'` | Sombra |
| `zDisabled` | `boolean` | `false` | Desabilitar FAB |
| `routerLink` | `string \| any[]` | - | Link do router |
| `ariaLabel` | `string` | `''` | Label acessível |

### Eventos

- `onClick` - Emitido ao clicar

## Exemplos

### Posições Diferentes

```html
<!-- Bottom right (padrão) -->
<z-fab zIcon="plus" />

<!-- Bottom left -->
<z-fab zIcon="plus" zPosition="bottom-left" />

<!-- Top right -->
<z-fab zIcon="plus" zPosition="top-right" />

<!-- Bottom center -->
<z-fab zIcon="plus" zPosition="bottom-center" />
```

### Tamanhos

```html
<!-- Pequeno -->
<z-fab zIcon="plus" zSize="sm" />

<!-- Padrão -->
<z-fab zIcon="plus" zSize="default" />

<!-- Grande -->
<z-fab zIcon="plus" zSize="lg" />
```

### FAB Extendido

```html
<z-fab 
  [zExtended]="true"
  zIcon="plus" 
  zLabel="Criar Novo"
  zPosition="bottom-right"
/>
```

### Com Ícone Customizado

```html
<z-fab 
  zIcon="star" 
  class="bg-yellow-500 hover:bg-yellow-600"
  ariaLabel="Favoritar"
/>
```

### FAB Condicional

```html
@if (showFab()) {
  <z-fab 
    zIcon="plus" 
    (onClick)="handleCreate()"
  />
}
```

### Múltiplos FABs

```html
<!-- FAB principal -->
<z-fab 
  zIcon="plus" 
  zPosition="bottom-right"
  (onClick)="handleCreate()"
/>

<!-- FAB secundário -->
<z-fab 
  zIcon="message" 
  zPosition="bottom-left"
  zSize="sm"
  class="bg-blue-500"
  (onClick)="handleMessage()"
/>
```

## Acessibilidade

- Focável via teclado
- Label acessível via `aria-label`
- Ativação via Enter/Space
- Hover/focus indicators
- Estado disabled visível

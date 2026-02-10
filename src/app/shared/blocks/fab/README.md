# Floating Action Button (FAB)

Botão de ação flutuante, perfeito para ações primárias rápidas.

## Componente

- **FloatingActionButtonComponent** (`z-fab`) - Botão flutuante

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

## Acessibilidade

- Focável via teclado
- Label acessível via `aria-label`
- Ativação via Enter/Space
- Hover/focus indicators
- Estado disabled visível

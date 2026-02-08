# Bottom Sheet Component

Modal mobile que aparece na parte inferior da tela, perfeito para ações rápidas e opções.

## Componentes

- **BottomSheetComponent** (`z-bottom-sheet`) - Container do sheet
- **BottomSheetHandleComponent** (`z-bottom-sheet-handle`) - Handle para arrastar
- **BottomSheetHeaderComponent** (`z-bottom-sheet-header`) - Cabeçalho
- **BottomSheetBodyComponent** (`z-bottom-sheet-body`) - Conteúdo scrollável
- **BottomSheetFooterComponent** (`z-bottom-sheet-footer`) - Rodapé com ações

## Uso Básico

```typescript
import {
  BottomSheetComponent,
  BottomSheetHandleComponent,
  BottomSheetHeaderComponent,
  BottomSheetBodyComponent,
  BottomSheetFooterComponent,
} from '@/shared/blocks/bottom-sheet';

@Component({
  imports: [
    BottomSheetComponent,
    BottomSheetHandleComponent,
    BottomSheetHeaderComponent,
    BottomSheetBodyComponent,
    BottomSheetFooterComponent,
  ],
  template: `
    <z-bottom-sheet [zOpen]="isOpen()" (onClose)="handleClose()">
      <z-bottom-sheet-handle />
      
      <z-bottom-sheet-header>
        <h2>Título</h2>
      </z-bottom-sheet-header>

      <z-bottom-sheet-body>
        <!-- Conteúdo -->
      </z-bottom-sheet-body>

      <z-bottom-sheet-footer>
        <button z-button (click)="handleClose()">Fechar</button>
      </z-bottom-sheet-footer>
    </z-bottom-sheet>
  `,
})
```

## Bottom Sheet Simples

```typescript
@Component({
  template: `
    <button (click)="isSheetOpen.set(true)">Abrir</button>

    <z-bottom-sheet [zOpen]="isSheetOpen()" (onClose)="isSheetOpen.set(false)">
      <z-bottom-sheet-handle />
      
      <z-bottom-sheet-body class="min-h-50>
        <h3 class="text-lg font-bold mb-4">Opções</h3>
        <div class="space-y-2">
          <button class="w-full p-3 text-left hover:bg-accent rounded">Opção 1</button>
          <button class="w-full p-3 text-left hover:bg-accent rounded">Opção 2</button>
          <button class="w-full p-3 text-left hover:bg-accent rounded">Opção 3</button>
        </div>
      </z-bottom-sheet-body>
    </z-bottom-sheet>
  `,
})
export class MyComponent {
  isSheetOpen = signal(false);
}
```

## Props

### BottomSheetComponent

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `class` | `ClassValue` | `''` | Classes CSS adicionais |
| `zOpen` | `boolean` | `false` | Estado aberto/fechado |
| `zSnap` | `boolean` | `false` | Snap points (experimental) |
| `zCloseOnBackdropClick` | `boolean` | `true` | Fecha ao clicar no backdrop |
| `zDraggable` | `boolean` | `true` | Permite arrastar para fechar |
| `ariaLabel` | `string` | `'Bottom sheet'` | Label acessível |

### Eventos

**BottomSheetComponent**
- `onClose` - Emitido ao fechar
- `onOpen` - Emitido ao abrir

## Exemplos

### Menu de Opções

```html
<z-bottom-sheet [zOpen]="isOpen()" (onClose)="handleClose()">
  <z-bottom-sheet-handle />
  
  <z-bottom-sheet-body class="py-4">
    <div class="space-y-1">
      <button 
        class="w-full flex items-center gap-3 px-6 py-3 hover:bg-accent"
        (click)="handleShare(); handleClose()"
      >
        <z-icon zType="arrow-up-right" />
        <span>Compartilhar</span>
      </button>
      <button 
        class="w-full flex items-center gap-3 px-6 py-3 hover:bg-accent"
        (click)="handleEdit(); handleClose()"
      >
        <z-icon zType="settings" />
        <span>Editar</span>
      </button>
      <button 
        class="w-full flex items-center gap-3 px-6 py-3 hover:bg-accent text-destructive"
        (click)="handleDelete(); handleClose()"
      >
        <z-icon zType="trash" />
        <span>Excluir</span>
      </button>
    </div>
  </z-bottom-sheet-body>
</z-bottom-sheet>
```

### Formulário

```html
<z-bottom-sheet [zOpen]="isOpen()" (onClose)="handleClose()">
  <z-bottom-sheet-handle />
  
  <z-bottom-sheet-header>
    <h2 class="text-lg font-bold">Adicionar Item</h2>
    <button z-button zType="ghost" zSize="sm" (click)="handleClose()">
      <z-icon zType="x" />
    </button>
  </z-bottom-sheet-header>

  <z-bottom-sheet-body>
    <form class="space-y-4">
      <div>
        <label class="text-sm font-medium">Nome</label>
        <input type="text" class="w-full mt-1 p-2 border rounded" />
      </div>
      <div>
        <label class="text-sm font-medium">Descrição</label>
        <textarea class="w-full mt-1 p-2 border rounded" rows="3"></textarea>
      </div>
    </form>
  </z-bottom-sheet-body>

  <z-bottom-sheet-footer>
    <button z-button zType="ghost" (click)="handleClose()">
      Cancelar
    </button>
    <button z-button zType="default" (click)="handleSave()">
      Salvar
    </button>
  </z-bottom-sheet-footer>
</z-bottom-sheet>
```

### Lista Scrollável

```html
<z-bottom-sheet [zOpen]="isOpen()" (onClose)="handleClose()">
  <z-bottom-sheet-handle />
  
  <z-bottom-sheet-header>
    <h2 class="text-lg font-bold">Selecione um Item</h2>
  </z-bottom-sheet-header>

  <z-bottom-sheet-body class="max-h-96">
    @for (item of items(); track item.id) {
      <button 
        class="w-full text-left px-6 py-3 hover:bg-accent border-b"
        (click)="selectItem(item); handleClose()"
      >
        {{ item.name }}
      </button>
    }
  </z-bottom-sheet-body>
</z-bottom-sheet>
```

### Confirmação

```html
<z-bottom-sheet [zOpen]="isOpen()" (onClose)="handleClose()">
  <z-bottom-sheet-body class="text-center py-8 px-6">
    <div class="w-12 h-12 rounded-full bg-destructive/10 mx-auto mb-4 flex items-center justify-center">
      <z-icon zType="trash" class="text-destructive" />
    </div>
    <h3 class="text-lg font-bold mb-2">Excluir Item?</h3>
    <p class="text-muted-foreground mb-6">
      Esta ação não pode ser desfeita.
    </p>
    <div class="flex gap-3">
      <button z-button zType="ghost" class="flex-1" (click)="handleClose()">
        Cancelar
      </button>
      <button z-button zType="destructive" class="flex-1" (click)="handleConfirm()">
        Excluir
      </button>
    </div>
  </z-bottom-sheet-body>
</z-bottom-sheet>
```

## Comportamento

- **Backdrop**: Clique fecha o sheet (se `zCloseOnBackdropClick` estiver true)
- **Drag**: Arraste para baixo para fechar (se `zDraggable` estiver true)
- **Handle**: Indicador visual para arrastar
- **Body Scroll**: Previne scroll do body quando aberto

## Acessibilidade

- Usa `role="dialog"` e `aria-modal="true"`
- Backdrop clicável para fechar
- Handle com `aria-label="Drag to close"`
- `aria-hidden` quando fechado
- Previne scroll do body quando aberto

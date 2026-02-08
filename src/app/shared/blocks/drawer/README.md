# Drawer

Um componente trigger que abre o Sheet lateral, tipicamente usado para menus de navegação ou painéis laterais. Este block aproveita o componente primitivo Sheet para todas as funcionalidades.

## Filosofia

O Drawer é um block de composição que usa o primitivo Sheet. Em vez de duplicar a lógica do Sheet, ele fornece um botão trigger conveniente e padrões sensatos para casos de uso de painéis laterais (side='left', ícone de navegação, etc.).

## Componentes

### DrawerTriggerComponent

Um botão que abre um Sheet com configurações padrão de drawer.

#### Uso Básico

```typescript
import { Component } from '@angular/core';
import { DrawerTriggerComponent } from '@/shared/blocks/drawer';

@Component({
  selector: 'app-navigation',
  imports: [DrawerTriggerComponent],
  template: `
    <z-drawer-trigger
      zTitle="Navegação"
      [zContent]="NavigationContent"
      [zHideFooter]="true"
    >
      Menu
    </z-drawer-trigger>
  `
})
export class AppNavigationComponent {
  NavigationContent = NavigationContentComponent;
}

@Component({
  template: `
    <nav class="flex flex-col gap-2 p-4">
      <a href="/home">Home</a>
      <a href="/sobre">Sobre</a>
      <a href="/contato">Contato</a>
    </nav>
  `
})
class NavigationContentComponent {}
```

#### Exemplo Avançado com Dados

```typescript
import { Component, inject } from '@angular/core';
import { DrawerTriggerComponent } from '@/shared/blocks/drawer';
import { Z_SHEET_DATA } from '@/shared/components/sheet';
import { ZardIconComponent } from '@/shared/components/icon';

interface UserData {
  name: string;
  email: string;
}

@Component({
  imports: [DrawerTriggerComponent, ZardIconComponent],
  template: `
    <z-drawer-trigger
      zTitle="Editar Perfil"
      zDescription="Atualize suas informações de perfil"
      [zContent]="ProfileForm"
      [zData]="userData"
      zOkText="Salvar"
    >
      <z-icon zType="user" />
      Perfil
    </z-drawer-trigger>
  `
})
export class ProfileTriggerComponent {
  userData: UserData = {
    name: 'João Silva',
    email: 'joao@example.com'
  };
  
  ProfileForm = ProfileFormComponent;
}

@Component({
  template: `
    <form class="flex flex-col gap-4 p-4">
      <input z-input [value]="data.name" placeholder="Nome" />
      <input z-input [value]="data.email" placeholder="Email" />
    </form>
  `
})
class ProfileFormComponent {
  data = inject<UserData>(Z_SHEET_DATA);
}
```

#### Usando o Sheet Service Diretamente

Para mais controle, você pode usar o Sheet service diretamente:

```typescript
import { Component, inject } from '@angular/core';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardIconComponent } from '@/shared/components/icon';
import { ZardSheetService } from '@/shared/components/sheet';

@Component({
  imports: [ZardButtonComponent, ZardIconComponent],
  template: `
    <button z-button zType="ghost" (click)="openDrawer()">
      <z-icon zType="panel-left" />
      Navegação
    </button>
  `
})
export class CustomDrawerComponent {
  private sheetService = inject(ZardSheetService);

  openDrawer() {
    this.sheetService.create({
      zTitle: 'Navegação',
      zSide: 'left',
      zSize: 'default',
      zContent: NavigationContent,
      zHideFooter: true,
      zMaskClosable: true
    });
  }
}
```

#### Inputs

| Input | Tipo | Padrão | Descrição |
|-------|------|---------|-------------|
| `class` | `ClassValue` | `''` | Classes CSS adicionais |
| `zIcon` | `string` | `'panel-left'` | Tipo do ícone para o botão |
| `zButtonType` | `'default' \| 'outline' \| 'ghost'` | `'ghost'` | Estilo visual do botão |
| `zTitle` | `string \| TemplateRef<T>` | - | Título do sheet |
| `zDescription` | `string` | - | Descrição do sheet |
| `zContent` | `string \| TemplateRef<T> \| Type<T>` | **obrigatório** | Componente/template do conteúdo |
| `zData` | `U` | - | Dados passados para o componente |
| `zSide` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'left'` | Lado de abertura |
| `zSize` | `'sm' \| 'default' \| 'lg'` | `'default'` | Largura do sheet |
| `zOkText` | `string \| null` | `'OK'` | Texto do botão OK (null para ocultar) |
| `zCancelText` | `string \| null` | `'Cancel'` | Texto do botão Cancelar (null para ocultar) |
| `zClosable` | `boolean` | `true` | Mostrar botão de fechar |
| `zMaskClosable` | `boolean` | `true` | Fechar ao clicar no backdrop |
| `zHideFooter` | `boolean` | `false` | Ocultar botões do rodapé |

#### Slots

- **Default**: Conteúdo do botão trigger (texto/ícones)

## Notas

- Usa o componente primitivo Sheet internamente
- Todas as funcionalidades do Sheet estão disponíveis (backdrop, animações, portal, etc.)
- Comportamento padrão otimizado para drawers de navegação (side='left', botão ghost)
- Para implementações customizadas, use `ZardSheetService` diretamente
- Componentes de conteúdo podem injetar `Z_SHEET_DATA` para acessar dados passados

## Acessibilidade

- Botão tem gerenciamento de foco apropriado
- Sheet lida com navegação por teclado (Escape para fechar)
- Labels ARIA aplicados automaticamente
- Suporta leitores de tela

## Relacionados

- [Sheet Component](../../components/sheet/README.md) - O componente primitivo
- [Bottom Sheet](../bottom-sheet/README.md) - Padrão similar para painéis inferiores

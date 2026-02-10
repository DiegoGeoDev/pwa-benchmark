/**
 * Exemplos de uso do Header Toolbar
 *
 * Este arquivo demonstra diferentes cenários de uso do componente header toolbar
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HeaderToolbarComponent, HeaderTitleComponent, HeaderActionsComponent } from './index';
import { ZardButtonComponent } from '../../components/button';
import { ZardIconComponent } from '../../components/icon';

/**
 * Exemplo 1: Header simples sem ações
 */
@Component({
  selector: 'app-simple-header-example',
  imports: [HeaderToolbarComponent, HeaderTitleComponent],
  template: `
    <z-header-toolbar>
      <z-header-title>Minha Página</z-header-title>
    </z-header-toolbar>
  `,
})
export class SimpleHeaderExample {}

/**
 * Exemplo 2: Header com navegação básica
 */
@Component({
  selector: 'app-navigation-header-example',
  imports: [
    HeaderToolbarComponent,
    HeaderTitleComponent,
    ZardButtonComponent,
    ZardIconComponent,
    HeaderActionsComponent,
  ],
  template: `
    <z-header-toolbar>
      <z-header-actions>
        <button z-button zType="ghost" zSize="sm" (click)="goBack()">
          <z-icon zType="arrow-left" />
        </button>
      </z-header-actions>

      <z-header-title>Detalhes</z-header-title>
    </z-header-toolbar>
  `,
})
export class NavigationHeaderExample {
  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['..']);
  }
}

/**
 * Exemplo 3: Header com múltiplas ações
 */
@Component({
  selector: 'app-actions-header-example',
  imports: [
    HeaderToolbarComponent,
    HeaderTitleComponent,
    HeaderActionsComponent,
    ZardButtonComponent,
    ZardIconComponent,
  ],
  template: `
    <z-header-toolbar>
      <z-header-actions>
        <button z-button zType="ghost" zSize="sm" (click)="goBack()">
          <z-icon zType="arrow-left" />
        </button>
      </z-header-actions>

      <z-header-title>Editar Perfil</z-header-title>

      <z-header-actions>
        <button z-button zType="ghost" zSize="sm" (click)="handleSettings()">
          <z-icon zType="settings" />
        </button>
        <button z-button zType="default" zSize="sm" (click)="handleSave()">Salvar</button>
      </z-header-actions>
    </z-header-toolbar>
  `,
})
export class ActionsHeaderExample {
  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['..']);
  }

  handleSettings(): void {
    console.log('Settings clicked');
  }

  handleSave(): void {
    console.log('Save clicked');
  }
}

/**
 * Exemplo 4: Header sticky com tamanho customizado
 */
@Component({
  selector: 'app-sticky-header-example',
  imports: [
    HeaderToolbarComponent,
    HeaderTitleComponent,
    HeaderActionsComponent,
    ZardButtonComponent,
    ZardIconComponent,
  ],
  template: `
    <z-header-toolbar [zSticky]="true" zSize="lg">
      <z-header-actions>
        <button z-button zType="ghost" (click)="goBack()">
          <z-icon zType="arrow-left" />
        </button>
      </z-header-actions>

      <z-header-title>Lista de Produtos</z-header-title>

      <z-header-actions>
        <button z-button zType="ghost" (click)="handleSearch()">
          <z-icon zType="search" />
        </button>
        <button z-button zType="default" (click)="handleAdd()">
          <z-icon zType="plus" />
          Adicionar
        </button>
      </z-header-actions>
    </z-header-toolbar>

    <!-- Conteúdo longo para testar o sticky -->
    <div class="h-[200vh] p-6">
      <p>Role para baixo para ver o header sticky em ação</p>
    </div>
  `,
})
export class StickyHeaderExample {
  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['..']);
  }

  handleSearch(): void {
    console.log('Search clicked');
  }

  handleAdd(): void {
    console.log('Add clicked');
  }
}

/**
 * Exemplo 5: Header customizado com tema escuro
 */
@Component({
  selector: 'app-custom-header-example',
  imports: [
    HeaderToolbarComponent,
    HeaderTitleComponent,
    HeaderActionsComponent,
    ZardButtonComponent,
    ZardIconComponent,
  ],
  template: `
    <z-header-toolbar class="bg-primary text-primary-foreground border-none shadow-md">
      <z-header-actions>
        <button
          z-button
          zType="ghost"
          zSize="sm"
          class="text-primary-foreground hover:bg-primary-foreground/10"
          (click)="goBack()"
        >
          <z-icon zType="arrow-left" />
        </button>
      </z-header-actions>

      <z-header-title class="text-primary-foreground font-bold"> Dashboard Premium </z-header-title>

      <z-header-actions>
        <button
          z-button
          zType="ghost"
          zSize="sm"
          class="text-primary-foreground hover:bg-primary-foreground/10"
          (click)="handleNotifications()"
        >
          <z-icon zType="bell" />
        </button>
        <button
          z-button
          zType="ghost"
          zSize="sm"
          class="text-primary-foreground hover:bg-primary-foreground/10"
          (click)="handleProfile()"
        >
          <z-icon zType="user" />
        </button>
      </z-header-actions>
    </z-header-toolbar>
  `,
})
export class CustomHeaderExample {
  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['..']);
  }

  handleNotifications(): void {
    console.log('Notifications clicked');
  }

  handleProfile(): void {
    console.log('Profile clicked');
  }
}

/**
 * Exemplo 6: Header com título e subtítulo
 */
@Component({
  selector: 'app-subtitle-header-example',
  imports: [
    HeaderToolbarComponent,
    HeaderTitleComponent,
    HeaderActionsComponent,
    ZardButtonComponent,
    ZardIconComponent,
  ],
  template: `
    <z-header-toolbar zSize="lg">
      <z-header-actions>
        <button z-button zType="ghost" (click)="goBack()">
          <z-icon zType="arrow-left" />
        </button>
      </z-header-actions>

      <z-header-title class="flex flex-col gap-0.5 items-center">
        <span class="font-bold text-base">Projeto Angular</span>
        <span class="text-xs text-muted-foreground font-normal"
          >Última atualização: há 5 minutos</span
        >
      </z-header-title>

      <z-header-actions>
        <button z-button zType="default">
          <z-icon zType="save" />
          Salvar
        </button>
      </z-header-actions>
    </z-header-toolbar>
  `,
})
export class SubtitleHeaderExample {
  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['..']);
  }
}

/**
 * Exemplo 7: Header com ações condicionais
 */
@Component({
  selector: 'app-conditional-header-example',
  imports: [
    HeaderToolbarComponent,
    HeaderTitleComponent,
    HeaderActionsComponent,
    ZardButtonComponent,
    ZardIconComponent,
  ],
  template: `
    <z-header-toolbar>
      @if (showBackButton) {
        <z-header-actions>
          <button z-button zType="ghost" zSize="sm" (click)="goBack()">
            <z-icon zType="arrow-left" />
          </button>
        </z-header-actions>
      }

      <z-header-title>{{ pageTitle }}</z-header-title>

      @if (isEditMode) {
        <z-header-actions>
          <button z-button zType="ghost" zSize="sm" (click)="handleCancel()">Cancelar</button>
          <button z-button zType="default" zSize="sm" (click)="handleSave()">Salvar</button>
        </z-header-actions>
      } @else {
        <z-header-actions>
          <button z-button zType="ghost" zSize="sm" (click)="handleEdit()">
            <z-icon zType="settings" />
          </button>
        </z-header-actions>
      }
    </z-header-toolbar>
  `,
})
export class ConditionalHeaderExample {
  showBackButton = true;
  pageTitle = 'Minha Página';
  isEditMode = false;

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['..']);
  }

  handleEdit(): void {
    this.isEditMode = true;
    this.pageTitle = 'Editando';
  }

  handleCancel(): void {
    this.isEditMode = false;
    this.pageTitle = 'Minha Página';
  }

  handleSave(): void {
    this.isEditMode = false;
    this.pageTitle = 'Minha Página';
    console.log('Saved!');
  }
}

/**
 * Exemplo 8: Header com indicador de loading
 */
@Component({
  selector: 'app-loading-header-example',
  imports: [
    HeaderToolbarComponent,
    HeaderTitleComponent,
    HeaderActionsComponent,
    ZardButtonComponent,
    ZardIconComponent,
  ],
  template: `
    <z-header-toolbar>
      <z-header-actions>
        <button z-button zType="ghost" zSize="sm" (click)="goBack()">
          <z-icon zType="arrow-left" />
        </button>
      </z-header-actions>

      <z-header-title>Carregando Dados</z-header-title>

      <z-header-actions>
        @if (isLoading) {
          <z-icon zType="loader-circle" class="animate-spin text-muted-foreground" />
        } @else {
          <button z-button zType="default" zSize="sm" (click)="handleRefresh()">Atualizar</button>
        }
      </z-header-actions>
    </z-header-toolbar>
  `,
})
export class LoadingHeaderExample {
  isLoading = false;

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['..']);
  }

  handleRefresh(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}

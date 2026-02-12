/**
 * Exemplos de uso do Scaffold
 *
 * Este arquivo demonstra diferentes cenários de uso dos componentes scaffold
 */

import { Component, signal, viewChild } from '@angular/core';

import { ScaffoldComponent, AppBarComponent, ScaffoldBodyComponent } from './index';
import {
  HeaderToolbarComponent,
  HeaderTitleComponent,
  HeaderActionsComponent,
} from '../header/index';
import { ZardButtonComponent } from '../../components/button';
import { ZardIconComponent } from '../../components/icon';

/**
 * Exemplo 1: Scaffold básico com header simples
 */
@Component({
  selector: 'app-basic-scaffold-example',
  imports: [
    ScaffoldComponent,
    AppBarComponent,
    ScaffoldBodyComponent,
    HeaderToolbarComponent,
    HeaderTitleComponent,
  ],
  template: `
    <z-scaffold>
      <z-app-bar>
        <z-header-toolbar>
          <z-header-title>Minha App</z-header-title>
        </z-header-toolbar>
      </z-app-bar>

      <z-scaffold-body zPadding="default">
        <p>Conteúdo da página aqui.</p>
      </z-scaffold-body>
    </z-scaffold>
  `,
})
export class BasicScaffoldExample {}

/**
 * Exemplo 2: Scaffold completo com navegação e ações
 */
@Component({
  selector: 'app-full-scaffold-example',
  imports: [
    ScaffoldComponent,
    AppBarComponent,
    ScaffoldBodyComponent,
    HeaderToolbarComponent,
    HeaderTitleComponent,
    HeaderActionsComponent,
    ZardButtonComponent,
    ZardIconComponent,
  ],
  template: `
    <z-scaffold>
      <z-app-bar zElevation="md">
        <z-header-toolbar>
          <z-header-actions>
            <button z-button zType="ghost" zSize="sm" (click)="goBack()">
              <z-icon zType="arrow-left" />
            </button>
          </z-header-actions>

          <z-header-title>Dashboard</z-header-title>

          <z-header-actions>
            <button z-button zType="ghost" zSize="sm" (click)="handleSettings()">
              <z-icon zType="settings" />
            </button>
          </z-header-actions>
        </z-header-toolbar>
      </z-app-bar>

      <z-scaffold-body zPadding="default">
        <h1 class="text-xl font-bold">Bem-vindo ao Dashboard</h1>
        <p class="mt-2 text-muted-foreground">Gerencie seus dados aqui.</p>
      </z-scaffold-body>
    </z-scaffold>
  `,
})
export class FullScaffoldExample {
  goBack(): void {
    history.back();
  }

  handleSettings(): void {
    console.log('Settings clicked');
  }
}

/**
 * Exemplo 3: Scaffold com safe areas (iOS)
 */
@Component({
  selector: 'app-safe-area-scaffold-example',
  imports: [
    ScaffoldComponent,
    AppBarComponent,
    ScaffoldBodyComponent,
    HeaderToolbarComponent,
    HeaderTitleComponent,
  ],
  template: `
    <z-scaffold [zSafeArea]="true">
      <z-app-bar>
        <z-header-toolbar>
          <z-header-title>App com Safe Area</z-header-title>
        </z-header-toolbar>
      </z-app-bar>

      <z-scaffold-body zPadding="default">
        <p>O conteúdo se ajusta automaticamente ao notch e home indicator.</p>
      </z-scaffold-body>
    </z-scaffold>
  `,
})
export class SafeAreaScaffoldExample {}

/**
 * Exemplo 4: Scaffold com app bar transparente
 */
@Component({
  selector: 'app-transparent-bar-scaffold-example',
  imports: [
    ScaffoldComponent,
    AppBarComponent,
    ScaffoldBodyComponent,
    HeaderToolbarComponent,
    HeaderTitleComponent,
    HeaderActionsComponent,
    ZardButtonComponent,
    ZardIconComponent,
  ],
  template: `
    <z-scaffold>
      <z-app-bar [zTransparent]="true">
        <z-header-toolbar class="text-white">
          <z-header-actions>
            <button z-button zType="ghost" zSize="sm" class="text-white" (click)="goBack()">
              <z-icon zType="arrow-left" />
            </button>
          </z-header-actions>

          <z-header-title class="text-white">Galeria</z-header-title>
        </z-header-toolbar>
      </z-app-bar>

      <z-scaffold-body>
        <div
          class="h-64 bg-linear-to-b from-primary to-primary/60 -mt-14 flex items-center justify-center"
        >
          <p class="text-white text-lg font-semibold">Hero Image</p>
        </div>
        <div class="p-4">
          <p>Conteúdo abaixo do hero.</p>
        </div>
      </z-scaffold-body>
    </z-scaffold>
  `,
})
export class TransparentBarScaffoldExample {
  goBack(): void {
    history.back();
  }
}

/**
 * Exemplo 5: Scaffold com scroll listener
 */
@Component({
  selector: 'app-scroll-scaffold-example',
  imports: [
    ScaffoldComponent,
    AppBarComponent,
    ScaffoldBodyComponent,
    HeaderToolbarComponent,
    HeaderTitleComponent,
  ],
  template: `
    <z-scaffold>
      <z-app-bar [zElevation]="scrolled() ? 'md' : 'none'">
        <z-header-toolbar>
          <z-header-title>Elevação Dinâmica</z-header-title>
        </z-header-toolbar>
      </z-app-bar>

      <z-scaffold-body zPadding="default" (onScroll)="handleScroll($event)">
        @for (i of Array(20); track $index) {
          <div class="p-4 mb-2 rounded border border-border">Item {{ $index + 1 }}</div>
        }
      </z-scaffold-body>
    </z-scaffold>
  `,
})
export class ScrollScaffoldExample {
  protected readonly Array = Array;

  readonly scrolled = signal(false);

  handleScroll(event: { scrollTop: number }): void {
    this.scrolled.set(event.scrollTop > 10);
  }
}

/**
 * Exemplo 6: Scaffold com app bar não-sticky
 */
@Component({
  selector: 'app-non-sticky-scaffold-example',
  imports: [
    ScaffoldComponent,
    AppBarComponent,
    ScaffoldBodyComponent,
    HeaderToolbarComponent,
    HeaderTitleComponent,
  ],
  template: `
    <z-scaffold>
      <z-app-bar [zSticky]="false" zElevation="sm">
        <z-header-toolbar>
          <z-header-title>Header que Rola</z-header-title>
        </z-header-toolbar>
      </z-app-bar>

      <z-scaffold-body zPadding="default">
        <p class="text-muted-foreground mb-4">
          O header acima não é sticky — ele rola junto com o conteúdo.
        </p>
        @for (i of Array(30); track $index) {
          <div class="p-3 mb-2 rounded border border-border">Conteúdo {{ $index + 1 }}</div>
        }
      </z-scaffold-body>
    </z-scaffold>
  `,
})
export class NonStickyScaffoldExample {
  protected readonly Array = Array;
}

/**
 * Exemplo 7: Scaffold com diferentes paddings
 */
@Component({
  selector: 'app-padding-scaffold-example',
  imports: [
    ScaffoldComponent,
    AppBarComponent,
    ScaffoldBodyComponent,
    HeaderToolbarComponent,
    HeaderTitleComponent,
  ],
  template: `
    <z-scaffold>
      <z-app-bar>
        <z-header-toolbar>
          <z-header-title>Padding Grande</z-header-title>
        </z-header-toolbar>
      </z-app-bar>

      <z-scaffold-body zPadding="lg">
        <div class="space-y-4">
          <p>Este body utiliza <code>zPadding="lg"</code> para maior espaçamento.</p>
          <div class="p-4 rounded-lg border border-border bg-muted">Cartão de exemplo</div>
          <div class="p-4 rounded-lg border border-border bg-muted">Outro cartão</div>
        </div>
      </z-scaffold-body>
    </z-scaffold>
  `,
})
export class PaddingScaffoldExample {}

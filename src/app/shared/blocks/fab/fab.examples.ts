/**
 * Exemplos de uso do Floating Action Button (FAB)
 *
 * Este arquivo demonstra diferentes cenários de uso do componente FAB
 */

import { Component, signal } from '@angular/core';

import { FloatingActionButtonComponent } from './index';

/**
 * Exemplo 1: FAB simples
 */
@Component({
  selector: 'app-simple-fab-example',
  imports: [FloatingActionButtonComponent],
  template: `
    <z-fab zIcon="plus" ariaLabel="Criar novo item" (onClick)="handleCreate()" />
  `,
})
export class SimpleFabExample {
  handleCreate(): void {
    console.log('Create clicked');
  }
}

/**
 * Exemplo 2: FAB extendido (com label)
 */
@Component({
  selector: 'app-extended-fab-example',
  imports: [FloatingActionButtonComponent],
  template: `
    <z-fab [zExtended]="true" zIcon="plus" zLabel="Criar Novo" (onClick)="handleCreate()" />
  `,
})
export class ExtendedFabExample {
  handleCreate(): void {
    console.log('Create clicked');
  }
}

/**
 * Exemplo 3: FAB com router
 */
@Component({
  selector: 'app-router-fab-example',
  imports: [FloatingActionButtonComponent],
  template: `
    <z-fab zIcon="plus" routerLink="/create" ariaLabel="Criar novo" />
  `,
})
export class RouterFabExample {}

/**
 * Exemplo 4: FAB em posições diferentes
 */
@Component({
  selector: 'app-positions-fab-example',
  imports: [FloatingActionButtonComponent],
  template: `
    <!-- Bottom right (padrão) -->
    <z-fab zIcon="plus" ariaLabel="Bottom right" />

    <!-- Bottom left -->
    <z-fab zIcon="plus" zPosition="bottom-left" ariaLabel="Bottom left" />

    <!-- Top right -->
    <z-fab zIcon="plus" zPosition="top-right" ariaLabel="Top right" />

    <!-- Bottom center -->
    <z-fab zIcon="plus" zPosition="bottom-center" ariaLabel="Bottom center" />
  `,
})
export class PositionsFabExample {}

/**
 * Exemplo 5: FAB em tamanhos diferentes
 */
@Component({
  selector: 'app-sizes-fab-example',
  imports: [FloatingActionButtonComponent],
  template: `
    <!-- Pequeno -->
    <z-fab zIcon="plus" zSize="sm" ariaLabel="Pequeno" />

    <!-- Padrão -->
    <z-fab zIcon="plus" zSize="default" ariaLabel="Padrão" />

    <!-- Grande -->
    <z-fab zIcon="plus" zSize="lg" ariaLabel="Grande" />
  `,
})
export class SizesFabExample {}

/**
 * Exemplo 6: FAB extendido com posição
 */
@Component({
  selector: 'app-extended-position-fab-example',
  imports: [FloatingActionButtonComponent],
  template: `
    <z-fab
      [zExtended]="true"
      zIcon="plus"
      zLabel="Criar Novo"
      zPosition="bottom-right"
      (onClick)="handleCreate()"
    />
  `,
})
export class ExtendedPositionFabExample {
  handleCreate(): void {
    console.log('Create clicked');
  }
}

/**
 * Exemplo 7: FAB com ícone customizado
 */
@Component({
  selector: 'app-custom-icon-fab-example',
  imports: [FloatingActionButtonComponent],
  template: `
    <z-fab
      zIcon="star"
      class="bg-yellow-500 hover:bg-yellow-600"
      ariaLabel="Favoritar"
      (onClick)="handleFavorite()"
    />
  `,
})
export class CustomIconFabExample {
  handleFavorite(): void {
    console.log('Favorite clicked');
  }
}

/**
 * Exemplo 8: FAB condicional
 */
@Component({
  selector: 'app-conditional-fab-example',
  imports: [FloatingActionButtonComponent],
  template: `
    @if (showFab()) {
      <z-fab zIcon="plus" (onClick)="handleCreate()" />
    }
  `,
})
export class ConditionalFabExample {
  showFab = signal(true);

  handleCreate(): void {
    console.log('Create clicked');
  }
}

/**
 * Exemplo 9: Múltiplos FABs
 */
@Component({
  selector: 'app-multiple-fabs-example',
  imports: [FloatingActionButtonComponent],
  template: `
    <!-- FAB principal -->
    <z-fab zIcon="plus" zPosition="bottom-right" ariaLabel="Criar" (onClick)="handleCreate()" />

    <!-- FAB secundário -->
    <z-fab
      zIcon="mail"
      zPosition="bottom-left"
      zSize="sm"
      class="bg-blue-500"
      ariaLabel="Mensagem"
      (onClick)="handleMessage()"
    />
  `,
})
export class MultipleFabsExample {
  handleCreate(): void {
    console.log('Create clicked');
  }

  handleMessage(): void {
    console.log('Message clicked');
  }
}

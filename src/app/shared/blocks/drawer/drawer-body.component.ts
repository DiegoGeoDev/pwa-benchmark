import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import type { ClassValue } from 'clsx';

import { mergeClasses } from '../../utils/merge-classes';

import { drawerBodyVariants } from './drawer.variants';

@Component({
  selector: 'z-drawer-body',
  template: `
    <div [class]="classes()">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'zDrawerBody',
})
export class DrawerBodyComponent {
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() => mergeClasses(drawerBodyVariants(), this.class()));
}

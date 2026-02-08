import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import type { ClassValue } from 'clsx';

import { mergeClasses } from '../../utils/merge-classes';

import { drawerFooterVariants } from './drawer.variants';

@Component({
  selector: 'z-drawer-footer',
  template: `
    <div [class]="classes()">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'zDrawerFooter',
})
export class DrawerFooterComponent {
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() => mergeClasses(drawerFooterVariants(), this.class()));
}

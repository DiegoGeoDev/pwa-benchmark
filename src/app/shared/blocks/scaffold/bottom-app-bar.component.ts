import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import type { ClassValue } from 'clsx';

import { mergeClasses } from '../../utils/merge-classes';

import {
  bottomAppBarVariants,
  type ZardBottomAppBarElevationVariants,
} from './scaffold.variants';

@Component({
  selector: 'z-bottom-app-bar',
  template: `
    <div [class]="classes()">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '"shrink-0 w-full"',
  },
  exportAs: 'zBottomAppBar',
})
export class BottomAppBarComponent {
  readonly class = input<ClassValue>('');
  readonly zElevation = input<ZardBottomAppBarElevationVariants>('none');

  protected readonly classes = computed(() =>
    mergeClasses(
      bottomAppBarVariants({
        zElevation: this.zElevation(),
      }),
      this.class(),
    ),
  );
}

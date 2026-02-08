import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import type { ClassValue } from 'clsx';

import { mergeClasses } from '../../utils/merge-classes';

import {
  appBarVariants,
  type ZardAppBarElevationVariants,
  type ZardAppBarTransparentVariants,
  type ZardAppBarStickyVariants,
} from './scaffold.variants';

@Component({
  selector: 'z-app-bar',
  template: `
    <div [class]="classes()">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'zAppBar',
})
export class AppBarComponent {
  readonly class = input<ClassValue>('');
  readonly zElevation = input<ZardAppBarElevationVariants>('none');
  readonly zTransparent = input<ZardAppBarTransparentVariants>(false);
  readonly zSticky = input<ZardAppBarStickyVariants>(true);

  protected readonly classes = computed(() =>
    mergeClasses(
      appBarVariants({
        zElevation: this.zElevation(),
        zTransparent: this.zTransparent(),
        zSticky: this.zSticky(),
      }),
      this.class(),
    ),
  );
}

import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import type { ClassValue } from 'clsx';

import { mergeClasses } from '../../utils/merge-classes';

import {
  bottomNavigationBarVariants,
  type ZardBottomNavigationBarSizeVariants,
  type ZardBottomNavigationBarElevationVariants,
} from './bottom-navigation.variants';

@Component({
  selector: 'z-bottom-navigation-bar',
  template: `
    <nav [class]="classes()" role="navigation" aria-label="Bottom navigation">
      <ng-content />
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'zBottomNavigationBar',
})
export class BottomNavigationBarComponent {
  readonly class = input<ClassValue>('');
  readonly zSize = input<ZardBottomNavigationBarSizeVariants>('default');
  readonly zElevation = input<ZardBottomNavigationBarElevationVariants>('md');

  protected readonly classes = computed(() =>
    mergeClasses(
      bottomNavigationBarVariants({
        zSize: this.zSize(),
        zElevation: this.zElevation(),
      }),
      this.class(),
    ),
  );
}

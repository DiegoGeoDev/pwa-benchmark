import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import type { ClassValue } from 'clsx';

import { mergeClasses } from '../../utils/merge-classes';

import {
  headerVariants,
  type ZardHeaderSizeVariants,
  type ZardHeaderStickyVariants,
} from './header.variants';

@Component({
  selector: 'z-header-toolbar',
  template: `
    <header [class]="classes()" role="banner">
      <ng-content />
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '"block"',
  },
  exportAs: 'zHeaderToolbar',
})
export class HeaderToolbarComponent {
  readonly class = input<ClassValue>('');
  readonly zSize = input<ZardHeaderSizeVariants>('default');
  readonly zSticky = input<ZardHeaderStickyVariants>(false);

  protected readonly classes = computed(() =>
    mergeClasses(
      headerVariants({
        zSize: this.zSize(),
        zSticky: this.zSticky(),
      }),
      this.class(),
    ),
  );
}

import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import type { ClassValue } from 'clsx';

import { mergeClasses } from '../../utils/merge-classes';

import { headerTitleVariants, type ZardHeaderSizeVariants } from './header.variants';

@Component({
  selector: 'z-header-title',
  template: `
    <div [class]="classes()">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'zHeaderTitle',
})
export class HeaderTitleComponent {
  readonly class = input<ClassValue>('');
  readonly zSize = input<ZardHeaderSizeVariants>('default');

  protected readonly classes = computed(() =>
    mergeClasses(
      headerTitleVariants({
        zSize: this.zSize(),
      }),
      this.class(),
    ),
  );
}

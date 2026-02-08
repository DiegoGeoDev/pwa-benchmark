import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import type { ClassValue } from 'clsx';

import { mergeClasses } from '../../utils/merge-classes';

import { headerBackActionVariants, type ZardHeaderSizeVariants } from './header.variants';

@Component({
  selector: 'z-header-back-action',
  template: `
    <div [class]="classes()">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'zHeaderBackAction',
})
export class HeaderBackActionComponent {
  readonly class = input<ClassValue>('');
  readonly zSize = input<ZardHeaderSizeVariants>('default');

  protected readonly classes = computed(() =>
    mergeClasses(
      headerBackActionVariants({
        zSize: this.zSize(),
      }),
      this.class(),
    ),
  );
}

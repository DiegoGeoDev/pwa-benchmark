import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import type { ClassValue } from 'clsx';

import { mergeClasses } from '../../utils/merge-classes';

import { headerActionsVariants, type ZardHeaderSizeVariants } from './header.variants';

@Component({
  selector: 'z-header-actions',
  template: `
    <div [class]="classes()">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'zHeaderActions',
})
export class HeaderActionsComponent {
  readonly class = input<ClassValue>('');
  readonly zSize = input<ZardHeaderSizeVariants>('default');

  protected readonly classes = computed(() =>
    mergeClasses(
      headerActionsVariants({
        zSize: this.zSize(),
      }),
      this.class(),
    ),
  );
}

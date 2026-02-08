import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import type { ClassValue } from 'clsx';

import { mergeClasses } from '../../utils/merge-classes';

import { bottomSheetBodyVariants } from './bottom-sheet.variants';

@Component({
  selector: 'z-bottom-sheet-body',
  template: `
    <div [class]="classes()">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'zBottomSheetBody',
})
export class BottomSheetBodyComponent {
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() => mergeClasses(bottomSheetBodyVariants(), this.class()));
}

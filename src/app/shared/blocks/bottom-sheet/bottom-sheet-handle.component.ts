import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';

import type { ClassValue } from 'clsx';

import { mergeClasses } from '../../utils/merge-classes';

import { bottomSheetHandleVariants, bottomSheetHandleBarVariants } from './bottom-sheet.variants';

@Component({
  selector: 'z-bottom-sheet-handle',
  template: `
    <div
      [class]="classes()"
      (touchstart)="onDragStart.emit($event)"
      (touchmove)="onDragMove.emit($event)"
      (touchend)="onDragEnd.emit()"
      role="button"
      [attr.aria-label]="ariaLabel()"
    >
      <div [class]="handleBarClasses()"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'zBottomSheetHandle',
})
export class BottomSheetHandleComponent {
  readonly class = input<ClassValue>('');
  readonly ariaLabel = input<string>('Drag to close');

  readonly onDragStart = output<TouchEvent>();
  readonly onDragMove = output<TouchEvent>();
  readonly onDragEnd = output<void>();

  protected readonly classes = computed(() => mergeClasses(bottomSheetHandleVariants(), this.class()));

  protected readonly handleBarClasses = computed(() => mergeClasses(bottomSheetHandleBarVariants()));
}

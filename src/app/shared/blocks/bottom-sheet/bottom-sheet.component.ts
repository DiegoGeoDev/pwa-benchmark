import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
  ViewEncapsulation,
  booleanAttribute,
  ElementRef,
  inject,
} from '@angular/core';

import type { ClassValue } from 'clsx';

import { mergeClasses } from '../../utils/merge-classes';

import {
  bottomSheetBackdropVariants,
  bottomSheetVariants,
  type ZardBottomSheetSnapVariants,
} from './bottom-sheet.variants';

@Component({
  selector: 'z-bottom-sheet',
  template: `
    <!-- Backdrop -->
    @if (zOpen()) {
      <div
        [class]="backdropClasses()"
        [attr.data-state]="zOpen() ? 'open' : 'closed'"
        (click)="zCloseOnBackdropClick() && handleClose()"
        role="presentation"
      ></div>
    }

    <!-- Bottom Sheet -->
    <div
      [class]="classes()"
      [attr.data-state]="zOpen() ? 'open' : 'closed'"
      [attr.aria-hidden]="!zOpen()"
      role="dialog"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-modal]="true"
      #sheetElement
    >
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '"block"',
  },
  exportAs: 'zBottomSheet',
})
export class BottomSheetComponent {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly class = input<ClassValue>('');
  readonly zOpen = input<boolean, any>(false, { transform: booleanAttribute });
  readonly zSnap = input<ZardBottomSheetSnapVariants>(false);
  readonly zCloseOnBackdropClick = input<boolean, any>(true, { transform: booleanAttribute });
  readonly zDraggable = input<boolean, any>(true, { transform: booleanAttribute });
  readonly ariaLabel = input<string>('Bottom sheet');

  readonly onClose = output<void>();
  readonly onOpen = output<void>();

  private readonly previousOpenState = signal(false);
  private dragStartY = 0;
  private currentTranslateY = 0;

  protected readonly classes = computed(() =>
    mergeClasses(
      bottomSheetVariants({
        zSnap: this.zSnap(),
      }),
      this.class(),
    ),
  );

  protected readonly backdropClasses = computed(() => mergeClasses(bottomSheetBackdropVariants()));

  constructor() {
    effect(() => {
      const isOpen = this.zOpen();
      const wasOpen = this.previousOpenState();

      if (isOpen !== wasOpen) {
        if (isOpen) {
          this.onOpen.emit();
          // Prevent body scroll when sheet is open
          document.body.style.overflow = 'hidden';
        } else {
          this.onClose.emit();
          // Restore body scroll when sheet is closed
          document.body.style.overflow = '';
        }
        this.previousOpenState.set(isOpen);
      }
    });
  }

  protected handleClose(): void {
    this.onClose.emit();
  }

  protected handleDragStart(event: TouchEvent): void {
    if (!this.zDraggable()) return;
    this.dragStartY = event.touches[0].clientY;
  }

  protected handleDragMove(event: TouchEvent): void {
    if (!this.zDraggable() || !this.zOpen()) return;

    const currentY = event.touches[0].clientY;
    const deltaY = currentY - this.dragStartY;

    // Only allow dragging down
    if (deltaY > 0) {
      this.currentTranslateY = deltaY;
      const sheetElement = this.elementRef.nativeElement.querySelector('[role="dialog"]') as HTMLElement;
      if (sheetElement) {
        sheetElement.style.transform = `translateY(${deltaY}px)`;
      }
    }
  }

  protected handleDragEnd(): void {
    if (!this.zDraggable() || !this.zOpen()) return;

    const sheetElement = this.elementRef.nativeElement.querySelector('[role="dialog"]') as HTMLElement;
    if (sheetElement) {
      sheetElement.style.transform = '';
    }

    // Close if dragged down more than 100px
    if (this.currentTranslateY > 100) {
      this.handleClose();
    }

    this.currentTranslateY = 0;
  }
}

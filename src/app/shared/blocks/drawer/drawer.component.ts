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
} from '@angular/core';

import type { ClassValue } from 'clsx';

import { mergeClasses } from '../../utils/merge-classes';

import {
  drawerBackdropVariants,
  drawerVariants,
  type ZardDrawerPositionVariants,
  type ZardDrawerWidthVariants,
} from './drawer.variants';

@Component({
  selector: 'z-drawer',
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

    <!-- Drawer -->
    <aside
      [class]="classes()"
      [attr.data-state]="zOpen() ? 'open' : 'closed'"
      [attr.aria-hidden]="!zOpen()"
      role="dialog"
      [attr.aria-label]="ariaLabel()"
    >
      <ng-content />
    </aside>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '"block"',
  },
  exportAs: 'zDrawer',
})
export class DrawerComponent {
  readonly class = input<ClassValue>('');
  readonly zOpen = input<boolean, any>(false, { transform: booleanAttribute });
  readonly zPosition = input<ZardDrawerPositionVariants>('left');
  readonly zWidth = input<ZardDrawerWidthVariants>('default');
  readonly zCloseOnBackdropClick = input<boolean, any>(true, { transform: booleanAttribute });
  readonly ariaLabel = input<string>('Navigation drawer');

  readonly onClose = output<void>();
  readonly onOpen = output<void>();

  private readonly previousOpenState = signal(false);

  protected readonly classes = computed(() =>
    mergeClasses(
      drawerVariants({
        zPosition: this.zPosition(),
        zWidth: this.zWidth(),
      }),
      this.class(),
    ),
  );

  protected readonly backdropClasses = computed(() => mergeClasses(drawerBackdropVariants()));

  constructor() {
    effect(() => {
      const isOpen = this.zOpen();
      const wasOpen = this.previousOpenState();

      if (isOpen !== wasOpen) {
        if (isOpen) {
          this.onOpen.emit();
          // Prevent body scroll when drawer is open
          document.body.style.overflow = 'hidden';
        } else {
          this.onClose.emit();
          // Restore body scroll when drawer is closed
          document.body.style.overflow = '';
        }
        this.previousOpenState.set(isOpen);
      }
    });
  }

  protected handleClose(): void {
    this.onClose.emit();
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';

import type { ClassValue } from 'clsx';

import { mergeClasses } from '../../utils/merge-classes';

import { scaffoldBodyVariants, type ZardScaffoldBodyPaddingVariants } from './scaffold.variants';

@Component({
  selector: 'z-scaffold-body',
  template: `
    <div [class]="classes()" #bodyContent (scroll)="handleScroll($event)">
      @if (zRefreshable() && isPulling()) {
        <div
          class="flex items-center justify-center py-4 transition-opacity"
          [class.opacity-100]="pullDistance() > 60"
          [class.opacity-50]="pullDistance() <= 60"
        >
          @if (isRefreshing()) {
            <div class="animate-spin">
              <ng-content select="[refresh-indicator]" />
            </div>
          } @else {
            <div [style.transform]="'rotate(' + Math.min(pullDistance() * 2, 180) + 'deg)'">
              <ng-content select="[pull-indicator]" />
            </div>
          }
        </div>
      }
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '(touchstart)': 'zRefreshable() && handleTouchStart($event)',
    '(touchmove)': 'zRefreshable() && handleTouchMove($event)',
    '(touchend)': 'zRefreshable() && handleTouchEnd()',
  },
  exportAs: 'zScaffoldBody',
})
export class ScaffoldBodyComponent {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly class = input<ClassValue>('');
  readonly zPadding = input<ZardScaffoldBodyPaddingVariants>('none');
  readonly zRefreshable = input<boolean>(false);

  readonly onRefresh = output<void>();
  readonly onScroll = output<{ scrollTop: number; scrollHeight: number; clientHeight: number }>();

  protected readonly Math = Math;
  protected readonly isPulling = signal(false);
  protected readonly isRefreshing = signal(false);
  protected readonly pullDistance = signal(0);

  private touchStartY = 0;
  private scrollTop = 0;

  protected readonly classes = computed(() =>
    mergeClasses(
      scaffoldBodyVariants({
        zPadding: this.zPadding(),
      }),
      this.class(),
    ),
  );

  constructor() {
    effect(() => {
      // Reset pull state after refresh completes
      if (!this.isRefreshing()) {
        this.isPulling.set(false);
        this.pullDistance.set(0);
      }
    });
  }

  protected handleTouchStart(event: TouchEvent): void {
    const target = event.target as HTMLElement;
    this.scrollTop = target.scrollTop || 0;
    this.touchStartY = event.touches[0].clientY;
  }

  protected handleTouchMove(event: TouchEvent): void {
    if (this.isRefreshing()) return;

    const touchY = event.touches[0].clientY;
    const deltaY = touchY - this.touchStartY;

    // Only activate pull-to-refresh when at top of scroll
    if (this.scrollTop <= 0 && deltaY > 0) {
      this.isPulling.set(true);
      this.pullDistance.set(Math.min(deltaY, 120));

      // Prevent default scroll behavior while pulling
      if (deltaY > 10) {
        event.preventDefault();
      }
    }
  }

  protected handleTouchEnd(): void {
    if (this.isRefreshing()) return;

    if (this.pullDistance() > 60) {
      this.isRefreshing.set(true);
      this.onRefresh.emit();

      // Auto-reset after 2 seconds if parent doesn't reset manually
      setTimeout(() => {
        this.resetRefresh();
      }, 2000);
    } else {
      this.isPulling.set(false);
      this.pullDistance.set(0);
    }
  }

  protected handleScroll(event: Event): void {
    const target = event.target as HTMLElement;
    this.onScroll.emit({
      scrollTop: target.scrollTop,
      scrollHeight: target.scrollHeight,
      clientHeight: target.clientHeight,
    });
  }

  /**
   * Call this method from parent to reset refresh state after refresh is complete
   */
  public resetRefresh(): void {
    this.isRefreshing.set(false);
    this.isPulling.set(false);
    this.pullDistance.set(0);
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';

import type { ClassValue } from 'clsx';

import { mergeClasses } from '../../utils/merge-classes';

import { scaffoldBodyVariants, type ZardScaffoldBodyPaddingVariants } from './scaffold.variants';

const PULL_COMMIT_THRESHOLD = 10;
const PULL_TRIGGER_THRESHOLD = 60;
const PULL_MAX_DISTANCE = 120;
const REFRESH_AUTO_RESET_MS = 2000;

@Component({
  selector: 'z-scaffold-body',
  template: `
    <div [class]="classes()" #bodyContent (scroll)="handleScroll($event)">
      @if (zRefreshable() && isPulling()) {
        <div
          class="flex items-center justify-center py-4 transition-opacity"
          [class.opacity-100]="pullDistance() > PULL_TRIGGER_THRESHOLD"
          [class.opacity-50]="pullDistance() <= PULL_TRIGGER_THRESHOLD"
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
  readonly class = input<ClassValue>('');
  readonly zPadding = input<ZardScaffoldBodyPaddingVariants>('none');
  readonly zRefreshable = input<boolean>(false);

  readonly onRefresh = output<void>();
  readonly onScroll = output<{ scrollTop: number; scrollHeight: number; clientHeight: number }>();

  protected readonly Math = Math;
  protected readonly PULL_TRIGGER_THRESHOLD = PULL_TRIGGER_THRESHOLD;
  protected readonly isPulling = signal(false);
  protected readonly isRefreshing = signal(false);
  protected readonly pullDistance = signal(0);

  private readonly scrollContainer = viewChild.required<ElementRef<HTMLElement>>('bodyContent');

  private touchStartY = 0;
  private startedAtTop = false;
  private directionCommitted = false;
  private committedToPull = false;

  protected readonly classes = computed(() =>
    mergeClasses(
      scaffoldBodyVariants({
        zPadding: this.zPadding(),
      }),
      this.class(),
    ),
  );

  protected handleTouchStart(event: TouchEvent): void {
    if (this.isRefreshing()) return;

    const containerScrollTop = this.scrollContainer().nativeElement.scrollTop;
    this.touchStartY = event.touches[0].clientY;
    this.startedAtTop = containerScrollTop <= 0;
    this.directionCommitted = false;
    this.committedToPull = false;
  }

  protected handleTouchMove(event: TouchEvent): void {
    if (this.isRefreshing() || !this.startedAtTop) return;

    const touchY = event.touches[0].clientY;
    const deltaY = touchY - this.touchStartY;
    const containerScrollTop = this.scrollContainer().nativeElement.scrollTop;

    if (!this.directionCommitted) {
      if (Math.abs(deltaY) < PULL_COMMIT_THRESHOLD) return;

      this.directionCommitted = true;

      // User's first significant movement is downward while container is at top → pull-to-refresh
      // Otherwise → normal scroll, bail out entirely
      if (deltaY > 0 && containerScrollTop <= 0) {
        this.committedToPull = true;
      } else {
        this.startedAtTop = false;
        return;
      }
    }

    if (!this.committedToPull) return;

    // If somehow the container scrolled during the gesture, abort
    if (containerScrollTop > 0) {
      this.resetPullState();
      return;
    }

    this.isPulling.set(true);
    this.pullDistance.set(Math.min(deltaY, PULL_MAX_DISTANCE));
    event.preventDefault();
  }

  protected handleTouchEnd(): void {
    if (this.isRefreshing()) return;

    if (this.pullDistance() > PULL_TRIGGER_THRESHOLD) {
      this.isRefreshing.set(true);
      this.onRefresh.emit();

      setTimeout(() => {
        this.resetRefresh();
      }, REFRESH_AUTO_RESET_MS);
    } else {
      this.resetPullState();
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

  public resetRefresh(): void {
    this.isRefreshing.set(false);
    this.resetPullState();
  }

  private resetPullState(): void {
    this.isPulling.set(false);
    this.pullDistance.set(0);
    this.committedToPull = false;
    this.directionCommitted = false;
    this.startedAtTop = false;
  }
}

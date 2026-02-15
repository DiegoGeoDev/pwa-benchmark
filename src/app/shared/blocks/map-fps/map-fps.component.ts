import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  signal,
  ViewEncapsulation,
  OnDestroy,
} from '@angular/core';
import type { ClassValue } from 'clsx';
import type { Map } from 'maplibre-gl';

import { mergeClasses } from '../../utils/merge-classes';
import {
  mapFpsVariants,
  type MapFpsPositionVariants,
  type MapFpsSizeVariants,
} from './map-fps.variants';

export type MapFpsPerformanceLevel = 'excellent' | 'good' | 'fair' | 'poor';

@Component({
  selector: 'z-map-fps',
  template: `
    <div [class]="classes()" role="status" [attr.aria-label]="'FPS: ' + currentFps()">
      <div class="flex flex-col items-center gap-1">
        <div class="flex items-baseline gap-1">
          <span class="font-mono text-lg font-bold tabular-nums">{{ currentFps() }}</span>
          <span class="text-xs opacity-70">FPS</span>
        </div>
        @if (zShowLevel()) {
          <div class="text-[10px] font-medium uppercase tracking-wide opacity-80">
            {{ performanceLevelText() }}
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'zMapFps',
})
export class MapFpsComponent implements OnDestroy {
  readonly class = input<ClassValue>('');
  readonly zMap = input.required<Map>();
  readonly zPosition = input<MapFpsPositionVariants>('top-left');
  readonly zSize = input<MapFpsSizeVariants>('default');
  readonly zShowLevel = input<boolean>(true);
  readonly zUpdateInterval = input<number>(500); // ms

  protected readonly currentFps = signal<number>(0);
  protected readonly performanceLevel = signal<MapFpsPerformanceLevel>('good');

  private frameCount = 0;
  private lastTime = performance.now();
  private animationFrameId: number | null = null;
  private updateIntervalId: number | null = null;

  protected readonly classes = computed(() =>
    mergeClasses(
      mapFpsVariants({
        zPosition: this.zPosition(),
        zSize: this.zSize(),
        performanceLevel: this.performanceLevel(),
      }),
      this.class(),
    ),
  );

  protected readonly performanceLevelText = computed(() => {
    const level = this.performanceLevel();
    const labels: Record<MapFpsPerformanceLevel, string> = {
      excellent: 'Excelente',
      good: 'Bom',
      fair: 'Regular',
      poor: 'Ruim',
    };
    return labels[level];
  });

  constructor() {
    // Start monitoring when map is available
    effect(() => {
      const map = this.zMap();
      if (map) {
        this.startMonitoring();
      }
    });
  }

  ngOnDestroy(): void {
    this.stopMonitoring();
  }

  private startMonitoring(): void {
    this.stopMonitoring();

    // Count frames
    const countFrame = () => {
      this.frameCount++;
      this.animationFrameId = requestAnimationFrame(countFrame);
    };
    this.animationFrameId = requestAnimationFrame(countFrame);

    // Update FPS at regular intervals
    this.updateIntervalId = window.setInterval(() => {
      const now = performance.now();
      const delta = now - this.lastTime;
      const fps = Math.round((this.frameCount * 1000) / delta);

      this.currentFps.set(fps);
      this.updatePerformanceLevel(fps);

      this.frameCount = 0;
      this.lastTime = now;
    }, this.zUpdateInterval());
  }

  private stopMonitoring(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.updateIntervalId !== null) {
      clearInterval(this.updateIntervalId);
      this.updateIntervalId = null;
    }
  }

  private updatePerformanceLevel(fps: number): void {
    let level: MapFpsPerformanceLevel;

    if (fps >= 55) {
      level = 'excellent';
    } else if (fps >= 45) {
      level = 'good';
    } else if (fps >= 30) {
      level = 'fair';
    } else {
      level = 'poor';
    }

    this.performanceLevel.set(level);
  }
}

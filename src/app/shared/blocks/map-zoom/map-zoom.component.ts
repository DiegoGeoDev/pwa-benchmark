import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  OnDestroy,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import type { ClassValue } from 'clsx';
import type { Map } from 'maplibre-gl';

import { mergeClasses } from '../../utils/merge-classes';
import {
  MAP_ZOOM_BAR_CLASSES,
  mapZoomVariants,
  type MapZoomLevel,
  type MapZoomPositionVariants,
} from './map-zoom.variants';

const MAX_ZOOM = 22;

function getZoomLevel(zoom: number | null): MapZoomLevel {
  if (zoom === null) return 'idle';
  if (zoom <= 4) return 'world';
  if (zoom <= 8) return 'region';
  if (zoom <= 12) return 'city';
  if (zoom <= 16) return 'district';
  return 'street';
}

const ZOOM_LEVEL_LABELS: Record<MapZoomLevel, string> = {
  idle: 'IDLE',
  world: 'WORLD',
  region: 'REGION',
  city: 'CITY',
  district: 'DISTRICT',
  street: 'STREET',
};

@Component({
  selector: 'z-map-zoom',
  template: `
    <div [class]="classes()" role="status" [attr.aria-label]="ariaLabel()">
      <!-- Zoom value -->
      <div class="flex items-baseline justify-center gap-0.5">
        <span class="font-mono text-3xl font-bold tabular-nums leading-none">{{ displayZoom() }}</span>
        <span class="mb-1 ml-0.5 text-xs font-semibold opacity-85">z</span>
      </div>

      <!-- Progress bar -->
      <div class="mt-1.5 h-[3px] w-full overflow-hidden rounded-full bg-white/15">
        <div [class]="barClasses()" [style.width.%]="fillPercent()"></div>
      </div>

      <!-- Level label -->
      @if (zShowLabel()) {
        <div class="mt-1.5 text-center text-[9px] font-bold uppercase tracking-[1.8px] opacity-90">
          {{ levelLabel() }}
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'zMapZoom',
})
export class MapZoomComponent implements OnDestroy {
  readonly class = input<ClassValue>('');
  readonly zMap = input.required<Map>();
  readonly zPosition = input<MapZoomPositionVariants>('bottom-left');
  readonly zShowLabel = input<boolean>(true);

  protected readonly currentZoom = signal<number | null>(null);

  protected readonly zoomLevel = computed(() => getZoomLevel(this.currentZoom()));

  protected readonly displayZoom = computed(() => {
    const zoom = this.currentZoom();
    return zoom !== null ? zoom.toFixed(1) : '--';
  });

  protected readonly fillPercent = computed(() => {
    const zoom = this.currentZoom();
    return zoom !== null ? Math.min((zoom / MAX_ZOOM) * 100, 100) : 0;
  });

  protected readonly levelLabel = computed(() => ZOOM_LEVEL_LABELS[this.zoomLevel()]);

  protected readonly ariaLabel = computed(() => {
    const zoom = this.currentZoom();
    const level = ZOOM_LEVEL_LABELS[this.zoomLevel()];
    return zoom !== null ? `Zoom: ${zoom.toFixed(1)}, nível ${level}` : 'Zoom: inativo';
  });

  protected readonly classes = computed(() =>
    mergeClasses(
      mapZoomVariants({
        zPosition: this.zPosition(),
        zoomLevel: this.zoomLevel(),
      }),
      this.class(),
    ),
  );

  protected readonly barClasses = computed(() =>
    mergeClasses(
      'h-full rounded-full transition-all duration-300',
      MAP_ZOOM_BAR_CLASSES[this.zoomLevel()],
    ),
  );

  private mapInstance: Map | null = null;
  private zoomListener: (() => void) | null = null;

  constructor() {
    effect(() => {
      const map = this.zMap();
      if (map) {
        this.startTracking(map);
      }
    });
  }

  ngOnDestroy(): void {
    this.stopTracking();
  }

  private startTracking(map: Map): void {
    this.stopTracking();
    this.mapInstance = map;

    this.currentZoom.set(map.getZoom());

    this.zoomListener = () => {
      this.currentZoom.set(this.mapInstance!.getZoom());
    };
    this.mapInstance.on('zoom', this.zoomListener);
  }

  private stopTracking(): void {
    if (this.mapInstance && this.zoomListener) {
      this.mapInstance.off('zoom', this.zoomListener);
      this.zoomListener = null;
    }
    this.mapInstance = null;
  }
}

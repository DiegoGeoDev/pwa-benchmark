import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

import {
  MapComponent,
  ControlComponent,
  NavigationControlDirective,
} from '@maplibre/ngx-maplibre-gl';
import { addProtocol, Map } from 'maplibre-gl';
import { Protocol } from 'pmtiles';

const protocol = new Protocol();
addProtocol('pmtiles', protocol.tile);

import {
  ScaffoldComponent,
  AppBarComponent,
  ScaffoldBodyComponent,
  BottomAppBarComponent,
} from '@/shared/blocks/scaffold';
import {
  HeaderToolbarComponent,
  HeaderTitleComponent,
  HeaderActionsComponent,
} from '@/shared/blocks/header';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardIconComponent } from '@/shared/components/icon';
import { DarkModeToggleComponent } from '@/shared/blocks/dark-mode-toggle';
import { BottomNavigationBarComponent, NavItemComponent } from '@/shared/blocks/bottom-navigation';
import { MapFpsComponent } from '@/shared/blocks/map-fps';

@Component({
  selector: 'app-benchmark-01',
  imports: [
    ScaffoldComponent,
    AppBarComponent,
    BottomAppBarComponent,
    ScaffoldBodyComponent,
    HeaderToolbarComponent,
    HeaderTitleComponent,
    HeaderActionsComponent,
    DarkModeToggleComponent,
    ZardButtonComponent,
    ZardIconComponent,
    BottomNavigationBarComponent,
    NavItemComponent,
    MapComponent,
    ControlComponent,
    NavigationControlDirective,
    MapFpsComponent,
  ],
  templateUrl: './benchmark-01.html',
  styleUrl: './benchmark-01.css',
})
export class Benchmark01 {
  zoom = signal<[number]>([4]);
  center = signal<[number, number]>([-45, -23]);
  mapStyle = signal<string>('https://demotiles.maplibre.org/style.json');
  selectedFeatureId = signal<number | null>(null);
  map = signal<Map | null>(null);

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/']);
  }

  onMapLoad(map: Map): void {
    this.map.set(map);
    
    map.addSource('tilezen-source', {
      type: 'vector',
      url: 'pmtiles://https://r2-public.protomaps.com/protomaps-sample-datasets/tilezen.pmtiles',
    });

    map.addLayer({
      id: 'roads-line',
      type: 'line',
      source: 'tilezen-source',
      'source-layer': 'roads',
      paint: {
        'line-color': '#000',
      },
    });
  }
}

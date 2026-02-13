import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

import {
  MapComponent,
  ControlComponent,
  NavigationControlDirective,
} from '@maplibre/ngx-maplibre-gl';
import { addProtocol, Map, MapGeoJSONFeature } from 'maplibre-gl';
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
  ],
  templateUrl: './benchmark-01.html',
  styleUrl: './benchmark-01.css',
})
export class Benchmark01 {
  zoom = signal<[number]>([4]);
  center = signal<[number, number]>([-45, -23]);
  mapStyle = signal<string>('https://tiles.openfreemap.org/styles/liberty');
  selectedFeatureId = signal<number | null>(null);

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/']);
  }

  handleSearch(): void {
    console.log('Search clicked');
  }

  handleMore(): void {
    console.log('More clicked');
  }

  onMapLoad(map: Map): void {
    // Add PMTiles source
    map.addSource('vege_123ab456-source', {
      type: 'vector',
      url: 'pmtiles://pmtiles/cb_2018_us_zcta510_500k.pmtiles',
    });

    map.addLayer({
      id: 'vege_123ab456-fill',
      type: 'fill',
      source: 'vege_123ab456-source',
      'source-layer': 'zcta', //'vege_123ab456',
      minzoom: 4,
      maxzoom: 10,
      paint: {
        'fill-color': '#000000',
        'fill-opacity': 0.5,
      },
    });

    map.addLayer({
      id: 'vege_123ab456-line',
      type: 'line',
      source: 'vege_123ab456-source',
      'source-layer': 'zcta', //'vege_123ab456',
      minzoom: 6,
      maxzoom: 10,
      paint: {
        'line-color': '#000000',
        'line-width': 1,
      },
    });

    map.addLayer({
      id: 'vege_123ab456-highlight',
      type: 'line',
      source: 'vege_123ab456-source',
      'source-layer': 'zcta', //'vege_123ab456',
      paint: {
        'line-color': '#ffff00',
        'line-width': 3,
      },
      filter: ['==', ['get', 'ZCTA5CE10'], ''], // Initially show nothing
    });

    // Add click handler
    map.on('click', 'vege_123ab456-fill', (e) => {
      if (e.features && e.features.length > 0) {
        const feature = e.features[0] as MapGeoJSONFeature;
        const featureId = feature.id as number;

        console.log('Clicked feature:', feature);

        if (featureId) {
          this.selectedFeatureId.set(featureId);
          map.setFilter('vege_123ab456-highlight', ['==', ['id'], featureId]);
        }
      }
    });

    // Add cursor pointer on hover
    map.on('mouseenter', 'vege_123ab456-fill', () => {
      map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'vege_123ab456-fill', () => {
      map.getCanvas().style.cursor = '';
    });
  }
}

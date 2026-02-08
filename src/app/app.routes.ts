import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Benchmark01 } from './pages/benchmark-01/benchmark-01';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home,
    title: 'Home',
  },
  {
    path: 'benchmark-01',
    component: Benchmark01,
    title: 'MapLibre GL JS Benchmark 01',
  },
];

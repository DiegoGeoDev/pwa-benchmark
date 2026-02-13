import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  ],
  templateUrl: './benchmark-01.html',
  styleUrl: './benchmark-01.css',
})
export class Benchmark01 {
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
}

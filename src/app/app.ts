import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ScaffoldComponent, AppBarComponent, ScaffoldBodyComponent } from '@/shared/blocks/scaffold';
import { BottomNavigationBarComponent, NavItemComponent } from '@/shared/blocks/bottom-navigation';
import {
  DrawerComponent,
  DrawerHeaderComponent,
  DrawerBodyComponent,
  DrawerFooterComponent,
} from '@/shared/blocks/drawer';
import { HeaderToolbarComponent, HeaderTitleComponent, HeaderActionsComponent } from '@/shared/blocks/header';
import { DarkModeToggleComponent } from '@/shared/blocks/dark-mode-toggle';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardIconComponent } from '@/shared/components/icon';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ScaffoldComponent,
    AppBarComponent,
    ScaffoldBodyComponent,
    BottomNavigationBarComponent,
    NavItemComponent,
    DrawerComponent,
    DrawerHeaderComponent,
    DrawerBodyComponent,
    DrawerFooterComponent,
    HeaderToolbarComponent,
    HeaderTitleComponent,
    HeaderActionsComponent,
    DarkModeToggleComponent,
    ZardButtonComponent,
    ZardIconComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly isDrawerOpen = signal(false);

  toggleDrawer(): void {
    this.isDrawerOpen.update((v) => !v);
  }

  closeDrawer(): void {
    this.isDrawerOpen.set(false);
  }
}

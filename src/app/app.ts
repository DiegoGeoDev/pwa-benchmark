import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ScaffoldComponent, AppBarComponent, ScaffoldBodyComponent } from '@/shared/blocks/scaffold';
import { BottomNavigationBarComponent, NavItemComponent } from '@/shared/blocks/bottom-navigation';
import { HeaderToolbarComponent, HeaderTitleComponent, HeaderActionsComponent } from '@/shared/blocks/header';
import { DarkModeToggleComponent } from '@/shared/blocks/dark-mode-toggle';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardIconComponent } from '@/shared/components/icon';
import { ZardToastComponent } from '@/shared/components/toast/toast.component';
import { ZardSheetService } from '@/shared/components/sheet';
import { AppNavigationDrawerContentComponent } from './app-navigation-drawer.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ScaffoldComponent,
    AppBarComponent,
    ScaffoldBodyComponent,
    BottomNavigationBarComponent,
    NavItemComponent,
    HeaderToolbarComponent,
    HeaderTitleComponent,
    HeaderActionsComponent,
    DarkModeToggleComponent,
    ZardButtonComponent,
    ZardIconComponent,
    ZardToastComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly sheetService = inject(ZardSheetService);

  openNavigationDrawer(): void {
    this.sheetService.create({
      zTitle: 'Menu',
      zContent: AppNavigationDrawerContentComponent,
      zSide: 'left',
      zSize: 'default',
      zHideFooter: true,
      zClosable: true,
      zMaskClosable: true,
    });
  }
}

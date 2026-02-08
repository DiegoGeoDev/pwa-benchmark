import { Component, inject } from '@angular/core';

import {
  ScaffoldComponent,
  AppBarComponent,
  ScaffoldBodyComponent,
} from '@/shared/blocks/scaffold';
import {
  HeaderToolbarComponent,
  HeaderTitleComponent,
  HeaderActionsComponent,
} from '@/shared/blocks/header';
import { DarkModeToggleComponent } from '@/shared/blocks/dark-mode-toggle';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardIconComponent } from '@/shared/components/icon';
import { ZardSheetService } from '@/shared/components/sheet';

import { NavigationDrawerContentComponent } from './components/navigation-drawer-content';

@Component({
  selector: 'app-home',
  imports: [
    ScaffoldComponent,
    AppBarComponent,
    ScaffoldBodyComponent,
    HeaderToolbarComponent,
    HeaderTitleComponent,
    HeaderActionsComponent,
    DarkModeToggleComponent,
    ZardButtonComponent,
    ZardIconComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly sheetService = inject(ZardSheetService);

  openNavigationDrawer(): void {
    this.sheetService.create({
      zTitle: 'Menu',
      zContent: NavigationDrawerContentComponent,
      zSide: 'left',
      zSize: 'default',
      zHideFooter: true,
      zClosable: true,
      zMaskClosable: true,
    });
  }
}

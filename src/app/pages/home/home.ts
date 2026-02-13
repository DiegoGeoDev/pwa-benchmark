import { Component, inject, signal, viewChild } from '@angular/core';

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
import { DarkModeToggleComponent } from '@/shared/blocks/dark-mode-toggle';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardIconComponent } from '@/shared/components/icon';
import { ZardSheetService } from '@/shared/components/sheet';

import { Anchor } from 'lucide-angular';

import { NavigationDrawerContentComponent } from './components/navigation-drawer-content';
import { FloatingActionButtonComponent } from '@/shared/blocks/fab';
import { BottomNavigationBarComponent, NavItemComponent } from '@/shared/blocks/bottom-navigation';

@Component({
  selector: 'app-home',
  imports: [
    ScaffoldComponent,
    AppBarComponent,
    ScaffoldBodyComponent,
    BottomAppBarComponent,
    HeaderToolbarComponent,
    HeaderTitleComponent,
    HeaderActionsComponent,
    DarkModeToggleComponent,
    ZardButtonComponent,
    ZardIconComponent,
    FloatingActionButtonComponent,
    BottomNavigationBarComponent,
    NavItemComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  // Expondo o ícone Anchor para uso no template
  readonly AnchorIcon = Anchor;
  private readonly sheetService = inject(ZardSheetService);

  readonly items = signal([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6',
    'Item 7',
    'Item 8',
    'Item 9',
    'Item 10',
    'Item 11',
    'Item 12',
    'Item 13',
    'Item 14',
    'Item 15',
  ]);

  handleRefresh(): void {
    const newItem = `Item ${this.items().length + 1}`;
    this.items.update((currentItems) => [...currentItems, newItem]);
  }

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

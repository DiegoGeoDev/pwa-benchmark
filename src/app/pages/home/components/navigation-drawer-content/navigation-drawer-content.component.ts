import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ZardIconComponent } from '@/shared/components/icon';

@Component({
  selector: 'app-navigation-drawer-content',
  imports: [RouterLink, ZardIconComponent],
  templateUrl: './navigation-drawer-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'appNavigationDrawerContent',
})
export class NavigationDrawerContentComponent {}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ZardIconComponent } from '@/shared/components/icon';

@Component({
  selector: 'app-navigation-drawer-content',
  imports: [RouterLink, ZardIconComponent],
  template: `
    <nav class="flex flex-col gap-2 p-4">
      <a
        routerLink="/"
        class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
      >
        <z-icon zType="house" />
        <span>Home</span>
      </a>
      <a
        routerLink="/benchmark-01"
        class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
      >
        <z-icon zType="activity" />
        <span>Benchmark 01</span>
      </a>
      <a
        routerLink="/settings"
        class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
      >
        <z-icon zType="settings" />
        <span>Settings</span>
      </a>
    </nav>

    <div class="mt-auto p-4 border-t border-border">
      <p class="text-sm text-muted-foreground">PWA v1.0.0</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'appNavigationDrawerContent',
})
export class AppNavigationDrawerContentComponent {}

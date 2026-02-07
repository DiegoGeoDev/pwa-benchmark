import { Component, ChangeDetectionStrategy, inject } from '@angular/core';

import { ZardDarkMode } from './dark-mode.service';
import { ZardButtonComponent } from '../../components/button';
import { ZardIconComponent } from '../../components/icon';

@Component({
  selector: 'z-dark-mode',
  templateUrl: './dark-mode-toggle.component.html',
  imports: [ZardButtonComponent, ZardIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DarkModeComponent {
  private readonly darkModeService = inject(ZardDarkMode);

  toggleTheme(): void {
    this.darkModeService.toggleTheme();
  }
}

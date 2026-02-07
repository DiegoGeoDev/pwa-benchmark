import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LayoutImports } from '@/shared/components/layout';
import { DarkModeToggleComponent } from '@/shared/blocks/dark-mode-toggle';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LayoutImports, DarkModeToggleComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}

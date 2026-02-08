import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  HeaderToolbarComponent,
  HeaderBackActionComponent,
  HeaderTitleComponent,
  HeaderActionsComponent,
} from '@/shared/blocks/header';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardIconComponent } from '@/shared/components/icon';

@Component({
  selector: 'app-benchmark-01',
  imports: [
    HeaderToolbarComponent,
    HeaderBackActionComponent,
    HeaderTitleComponent,
    HeaderActionsComponent,
    ZardButtonComponent,
    ZardIconComponent,
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

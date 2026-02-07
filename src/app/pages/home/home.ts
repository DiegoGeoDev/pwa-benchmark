import { Component } from '@angular/core';
import { ZardButtonComponent } from '@/shared/components/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ZardButtonComponent, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}

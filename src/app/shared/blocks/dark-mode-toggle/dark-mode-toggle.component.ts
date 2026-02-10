import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';

import type { ClassValue } from 'clsx';

import {
  ZardButtonComponent,
  type ZardButtonTypeVariants,
  type ZardButtonSizeVariants,
  type ZardButtonShapeVariants,
} from '../../components/button';
import { ZardIconComponent, type ZardIcon, type ZardIconSizeVariants } from '../../components/icon';
import { mergeClasses } from '../../utils/merge-classes';

import { ZardDarkMode } from './dark-mode.service';

@Component({
  selector: 'z-dark-mode-toggle',
  imports: [ZardButtonComponent, ZardIconComponent],
  template: `
    <button
      z-button
      [zType]="zButtonType()"
      [zSize]="zButtonSize()"
      [zShape]="zButtonShape()"
      [class]="buttonClasses()"
      [attr.aria-label]="ariaLabel()"
      (click)="toggleTheme()"
    >
      <z-icon [zType]="zIcon()" [zSize]="zIconSize()" [class]="iconClasses()" aria-hidden="true" />
      <span class="sr-only">{{ zLabel() }}</span>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '"contents"',
  },
  exportAs: 'zDarkModeToggle',
})
export class DarkModeToggleComponent {
  private readonly darkModeService = inject(ZardDarkMode);

  readonly class = input<ClassValue>('');

  readonly ariaLabel = input<string>('Toggle theme');
  readonly zLabel = input<string>('Toggle theme');

  readonly zButtonType = input<ZardButtonTypeVariants>('ghost');
  readonly zButtonSize = input<ZardButtonSizeVariants>('sm');
  readonly zButtonShape = input<ZardButtonShapeVariants>('default');
  readonly zButtonClass = input<ClassValue>('');

  readonly zIcon = input<ZardIcon>('dark-mode');
  readonly zIconSize = input<ZardIconSizeVariants>('default');
  readonly zIconClass = input<ClassValue>('size-4.5');

  protected readonly buttonClasses = computed(() =>
    mergeClasses(this.zButtonClass(), this.class()),
  );

  protected readonly iconClasses = computed(() => mergeClasses(this.zIconClass()));

  toggleTheme(): void {
    this.darkModeService.toggleTheme();
  }
}

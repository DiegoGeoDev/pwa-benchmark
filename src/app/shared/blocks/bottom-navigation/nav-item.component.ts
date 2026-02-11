import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
  ViewEncapsulation,
  booleanAttribute,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import type { ClassValue } from 'clsx';

import { ZardIconComponent, type ZardIcon } from '../../components/icon';
import { mergeClasses } from '../../utils/merge-classes';

import {
  navItemVariants,
  navItemLabelVariants,
  navItemIconVariants,
  type ZardNavItemSizeVariants,
} from './bottom-navigation.variants';

@Component({
  selector: 'z-nav-item',
  imports: [ZardIconComponent, RouterLink, RouterLinkActive],
  template: `
    <a
      [routerLink]="routerLink()"
      routerLinkActive
      [routerLinkActiveOptions]="{ exact: zExact() }"
      [class]="classes()"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-current]="isActive() ? 'page' : null"
      (isActiveChange)="isRouterActive.set($event)"
    >
      @if (zIcon()) {
        <z-icon [zType]="zIcon()!" [class]="iconClasses()" [attr.aria-hidden]="true" />
      }
      @if (zShowLabel()) {
        <span [class]="labelClasses()">{{ zLabel() }}</span>
      }
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '"block"',
  },
  exportAs: 'zNavItem',
})
export class NavItemComponent {
  readonly class = input<ClassValue>('');
  readonly zIcon = input<ZardIcon>();
  readonly zLabel = input<string>('');
  readonly zActive = input<boolean, any>(false, { transform: booleanAttribute });
  readonly zShowLabel = input<boolean, any>(true, { transform: booleanAttribute });
  readonly zSize = input<ZardNavItemSizeVariants>('default');
  readonly routerLink = input.required<string | any[]>();
  readonly zExact = input<boolean>(false);
  readonly ariaLabel = input<string>('');

  readonly isRouterActive = signal(false);

  protected readonly isActive = computed(() => this.zActive() || this.isRouterActive());

  protected readonly classes = computed(() =>
    mergeClasses(
      navItemVariants({
        zActive: this.isActive(),
        zShowLabel: this.zShowLabel(),
      }),
      this.class(),
    ),
  );

  protected readonly labelClasses = computed(() =>
    mergeClasses(
      navItemLabelVariants({
        zSize: this.zSize(),
      }),
    ),
  );

  protected readonly iconClasses = computed(() =>
    mergeClasses(
      navItemIconVariants({
        zSize: this.zSize(),
      }),
    ),
  );
}

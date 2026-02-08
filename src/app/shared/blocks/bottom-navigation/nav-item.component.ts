import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
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
  selector: 'z-nav-item, a[z-nav-item], button[z-nav-item]',
  imports: [ZardIconComponent, RouterLink, RouterLinkActive],
  template: `
    @if (routerLink()) {
      <a
        [routerLink]="routerLink()"
        routerLinkActive="active-link"
        [routerLinkActiveOptions]="{ exact: zExact() }"
        [class]="classes()"
        [attr.aria-label]="ariaLabel()"
        [attr.aria-current]="zActive() ? 'page' : null"
        (click)="handleClick()"
        #rla="routerLinkActive"
      >
        @if (zIcon()) {
          <z-icon [zType]="zIcon()!" [class]="iconClasses()" [attr.aria-hidden]="true" />
        }
        @if (zShowLabel()) {
          <span [class]="labelClasses()">{{ zLabel() }}</span>
        }
      </a>
    } @else {
      <button
        type="button"
        [class]="classes()"
        [attr.aria-label]="ariaLabel()"
        [attr.aria-current]="zActive() ? 'page' : null"
        [disabled]="zDisabled() || null"
        (click)="handleClick()"
      >
        @if (zIcon()) {
          <z-icon [zType]="zIcon()!" [class]="iconClasses()" [attr.aria-hidden]="true" />
        }
        @if (zShowLabel()) {
          <span [class]="labelClasses()">{{ zLabel() }}</span>
        }
      </button>
    }
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
  readonly zDisabled = input<boolean, any>(false, { transform: booleanAttribute });
  readonly zShowLabel = input<boolean, any>(true, { transform: booleanAttribute });
  readonly zSize = input<ZardNavItemSizeVariants>('default');
  readonly routerLink = input<string | any[]>();
  readonly zExact = input<boolean>(false);
  readonly ariaLabel = input<string>('');

  readonly onClick = output<void>();

  protected readonly classes = computed(() =>
    mergeClasses(
      navItemVariants({
        zActive: this.zActive(),
        zDisabled: this.zDisabled(),
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

  protected handleClick(): void {
    if (!this.zDisabled()) {
      this.onClick.emit();
    }
  }
}

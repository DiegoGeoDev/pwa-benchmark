import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  ViewEncapsulation,
  booleanAttribute,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import type { ClassValue } from 'clsx';

import { ZardIconComponent, type ZardIcon } from '../../components/icon';
import { mergeClasses } from '../../utils/merge-classes';

import {
  fabVariants,
  fabIconVariants,
  fabLabelVariants,
  type ZardFABContainedVariants,
  type ZardFABPositionVariants,
  type ZardFABSizeVariants,
  type ZardFABExtendedVariants,
  type ZardFABElevationVariants,
} from './fab.variants';

@Component({
  selector: 'z-fab, button[z-fab], a[z-fab]',
  imports: [ZardIconComponent, RouterLink],
  template: `
    @if (routerLink()) {
      <a
        [routerLink]="routerLink()"
        [class]="classes()"
        [attr.aria-label]="ariaLabel() || zLabel() || 'Floating action button'"
        role="button"
        (click)="handleClick()"
      >
        @if (zIcon()) {
          <z-icon [zType]="zIcon()!" [class]="iconClasses()" [attr.aria-hidden]="true" />
        }
        @if (zExtended() && zLabel()) {
          <span [class]="labelClasses()">{{ zLabel() }}</span>
        }
        <ng-content />
      </a>
    } @else {
      <button
        type="button"
        [class]="classes()"
        [attr.aria-label]="ariaLabel() || zLabel() || 'Floating action button'"
        [disabled]="zDisabled() || null"
        (click)="handleClick()"
      >
        @if (zIcon()) {
          <z-icon [zType]="zIcon()!" [class]="iconClasses()" [attr.aria-hidden]="true" />
        }
        @if (zExtended() && zLabel()) {
          <span [class]="labelClasses()">{{ zLabel() }}</span>
        }
        <ng-content />
      </button>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '"block"',
  },
  exportAs: 'zFab',
})
export class FloatingActionButtonComponent {
  readonly class = input<ClassValue>('');
  readonly zIcon = input<ZardIcon>();
  readonly zLabel = input<string>('');
  readonly zContained = input<ZardFABContainedVariants, any>(false, { transform: booleanAttribute });
  readonly zPosition = input<ZardFABPositionVariants>('bottom-right');
  readonly zSize = input<ZardFABSizeVariants>('default');
  readonly zExtended = input<ZardFABExtendedVariants, any>(false, { transform: booleanAttribute });
  readonly zElevation = input<ZardFABElevationVariants>('lg');
  readonly zDisabled = input<boolean, any>(false, { transform: booleanAttribute });
  readonly routerLink = input<string | any[]>();
  readonly ariaLabel = input<string>('');

  readonly onClick = output<void>();

  protected readonly classes = computed(() =>
    mergeClasses(
      fabVariants({
        zContained: this.zContained(),
        zPosition: this.zPosition(),
        zSize: this.zSize(),
        zExtended: this.zExtended(),
        zElevation: this.zElevation(),
      }),
      this.zDisabled() ? 'opacity-50 pointer-events-none' : '',
      this.class(),
    ),
  );

  protected readonly iconClasses = computed(() =>
    mergeClasses(
      fabIconVariants({
        zSize: this.zSize(),
      }),
    ),
  );

  protected readonly labelClasses = computed(() =>
    mergeClasses(
      fabLabelVariants({
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

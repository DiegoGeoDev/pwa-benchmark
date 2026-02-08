import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  type TemplateRef,
  type Type,
  ViewEncapsulation,
} from '@angular/core';

import type { ClassValue } from 'clsx';

import { ZardButtonComponent } from '../../components/button/button.component';
import { ZardIconComponent } from '../../components/icon/icon.component';
import type { ZardIcon } from '../../components/icon/icons';
import { type ZardSheetOptions, ZardSheetService } from '../../components/sheet';
import { mergeClasses } from '../../utils/merge-classes';

import { drawerTriggerVariants } from './drawer.variants';

@Component({
  selector: 'z-drawer-trigger',
  imports: [ZardButtonComponent, ZardIconComponent],
  template: `
    <button type="button" z-button [zType]="zButtonType()" [class]="classes()" (click)="openDrawer()">
      @if (zIcon()) {
        <z-icon [zType]="zIcon()" />
      }
      <ng-content />
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'zDrawerTrigger',
})
export class DrawerTriggerComponent<T = any, U = any> {
  private readonly sheetService = inject(ZardSheetService);

  readonly class = input<ClassValue>('');
  readonly zIcon = input<ZardIcon>('panel-left');
  readonly zButtonType = input<'default' | 'outline' | 'ghost'>('ghost');

  // Sheet configuration inputs
  readonly zTitle = input<string | TemplateRef<T>>();
  readonly zDescription = input<string>();
  readonly zContent = input.required<string | TemplateRef<T> | Type<T>>();
  readonly zData = input<U>();
  readonly zSide = input<'left' | 'right' | 'top' | 'bottom'>('left');
  readonly zSize = input<'sm' | 'default' | 'lg'>('default');
  readonly zOkText = input<string | null>('OK');
  readonly zCancelText = input<string | null>('Cancel');
  readonly zClosable = input<boolean>(true);
  readonly zMaskClosable = input<boolean>(true);
  readonly zHideFooter = input<boolean>(false);

  protected readonly classes = computed(() => mergeClasses(drawerTriggerVariants(), this.class()));

  openDrawer(): void {
    const config: ZardSheetOptions<T, U> = {
      zTitle: this.zTitle(),
      zDescription: this.zDescription(),
      zContent: this.zContent(),
      zData: this.zData(),
      zSide: this.zSide(),
      zSize: this.zSize(),
      zOkText: this.zOkText(),
      zCancelText: this.zCancelText(),
      zClosable: this.zClosable(),
      zMaskClosable: this.zMaskClosable(),
      zHideFooter: this.zHideFooter(),
    };

    this.sheetService.create(config);
  }
}

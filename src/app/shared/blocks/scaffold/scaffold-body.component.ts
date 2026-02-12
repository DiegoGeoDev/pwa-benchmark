import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';

import type { ClassValue } from 'clsx';

import { mergeClasses } from '../../utils/merge-classes';

import { scaffoldBodyVariants, type ZardScaffoldBodyPaddingVariants } from './scaffold.variants';

@Component({
  selector: 'z-scaffold-body',
  template: `
    <div [class]="classes()" (scroll)="handleScroll($event)">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'zScaffoldBody',
})
export class ScaffoldBodyComponent {
  readonly class = input<ClassValue>('');
  readonly zPadding = input<ZardScaffoldBodyPaddingVariants>('none');

  readonly onScroll = output<{ scrollTop: number; scrollHeight: number; clientHeight: number }>();

  protected readonly classes = computed(() =>
    mergeClasses(
      scaffoldBodyVariants({
        zPadding: this.zPadding(),
      }),
      this.class(),
    ),
  );

  protected handleScroll(event: Event): void {
    const target = event.target as HTMLElement;
    this.onScroll.emit({
      scrollTop: target.scrollTop,
      scrollHeight: target.scrollHeight,
      clientHeight: target.clientHeight,
    });
  }
}

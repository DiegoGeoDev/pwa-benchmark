import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import type { ClassValue } from 'clsx';

import { mergeClasses } from '../../utils/merge-classes';

import { scaffoldVariants, type ZardScaffoldSafeAreaVariants } from './scaffold.variants';

@Component({
  selector: 'z-scaffold',
  template: `
    <div [class]="classes()" role="main">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '"block w-full h-dvh"',
  },
  exportAs: 'zScaffold',
})
export class ScaffoldComponent {
  readonly class = input<ClassValue>('');
  readonly zSafeArea = input<ZardScaffoldSafeAreaVariants>(false);

  protected readonly classes = computed(() =>
    mergeClasses(
      scaffoldVariants({
        zSafeArea: this.zSafeArea(),
      }),
      this.class(),
    ),
  );
}

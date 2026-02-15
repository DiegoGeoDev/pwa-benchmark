import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import type { ClassValue } from 'clsx';

import { mergeClasses } from '../../utils/merge-classes';

@Component({
  selector: 'z-scaffold-fabs',
  template: `
    <div [class]="classes()">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '"absolute inset-0 pointer-events-none z-40"',
  },
  exportAs: 'zScaffoldFabs',
})
export class ScaffoldFabsComponent {
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() =>
    mergeClasses(
      'flex flex-col',
      this.class(),
    ),
  );
}

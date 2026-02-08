import { cva, type VariantProps } from 'class-variance-authority';

import { mergeClasses } from '../../utils/merge-classes';

export const bottomSheetBackdropVariants = cva(
  mergeClasses(
    'fixed inset-0 z-40',
    'bg-black/50 backdrop-blur-sm',
    'transition-opacity duration-300',
    'data-[state=closed]:opacity-0 data-[state=open]:opacity-100',
    'data-[state=closed]:pointer-events-none',
  ),
);

export const bottomSheetVariants = cva(
  mergeClasses(
    'fixed bottom-0 left-0 right-0 z-50',
    'bg-background',
    'rounded-t-2xl',
    'shadow-2xl',
    'transition-transform duration-300 ease-out',
    'data-[state=closed]:translate-y-full data-[state=open]:translate-y-0',
    'flex flex-col',
    'max-h-[90vh]',
    'overflow-hidden',
  ),
  {
    variants: {
      zSnap: {
        true: 'snap-y snap-mandatory',
        false: '',
      },
    },
    defaultVariants: {
      zSnap: false,
    },
  },
);

export const bottomSheetHandleVariants = cva(
  mergeClasses(
    'w-full flex items-center justify-center',
    'py-3 cursor-grab active:cursor-grabbing',
    'shrink-0',
  ),
);

export const bottomSheetHandleBarVariants = cva(
  mergeClasses('w-10 h-1 rounded-full', 'bg-muted-foreground/30'),
);

export const bottomSheetHeaderVariants = cva(
  mergeClasses(
    'flex items-center justify-between',
    'px-6 pb-4',
    'border-b border-border',
    'bg-background',
    'shrink-0',
  ),
);

export const bottomSheetBodyVariants = cva(
  mergeClasses('flex-1 overflow-y-auto overflow-x-hidden', 'p-6'),
);

export const bottomSheetFooterVariants = cva(
  mergeClasses(
    'flex items-center justify-end gap-2',
    'px-6 py-4',
    'border-t border-border',
    'bg-background',
    'shrink-0',
  ),
);

export type ZardBottomSheetSnapVariants = VariantProps<typeof bottomSheetVariants>['zSnap'];

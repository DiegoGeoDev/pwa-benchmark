import { cva, type VariantProps } from 'class-variance-authority';

import { mergeClasses } from '../../utils/merge-classes';

export const drawerBackdropVariants = cva(
  mergeClasses(
    'fixed inset-0 z-40',
    'bg-black/50 backdrop-blur-sm',
    'transition-opacity duration-300',
    'data-[state=closed]:opacity-0 data-[state=open]:opacity-100',
    'data-[state=closed]:pointer-events-none',
  ),
);

export const drawerVariants = cva(
  mergeClasses(
    'fixed z-50',
    'bg-background',
    'shadow-2xl',
    'transition-transform duration-300 ease-in-out',
    'flex flex-col',
    'overflow-hidden',
  ),
  {
    variants: {
      zPosition: {
        left: mergeClasses(
          'top-0 left-0 h-full',
          'border-r border-border',
          'data-[state=closed]:-translate-x-full data-[state=open]:translate-x-0',
        ),
        right: mergeClasses(
          'top-0 right-0 h-full',
          'border-l border-border',
          'data-[state=closed]:translate-x-full data-[state=open]:translate-x-0',
        ),
        top: mergeClasses(
          'top-0 left-0 w-full',
          'border-b border-border',
          'data-[state=closed]:-translate-y-full data-[state=open]:translate-y-0',
        ),
        bottom: mergeClasses(
          'bottom-0 left-0 w-full',
          'border-t border-border',
          'data-[state=closed]:translate-y-full data-[state=open]:translate-y-0',
        ),
      },
      zWidth: {
        sm: 'max-w-64',
        default: 'max-w-80',
        lg: 'max-w-96',
        full: 'max-w-full',
      },
    },
    defaultVariants: {
      zPosition: 'left',
      zWidth: 'default',
    },
  },
);

export const drawerHeaderVariants = cva(
  mergeClasses(
    'flex items-center justify-between',
    'px-6 py-4',
    'border-b border-border',
    'bg-background',
    'shrink-0',
  ),
);

export const drawerBodyVariants = cva(
  mergeClasses('flex-1 overflow-y-auto overflow-x-hidden', 'p-6'),
);

export const drawerFooterVariants = cva(
  mergeClasses(
    'flex items-center justify-end gap-2',
    'px-6 py-4',
    'border-t border-border',
    'bg-background',
    'shrink-0',
  ),
);

export type ZardDrawerPositionVariants = VariantProps<typeof drawerVariants>['zPosition'];
export type ZardDrawerWidthVariants = VariantProps<typeof drawerVariants>['zWidth'];

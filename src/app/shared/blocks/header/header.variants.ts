import { cva, type VariantProps } from 'class-variance-authority';

import { mergeClasses } from '../../utils/merge-classes';

export const headerVariants = cva(
  mergeClasses(
    'flex items-center justify-between w-full',
    'bg-background border-b border-border',
    'px-4 py-3',
  ),
  {
    variants: {
      zSize: {
        sm: 'h-12 px-3 py-2',
        default: 'h-14 px-4 py-3',
        lg: 'h-16 px-6 py-4',
      },
      zSticky: {
        true: 'sticky top-0 z-10',
        false: '',
      },
    },
    defaultVariants: {
      zSize: 'default',
      zSticky: false,
    },
  },
);

export const headerTitleVariants = cva(
  mergeClasses(
    'flex items-center justify-center flex-1',
    'text-center font-semibold truncate px-4',
    'text-foreground',
  ),
  {
    variants: {
      zSize: {
        sm: 'text-sm',
        default: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      zSize: 'default',
    },
  },
);

export const headerActionsVariants = cva(
  mergeClasses('flex items-center justify-end gap-2 min-w-0', 'shrink-0'),
  {
    variants: {
      zSize: {
        sm: 'gap-1',
        default: 'gap-2',
        lg: 'gap-3',
      },
    },
    defaultVariants: {
      zSize: 'default',
    },
  },
);

export type ZardHeaderSizeVariants = VariantProps<typeof headerVariants>['zSize'];
export type ZardHeaderStickyVariants = VariantProps<typeof headerVariants>['zSticky'];

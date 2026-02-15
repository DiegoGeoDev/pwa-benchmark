import { cva, type VariantProps } from 'class-variance-authority';

import { mergeClasses } from '../../utils/merge-classes';

export const fabVariants = cva(
  mergeClasses(
    'z-50',
    'inline-flex items-center justify-center gap-2',
    'rounded-full shadow-lg',
    'bg-primary text-primary-foreground',
    'hover:shadow-xl hover:scale-105',
    'active:scale-95',
    'transition-all duration-200',
    'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  ),
  {
    variants: {
      zContained: {
        true: 'absolute pointer-events-auto',
        false: 'fixed',
      },
      zPosition: {
        'bottom-right': 'bottom-6 right-6',
        'bottom-left': 'bottom-6 left-6',
        'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2',
        'top-right': 'top-6 right-6',
        'top-left': 'top-6 left-6',
        'top-center': 'top-6 left-1/2 -translate-x-1/2',
      },
      zSize: {
        sm: 'h-12 min-w-12 px-3 text-sm',
        default: 'h-14 min-w-14 px-4 text-base',
        lg: 'h-16 min-w-16 px-5 text-lg',
      },
      zExtended: {
        true: '',
        false: 'aspect-square p-0',
      },
      zElevation: {
        sm: 'shadow-sm hover:shadow-md',
        md: 'shadow-md hover:shadow-lg',
        lg: 'shadow-lg hover:shadow-xl',
        xl: 'shadow-xl hover:shadow-2xl',
      },
    },
    defaultVariants: {
      zContained: false,
      zPosition: 'bottom-right',
      zSize: 'default',
      zExtended: false,
      zElevation: 'lg',
    },
  },
);

export const fabIconVariants = cva(mergeClasses('shrink-0'), {
  variants: {
    zSize: {
      sm: 'size-5',
      default: 'size-6',
      lg: 'size-7',
    },
  },
  defaultVariants: {
    zSize: 'default',
  },
});

export const fabLabelVariants = cva(mergeClasses('font-medium whitespace-nowrap'), {
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
});

export type ZardFABContainedVariants = VariantProps<typeof fabVariants>['zContained'];
export type ZardFABPositionVariants = VariantProps<typeof fabVariants>['zPosition'];
export type ZardFABSizeVariants = VariantProps<typeof fabVariants>['zSize'];
export type ZardFABExtendedVariants = VariantProps<typeof fabVariants>['zExtended'];
export type ZardFABElevationVariants = VariantProps<typeof fabVariants>['zElevation'];

import { cva, type VariantProps } from 'class-variance-authority';

import { mergeClasses } from '../../utils/merge-classes';

export const bottomNavigationBarVariants = cva(
  mergeClasses(
    'w-full shrink-0',
    'bg-background border-t border-border',
    'flex items-center justify-around',
    'safe-area-inset-bottom',
  ),
  {
    variants: {
      zSize: {
        sm: 'h-14 pb-1',
        default: 'h-16 pb-2',
        lg: 'h-20 pb-3',
      },
      zElevation: {
        none: 'shadow-none',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
      },
    },
    defaultVariants: {
      zSize: 'default',
      zElevation: 'md',
    },
  },
);

export const navItemVariants = cva(
  mergeClasses(
    'flex flex-col items-center justify-center gap-1',
    'flex-1 h-full min-w-0',
    'cursor-pointer select-none',
    'transition-all duration-200',
    'text-muted-foreground hover:text-foreground',
    'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  ),
  {
    variants: {
      zActive: {
        true: 'text-primary font-medium',
        false: '',
      },
      zDisabled: {
        true: 'opacity-50 pointer-events-none',
        false: '',
      },
      zShowLabel: {
        true: '',
        false: 'gap-0',
      },
    },
    defaultVariants: {
      zActive: false,
      zDisabled: false,
      zShowLabel: true,
    },
  },
);

export const navItemLabelVariants = cva(
  mergeClasses('text-xs font-medium truncate max-w-full px-1'),
  {
    variants: {
      zSize: {
        sm: 'text-[10px]',
        default: 'text-xs',
        lg: 'text-sm',
      },
    },
    defaultVariants: {
      zSize: 'default',
    },
  },
);

export const navItemIconVariants = cva(mergeClasses('shrink-0'), {
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

export type ZardBottomNavigationBarSizeVariants = VariantProps<typeof bottomNavigationBarVariants>['zSize'];
export type ZardBottomNavigationBarElevationVariants = VariantProps<
  typeof bottomNavigationBarVariants
>['zElevation'];
export type ZardNavItemActiveVariants = VariantProps<typeof navItemVariants>['zActive'];
export type ZardNavItemSizeVariants = VariantProps<typeof navItemLabelVariants>['zSize'];

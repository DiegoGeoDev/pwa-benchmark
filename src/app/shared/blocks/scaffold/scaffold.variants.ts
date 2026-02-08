import { cva, type VariantProps } from 'class-variance-authority';

import { mergeClasses } from '../../utils/merge-classes';

export const scaffoldVariants = cva(
  mergeClasses(
    'relative flex flex-col',
    'w-full h-full min-h-screen',
    'bg-background text-foreground',
    'overflow-hidden',
  ),
  {
    variants: {
      zSafeArea: {
        true: 'safe-area-inset',
        false: '',
      },
    },
    defaultVariants: {
      zSafeArea: false,
    },
  },
);

export const appBarVariants = cva(
  mergeClasses(
    'w-full shrink-0',
    'bg-background',
    'border-b border-border',
    'z-10',
  ),
  {
    variants: {
      zElevation: {
        none: 'shadow-none',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
      },
      zTransparent: {
        true: 'bg-transparent border-none',
        false: '',
      },
      zSticky: {
        true: 'sticky top-0',
        false: '',
      },
    },
    defaultVariants: {
      zElevation: 'none',
      zTransparent: false,
      zSticky: true,
    },
  },
);

export const scaffoldBodyVariants = cva(
  mergeClasses(
    'flex-1 w-full',
    'overflow-y-auto overflow-x-hidden',
    'bg-background',
  ),
  {
    variants: {
      zPadding: {
        none: 'p-0',
        sm: 'p-2',
        default: 'p-4',
        lg: 'p-6',
      },
    },
    defaultVariants: {
      zPadding: 'none',
    },
  },
);

export type ZardScaffoldSafeAreaVariants = VariantProps<typeof scaffoldVariants>['zSafeArea'];
export type ZardAppBarElevationVariants = VariantProps<typeof appBarVariants>['zElevation'];
export type ZardAppBarTransparentVariants = VariantProps<typeof appBarVariants>['zTransparent'];
export type ZardAppBarStickyVariants = VariantProps<typeof appBarVariants>['zSticky'];
export type ZardScaffoldBodyPaddingVariants = VariantProps<typeof scaffoldBodyVariants>['zPadding'];

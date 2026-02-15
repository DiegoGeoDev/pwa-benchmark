import { cva, type VariantProps } from 'class-variance-authority';
import { mergeClasses } from '../../utils/merge-classes';

// Map FPS Variants
export const mapFpsVariants = cva(
  mergeClasses(
    // Base styles
    'pointer-events-auto',
    'absolute z-50',
    'flex items-center justify-center',
    'rounded-lg',
    'shadow-lg',
    'transition-all duration-300',
    'select-none',
    'bg-background text-foreground',
  ),
  {
    variants: {
      zPosition: {
        'top-left': 'top-4 left-4',
        'top-right': 'top-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        'bottom-right': 'bottom-4 right-4',
      },
      zSize: {
        sm: 'px-2 py-1.5 min-w-[60px]',
        default: 'px-3 py-2 min-w-[70px]',
        lg: 'px-4 py-2.5 min-w-[80px]',
      },
      performanceLevel: {
        excellent: 'text-green-700 dark:text-green-300',
        good: 'text-blue-700 dark:text-blue-300',
        fair: 'text-yellow-700 dark:text-yellow-300',
        poor: 'text-red-700 dark:text-red-300',
        idle: 'text-gray-600 dark:text-gray-400',
      },
    },
    defaultVariants: {
      zPosition: 'top-left',
      zSize: 'default',
      performanceLevel: 'idle',
    },
  },
);

export type MapFpsPositionVariants = VariantProps<typeof mapFpsVariants>['zPosition'];
export type MapFpsSizeVariants = VariantProps<typeof mapFpsVariants>['zSize'];
export type MapFpsPerformanceLevelVariants = VariantProps<typeof mapFpsVariants>['performanceLevel'];

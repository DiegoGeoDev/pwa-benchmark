import { cva, type VariantProps } from 'class-variance-authority';
import { mergeClasses } from '../../utils/merge-classes';

export type MapZoomLevel = 'idle' | 'world' | 'region' | 'city' | 'district' | 'street';

export const mapZoomVariants = cva(
  mergeClasses(
    'pointer-events-auto',
    'absolute z-50',
    'flex flex-col items-center',
    'rounded-lg',
    'shadow-lg shadow-black/40',
    'transition-colors duration-300',
    'select-none',
    'px-3.5 py-2.5 min-w-[90px]',
  ),
  {
    variants: {
      zPosition: {
        'top-left': 'top-4 left-4',
        'top-right': 'top-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        'bottom-right': 'bottom-4 right-4',
      },
      zoomLevel: {
        idle: 'bg-gray-900/80 text-gray-400',
        world: 'bg-blue-950/80 text-blue-300',
        region: 'bg-teal-950/80 text-cyan-300',
        city: 'bg-green-950/80 text-green-300',
        district: 'bg-amber-950/80 text-yellow-300',
        street: 'bg-orange-950/80 text-orange-300',
      },
    },
    defaultVariants: {
      zPosition: 'bottom-left',
      zoomLevel: 'idle',
    },
  },
);

export const MAP_ZOOM_BAR_CLASSES: Record<MapZoomLevel, string> = {
  idle: 'bg-gray-600',
  world: 'bg-blue-700',
  region: 'bg-teal-600',
  city: 'bg-green-600',
  district: 'bg-amber-500',
  street: 'bg-orange-600',
};

export type MapZoomPositionVariants = VariantProps<typeof mapZoomVariants>['zPosition'];
export type MapZoomLevelVariants = VariantProps<typeof mapZoomVariants>['zoomLevel'];

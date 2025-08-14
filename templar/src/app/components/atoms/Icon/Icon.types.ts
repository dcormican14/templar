import React from 'react';
import type { IconName } from './iconRegistry';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconColor = 'inherit' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'muted';

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'name' | 'color'> {
  name: IconName | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  size?: IconSize | number;
  color?: IconColor | string;
  spin?: boolean;
  pulse?: boolean;
  className?: string;
}

// Re-export IconName for convenience
export type { IconName };

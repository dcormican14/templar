import React from 'react';
import type { IconName } from './iconRegistry';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconColor = 'inherit' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'info' | 'muted' | 'custom';

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'name' | 'color'> {
  /**
   * Icon name from the icon registry or custom component
   */
  name: IconName | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  
  /**
   * Size of the icon
   * @default 'md'
   */
  size?: IconSize | number;
  
  /**
   * Color of the icon (semantic color or custom string)
   * @default 'inherit'
   */
  color?: IconColor | string;
  
  /**
   * Custom color when color is set to 'custom'
   */
  customColor?: string;
  
  /**
   * Whether the icon should spin
   * @default false
   */
  spin?: boolean;
  
  /**
   * Whether the icon should pulse
   * @default false
   */
  pulse?: boolean;
  
  /**
   * Additional CSS class names
   */
  className?: string;
}

// Re-export IconName for convenience
export type { IconName };

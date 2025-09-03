import React from 'react';
import type { IconName } from './iconRegistry';
import type { UniversalSize, UniversalColor } from '../types';

// Component-specific type aliases (for backward compatibility)
export type IconSize = UniversalSize;
export type IconColor = UniversalColor | 'inherit' | 'muted';

// Component-specific props (not covered by universal props)
export interface IconSpecificProps extends Omit<React.SVGProps<SVGSVGElement>, 'name' | 'color' | 'size'> {
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
}

// Complete Icon props interface (no universal props inheritance needed as Icon is simple)
export interface IconProps extends IconSpecificProps {}

// Re-export IconName for convenience
export type { IconName };

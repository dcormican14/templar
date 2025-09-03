import React from 'react';
import type { 
  WithContainerProps, 
  UniversalSize, 
  UniversalColor, 
  UniversalVariant, 
  UniversalShape 
} from '../types';

// Component-specific type aliases (for backward compatibility)
export type BadgeSize = UniversalSize;
export type BadgeColor = UniversalColor;
export type BadgeVariant = UniversalVariant;
export type BadgeShape = UniversalShape;

// Component-specific props (not covered by universal props)
export interface BadgeSpecificProps {
  /**
   * Icon to display in the badge
   */
  icon?: React.ReactNode;
  
  /**
   * Position of the icon relative to text
   * @default 'leading'
   */
  iconPosition?: 'leading' | 'trailing';
  
  /**
   * Whether the badge can be removed/dismissed
   * @default false
   */
  removable?: boolean;
  
  /**
   * Callback fired when the badge is removed
   */
  onRemove?: () => void;
}

// Complete Badge props interface extending universal props
export interface BadgeProps extends WithContainerProps<BadgeSpecificProps> {}

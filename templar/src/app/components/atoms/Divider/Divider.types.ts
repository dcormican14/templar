import React from 'react';
import type { 
  WithContainerProps, 
  UniversalSize, 
  UniversalColor 
} from '../types';

// Component-specific type aliases (for backward compatibility)
export type DividerColor = UniversalColor | 'muted';
export type DividerSize = UniversalSize;
export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerSpacing = 'none' | UniversalSize;

// Component-specific props (not covered by universal props)
export interface DividerSpecificProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Orientation of the divider
   * @default 'horizontal'
   */
  orientation?: DividerOrientation;
  
  /**
   * Spacing around the divider (follows 4px spacing system)
   * @default 'md'
   */
  spacing?: DividerSpacing;
  
  /**
   * Whether the divider should take full width/height
   * @default true
   */
  fullSize?: boolean;
  
  /**
   * Optional text label to display in the center of the divider
   */
  label?: React.ReactNode;
  
  /**
   * Position of the label on the divider
   * @default 'center'
   */
  labelPosition?: 'start' | 'center' | 'end';
  
  /**
   * Whether to apply opacity to create a subtle appearance
   * @default false
   */
  subtle?: boolean;
  
  /**
   * Whether to use a dashed line style
   * @default false
   */
  dashed?: boolean;
  
  /**
   * Whether to use a dotted line style
   * @default false
   */
  dotted?: boolean;
}

// Complete Divider props interface extending universal props
export interface DividerProps extends WithContainerProps<DividerSpecificProps> {}

import React from 'react';
import type { 
  WithFormProps, 
  UniversalSize, 
  UniversalColor 
} from '../types';

// Component-specific type aliases (for backward compatibility)
export type ToggleSize = UniversalSize;
export type ToggleColor = UniversalColor;

// Component-specific props (not covered by universal props)
export interface ToggleSpecificProps {
  /**
   * Whether the toggle is checked/active
   */
  checked?: boolean;
  
  /**
   * Default checked state for uncontrolled component
   */
  defaultChecked?: boolean;
  
  /**
   * Callback fired when the toggle state changes
   */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  
  /**
   * Description text shown below the label
   */
  description?: string;
  
  /**
   * Whether to show the label on the left or right side
   * @default 'right'
   */
  labelPosition?: 'left' | 'right';
}

// Complete Toggle props interface extending universal props
export interface ToggleProps extends WithFormProps<ToggleSpecificProps> {}

export interface ToggleRef {
  focus: () => void;
  blur: () => void;
  click: () => void;
}

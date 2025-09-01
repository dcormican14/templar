import React from 'react';

export type ToggleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ToggleColor = 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'info';

export interface ToggleProps {
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
   * Whether the toggle is disabled
   */
  disabled?: boolean;
  
  /**
   * Size of the toggle
   * @default 'md'
   */
  size?: ToggleSize;
  
  /**
   * Color variant of the toggle
   * @default 'primary'
   */
  color?: ToggleColor;
  
  /**
   * Label text for the toggle
   */
  label?: string;
  
  /**
   * Description text shown below the label
   */
  description?: string;
  
  /**
   * Whether to show the label on the left or right side
   * @default 'right'
   */
  labelPosition?: 'left' | 'right';
  
  /**
   * Custom name attribute for the input
   */
  name?: string;
  
  /**
   * Custom value attribute for the input
   */
  value?: string;
  
  /**
   * Whether the toggle is required
   */
  required?: boolean;
  
  /**
   * Custom aria-label for accessibility
   */
  'aria-label'?: string;
  
  /**
   * Custom aria-describedby for accessibility
   */
  'aria-describedby'?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Custom inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Custom ID for the toggle
   */
  id?: string;
}

export interface ToggleRef {
  focus: () => void;
  blur: () => void;
  click: () => void;
}

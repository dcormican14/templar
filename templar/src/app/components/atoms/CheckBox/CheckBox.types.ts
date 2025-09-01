import React from 'react';

export type CheckBoxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type CheckBoxColor = 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'info' | 'custom';
export type CheckBoxShape = 'sharp' | 'round' | 'pill';

export interface CheckBoxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange'> {
  /**
   * Size of the checkbox
   * @default 'md'
   */
  size?: CheckBoxSize;
  
  /**
   * Color scheme of the checkbox
   * @default 'primary'
   */
  color?: CheckBoxColor;
  
  /**
   * Custom color when color is set to 'custom'
   */
  customColor?: string;
  
  /**
   * Shape of the checkbox corners
   * @default 'round'
   */
  shape?: CheckBoxShape;
  
  /**
   * Whether the checkbox is checked (controlled mode)
   * When provided, the component operates in controlled mode
   */
  checked?: boolean;
  
  /**
   * Default checked state for uncontrolled mode
   * @default false
   */
  defaultChecked?: boolean;
  
  /**
   * Whether the checkbox is in an indeterminate state
   */
  indeterminate?: boolean;
  
  /**
   * Whether the checkbox is disabled
   */
  disabled?: boolean;
  
  /**
   * Whether the checkbox is in an error state
   */
  error?: boolean;
  
  /**
   * Label text for the checkbox
   */
  label?: string;
  
  /**
   * Description text shown below the label
   */
  description?: string;
  
  /**
   * Whether to use rounded corners
   * @default false
   * @deprecated Use shape prop instead
   */
  rounded?: boolean;
  
  /**
   * Whether clicking on label and description should toggle the checkbox
   * @default true
   */
  contentToggleable?: boolean;
  
  /**
   * Callback function called when the checkbox state changes
   * In uncontrolled mode, this provides the new checked state
   * In controlled mode, this is called when user attempts to change state
   */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
}

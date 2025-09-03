import React from 'react';
import type { 
  WithFormProps, 
  UniversalSize, 
  UniversalColor, 
  UniversalShape 
} from '../types';

// Component-specific type aliases (for backward compatibility)
export type CheckBoxColor = UniversalColor;
export type CheckBoxSize = UniversalSize;
export type CheckBoxShape = UniversalShape;

// Component-specific props (not covered by universal props)  
export interface CheckBoxSpecificProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange'> {
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
   * Description text shown below the label (in addition to helperText)
   */
  description?: string;
  
  /**
   * Whether clicking on label and description should toggle the checkbox
   * @default true
   */
  contentToggleable?: boolean;
}

// Complete CheckBox props interface extending universal props
export interface CheckBoxProps extends Omit<WithFormProps<CheckBoxSpecificProps>, 'onChange'> {
  /**
   * Callback function called when the checkbox state changes
   * In uncontrolled mode, this provides the new checked state
   * In controlled mode, this is called when user attempts to change state
   */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
}

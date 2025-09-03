import React, { ComponentProps, ReactNode } from 'react';
import type { 
  WithFormProps, 
  UniversalSize, 
  UniversalColor, 
  UniversalVariant,
  UniversalShape 
} from '../types';

// Component-specific type aliases (for backward compatibility)
export type RadioButtonSize = UniversalSize;
export type RadioButtonColor = UniversalColor;
export type RadioButtonVariant = UniversalVariant;
export type RadioButtonShape = UniversalShape;

// Component-specific props (not covered by universal props)
export interface RadioButtonSpecificProps extends Omit<ComponentProps<'input'>, 'size' | 'type' | 'color'> {
  /**
   * Label text for the radio button
   */
  label?: ReactNode;
  
  /**
   * Description text shown below the label
   */
  description?: ReactNode;
  
  /**
   * Position of the label relative to the radio button
   * @default 'right'
   */
  labelPosition?: 'left' | 'right';
  
  /**
   * Whether clicking on the label/description should toggle the radio button
   * @default true
   */
  contentToggleable?: boolean;
}

// Complete RadioButton props interface extending universal props with label override
export interface RadioButtonProps extends Omit<WithFormProps<RadioButtonSpecificProps>, 'label'> {
  /**
   * Label text for the radio button (can be ReactNode)
   */
  label?: ReactNode;
}

export interface RadioButtonRef {
  focus: () => void;
  blur: () => void;
  click: () => void;
}

export interface RadioButtonGroupProps {
  /**
   * The name attribute for all radio buttons in the group
   */
  name: string;
  
  /**
   * The currently selected value
   */
  value?: string;
  
  /**
   * Callback when the selected value changes
   */
  onChange?: (value: string) => void;
  
  /**
   * The size of all radio buttons in the group
   * @default 'md'
   */
  size?: RadioButtonSize;
  
  /**
   * Color scheme of all radio buttons in the group
   * @default 'primary'
   */
  color?: RadioButtonColor;
  
  /**
   * Custom color when color is set to 'custom'
   */
  customColor?: string;
  
  /**
   * Shape of all radio buttons in the group
   * @default 'pill'
   */
  shape?: RadioButtonShape;
  
  /**
   * Whether all radio buttons in the group are disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether all radio buttons in the group are in an error state
   * @default false
   */
  error?: boolean;
  
  /**
   * The radio button options
   */
  options: Array<{
    value: string;
    label?: ReactNode;
    description?: ReactNode;
    disabled?: boolean;
  }>;
  
  /**
   * Position of labels relative to radio buttons
   * @default 'right'
   */
  labelPosition?: 'left' | 'right';
  
  /**
   * Layout direction for the group
   * @default 'vertical'
   */
  orientation?: 'horizontal' | 'vertical';
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Additional CSS styles
   */
  style?: React.CSSProperties;
}

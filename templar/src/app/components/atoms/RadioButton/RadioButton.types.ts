import { ComponentProps, ReactNode } from 'react';

export type RadioButtonSize = 'sm' | 'md' | 'lg';
export type RadioButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error';

export interface RadioButtonProps extends Omit<ComponentProps<'input'>, 'size' | 'type'> {
  /**
   * The size of the radio button
   * @default 'md'
   */
  size?: RadioButtonSize;
  
  /**
   * The visual variant of the radio button
   * @default 'primary'
   */
  variant?: RadioButtonVariant;
  
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
   * Whether the radio button is in an invalid state
   * @default false
   */
  invalid?: boolean;
  
  /**
   * Whether clicking on the label/description should toggle the radio button
   * @default true
   */
  contentToggleable?: boolean;
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
   * The variant of all radio buttons in the group
   * @default 'primary'
   */
  variant?: RadioButtonVariant;
  
  /**
   * Whether all radio buttons in the group are disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether all radio buttons in the group are in an invalid state
   * @default false
   */
  invalid?: boolean;
  
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

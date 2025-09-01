import React from 'react';

export type SliderSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SliderColor = 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'info' | 'custom';
export type SliderOrientation = 'horizontal' | 'vertical';

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /**
   * Color scheme of the slider
   * @default 'primary'
   */
  color?: SliderColor;
  
  /**
   * Custom color when color is set to 'custom'
   */
  customColor?: string;
  
  /**
   * Size of the slider
   * @default 'md'
   */
  size?: SliderSize;
  
  /**
   * Orientation of the slider
   * @default 'horizontal'
   */
  orientation?: SliderOrientation;
  
  /**
   * Current value of the slider (controlled mode)
   */
  value?: number;
  
  /**
   * Default value for uncontrolled mode
   * @default 0
   */
  defaultValue?: number;
  
  /**
   * Minimum value
   * @default 0
   */
  min?: number;
  
  /**
   * Maximum value
   * @default 100
   */
  max?: number;
  
  /**
   * Step increment
   * @default 1
   */
  step?: number;
  
  /**
   * Whether the slider is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether the slider is in an error state
   * @default false
   */
  error?: boolean;
  
  /**
   * Callback fired when the value changes
   */
  onChange?: (value: number, event: React.ChangeEvent<HTMLInputElement>) => void;
  
  /**
   * Callback fired when the slider is clicked/moved
   */
  onInput?: (value: number, event: React.FormEvent<HTMLInputElement>) => void;
  
  /**
   * Whether to show value tooltip
   * @default false
   */
  showTooltip?: boolean;
  
  /**
   * Whether to show tick marks
   * @default false
   */
  showTicks?: boolean;
  
  /**
   * Custom tick marks configuration
   */
  ticks?: Array<{
    value: number;
    label?: string;
  }>;
  
  /**
   * Label for the slider
   */
  label?: string;
  
  /**
   * Description text shown below the slider
   */
  description?: string;
  
  /**
   * Whether to show min/max labels
   * @default false
   */
  showLabels?: boolean;
  
  /**
   * Custom min label
   */
  minLabel?: string;
  
  /**
   * Custom max label
   */
  maxLabel?: string;
  
  /**
   * Width for horizontal sliders or height for vertical sliders
   */
  length?: string | number;
  
  /**
   * Whether to format the value display
   */
  formatValue?: (value: number) => string;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
}

export interface SliderRef {
  focus: () => void;
  blur: () => void;
}
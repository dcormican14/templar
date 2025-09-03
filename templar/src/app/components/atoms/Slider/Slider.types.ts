import React from 'react';
import type { 
  WithFormProps, 
  UniversalSize, 
  UniversalColor 
} from '../types';

// Component-specific type aliases (for backward compatibility)
export type SliderSize = UniversalSize;
export type SliderColor = UniversalColor;
export type SliderOrientation = 'horizontal' | 'vertical';

// Component-specific props (not covered by universal props)
export interface SliderSpecificProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'color' | 'onInput'> {
  /**
   * Orientation of the slider
   * @default 'horizontal'
   */
  orientation?: SliderOrientation;
  
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
  
}

// Complete Slider props interface extending universal props with custom onChange
export interface SliderProps extends Omit<WithFormProps<SliderSpecificProps>, 'onChange'> {
  /**
   * Callback fired when the value changes
   */
  onChange?: (value: number, event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SliderRef {
  focus: () => void;
  blur: () => void;
}
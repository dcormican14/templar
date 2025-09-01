import type { SliderSize, SliderColor } from './Slider.types';

/**
 * Get the default size for consistency
 */
export const getDefaultSize = (): SliderSize => 'md';

/**
 * Get the default color for consistency
 */
export const getDefaultColor = (): SliderColor => 'primary';

/**
 * Clamp a value between min and max
 */
export const clampValue = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Round a value to the nearest step
 */
export const roundToStep = (value: number, step: number): number => {
  return Math.round(value / step) * step;
};

/**
 * Calculate percentage from value
 */
export const getPercentage = (value: number, min: number, max: number): number => {
  return ((value - min) / (max - min)) * 100;
};

/**
 * Calculate value from percentage
 */
export const getValueFromPercentage = (percentage: number, min: number, max: number): number => {
  return min + (percentage / 100) * (max - min);
};

/**
 * Get value from mouse/touch position
 */
export const getValueFromPosition = (
  clientX: number,
  clientY: number,
  rect: DOMRect,
  orientation: 'horizontal' | 'vertical',
  min: number,
  max: number,
  step: number
): number => {
  let percentage: number;
  
  if (orientation === 'horizontal') {
    percentage = ((clientX - rect.left) / rect.width) * 100;
  } else {
    percentage = ((rect.bottom - clientY) / rect.height) * 100;
  }
  
  percentage = Math.max(0, Math.min(100, percentage));
  const value = getValueFromPercentage(percentage, min, max);
  return roundToStep(clampValue(value, min, max), step);
};

/**
 * Format value for display
 */
export const formatValue = (
  value: number,
  formatter?: (value: number) => string
): string => {
  if (formatter) {
    return formatter(value);
  }
  
  // Default formatting - remove unnecessary decimals
  if (Number.isInteger(value)) {
    return value.toString();
  }
  
  return value.toFixed(2).replace(/\.?0+$/, '');
};

/**
 * Validate slider props
 */
export const validateSliderProps = (props: {
  min: number;
  max: number;
  step: number;
  value?: number;
  defaultValue?: number;
}) => {
  const { min, max, step, value, defaultValue } = props;
  
  if (process.env.NODE_ENV === 'development') {
    if (min >= max) {
      console.warn('Slider: min value should be less than max value');
    }
    
    if (step <= 0) {
      console.warn('Slider: step should be a positive number');
    }
    
    if (value !== undefined && (value < min || value > max)) {
      console.warn(`Slider: value (${value}) is outside the range [${min}, ${max}]`);
    }
    
    if (defaultValue !== undefined && (defaultValue < min || defaultValue > max)) {
      console.warn(`Slider: defaultValue (${defaultValue}) is outside the range [${min}, ${max}]`);
    }
  }
};

/**
 * Generate tick marks
 */
export const generateTicks = (
  min: number,
  max: number,
  step: number,
  customTicks?: Array<{ value: number; label?: string }>
): Array<{ value: number; label?: string }> => {
  if (customTicks) {
    return customTicks.filter(tick => tick.value >= min && tick.value <= max);
  }
  
  const ticks: Array<{ value: number; label?: string }> = [];
  for (let value = min; value <= max; value += step) {
    ticks.push({ value });
  }
  
  return ticks;
};

/**
 * Handle keyboard navigation
 */
export const handleKeyDown = (
  event: React.KeyboardEvent<HTMLInputElement>,
  value: number,
  min: number,
  max: number,
  step: number,
  orientation: 'horizontal' | 'vertical',
  onChange?: (value: number, event: React.ChangeEvent<HTMLInputElement>) => void
) => {
  const { key } = event;
  let newValue = value;
  
  const largeStep = step * 10;
  const isHorizontal = orientation === 'horizontal';
  
  switch (key) {
    case 'ArrowUp':
      newValue = isHorizontal ? value + step : value + step;
      break;
    case 'ArrowDown':
      newValue = isHorizontal ? value - step : value - step;
      break;
    case 'ArrowLeft':
      newValue = isHorizontal ? value - step : value;
      break;
    case 'ArrowRight':
      newValue = isHorizontal ? value + step : value;
      break;
    case 'PageUp':
      newValue = value + largeStep;
      break;
    case 'PageDown':
      newValue = value - largeStep;
      break;
    case 'Home':
      newValue = min;
      break;
    case 'End':
      newValue = max;
      break;
    default:
      return; // Don't handle other keys
  }
  
  event.preventDefault();
  
  newValue = roundToStep(clampValue(newValue, min, max), step);
  
  if (newValue !== value && onChange) {
    // Create a synthetic change event
    const syntheticEvent = {
      target: { value: newValue.toString() },
      currentTarget: { value: newValue.toString() },
      type: 'change',
      bubbles: true,
      cancelable: true,
      preventDefault: () => {},
      stopPropagation: () => {},
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    
    onChange(newValue, syntheticEvent);
  }
};

/**
 * Get ARIA attributes for slider
 */
export const getAriaAttributes = (props: {
  value: number;
  min: number;
  max: number;
  step: number;
  disabled: boolean;
  orientation: 'horizontal' | 'vertical';
  label?: string;
  describedBy?: string;
}) => {
  const { value, min, max, step, disabled, orientation, label, describedBy } = props;
  
  return {
    role: 'slider',
    'aria-valuemin': min,
    'aria-valuemax': max,
    'aria-valuenow': value,
    'aria-valuetext': formatValue(value),
    'aria-orientation': orientation,
    'aria-disabled': disabled,
    'aria-label': label,
    'aria-describedby': describedBy,
    tabIndex: disabled ? -1 : 0,
  };
};
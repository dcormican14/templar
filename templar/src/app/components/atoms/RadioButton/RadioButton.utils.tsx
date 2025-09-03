import { RadioButtonSize, RadioButtonColor } from './RadioButton.types';

/**
 * Generate a unique ID for radio button accessibility
 */
export const generateRadioButtonId = (name: string, value: string): string => {
  return `radio-${name}-${value}`.replace(/[^a-zA-Z0-9-_]/g, '-');
};

/**
 * Validate radio button props
 */
export const validateRadioButtonProps = (props: {
  name?: string;
  value?: string | number | readonly string[];
  checked?: boolean;
  defaultChecked?: boolean;
}) => {
  const { name, value, checked, defaultChecked } = props;
  
  if (process.env.NODE_ENV === 'development') {
    if (checked !== undefined && defaultChecked !== undefined) {
      console.warn(
        'RadioButton: You provided both checked and defaultChecked props. ' +
        'A component should be either controlled (with checked) or uncontrolled (with defaultChecked), but not both.'
      );
    }
    
    if (!name) {
      console.warn(
        'RadioButton: Missing name prop. Radio buttons should have a name attribute for proper grouping.'
      );
    }
    
    if (!value) {
      console.warn(
        'RadioButton: Missing value prop. Radio buttons should have a value attribute.'
      );
    }
  }
};

/**
 * Get the default size for consistency
 */
export const getDefaultSize = (): RadioButtonSize => 'md';

/**
 * Get the default color for consistency
 */
export const getDefaultColor = (): RadioButtonColor => 'primary';

/**
 * Get the default variant for consistency (RadioButton doesn't use variants, but needed for compatibility)
 */
export const getDefaultVariant = () => 'solid';

/**
 * Check if a radio button should be considered invalid
 */
export const getValidationState = (
  invalid?: boolean,
  required?: boolean,
  checked?: boolean
): boolean => {
  if (invalid !== undefined) return invalid;
  if (required && !checked) return true;
  return false;
};

/**
 * Format radio button group options
 */
export const formatGroupOptions = (options: Array<{
  value: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}>) => {
  return options.map(option => ({
    ...option,
    id: generateRadioButtonId('group', option.value),
  }));
};

/**
 * Get ARIA attributes for radio button
 */
export const getAriaAttributes = (props: {
  checked?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  describedBy?: string;
  labelledBy?: string;
}) => {
  const { checked, disabled, invalid, required, describedBy, labelledBy } = props;
  
  return {
    'aria-checked': checked || false,
    'aria-disabled': disabled || false,
    'aria-invalid': invalid || false,
    'aria-required': required || false,
    'aria-describedby': describedBy || undefined,
    'aria-labelledby': labelledBy || undefined,
  };
};

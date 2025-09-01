import React, { forwardRef, useRef, useImperativeHandle, useState, useId } from 'react';
import { useCSSVariables, useSettings } from '../../../providers';
import { RadioButtonProps, RadioButtonRef, RadioButtonGroupProps } from './RadioButton.types';
import {
  getRadioButtonContainerStyles,
  getRadioButtonCircleStyles,
  getRadioButtonDotStyles,
  getHiddenInputStyles,
  getLabelStyles,
  getDescriptionStyles,
  getLabelContainerStyles,
  getRadioButtonGroupStyles,
} from './RadioButton.styles';
import {
  validateRadioButtonProps,
  getDefaultSize,
  getDefaultColor,
  getValidationState,
  getAriaAttributes,
} from './RadioButton.utils';

export const RadioButton = forwardRef<RadioButtonRef, RadioButtonProps>(({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  size = getDefaultSize(),
  color = getDefaultColor(),
  customColor,
  shape = 'pill',
  label,
  description,
  labelPosition = 'right',
  error = false,
  contentToggleable = true,
  name,
  value,
  required = false,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  className,
  style,
  id: providedId,
  ...rest
}, ref) => {
  // Get CSS variables for theming and settings
  const cssVars = useCSSVariables();
  const { settings } = useSettings();
  const animationsEnabled = settings.appearance.animations;
  
  // Generate unique ID if not provided
  const generatedId = useId();
  const id = providedId || generatedId;
  
  // Validate props in development
  validateRadioButtonProps({ name, value, checked, defaultChecked });
  
  // Internal state for uncontrolled mode
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const [focused, setFocused] = useState(false);
  
  // Determine if controlled or uncontrolled
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;
  const isError = getValidationState(error, required, isChecked);
  
  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Expose imperative methods
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
    click: () => inputRef.current?.click(),
  }));
  
  // Handle change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    
    // Focus the radio button after change
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
    
    onChange?.(event);
  };
  
  // Handle focus
  const handleFocus = () => {
    setFocused(true);
  };
  
  // Handle blur
  const handleBlur = () => {
    setFocused(false);
  };
  
  // Handle container click
  const handleContainerClick = (event: React.MouseEvent) => {
    if (!contentToggleable || disabled) return;
    
    // Prevent double triggering when clicking the input directly
    if (event.target !== inputRef.current) {
      inputRef.current?.click();
      // Ensure focus after click
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };
  
  // Generate IDs for accessibility
  const labelId = label ? `${id}-label` : undefined;
  const descriptionId = description ? `${id}-description` : undefined;
  
  // Build aria-describedby
  const ariaDescribedByValue = [ariaDescribedBy, descriptionId].filter(Boolean).join(' ') || undefined;
  
  // Get ARIA attributes
  const ariaAttributes = getAriaAttributes({
    checked: isChecked,
    disabled,
    invalid: isError,
    required,
    describedBy: ariaDescribedByValue,
    labelledBy: labelId,
  });
  
  // Render label content
  const renderLabelContent = () => {
    if (!label && !description) return null;
    
    if (description) {
      return (
        <div style={getLabelContainerStyles(labelPosition)}>
          {label && (
            <label
              id={labelId}
              htmlFor={id}
              style={getLabelStyles(size, disabled, isError, labelPosition, contentToggleable, cssVars)}
            >
              {label}
            </label>
          )}
          <span
            id={descriptionId}
            style={getDescriptionStyles(size, disabled, isError, contentToggleable, cssVars)}
          >
            {description}
          </span>
        </div>
      );
    }
    
    return (
      <label
        id={labelId}
        htmlFor={id}
        style={getLabelStyles(size, disabled, isError, labelPosition, contentToggleable, cssVars)}
      >
        {label}
      </label>
    );
  };
  
  return (
    <div
      className={className}
      style={{
        ...getRadioButtonContainerStyles(size, disabled, contentToggleable),
        ...style,
      }}
      onClick={handleContainerClick}
    >
      {/* Hidden input for form integration and accessibility */}
      <input
        ref={inputRef}
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={isChecked}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        required={required}
        aria-label={ariaLabel}
        style={getHiddenInputStyles()}
        {...ariaAttributes}
        {...rest}
      />
      
      {/* Radio button circle with dot */}
      <div
        role="presentation"
        style={getRadioButtonCircleStyles(size, color, customColor, shape, isChecked, disabled, focused, isError, animationsEnabled, cssVars)}
      >
        {/* Radio button dot */}
        <div
          role="presentation"
          style={getRadioButtonDotStyles(size, color, customColor, shape, isChecked, disabled, isError, animationsEnabled, cssVars)}
        />
      </div>
      
      {/* Label and description */}
      {renderLabelContent()}
    </div>
  );
});

RadioButton.displayName = 'RadioButton';

// RadioButton Group Component
export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  name,
  value,
  onChange,
  size = getDefaultSize(),
  color = getDefaultColor(),
  customColor,
  shape = 'pill',
  disabled = false,
  error = false,
  options,
  labelPosition = 'right',
  orientation = 'vertical',
  className,
  style,
}) => {
  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState<string | undefined>(undefined);
  
  // Determine if controlled or uncontrolled
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    onChange?.(newValue);
  };
  
  return (
    <div
      className={className}
      style={{
        ...getRadioButtonGroupStyles(orientation),
        ...style,
      }}
      role="radiogroup"
    >
      {options.map((option) => (
        <RadioButton
          key={option.value}
          name={name}
          value={option.value}
          checked={currentValue === option.value}
          onChange={handleChange}
          disabled={disabled || option.disabled}
          size={size}
          color={color}
          customColor={customColor}
          shape={shape}
          label={option.label}
          description={option.description}
          labelPosition={labelPosition}
          error={error}
        />
      ))}
    </div>
  );
};

RadioButtonGroup.displayName = 'RadioButtonGroup';
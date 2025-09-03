import React, { forwardRef, useRef, useImperativeHandle, useState, useId } from 'react';
import { useCSSVariables, useSettings } from '../../../providers';
import { UNIVERSAL_DEFAULTS } from '../types';
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
  getValidationState,
  getAriaAttributes,
} from './RadioButton.utils';

export const RadioButton = forwardRef<RadioButtonRef, RadioButtonProps>(({
  // Universal props
  color = UNIVERSAL_DEFAULTS.color,
  customColor,
  shape = UNIVERSAL_DEFAULTS.shape,
  size = UNIVERSAL_DEFAULTS.size,
  disabled = UNIVERSAL_DEFAULTS.disabled,
  error,
  className,
  style,
  id: providedId,
  animate = UNIVERSAL_DEFAULTS.animate,
  rounded, // Legacy support
  // Form-specific props
  name,
  value,
  required = false,
  label,
  onChange,
  onFocus,
  onBlur,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'data-testid': dataTestId,
  // Component-specific props
  checked,
  defaultChecked = false,
  description,
  labelPosition = 'right',
  contentToggleable = true,
  ...rest
}, ref) => {

  // Get CSS variables for theming and settings
  const cssVars = useCSSVariables();
  const { settings } = useSettings();
  const animationsEnabled = (settings.appearance.animations ?? true) && animate;
  
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
  const isError = getValidationState(Boolean(error), required, isChecked);
  
  // Handle legacy rounded prop
  const finalShape = rounded !== undefined ? (rounded ? 'pill' : 'round') : shape;
  
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
    
    onChange?.(event);
  };
  
  // Handle focus/blur
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(event);
  };
  
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur?.(event);
  };
  
  // Handle label/description click
  const handleContentClick = () => {
    if (contentToggleable && !disabled) {
      inputRef.current?.click();
    }
  };
  
  // Generate styles
  const containerStyles = getRadioButtonContainerStyles(
    size,
    Boolean(disabled),
    contentToggleable
  );
  
  const circleStyles = getRadioButtonCircleStyles(
    size,
    color,
    customColor,
    finalShape,
    isChecked,
    Boolean(disabled),
    focused,
    isError,
    animationsEnabled,
    cssVars
  );
  
  const dotStyles = getRadioButtonDotStyles(
    size,
    color,
    customColor,
    finalShape,
    isChecked,
    Boolean(disabled),
    isError,
    animationsEnabled,
    cssVars
  );
  
  const hiddenInputStyles = getHiddenInputStyles();
  
  const labelStyles = getLabelStyles(
    size,
    Boolean(disabled),
    isError,
    labelPosition,
    contentToggleable,
    cssVars
  );
  
  const descriptionStyles = getDescriptionStyles(
    size,
    Boolean(disabled),
    isError,
    contentToggleable,
    cssVars
  );
  
  const labelContainerStyles = getLabelContainerStyles(
    labelPosition
  );
  
  // ARIA attributes
  const ariaAttributes = getAriaAttributes({
    checked: isChecked,
    disabled: Boolean(disabled),
    invalid: isError,
    required: required,
    describedBy: ariaDescribedBy,
    labelledBy: label ? `${id}-label` : undefined,
  });
  
  // Combine styles
  const combinedStyles = {
    ...containerStyles,
    ...style,
  };
  
  return (
    <div
      className={className}
      style={combinedStyles}
      data-testid={dataTestId}
    >
      <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start' }}>
        <div style={{ position: 'relative' }}>
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
            style={hiddenInputStyles}
            {...ariaAttributes}
            {...rest}
          />
          <div style={circleStyles}>
            {isChecked && <div style={dotStyles} />}
          </div>
        </div>
        
        {(label || description) && (
          <div style={labelContainerStyles} onClick={handleContentClick}>
            {label && (
              <label
                id={`${id}-label`}
                htmlFor={id}
                style={labelStyles}
              >
                {label}
              </label>
            )}
            {description && (
              <div
                id={`${id}-description`}
                style={descriptionStyles}
              >
                {description}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

RadioButton.displayName = 'RadioButton';

export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  name,
  value,
  onChange,
  size = UNIVERSAL_DEFAULTS.size,
  color = UNIVERSAL_DEFAULTS.color,
  customColor,
  shape = UNIVERSAL_DEFAULTS.shape,
  disabled = false,
  error = false,
  options,
  labelPosition = 'right',
  orientation = 'vertical',
  className,
  style,
}) => {
  const cssVars = useCSSVariables();
  const { settings } = useSettings();
  const animationsEnabled = settings.appearance.animations ?? true;
  
  const groupStyles = getRadioButtonGroupStyles(
    orientation
  );
  
  const combinedStyles = {
    ...groupStyles,
    ...style,
  };
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };
  
  return (
    <div
      className={className}
      style={combinedStyles}
      role="radiogroup"
    >
      {options.map((option) => (
        <RadioButton
          key={option.value}
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={handleChange}
          disabled={disabled || option.disabled}
          error={error}
          size={size}
          color={color}
          customColor={customColor}
          shape={shape}
          label={option.label}
          description={option.description}
          labelPosition={labelPosition}
          animate={animationsEnabled}
        />
      ))}
    </div>
  );
};

RadioButtonGroup.displayName = 'RadioButtonGroup';
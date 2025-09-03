import React, { forwardRef, useRef, useImperativeHandle, useState, useId } from 'react';
import { useCSSVariables } from '../../../providers';
import { extractFormProps, UNIVERSAL_DEFAULTS } from '../types';
import { ToggleProps, ToggleRef } from './Toggle.types';
import {
  getToggleContainerStyles,
  getToggleTrackStyles,
  getBubbleStyles,
  getHiddenInputStyles,
  getLabelStyles,
  getDescriptionStyles,
  getLabelContainerStyles,
} from './Toggle.styles';

export const Toggle = forwardRef<ToggleRef, ToggleProps>((allProps, ref) => {
  // Extract onChange separately since it has custom signature
  const { onChange, ...propsForExtraction } = allProps;
  
  // Extract form props and component-specific props
  const [formProps, componentProps] = extractFormProps(propsForExtraction);
  
  // Destructure form props with defaults
  const {
    color = UNIVERSAL_DEFAULTS.color,
    size = UNIVERSAL_DEFAULTS.size,
    disabled = UNIVERSAL_DEFAULTS.disabled,
    label,
    className,
    style,
    id: providedId,
    // Form-specific props
    name,
    value,
    required,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
  } = formProps;
  
  // Destructure component-specific props
  const {
    checked,
    defaultChecked = false,
    description,
    labelPosition = 'right',
  } = componentProps;
  // Get CSS variables for theming
  const cssVars = useCSSVariables();
  
  // Generate unique ID if not provided
  const generatedId = useId();
  const id = providedId || generatedId;
  
  // Internal state for uncontrolled mode
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const [focused, setFocused] = useState(false);
  
  // Determine if controlled or uncontrolled
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;
  
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
    
    // Focus the toggle after change
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
    
    onChange?.(newChecked, event);
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
              style={getLabelStyles(size, disabled || false, labelPosition, cssVars)}
            >
              {label}
            </label>
          )}
          <span
            id={descriptionId}
            style={getDescriptionStyles(size, disabled || false, cssVars)}
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
        style={getLabelStyles(size, disabled || false, labelPosition, cssVars)}
      >
        {label}
      </label>
    );
  };
  
  return (
    <div
      className={className}
      style={{
        ...getToggleContainerStyles(size, disabled || false),
        ...style,
      }}
      onClick={handleContainerClick}
    >
      {/* Hidden input for form integration and accessibility */}
      <input
        ref={inputRef}
        type="checkbox"
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
        aria-describedby={ariaDescribedByValue}
        aria-labelledby={labelId}
        style={getHiddenInputStyles()}
      />
      
      {/* Toggle track with animated bubble */}
      <div
        role="presentation"
        style={getToggleTrackStyles(size, color, isChecked, disabled || false, focused, cssVars)}
      >
        {/* Main bubble */}
        <div
          role="presentation"
          style={getBubbleStyles(size, color, isChecked, disabled || false, cssVars)}
        />
      </div>
      
      {/* Label and description */}
      {renderLabelContent()}
    </div>
  );
});

Toggle.displayName = 'Toggle';
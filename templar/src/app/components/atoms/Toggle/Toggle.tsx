import React, { forwardRef, useRef, useImperativeHandle, useState, useId } from 'react';
import { useCSSVariables } from '../../../providers';
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

export const Toggle = forwardRef<ToggleRef, ToggleProps>(({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  size = 'md',
  variant = 'primary',
  label,
  description,
  labelPosition = 'right',
  name,
  value,
  required = false,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  className,
  style,
  id: providedId,
}, ref) => {
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
              style={getLabelStyles(size, disabled, labelPosition, cssVars)}
            >
              {label}
            </label>
          )}
          <span
            id={descriptionId}
            style={getDescriptionStyles(size, disabled, cssVars)}
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
        style={getLabelStyles(size, disabled, labelPosition, cssVars)}
      >
        {label}
      </label>
    );
  };
  
  return (
    <div
      className={className}
      style={{
        ...getToggleContainerStyles(size, disabled),
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
        style={getToggleTrackStyles(size, variant, isChecked, disabled, focused, cssVars)}
      >
        {/* Main bubble */}
        <div
          role="presentation"
          style={getBubbleStyles(size, variant, isChecked, disabled, cssVars)}
        />
      </div>
      
      {/* Label and description */}
      {renderLabelContent()}
    </div>
  );
});

Toggle.displayName = 'Toggle';
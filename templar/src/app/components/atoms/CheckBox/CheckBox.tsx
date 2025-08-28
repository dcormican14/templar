'use client';

import React, { forwardRef, useMemo, useCallback, useEffect, useRef, useState } from 'react';
import { useCSSVariables, useSettings } from '../../../providers';
import type { CheckBoxProps } from './CheckBox.types';
import {
  getVariantStyles,
  getSizeStyles,
  createBaseStyles,
  getInputStyles,
  getLabelStyles,
  getDescriptionStyles,
  getWrapperStyles,
  getCheckboxWrapperStyles,
  getFocusStyles,
} from './CheckBox.styles';
import { createCheckIcon, getIconSize, handleKeyDown, getIconColor } from './CheckBox.utils';

export const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(
  ({
    size = 'md',
    variant = 'default',
    checked,
    defaultChecked = false,
    indeterminate = false,
    disabled = false,
    error = false,
    label,
    description,
    rounded = false,
    contentToggleable = true,
    onChange,
    className,
    style,
    onKeyDown,
    ...props
  }, ref) => {
    // Determine if component is controlled or uncontrolled
    const isControlled = checked !== undefined;
    
    // Internal state for uncontrolled mode
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    
    // Use controlled value if provided, otherwise use internal state
    const checkedValue = isControlled ? checked : internalChecked;
    // Hooks
    const cssVars = useCSSVariables();
    const { settings } = useSettings();
    const internalRef = useRef<HTMLInputElement>(null);
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || internalRef;

    // Computed values
    const animationsEnabled = settings.appearance.animations;
    const iconSize = getIconSize(size);

    // Set indeterminate state
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, inputRef]);

    // Event handlers
    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      
      const newChecked = event.target.checked;
      
      // Update internal state if uncontrolled
      if (!isControlled) {
        setInternalChecked(newChecked);
      }
      
      // Always call onChange callback
      onChange?.(newChecked, event);
    }, [disabled, onChange, isControlled]);

    const handleKeyDownInternal = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!disabled) {
        handleKeyDown(event, onChange, checkedValue);
      }
      onKeyDown?.(event);
    }, [disabled, onChange, checkedValue, onKeyDown]);

    // Styles
    const baseStyles = useMemo(() => createBaseStyles(
      disabled,
      rounded,
      size,
      animationsEnabled
    ), [disabled, rounded, size, animationsEnabled]);

    const variantStyles = useMemo(() => getVariantStyles(
      variant,
      cssVars,
      checkedValue || indeterminate,
      error
    ), [variant, cssVars, checkedValue, indeterminate, error]);

    const sizeStyles = useMemo(() => getSizeStyles(size), [size]);
    const inputStyles = useMemo(() => getInputStyles(), []);
    const labelStyles = useMemo(() => label ? getLabelStyles(cssVars, size, disabled, contentToggleable) : {}, [cssVars, size, disabled, contentToggleable, label]);
    const descriptionStyles = useMemo(() => description ? getDescriptionStyles(cssVars, size, disabled, contentToggleable) : {}, [cssVars, size, disabled, contentToggleable, description]);
    const wrapperStyles = useMemo(() => getWrapperStyles(), []);
    const checkboxWrapperStyles = useMemo(() => getCheckboxWrapperStyles(), []);

    const combinedCheckboxStyles: React.CSSProperties = {
      ...baseStyles,
      ...sizeStyles,
      ...variantStyles,
      ...style,
    };

    // Focus state
    const [focused, setFocused] = React.useState(false);
    const focusStyles = focused ? getFocusStyles(cssVars, variant, error) : {};

    const finalCheckboxStyles = {
      ...combinedCheckboxStyles,
      ...focusStyles,
    };

    return (
      <div style={wrapperStyles} className={className}>
        <div style={checkboxWrapperStyles}>
          {/* Checkbox container */}
          <div style={finalCheckboxStyles}>
            {/* Hidden input */}
            <input
              ref={inputRef}
              type="checkbox"
              checked={checkedValue}
              disabled={disabled}
              onChange={handleChange}
              onKeyDown={handleKeyDownInternal}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              style={inputStyles}
              aria-checked={indeterminate ? 'mixed' : checkedValue}
              aria-describedby={description ? `${props.id}-description` : undefined}
              {...props}
            />
            
            {/* Check icon */}
            {createCheckIcon(
              checkedValue,
              indeterminate,
              error,
              iconSize,
              getIconColor(variant, error, checkedValue, cssVars)
            )}
          </div>

          {/* Label */}
          {label && (
            <label 
              htmlFor={contentToggleable ? props.id : undefined}
              style={labelStyles}
            >
              {label}
            </label>
          )}
        </div>

        {/* Description */}
        {description && (
          <div 
            id={`${props.id}-description`}
            style={descriptionStyles}
            onClick={contentToggleable ? () => {
              if (!disabled && inputRef.current) {
                inputRef.current.click();
              }
            } : undefined}
          >
            {description}
          </div>
        )}
      </div>
    );
  }
);

CheckBox.displayName = 'CheckBox';
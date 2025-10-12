'use client';

import React, { forwardRef, useMemo, useCallback, useEffect, useRef, useState } from 'react';
import { useCSSVariables, useSettings } from '../../../providers';
import { extractFormProps, UNIVERSAL_DEFAULTS } from '../types';
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
import { Icon } from '../Icon';

export const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>((allProps, ref) => {
  // Filter out interactive config props that shouldn't be passed to DOM
  const {
    onChange,
    ...propsWithoutOnChange
  } = allProps;

  // Extract form props and component-specific props
  const [formProps, componentProps] = extractFormProps(propsWithoutOnChange);
  
  // Destructure form props with defaults
  const {
    color = UNIVERSAL_DEFAULTS.color,
    customColor,
    variant = UNIVERSAL_DEFAULTS.variant,
    size = UNIVERSAL_DEFAULTS.size,
    shape = UNIVERSAL_DEFAULTS.shape,
    disabled = UNIVERSAL_DEFAULTS.disabled,
    error,
    label,
    className,
    required,
    style,
    id,
    'data-testid': dataTestId,
    animate = UNIVERSAL_DEFAULTS.animate,
    rounded, // Legacy support
    onKeyDown,
  } = formProps;
  
  // Destructure component-specific props
  const {
    checked,
    defaultChecked = false,
    indeterminate = false,
    description,
    contentToggleable = true,
    ...restProps
  } = componentProps;
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
    const animationsEnabled = (settings.appearance.animations ?? true) && animate;
    const iconSize = getIconSize(size);
    const asteriskSize = (size === 'lg' || size === 'xl') ? 'sm' : 'xs';

    // Determine asterisk color based on variant and error state
    const getAsteriskColor = () => {
      if (Boolean(error)) {
        return cssVars.destructive;
      }

      switch (variant) {
        case 'solid':
          // For solid variant, use main color on foreground background when unchecked
          return color === 'custom' && customColor ? customColor : (cssVars as any)[color] || cssVars.primary;
        case 'glassmorphic':
          // For glassmorphic variant, use primary color when unchecked
          return cssVars.primary;
        case 'ghost':
        case 'outline':
        case 'invisible':
        default:
          return cssVars.mutedForeground;
      }
    };

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
      shape,
      animationsEnabled,
      rounded // Legacy support
    ), [disabled, shape, animationsEnabled, rounded]);

    const variantStyles = useMemo(() => getVariantStyles(
      variant,
      color,
      customColor,
      cssVars,
      checkedValue || indeterminate,
      Boolean(error)
    ), [variant, color, customColor, cssVars, checkedValue, indeterminate, error]);

    const sizeStyles = useMemo(() => getSizeStyles(size), [size]);
    const inputStyles = useMemo(() => getInputStyles(), []);
    const labelStyles = useMemo(() => label ? getLabelStyles(cssVars, size, Boolean(disabled), Boolean(contentToggleable)) : {}, [cssVars, size, disabled, contentToggleable, label]);
    const descriptionStyles = useMemo(() => description ? getDescriptionStyles(cssVars, size, Boolean(disabled), Boolean(contentToggleable)) : {}, [cssVars, size, disabled, contentToggleable, description]);
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
    const focusStyles = focused ? getFocusStyles(color, customColor, cssVars, Boolean(error)) : {};

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
              id={id}
              checked={checkedValue}
              disabled={disabled}
              required={required}
              onChange={handleChange}
              onKeyDown={handleKeyDownInternal}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              style={inputStyles}
              data-testid={dataTestId}
              aria-checked={indeterminate ? 'mixed' : checkedValue}
              aria-describedby={description ? `${id}-description` : undefined}
              {...restProps}
            />
            
            {/* Check icon or Required asterisk */}
            {required && !checkedValue && !indeterminate ? (
              // Show asterisk for required unchecked state
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon
                  name="Asterisk"
                  size={asteriskSize}
                  color={getAsteriskColor()}
                />
              </div>
            ) : (
              // Show normal check icon
              createCheckIcon(
                checkedValue,
                indeterminate,
                Boolean(error),
                iconSize,
                getIconColor(color, customColor, Boolean(error), checkedValue, cssVars)
              )
            )}
          </div>

          {/* Label */}
          {label && (
            <label 
              htmlFor={contentToggleable ? id : undefined}
              style={labelStyles}
            >
              {label}
            </label>
          )}
        </div>

        {/* Description */}
        {description && (
          <div
            id={`${id}-description`}
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
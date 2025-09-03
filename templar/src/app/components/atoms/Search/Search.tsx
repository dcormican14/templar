'use client';

import React, { forwardRef, useState, useRef, useMemo, useCallback } from 'react';
import { useCSSVariables, useSettings } from '../../../providers';
import { extractFormProps, UNIVERSAL_DEFAULTS } from '../types';
import { Icon } from '../Icon';
import type { SearchProps } from './Search.types';
import {
  getPlaceholderColor,
} from './Search.styles';
import {
  generateSearchId,
  useFocusManagement,
} from './Search.utils';

export const Search = forwardRef<HTMLInputElement, SearchProps>((allProps, ref) => {
  // Extract form props and component-specific props
  const [formProps, componentProps] = extractFormProps(allProps);
  
  // Destructure form props with defaults
  const {
    color = UNIVERSAL_DEFAULTS.color,
    customColor,
    variant = 'outline', // Search-specific default
    shape = UNIVERSAL_DEFAULTS.shape,
    size = UNIVERSAL_DEFAULTS.size,
    disabled = UNIVERSAL_DEFAULTS.disabled,
    loading = UNIVERSAL_DEFAULTS.loading,
    error,
    label,
    helperText,
    placeholder = 'Search...',
    width,
    height,
    className,
    style,
    id: providedId,
    'data-testid': dataTestId,
    animate = UNIVERSAL_DEFAULTS.animate,
    rounded, // Legacy support
    // Form-specific props
    name,
    value: controlledValue,
    required,
    readOnly,
    autoComplete,
    autoFocus = false,
    onChange,
  } = formProps;
  
  // Destructure component-specific props
  const {
    onSearch,
    onClear,
    showSearchIcon = true,
    showClearButton = true,
    searchIconPosition = 'left',
    debounceDelay = 300,
    searchIcon,
    clearIcon,
    clearOnEscape = true,
    ...rest
  } = componentProps;

  // Hooks
  const cssVars = useCSSVariables();
  const { settings } = useSettings();
  const animationsEnabled = (settings.appearance.animations ?? true) && animate;
  
  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState('');
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  
  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const combinedRef = ref || inputRef;
  
  // Generate unique ID
  const searchId = useMemo(() => providedId || generateSearchId(), [providedId]);
  
  // Focus management
  const { focus, blur, select } = useFocusManagement(
    combinedRef as React.RefObject<HTMLInputElement>,
    autoFocus
  );
  
  // Focus state
  const [isFocused, setIsFocused] = useState(false);
  
  // Debounced search callback
  const debouncedSearch = useCallback((searchValue: string) => {
    onChange?.(searchValue);
  }, [onChange]);
  
  // Use debounce hook (if available)
  // useDebounce(debouncedSearch, debounceDelay, value);
  
  // Handle value change
  const handleValueChange = useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      // Call onChange immediately for controlled components
      if (isControlled) {
        onChange?.(newValue);
      }
    },
    [isControlled, onChange]
  );
  
  // Event handlers
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      handleValueChange(newValue);
    },
    [handleValueChange]
  );
  
  // Extract event handlers from formProps  
  const { onKeyDown: originalOnKeyDown, onFocus: originalOnFocus, onBlur: originalOnBlur } = formProps;
  
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && onSearch) {
        onSearch(value);
      } else if (event.key === 'Escape' && clearOnEscape) {
        handleValueChange('');
        onClear?.();
      }
      originalOnKeyDown?.(event);
    },
    [value, onSearch, clearOnEscape, handleValueChange, onClear, originalOnKeyDown]
  );
  
  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      originalOnFocus?.(event);
    },
    [originalOnFocus]
  );
  
  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      originalOnBlur?.(event);
    },
    [originalOnBlur]
  );
  
  const handleSearchClick = useCallback(() => {
    if (onSearch) {
      onSearch(value);
    }
    focus();
  }, [value, onSearch, focus]);
  
  const handleClearIconClick = useCallback(() => {
    handleValueChange('');
    onClear?.();
    focus();
  }, [handleValueChange, onClear, focus]);
  
  // Handle legacy rounded prop
  const finalShape = rounded !== undefined ? (rounded ? 'pill' : 'round') : shape;
  
  // Styles
  const containerStyles = useMemo(() => ({
    position: 'relative' as const,
    display: 'inline-flex',
    alignItems: 'center',
    width: width || '300px',
    border: `1px solid ${Boolean(error) ? cssVars.error : cssVars.border}`,
    borderRadius: finalShape === 'pill' ? '9999px' : finalShape === 'round' ? '12px' : '6px',
    backgroundColor: variant === 'solid' ? cssVars.primary : cssVars.background,
    transition: animationsEnabled ? 'all 0.2s ease' : 'none',
  }), [width, error, cssVars, finalShape, variant, animationsEnabled]);
  
  const inputStyles = useMemo(() => ({
    flex: 1,
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    color: variant === 'solid' ? cssVars.primaryForeground : cssVars.foreground,
    fontSize: size === 'xs' ? '12px' : size === 'sm' ? '14px' : size === 'lg' ? '18px' : size === 'xl' ? '20px' : '16px',
    padding: `${size === 'xs' ? '8px' : size === 'sm' ? '10px' : size === 'lg' ? '14px' : size === 'xl' ? '16px' : '12px'}`,
    paddingLeft: showSearchIcon && searchIconPosition === 'left' ? '40px' : '12px',
    paddingRight: showClearButton && value ? '40px' : '12px',
  }), [size, variant, cssVars, showSearchIcon, searchIconPosition, showClearButton, value]);
  
  const searchIconStyles = useMemo(() => ({
    position: 'absolute' as const,
    left: searchIconPosition === 'left' ? '12px' : 'auto',
    right: searchIconPosition === 'right' ? '12px' : 'auto',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    border: 'none',
    background: 'transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    color: variant === 'solid' ? cssVars.primaryForeground : cssVars.mutedForeground,
    opacity: disabled ? 0.5 : 1,
  }), [disabled, variant, cssVars, searchIconPosition]);
  
  const clearIconStyles = useMemo(() => ({
    position: 'absolute' as const,
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    border: 'none',
    background: 'transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    color: variant === 'solid' ? cssVars.primaryForeground : cssVars.mutedForeground,
    opacity: disabled ? 0.5 : 1,
  }), [disabled, variant, cssVars]);
  
  const loadingStyles = useMemo(() => ({
    animation: animationsEnabled ? 'spin 1s linear infinite' : 'none',
  }), [animationsEnabled]);
  
  const focusStyles = useMemo(() =>
    isFocused ? { outline: `2px solid ${cssVars.primary}`, outlineOffset: '2px' } : {},
    [isFocused, cssVars]
  );
  
  const combinedStyles: React.CSSProperties = {
    ...containerStyles,
    ...focusStyles,
    ...style,
  };
  
  // Accessibility props
  const accessibilityProps = {
    'aria-label': label,
    'aria-invalid': Boolean(error),
    'aria-required': Boolean(required),
    'aria-disabled': Boolean(disabled),
  };
  
  return (
    <div
      className={className}
      style={combinedStyles}
      data-testid={dataTestId}
    >
      {/* Search icon on left */}
      {showSearchIcon && searchIconPosition === 'left' && (
        <button
          type="button"
          onClick={handleSearchClick}
          disabled={disabled}
          style={searchIconStyles}
          tabIndex={-1}
          aria-label="Search"
        >
          {loading ? (
            <div style={loadingStyles}>
              <Icon name="Refresh" size={size === 'xs' ? 'sm' : size === 'xl' ? 'lg' : 'md'} />
            </div>
          ) : searchIcon ? (
            searchIcon
          ) : (
            <Icon name="Search" size={size === 'xs' ? 'sm' : size === 'xl' ? 'lg' : 'md'} />
          )}
        </button>
      )}
      
      {/* Input */}
      <input
        ref={combinedRef}
        type="text"
        id={searchId}
        name={name}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        readOnly={readOnly}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        style={inputStyles}
        {...accessibilityProps}
        {...rest}
      />
      
      {/* Clear button */}
      {showClearButton && value && !loading && (
        <button
          type="button"
          onClick={handleClearIconClick}
          disabled={disabled}
          style={clearIconStyles}
          tabIndex={-1}
          aria-label="Clear search"
        >
          {clearIcon ? (
            clearIcon
          ) : (
            <Icon name="Cancel" size={size === 'xs' ? 'sm' : size === 'xl' ? 'lg' : 'md'} />
          )}
        </button>
      )}
      
      {/* Search icon on right */}
      {showSearchIcon && searchIconPosition === 'right' && !showClearButton && (
        <button
          type="button"
          onClick={handleSearchClick}
          disabled={disabled}
          style={searchIconStyles}
          tabIndex={-1}
          aria-label="Search"
        >
          {loading ? (
            <div style={loadingStyles}>
              <Icon name="Refresh" size={size === 'xs' ? 'sm' : size === 'xl' ? 'lg' : 'md'} />
            </div>
          ) : searchIcon ? (
            searchIcon
          ) : (
            <Icon name="Search" size={size === 'xs' ? 'sm' : size === 'xl' ? 'lg' : 'md'} />
          )}
        </button>
      )}
    </div>
  );
});

Search.displayName = 'Search';
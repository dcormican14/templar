'use client';

import React, { forwardRef, useState, useRef, useMemo, useCallback } from 'react';
import { useCSSVariables, useSettings } from '../../../providers';
import { extractFormProps, UNIVERSAL_DEFAULTS } from '../types';
import { Icon } from '../Icon';
import type { SearchProps } from './Search.types';
import {
  getSearchContainerStyles,
  getSearchInputStyles,
  getSearchIconStyles,
  getLoadingStyles,
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

  // Map search sizes to icon sizes
  const getIconSize = (searchSize: typeof size): 'xs' | 'sm' | 'md' | 'lg' | 'xl' => {
    const iconSizeMap = {
      xs: 'sm' as const,
      sm: 'sm' as const,
      md: 'md' as const,
      lg: 'md' as const,
      xl: 'lg' as const,
    };
    return iconSizeMap[searchSize];
  };

  const iconSize = getIconSize(size);
  
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
  
  // Generate styles using new styling functions
  const containerStyles = useMemo(() => getSearchContainerStyles(
    size,
    variant,
    color,
    customColor,
    finalShape,
    Boolean(disabled),
    isFocused,
    Boolean(error),
    animationsEnabled,
    cssVars,
    width
  ), [size, variant, color, customColor, finalShape, disabled, isFocused, error, animationsEnabled, cssVars, width]);

  const inputStyles = useMemo(() => getSearchInputStyles(
    size,
    variant,
    color,
    customColor,
    Boolean(disabled),
    showSearchIcon && searchIconPosition === 'left',
    showClearButton && Boolean(value),
    cssVars
  ), [size, variant, color, customColor, disabled, showSearchIcon, searchIconPosition, showClearButton, value, cssVars]);

  const searchIconStyles = useMemo(() => getSearchIconStyles(
    size,
    searchIconPosition,
    variant,
    color,
    customColor,
    Boolean(disabled),
    true, // clickable
    animationsEnabled,
    cssVars
  ), [size, searchIconPosition, variant, color, customColor, disabled, animationsEnabled, cssVars]);

  const clearIconStyles = useMemo(() => getSearchIconStyles(
    size,
    'right',
    variant,
    color,
    customColor,
    Boolean(disabled),
    true, // clickable
    animationsEnabled,
    cssVars
  ), [size, variant, color, customColor, disabled, animationsEnabled, cssVars]);

  const loadingStyles = useMemo(() => getLoadingStyles(
    size,
    animationsEnabled
  ), [size, animationsEnabled]);

  const combinedStyles: React.CSSProperties = {
    ...containerStyles,
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
              <Icon name="Refresh" size={iconSize} />
            </div>
          ) : searchIcon ? (
            searchIcon
          ) : (
            <Icon name="Search" size={iconSize} />
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
            <Icon name="Cancel" size={iconSize} />
          )}
        </button>
      )}
      
      {/* Search icon on right */}
      {showSearchIcon && searchIconPosition === 'right' && (!showClearButton || !value) && (
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
              <Icon name="Refresh" size={iconSize} />
            </div>
          ) : searchIcon ? (
            searchIcon
          ) : (
            <Icon name="Search" size={iconSize} />
          )}
        </button>
      )}
    </div>
  );
});

Search.displayName = 'Search';
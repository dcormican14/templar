'use client';

import React, { forwardRef, useState, useRef, useMemo, useCallback } from 'react';
import { useCSSVariables, useSettings } from '../../../providers';
import { Icon } from '../Icon';
import type { SearchProps } from './Search.types';
import {
  createSearchContainerStyles,
  getSearchInputStyles,
  getSearchIconStyles,
  getLoadingStyles,
  getFocusStyles,
  getPlaceholderColor,
} from './Search.styles';
import {
  useDebounce,
  handleSearchKeyDown,
  generateSearchId,
  createSearchAccessibilityProps,
  useFocusManagement,
  handleSearchIconClick,
  handleClearClick,
} from './Search.utils';

export const Search = forwardRef<HTMLInputElement, SearchProps>(
  ({
    variant = 'outline',
    size = 'md',
    value: controlledValue,
    onChange,
    onSearch,
    onClear,
    disabled = false,
    error = false,
    showSearchIcon = true,
    showClearButton = true,
    searchIconPosition = 'left',
    rounded = false,
    loading = false,
    debounceDelay = 300,
    searchIcon,
    clearIcon,
    width,
    clearOnEscape = true,
    placeholder = 'Search...',
    autoFocus = false,
    className,
    style,
    id: providedId,
    ...props
  }, ref) => {
    // Hooks
    const cssVars = useCSSVariables();
    const { settings } = useSettings();
    const animationsEnabled = settings?.appearance?.animations ?? true;
    
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
    
    // Use debounce hook
    useDebounce(value, debounceDelay, debouncedSearch);
    
    // Event handlers
    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      
      if (!isControlled) {
        setInternalValue(newValue);
      }
      
      // Call onChange immediately for controlled components
      if (isControlled) {
        onChange?.(newValue);
      }
    }, [isControlled, onChange]);
    
    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
      handleSearchKeyDown(event, value, onSearch, onClear, clearOnEscape);
      props.onKeyDown?.(event);
    }, [value, onSearch, onClear, clearOnEscape, props]);
    
    const handleSearchClick = useCallback(() => {
      handleSearchIconClick(value, onSearch, combinedRef as React.RefObject<HTMLInputElement>);
    }, [value, onSearch, combinedRef]);
    
    const handleClearIconClick = useCallback(() => {
      handleClearClick(onClear, onChange, combinedRef as React.RefObject<HTMLInputElement>);
      
      if (!isControlled) {
        setInternalValue('');
      }
    }, [onClear, onChange, isControlled, combinedRef]);
    
    const handleFocus = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(event);
    }, [props]);
    
    const handleBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      props.onBlur?.(event);
    }, [props]);
    
    // Determine icon positions
    const hasLeftIcon = showSearchIcon && searchIconPosition === 'left';
    const hasRightIcon = Boolean((showSearchIcon && searchIconPosition === 'right') || 
                        showClearButton || 
                        loading);
    
    // Styles
    const containerStyles = useMemo(() => 
      createSearchContainerStyles(size, rounded, animationsEnabled, width),
      [size, rounded, animationsEnabled, width]
    );
    
    const inputStyles = useMemo(() => {
      const baseStyles = getSearchInputStyles(
        variant, 
        size, 
        disabled, 
        error, 
        rounded, 
        cssVars, 
        animationsEnabled,
        hasLeftIcon,
        hasRightIcon
      );
      
      const focusStyles = isFocused && !disabled ? getFocusStyles(cssVars, variant, error) : {};
      
      return { ...baseStyles, ...focusStyles };
    }, [variant, size, disabled, error, rounded, cssVars, animationsEnabled, hasLeftIcon, hasRightIcon, isFocused]);
    
    const searchIconStyles = useMemo(() => 
      getSearchIconStyles(size, searchIconPosition, disabled, !!onSearch, cssVars, variant),
      [size, searchIconPosition, disabled, onSearch, cssVars, variant]
    );
    
    const clearIconStyles = useMemo(() => 
      getSearchIconStyles(size, 'right', disabled, true, cssVars, variant),
      [size, disabled, cssVars, variant]
    );
    
    const loadingStyles = useMemo(() => 
      getLoadingStyles(size, cssVars),
      [size, cssVars]
    );
    
    // Accessibility props
    const accessibilityProps = createSearchAccessibilityProps(searchId, disabled, error, loading);
    
    // Render search icon
    const renderSearchIcon = () => {
      if (!showSearchIcon) return null;
      
      return (
        <div 
          style={searchIconStyles}
          onClick={!disabled ? handleSearchClick : undefined}
        >
          {searchIcon || <Icon name="Search" size={size === 'lg' ? 'md' : 'sm'} />}
        </div>
      );
    };
    
    // Render clear button
    const renderClearButton = () => {
      if (!showClearButton || !value || loading) return null;
      
      return (
        <div 
          style={clearIconStyles}
          onClick={!disabled ? handleClearIconClick : undefined}
        >
          {clearIcon || <Icon name="Xmark" size={size === 'lg' ? 'md' : 'sm'} />}
        </div>
      );
    };
    
    // Render loading indicator
    const renderLoadingIndicator = () => {
      if (!loading) return null;
      
      return (
        <div style={loadingStyles}>
          <Icon name="Loader" size={size === 'lg' ? 'md' : 'sm'} />
        </div>
      );
    };
    
    // Generate placeholder color
    const placeholderColor = getPlaceholderColor(cssVars, variant);
    
    return (
      <div 
        className={className}
        style={{ ...containerStyles, ...style }}
      >
        <style>
          {`
            #${searchId}::placeholder {
              color: ${placeholderColor};
              opacity: 0.7;
            }
            #${searchId}::-webkit-input-placeholder {
              color: ${placeholderColor};
              opacity: 0.7;
            }
            #${searchId}::-moz-placeholder {
              color: ${placeholderColor};
              opacity: 0.7;
            }
            #${searchId}:-ms-input-placeholder {
              color: ${placeholderColor};
              opacity: 0.7;
            }
            #${searchId}::-webkit-search-cancel-button {
              -webkit-appearance: none;
              display: none;
            }
            #${searchId}::-webkit-search-decoration {
              -webkit-appearance: none;
              display: none;
            }
          `}
        </style>
        {renderSearchIcon()}
        <input
          ref={combinedRef}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={placeholder}
          style={inputStyles}
          {...accessibilityProps}
          {...props}
        />
        {renderClearButton()}
        {renderLoadingIndicator()}
      </div>
    );
  }
);

Search.displayName = 'Search';

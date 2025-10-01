'use client';

import React, { forwardRef, useRef, useImperativeHandle, useState, useCallback, useId, useEffect } from 'react';
import { useCSSVariables, useSettings } from '../../../providers';
import { extractFormProps, UNIVERSAL_DEFAULTS } from '../types';
import type { TextAreaProps, TextAreaRef } from './TextArea.types';
import {
  getTextAreaContainerStyles,
  getTextAreaInputStyles,
  getLabelStyles,
  getDescriptionStyles,
  getHelperTextStyles,
  getCharacterCountStyles,
  getIconStyles,
  getLineNumbersStyles,
  getLoadingOverlayStyles,
  getInputWrapperStyles,
  getBottomSectionStyles,
  getResizeHandleStyles,
} from './TextArea.styles';
import {
  getDefaultSize,
  getDefaultColor,
  getLineCount,
  generateLineNumbers,
  getCharacterCount,
  isOverCharacterLimit,
  calculateAutoHeight,
  handleKeyDown as handleKeyDownUtil,
  formatCharacterCount,
  validateTextAreaProps,
  getAriaAttributes,
  handlePaste,
  debounce,
  getCursorInfo,
} from './TextArea.utils';

export const TextArea = forwardRef<TextAreaRef, TextAreaProps>((allProps, ref) => {
  // Extract onPaste separately since it's not part of universal form props
  const { onPaste, ...propsForExtraction } = allProps;
  
  // Extract form props and component-specific props
  const [formProps, componentProps] = extractFormProps(propsForExtraction);
  
  // Destructure form props with defaults
  const {
    color = UNIVERSAL_DEFAULTS.color,
    customColor,
    variant = 'outline', // TextArea-specific default
    shape = UNIVERSAL_DEFAULTS.shape,
    size = UNIVERSAL_DEFAULTS.size,
    disabled = UNIVERSAL_DEFAULTS.disabled,
    loading = UNIVERSAL_DEFAULTS.loading,
    error,
    label,
    helperText,
    placeholder,
    width,
    height,
    className,
    style,
    id: providedId,
    'data-testid': dataTestId,
    animate = UNIVERSAL_DEFAULTS.animate,
    // Form-specific props
    name,
    value,
    defaultValue,
    required,
    readOnly,
    autoComplete,
    autoFocus = false,
    onChange,
    onKeyDown,
    onFocus,
    onBlur,
  } = formProps;
  
  // Destructure component-specific props
  const {
    resize = 'vertical',
    description,
    errorMessage,
    showCharacterCount = false,
    maxLength,
    minRows = 3,
    maxRows,
    autoResize = false,
    showLineNumbers = false,
    clearOnEscape = false,
    icon,
    iconPosition = 'top-right',
    iconClickable = false,
    onIconClick,
    ...rest
  } = componentProps;
    // Get CSS variables and settings
    const cssVars = useCSSVariables();
    const { settings } = useSettings();
    const animationsEnabled = (settings.appearance.animations ?? true) && animate;
    
    // Generate unique ID if not provided
    const generatedId = useId();
    const id = providedId || generatedId;
    
    // Validate props in development
    validateTextAreaProps({ minRows, maxRows, maxLength, autoResize });
    
    // Determine if controlled or uncontrolled
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    const currentValue = isControlled ? value : internalValue;
    
    // State
    const [focused, setFocused] = useState(false);
    const [lineNumbers, setLineNumbers] = useState('1');
    
    // Refs
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    
    // Expose imperative methods
    useImperativeHandle(ref, () => ({
      focus: () => textareaRef.current?.focus(),
      blur: () => textareaRef.current?.blur(),
      select: () => textareaRef.current?.select(),
      setSelectionRange: (start: number, end: number) => {
        textareaRef.current?.setSelectionRange(start, end);
      },
      getValue: () => currentValue,
      setValue: (newValue: string) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        if (textareaRef.current) {
          textareaRef.current.value = newValue;
        }
      },
    }));
    
    // Auto-resize function
    const handleAutoResize = useCallback(() => {
      if (!autoResize || !textareaRef.current) return;
      
      const textarea = textareaRef.current;
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight || '20');
      const newHeight = calculateAutoHeight(textarea, minRows, maxRows, lineHeight);
      
      textarea.style.height = `${newHeight}px`;
    }, [autoResize, minRows, maxRows]);
    
    // Debounced auto-resize
    const debouncedAutoResize = useCallback(
      debounce(handleAutoResize, 10),
      [handleAutoResize]
    );
    
    // Update line numbers
    const updateLineNumbers = useCallback((text: string) => {
      if (showLineNumbers) {
        const lineCount = getLineCount(text);
        setLineNumbers(generateLineNumbers(lineCount));
      }
    }, [showLineNumbers]);
    
    // Handle change
    const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.target.value;
      
      // Check character limit
      if (maxLength && newValue.length > maxLength) {
        return; // Prevent exceeding limit
      }
      
      if (!isControlled) {
        setInternalValue(newValue);
      }
      
      onChange?.(event);
      updateLineNumbers(newValue);
      debouncedAutoResize();
    }, [isControlled, maxLength, onChange, updateLineNumbers, debouncedAutoResize]);
    
    // Handle focus
    const handleFocus = useCallback((event: React.FocusEvent<HTMLTextAreaElement>) => {
      setFocused(true);
      onFocus?.(event);
    }, [onFocus]);
    
    // Handle blur
    const handleBlur = useCallback((event: React.FocusEvent<HTMLTextAreaElement>) => {
      setFocused(false);
      onBlur?.(event);
    }, [onBlur]);
    
    // Handle key down
    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      handleKeyDownUtil(event, clearOnEscape, () => {
        if (!isControlled) {
          setInternalValue('');
        }
        if (textareaRef.current) {
          textareaRef.current.value = '';
          const syntheticEvent = {
            ...event,
            target: textareaRef.current,
            currentTarget: textareaRef.current,
          } as React.ChangeEvent<HTMLTextAreaElement>;
          onChange?.(syntheticEvent);
        }
        updateLineNumbers('');
        debouncedAutoResize();
      });
      
      onKeyDown?.(event);
    }, [clearOnEscape, isControlled, onChange, updateLineNumbers, debouncedAutoResize, onKeyDown]);
    
    // Handle paste
    const handlePasteEvent = useCallback((event: React.ClipboardEvent<HTMLTextAreaElement>) => {
      if (maxLength && textareaRef.current) {
        const { selectionStart, selectionEnd } = textareaRef.current;
        const pasteResult = handlePaste(
          event,
          maxLength,
          currentValue,
          selectionStart,
          selectionEnd
        );
        
        if (pasteResult.shouldPrevent) {
          event.preventDefault();
          
          if (pasteResult.newValue !== undefined) {
            const newValue = pasteResult.newValue;
            
            if (!isControlled) {
              setInternalValue(newValue);
            }
            
            textareaRef.current.value = newValue;
            
            // Create synthetic change event
            const syntheticEvent = {
              ...event,
              target: textareaRef.current,
              currentTarget: textareaRef.current,
              type: 'change',
            } as unknown as React.ChangeEvent<HTMLTextAreaElement>;
            
            onChange?.(syntheticEvent);
            updateLineNumbers(newValue);
            debouncedAutoResize();
          }
        }
      }
      
      onPaste?.(event);
    }, [maxLength, currentValue, isControlled, onChange, updateLineNumbers, debouncedAutoResize, onPaste]);
    
    // Handle icon click
    const handleIconClick = useCallback(() => {
      if (iconClickable && !disabled && onIconClick) {
        onIconClick();
      }
    }, [iconClickable, disabled, onIconClick]);
    
    // Initialize line numbers and auto-resize
    useEffect(() => {
      updateLineNumbers(currentValue);
      if (autoResize) {
        setTimeout(() => handleAutoResize(), 0);
      }
    }, [currentValue, updateLineNumbers, autoResize, handleAutoResize]);
    
    // Character count calculations
    const characterCount = getCharacterCount(currentValue);
    const isOverLimit = isOverCharacterLimit(currentValue, maxLength);
    
    // Get ARIA attributes
    const ariaAttributes = getAriaAttributes({
      error: error || false,
      disabled: disabled || false,
      label,
      description,
      helperText,
      errorMessage,
      maxLength,
    });
    
    // Render the component
    return (
      <div
        className={className}
        style={{
          ...getTextAreaContainerStyles(width, height, disabled),
          ...style,
        }}
      >
        {/* Label */}
        {label && (
          <label
            htmlFor={id}
            style={getLabelStyles(size, disabled || false, error || false, cssVars)}
          >
            {label}
          </label>
        )}
        
        {/* Description */}
        {description && (
          <div
            id="textarea-description"
            style={getDescriptionStyles(size, disabled || false, cssVars)}
          >
            {description}
          </div>
        )}
        
        {/* Input wrapper */}
        <div style={getInputWrapperStyles()}>
          {/* Line numbers */}
          {showLineNumbers && (
            <div style={getLineNumbersStyles(size, disabled || false, cssVars)}>
              {lineNumbers}
            </div>
          )}
          
          {/* TextArea input */}
          <textarea
            ref={textareaRef}
            id={id}
            value={currentValue}
            disabled={disabled}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onPaste={handlePasteEvent}
            style={getTextAreaInputStyles(
              color,
              customColor,
              variant,
              shape,
              size,
              resize,
              disabled || false,
              error || false,
              focused,
              minRows,
              maxRows,
              autoResize,
              showLineNumbers,
              animationsEnabled,
              cssVars
            )}
            {...ariaAttributes}
            name={name}
            required={required}
            readOnly={readOnly}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            data-testid={dataTestId}
            {...rest}
          />
          
          {/* Icon */}
          {icon && (
            <div
              style={getIconStyles(size, iconPosition, iconClickable, disabled || false, cssVars)}
              onClick={handleIconClick}
            >
              {icon}
            </div>
          )}
          
          
          {/* Loading overlay */}
          {loading && (
            <div style={getLoadingOverlayStyles(cssVars)}>
              <div style={{ 
                width: '20px', 
                height: '20px', 
                border: `2px solid ${cssVars.border}`,
                borderTop: `2px solid ${cssVars.primary}`,
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
            </div>
          )}
        </div>
        
        {/* Bottom section with helper text and character count */}
        {(helperText || errorMessage || showCharacterCount) && (
          <div style={getBottomSectionStyles()}>
            <div style={{ flex: 1 }}>
              {/* Helper text or error message */}
              {(helperText || (error && errorMessage)) && (
                <div
                  id={error && errorMessage ? "textarea-error" : "textarea-helper"}
                  style={getHelperTextStyles(size, disabled || false, error || false, cssVars)}
                >
                  {error && errorMessage ? errorMessage : helperText}
                </div>
              )}
            </div>
            
            {/* Character count */}
            {showCharacterCount && (
              <div style={getCharacterCountStyles(size, disabled || false, isOverLimit, cssVars)}>
                {formatCharacterCount(characterCount, maxLength)}
              </div>
            )}
          </div>
        )}
        
        {/* Add spinner animation styles */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}} />
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
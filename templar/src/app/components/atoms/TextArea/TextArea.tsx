'use client';

import React, { forwardRef, useRef, useImperativeHandle, useState, useCallback, useId, useEffect } from 'react';
import { useCSSVariables, useSettings } from '../../../providers';
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

export const TextArea = forwardRef<TextAreaRef, TextAreaProps>(
  ({
    color = getDefaultColor(),
    customColor,
    variant = 'outline',
    shape = 'round',
    size = getDefaultSize(),
    resize = 'vertical',
    error = false,
    label,
    description,
    helperText,
    errorMessage,
    showCharacterCount = false,
    maxLength,
    minRows = 3,
    maxRows,
    autoResize = false,
    showLineNumbers = false,
    loading = false,
    clearOnEscape = false,
    icon,
    iconPosition = 'top-right',
    iconClickable = false,
    onIconClick,
    width,
    height,
    value,
    defaultValue = '',
    onChange,
    onKeyDown,
    onPaste,
    onFocus,
    onBlur,
    disabled = false,
    className,
    style,
    id: providedId,
    ...rest
  }, ref) => {
    // Get CSS variables and settings
    const cssVars = useCSSVariables();
    const { settings } = useSettings();
    const animationsEnabled = settings.appearance.animations;
    
    // Generate unique ID if not provided
    const generatedId = useId();
    const id = providedId || generatedId;
    
    // Validate props in development
    validateTextAreaProps({ minRows, maxRows, maxLength, autoResize });
    
    // Determine if controlled or uncontrolled
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue);
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
      error,
      disabled,
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
            style={getLabelStyles(size, disabled, error, cssVars)}
          >
            {label}
          </label>
        )}
        
        {/* Description */}
        {description && (
          <div
            id="textarea-description"
            style={getDescriptionStyles(size, disabled, cssVars)}
          >
            {description}
          </div>
        )}
        
        {/* Input wrapper */}
        <div style={getInputWrapperStyles()}>
          {/* Line numbers */}
          {showLineNumbers && (
            <div style={getLineNumbersStyles(size, disabled, cssVars)}>
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
              disabled,
              error,
              focused,
              minRows,
              maxRows,
              autoResize,
              showLineNumbers,
              animationsEnabled,
              cssVars
            )}
            {...ariaAttributes}
            {...rest}
          />
          
          {/* Icon */}
          {icon && (
            <div
              style={getIconStyles(size, iconPosition, iconClickable, disabled, cssVars)}
              onClick={handleIconClick}
            >
              {icon}
            </div>
          )}
          
          {/* Resize handle */}
          <div style={getResizeHandleStyles(resize, disabled, cssVars)} />
          
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
                  style={getHelperTextStyles(size, disabled, error, cssVars)}
                >
                  {error && errorMessage ? errorMessage : helperText}
                </div>
              )}
            </div>
            
            {/* Character count */}
            {showCharacterCount && (
              <div style={getCharacterCountStyles(size, disabled, isOverLimit, cssVars)}>
                {formatCharacterCount(characterCount, maxLength)}
              </div>
            )}
          </div>
        )}
        
        {/* Add spinner animation styles */}
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
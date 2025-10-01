'use client';

import React, { forwardRef, useRef, useImperativeHandle, useState, useCallback, useId } from 'react';
import { useCSSVariables, useSettings } from '../../../providers';
import { extractFormProps, UNIVERSAL_DEFAULTS } from '../types';
import type { SliderProps, SliderRef } from './Slider.types';
import {
  getColorVariables,
  getSliderContainerStyles,
  getTrackContainerStyles,
  getTrackBackgroundStyles,
  getTrackFillStyles,
  getHiddenInputStyles,
  getThumbStyles,
  getLabelStyles,
  getDescriptionStyles,
  getMinMaxLabelStyles,
  getLabelsContainerStyles,
  getTooltipStyles,
  getTickStyles,
  getTickLabelStyles,
} from './Slider.styles';
import {
  clampValue,
  roundToStep,
  getValueFromPosition,
  formatValue,
  validateSliderProps,
  generateTicks,
  handleKeyDown as handleKeyDownUtil,
  getAriaAttributes,
} from './Slider.utils';

export const Slider = forwardRef<SliderRef, SliderProps>((allProps, ref) => {
  // Extract onChange and onInput separately since they have custom signatures
  const { onChange, onInput, ...propsForExtraction } = allProps;
  
  // Extract form props and component-specific props (excluding onChange and onInput)
  const [formProps, componentProps] = extractFormProps(propsForExtraction);
  
  // Destructure form props with defaults
  const {
    color = UNIVERSAL_DEFAULTS.color,
    customColor,
    variant = UNIVERSAL_DEFAULTS.variant,
    size = UNIVERSAL_DEFAULTS.size,
    disabled = UNIVERSAL_DEFAULTS.disabled,
    error,
    label,
    helperText: description,
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
  } = formProps;
  
  // Destructure component-specific props
  const {
    orientation = 'horizontal',
    min = 0,
    max = 100,
    step: rawStep = 1,
    showTooltip = false,
    showTicks = false,
    ticks,
    showLabels = false,
    header,
    footer,
    length = width || height || 300,
    formatValue: customFormatter,
    ...rest
  } = componentProps;

  // Handle empty or invalid step values
  const step = rawStep === '' || rawStep === null || rawStep === undefined || isNaN(Number(rawStep)) || Number(rawStep) <= 0 ? 1 : Number(rawStep);
  
  // Get CSS variables and settings
  const cssVars = useCSSVariables();
  const { settings } = useSettings();
  const animationsEnabled = (settings.appearance.animations ?? true) && animate;
  
  // Generate unique ID if not provided
  const generatedId = useId();
  const id = providedId || generatedId;
  
  // Validate props in development
  validateSliderProps({ min, max, step, value, defaultValue });
  
  // Determine if controlled or uncontrolled
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(
    clampValue(roundToStep((defaultValue as number) || 0, step), min, max)
  );
  const currentValue = isControlled ? clampValue(roundToStep((value as number) || 0, step), min, max) : internalValue;
    
  // State
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [showTooltipState, setShowTooltipState] = useState(false);
  
  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  // Expose imperative methods
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
  }));
    
  // Update value
  const updateValue = useCallback((newValue: number, event?: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLInputElement>) => {
    const clampedValue = clampValue(roundToStep(newValue, step), min, max);
    
    if (!isControlled) {
      setInternalValue(clampedValue);
    }
    
    if (event && 'target' in event && onChange) {
      onChange(clampedValue, event as React.ChangeEvent<HTMLInputElement>);
    }
    
    if (event && 'target' in event && onInput) {
      onInput(clampedValue, event as React.FormEvent<HTMLInputElement>);
    }
  }, [isControlled, min, max, step, onChange, onInput]);
    
  // Handle input change
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    
    const newValue = parseFloat(event.target.value);
    updateValue(newValue, event);
  }, [disabled, updateValue]);
  
  // Handle input events
  const handleInput = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    if (disabled) return;
    
    const newValue = parseFloat((event.target as HTMLInputElement).value);
    updateValue(newValue, event);
  }, [disabled, updateValue]);
    
  // Handle mouse/touch events
  const handlePointerDown = useCallback((event: React.MouseEvent | React.TouchEvent) => {
      if (disabled) return;
      
      event.preventDefault();
      setDragging(true);
      setShowTooltipState(true);
      
      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
      const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
      
      const newValue = getValueFromPosition(clientX, clientY, rect, orientation, min, max, step);
      
      // Create synthetic event
      const syntheticEvent = {
        target: { value: newValue.toString() },
        currentTarget: { value: newValue.toString() },
        type: 'change',
        bubbles: true,
        cancelable: true,
        preventDefault: () => {},
        stopPropagation: () => {},
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      
      updateValue(newValue, syntheticEvent);
      inputRef.current?.focus();
  }, [disabled, orientation, min, max, step, updateValue]);
  
  // Handle pointer move (for dragging)
  const handlePointerMove = useCallback((event: MouseEvent | TouchEvent) => {
      if (!dragging || disabled) return;
      
      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
      const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
      
      const newValue = getValueFromPosition(clientX, clientY, rect, orientation, min, max, step);
      
      // Create synthetic event
      const syntheticEvent = {
        target: { value: newValue.toString() },
        currentTarget: { value: newValue.toString() },
        type: 'change',
        bubbles: true,
        cancelable: true,
        preventDefault: () => {},
        stopPropagation: () => {},
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      
      updateValue(newValue, syntheticEvent);
  }, [dragging, disabled, orientation, min, max, step, updateValue]);
  
  // Handle pointer up
  const handlePointerUp = useCallback(() => {
    setDragging(false);
    setShowTooltipState(false);
  }, []);
    
  // Effect for global mouse events during drag
  React.useEffect(() => {
      if (dragging) {
        const handleMouseMove = (e: MouseEvent) => handlePointerMove(e);
        const handleMouseUp = () => handlePointerUp();
        const handleTouchMove = (e: TouchEvent) => handlePointerMove(e);
        const handleTouchEnd = () => handlePointerUp();
        
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
        
        return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
          document.removeEventListener('touchmove', handleTouchMove);
          document.removeEventListener('touchend', handleTouchEnd);
        };
      }
  }, [dragging, handlePointerMove, handlePointerUp]);
  
  // Handle keyboard events
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    
    handleKeyDownUtil(event, currentValue, min, max, step, orientation, onChange);
  }, [disabled, currentValue, min, max, step, orientation, onChange]);
  
  // Handle focus events
  const handleFocus = useCallback(() => {
    setFocused(true);
    if (showTooltip) {
      setShowTooltipState(true);
    }
  }, [showTooltip]);
  
  const handleBlur = useCallback(() => {
    setFocused(false);
    if (!dragging) {
      setShowTooltipState(false);
    }
  }, [dragging]);

  // Handle mouse enter/leave for hover state
  const handleMouseEnter = useCallback(() => {
    if (!disabled) {
      setHovering(true);
      if (showTooltip) {
        setShowTooltipState(true);
      }
    }
  }, [disabled, showTooltip]);

  const handleMouseLeave = useCallback(() => {
    if (!dragging) {
      setHovering(false);
      if (!focused) {
        setShowTooltipState(false);
      }
    }
  }, [dragging, focused]);
    
  // Generate tick marks if needed
  const tickMarks = showTicks ? generateTicks(min, max, step, ticks) : [];
  
  // Get ARIA attributes
  const ariaAttributes = getAriaAttributes({
    value: currentValue,
    min,
    max,
    step,
    disabled,
    orientation,
    label,
    describedBy: description ? `${id}-description` : undefined,
  });
  
  // Render the slider
  return (
      <div
        className={className}
        style={{
          ...getSliderContainerStyles(orientation, length, disabled),
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
        
        {/* Main slider container */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
          {/* Header for horizontal */}
          {orientation === 'horizontal' && header && (
            <span style={getMinMaxLabelStyles(size, orientation, disabled || false, color, customColor, cssVars)}>
              {header}
            </span>
          )}
          
          {/* Track container */}
          <div
            ref={trackRef}
            style={{
              ...getTrackContainerStyles(orientation, size, animationsEnabled, length),
              cursor: disabled ? 'not-allowed' : dragging ? 'grabbing' : hovering ? 'grab' : 'pointer',
            }}
            onMouseDown={handlePointerDown}
            onTouchStart={handlePointerDown}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Track background */}
            <div style={getTrackBackgroundStyles(orientation, size, variant, color, customColor, cssVars)} />
            
            {/* Track fill */}
            <div
              style={getTrackFillStyles(
                orientation,
                size,
                color,
                customColor,
                currentValue,
                min,
                max,
                error || false,
                animationsEnabled && !dragging,
                variant,
                cssVars
              )}
            />
            
            {/* Tick marks */}
            {tickMarks.map((tick) => (
              <div key={tick.value}>
                <div style={getTickStyles(orientation, size, tick.value, min, max, cssVars)} />
                {tick.label && (
                  <div style={getTickLabelStyles(orientation, size, tick.value, min, max, cssVars)}>
                    {tick.label}
                  </div>
                )}
              </div>
            ))}
            
            {/* Thumb */}
            <div
              style={{
                ...getThumbStyles(
                  orientation,
                  size,
                  color,
                  customColor,
                  currentValue,
                  min,
                  max,
                  error || false,
                  focused || hovering,
                  animationsEnabled && !dragging,
                  variant,
                  cssVars
                ),
                cursor: disabled ? 'not-allowed' : dragging ? 'grabbing' : 'grab',
              }}
            />
            
            {/* Tooltip */}
            {showTooltip && showTooltipState && (
              <div style={getTooltipStyles(orientation, size, currentValue, min, max, cssVars)}>
                {formatValue(currentValue, customFormatter)}
              </div>
            )}
            
            {/* Hidden input for accessibility and form integration */}
            <input
              ref={inputRef}
              type="range"
              id={id}
              min={min}
              max={max}
              step={step}
              value={currentValue}
              disabled={disabled}
              onChange={handleChange}
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={getHiddenInputStyles()}
              {...ariaAttributes}
              name={name}
              required={required}
              readOnly={readOnly}
              autoComplete={autoComplete}
              autoFocus={autoFocus}
              data-testid={dataTestId}
              {...rest}
            />
          </div>
          
          {/* Footer for horizontal */}
          {orientation === 'horizontal' && footer && (
            <span style={getMinMaxLabelStyles(size, orientation, disabled || false, color, customColor, cssVars)}>
              {footer}
            </span>
          )}
        </div>
        
        {/* Labels for vertical orientation */}
        {orientation === 'vertical' && (header || footer) && (
          <div style={getLabelsContainerStyles(orientation)}>
            {header && (
              <span style={getMinMaxLabelStyles(size, orientation, disabled || false, color, customColor, cssVars)}>
                {header}
              </span>
            )}
            {footer && (
              <span style={getMinMaxLabelStyles(size, orientation, disabled || false, color, customColor, cssVars)}>
                {footer}
              </span>
            )}
          </div>
        )}
    </div>
  );
});

Slider.displayName = 'Slider';
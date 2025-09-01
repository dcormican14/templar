'use client';

import React, { forwardRef, useRef, useImperativeHandle, useState, useCallback, useId } from 'react';
import { useCSSVariables, useSettings } from '../../../providers';
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
  getDefaultSize,
  getDefaultColor,
  clampValue,
  roundToStep,
  getValueFromPosition,
  formatValue,
  validateSliderProps,
  generateTicks,
  handleKeyDown as handleKeyDownUtil,
  getAriaAttributes,
} from './Slider.utils';

export const Slider = forwardRef<SliderRef, SliderProps>(
  ({
    color = getDefaultColor(),
    customColor,
    size = getDefaultSize(),
    orientation = 'horizontal',
    value,
    defaultValue = 0,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    error = false,
    onChange,
    onInput,
    showTooltip = false,
    showTicks = false,
    ticks,
    label,
    description,
    showLabels = false,
    minLabel,
    maxLabel,
    length,
    formatValue: customFormatter,
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
    validateSliderProps({ min, max, step, value, defaultValue });
    
    // Determine if controlled or uncontrolled
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(
      clampValue(roundToStep(defaultValue, step), min, max)
    );
    const currentValue = isControlled ? clampValue(roundToStep(value, step), min, max) : internalValue;
    
    // State
    const [focused, setFocused] = useState(false);
    const [dragging, setDragging] = useState(false);
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
            style={getLabelStyles(size, disabled, error, cssVars)}
          >
            {label}
          </label>
        )}
        
        {/* Main slider container */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
          {/* Min label for horizontal, or track for vertical */}
          {showLabels && orientation === 'horizontal' && (
            <span style={getMinMaxLabelStyles(size, orientation, disabled, cssVars)}>
              {minLabel || min.toString()}
            </span>
          )}
          
          {/* Track container */}
          <div
            ref={trackRef}
            style={getTrackContainerStyles(orientation, size, animationsEnabled)}
            onMouseDown={handlePointerDown}
            onTouchStart={handlePointerDown}
          >
            {/* Track background */}
            <div style={getTrackBackgroundStyles(orientation, size, cssVars)} />
            
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
                error,
                animationsEnabled,
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
              style={getThumbStyles(
                orientation,
                size,
                color,
                customColor,
                currentValue,
                min,
                max,
                error,
                focused,
                animationsEnabled,
                cssVars
              )}
            />
            
            {/* Tooltip */}
            {(showTooltip || showTooltipState) && (
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
              {...rest}
            />
          </div>
          
          {/* Max label for horizontal */}
          {showLabels && orientation === 'horizontal' && (
            <span style={getMinMaxLabelStyles(size, orientation, disabled, cssVars)}>
              {maxLabel || max.toString()}
            </span>
          )}
        </div>
        
        {/* Labels for vertical orientation */}
        {showLabels && orientation === 'vertical' && (
          <div style={getLabelsContainerStyles(orientation)}>
            <span style={getMinMaxLabelStyles(size, orientation, disabled, cssVars)}>
              {minLabel || min.toString()}
            </span>
            <span style={getMinMaxLabelStyles(size, orientation, disabled, cssVars)}>
              {maxLabel || max.toString()}
            </span>
          </div>
        )}
        
        {/* Description */}
        {description && (
          <div
            id={`${id}-description`}
            style={getDescriptionStyles(size, disabled, error, cssVars)}
          >
            {description}
          </div>
        )}
      </div>
    );
  }
);

Slider.displayName = 'Slider';
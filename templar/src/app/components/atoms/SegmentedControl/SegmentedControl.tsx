'use client';

import React, { forwardRef, useState, useImperativeHandle, useRef, useId } from 'react';
import { useCSSVariables } from '../../../providers';
import { SegmentedControlProps, SegmentedControlRef } from './SegmentedControl.types';
import {
  getContainerStyles,
  getSegmentStyles,
  getIndicatorStyles,
  getVariantStyles,
  getIsometricContainerStyles,
  getIsometricShadowStyles,
  getColorVariables,
} from './SegmentedControl.styles';
import {
  getDefaultSize,
  getDefaultVariant,
  validateSegmentedControlProps,
  getAriaAttributes,
  getSegmentAriaAttributes,
  handleKeyboardNavigation,
} from './SegmentedControl.utils';

export const SegmentedControl = forwardRef<SegmentedControlRef, SegmentedControlProps>(({
  items,
  selectedIndex,
  defaultSelectedIndex = 0,
  onChange,
  size = getDefaultSize(),
  variant = getDefaultVariant(),
  color = 'primary',
  customColor,
  shape = 'round',
  disabled = false,
  error = false,
  fullWidth = false,
  animate = true,
  animationMode = 'default',
  rounded = false,
  name,
  className,
  style,
  // Filter out interactive config props that shouldn't be passed to DOM
  itemCount,
  item1,
  item2,
  item3,
  item4,
  item5,
  _itemsComputed,
  ...props
}, ref) => {
  // Get CSS variables for theming
  const cssVars = useCSSVariables();

  // Animation logic
  const animationsEnabled = animate;
  const useAnimationMode = animationsEnabled && animationMode !== 'none';
  const hasIsometricAnimation = useAnimationMode && animationMode === 'isometric' && variant !== 'ghost' && variant !== 'glassmorphic';
  
  // Generate unique ID
  const id = useId();
  
  // Validate props in development
  validateSegmentedControlProps({ items, selectedIndex, defaultSelectedIndex });
  
  // Internal state for uncontrolled mode
  const [internalSelectedIndex, setInternalSelectedIndex] = useState(defaultSelectedIndex);
  
  // Determine if controlled or uncontrolled
  const isControlled = selectedIndex !== undefined;
  const currentSelectedIndex = isControlled ? selectedIndex : internalSelectedIndex;
  
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const segmentRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  
  // Expose imperative methods
  useImperativeHandle(ref, () => ({
    focus: () => {
      const selectedButton = segmentRefs.current[currentSelectedIndex];
      selectedButton?.focus();
    },
    blur: () => {
      const selectedButton = segmentRefs.current[currentSelectedIndex];
      selectedButton?.blur();
    },
    selectIndex: (index: number) => {
      if (index >= 0 && index < items.length && !disabled) {
        handleIndexChange(index);
      }
    },
  }));
  
  // Handle index change
  const handleIndexChange = (newIndex: number) => {
    if (!isControlled) {
      setInternalSelectedIndex(newIndex);
    }

    if (onChange) {
      onChange(newIndex, items[newIndex]);
    }

    // Focus the new selected segment
    setTimeout(() => {
      segmentRefs.current[newIndex]?.focus();
    }, 0);
  };

  // Handle segment click
  const handleSegmentClick = (index: number) => {
    if (disabled || index === currentSelectedIndex) return;
    handleIndexChange(index);
  };
  
  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    handleKeyboardNavigation(
      event,
      currentSelectedIndex,
      items.length,
      handleIndexChange,
      disabled
    );
  };

  // Isometric hover handlers - applied to the selected segment button
  const handleSelectedSegmentMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && hasIsometricAnimation) {
      if (indicatorRef.current) {
        // On hover, move to (0, 0) to "press" toward the shadow
        indicatorRef.current.style.transform = 'translate(0, 0)';
      }
      // Also move the text with the indicator
      const button = event.currentTarget;
      if (button) {
        button.style.transform = 'translate(0, 0)';
      }
    }
  };

  const handleSelectedSegmentMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && hasIsometricAnimation) {
      if (indicatorRef.current) {
        // On leave, return to elevated position (-3px, -3px)
        indicatorRef.current.style.transform = 'translate(-3px, -3px)';
      }
      // Also return the text to elevated position
      const button = event.currentTarget;
      if (button) {
        button.style.transform = 'translate(-3px, -3px)';
      }
    }
  };
  
  // Get ARIA attributes
  const containerAriaAttributes = getAriaAttributes({
    selectedIndex: currentSelectedIndex,
    disabled,
    name,
  });
  
  // Combine styles with proper parameters
  const containerStyles = {
    ...getContainerStyles(
      size,
      variant,
      color,
      customColor,
      rounded ? 'pill' : shape,
      disabled,
      error,
      animate,
      cssVars,
      fullWidth,
      items.length
    ),
    ...style,
  };
  
  // Render the indicator with optional isometric wrapper
  const renderIndicator = () => {
    const indicatorStyles = getIndicatorStyles(
      currentSelectedIndex,
      items.length,
      variant,
      color,
      customColor,
      rounded ? 'pill' : shape,
      size,
      animate,
      cssVars,
      hasIsometricAnimation
    );

    const indicatorElement = (
      <div
        ref={indicatorRef}
        role="presentation"
        style={indicatorStyles}
      />
    );

    // Isometric wrapper
    if (hasIsometricAnimation) {
      const colors = getColorVariables(color, customColor, cssVars);
      const shadowStyles = getIsometricShadowStyles(
        colors,
        variant,
        rounded ? 'pill' : shape,
        size,
        animate
      );

      return (
        <div style={getIsometricContainerStyles(currentSelectedIndex, items.length)}>
          <div ref={shadowRef} style={shadowStyles} />
          {indicatorElement}
        </div>
      );
    }

    return indicatorElement;
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={containerStyles}
      onKeyDown={handleKeyDown}
      {...containerAriaAttributes}
      {...props}
    >
      {/* Sliding indicator */}
      {renderIndicator()}

      {/* Segments */}
      {items.map((item, index) => {
        const isSelected = index === currentSelectedIndex;
        const segmentId = `${id}-segment-${index}`;
        const segmentAriaAttributes = getSegmentAriaAttributes({
          index,
          isSelected,
          disabled,
          item,
          segmentId,
        });

        const renderSegmentText = () => item;

        return (
          <button
            key={`${item}-${index}`}
            ref={(el) => { segmentRefs.current[index] = el; }}
            type="button"
            disabled={disabled}
            onClick={() => handleSegmentClick(index)}
            onMouseEnter={isSelected && hasIsometricAnimation ? handleSelectedSegmentMouseEnter : undefined}
            onMouseLeave={isSelected && hasIsometricAnimation ? handleSelectedSegmentMouseLeave : undefined}
            style={getSegmentStyles(
              size,
              variant,
              color,
              customColor,
              rounded ? 'pill' : shape,
              isSelected,
              disabled,
              animate,
              cssVars,
              hasIsometricAnimation
            )}
            {...segmentAriaAttributes}
          >
            <span style={{
              width: '100%',
              display: 'block',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minWidth: 0
            }}>
              {renderSegmentText()}
            </span>
          </button>
        );
      })}
    </div>
  );
});

SegmentedControl.displayName = 'SegmentedControl';
'use client';

import React, { forwardRef, useState, useImperativeHandle, useRef, useId } from 'react';
import { useCSSVariables } from '../../../providers';
import { SegmentedControlProps, SegmentedControlRef } from './SegmentedControl.types';
import {
  getContainerStyles,
  getSegmentStyles,
  getIndicatorStyles,
  getVariantStyles,
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
      <div
        role="presentation"
        style={getIndicatorStyles(
          currentSelectedIndex,
          items.length,
          variant,
          color,
          customColor,
          rounded ? 'pill' : shape,
          size,
          animate,
          cssVars
        )}
      />
      
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
        
        return (
          <button
            key={`${item}-${index}`}
            ref={(el) => { segmentRefs.current[index] = el; }}
            type="button"
            disabled={disabled}
            onClick={() => handleSegmentClick(index)}
            style={getSegmentStyles(
              size,
              variant,
              color,
              customColor,
              rounded ? 'pill' : shape,
              isSelected,
              disabled,
              animate,
              cssVars
            )}
            {...segmentAriaAttributes}
          >
            <div style={{
              width: '100%',
              textAlign: 'center',
              position: 'relative',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {/* Invisible bold text to reserve space */}
              <span style={{
                visibility: 'hidden',
                fontWeight: '600',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                pointerEvents: 'none'
              }}>
                {item}
              </span>
              {/* Actual visible text */}
              <span>
                {item}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
});

SegmentedControl.displayName = 'SegmentedControl';
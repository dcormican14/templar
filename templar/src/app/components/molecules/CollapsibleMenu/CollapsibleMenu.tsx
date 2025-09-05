'use client';

import React, { forwardRef, useImperativeHandle, useState, useCallback, useId, useRef } from 'react';
import { useCSSVariables, useSettings } from '../../../providers';
import { Icon } from '../../atoms/Icon';
import type { CollapsibleMenuProps, CollapsibleMenuRef } from './CollapsibleMenu.types';
import {
  getCollapsibleMenuContainerStyles,
  getContentStyles,
  getToggleStyles,
  getToggleIconStyles,
  getSizeConfig,
} from './CollapsibleMenu.styles';

export const CollapsibleMenu = forwardRef<CollapsibleMenuRef, CollapsibleMenuProps>((props, ref) => {
  const {
    collapsed: controlledCollapsed,
    defaultCollapsed = false,
    onToggle,
    position = 'left',
    expandedWidth = '250px',
    collapsedWidth = '20px',
    children,
    toggleContent,
    showToggle = true,
    toggleStyle,
    toggleClassName,
    zIndex = 1000,
    overlay = false,
    animationDuration = 300,
    color = 'primary',
    customColor,
    size = 'md',
    shape = 'default',
    disabled = false,
    animate = true,
    className,
    style,
    id: providedId,
  } = props;

  // Get CSS variables and settings
  const cssVars = useCSSVariables();
  const { settings } = useSettings();
  const animationsEnabled = (settings.appearance.animations ?? true) && animate;
  
  // Generate unique ID if not provided
  const generatedId = useId();
  const id = providedId || generatedId;
  
  // Internal state for uncontrolled mode
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  
  // Determine if controlled or uncontrolled
  const isControlled = controlledCollapsed !== undefined;
  const isCollapsed = isControlled ? controlledCollapsed : internalCollapsed;
  
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  
  // Handle toggle
  const handleToggle = useCallback(() => {
    if (disabled) return;
    
    const newCollapsed = !isCollapsed;
    
    if (!isControlled) {
      setInternalCollapsed(newCollapsed);
    }
    
    onToggle?.(newCollapsed);
  }, [disabled, isCollapsed, isControlled, onToggle]);
  
  // Handle expand
  const handleExpand = useCallback(() => {
    if (disabled) return;
    
    if (!isControlled) {
      setInternalCollapsed(false);
    }
    
    if (isCollapsed) {
      onToggle?.(false);
    }
  }, [disabled, isCollapsed, isControlled, onToggle]);
  
  // Handle collapse
  const handleCollapse = useCallback(() => {
    if (disabled) return;
    
    if (!isControlled) {
      setInternalCollapsed(true);
    }
    
    if (!isCollapsed) {
      onToggle?.(true);
    }
  }, [disabled, isCollapsed, isControlled, onToggle]);
  
  // Expose imperative methods
  useImperativeHandle(ref, () => ({
    toggle: handleToggle,
    expand: handleExpand,
    collapse: handleCollapse,
    isCollapsed: () => isCollapsed,
  }));
  
  // Handle toggle click
  const handleToggleClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    handleToggle();
  }, [handleToggle]);
  
  // Handle keyboard interaction for toggle
  const handleToggleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  }, [handleToggle]);
  
  // Get effective animation duration
  const effectiveAnimationDuration = animationsEnabled ? animationDuration : 0;
  
  // Create styles
  const containerStyles = getCollapsibleMenuContainerStyles(
    position,
    isCollapsed,
    expandedWidth,
    collapsedWidth,
    overlay,
    zIndex,
    effectiveAnimationDuration,
    disabled,
    cssVars
  );
  
  const contentStyles = getContentStyles(size, isCollapsed, cssVars);
  
  const toggleStyles = getToggleStyles(
    position,
    size,
    color,
    customColor,
    shape,
    isCollapsed,
    disabled,
    effectiveAnimationDuration,
    cssVars
  );
  
  const toggleIconStyles = getToggleIconStyles(
    position,
    isCollapsed,
    effectiveAnimationDuration
  );
  
  const sizeConfig = getSizeConfig(size);
  
  // Render toggle button
  const renderToggle = () => {
    if (!showToggle) return null;
    
    const iconName = position === 'right' ? 'NavArrowRight' : 'NavArrowLeft';
    
    return (
      <button
        ref={toggleRef}
        type="button"
        className={toggleClassName}
        style={{
          ...toggleStyles,
          ...toggleStyle,
        }}
        onClick={handleToggleClick}
        onKeyDown={handleToggleKeyDown}
        disabled={disabled}
        aria-label={`${isCollapsed ? 'Expand' : 'Collapse'} menu`}
        aria-expanded={!isCollapsed}
        tabIndex={0}
      >
        {toggleContent ? (
          toggleContent
        ) : (
          <div style={toggleIconStyles}>
            <Icon 
              name={iconName} 
              size={size as any}
            />
          </div>
        )}
      </button>
    );
  };
  
  return (
    <div
      ref={containerRef}
      id={id}
      className={className}
      style={{
        ...containerStyles,
        ...style,
      }}
      role="complementary"
      aria-label="Collapsible menu"
      data-collapsed={isCollapsed}
      data-position={position}
    >
      {/* Toggle button */}
      {renderToggle()}
      
      {/* Content area */}
      <div style={contentStyles}>
        {children}
      </div>
    </div>
  );
});

CollapsibleMenu.displayName = 'CollapsibleMenu';
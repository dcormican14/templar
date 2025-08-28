import React from 'react';
import { Icon } from '../Icon';
import type { CheckBoxVariant } from './CheckBox.types';

export const getIconColor = (
  variant: CheckBoxVariant,
  error: boolean,
  checked: boolean,
  cssVars: any
): string => {
  // For checked states, use the variant's foreground color
  if (checked) {
    if (error) return cssVars.errorForeground;
    
    switch (variant) {
      case 'primary':
        return cssVars.primaryForeground;
      case 'secondary':
        return cssVars.secondaryForeground;
      case 'success':
        return cssVars.successForeground;
      case 'warning':
        return cssVars.warningForeground;
      case 'error':
        return cssVars.errorForeground;
      case 'default':
      default:
        return cssVars.primaryForeground;
    }
  }
  
  // For unchecked states with asterisk, use the variant's main color
  if (error) return cssVars.error;
  
  switch (variant) {
    case 'primary':
      return cssVars.primary;
    case 'secondary':
      return cssVars.secondary;
    case 'success':
      return cssVars.success;
    case 'warning':
      return cssVars.warning;
    case 'error':
      return cssVars.error;
    case 'default':
    default:
      return cssVars.primary;
  }
};

export const createCheckIcon = (
  checked: boolean,
  indeterminate: boolean,
  error: boolean,
  size: string,
  color: string
): React.ReactElement | null => {
  if (indeterminate) {
    return <Icon name="Minus" size={size as any} style={{ color }} />;
  }
  
  if (checked) {
    return <Icon name="Check" size={size as any} style={{ color }} />;
  }
  
  // Show asterisk for required/error fields when unchecked
  if (error && !checked) {
    return <Icon name="Asterisk" size={size as any} style={{ color }} />;
  }
  
  return null;
};

export const getIconSize = (checkboxSize: string): string => {
  const iconSizeMap: Record<string, string> = {
    xs: 'xs',
    sm: 'xs', 
    md: 'sm',
    lg: 'sm',
    xl: 'md',
  };
  return iconSizeMap[checkboxSize] || 'sm';
};

export const handleKeyDown = (
  event: React.KeyboardEvent<HTMLInputElement>,
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void,
  checked?: boolean
) => {
  // Only handle Enter key - let Space key work naturally with native checkbox
  if (event.key === 'Enter') {
    event.preventDefault();
    if (onChange) {
      // Create a synthetic change event
      const inputElement = event.currentTarget;
      const syntheticEvent = {
        target: { ...inputElement, checked: !checked },
        currentTarget: { ...inputElement, checked: !checked },
        type: 'change',
        bubbles: true,
        cancelable: true,
        preventDefault: () => {},
        stopPropagation: () => {},
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      
      onChange(!checked, syntheticEvent);
    }
  }
  // Let Space key work naturally - don't preventDefault for it
};

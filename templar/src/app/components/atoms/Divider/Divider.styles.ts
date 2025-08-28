import React from 'react';
import type { DividerVariant, DividerSize, DividerOrientation, DividerSpacing } from './Divider.types';

export const getVariantStyles = (
  variant: DividerVariant, 
  cssVars: any, 
  useBorder: boolean = false,
  orientation: DividerOrientation = 'horizontal',
  dashed: boolean = false,
  dotted: boolean = false,
  size: DividerSize = 'md'
) => {
  const colorValue = (() => {
    switch (variant) {
      case 'primary':
        return cssVars.primary;
      case 'secondary':
        return cssVars.secondary;
      case 'warning':
        return cssVars.warning;
      case 'destructive':
        return cssVars.destructive || cssVars.error;
      case 'success':
        return cssVars.success;
      case 'default':
        return cssVars.border;
      case 'inverted':
        return cssVars.foreground;
      default:
        return cssVars.border;
    }
  })();

  const sizeMap = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 6,
  };
  
  const thickness = sizeMap[size];

  // For custom dashed and dotted patterns
  if (dashed || dotted) {
    const styles: React.CSSProperties = {
      borderColor: 'transparent',
      backgroundColor: 'transparent',
    };

    if (dashed) {
      // Create custom dashed pattern with wider, rounded dashes
      const dashLength = Math.max(thickness * 3, 8); // Wider dashes
      const gapLength = Math.max(thickness * 2, 4);
      
      if (orientation === 'vertical') {
        styles.backgroundImage = `linear-gradient(to bottom, ${colorValue} 0%, ${colorValue} 100%)`;
        styles.backgroundSize = `${thickness}px ${dashLength}px`;
        styles.backgroundRepeat = 'repeat-y';
        styles.backgroundPosition = `0 0, 0 ${dashLength + gapLength}px`;
        styles.maskImage = `repeating-linear-gradient(to bottom, black 0px, black ${dashLength}px, transparent ${dashLength}px, transparent ${dashLength + gapLength}px)`;
        styles.WebkitMaskImage = `repeating-linear-gradient(to bottom, black 0px, black ${dashLength}px, transparent ${dashLength}px, transparent ${dashLength + gapLength}px)`;
      } else {
        styles.backgroundImage = `linear-gradient(to right, ${colorValue} 0%, ${colorValue} 100%)`;
        styles.backgroundSize = `${dashLength}px ${thickness}px`;
        styles.backgroundRepeat = 'repeat-x';
        styles.backgroundPosition = `0 0, ${dashLength + gapLength}px 0`;
        styles.maskImage = `repeating-linear-gradient(to right, black 0px, black ${dashLength}px, transparent ${dashLength}px, transparent ${dashLength + gapLength}px)`;
        styles.WebkitMaskImage = `repeating-linear-gradient(to right, black 0px, black ${dashLength}px, transparent ${dashLength}px, transparent ${dashLength + gapLength}px)`;
      }
      
      // Add rounded corners to the dashes
      styles.borderRadius = `${Math.min(thickness / 2, 2)}px`;
    } else if (dotted) {
      // Create custom dotted pattern with rounded dots
      const dotSize = Math.max(thickness, 2);
      const spacing = dotSize * 2.5;
      
      if (orientation === 'vertical') {
        styles.backgroundImage = `radial-gradient(circle, ${colorValue} ${dotSize / 2}px, transparent ${dotSize / 2}px)`;
        styles.backgroundSize = `${dotSize}px ${spacing}px`;
        styles.backgroundRepeat = 'repeat-y';
        styles.backgroundPosition = 'center 0';
      } else {
        styles.backgroundImage = `radial-gradient(circle, ${colorValue} ${dotSize / 2}px, transparent ${dotSize / 2}px)`;
        styles.backgroundSize = `${spacing}px ${dotSize}px`;
        styles.backgroundRepeat = 'repeat-x';
        styles.backgroundPosition = '0 center';
      }
    }

    return styles;
  }

  // For solid dividers or border-based patterns
  if (useBorder) {
    return {
      borderColor: colorValue,
      backgroundColor: 'transparent',
    };
  }

  return {
    borderColor: colorValue,
    backgroundColor: colorValue,
  };
};

export const getSizeStyles = (
  size: DividerSize, 
  orientation: DividerOrientation, 
  useBorder: boolean = false,
  useCustomPattern: boolean = false
) => {
  const sizeMap = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 6,
  };
  
  const thickness = sizeMap[size];
  
  if (orientation === 'vertical') {
    if (useBorder && !useCustomPattern) {
      return {
        borderLeftWidth: `${thickness}px`,
        width: 'auto',
        height: 'auto',
        minHeight: '20px',
      };
    } else {
      return {
        width: `${thickness}px`,
        height: 'auto',
        minHeight: '20px',
      };
    }
  }
  
  if (useBorder && !useCustomPattern) {
    return {
      borderTopWidth: `${thickness}px`,
      height: 'auto',
      width: 'auto',
      minWidth: '20px',
    };
  } else {
    return {
      height: `${thickness}px`,
      width: 'auto',
      minWidth: '20px',
    };
  }
};

export const getSpacingStyles = (spacing: DividerSpacing, orientation: DividerOrientation) => {
  const spacingMap = {
    none: 0,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
  };
  
  const space = spacingMap[spacing];
  
  if (orientation === 'vertical') {
    return {
      marginLeft: `${space}px`,
      marginRight: `${space}px`,
    };
  }
  
  return {
    marginTop: `${space}px`,
    marginBottom: `${space}px`,
  };
};

export const createBaseStyles = (
  orientation: DividerOrientation,
  fullSize: boolean,
  rounded: boolean,
  subtle: boolean,
  dashed: boolean,
  dotted: boolean
): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    position: 'relative',
    borderWidth: '0',
    borderStyle: 'solid',
    borderColor: 'transparent',
    flexShrink: 0,
    opacity: subtle ? 0.5 : 1,
  };
  
  // For dashed/dotted styles, we'll use CSS mask or background for better control
  const useCustomPattern = dashed || dotted;
  
  if (orientation === 'vertical') {
    baseStyles.alignSelf = fullSize ? 'stretch' : 'auto';
    baseStyles.height = fullSize ? '100%' : 'auto';
    
    if (useCustomPattern) {
      // We'll handle custom patterns in the variant styles
      baseStyles.width = '1px'; // This will be overridden by size styles
    } else {
      // For solid lines, use background color for better appearance
      baseStyles.width = '1px'; // This will be overridden by size styles
    }
  } else {
    baseStyles.width = fullSize ? '100%' : 'auto';
    
    if (useCustomPattern) {
      // We'll handle custom patterns in the variant styles
      baseStyles.height = '1px'; // This will be overridden by size styles
    } else {
      // For solid lines, use background color for better appearance
      baseStyles.height = '1px'; // This will be overridden by size styles
    }
  }
  
  if (rounded && !useCustomPattern) {
    baseStyles.borderRadius = '4px';
  }
  
  return baseStyles;
};

export const createLabelStyles = (
  orientation: DividerOrientation,
  labelPosition: 'start' | 'center' | 'end',
  cssVars: any,
  variantStyles: any
): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    backgroundColor: 'transparent',
    fontSize: '12px',
    fontWeight: '500',
    color: variantStyles.borderColor || variantStyles.backgroundColor,
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  };
  
  // Adjust padding and positioning based on label position
  if (labelPosition === 'start') {
    baseStyles.paddingRight = '8px';
    baseStyles.paddingLeft = '0px';
    baseStyles.justifyContent = 'flex-start';
  } else if (labelPosition === 'end') {
    baseStyles.paddingLeft = '8px';
    baseStyles.paddingRight = '0px';
    baseStyles.justifyContent = 'flex-end';
  } else {
    baseStyles.padding = '0 8px';
    baseStyles.justifyContent = 'center';
  }
  
  if (orientation === 'vertical') {
    baseStyles.transform = 'rotate(90deg)';
    baseStyles.transformOrigin = 'center';
  }
  
  return baseStyles;
};

export const createGappedDividerStyles = (
  orientation: DividerOrientation,
  labelPosition: 'start' | 'center' | 'end',
  variantStyles: any,
  sizeStyles: any,
  rounded: boolean,
  subtle: boolean,
  dashed: boolean,
  dotted: boolean
): { 
  beforeStyles: React.CSSProperties, 
  afterStyles: React.CSSProperties,
  containerStyles: React.CSSProperties 
} => {
  const opacity = subtle ? 0.5 : 1;
  const useCustomPattern = dashed || dotted;
  
  const baseDividerStyles: React.CSSProperties = {
    ...variantStyles,
    opacity,
    flexShrink: 0,
  };
  
  if (rounded && !useCustomPattern) {
    baseDividerStyles.borderRadius = '4px';
  }
  
  if (orientation === 'vertical') {
    const containerStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
    };
    
    const dividerStyles: React.CSSProperties = {
      ...baseDividerStyles,
      height: 'auto',
      flex: 1,
      minHeight: '20px',
    };
    
    // Apply size styles
    if (useCustomPattern) {
      dividerStyles.width = sizeStyles.width;
    } else if (sizeStyles.borderLeftWidth) {
      dividerStyles.borderLeftWidth = sizeStyles.borderLeftWidth;
      dividerStyles.borderLeftStyle = 'solid';
      dividerStyles.borderLeftColor = variantStyles.borderColor;
      dividerStyles.width = 'auto';
      dividerStyles.backgroundColor = 'transparent';
    } else {
      dividerStyles.width = sizeStyles.width;
      dividerStyles.backgroundColor = variantStyles.backgroundColor;
    }
    
    let beforeStyles = { ...dividerStyles };
    let afterStyles = { ...dividerStyles };
    
    if (labelPosition === 'start') {
      beforeStyles = { display: 'none' };
    } else if (labelPosition === 'end') {
      afterStyles = { display: 'none' };
    }
    
    return { beforeStyles, afterStyles, containerStyles };
  } else {
    // Horizontal
    const containerStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    };
    
    const dividerStyles: React.CSSProperties = {
      ...baseDividerStyles,
      width: 'auto',
      minWidth: '20px',
    };
    
    // Apply size styles
    if (useCustomPattern) {
      dividerStyles.height = sizeStyles.height;
    } else if (sizeStyles.borderTopWidth) {
      dividerStyles.borderTopWidth = sizeStyles.borderTopWidth;
      dividerStyles.borderTopStyle = 'solid';
      dividerStyles.borderTopColor = variantStyles.borderColor;
      dividerStyles.height = 'auto';
      dividerStyles.backgroundColor = 'transparent';
    } else {
      dividerStyles.height = sizeStyles.height;
      dividerStyles.backgroundColor = variantStyles.backgroundColor;
    }
    
    let beforeStyles = { ...dividerStyles };
    let afterStyles = { ...dividerStyles };
    
    if (labelPosition === 'start') {
      // For start position, no divider before label, full divider after
      beforeStyles = { display: 'none' };
      afterStyles = { ...dividerStyles, flex: 1 };
    } else if (labelPosition === 'end') {
      // For end position, full divider before label, no divider after
      beforeStyles = { ...dividerStyles, flex: 1 };
      afterStyles = { display: 'none' };
    } else {
      // For center position, equal dividers on both sides
      beforeStyles = { ...dividerStyles, flex: 1 };
      afterStyles = { ...dividerStyles, flex: 1 };
    }
    
    return { beforeStyles, afterStyles, containerStyles };
  }
};

export const createContainerStyles = (
  orientation: DividerOrientation,
  hasLabel: boolean
): React.CSSProperties => {
  if (!hasLabel) return {};
  
  return {
    position: 'relative',
    display: 'flex',
    alignItems: orientation === 'horizontal' ? 'center' : 'stretch',
    justifyContent: orientation === 'vertical' ? 'center' : 'stretch',
  };
};

import React from 'react';
import type { SliderColor, SliderSize, SliderOrientation } from './Slider.types';

// Get color variables based on color prop
export const getColorVariables = (color: SliderColor, customColor: string | undefined, cssVars: any) => {
  if (color === 'custom' && customColor) {
    return {
      main: customColor,
      foreground: '#ffffff',
      background: customColor + '10',
      border: customColor,
      hover: customColor + '20',
    };
  }

  const colorMap = {
    primary: {
      main: cssVars.primary,
      background: cssVars.primaryBackground,
      foreground: cssVars.primaryForeground,
      hover: cssVars.primaryHover,
      border: cssVars.primaryBorder,
    },
    secondary: {
      main: cssVars.secondary,
      background: cssVars.secondaryBackground,
      foreground: cssVars.secondaryForeground,
      hover: cssVars.secondaryHover,
      border: cssVars.secondaryBorder,
    },
    success: {
      main: cssVars.success,
      background: cssVars.successBackground,
      foreground: cssVars.successForeground,
      hover: cssVars.successHover,
      border: cssVars.successBorder,
    },
    warning: {
      main: cssVars.warning,
      background: cssVars.warningBackground,
      foreground: cssVars.warningForeground,
      hover: cssVars.warningHover,
      border: cssVars.warningBorder,
    },
    destructive: {
      main: cssVars.destructive,
      background: cssVars.destructiveBackground,
      foreground: cssVars.destructiveForeground,
      hover: cssVars.destructiveHover,
      border: cssVars.destructiveBorder,
    },
    info: {
      main: cssVars.info,
      background: cssVars.infoBackground,
      foreground: cssVars.infoForeground,
      hover: cssVars.infoHover,
      border: cssVars.infoBorder,
    },
  };

  return colorMap[color] || colorMap.primary;
};

// Get size configuration
export const getSizeConfig = (size: SliderSize, orientation: SliderOrientation) => {
  const baseConfig = {
    xs: {
      trackThickness: 2,
      thumbSize: 12,
      thumbBorder: 1,
      fontSize: '12px',
      gap: '6px',
    },
    sm: {
      trackThickness: 3,
      thumbSize: 16,
      thumbBorder: 2,
      fontSize: '14px',
      gap: '8px',
    },
    md: {
      trackThickness: 4,
      thumbSize: 20,
      thumbBorder: 2,
      fontSize: '16px',
      gap: '10px',
    },
    lg: {
      trackThickness: 5,
      thumbSize: 24,
      thumbBorder: 2,
      fontSize: '18px',
      gap: '12px',
    },
    xl: {
      trackThickness: 6,
      thumbSize: 28,
      thumbBorder: 3,
      fontSize: '20px',
      gap: '14px',
    },
  };

  return baseConfig[size];
};

// Container styles
export const getSliderContainerStyles = (
  orientation: SliderOrientation,
  length: string | number | undefined,
  disabled: boolean
): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: orientation === 'horizontal' ? 'column' : 'row',
    alignItems: orientation === 'horizontal' ? 'stretch' : 'center',
    gap: '8px',
    fontFamily: 'inherit',
    cursor: disabled ? 'not-allowed' : 'default',
    opacity: disabled ? 0.6 : 1,
  };

  if (length) {
    if (orientation === 'horizontal') {
      baseStyles.width = typeof length === 'number' ? `${length}px` : length;
    } else {
      baseStyles.height = typeof length === 'number' ? `${length}px` : length;
    }
  }

  return baseStyles;
};

// Track container styles
export const getTrackContainerStyles = (
  orientation: SliderOrientation,
  size: SliderSize,
  animationsEnabled: boolean
): React.CSSProperties => {
  const config = getSizeConfig(size, orientation);
  
  return {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: orientation === 'horizontal' ? '100%' : `${config.thumbSize}px`,
    height: orientation === 'horizontal' ? `${config.thumbSize}px` : '200px',
    cursor: 'pointer',
    transition: animationsEnabled
      ? 'opacity var(--duration-fast) var(--animation-smooth)'
      : 'none',
  };
};

// Track background styles
export const getTrackBackgroundStyles = (
  orientation: SliderOrientation,
  size: SliderSize,
  cssVars: any
): React.CSSProperties => {
  const config = getSizeConfig(size, orientation);
  
  return {
    position: 'absolute',
    backgroundColor: cssVars.border,
    borderRadius: '9999px',
    width: orientation === 'horizontal' ? '100%' : `${config.trackThickness}px`,
    height: orientation === 'horizontal' ? `${config.trackThickness}px` : '100%',
  };
};

// Track fill styles
export const getTrackFillStyles = (
  orientation: SliderOrientation,
  size: SliderSize,
  color: SliderColor,
  customColor: string | undefined,
  value: number,
  min: number,
  max: number,
  error: boolean,
  animationsEnabled: boolean,
  cssVars: any
): React.CSSProperties => {
  const config = getSizeConfig(size, orientation);
  const colors = getColorVariables(color, customColor, cssVars);
  const percentage = ((value - min) / (max - min)) * 100;
  
  const fillColor = error ? cssVars.destructive : colors.main;
  
  return {
    position: 'absolute',
    backgroundColor: fillColor,
    borderRadius: '9999px',
    width: orientation === 'horizontal' ? `${percentage}%` : `${config.trackThickness}px`,
    height: orientation === 'horizontal' ? `${config.trackThickness}px` : `${percentage}%`,
    [orientation === 'horizontal' ? 'left' : 'bottom']: 0,
    transition: animationsEnabled
      ? 'width var(--duration-fast) var(--animation-smooth), height var(--duration-fast) var(--animation-smooth), background-color var(--duration-fast) var(--animation-smooth)'
      : 'none',
  };
};

// Hidden input styles
export const getHiddenInputStyles = (): React.CSSProperties => ({
  position: 'absolute',
  opacity: 0,
  width: '100%',
  height: '100%',
  margin: 0,
  padding: 0,
  cursor: 'inherit',
  zIndex: 2,
});

// Thumb styles
export const getThumbStyles = (
  orientation: SliderOrientation,
  size: SliderSize,
  color: SliderColor,
  customColor: string | undefined,
  value: number,
  min: number,
  max: number,
  error: boolean,
  focused: boolean,
  animationsEnabled: boolean,
  cssVars: any
): React.CSSProperties => {
  const config = getSizeConfig(size, orientation);
  const colors = getColorVariables(color, customColor, cssVars);
  const percentage = ((value - min) / (max - min)) * 100;
  
  const thumbColor = error ? cssVars.destructive : colors.main;
  
  const baseStyles: React.CSSProperties = {
    position: 'absolute',
    width: `${config.thumbSize}px`,
    height: `${config.thumbSize}px`,
    backgroundColor: cssVars.background,
    border: `${config.thumbBorder}px solid ${thumbColor}`,
    borderRadius: '50%',
    cursor: 'grab',
    zIndex: 1,
    outline: focused ? `2px solid ${thumbColor}` : 'none',
    outlineOffset: '2px',
    transition: animationsEnabled
      ? 'left var(--duration-fast) var(--animation-smooth), bottom var(--duration-fast) var(--animation-smooth), border-color var(--duration-fast) var(--animation-smooth), box-shadow var(--duration-fast) var(--animation-smooth)'
      : 'none',
    boxShadow: focused ? `0 0 0 2px ${thumbColor}20` : cssVars.shadow,
  };

  // Position the thumb
  if (orientation === 'horizontal') {
    baseStyles.left = `calc(${percentage}% - ${config.thumbSize / 2}px)`;
    baseStyles.top = '50%';
    baseStyles.transform = 'translateY(-50%)';
  } else {
    baseStyles.bottom = `calc(${percentage}% - ${config.thumbSize / 2}px)`;
    baseStyles.left = '50%';
    baseStyles.transform = 'translateX(-50%)';
  }

  return baseStyles;
};

// Label styles
export const getLabelStyles = (
  size: SliderSize,
  disabled: boolean,
  error: boolean,
  cssVars: any
): React.CSSProperties => {
  const config = getSizeConfig(size, 'horizontal');
  
  return {
    fontSize: config.fontSize,
    fontWeight: 500,
    color: disabled ? cssVars.mutedForeground : (error ? cssVars.destructive : cssVars.foreground),
    marginBottom: '4px',
    userSelect: 'none',
  };
};

// Description styles
export const getDescriptionStyles = (
  size: SliderSize,
  disabled: boolean,
  error: boolean,
  cssVars: any
): React.CSSProperties => {
  const fontSizeMap = {
    xs: '10px',
    sm: '12px',
    md: '14px',
    lg: '16px',
    xl: '18px',
  };
  
  return {
    fontSize: fontSizeMap[size],
    color: disabled ? cssVars.mutedForeground : (error ? cssVars.destructive : cssVars.mutedForeground),
    marginTop: '4px',
    lineHeight: 1.4,
    userSelect: 'none',
  };
};

// Min/Max labels styles
export const getMinMaxLabelStyles = (
  size: SliderSize,
  orientation: SliderOrientation,
  disabled: boolean,
  cssVars: any
): React.CSSProperties => {
  const config = getSizeConfig(size, orientation);
  
  return {
    fontSize: config.fontSize,
    color: disabled ? cssVars.mutedForeground : cssVars.mutedForeground,
    userSelect: 'none',
    whiteSpace: 'nowrap',
  };
};

// Min/Max labels container styles
export const getLabelsContainerStyles = (
  orientation: SliderOrientation
): React.CSSProperties => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: orientation === 'horizontal' ? '100%' : 'auto',
  flexDirection: orientation === 'horizontal' ? 'row' : 'column-reverse',
  alignItems: orientation === 'horizontal' ? 'center' : 'flex-start',
  gap: '4px',
  marginTop: orientation === 'horizontal' ? '4px' : '0',
  marginLeft: orientation === 'vertical' ? '8px' : '0',
});

// Tooltip styles
export const getTooltipStyles = (
  orientation: SliderOrientation,
  size: SliderSize,
  value: number,
  min: number,
  max: number,
  cssVars: any
): React.CSSProperties => {
  const config = getSizeConfig(size, orientation);
  const percentage = ((value - min) / (max - min)) * 100;
  
  const baseStyles: React.CSSProperties = {
    position: 'absolute',
    backgroundColor: cssVars.popover,
    color: cssVars.popoverForeground,
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    zIndex: 3,
    pointerEvents: 'none',
    border: `1px solid ${cssVars.border}`,
    boxShadow: cssVars.shadow,
  };

  if (orientation === 'horizontal') {
    baseStyles.left = `calc(${percentage}% - 50%)`;
    baseStyles.bottom = `${config.thumbSize + 8}px`;
    baseStyles.transform = 'translateX(50%)';
  } else {
    baseStyles.bottom = `calc(${percentage}% - 50%)`;
    baseStyles.left = `${config.thumbSize + 8}px`;
    baseStyles.transform = 'translateY(50%)';
  }

  return baseStyles;
};

// Tick marks styles
export const getTickStyles = (
  orientation: SliderOrientation,
  size: SliderSize,
  position: number,
  min: number,
  max: number,
  cssVars: any
): React.CSSProperties => {
  const config = getSizeConfig(size, orientation);
  const percentage = ((position - min) / (max - min)) * 100;
  
  const baseStyles: React.CSSProperties = {
    position: 'absolute',
    backgroundColor: cssVars.border,
    pointerEvents: 'none',
  };

  if (orientation === 'horizontal') {
    baseStyles.left = `calc(${percentage}%)`;
    baseStyles.top = '50%';
    baseStyles.width = '1px';
    baseStyles.height = `${config.trackThickness + 4}px`;
    baseStyles.transform = 'translateY(-50%)';
  } else {
    baseStyles.bottom = `calc(${percentage}%)`;
    baseStyles.left = '50%';
    baseStyles.height = '1px';
    baseStyles.width = `${config.trackThickness + 4}px`;
    baseStyles.transform = 'translateX(-50%)';
  }

  return baseStyles;
};

// Tick label styles
export const getTickLabelStyles = (
  orientation: SliderOrientation,
  size: SliderSize,
  position: number,
  min: number,
  max: number,
  cssVars: any
): React.CSSProperties => {
  const config = getSizeConfig(size, orientation);
  const percentage = ((position - min) / (max - min)) * 100;
  
  const baseStyles: React.CSSProperties = {
    position: 'absolute',
    fontSize: '11px',
    color: cssVars.mutedForeground,
    userSelect: 'none',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
  };

  if (orientation === 'horizontal') {
    baseStyles.left = `calc(${percentage}%)`;
    baseStyles.top = `${config.thumbSize + 12}px`;
    baseStyles.transform = 'translateX(-50%)';
  } else {
    baseStyles.bottom = `calc(${percentage}%)`;
    baseStyles.left = `${config.thumbSize + 12}px`;
    baseStyles.transform = 'translateY(50%)';
  }

  return baseStyles;
};
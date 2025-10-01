import React from 'react';
import type { SliderColor, SliderSize, SliderOrientation, SliderVariant } from './Slider.types';

// Get color variables based on color prop
export const getColorVariables = (color: SliderColor, customColor: string | undefined, cssVars: any) => {
  if (color === 'custom' && customColor) {
    return {
      main: customColor,
      foreground: '#ffffff',
      background: customColor + '10',
      border: customColor,
      hover: customColor + '20',
      accent: customColor,
      shadow: `0 2px 8px ${customColor}20`,
      disabled: customColor + '40',
    };
  }

  const colorMap: Record<string, any> = {
    primary: {
      main: cssVars.primary,
      background: cssVars.primaryBackground,
      foreground: cssVars.primaryForeground,
      hover: cssVars.primaryHover,
      accent: cssVars.primaryAccent,
      shadow: cssVars.primaryShadow,
      disabled: cssVars.primaryDisabled,
      border: cssVars.primaryBorder,
    },
    secondary: {
      main: cssVars.secondary,
      background: cssVars.secondaryBackground,
      foreground: cssVars.secondaryForeground,
      hover: cssVars.secondaryHover,
      accent: cssVars.secondaryAccent,
      shadow: cssVars.secondaryShadow,
      disabled: cssVars.secondaryDisabled,
      border: cssVars.secondaryBorder,
    },
    success: {
      main: cssVars.success,
      background: cssVars.successBackground,
      foreground: cssVars.successForeground,
      hover: cssVars.successHover,
      accent: cssVars.successAccent,
      shadow: cssVars.successShadow,
      disabled: cssVars.successDisabled,
      border: cssVars.successBorder,
    },
    warning: {
      main: cssVars.warning,
      background: cssVars.warningBackground,
      foreground: cssVars.warningForeground,
      hover: cssVars.warningHover,
      accent: cssVars.warningAccent,
      shadow: cssVars.warningShadow,
      disabled: cssVars.warningDisabled,
      border: cssVars.warningBorder,
    },
    destructive: {
      main: cssVars.destructive,
      background: cssVars.destructiveBackground,
      foreground: cssVars.destructiveForeground,
      hover: cssVars.destructiveHover,
      accent: cssVars.destructiveAccent,
      shadow: cssVars.destructiveShadow,
      disabled: cssVars.destructiveDisabled,
      border: cssVars.destructiveBorder,
    },
    info: {
      main: cssVars.info,
      background: cssVars.infoBackground,
      foreground: cssVars.infoForeground,
      hover: cssVars.infoHover,
      accent: cssVars.infoAccent,
      shadow: cssVars.infoShadow,
      disabled: cssVars.infoDisabled,
      border: cssVars.infoBorder,
    },
  };

  return colorMap[color] || colorMap.primary;
};

// Get variant styles for the slider
export const getVariantStyles = (
  variant: SliderVariant,
  color: SliderColor,
  customColor: string | undefined,
  cssVars: any
) => {
  const colors = getColorVariables(color, customColor, cssVars);

  switch (variant) {
    case 'solid':
      return {
        fill: colors.accent || colors.main,
        thumb: colors.accent || colors.main,
        thumbBorder: 'transparent',
        thumbShadow: `0 2px 8px ${colors.shadow || colors.main + '40'}`,
      };
    case 'outline':
      return {
        fill: colors.background || colors.main + '20',
        thumb: cssVars.background || '#ffffff',
        thumbBorder: colors.main,
        thumbShadow: `0 2px 4px ${cssVars.shadow || 'rgba(0,0,0,0.1)'}`,
      };
    case 'ghost':
      return {
        fill: colors.background || colors.main + '30',
        thumb: colors.main + '40',
        thumbBorder: 'transparent',
        thumbShadow: 'none',
      };
    case 'glassmorphic':
      const reflectionColor = colors.hover || colors.main || '#ffffff';
      return {
        fill: colors.background || colors.main + '20',
        thumb: 'rgba(255, 255, 255, 0.2)',
        thumbBorder: colors.main,
        thumbShadow: `0 0 20px ${colors.main}80, 0 0 40px ${colors.main}40, 0 4px 16px ${colors.shadow || 'rgba(31, 38, 135, 0.37)'}`,
        thumbBackdrop: 'blur(10px)',
        thumbGlow: `0 0 20px ${colors.main}`,
      };
    default:
      return {
        fill: colors.accent || colors.main,
        thumb: colors.accent || colors.main,
        thumbBorder: 'transparent',
        thumbShadow: `0 2px 8px ${colors.shadow || colors.main + '40'}`,
      };
  }
};

// Get size configuration aligned with design standards
export const getSizeConfig = (size: SliderSize, orientation: SliderOrientation) => {
  const baseConfig = {
    xs: {
      trackThickness: 2,
      thumbSize: 12,
      thumbBorder: 2,
      fontSize: '14px',
      gap: '8px',
      padding: '12px',
    },
    sm: {
      trackThickness: 3,
      thumbSize: 16,
      thumbBorder: 2,
      fontSize: '14px',
      gap: '8px',
      padding: '12px',
    },
    md: {
      trackThickness: 4,
      thumbSize: 20,
      thumbBorder: 2,
      fontSize: '16px',
      gap: '12px',
      padding: '16px',
    },
    lg: {
      trackThickness: 5,
      thumbSize: 24,
      thumbBorder: 2,
      fontSize: '16px',
      gap: '12px',
      padding: '20px',
    },
    xl: {
      trackThickness: 6,
      thumbSize: 28,
      thumbBorder: 2,
      fontSize: '18px',
      gap: '16px',
      padding: '24px',
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
    opacity: disabled ? 0.5 : 1,
  };

  return baseStyles;
};

// Track container styles
export const getTrackContainerStyles = (
  orientation: SliderOrientation,
  size: SliderSize,
  animationsEnabled: boolean,
  length?: string | number
): React.CSSProperties => {
  const config = getSizeConfig(size, orientation);
  const trackLength = typeof length === 'number' ? `${length}px` : length || '300px';

  // Add extra space for the thumb to properly center
  const containerHeight = orientation === 'horizontal' ? config.thumbSize + 8 : trackLength;
  const containerWidth = orientation === 'vertical' ? config.thumbSize + 8 : trackLength;

  return {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: containerWidth,
    height: containerHeight,
    transition: animationsEnabled ? 'opacity 0.2s ease-in-out' : 'none',
    userSelect: 'none',
  };
};

// Track background styles
export const getTrackBackgroundStyles = (
  orientation: SliderOrientation,
  size: SliderSize,
  variant: SliderVariant,
  color: SliderColor,
  customColor: string | undefined,
  cssVars: any
): React.CSSProperties => {
  const config = getSizeConfig(size, orientation);
  const variantStyles = getVariantStyles(variant, color, customColor, cssVars);

  // For ghost, outline, and glassmorphic variants, use the same style as the fill for consistency
  const backgroundColor = (variant === 'ghost' || variant === 'outline' || variant === 'glassmorphic')
    ? variantStyles.fill
    : cssVars.border;

  return {
    position: 'absolute',
    background: backgroundColor,
    borderRadius: '9999px',
    width: orientation === 'horizontal' ? '100%' : `${config.trackThickness}px`,
    height: orientation === 'horizontal' ? `${config.trackThickness}px` : '100%',
    top: orientation === 'horizontal' ? '50%' : undefined,
    left: orientation === 'vertical' ? '50%' : undefined,
    transform: orientation === 'horizontal' ? 'translateY(-50%)' : 'translateX(-50%)',
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
  variant: SliderVariant,
  cssVars: any
): React.CSSProperties => {
  const config = getSizeConfig(size, orientation);
  const variantStyles = getVariantStyles(variant, color, customColor, cssVars);
  const percentage = ((value - min) / (max - min)) * 100;

  const fillColor = error ? cssVars.destructive : variantStyles.fill;
  const colors = getColorVariables(color, customColor, cssVars);

  const styles: React.CSSProperties = {
    position: 'absolute',
    background: fillColor,
    borderRadius: '9999px',
    width: orientation === 'horizontal' ? `${percentage}%` : `${config.trackThickness}px`,
    height: orientation === 'horizontal' ? `${config.trackThickness}px` : `${percentage}%`,
    [orientation === 'horizontal' ? 'left' : 'bottom']: 0,
    top: orientation === 'horizontal' ? '50%' : undefined,
    left: orientation === 'vertical' ? '50%' : 0,
    transform: orientation === 'horizontal' ? 'translateY(-50%)' : 'translateX(-50%)',
    transition: animationsEnabled
      ? 'width 0.2s ease-in-out, height 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
      : 'none',
  };

  // Add glow effect for glassmorphic variant
  if (variant === 'glassmorphic' && !error) {
    styles.boxShadow = `0 0 10px ${colors.main}60, 0 0 20px ${colors.main}30`;
  }

  return styles;
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
  variant: SliderVariant,
  cssVars: any
): React.CSSProperties => {
  const config = getSizeConfig(size, orientation);
  const variantStyles = getVariantStyles(variant, color, customColor, cssVars);
  const percentage = ((value - min) / (max - min)) * 100;

  const thumbColor = error ? cssVars.destructive : variantStyles.thumb;
  const thumbBorderColor = error ? cssVars.destructive : variantStyles.thumbBorder;
  const scaleValue = focused ? 1.1 : 1;

  const baseStyles: React.CSSProperties = {
    position: 'absolute',
    width: `${config.thumbSize}px`,
    height: `${config.thumbSize}px`,
    backgroundColor: thumbColor,
    border: `${config.thumbBorder}px solid ${thumbBorderColor}`,
    borderRadius: '50%',
    zIndex: 1,
    outline: focused ? `2px solid ${thumbColor}` : 'none',
    outlineOffset: '2px',
    transition: animationsEnabled
      ? 'left 0.2s ease-in-out, bottom 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out, background-color 0.2s ease-in-out'
      : 'none',
    boxShadow: focused ? `0 0 0 4px ${thumbColor}20` : variantStyles.thumbShadow,
  };

  // Add backdrop filter for glassmorphic variant
  if (variant === 'glassmorphic' && variantStyles.thumbBackdrop) {
    baseStyles.backdropFilter = variantStyles.thumbBackdrop;
  }

  // Position the thumb with scale on hover/focus
  if (orientation === 'horizontal') {
    baseStyles.left = `calc(${percentage}% - ${config.thumbSize / 2}px)`;
    baseStyles.top = '50%';
    baseStyles.transform = `translateY(-50%) scale(${scaleValue})`;
  } else {
    baseStyles.bottom = `calc(${percentage}% - ${config.thumbSize / 2}px)`;
    baseStyles.left = '50%';
    baseStyles.transform = `translateX(-50%) scale(${scaleValue})`;
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
    color: disabled
      ? cssVars.foregroundDisabled || cssVars.mutedForeground
      : error
      ? cssVars.destructive
      : cssVars.foreground,
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
    xs: '12px',
    sm: '12px',
    md: '14px',
    lg: '14px',
    xl: '16px',
  };

  return {
    fontSize: fontSizeMap[size],
    color: disabled
      ? cssVars.foregroundDisabled || cssVars.mutedForeground
      : error
      ? cssVars.destructive
      : cssVars.mutedForeground,
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
  color: SliderColor,
  customColor: string | undefined,
  cssVars: any
): React.CSSProperties => {
  const fontSizeMap = {
    xs: '12px',
    sm: '12px',
    md: '14px',
    lg: '14px',
    xl: '16px',
  };

  const colors = getColorVariables(color, customColor, cssVars);

  return {
    fontSize: fontSizeMap[size],
    fontWeight: 500,
    color: disabled ? cssVars.mutedForeground : colors.main,
    userSelect: 'none',
    whiteSpace: 'nowrap',
    minWidth: '20px',
    textAlign: 'center',
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
    backgroundColor: cssVars.card || cssVars.background,
    color: cssVars.cardForeground || cssVars.foreground,
    padding: '4px 8px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    zIndex: 3,
    pointerEvents: 'none',
    border: `1px solid ${cssVars.border}`,
    boxShadow: cssVars.shadow,
  };

  if (orientation === 'horizontal') {
    baseStyles.left = `${percentage}%`;
    baseStyles.bottom = `${config.thumbSize + 8}px`;
    baseStyles.transform = 'translateX(-50%)';
  } else {
    baseStyles.bottom = `${percentage}%`;
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
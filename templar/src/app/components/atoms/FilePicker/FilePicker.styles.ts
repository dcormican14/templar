import React from 'react';
import type { FilePickerColor, FilePickerVariant, FilePickerSize, FilePickerShape } from './FilePicker.types';

// Get color variables based on color prop
export const getColorVariables = (color: FilePickerColor, customColor: string | undefined, cssVars: any) => {
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

// Get shape styles based on shape prop
export const getShapeStyles = (shape: FilePickerShape): React.CSSProperties => {
  switch (shape) {
    case 'sharp':
      return { borderRadius: '0' };
    case 'round':
      return { borderRadius: '12px' };
    case 'pill':
      return { borderRadius: '24px' };
    default:
      return { borderRadius: '12px' };
  }
};

// Get size configuration
export const getSizeConfig = (size: FilePickerSize) => {
  const configs = {
    xs: {
      minHeight: '100px',
      padding: '12px',
      fontSize: '12px',
      iconSize: '20px',
    },
    sm: {
      minHeight: '120px',
      padding: '16px',
      fontSize: '14px',
      iconSize: '24px',
    },
    md: {
      minHeight: '160px',
      padding: '20px',
      fontSize: '16px',
      iconSize: '32px',
    },
    lg: {
      minHeight: '200px',
      padding: '24px',
      fontSize: '18px',
      iconSize: '40px',
    },
    xl: {
      minHeight: '240px',
      padding: '28px',
      fontSize: '20px',
      iconSize: '48px',
    },
  };

  return configs[size];
};

// Container styles
export const createFilePickerContainerStyles = (
  shape: FilePickerShape,
  width: string | number | undefined,
  height: string | number | undefined,
  animationsEnabled: boolean,
  // Legacy support
  rounded?: boolean
): React.CSSProperties => {
  // Handle legacy rounded prop
  const finalShape = rounded !== undefined ? (rounded ? 'pill' : 'round') : shape;
  
  return {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: width || 'auto',
    height: height || 'auto',
    minWidth: '300px',
    transition: animationsEnabled 
      ? 'border-color var(--duration-fast) var(--animation-smooth), background-color var(--duration-fast) var(--animation-smooth)'
      : 'none',
    ...getShapeStyles(finalShape),
  };
};

// Drop zone styles
export const getFilePickerDropZoneStyles = (
  color: FilePickerColor,
  customColor: string | undefined,
  variant: FilePickerVariant,
  size: FilePickerSize,
  disabled: boolean,
  error: boolean,
  isDragActive: boolean,
  animationsEnabled: boolean,
  cssVars: any
): React.CSSProperties => {
  const colors = getColorVariables(color, customColor, cssVars);
  const sizeConfig = getSizeConfig(size);

  // Base styles
  const baseStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: sizeConfig.minHeight,
    padding: sizeConfig.padding,
    border: '2px dashed',
    cursor: disabled ? 'not-allowed' : 'pointer',
    textAlign: 'center',
    transition: animationsEnabled 
      ? 'all var(--duration-fast) var(--animation-smooth)'
      : 'none',
    position: 'relative',
    fontSize: sizeConfig.fontSize,
  };

  // Variant styles with error state override
  const variantStyles = (() => {
    if (error) {
      return {
        borderColor: cssVars.destructive,
        backgroundColor: cssVars.destructiveBackground,
        color: cssVars.destructive,
      };
    }

    if (isDragActive) {
      return {
        borderColor: colors.main,
        backgroundColor: colors.background,
        color: colors.main,
        borderStyle: 'solid',
      };
    }

    switch (variant) {
      case 'solid':
        return {
          borderColor: colors.main,
          backgroundColor: colors.main,
          color: colors.foreground,
        };
      case 'ghost':
        return {
          borderColor: colors.background,
          backgroundColor: colors.background,
          color: colors.main,
        };
      case 'outline':
      default:
        return {
          borderColor: colors.border || cssVars.border,
          backgroundColor: cssVars.background,
          color: cssVars.foreground,
        };
    }
  })();

  // Disabled styles
  if (disabled) {
    baseStyles.opacity = 0.6;
    baseStyles.backgroundColor = cssVars.muted;
    baseStyles.color = cssVars.mutedForeground;
    baseStyles.borderColor = cssVars.border;
  }

  return {
    ...baseStyles,
    ...variantStyles,
  };
};

// Icon styles
export const getIconStyles = (
  size: FilePickerSize,
  cssVars: any
): React.CSSProperties => {
  const sizeConfig = getSizeConfig(size);
  
  return {
    fontSize: sizeConfig.iconSize,
    marginBottom: '12px',
    opacity: 0.7,
    color: 'currentColor',
  };
};

// Text styles
export const getUploadTextStyles = (
  size: FilePickerSize,
  cssVars: any
): React.CSSProperties => {
  const sizeConfig = getSizeConfig(size);
  
  return {
    fontSize: sizeConfig.fontSize,
    fontWeight: 500,
    marginBottom: '4px',
    color: 'currentColor',
  };
};

// Sub text styles
export const getSubTextStyles = (
  size: FilePickerSize,
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
    color: cssVars.mutedForeground,
    marginBottom: '8px',
  };
};

// Helper text styles
export const getHelperTextStyles = (
  size: FilePickerSize,
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
    color: disabled 
      ? cssVars.mutedForeground 
      : error 
        ? cssVars.destructive 
        : cssVars.mutedForeground,
    marginTop: '8px',
    textAlign: 'left',
  };
};

// File list styles
export const getFileListStyles = (): React.CSSProperties => ({
  marginTop: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

// File item styles
export const getFileItemStyles = (
  color: FilePickerColor,
  customColor: string | undefined,
  variant: FilePickerVariant,
  size: FilePickerSize,
  disabled: boolean,
  animationsEnabled: boolean,
  cssVars: any
): React.CSSProperties => {
  const colors = getColorVariables(color, customColor, cssVars);
  const sizeConfig = getSizeConfig(size);

  const baseStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 12px',
    borderRadius: '8px',
    fontSize: sizeConfig.fontSize,
    transition: animationsEnabled 
      ? 'background-color var(--duration-fast) var(--animation-smooth)'
      : 'none',
  };

  const variantStyles = (() => {
    switch (variant) {
      case 'solid':
        return {
          backgroundColor: colors.background,
          color: colors.main,
          border: `1px solid ${colors.background}`,
        };
      case 'ghost':
        return {
          backgroundColor: colors.background,
          color: colors.main,
          border: '1px solid transparent',
        };
      case 'outline':
      default:
        return {
          backgroundColor: cssVars.muted,
          color: cssVars.foreground,
          border: `1px solid ${cssVars.border}`,
        };
    }
  })();

  if (disabled) {
    baseStyles.opacity = 0.6;
  }

  return {
    ...baseStyles,
    ...variantStyles,
  };
};

// File info styles
export const getFileInfoStyles = (): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  minWidth: 0,
  flex: 1,
});

// File name styles
export const getFileNameStyles = (cssVars: any): React.CSSProperties => ({
  fontWeight: 500,
  color: 'currentColor',
  truncate: true,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

// File size styles
export const getFileSizeStyles = (cssVars: any): React.CSSProperties => ({
  fontSize: '0.875em',
  color: cssVars.mutedForeground,
  flexShrink: 0,
});

// Remove button styles
export const getRemoveButtonStyles = (
  size: FilePickerSize,
  disabled: boolean,
  animationsEnabled: boolean,
  cssVars: any
): React.CSSProperties => {
  const sizeMap = {
    xs: '16px',
    sm: '18px',
    md: '20px',
    lg: '22px',
    xl: '24px',
  };

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizeMap[size],
    height: sizeMap[size],
    borderRadius: '50%',
    border: 'none',
    backgroundColor: 'transparent',
    color: cssVars.mutedForeground,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: animationsEnabled 
      ? 'color var(--duration-fast) var(--animation-smooth), background-color var(--duration-fast) var(--animation-smooth)'
      : 'none',
    fontSize: '12px',
    padding: 0,
    '&:hover': !disabled ? {
      backgroundColor: cssVars.destructive,
      color: cssVars.destructiveForeground,
    } : {},
  };
};

// Hidden input styles
export const getHiddenInputStyles = (): React.CSSProperties => ({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
});

// Progress bar styles (for future upload progress feature)
export const getProgressBarStyles = (
  progress: number,
  color: FilePickerColor,
  customColor: string | undefined,
  cssVars: any
): React.CSSProperties => {
  const colors = getColorVariables(color, customColor, cssVars);
  
  return {
    width: '100%',
    height: '4px',
    backgroundColor: cssVars.muted,
    borderRadius: '2px',
    overflow: 'hidden',
    marginTop: '8px',
    position: 'relative',
    '::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100%',
      width: `${progress}%`,
      backgroundColor: colors.main,
      borderRadius: '2px',
      transition: 'width var(--duration-smooth) var(--animation-smooth)',
    },
  };
};
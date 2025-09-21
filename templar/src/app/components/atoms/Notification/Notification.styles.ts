import React from 'react';
import type { NotificationColor, NotificationVariant, NotificationSize, NotificationShape } from './Notification.types';

// Get color variables based on color prop
export const getColorVariables = (color: NotificationColor, customColor: string | undefined, cssVars: any) => {
  if (color === 'custom' && customColor) {
    return {
      main: customColor,
      foreground: '#ffffff',
      background: customColor + '10',
      border: customColor,
      hover: customColor + '20',
    };
  }

  const colorMap: Record<string, any> = {
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
export const getShapeStyles = (shape: NotificationShape): React.CSSProperties => {
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
export const getSizeConfig = (size: NotificationSize) => {
  const configs = {
    xs: {
      padding: '8px 12px',
      fontSize: '11px',
      lineHeight: 1.4,
      iconSize: '14px',
      titleSize: '12px',
      descriptionSize: '10px',
      buttonPadding: '2px 6px',
      buttonFontSize: '10px',
      dismissButtonSize: '18px',
      dismissIconSize: '12px',
    },
    sm: {
      padding: '12px 16px',
      fontSize: '12px',
      lineHeight: 1.4,
      iconSize: '16px',
      titleSize: '14px',
      descriptionSize: '11px',
      buttonPadding: '4px 8px',
      buttonFontSize: '11px',
      dismissButtonSize: '20px',
      dismissIconSize: '14px',
    },
    md: {
      padding: '16px 20px',
      fontSize: '14px',
      lineHeight: 1.5,
      iconSize: '20px',
      titleSize: '16px',
      descriptionSize: '13px',
      buttonPadding: '6px 12px',
      buttonFontSize: '12px',
      dismissButtonSize: '24px',
      dismissIconSize: '16px',
    },
    lg: {
      padding: '20px 24px',
      fontSize: '16px',
      lineHeight: 1.5,
      iconSize: '24px',
      titleSize: '18px',
      descriptionSize: '14px',
      buttonPadding: '8px 16px',
      buttonFontSize: '13px',
      dismissButtonSize: '28px',
      dismissIconSize: '18px',
    },
    xl: {
      padding: '24px 28px',
      fontSize: '18px',
      lineHeight: 1.6,
      iconSize: '28px',
      titleSize: '20px',
      descriptionSize: '16px',
      buttonPadding: '10px 20px',
      buttonFontSize: '14px',
      dismissButtonSize: '32px',
      dismissIconSize: '20px',
    },
  };

  return configs[size];
};

// Container styles
export const createNotificationContainerStyles = (
  size: NotificationSize,
  rounded: boolean,
  animationsEnabled: boolean
): React.CSSProperties => {
  // Handle legacy rounded prop
  const finalShape = rounded ? 'pill' : 'round';
  
  return {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: 'auto',
    height: 'auto',
    minWidth: '300px',
    maxWidth: '500px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transition: animationsEnabled 
      ? 'all var(--duration-fast) var(--animation-smooth)'
      : 'none',
    ...getShapeStyles(finalShape),
  };
};

// Main notification styles
export const getNotificationStyles = (
  color: NotificationColor,
  customColor: string | undefined,
  variant: NotificationVariant,
  size: NotificationSize,
  disabled: boolean,
  cssVars: any
): React.CSSProperties => {
  const colors = getColorVariables(color, customColor, cssVars);
  const sizeConfig = getSizeConfig(size);

  const baseStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    width: '100%',
    padding: sizeConfig.padding,
    borderTopWidth: '1px',
    borderRightWidth: '1px',
    borderBottomWidth: '1px',
    borderLeftWidth: '1px',
    borderStyle: 'solid',
    fontSize: sizeConfig.fontSize,
    lineHeight: sizeConfig.lineHeight,
    transition: 'background-color var(--duration-fast) var(--animation-smooth), border-color var(--duration-fast) var(--animation-smooth)',
    position: 'relative',
  };

  // Variant styles
  const variantStyles = (() => {
    switch (variant) {
      case 'solid':
        return {
          backgroundColor: colors.main,
          borderTopColor: colors.main,
          borderRightColor: colors.main,
          borderBottomColor: colors.main,
          borderLeftColor: colors.main,
          color: colors.foreground,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderTopColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: 'transparent',
          borderLeftColor: colors.main,
          borderLeftWidth: '4px',
          color: colors.main,
        };
      case 'glassmorphic':
        return {
          backgroundColor: colors.background,
          borderTopColor: colors.border || cssVars.border,
          borderRightColor: colors.border || cssVars.border,
          borderBottomColor: colors.border || cssVars.border,
          borderLeftColor: colors.main,
          borderLeftWidth: '4px',
          color: colors.main,
          backdropFilter: 'blur(12px)',
        };
      case 'outline':
      default:
        return {
          backgroundColor: cssVars.background,
          borderTopColor: colors.border || cssVars.border,
          borderRightColor: colors.border || cssVars.border,
          borderBottomColor: colors.border || cssVars.border,
          borderLeftColor: colors.main,
          borderLeftWidth: '4px',
          color: cssVars.foreground,
        };
    }
  })();

  // Disabled styles
  if (disabled) {
    baseStyles.opacity = 0.6;
    baseStyles.cursor = 'not-allowed';
  }

  return {
    ...baseStyles,
    ...variantStyles,
  };
};

// Icon styles
export const getIconStyles = (
  size: NotificationSize,
  color: NotificationColor,
  cssVars: any
): React.CSSProperties => {
  const sizeConfig = getSizeConfig(size);
  
  return {
    fontSize: sizeConfig.iconSize,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2px',
    color: 'currentColor',
  };
};

// Content area styles
export const getContentStyles = (): React.CSSProperties => ({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
});

// Title styles
export const getTitleStyles = (
  size: NotificationSize,
  cssVars: any
): React.CSSProperties => {
  const sizeConfig = getSizeConfig(size);
  
  return {
    fontSize: sizeConfig.titleSize,
    fontWeight: 600,
    margin: 0,
    color: 'inherit',
    lineHeight: 1.4,
  };
};

// Description styles
export const getDescriptionStyles = (
  size: NotificationSize,
  cssVars: any
): React.CSSProperties => {
  const sizeConfig = getSizeConfig(size);
  
  return {
    fontSize: sizeConfig.descriptionSize,
    margin: '4px 0 0 0',
    opacity: 0.8,
    color: 'inherit',
    lineHeight: 1.4,
  };
};

// Actions container styles
export const getActionsStyles = (size: NotificationSize): React.CSSProperties => {
  return {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: '12px',
  };
};

// Action button styles
export const getActionButtonStyles = (
  variant: NotificationVariant,
  size: NotificationSize,
  cssVars: any,
  animationsEnabled: boolean
): React.CSSProperties => {
  const sizeConfig = getSizeConfig(size);

  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: sizeConfig.buttonPadding,
    fontSize: sizeConfig.buttonFontSize,
    fontWeight: 500,
    border: '1px solid',
    borderRadius: '8px',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: animationsEnabled 
      ? 'all var(--duration-fast) var(--animation-smooth)' 
      : 'none',
  };

  const variantStyles = (() => {
    switch (variant) {
      case 'solid':
        return {
          backgroundColor: cssVars.background,
          borderColor: cssVars.border,
          color: cssVars.foreground,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          color: 'inherit',
        };
      case 'outline':
      default:
        return {
          backgroundColor: 'transparent',
          borderColor: 'currentColor',
          color: 'inherit',
        };
    }
  })();

  return {
    ...baseStyles,
    ...variantStyles,
  };
};

// Dismiss button styles
export const getDismissButtonStyles = (
  size: NotificationSize,
  cssVars: any,
  animationsEnabled: boolean
): React.CSSProperties => {
  const sizeConfig = getSizeConfig(size);

  return {
    position: 'absolute',
    top: '12px',
    right: '12px',
    width: sizeConfig.dismissButtonSize,
    height: sizeConfig.dismissButtonSize,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    opacity: 0.6,
    color: 'inherit',
    fontSize: sizeConfig.dismissIconSize,
    transition: animationsEnabled 
      ? 'opacity var(--duration-fast) var(--animation-smooth), background-color var(--duration-fast) var(--animation-smooth)' 
      : 'none',
  };
};

// Progress bar styles (for auto-dismiss)
export const getProgressBarStyles = (
  progress: number,
  color: NotificationColor,
  customColor: string | undefined,
  cssVars: any
): React.CSSProperties => {
  const colors = getColorVariables(color, customColor, cssVars);
  
  return {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '3px',
    width: `${progress}%`,
    backgroundColor: colors.main,
    borderRadius: '0 0 12px 0',
    transition: 'width var(--duration-smooth) linear',
  };
};

// Toast animation styles
export const getToastAnimationStyles = (
  position: string,
  isEntering: boolean,
  animationsEnabled: boolean
): React.CSSProperties => {
  if (!animationsEnabled) return {};

  const baseStyles: React.CSSProperties = {
    transition: 'all var(--duration-fast) var(--animation-smooth)',
  };

  if (position.includes('right')) {
    return {
      ...baseStyles,
      transform: isEntering ? 'translateX(0)' : 'translateX(100%)',
    };
  }

  if (position.includes('left')) {
    return {
      ...baseStyles,
      transform: isEntering ? 'translateX(0)' : 'translateX(-100%)',
    };
  }

  if (position.includes('top')) {
    return {
      ...baseStyles,
      transform: isEntering ? 'translateY(0)' : 'translateY(-100%)',
    };
  }

  if (position.includes('bottom')) {
    return {
      ...baseStyles,
      transform: isEntering ? 'translateY(0)' : 'translateY(100%)',
    };
  }

  return baseStyles;
};
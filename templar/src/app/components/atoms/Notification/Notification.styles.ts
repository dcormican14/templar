import type { NotificationType, NotificationSize } from './Notification.types';

export const createBaseStyles = (
  size: NotificationSize,
  rounded: boolean,
  animationsEnabled: boolean
): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    border: '1px solid',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transition: animationsEnabled ? 'all 0.2s ease-in-out' : 'none',
  };

  // Size-specific styles
  switch (size) {
    case 'sm':
      return {
        ...baseStyles,
        padding: '12px',
        borderRadius: rounded ? '12px' : '4px',
        fontSize: '14px',
        lineHeight: '1.4',
      };
    case 'lg':
      return {
        ...baseStyles,
        padding: '20px',
        borderRadius: rounded ? '16px' : '8px',
        fontSize: '16px',
        lineHeight: '1.5',
      };
    case 'md':
    default:
      return {
        ...baseStyles,
        padding: '16px',
        borderRadius: rounded ? '12px' : '8px',
        fontSize: '14px',
        lineHeight: '1.5',
      };
  }
};

export const getTypeStyles = (
  type: NotificationType,
  cssVars: any
): React.CSSProperties => {
  // Base card-like styling for all notifications
  const baseStyles = {
    backgroundColor: cssVars.card,
    color: cssVars.cardForeground,
  };

  switch (type) {
    case 'primary':
      return {
        ...baseStyles,
        borderColor: cssVars.primary,
        borderLeftStyle: 'solid',
      };
    case 'secondary':
      return {
        ...baseStyles,
        borderColor: cssVars.secondary,
        borderLeftStyle: 'solid',
      };
    case 'warning':
      return {
        ...baseStyles,
        borderColor: cssVars.warning,
        borderLeftStyle: 'solid',
      };
    case 'destructive':
      return {
        ...baseStyles,
        borderColor: cssVars.destructive || cssVars.error,
        borderLeftStyle: 'solid',
      };
    case 'success':
      return {
        ...baseStyles,
        borderColor: cssVars.success,
        borderLeftStyle: 'solid',
      };
    case 'inverted':
      return {
        ...baseStyles,
        backgroundColor: cssVars.foreground,
        color: cssVars.background,
        borderColor: cssVars.foreground,
        borderLeftStyle: 'solid',
      };
    case 'default':
    default:
      return {
        ...baseStyles,
        borderColor: cssVars.border,
      };
  }
};

export const getIconContainerStyles = (size: NotificationSize): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  switch (size) {
    case 'sm':
      return {
        ...baseStyles,
        marginTop: '2px',
      };
    case 'lg':
      return {
        ...baseStyles,
        marginTop: '2px',
      };
    case 'md':
    default:
      return {
        ...baseStyles,
        marginTop: '2px',
      };
  }
};

export const getContentStyles = (): React.CSSProperties => ({
  flex: 1,
  minWidth: 0, // Prevent flex item from overflowing
});

export const getTitleStyles = (
  size: NotificationSize,
  cssVars: any
): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    margin: 0,
    fontWeight: 600,
    color: 'inherit',
  };

  switch (size) {
    case 'sm':
      return {
        ...baseStyles,
        fontSize: '14px',
        lineHeight: '1.4',
      };
    case 'lg':
      return {
        ...baseStyles,
        fontSize: '18px',
        lineHeight: '1.4',
      };
    case 'md':
    default:
      return {
        ...baseStyles,
        fontSize: '16px',
        lineHeight: '1.4',
      };
  }
};

export const getDescriptionStyles = (
  size: NotificationSize,
  cssVars: any
): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    margin: '4px 0 0 0',
    opacity: 0.8,
    color: 'inherit',
  };

  switch (size) {
    case 'sm':
      return {
        ...baseStyles,
        fontSize: '12px',
        lineHeight: '1.4',
      };
    case 'lg':
      return {
        ...baseStyles,
        fontSize: '14px',
        lineHeight: '1.5',
      };
    case 'md':
    default:
      return {
        ...baseStyles,
        fontSize: '13px',
        lineHeight: '1.4',
      };
  }
};

export const getActionsStyles = (size: NotificationSize): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    flexWrap: 'wrap',
  };

  switch (size) {
    case 'sm':
      return {
        ...baseStyles,
        marginTop: '8px',
      };
    case 'lg':
      return {
        ...baseStyles,
        marginTop: '12px',
      };
    case 'md':
    default:
      return {
        ...baseStyles,
        marginTop: '10px',
      };
  }
};

export const getDismissButtonStyles = (
  size: NotificationSize,
  cssVars: any,
  animationsEnabled: boolean
): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    position: 'absolute',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    opacity: 0.6,
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    transition: animationsEnabled ? 'opacity 0.2s ease-in-out' : 'none',
  };

  switch (size) {
    case 'sm':
      return {
        ...baseStyles,
        top: '10px', // 8px padding + 2px to match icon alignment
        right: '8px',
        width: '20px',
        height: '20px',
        fontSize: '16px',
      };
    case 'lg':
      return {
        ...baseStyles,
        top: '14px', // 12px padding + 2px to match icon alignment
        right: '12px',
        width: '28px',
        height: '28px',
        fontSize: '20px',
      };
    case 'md':
    default:
      return {
        ...baseStyles,
        top: '14px', // 12px padding + 2px to match icon alignment
        right: '12px',
        width: '24px',
        height: '24px',
        fontSize: '18px',
      };
  }
};

export const getActionButtonStyles = (
  variant: 'default' | 'primary' | 'secondary',
  size: NotificationSize,
  cssVars: any,
  animationsEnabled: boolean
): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    border: '1px solid',
    cursor: 'pointer',
    fontWeight: 500,
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    transition: animationsEnabled ? 'all 0.2s ease-in-out' : 'none',
  };

  // Size-specific styles
  const sizeStyles = (() => {
    switch (size) {
      case 'sm':
        return {
          padding: '4px 8px',
          fontSize: '12px',
          lineHeight: '1.4',
        };
      case 'lg':
        return {
          padding: '8px 16px',
          fontSize: '14px',
          lineHeight: '1.5',
        };
      case 'md':
      default:
        return {
          padding: '6px 12px',
          fontSize: '13px',
          lineHeight: '1.4',
        };
    }
  })();

  // Variant-specific styles
  const variantStyles = (() => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: cssVars.primary,
          borderColor: cssVars.primary,
          color: cssVars.primaryForeground,
        };
      case 'secondary':
        return {
          backgroundColor: cssVars.secondary,
          borderColor: cssVars.secondary,
          color: cssVars.secondaryForeground,
        };
      case 'default':
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
    ...sizeStyles,
    ...variantStyles,
  };
};

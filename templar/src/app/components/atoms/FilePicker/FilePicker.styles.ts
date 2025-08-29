import React from 'react';
import type { FilePickerVariant, FilePickerSize } from './FilePicker.types';

export const createFilePickerContainerStyles = (
  size: FilePickerSize,
  rounded: boolean,
  animationsEnabled: boolean,
  width?: string | number,
  height?: string | number
): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: width || 'auto',
    minWidth: '300px',
    transition: animationsEnabled ? 'border-color 0.2s ease-in-out, background-color 0.2s ease-in-out' : 'none',
  };

  // Size-specific styles
  const sizeStyles = (() => {
    switch (size) {
      case 'sm':
        return {
          minHeight: height || '120px',
          borderRadius: rounded ? '12px' : '8px',
        };
      case 'lg':
        return {
          minHeight: height || '200px',
          borderRadius: rounded ? '20px' : '12px',
        };
      case 'md':
      default:
        return {
          minHeight: height || '160px',
          borderRadius: rounded ? '16px' : '10px',
        };
    }
  })();

  return { ...baseStyles, ...sizeStyles };
};

export const getFilePickerDropZoneStyles = (
  variant: FilePickerVariant,
  size: FilePickerSize,
  disabled: boolean,
  error: boolean,
  isDragActive: boolean,
  rounded: boolean,
  cssVars: any,
  animationsEnabled: boolean
): React.CSSProperties => {
  // Base drop zone styles
  const baseStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    outline: 'none',
    transition: animationsEnabled ? 'border-color 0.2s ease-in-out, background-color 0.2s ease-in-out, opacity 0.2s ease-in-out' : 'none',
    border: '2px dashed',
    position: 'relative',
    padding: '24px',
    textAlign: 'center',
  };

  // Size-specific styles
  const sizeStyles = (() => {
    switch (size) {
      case 'sm':
        return {
          padding: '16px',
          borderRadius: rounded ? '10px' : '6px',
          minHeight: '100px',
        };
      case 'lg':
        return {
          padding: '32px',
          borderRadius: rounded ? '16px' : '10px',
          minHeight: '180px',
        };
      case 'md':
      default:
        return {
          padding: '24px',
          borderRadius: rounded ? '12px' : '8px',
          minHeight: '140px',
        };
    }
  })();

  // Variant and state-specific styles
  const variantStyles = (() => {
    if (error) {
      return {
        borderColor: cssVars.error,
        backgroundColor: isDragActive ? cssVars.error + '10' : cssVars.background,
        color: cssVars.error,
      };
    }

    if (isDragActive) {
      switch (variant) {
        case 'primary':
          return {
            borderColor: cssVars.primary,
            backgroundColor: cssVars.primary + '10',
            color: cssVars.primary,
          };
        case 'secondary':
          return {
            borderColor: cssVars.secondary,
            backgroundColor: cssVars.secondary + '10',
            color: cssVars.secondary,
          };
        case 'outline':
          return {
            borderColor: cssVars.primary,
            backgroundColor: cssVars.primary + '05',
            color: cssVars.primary,
          };
        case 'ghost':
          return {
            borderColor: cssVars.primary,
            backgroundColor: cssVars.primary + '05',
            color: cssVars.primary,
          };
        default:
          return {
            borderColor: cssVars.primary,
            backgroundColor: cssVars.primary + '05',
            color: cssVars.primary,
          };
      }
    }

    // Default state
    switch (variant) {
      case 'primary':
        return {
          borderColor: cssVars.primary + '40',
          backgroundColor: cssVars.background,
          color: cssVars.foreground,
        };
      case 'secondary':
        return {
          borderColor: cssVars.secondary + '40',
          backgroundColor: cssVars.background,
          color: cssVars.foreground,
        };
      case 'outline':
        return {
          borderColor: cssVars.border,
          backgroundColor: cssVars.background,
          color: cssVars.foreground,
        };
      case 'ghost':
        return {
          borderColor: cssVars.mutedForeground + '40',
          backgroundColor: 'transparent',
          color: cssVars.foreground,
        };
      default:
        return {
          borderColor: cssVars.border,
          backgroundColor: cssVars.background,
          color: cssVars.foreground,
        };
    }
  })();

  // State-specific styles
  const stateStyles: React.CSSProperties = {};
  
  if (disabled) {
    stateStyles.opacity = 0.5;
    stateStyles.cursor = 'not-allowed';
  }

  return {
    ...baseStyles,
    ...sizeStyles,
    ...variantStyles,
    ...stateStyles,
  };
};

export const getFilePickerContentStyles = (
  size: FilePickerSize,
  cssVars: any
): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    pointerEvents: 'none',
  };

  const sizeStyles = (() => {
    switch (size) {
      case 'sm':
        return {
          gap: '6px',
        };
      case 'lg':
        return {
          gap: '12px',
        };
      case 'md':
      default:
        return {
          gap: '8px',
        };
    }
  })();

  return { ...baseStyles, ...sizeStyles };
};

export const getFilePickerTextStyles = (
  size: FilePickerSize,
  cssVars: any,
  variant: FilePickerVariant = 'outline'
): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    color: 'inherit',
    fontWeight: '500',
    margin: 0,
  };

  const sizeStyles = (() => {
    switch (size) {
      case 'sm':
        return {
          fontSize: '14px',
          lineHeight: '1.4',
        };
      case 'lg':
        return {
          fontSize: '18px',
          lineHeight: '1.5',
        };
      case 'md':
      default:
        return {
          fontSize: '16px',
          lineHeight: '1.5',
        };
    }
  })();

  return { ...baseStyles, ...sizeStyles };
};

export const getFilePickerSubTextStyles = (
  size: FilePickerSize,
  cssVars: any
): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    color: cssVars.mutedForeground,
    margin: 0,
  };

  const sizeStyles = (() => {
    switch (size) {
      case 'sm':
        return {
          fontSize: '12px',
          lineHeight: '1.4',
        };
      case 'lg':
        return {
          fontSize: '14px',
          lineHeight: '1.5',
        };
      case 'md':
      default:
        return {
          fontSize: '13px',
          lineHeight: '1.4',
        };
    }
  })();

  return { ...baseStyles, ...sizeStyles };
};

export const getFilePickerIconStyles = (
  size: FilePickerSize,
  cssVars: any
): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    color: 'inherit',
    opacity: 0.7,
  };

  const sizeStyles = (() => {
    switch (size) {
      case 'sm':
        return {
          fontSize: '24px',
        };
      case 'lg':
        return {
          fontSize: '36px',
        };
      case 'md':
      default:
        return {
          fontSize: '30px',
        };
    }
  })();

  return { ...baseStyles, ...sizeStyles };
};

export const getFileListStyles = (
  size: FilePickerSize,
  cssVars: any
): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    marginTop: '16px',
    padding: 0,
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  const sizeStyles = (() => {
    switch (size) {
      case 'sm':
        return {
          marginTop: '12px',
          gap: '6px',
        };
      case 'lg':
        return {
          marginTop: '20px',
          gap: '10px',
        };
      case 'md':
      default:
        return {
          marginTop: '16px',
          gap: '8px',
        };
    }
  })();

  return { ...baseStyles, ...sizeStyles };
};

export const getFileItemStyles = (
  size: FilePickerSize,
  variant: FilePickerVariant,
  cssVars: any,
  disabled?: boolean
): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 12px',
    borderRadius: '6px',
    backgroundColor: cssVars.muted,
    border: '1px solid ' + cssVars.border,
    opacity: disabled ? 0.5 : 1,
  };

  const sizeStyles = (() => {
    switch (size) {
      case 'sm':
        return {
          padding: '6px 10px',
          borderRadius: '4px',
          fontSize: '12px',
        };
      case 'lg':
        return {
          padding: '10px 14px',
          borderRadius: '8px',
          fontSize: '14px',
        };
      case 'md':
      default:
        return {
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '13px',
        };
    }
  })();

  return { ...baseStyles, ...sizeStyles };
};

export const getFileInfoStyles = (cssVars: any): React.CSSProperties => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minWidth: 0,
});

export const getFileNameStyles = (cssVars: any): React.CSSProperties => ({
  color: cssVars.foreground,
  fontWeight: '500',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  margin: 0,
});

export const getFileSizeStyles = (cssVars: any): React.CSSProperties => ({
  color: cssVars.mutedForeground,
  fontSize: '11px',
  margin: 0,
});

export const getRemoveButtonStyles = (
  size: FilePickerSize,
  cssVars: any,
  disabled?: boolean
): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    color: cssVars.mutedForeground,
    padding: '4px',
    borderRadius: '4px',
    transition: 'color 0.2s ease-in-out, background-color 0.2s ease-in-out',
    marginLeft: '8px',
    opacity: disabled ? 0.5 : 1,
  };

  const sizeStyles = (() => {
    switch (size) {
      case 'sm':
        return {
          padding: '2px',
          fontSize: '12px',
        };
      case 'lg':
        return {
          padding: '6px',
          fontSize: '16px',
        };
      case 'md':
      default:
        return {
          padding: '4px',
          fontSize: '14px',
        };
    }
  })();

  return { ...baseStyles, ...sizeStyles };
};

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

export const getFocusStyles = (
  cssVars: any, 
  variant: FilePickerVariant, 
  error?: boolean
): React.CSSProperties => {
  // Determine the focus outline color based on variant and error state
  let outlineColor = cssVars.primary; // default

  if (error) {
    outlineColor = cssVars.error;
  } else {
    switch (variant) {
      case 'primary':
        outlineColor = cssVars.primary;
        break;
      case 'secondary':
        outlineColor = cssVars.secondary;
        break;
      case 'outline':
      case 'ghost':
      default:
        outlineColor = cssVars.primary;
        break;
    }
  }

  return {
    outline: `2px solid ${outlineColor}`,
    outlineOffset: '2px',
  };
};

// Helper function for error styles
export const getErrorStyles = (size: FilePickerSize): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: size === 'lg' ? '8px' : size === 'sm' ? '4px' : '6px',
  fontSize: size === 'lg' ? '13px' : size === 'sm' ? '11px' : '12px',
  color: 'var(--error)',
  lineHeight: 1.4,
});

// Helper function for helper text styles
export const getHelperTextStyles = (size: FilePickerSize): React.CSSProperties => ({
  fontSize: size === 'lg' ? '12px' : size === 'sm' ? '10px' : '11px',
  color: 'var(--foreground-muted)',
  marginTop: size === 'lg' ? '8px' : size === 'sm' ? '4px' : '6px',
  lineHeight: 1.4,
  textAlign: 'center' as const,
});

// Simplified wrapper functions for easier use
export const dropZoneStyles = (props: {
  variant: FilePickerVariant;
  size: FilePickerSize;
  disabled: boolean;
  error: boolean;
  isDragActive: boolean;
}): React.CSSProperties => {
  return getFilePickerDropZoneStyles(
    props.variant,
    props.size,
    props.disabled,
    props.error,
    props.isDragActive,
    false, // rounded
    {
      primary: 'var(--primary)',
      secondary: 'var(--secondary)',
      error: 'var(--error)',
      background: 'var(--background)',
      foreground: 'var(--foreground)',
      foregroundMuted: 'var(--foreground-muted)',
      border: 'var(--border)',
    },
    true // animationsEnabled
  );
};

export const fileListStyles = (props: { size: FilePickerSize }): React.CSSProperties => {
  return getFileListStyles(props.size, {
    muted: 'var(--muted)',
    border: 'var(--border)',
  });
};

export const fileItemStyles = (props: { size: FilePickerSize }): React.CSSProperties => {
  return getFileItemStyles(props.size, 'outline', {
    muted: 'var(--muted)',
    border: 'var(--border)',
    mutedForeground: 'var(--foreground-muted)',
  });
};

export const removeButtonStyles = (props: { size: FilePickerSize }): React.CSSProperties => {
  return getRemoveButtonStyles(props.size, {
    mutedForeground: 'var(--foreground-muted)',
    error: 'var(--error)',
  });
};

export const hiddenInputStyles = getHiddenInputStyles();

export const errorStyles = (props: { size: FilePickerSize }): React.CSSProperties => {
  return getErrorStyles(props.size);
};

export const helperTextStyles = (props: { size: FilePickerSize }): React.CSSProperties => {
  return getHelperTextStyles(props.size);
};

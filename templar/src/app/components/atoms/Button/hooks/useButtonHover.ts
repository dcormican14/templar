import { useCallback } from 'react';
import type { ButtonVariant } from '../Button.types';

interface UseButtonHoverOptions {
  variant: ButtonVariant;
  isDisabled: boolean;
  animationsEnabled: boolean;
  cssVars: any;
  hasIsometricAnimation?: boolean;
  colors?: any;
}

export const useButtonHover = ({ variant, isDisabled, animationsEnabled, cssVars, hasIsometricAnimation, colors }: UseButtonHoverOptions) => {
  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isDisabled && animationsEnabled) {
      if (hasIsometricAnimation && variant !== 'ghost' && variant !== 'glassmorphic') {
        // Small bouncy press animation - button moves down, border reduces
        e.currentTarget.style.transform = 'translateY(3px)';
        e.currentTarget.style.borderBottomWidth = '3px';
        // Ensure the border color is maintained
        const borderColor = variant === 'outline' ? colors?.main : colors?.foreground;
        if (borderColor) {
          e.currentTarget.style.borderBottomColor = borderColor;
          // For solid variant, also update all other border colors to match
          if (variant === 'solid') {
            e.currentTarget.style.borderTopColor = borderColor;
            e.currentTarget.style.borderRightColor = borderColor;
            e.currentTarget.style.borderLeftColor = borderColor;
          }
        }
      } else if (variant === 'outline' || variant === 'ghost') {
        // Use the selected color's background or hover color
        // This handles both regular outline/ghost AND ghost with isometric mode (since ghost doesn't get isometric styles)
        const hoverBg = colors?.background || colors?.hover || cssVars.primaryBackground;
        e.currentTarget.style.backgroundColor = hoverBg;
      } else {
        e.currentTarget.style.opacity = '0.8';
      }
    }
  }, [variant, isDisabled, animationsEnabled, cssVars, hasIsometricAnimation, colors]);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isDisabled) {
      if (hasIsometricAnimation && variant !== 'ghost' && variant !== 'glassmorphic') {
        // Return to rest position
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderBottomWidth = '6px';
        // Ensure the border color is maintained
        const borderColor = variant === 'outline' ? colors?.main : colors?.foreground;
        if (borderColor) {
          e.currentTarget.style.borderBottomColor = borderColor;
          // For solid variant, also update all other border colors to match
          if (variant === 'solid') {
            e.currentTarget.style.borderTopColor = borderColor;
            e.currentTarget.style.borderRightColor = borderColor;
            e.currentTarget.style.borderLeftColor = borderColor;
          }
        }
      } else if (variant === 'outline' || variant === 'ghost') {
        // This handles both regular outline/ghost AND ghost with isometric mode
        e.currentTarget.style.backgroundColor = 'transparent';
      } else {
        e.currentTarget.style.opacity = isDisabled ? '0.6' : '1';
      }
    }
  }, [variant, isDisabled, hasIsometricAnimation, colors]);

  return { handleMouseEnter, handleMouseLeave };
};

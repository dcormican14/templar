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
        // Apply isometric hover animation - button moves toward shadow
        e.currentTarget.style.transform = 'translate(3px, 3px)';

        // Find the shadow element (previous sibling in the isometric container)
        const container = e.currentTarget.parentElement;
        if (container) {
          const shadowElement = container.querySelector('div:first-child') as HTMLElement;
          if (shadowElement) {
            shadowElement.style.transform = 'translate(-1px, -1px)';
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
        e.currentTarget.style.transform = 'translate(0, 0)';

        // Find the shadow element and reset its position
        const container = e.currentTarget.parentElement;
        if (container) {
          const shadowElement = container.querySelector('div:first-child') as HTMLElement;
          if (shadowElement) {
            shadowElement.style.transform = 'translate(0, 0)';
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

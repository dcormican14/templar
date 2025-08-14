import { useCallback } from 'react';
import type { ButtonVariant } from './Button.types';

interface UseButtonHoverOptions {
  variant: ButtonVariant;
  isDisabled: boolean;
  animationsEnabled: boolean;
  cssVars: any;
}

export const useButtonHover = ({ variant, isDisabled, animationsEnabled, cssVars }: UseButtonHoverOptions) => {
  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isDisabled && animationsEnabled) {
      if (variant === 'outline' || variant === 'ghost') {
        e.currentTarget.style.backgroundColor = cssVars.getColorWithOpacity('primary', 0.3);
      } else {
        e.currentTarget.style.opacity = '0.8';
      }
    }
  }, [variant, isDisabled, animationsEnabled, cssVars]);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isDisabled) {
      if (variant === 'outline' || variant === 'ghost') {
        e.currentTarget.style.backgroundColor = 'transparent';
      } else {
        e.currentTarget.style.opacity = isDisabled ? '0.6' : '1';
      }
    }
  }, [variant, isDisabled]);

  return { handleMouseEnter, handleMouseLeave };
};

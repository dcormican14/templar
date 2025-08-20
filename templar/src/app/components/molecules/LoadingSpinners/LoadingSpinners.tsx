'use client';

import React, { forwardRef, useMemo } from 'react';
import { useCSSVariables, useSettings } from '../../../providers';
import type { LoadingSpinnersProps } from './LoadingSpinners.types';
import { createBaseStyles } from './LoadingSpinners.styles';
import { 
  ParrotAnimation, 
  SpinnerAnimation, 
  DotsAnimation, 
  PulseAnimation 
} from './animations';

export const LoadingSpinners = forwardRef<HTMLDivElement, LoadingSpinnersProps>(
  ({ 
    variant = 'parrot',
    size = 'md',
    color = 'primary',
    duration = 2,
    show = true,
    fullWidth = false,
    centered = true,
    className,
    style,
    ...props 
  }, ref) => {
    // Hooks
    const cssVars = useCSSVariables();
    const { settings } = useSettings();

    // Computed values
    const animationsEnabled = settings.appearance.animations;

    // Styles
    const baseStyles = useMemo(() => createBaseStyles(
      Boolean(fullWidth),
      Boolean(centered),
      animationsEnabled
    ), [fullWidth, centered, animationsEnabled]);

    const combinedStyles: React.CSSProperties = {
      ...baseStyles,
      ...style,
    };

    // Animation props
    const animationProps = {
      size,
      color,
      duration,
      show: show && animationsEnabled,
      cssVars,
    };

    // Render animation based on variant
    const renderAnimation = () => {
      switch (variant) {
        case 'parrot':
          return <ParrotAnimation {...animationProps} />;
        case 'spinner':
          return <SpinnerAnimation {...animationProps} />;
        case 'dots':
          return <DotsAnimation {...animationProps} />;
        case 'pulse':
          return <PulseAnimation {...animationProps} />;
        default:
          return <ParrotAnimation {...animationProps} />;
      }
    };

    return (
      <div
        ref={ref}
        style={combinedStyles}
        className={className}
        {...props}
      >
        {renderAnimation()}
      </div>
    );
  }
);

LoadingSpinners.displayName = 'LoadingSpinners';

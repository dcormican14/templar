'use client';

import React, { forwardRef } from 'react';
import { useCSSVariables, useSettings } from '../../../providers';
import type { LoadingSpinnerProps } from './LoadingSpinner.types';
import { getSizeValue, getColorValue, createSpinnerStyles } from './LoadingSpinner.styles';

export const LoadingSpinner = forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ 
    size = 'md',
    color = 'primary',
    thickness = 2,
    className,
    style,
    ...props 
  }, ref) => {
    const cssVars = useCSSVariables();
    const { settings } = useSettings();

    const sizeValue = getSizeValue(size);
    const colorValue = getColorValue(color, cssVars);
    const animationsEnabled = settings.appearance.animations;

    const spinnerStyles = createSpinnerStyles(
      sizeValue,
      colorValue,
      thickness,
      animationsEnabled
    );

    const combinedStyles: React.CSSProperties = {
      ...spinnerStyles,
      ...style,
    };

    return (
      <>
        {animationsEnabled && (
          <style jsx global>{`
            @keyframes loading-spinner-spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
          `}</style>
        )}
        <div
          ref={ref}
          className={className}
          style={combinedStyles}
          role="status"
          aria-label="Loading"
          {...props}
        />
      </>
    );
  }
);

LoadingSpinner.displayName = 'LoadingSpinner';

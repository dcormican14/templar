'use client';

import React, { forwardRef, useMemo } from 'react';
import { useCSSVariables, useSettings } from '../../../providers';
import type { ProgressIndicatorProps } from './ProgressIndicator.types';
import { 
  getSizeValue, 
  getColorValue, 
  createSpinnerStyles,
  createProgressBarStyles,
  createProgressBarFillStyles,
  createProgressBarTextStyles
} from './ProgressIndicator.styles';

export const ProgressIndicator = forwardRef<HTMLDivElement, ProgressIndicatorProps>(
  ({ 
    type = 'spinner',
    size = 'md',
    color = 'primary',
    thickness = 2,
    value = 0,
    max = 100,
    showPercentage = false,
    label,
    width = 200,
    className,
    style,
    ...props 
  }, ref) => {
    const cssVars = useCSSVariables();
    const { settings } = useSettings();

    const sizeValue = getSizeValue(size);
    const colorValue = getColorValue(color, cssVars);
    const animationsEnabled = settings.appearance.animations;

    // Calculate percentage for progress bar
    const percentage = useMemo(() => {
      return Math.min(Math.max((value / max) * 100, 0), 100);
    }, [value, max]);

    // Memoized styles
    const spinnerStyles = useMemo(() => 
      createSpinnerStyles(sizeValue, colorValue, thickness, animationsEnabled),
      [sizeValue, colorValue, thickness, animationsEnabled]
    );

    const progressBarStyles = useMemo(() => 
      createProgressBarStyles(width, sizeValue, cssVars.mutedForeground || '#e5e5e5', cssVars.background || '#f5f5f5'),
      [width, sizeValue, cssVars]
    );

    const progressBarFillStyles = useMemo(() => 
      createProgressBarFillStyles(percentage, colorValue, animationsEnabled),
      [percentage, colorValue, animationsEnabled]
    );

    const progressBarTextStyles = useMemo(() => 
      createProgressBarTextStyles(sizeValue),
      [sizeValue]
    );

    const combinedStyles: React.CSSProperties = {
      ...(type === 'spinner' ? spinnerStyles : progressBarStyles),
      ...style,
    };

    const accessibilityLabel = label || (type === 'spinner' ? 'Loading' : `Progress: ${Math.round(percentage)}%`);

    if (type === 'spinner') {
      return (
        <>
          {animationsEnabled && (
            <style jsx global>{`
              @keyframes progress-indicator-spin {
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
            aria-label={accessibilityLabel}
            {...props}
          />
        </>
      );
    }

    // Progress bar
    return (
      <div
        ref={ref}
        className={className}
        style={combinedStyles}
        role="progressbar"
        aria-label={accessibilityLabel}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        {...props}
      >
        <div style={progressBarFillStyles} />
        {showPercentage && (
          <span style={progressBarTextStyles}>
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  }
);

ProgressIndicator.displayName = 'ProgressIndicator';

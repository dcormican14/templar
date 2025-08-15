'use client';

import React, { forwardRef, useMemo } from 'react';
import { useCSSVariables, useSettings } from '../../../providers';
import type { ProgressIndicatorProps } from './ProgressIndicator.types';
import { 
  getSizeValue, 
  getColorValue, 
  shouldShowPercentageForSpinner,
  createSpinnerStyles,
  createSpinnerTrackStyles,
  createSpinnerContainerStyles,
  createSpinnerTextStyles,
  createProgressBarStyles,
  createProgressBarTrackStyles,
  createProgressBarFillStyles,
  createProgressBarTextStyles,
  getProgressBarPreset,
  getSpinnerPreset
} from './ProgressIndicator.styles';

export const ProgressIndicator = forwardRef<HTMLDivElement, ProgressIndicatorProps>(
  ({ 
    type = 'spinner',
    size = 'md',
    color = 'primary',
    preset,
    trackSize = 'md',
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
    
    // Internal size and thickness calculation - presets only for spinners
    const spinnerSize = useMemo(() => {
      if (type === 'spinner') {
        // Spinners only use presets, default to 'md' if no preset specified
        const spinnerPreset = preset || 'md';
        return getSpinnerPreset(spinnerPreset).size;
      }
      return getSizeValue(size);
    }, [type, preset, size]);

    const thickness = useMemo(() => {
      if (type === 'spinner') {
        // Spinners only use presets, default to 'md' if no preset specified
        const spinnerPreset = preset || 'md';
        return getSpinnerPreset(spinnerPreset).thickness;
      }
      // Progress bars still use size-based thickness when no preset
      if (typeof size === 'number') return 2;
      switch (size) {
        case 'xs': return 2;
        case 'sm': return 2.5;
        case 'md': return 3;
        case 'lg': return 3.5;
        case 'xl': return 4;
        default: return 3;
      }
    }, [type, preset, size]);
    
    // Unified percentage display logic
    const shouldShowPercentage = type === 'spinner' 
      ? shouldShowPercentageForSpinner(preset, showPercentage)
      : showPercentage;

    // Calculate percentage for both types
    const percentage = useMemo(() => {
      return Math.min(Math.max((value / max) * 100, 0), 100);
    }, [value, max]);

    // Unified sizing logic
    let trackHeight: number;
    let fillHeight: number;
    
    if (type === 'progressBar' && preset) {
      const presetSizing = getProgressBarPreset(preset);
      trackHeight = presetSizing.trackHeight;
      fillHeight = presetSizing.fillHeight;
    } else {
      trackHeight = thickness;
      fillHeight = type === 'progressBar' ? Math.max(thickness * 2, 8) : thickness;
    }

    // Unified text styles
    const textStyles = useMemo(() => {
      if (type === 'spinner') {
        return createSpinnerTextStyles(spinnerSize, cssVars.secondary, size);
      } else {
        return createProgressBarTextStyles(sizeValue, trackHeight, fillHeight, cssVars.secondary, size);
      }
    }, [type, spinnerSize, sizeValue, cssVars.secondary, size, trackHeight, fillHeight]);

    // Unified styles based on type
    const containerStyles = useMemo(() => {
      if (type === 'spinner') {
        return createSpinnerContainerStyles(spinnerSize, shouldShowPercentage);
      } else {
        return createProgressBarStyles(width, trackHeight, cssVars.mutedForeground || '#e5e5e5', cssVars.background || '#f5f5f5', fillHeight);
      }
    }, [type, shouldShowPercentage, spinnerSize, width, trackHeight, cssVars, fillHeight]);

    // Spinner-specific styles (only when needed)
    const spinnerStyles = useMemo(() => 
      createSpinnerStyles(spinnerSize, colorValue, thickness, animationsEnabled),
      [spinnerSize, colorValue, thickness, animationsEnabled]
    );

    const spinnerTrackStyles = useMemo(() => 
      type === 'spinner' ? createSpinnerTrackStyles(spinnerSize, thickness, cssVars.mutedForeground || '#e5e5e5', trackSize) : undefined,
      [type, spinnerSize, thickness, cssVars, trackSize]
    );

    // Progress bar specific styles (only when needed)
    const progressBarTrackStyles = useMemo(() => 
      type === 'progressBar' ? createProgressBarTrackStyles(width, trackHeight, cssVars.mutedForeground || '#e5e5e5', fillHeight, shouldShowPercentage, trackSize) : undefined,
      [type, width, trackHeight, cssVars, fillHeight, shouldShowPercentage, trackSize]
    );

    const progressBarFillStyles = useMemo(() => 
      type === 'progressBar' ? createProgressBarFillStyles(percentage, colorValue, animationsEnabled, fillHeight, trackHeight) : undefined,
      [type, percentage, colorValue, animationsEnabled, fillHeight, trackHeight]
    );

    const combinedStyles: React.CSSProperties = {
      ...containerStyles,
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
          >
            {/* Background track */}
            <div style={spinnerTrackStyles} />
            {/* Spinning progress indicator */}
            <div style={spinnerStyles} />
            {shouldShowPercentage && (
              <span style={textStyles}>
                {Math.round(percentage)}%
              </span>
            )}
          </div>
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
        {/* Background track - shorter and centered */}
        <div style={progressBarTrackStyles} />
        {/* Progress fill - full width */}
        <div style={progressBarFillStyles} />
        {shouldShowPercentage && (
          <span style={textStyles}>
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  }
);

ProgressIndicator.displayName = 'ProgressIndicator';

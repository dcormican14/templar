'use client';

import React, { forwardRef, useMemo } from 'react';
import { useCSSVariables, useSettings } from '../../../providers';
import { extractContainerProps, UNIVERSAL_DEFAULTS } from '../types';
import type { ProgressIndicatorProps, ProgressIndicatorType } from './ProgressIndicator.types';
import { 
  getSizeConfig,
  getColorVariables,
  createProgressIndicatorContainerStyles,
  getBarProgressStyles,
  getProgressFillStyles,
  getSpinnerStyles,
  getCircularProgressStyles,
  getCircularProgressSVGStyles,
  getDotsProgressStyles,
  getDotStyles,
  getTextStyles,
  getProgressTextStyles,
  getCircularTextStyles
} from './ProgressIndicator.styles';

export const ProgressIndicator = forwardRef<HTMLDivElement, ProgressIndicatorProps>((allProps, ref) => {
  // Extract container props and component-specific props
  const [containerProps, componentProps] = extractContainerProps(allProps);
  
  // Destructure container props with defaults
  const {
    color = UNIVERSAL_DEFAULTS.color,
    customColor,
    variant = 'outline', // ProgressIndicator-specific default
    shape = UNIVERSAL_DEFAULTS.shape,
    size = UNIVERSAL_DEFAULTS.size,
    disabled = UNIVERSAL_DEFAULTS.disabled,
    width,
    height,
    className,
    style,
    id,
    'data-testid': dataTestId,
    animate = UNIVERSAL_DEFAULTS.animate,
    rounded, // Legacy support
  } = containerProps;
  
  // Destructure component-specific props
  const {
    type = 'spinner',
    value = 0,
    max = 100,
    showPercentage = false,
    showValue = false,
    label,
    duration = 300,
    striped = false,
    stripedAnimation = false,
    indeterminate = false,
    preset,
    trackSize = 'md',
    ...restProps
  } = componentProps;

  // Hooks
  const cssVars = useCSSVariables();
  const { settings } = useSettings();
  const animationsEnabled = (settings.appearance.animations ?? true) && animate;

  // Calculate percentage
  const percentage = useMemo(() => {
    return Math.min(Math.max((value / max) * 100, 0), 100);
  }, [value, max]);

  // Styles
  const containerStyles = useMemo(() => 
    createProgressIndicatorContainerStyles(shape, width, height, animationsEnabled),
    [shape, width, height, animationsEnabled]
  );

  const combinedStyles: React.CSSProperties = {
    ...containerStyles,
    ...style,
  };

  const accessibilityLabel = label || (type === 'spinner' ? 'Loading' : `Progress: ${Math.round(percentage)}%`);

  // Render based on type
  switch (type) {
    case 'bar':
    case 'progressBar': {
      const barStyles = getBarProgressStyles(color, customColor, variant, size, shape, width, disabled, animationsEnabled, cssVars);
      const fillStyles = getProgressFillStyles(color, customColor, variant, size, shape, percentage, striped, stripedAnimation, indeterminate, animationsEnabled, cssVars);
      const textStyles = getProgressTextStyles(size, cssVars);

      return (
        <>
          {/* Keyframe animations */}
          {animationsEnabled && (
            <style jsx global>{`
              @keyframes progress-indeterminate {
                0% { left: -30%; }
                100% { left: 100%; }
              }
              @keyframes progress-stripes {
                from { background-position: 1rem 0; }
                to { background-position: 0 0; }
              }
            `}</style>
          )}
          <div
            ref={ref}
            className={className}
            style={combinedStyles}
            role="progressbar"
            aria-label={accessibilityLabel}
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
            id={id}
            data-testid={dataTestId}
            {...restProps}
          >
            <div style={barStyles}>
              <div style={fillStyles} />
              {(showPercentage || showValue) && (
                <div style={textStyles}>
                  {showValue ? `${value}/${max}` : `${Math.round(percentage)}%`}
                </div>
              )}
            </div>
          </div>
        </>
      );
    }

    case 'circular': {
      const circularStyles = getCircularProgressStyles(color, customColor, size, percentage, disabled, animationsEnabled, cssVars);
      const svgStyles = getCircularProgressSVGStyles(color, customColor, size, cssVars);
      const textStyles = getCircularTextStyles(size, cssVars);
      const strokeDasharray = svgStyles.circumference;
      const strokeDashoffset = svgStyles.circumference - (percentage / 100) * svgStyles.circumference;

      return (
        <div
          ref={ref}
          className={className}
          style={{ ...combinedStyles, ...circularStyles }}
          role="progressbar"
          aria-label={accessibilityLabel}
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          id={id}
          data-testid={dataTestId}
          {...restProps}
        >
          <svg style={svgStyles.svg} viewBox="0 0 36 36">
            <path
              style={svgStyles.track}
              d="M18,2.0845 a 16,16 0 0,1 0,32 a 16,16 0 0,1 0,-32"
            />
            <path
              style={{
                ...svgStyles.progress,
                strokeDasharray,
                strokeDashoffset
              }}
              d="M18,2.0845 a 16,16 0 0,1 0,32 a 16,16 0 0,1 0,-32"
            />
          </svg>
          {(showPercentage || showValue) && (
            <div style={textStyles}>
              {showValue ? `${value}/${max}` : `${Math.round(percentage)}%`}
            </div>
          )}
        </div>
      );
    }

    case 'dots': {
      const dotsContainerStyles = getDotsProgressStyles(color, customColor, size, disabled, animationsEnabled, cssVars);
      const textStyles = getTextStyles(size, color, variant, cssVars);

      return (
        <>
          {animationsEnabled && (
            <style jsx global>{`
              @keyframes progress-dots {
                0%, 80%, 100% {
                  transform: scale(0);
                } 40% {
                  transform: scale(1);
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
            id={id}
            data-testid={dataTestId}
            {...restProps}
          >
            <div style={dotsContainerStyles}>
              {[...Array(3)].map((_, index) => (
                <div 
                  key={index}
                  style={getDotStyles(color, customColor, size, index, animationsEnabled, cssVars)}
                />
              ))}
            </div>
            {(showPercentage || showValue) && (
              <div style={{ ...textStyles, marginTop: '8px' }}>
                {showValue ? `${value}/${max}` : `${Math.round(percentage)}%`}
              </div>
            )}
          </div>
        </>
      );
    }

    case 'spinner':
    default: {
      const spinnerStyles = getSpinnerStyles(color, customColor, size, disabled, animationsEnabled, cssVars);
      const textStyles = getTextStyles(size, color, variant, cssVars);

      return (
        <>
          {animationsEnabled && (
            <style jsx global>{`
              @keyframes progress-spinner {
                0% {
                  transform: rotate(0deg);
                }
                100% {
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
            id={id}
            data-testid={dataTestId}
            {...restProps}
          >
            <div style={spinnerStyles} />
            {(showPercentage || showValue) && (
              <div style={{ ...textStyles, marginTop: '8px' }}>
                {showValue ? `${value}/${max}` : `${Math.round(percentage)}%`}
              </div>
            )}
          </div>
        </>
      );
    }
  }
});

ProgressIndicator.displayName = 'ProgressIndicator';
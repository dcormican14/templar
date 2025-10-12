'use client';

import React, { forwardRef, useMemo, useState, useEffect } from 'react';
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
  getCircularIndeterminateProgressSVGStyles,
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
    type = 'bar',
    value = 0,
    max = 100,
    showPercentage = false,
    showValue = false,
    label,
    duration = 300,
    striped = false,
    stripedAnimation = false,
    indeterminate = false,
    autoProgress = false,
    autoProgressDuration = 3000,
    preset,
    trackSize = 'md',
    ...restProps
  } = componentProps;

  // Hooks
  const cssVars = useCSSVariables();
  const { settings } = useSettings();
  const animationsEnabled = (settings.appearance.animations ?? true) && animate;

  // Auto-progress state
  const [currentValue, setCurrentValue] = useState(value);

  // Auto-progress effect
  useEffect(() => {
    if (!autoProgress || indeterminate) {
      setCurrentValue(value);
      return;
    }

    // Start from 0 and increment to max over the specified duration
    setCurrentValue(0);
    const incrementInterval = 50; // Update every 50ms for smooth animation
    const totalSteps = autoProgressDuration / incrementInterval;
    const incrementAmount = max / totalSteps;

    let currentStep = 0;
    let hasReset = false;

    const interval = setInterval(() => {
      currentStep++;
      const newValue = Math.min(incrementAmount * currentStep, max);
      setCurrentValue(newValue);

      if (newValue >= max && !hasReset) {
        hasReset = true;
        // Reset to 0 and start over for continuous loop after a brief pause
        setTimeout(() => {
          setCurrentValue(0);
          currentStep = 0;
          hasReset = false;
        }, 500); // Brief pause at 100% before resetting
      }
    }, incrementInterval);

    return () => clearInterval(interval);
  }, [autoProgress, autoProgressDuration, max, indeterminate, value]);

  // Calculate percentage using current value (auto-progress) or provided value
  const actualValue = autoProgress && !indeterminate ? currentValue : value;
  const percentage = useMemo(() => {
    return Math.min(Math.max((actualValue / max) * 100, 0), 100);
  }, [actualValue, max]);

  // Styles
  const containerStyles = useMemo(() => 
    createProgressIndicatorContainerStyles(shape, width, height, animationsEnabled),
    [shape, width, height, animationsEnabled]
  );

  const combinedStyles: React.CSSProperties = {
    ...containerStyles,
    ...style,
  };

  const accessibilityLabel = label || (indeterminate ? 'Loading' : `Progress: ${Math.round(percentage)}%`);

  // Render based on type
  switch (type) {
    case 'bar':
    case 'progressBar': {
      const barStyles = getBarProgressStyles(color, customColor, variant, size, shape, width, disabled, animationsEnabled, cssVars);
      const fillStyles = getProgressFillStyles(color, customColor, variant, size, shape, percentage, striped, stripedAnimation, indeterminate, animationsEnabled, cssVars);
      const textStyles = getProgressTextStyles(size, color, customColor, cssVars);

      return (
        <>
          {/* Keyframe animations */}
          {animationsEnabled && (
            <style jsx global>{`
              @keyframes progress-indeterminate {
                0% { left: 0%; }
                100% { left: 70%; }
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
      // When indeterminate, use circular indeterminate animation
      if (indeterminate) {
        const circularStyles = getCircularProgressStyles(color, customColor, variant, size, percentage, disabled, animationsEnabled, cssVars);
        const svgStyles = getCircularIndeterminateProgressSVGStyles(color, customColor, variant, size, animationsEnabled, cssVars);
        const textStyles = getCircularTextStyles(size, color, customColor, cssVars);

        return (
          <>
            {animationsEnabled && (
              <style jsx global>{`
                @keyframes progress-circular-indeterminate {
                  0% {
                    transform: rotate(-90deg);
                  }
                  100% {
                    transform: rotate(270deg);
                  }
                }
              `}</style>
            )}
            <div
              ref={ref}
              className={className}
              style={{ ...combinedStyles, ...circularStyles }}
              role="status"
              aria-label={accessibilityLabel}
              id={id}
              data-testid={dataTestId}
              {...restProps}
            >
              <svg style={svgStyles.svg} viewBox="0 0 36 36">
                {/* Add gradient definitions for glassmorphic variant */}
                {svgStyles.gradientDefs && (
                  <defs>
                    <linearGradient
                      id={svgStyles.gradientDefs.gradientId}
                      x1="0%" y1="0%" x2="100%" y2="0%"
                    >
                      {svgStyles.gradientDefs.stops.map((stop, index) => (
                        <stop
                          key={index}
                          offset={stop.offset}
                          stopColor={stop.stopColor}
                          stopOpacity={stop.stopOpacity}
                        />
                      ))}
                    </linearGradient>
                  </defs>
                )}
                <path
                  style={svgStyles.track}
                  d="M18,2.0845 a 16,16 0 0,1 0,32 a 16,16 0 0,1 0,-32"
                />
                <path
                  style={svgStyles.progress}
                  d="M18,2.0845 a 16,16 0 0,1 0,32 a 16,16 0 0,1 0,-32"
                />
              </svg>
              {(showPercentage || showValue) && (
                <div style={textStyles}>
                  {showValue ? `${actualValue}/${max}` : `${Math.round(percentage)}%`}
                </div>
              )}
            </div>
          </>
        );
      }

      // Normal circular progress bar
      const circularStyles = getCircularProgressStyles(color, customColor, variant, size, percentage, disabled, animationsEnabled, cssVars);
      const svgStyles = getCircularProgressSVGStyles(color, customColor, variant, size, cssVars);
      const textStyles = getCircularTextStyles(size, color, customColor, cssVars);
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
            {/* Add gradient definitions for glassmorphic variant */}
            {svgStyles.gradientDefs && (
              <defs>
                <linearGradient
                  id={svgStyles.gradientDefs.gradientId}
                  x1="0%" y1="0%" x2="100%" y2="0%"
                >
                  {svgStyles.gradientDefs.stops.map((stop, index) => (
                    <stop
                      key={index}
                      offset={stop.offset}
                      stopColor={stop.stopColor}
                      stopOpacity={stop.stopOpacity}
                    />
                  ))}
                </linearGradient>
              </defs>
            )}
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


    default: {
      // Fallback to bar type
      const barStyles = getBarProgressStyles(color, customColor, variant, size, shape, width, disabled, animationsEnabled, cssVars);
      const fillStyles = getProgressFillStyles(color, customColor, variant, size, shape, percentage, striped, stripedAnimation, indeterminate, animationsEnabled, cssVars);
      const textStyles = getProgressTextStyles(size, color, customColor, cssVars);

      return (
        <>
          {/* Keyframe animations */}
          {animationsEnabled && (
            <style jsx global>{`
              @keyframes progress-indeterminate {
                0% { left: 0%; }
                100% { left: 70%; }
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
            aria-valuenow={actualValue}
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
                  {showValue ? `${actualValue}/${max}` : `${Math.round(percentage)}%`}
                </div>
              )}
            </div>
          </div>
        </>
      );
    }
  }
});

ProgressIndicator.displayName = 'ProgressIndicator';
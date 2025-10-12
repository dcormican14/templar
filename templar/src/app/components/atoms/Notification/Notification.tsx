'use client';

import React, { forwardRef, useCallback, useEffect, useMemo } from 'react';
import { useCSSVariables, useSettings } from '../../../providers';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Divider } from '../Divider';
import { ProgressIndicator } from '../ProgressIndicator';
import { extractContainerProps, UNIVERSAL_DEFAULTS } from '../types';
import type { NotificationProps } from './Notification.types';
import {
  createNotificationContainerStyles,
  getNotificationStyles,
  getIconStyles,
  getContentStyles,
  getTitleStyles,
  getDescriptionStyles,
  getActionsStyles,
  getDismissButtonStyles,
  getActionButtonStyles,
  getSizeConfig,
  getShapeStyles,
} from './Notification.styles';
import {
  createTypeIcon,
  generateNotificationId,
  handleKeyDown,
  setupAutoDismiss,
  getAriaLabel,
} from './Notification.utils';

export const Notification = forwardRef<HTMLDivElement, NotificationProps>((allProps, ref) => {
  // Extract container props and component-specific props
  const [containerProps, componentProps] = extractContainerProps(allProps);
  
  // Destructure container props with defaults
  const {
    color = UNIVERSAL_DEFAULTS.color,
    customColor,
    variant = UNIVERSAL_DEFAULTS.variant,
    shape = UNIVERSAL_DEFAULTS.shape,
    size = UNIVERSAL_DEFAULTS.size,
    disabled = UNIVERSAL_DEFAULTS.disabled,
    loading = UNIVERSAL_DEFAULTS.loading,
    loadingKey,
    width,
    height,
    className,
    style,
    id,
    'data-testid': dataTestId,
    animate = UNIVERSAL_DEFAULTS.animate,
    rounded, // Legacy support
    children,
    onClick,
    onAsyncClick,
  } = containerProps;
  
  // Destructure component-specific props
  const {
    title,
    description,
    dismissible = true,
    showIcon = true,
    customIcon,
    actions,
    onDismiss,
    duration,
    showProgress,
    toastPosition,
    type, // Legacy prop
    ...restProps
  } = componentProps;
  
  // Map legacy type prop to color if color is not explicitly set
  const effectiveColor = type && allProps.color === undefined ? 
    (type === 'default' ? 'primary' : 
     type === 'inverted' ? 'secondary' : 
     type) : color;

  // Hooks
  const cssVars = useCSSVariables();
  const { settings } = useSettings();
  const animationsEnabled = (settings.appearance.animations ?? true) && animate;

    // Generate ID if not provided
    const notificationId = useMemo(() => id || generateNotificationId(), [id]);

    // Auto-dismiss setup
    useEffect(() => {
      const cleanup = setupAutoDismiss(duration ?? null, onDismiss);
      return cleanup || undefined;
    }, [duration, onDismiss]);

    // Event handlers
    const handleDismiss = useCallback(() => {
      onDismiss?.();
    }, [onDismiss]);

    const handleKeyDownInternal = useCallback((event: React.KeyboardEvent) => {
      handleKeyDown(event, dismissible ? handleDismiss : undefined);
    }, [dismissible, handleDismiss]);

    // Styles
    const baseStyles = useMemo(() => 
      createNotificationContainerStyles(size, shape === 'pill' || Boolean(rounded), animationsEnabled),
      [size, shape, rounded, animationsEnabled]
    );

    const notificationStyles = useMemo(() => 
      getNotificationStyles(effectiveColor, customColor, variant, size, disabled, cssVars),
      [effectiveColor, customColor, variant, size, disabled, cssVars]
    );

    const iconContainerStyles = useMemo(() => 
      getIconStyles(size, effectiveColor, cssVars),
      [size, effectiveColor, cssVars]
    );

    const contentStyles = useMemo(() => 
      getContentStyles(),
      []
    );

    const titleStyles = useMemo(() => 
      getTitleStyles(size, cssVars),
      [size, cssVars]
    );

    const descriptionStyles = useMemo(() => 
      getDescriptionStyles(size, cssVars),
      [size, cssVars]
    );

    const actionsStyles = useMemo(() => 
      getActionsStyles(size),
      [size]
    );

    const dismissButtonStyles = useMemo(() => 
      getDismissButtonStyles(size, cssVars, animationsEnabled),
      [size, cssVars, animationsEnabled]
    );

    const combinedStyles: React.CSSProperties = {
      ...baseStyles,
      ...notificationStyles,
      width,
      height,
      // Combine loading and disabled states properly
      opacity: disabled ? 0.6 : loading ? 0.7 : undefined,
      cursor: disabled ? 'not-allowed' : loading ? 'wait' : undefined,
      ...style,
    };

    // Accessibility
    const ariaLabel = getAriaLabel(effectiveColor, title, description);

    return (
      <div
        ref={ref}
        id={id || notificationId}
        role="alert"
        aria-label={ariaLabel}
        className={className}
        style={combinedStyles}
        onKeyDown={handleKeyDownInternal}
        tabIndex={dismissible ? 0 : undefined}
        data-testid={dataTestId}
        onClick={onClick}
        {...restProps}
      >
        {/* Top Row: Icon + Title (left) | Close Button (right) */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          width: '100%'
        }}>
          {/* Left side: Icon + Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
            {showIcon && (
              <div style={iconContainerStyles}>
                {loading ? (
                  <ProgressIndicator
                    type="circular"
                    size={size === 'xs' ? 'xs' : size === 'sm' ? 'sm' : size === 'lg' ? 'md' : 'sm'}
                    color={variant === 'outline' ? 'primary' : effectiveColor}
                    variant={variant === 'solid' ? 'solid' : 'outline'}
                    disabled={disabled}
                  />
                ) : (
                  createTypeIcon(effectiveColor, size, cssVars, customIcon, variant)
                )}
              </div>
            )}
            <h4 style={titleStyles}>{title}</h4>
          </div>

          {/* Right side: Close Button */}
          {dismissible && onDismiss && !loading && !disabled && (
            <button
              onClick={handleDismiss}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                opacity: 0.6,
                color: 'inherit',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                transition: animationsEnabled ? 'opacity 0.2s ease-in-out' : 'none',
                width: size === 'sm' ? '20px' : size === 'lg' ? '28px' : '24px',
                height: size === 'sm' ? '20px' : size === 'lg' ? '28px' : '24px',
                fontSize: size === 'sm' ? '16px' : size === 'lg' ? '20px' : '18px',
                marginLeft: '12px',
                flexShrink: 0
              }}
              aria-label="Dismiss notification"
              onMouseEnter={(e) => {
                if (animationsEnabled) {
                  e.currentTarget.style.opacity = '1';
                }
              }}
              onMouseLeave={(e) => {
                if (animationsEnabled) {
                  e.currentTarget.style.opacity = '0.6';
                }
              }}
            >
              <Icon name="Xmark" size={size === 'lg' ? 'md' : 'sm'} />
            </button>
          )}
        </div>

        {/* Divider */}
        {(description || children || (actions && actions.length > 0)) && (
          <div style={{ margin: '4px 0' }}>
            {/* the color of the variation should match the color of the border 
            type DividerVariant = 'primary' | 'secondary' | 'warning' | 'destructive' | 'success' | 'outline'
            */}
            <Divider color={
                effectiveColor === 'primary' ? 'primary' :
                effectiveColor === 'secondary' ? 'secondary' :
                effectiveColor === 'warning' ? 'warning' :
                effectiveColor === 'destructive' ? 'destructive' :
                effectiveColor === 'success' ? 'success' :
                effectiveColor === 'info' ? 'info' :
                'primary'
              }
              rounded={shape === 'pill' || Boolean(rounded)}
              size="sm"
            />
          </div>
        )}

        {/* Bottom Row: Description (left) | Actions (right) */}
        {(description || children || (actions && actions.length > 0)) && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            width: '100%',
            gap: '12px'
          }}>
            {/* Left side: Description + Children */}
            <div style={{ flex: 1 }}>
              {description && (
                <p style={{
                  ...descriptionStyles,
                  margin: '0'
                }}>
                  {description}
                </p>
              )}
              {children && (
                <div style={{ marginTop: description ? '4px' : '0' }}>
                  {children}
                </div>
              )}
            </div>

            {/* Right side: Actions */}
            {actions && actions.length > 0 && !loading && !disabled && (
              <div style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                flexShrink: 0
              }}>
                {actions.map((action, index) => {
                  const actionVariant = action.variant || 'outline';
                  const baseStyles = getActionButtonStyles(actionVariant, size, cssVars, animationsEnabled, variant, effectiveColor);

                  // Get notification-specific colors for hover effects
                  const getHoverColors = (color: string) => {
                    const colorMap: Record<string, any> = {
                      primary: { hover: cssVars.primaryHover },
                      secondary: { hover: cssVars.secondaryHover },
                      success: { hover: cssVars.successHover },
                      warning: { hover: cssVars.warningHover },
                      destructive: { hover: cssVars.destructiveHover },
                      info: { hover: cssVars.infoHover },
                    };
                    return colorMap[color]?.hover || cssVars.primaryHover;
                  };

                  const hoverColor = getHoverColors(effectiveColor);

                  return (
                    <button
                      key={index}
                      onClick={action.onClick}
                      style={baseStyles}
                      onMouseEnter={(e) => {
                        if (animationsEnabled) {
                          const isInSolidNotification = variant === 'solid';

                          if (actionVariant === 'solid') {
                            if (isInSolidNotification) {
                              // Solid button in solid notification: slightly darken the text color background
                              e.currentTarget.style.backgroundColor = cssVars.foregroundAccent;
                              e.currentTarget.style.borderTopColor = cssVars.foregroundAccent;
                              e.currentTarget.style.borderRightColor = cssVars.foregroundAccent;
                              e.currentTarget.style.borderBottomColor = cssVars.foregroundAccent;
                              e.currentTarget.style.borderLeftColor = cssVars.foregroundAccent;
                              e.currentTarget.style.color = hoverColor;
                            } else {
                              // Normal solid button hover
                              e.currentTarget.style.backgroundColor = hoverColor;
                              e.currentTarget.style.borderTopColor = hoverColor;
                              e.currentTarget.style.borderRightColor = hoverColor;
                              e.currentTarget.style.borderBottomColor = hoverColor;
                              e.currentTarget.style.borderLeftColor = hoverColor;
                            }
                          } else if (actionVariant === 'outline') {
                            if (isInSolidNotification) {
                              // Outline button in solid notification: add subtle text color background
                              e.currentTarget.style.backgroundColor = cssVars.foregroundAccent;
                            } else {
                              // Normal outline button hover - use notification color scheme
                              const notificationBg = (cssVars as any)[`${effectiveColor}Background`] || cssVars.primaryBackground;
                              e.currentTarget.style.backgroundColor = notificationBg;
                              e.currentTarget.style.borderTopColor = hoverColor;
                              e.currentTarget.style.borderRightColor = hoverColor;
                              e.currentTarget.style.borderBottomColor = hoverColor;
                              e.currentTarget.style.borderLeftColor = hoverColor;
                              e.currentTarget.style.color = hoverColor;
                            }
                          } else if (actionVariant === 'ghost') {
                            const ghostBg = (cssVars as any)[`${effectiveColor}Background`] || cssVars.primaryBackground;
                            e.currentTarget.style.backgroundColor = ghostBg;
                            e.currentTarget.style.color = hoverColor;
                          }
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (animationsEnabled) {
                          // Reset to base styles
                          Object.assign(e.currentTarget.style, baseStyles);
                        }
                      }}
                    >
                      {action.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

Notification.displayName = 'Notification';
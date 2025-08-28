'use client';

import React, { forwardRef, useCallback, useEffect, useMemo } from 'react';
import { useCSSVariables, useSettings } from '../../../providers';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Divider } from '../Divider';
import type { NotificationProps } from './Notification.types';
import {
  createBaseStyles,
  getTypeStyles,
  getIconContainerStyles,
  getContentStyles,
  getTitleStyles,
  getDescriptionStyles,
  getActionsStyles,
  getDismissButtonStyles,
  getActionButtonStyles,
} from './Notification.styles';
import {
  createTypeIcon,
  generateNotificationId,
  handleKeyDown,
  setupAutoDismiss,
  getAriaLabel,
} from './Notification.utils';

export const Notification = forwardRef<HTMLDivElement, NotificationProps>(
  ({
    id,
    type = 'default',
    size = 'md',
    title,
    description,
    dismissible = true,
    showIcon = true,
    customIcon,
    actions,
    onDismiss,
    duration,
    rounded = false,
    className,
    style,
    children,
    ...props
  }, ref) => {
    // Hooks
    const cssVars = useCSSVariables();
    const { settings } = useSettings();
    const animationsEnabled = settings.appearance.animations;

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
      createBaseStyles(size, rounded, animationsEnabled),
      [size, rounded, animationsEnabled]
    );

    const typeStyles = useMemo(() => 
      getTypeStyles(type, cssVars),
      [type, cssVars]
    );

    const iconContainerStyles = useMemo(() => 
      getIconContainerStyles(size),
      [size]
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
      ...typeStyles,
      ...style,
    };

    // Accessibility
    const ariaLabel = getAriaLabel(type, title, description);

    return (
      <div
        ref={ref}
        id={notificationId}
        role="alert"
        aria-label={ariaLabel}
        className={className}
        style={combinedStyles}
        onKeyDown={handleKeyDownInternal}
        tabIndex={dismissible ? 0 : undefined}
        {...props}
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
                {createTypeIcon(type, size, cssVars, customIcon)}
              </div>
            )}
            <h4 style={titleStyles}>{title}</h4>
          </div>

          {/* Right side: Close Button */}
          {dismissible && onDismiss && (
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
            <Divider variant={
                type === 'primary' ? 'primary' :
                type === 'secondary' ? 'secondary' :
                type === 'warning' ? 'warning' :
                type === 'destructive' ? 'destructive' :
                type === 'success' ? 'success' :
                type === 'inverted' ? 'inverted' :
                type === 'default' ? 'inverted' :
                'default'
              }
              rounded
              size='sm'
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
            {actions && actions.length > 0 && (
              <div style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                flexShrink: 0
              }}>
                {actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.onClick}
                    style={getActionButtonStyles(
                      action.variant || 'default',
                      size,
                      cssVars,
                      animationsEnabled
                    )}
                    onMouseEnter={(e) => {
                      if (animationsEnabled) {
                        e.currentTarget.style.opacity = '0.8';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (animationsEnabled) {
                        e.currentTarget.style.opacity = '1';
                      }
                    }}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

Notification.displayName = 'Notification';
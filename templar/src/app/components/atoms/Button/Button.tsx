'use client';

import React, { forwardRef } from 'react';
import { 
  useCSSVariables, 
  useLoading, 
  useToast, 
  useSettings 
} from '../../../providers';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  loadingKey?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  onAsyncClick?: () => Promise<void>;
}

export type { ButtonProps };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary',
    size = 'md',
    loading = false,
    loadingKey,
    icon,
    iconPosition = 'left',
    fullWidth = false,
    onAsyncClick,
    onClick,
    children,
    disabled,
    className,
    style,
    ...props 
  }, ref) => {
    const cssVars = useCSSVariables();
    const { isLoading, startLoading, stopLoading } = useLoading();
    const { success, error } = useToast();
    const { settings } = useSettings();

    // Check if button is in loading state
    const isButtonLoading = loading || (loadingKey && isLoading(loadingKey));
    const isDisabled = disabled || isButtonLoading;

    // Handle async operations
    const handleAsyncClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onAsyncClick) {
        const key = loadingKey || 'button-action';
        try {
          startLoading(key);
          await onAsyncClick();
          success('Action completed successfully');
        } catch (err) {
          error('Action failed', err instanceof Error ? err.message : 'Unknown error');
        } finally {
          stopLoading(key);
        }
      } else if (onClick) {
        onClick(e);
      }
    };

    // Get variant styles
    const getVariantStyles = () => {
      switch (variant) {
        case 'primary':
          return {
            ...cssVars.surface.primary,
            borderWidth: '0',
            borderStyle: 'solid',
            borderColor: 'transparent',
          };
        case 'secondary':
          return {
            ...cssVars.surface.secondary,
            borderWidth: '0',
            borderStyle: 'solid',
            borderColor: 'transparent',
          };
        case 'destructive':
          return {
            ...cssVars.surface.error,
            borderWidth: '0',
            borderStyle: 'solid',
            borderColor: 'transparent',
          };
        case 'outline':
          return {
            backgroundColor: 'transparent',
            color: cssVars.primary,
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: cssVars.border,
          };
        case 'ghost':
          return {
            backgroundColor: 'transparent',
            color: cssVars.foreground,
            borderWidth: '0',
            borderStyle: 'solid',
            borderColor: 'transparent',
          };
        default:
          return {
            ...cssVars.surface.primary,
            borderWidth: '0',
            borderStyle: 'solid',
            borderColor: 'transparent',
          };
      }
    };

    // Get size styles
    const getSizeStyles = () => {
      const sizes = {
        xs: { padding: '0.25rem 0.5rem', fontSize: '0.75rem' },
        sm: { padding: '0.375rem 0.75rem', fontSize: '0.875rem' },
        md: { padding: '0.5rem 1rem', fontSize: '1rem' },
        lg: { padding: '0.625rem 1.25rem', fontSize: '1.125rem' },
        xl: { padding: '0.75rem 1.5rem', fontSize: '1.25rem' },
      };
      return sizes[size];
    };

    const baseStyles: React.CSSProperties = {
      ...getVariantStyles(),
      ...getSizeStyles(),
      width: fullWidth ? '100%' : 'auto',
      opacity: isDisabled ? 0.6 : 1,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      transition: settings.appearance.animations ? 'all 0.2s ease' : 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      borderRadius: '0.375rem',
      fontWeight: '500',
      outline: 'none',
      borderWidth: '0',
      borderStyle: 'solid',
      borderColor: 'transparent',
      position: 'relative',
      fontFamily: 'inherit',
      ...style,
    };

    const LoadingSpinner = () => (
      <div
        style={{
          width: '1rem',
          height: '1rem',
          border: '2px solid transparent',
          borderTop: `2px solid ${variant === 'outline' || variant === 'ghost' ? cssVars.primary : cssVars.primaryForeground}`,
          borderRadius: '50%',
          animation: settings.appearance.animations ? 'spin 1s linear infinite' : 'none',
        }}
      />
    );

    return (
      <>
        {/* Add spin animation to global styles if animations are enabled */}
        {settings.appearance.animations && (
          <style jsx global>{`
            @keyframes spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
          `}</style>
        )}
        
        <button
          ref={ref}
          disabled={Boolean(isDisabled)}
          onClick={handleAsyncClick}
          style={baseStyles}
          className={className}
          {...props}
        >
          {isButtonLoading && <LoadingSpinner />}
          {!isButtonLoading && icon && iconPosition === 'left' && icon}
          {children}
          {!isButtonLoading && icon && iconPosition === 'right' && icon}
        </button>
      </>
    );
  }
);

Button.displayName = 'Button';

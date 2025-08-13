# Templar Atomic Components - Implementation Guide

This guide provides detailed implementation patterns for integrating atomic components with the RoundTable provider ecosystem.

## Core Integration Patterns

### 1. Base Component Pattern

Every atomic component should follow this base pattern:

```tsx
'use client';

import React, { forwardRef } from 'react';
import { useCSSVariables, useSettings } from '../providers';
import { cn } from '../utils/cn'; // className utility

interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  // Component-specific props
}

export const BaseComponent = forwardRef<HTMLElement, BaseComponentProps>(
  ({ className, children, ...props }, ref) => {
    const cssVars = useCSSVariables();
    const { settings } = useSettings();

    const styles = {
      // Use CSS variables for theming
      backgroundColor: cssVars.background,
      color: cssVars.foreground,
      // Respect user preferences
      fontSize: settings.appearance.fontSize === 'lg' ? '1.125rem' : '1rem',
    };

    return (
      <div
        ref={ref}
        className={cn('base-component', className)}
        style={styles}
        {...props}
      >
        {children}
      </div>
    );
  }
);

BaseComponent.displayName = 'BaseComponent';
```

### 2. Button Component Implementation

```tsx
'use client';

import React, { forwardRef } from 'react';
import { 
  useCSSVariables, 
  useLoading, 
  useToast, 
  useSettings 
} from '../providers';

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
          return cssVars.surface.primary;
        case 'secondary':
          return cssVars.surface.secondary;
        case 'destructive':
          return cssVars.surface.error;
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
          };
        default:
          return cssVars.surface.primary;
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

    const baseStyles = {
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
      position: 'relative' as const,
    };

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        onClick={handleAsyncClick}
        style={baseStyles}
        className={className}
        {...props}
      >
        {isButtonLoading && (
          <div
            style={{
              width: '1rem',
              height: '1rem',
              border: '2px solid transparent',
              borderTop: `2px solid ${variant === 'outline' ? cssVars.primary : cssVars.primaryForeground}`,
              borderRadius: '50%',
              animation: settings.appearance.animations ? 'spin 1s linear infinite' : 'none',
            }}
          />
        )}
        {!isButtonLoading && icon && iconPosition === 'left' && icon}
        {children}
        {!isButtonLoading && icon && iconPosition === 'right' && icon}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### 3. Text Input Component Implementation

```tsx
'use client';

import React, { forwardRef, useState, useEffect } from 'react';
import { 
  useCSSVariables, 
  useToast, 
  useLoading,
  useSettings 
} from '../providers';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onAsyncValidation?: (value: string) => Promise<string | null>;
  validationKey?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ 
    label,
    helperText,
    error,
    success,
    icon,
    iconPosition = 'left',
    onAsyncValidation,
    validationKey,
    onChange,
    className,
    ...props 
  }, ref) => {
    const cssVars = useCSSVariables();
    const { error: showError } = useToast();
    const { isLoading, startLoading, stopLoading } = useLoading();
    const { settings } = useSettings();
    
    const [internalError, setInternalError] = useState<string | null>(null);
    const [validationTimer, setValidationTimer] = useState<NodeJS.Timeout | null>(null);

    const isValidating = validationKey && isLoading(validationKey);
    const hasError = error || internalError;
    const hasSuccess = success && !hasError;

    // Handle validation
    const handleValidation = async (value: string) => {
      if (!onAsyncValidation || !validationKey) return;

      // Debounce validation
      if (validationTimer) {
        clearTimeout(validationTimer);
      }

      setValidationTimer(setTimeout(async () => {
        try {
          startLoading(validationKey);
          const validationError = await onAsyncValidation(value);
          setInternalError(validationError);
          
          if (validationError) {
            showError('Validation Error', validationError);
          }
        } catch (err) {
          const errorMsg = err instanceof Error ? err.message : 'Validation failed';
          setInternalError(errorMsg);
          showError('Validation Failed', errorMsg);
        } finally {
          stopLoading(validationKey);
        }
      }, 500));
    };

    // Cleanup timer on unmount
    useEffect(() => {
      return () => {
        if (validationTimer) {
          clearTimeout(validationTimer);
        }
      };
    }, [validationTimer]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      
      // Clear previous errors when user types
      if (internalError) {
        setInternalError(null);
      }

      if (onChange) {
        onChange(e);
      }

      // Trigger validation
      if (onAsyncValidation) {
        handleValidation(value);
      }
    };

    const getStateStyles = () => {
      if (hasError) {
        return {
          borderColor: cssVars.error,
          boxShadow: `0 0 0 3px ${cssVars.getColorWithOpacity('error', 0.1)}`,
        };
      }
      if (hasSuccess) {
        return {
          borderColor: cssVars.success,
          boxShadow: `0 0 0 3px ${cssVars.getColorWithOpacity('success', 0.1)}`,
        };
      }
      return {
        borderColor: cssVars.inputBorder,
      };
    };

    const inputStyles = {
      backgroundColor: cssVars.input,
      color: cssVars.foreground,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderRadius: '0.375rem',
      padding: '0.5rem 0.75rem',
      fontSize: settings.appearance.fontSize === 'lg' ? '1.125rem' : '1rem',
      outline: 'none',
      transition: settings.appearance.animations ? 'all 0.2s ease' : 'none',
      width: '100%',
      ...getStateStyles(),
    };

    const containerStyles = {
      position: 'relative' as const,
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.25rem',
    };

    return (
      <div style={containerStyles} className={className}>
        {label && (
          <label
            style={{
              fontSize: '0.875rem',
              fontWeight: '500',
              color: hasError ? cssVars.error : cssVars.foreground,
            }}
          >
            {label}
          </label>
        )}
        
        <div style={{ position: 'relative' }}>
          {icon && iconPosition === 'left' && (
            <div
              style={{
                position: 'absolute',
                left: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: cssVars.mutedForeground,
              }}
            >
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            onChange={handleChange}
            style={{
              ...inputStyles,
              paddingLeft: icon && iconPosition === 'left' ? '2.5rem' : '0.75rem',
              paddingRight: (icon && iconPosition === 'right') || isValidating ? '2.5rem' : '0.75rem',
            }}
            {...props}
          />
          
          {isValidating && (
            <div
              style={{
                position: 'absolute',
                right: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              <div
                style={{
                  width: '1rem',
                  height: '1rem',
                  border: '2px solid transparent',
                  borderTop: `2px solid ${cssVars.primary}`,
                  borderRadius: '50%',
                  animation: settings.appearance.animations ? 'spin 1s linear infinite' : 'none',
                }}
              />
            </div>
          )}
          
          {icon && iconPosition === 'right' && !isValidating && (
            <div
              style={{
                position: 'absolute',
                right: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: cssVars.mutedForeground,
              }}
            >
              {icon}
            </div>
          )}
        </div>
        
        {(helperText || hasError || hasSuccess) && (
          <div
            style={{
              fontSize: '0.75rem',
              color: hasError 
                ? cssVars.error 
                : hasSuccess 
                  ? cssVars.success 
                  : cssVars.mutedForeground,
            }}
          >
            {hasError || hasSuccess || helperText}
          </div>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';
```

### 4. Modal Integration Pattern

```tsx
'use client';

import React from 'react';
import { useModal, useCSSVariables } from '../providers';

export function useConfirmationDialog() {
  const { openModal } = useModal();
  const cssVars = useCSSVariables();

  const confirm = (
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) => {
    openModal({
      title,
      content: (
        <div style={{ padding: '1rem' }}>
          <p style={{ marginBottom: '1.5rem', color: cssVars.foreground }}>
            {message}
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <Button
              variant="outline"
              onClick={() => {
                if (onCancel) onCancel();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                onConfirm();
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      ),
      size: 'sm',
      closable: true,
    });
  };

  return { confirm };
}
```

### 5. Component Testing Pattern

```tsx
// Button.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RoundTable } from '../providers';
import { Button } from './Button';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <RoundTable>{children}</RoundTable>
);

describe('Button', () => {
  it('integrates with loading provider', async () => {
    const mockAsyncAction = jest.fn().mockResolvedValue(undefined);
    
    render(
      <Button 
        onAsyncClick={mockAsyncAction}
        loadingKey="test-action"
      >
        Click me
      </Button>,
      { wrapper: TestWrapper }
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Should show loading state
    expect(button).toBeDisabled();
    expect(screen.getByRole('button')).toHaveTextContent('');

    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });

    expect(mockAsyncAction).toHaveBeenCalled();
  });

  it('adapts to theme changes', () => {
    const { rerender } = render(
      <RoundTable config={{ theme: { defaultTheme: 'light' } }}>
        <Button variant="primary">Test</Button>
      </RoundTable>
    );

    const button = screen.getByRole('button');
    const lightStyles = window.getComputedStyle(button);

    rerender(
      <RoundTable config={{ theme: { defaultTheme: 'dark' } }}>
        <Button variant="primary">Test</Button>
      </RoundTable>
    );

    const darkStyles = window.getComputedStyle(button);
    expect(lightStyles.backgroundColor).not.toBe(darkStyles.backgroundColor);
  });
});
```

## File Structure

```
src/
  components/
    atoms/
      Button/
        Button.tsx
        Button.test.tsx
        Button.stories.tsx
        index.ts
      TextInput/
        TextInput.tsx
        TextInput.test.tsx  
        TextInput.stories.tsx
        index.ts
      // ... other components
    index.ts
  hooks/
    useConfirmationDialog.ts
    useFormValidation.ts
    // ... other component-specific hooks
  utils/
    cn.ts
    // ... utilities
```

## Best Practices

1. **Always use `useCSSVariables()`** for theming instead of hardcoded colors
2. **Respect user settings** from `useSettings()` for animations and preferences  
3. **Provide loading states** for async operations using `useLoading()`
4. **Show user feedback** with `useToast()` for important actions
5. **Forward refs** for better component composition
6. **Use semantic HTML** for accessibility
7. **Test with all themes** to ensure proper contrast and visibility
8. **Implement keyboard navigation** for interactive components
9. **Provide TypeScript types** for all props and return values
10. **Document component APIs** with JSDoc comments

This implementation guide ensures all atomic components are fully integrated with the RoundTable provider ecosystem while maintaining consistency, accessibility, and performance.

'use client';

import React, { forwardRef, useMemo, useRef } from 'react';
import { useCSSVariables, useSettings } from '../../../providers';
import type { CardProps } from './Card.types';
import { 
  getVariantStyles, 
  getSizeStyles, 
  getPaddingStyles,
  createBaseStyles,
  createClickableStyles,
  createLoadingOverlayStyles 
} from './Card.styles';
import { 
  createContentWrapper,
  createHeaderSection,
  createFooterSection,
  handleCardClick,
  createHoverHandlers
} from './Card.utils';
import { ProgressIndicator } from '../ProgressIndicator';

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    variant = 'default',
    size = 'md',
    padding = 'md',
    rounded = false,
    clickable = false,
    disabled = false,
    loading = false,
    header,
    footer,
    onAsyncClick,
    onClick,
    children,
    className,
    style,
    ...props 
  }, ref) => {
    // Hooks
    const cssVars = useCSSVariables();
    const { settings } = useSettings();
    const internalRef = useRef<HTMLDivElement>(null);
    const cardRef = (ref as React.RefObject<HTMLDivElement>) || internalRef;

    // Computed values
    const isDisabled = Boolean(disabled) || loading;
    const isClickable = clickable && !isDisabled;
    const animationsEnabled = settings.appearance.animations;

    // Event handlers
    const handleClick = async (event: React.MouseEvent<HTMLDivElement>) => {
      if (!isClickable) return;
      await handleCardClick(onAsyncClick, onClick, event);
    };

    const { onMouseEnter, onMouseLeave } = createHoverHandlers(
      isClickable,
      isDisabled,
      cssVars,
      cardRef
    );

    // Styles
    const baseStyles = useMemo(() => 
      createBaseStyles(false, isDisabled, Boolean(rounded), animationsEnabled),
      [isDisabled, rounded, animationsEnabled]
    );

    const variantStyles = useMemo(() => 
      getVariantStyles(variant, cssVars),
      [variant, cssVars]
    );

    const sizeStyles = useMemo(() => 
      getSizeStyles(size),
      [size]
    );

    const paddingStyles = useMemo(() => 
      getPaddingStyles(padding),
      [padding]
    );

    const clickableStyles = useMemo(() => 
      createClickableStyles(isClickable, isDisabled),
      [isClickable, isDisabled]
    );

    const loadingOverlayStyles = useMemo(() => 
      createLoadingOverlayStyles(cssVars),
      [cssVars]
    );

    const combinedStyles: React.CSSProperties = {
      ...baseStyles,
      ...variantStyles,
      ...sizeStyles,
      ...paddingStyles,
      ...clickableStyles,
      ...style,
    };

    return (
      <div
        ref={cardRef}
        className={className}
        style={combinedStyles}
        onClick={handleClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        aria-disabled={isDisabled}
        {...props}
      >
        {/* Loading overlay */}
        {loading && (
          <div style={loadingOverlayStyles}>
            <ProgressIndicator
              type="spinner"
              preset="md"
              color="primary"
            />
          </div>
        )}

        {/* Header section */}
        {header && createHeaderSection(header, cssVars)}

        {/* Main content */}
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>

        {/* Footer section */}
        {footer && createFooterSection(footer, cssVars)}
      </div>
    );
  }
);

Card.displayName = 'Card';

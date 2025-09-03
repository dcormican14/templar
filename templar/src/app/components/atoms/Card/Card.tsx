'use client';

import React, { forwardRef, useMemo, useRef } from 'react';
import { useCSSVariables, useSettings } from '../../../providers';
import { extractContainerProps, UNIVERSAL_DEFAULTS } from '../types';
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

export const Card = forwardRef<HTMLDivElement, CardProps>((allProps, ref) => {
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
    clickable,
    onClick,
    onAsyncClick,
    padding = 'md',
  } = containerProps;
  
  // Destructure component-specific props
  const {
    header,
    footer,
    ...restProps
  } = componentProps;
  // Hooks
  const cssVars = useCSSVariables();
  const { settings } = useSettings();
  const internalRef = useRef<HTMLDivElement>(null);
  const cardRef = (ref as React.RefObject<HTMLDivElement>) || internalRef;

  // Computed values
  const isDisabled = Boolean(disabled) || loading;
  const isClickable = clickable && !isDisabled;
  const animationsEnabled = (settings.appearance.animations ?? true) && animate;

  // Event handlers
  const handleClick = async (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isClickable) return;
    await handleCardClick(onAsyncClick, onClick, event);
  };

  const { onMouseEnter, onMouseLeave } = createHoverHandlers(
    Boolean(isClickable),
    Boolean(isDisabled),
    cssVars,
    cardRef
  );

  // Styles
  const baseStyles = useMemo(() => 
    createBaseStyles(false, isDisabled, shape, animationsEnabled, rounded),
    [isDisabled, shape, rounded, animationsEnabled]
  );

  const variantStyles = useMemo(() => 
    getVariantStyles(color, variant, customColor, cssVars),
    [color, customColor, variant, cssVars]
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
    createClickableStyles(Boolean(isClickable), Boolean(isDisabled)),
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
    width,
    height,
    ...style,
  };

  return (
    <div
      ref={cardRef}
      id={id}
      className={className}
      style={combinedStyles}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-disabled={isDisabled}
      data-testid={dataTestId}
      {...restProps}
    >
      {/* Loading overlay */}
      {loading && (
        <div style={loadingOverlayStyles}>
          <ProgressIndicator
            type="spinner"
            size="md"
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

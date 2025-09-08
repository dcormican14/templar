'use client';

import React, { forwardRef, useMemo, useRef, useLayoutEffect, useState } from 'react';
import { useCSSVariables, useSettings } from '../../../providers';
import { extractContainerProps, UNIVERSAL_DEFAULTS } from '../types';
import type { CardProps } from './Card.types';
import { 
  getVariantStyles, 
  getSizeStyles, 
  getPaddingStyles,
  createBaseStyles,
  createClickableStyles,
  createLoadingOverlayStyles,
  getIsometricStyles,
  getColorVariables
} from './Card.styles';
import { 
  createContentWrapper,
  createExternalHeader,
  createExternalFooter,
  handleCardClick,
  createHoverHandlers
} from './Card.utils';
import { ProgressIndicator } from '../ProgressIndicator';
import { ParallaxTiltWrapper } from '../Button/animations/ParallaxTiltWrapper';
import { TypewriterText } from '../Button/animations/TypewriterText';

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
    animationMode = UNIVERSAL_DEFAULTS.animationMode,
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
    headerAlignment = 'left',
    footerAlignment = 'left',
    ...restProps
  } = componentProps;
  // Hooks
  const cssVars = useCSSVariables();
  const { settings } = useSettings();
  const internalRef = useRef<HTMLDivElement>(null);
  const cardRef = (ref as React.RefObject<HTMLDivElement>) || internalRef;
  const [cardWidth, setCardWidth] = useState<number | undefined>(undefined);

  // Computed values
  const isDisabled = Boolean(disabled) || loading;
  const isClickable = clickable && !isDisabled;
  const animationsEnabled = (settings.appearance.animations ?? true) && animate;
  const useAnimationMode = animationsEnabled && animationMode !== 'none';
  const hasIsometricAnimation = useAnimationMode && animationMode === 'isometric' && variant !== 'ghost' && variant !== 'glassmorphic';
  
  // Get the selected color for header/footer (matching border color)
  const colors = getColorVariables(color, customColor, cssVars);
  const headerFooterColor = colors.main || cssVars.foreground;

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

  const isometricStyles = useMemo(() => hasIsometricAnimation ? getIsometricStyles(getColorVariables(color, customColor, cssVars), variant, shape) : {}, [hasIsometricAnimation, color, customColor, cssVars, variant, shape]);

  const combinedStyles: React.CSSProperties = {
    ...baseStyles,
    ...variantStyles,
    ...sizeStyles,
    ...paddingStyles,
    ...clickableStyles,
    ...isometricStyles, // Apply isometric styles last to override other styles
    width,
    height,
    ...style,
  };

  // Measure card width after it's rendered (only based on content, not header/footer)
  useLayoutEffect(() => {
    if (cardRef.current && (header || footer)) {
      const rect = cardRef.current.getBoundingClientRect();
      setCardWidth(rect.width);
    }
  }, [children, combinedStyles, header, footer]);

  // Shared cursor state for synchronized blinking
  const [sharedCursorVisible, setSharedCursorVisible] = useState(true);
  
  // Sync cursor blinking when typewriter mode is active
  useLayoutEffect(() => {
    if (!useAnimationMode || animationMode !== 'typewriter' || isDisabled) {
      return;
    }

    const cursorInterval = setInterval(() => {
      setSharedCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, [useAnimationMode, animationMode, isDisabled]);

  // Helper function to render text with optional typewriter animation
  const renderAnimatedText = (text: React.ReactNode, isTypewriter: boolean) => {
    if (!isTypewriter || typeof text !== 'string') {
      return text;
    }
    return (
      <>
        <TypewriterText
          text={text}
          speed={100}
          deleteSpeed={50}
          showCursor={false}  // Disable internal cursor
          disabled={isDisabled}
        />
        {/* Add shared cursor */}
        <span
          style={{
            opacity: sharedCursorVisible ? 1 : 0,
            transition: 'opacity 0.1s ease-in-out',
          }}
        >
          |
        </span>
      </>
    );
  };

  // Create the card element
  const cardElement = (
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
            color={color}
          />
        </div>
      )}

      {/* Main content */}
      <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );

  // Wrap with animation mode if applicable
  const wrappedCardElement = useAnimationMode && animationMode === 'parallax' ? (
    <ParallaxTiltWrapper disabled={isDisabled || !useAnimationMode}>
      {cardElement}
    </ParallaxTiltWrapper>
  ) : cardElement;

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'flex-start', // Prevent stretching
      width: 'fit-content' // Let card determine width
    }}>
      {/* External Header (above card) */}
      <div style={{
        width: cardWidth ? `${cardWidth}px` : '100%',
        marginBottom: '4px'
      }}>
        {header && (
          <div 
            style={{
              textAlign: headerAlignment,
              color: headerFooterColor, // Use selected color to match borders
              fontWeight: '500',
              fontSize: '14px',
              fontFamily: 'inherit',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              hyphens: 'auto',
            }}
          >
            {renderAnimatedText(header, useAnimationMode && animationMode === 'typewriter')}
          </div>
        )}
      </div>
      
      {/* Card */}
      {wrappedCardElement}

      {/* External Footer (below card) */}
      <div style={{
        width: cardWidth ? `${cardWidth}px` : '100%',
        marginTop: '4px'
      }}>
        {footer && (
          <div 
            style={{
              textAlign: footerAlignment,
              color: headerFooterColor, // Use selected color to match borders
              fontWeight: '500',
              fontSize: '14px',
              fontFamily: 'inherit',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              hyphens: 'auto',
            }}
          >
            {renderAnimatedText(footer, useAnimationMode && animationMode === 'typewriter')}
          </div>
        )}
      </div>
    </div>
  );
}
);

Card.displayName = 'Card';

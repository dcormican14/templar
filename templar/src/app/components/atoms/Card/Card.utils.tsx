import React from 'react';
import type { CardTextAlignment } from './Card.types';

/**
 * Creates a wrapper for card content with proper flex layout
 */
export const createContentWrapper = (children: React.ReactNode): React.ReactElement => {
  return (
    <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
      {children}
    </div>
  );
};

// Legacy functions kept for backward compatibility (now unused)
export const createHeaderSection = () => null;
export const createFooterSection = () => null;

/**
 * Creates external header text (rendered above the card)
 */
export const createExternalHeader = (
  header: React.ReactNode,
  alignment: CardTextAlignment = 'left',
  cssVars: any
): React.ReactElement | null => {
  if (!header) return null;
  
  return (
    <div 
      style={{
        marginBottom: '4px', // Closer to card
        textAlign: alignment,
        color: cssVars.foreground,
        fontWeight: '500',
        fontSize: '14px',
        fontFamily: 'inherit',
        width: '100%', // Match card width
        wordWrap: 'break-word', // Wrap long text
        overflowWrap: 'break-word', // Better text wrapping
        hyphens: 'auto', // Hyphenation support
      }}
    >
      {header}
    </div>
  );
};

/**
 * Creates external footer text (rendered below the card)
 */
export const createExternalFooter = (
  footer: React.ReactNode,
  alignment: CardTextAlignment = 'left',
  cssVars: any
): React.ReactElement | null => {
  if (!footer) return null;
  
  return (
    <div 
      style={{
        marginTop: '4px', // Closer to card
        textAlign: alignment,
        color: cssVars.foreground,
        fontWeight: '500',
        fontSize: '14px',
        fontFamily: 'inherit',
        width: '100%', // Match card width
        wordWrap: 'break-word', // Wrap long text
        overflowWrap: 'break-word', // Better text wrapping
        hyphens: 'auto', // Hyphenation support
      }}
    >
      {footer}
    </div>
  );
};

/**
 * Handles card click events with proper error handling
 */
export const handleCardClick = async (
  onAsyncClick?: () => Promise<void>,
  onClick?: React.MouseEventHandler<HTMLDivElement>,
  event?: React.MouseEvent<HTMLDivElement>
): Promise<void> => {
  try {
    if (onClick && event) {
      onClick(event);
    }
    
    if (onAsyncClick) {
      await onAsyncClick();
    }
  } catch (error) {
    console.error('Card click error:', error);
    // Could integrate with toast provider here
  }
};

/**
 * Creates hover effect handlers for clickable cards
 */
export const createHoverHandlers = (
  clickable: boolean,
  disabled: boolean,
  cssVars: any,
  elementRef: React.RefObject<HTMLDivElement>
) => {
  if (!clickable || disabled) {
    return {
      onMouseEnter: undefined,
      onMouseLeave: undefined,
    };
  }

  const handleMouseEnter = () => {
    if (elementRef.current) {
      elementRef.current.style.transform = 'translateY(-1px)';
      elementRef.current.style.boxShadow = cssVars.shadows.lg;
    }
  };

  const handleMouseLeave = () => {
    if (elementRef.current) {
      elementRef.current.style.transform = 'translateY(0)';
      // Reset to original shadow based on variant
      elementRef.current.style.boxShadow = '';
    }
  };

  return {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };
};

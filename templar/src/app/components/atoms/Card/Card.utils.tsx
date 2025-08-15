import React from 'react';

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

/**
 * Creates header section with proper styling
 */
export const createHeaderSection = (
  header: React.ReactNode,
  cssVars: any
): React.ReactElement => {
  if (!header) return <></>;
  
  return (
    <div 
      style={{
        marginBottom: '12px',
        borderBottom: '1px solid',
        borderBottomColor: cssVars.border,
        paddingBottom: '12px',
        opacity: 0.9,
      }}
    >
      {header}
    </div>
  );
};

/**
 * Creates footer section with proper styling
 */
export const createFooterSection = (
  footer: React.ReactNode,
  cssVars: any
): React.ReactElement => {
  if (!footer) return <></>;
  
  return (
    <div 
      style={{
        marginTop: 'auto',
        paddingTop: '12px',
        borderTop: '1px solid',
        borderTopColor: cssVars.border,
        opacity: 0.9,
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

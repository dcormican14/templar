import React from 'react';
import type { BadgeSize } from './Badge.types';
import { getIconSize } from './Badge.styles';
import { Icon } from '../Icon';
import { TypewriterText } from '../Button/animations';

export const renderIcon = (
  iconElement: React.ReactNode,
  badgeSize: BadgeSize
): React.ReactNode => {
  if (!iconElement) return null;
  
  if (React.isValidElement(iconElement)) {
    return React.cloneElement(iconElement as React.ReactElement<any>, {
      size: getIconSize(badgeSize),
    });
  }
  
  return iconElement;
};

export const createRemoveButton = (
  onRemove: () => void,
  badgeSize: BadgeSize,
  cssVars: any,
  animationsEnabled: boolean
): React.ReactElement => {
  const buttonSize = badgeSize === 'xs' ? '16px' : badgeSize === 'sm' ? '18px' : '20px';
  // Use a larger icon size for better visibility
  const iconSize = badgeSize === 'xs' ? 'xs' : 'sm';
  
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onRemove();
      }}
      style={{
        marginLeft: '0px',
        width: buttonSize,
        height: buttonSize,
        borderRadius: '50%',
        border: 'none',
        backgroundColor: 'transparent',
        color: 'currentColor',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.7,
        transition: animationsEnabled ? 'opacity 0.2s ease' : 'none',
        padding: 0,
      }}
      onMouseEnter={(e) => {
        if (animationsEnabled) {
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.backgroundColor = cssVars.getColorWithOpacity?.('currentColor', 0.1) || 'rgba(0,0,0,0.1)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '0.7';
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
      title="Remove"
      aria-label="Remove badge"
    >
      <Icon name="Xmark" size={iconSize} />
    </button>
  );
};

export const createBadgeContent = (
  icon: React.ReactNode,
  iconPosition: 'leading' | 'trailing',
  badgeSize: BadgeSize,
  children: React.ReactNode,
  removable: boolean,
  onRemove?: () => void,
  cssVars?: any,
  animationsEnabled?: boolean,
  useAnimationMode?: boolean,
  animationMode?: 'none' | 'typewriter' | 'isometric',
  disabled?: boolean
): React.ReactElement => {
  const hasIcon = Boolean(icon);
  const hasRemove = removable && onRemove;
  const shouldUseTypewriter = useAnimationMode && animationMode === 'typewriter' && !disabled;
  
  // Check if there are actual children (text content) - matching Button's logic
  const hasChildren = Boolean(children && (typeof children === 'string' ? children.trim() : children));

  // Get responsive spacing based on badge size (only when there are children)
  const getSpacing = (size: BadgeSize): string => {
    const spacingMap = {
      xs: '2px',
      sm: '3px', 
      md: '4px',
      lg: '5px',
      xl: '6px',
    };
    return spacingMap[size];
  };

  // Create content section with text and icon grouping
  const renderContent = () => {
    if (!hasChildren) return null;

    if (shouldUseTypewriter && typeof children === 'string') {
      return (
        <TypewriterText
          text={children}
          speed={50}
          startDelay={100}
          enabled={animationsEnabled || false}
        />
      );
    }

    return <span>{children}</span>;
  };

  const spacing = getSpacing(badgeSize);

  // If there are no children, just render the icon centered without spacing (matching Button logic)
  if (!hasChildren) {
    return (
      <>
        {hasIcon && (
          <span style={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {renderIcon(icon, badgeSize)}
          </span>
        )}
        {hasRemove && createRemoveButton(onRemove, badgeSize, cssVars, animationsEnabled || false)}
      </>
    );
  }

  // When there are children, use proper spacing and layout
  return (
    <span style={{ 
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing
    }}>
      {hasIcon && iconPosition === 'leading' && renderIcon(icon, badgeSize)}
      {renderContent()}
      {hasIcon && iconPosition === 'trailing' && renderIcon(icon, badgeSize)}
      {hasRemove && createRemoveButton(onRemove, badgeSize, cssVars, animationsEnabled || false)}
    </span>
  );
};

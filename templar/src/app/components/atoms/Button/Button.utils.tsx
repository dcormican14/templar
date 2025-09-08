import React from 'react';
import type { IconPosition } from './Button.types';
import { getIconSize } from './Button.styles';
import type { ButtonSize } from './Button.types';

export const renderIcon = (
  iconElement: React.ReactNode,
  buttonSize: ButtonSize
): React.ReactNode => {
  if (!iconElement) return null;
  
  if (React.isValidElement(iconElement)) {
    return React.cloneElement(iconElement as React.ReactElement<any>, {
      size: getIconSize(buttonSize),
    });
  }
  
  return iconElement;
};

export const createIconContainer = (
  icon: React.ReactNode,
  position: IconPosition,
  buttonSize: ButtonSize
): React.ReactElement => {
  // Responsive spacing based on button size
  const getSpacing = (size: ButtonSize): string => {
    const spacingMap = {
      xs: '2px',
      sm: '3px',
      md: '4px',
      lg: '5px',
      xl: '6px',
    };
    return spacingMap[size];
  };

  const spacing = getSpacing(buttonSize);
  // Apply both left and right margins to both leading and trailing icons
  const marginStyle = { marginLeft: spacing, marginRight: spacing };

  return (
    <span style={{ 
      display: 'flex', 
      alignItems: 'center',
      ...marginStyle
    }}>
      {renderIcon(icon, buttonSize)}
    </span>
  );
};

export const createTextContainer = (children: React.ReactNode): React.ReactElement => (
  <span style={{ 
    flex: 1, 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center'
  }}>
    {children}
  </span>
);

export const createSpacerElement = (): React.ReactElement => (
  <span style={{ width: '1px' }} />
);

export const createCenteredContent = (
  icon: React.ReactNode,
  iconPosition: IconPosition,
  buttonSize: ButtonSize,
  children: React.ReactNode
): React.ReactElement => {
  // Check if there are actual children (text content)
  const hasChildren = Boolean(children && (typeof children === 'string' ? children.trim() : children));
  
  // If there are no children, just render the icon centered without any spacing
  if (!hasChildren) {
    return (
      <span style={{ 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {renderIcon(icon, buttonSize)}
      </span>
    );
  }

  // Responsive spacing based on button size (only when there are children)
  const getSpacing = (size: ButtonSize): string => {
    const spacingMap = {
      xs: '2px',
      sm: '3px',
      md: '4px',
      lg: '5px',
      xl: '6px',
    };
    return spacingMap[size];
  };

  const spacing = getSpacing(buttonSize);

  return (
    <span style={{ 
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing
    }}>
      {iconPosition === 'leading' && renderIcon(icon, buttonSize)}
      <span>{children}</span>
      {iconPosition === 'trailing' && renderIcon(icon, buttonSize)}
    </span>
  );
};

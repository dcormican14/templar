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
  const marginStyle = position === 'leading' 
    ? { marginRight: spacing } 
    : { marginLeft: spacing };

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

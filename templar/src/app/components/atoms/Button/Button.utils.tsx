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
  const marginStyle = position === 'leading' 
    ? { marginRight: '4px' } 
    : { marginLeft: '4px' };

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

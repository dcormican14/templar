import React from 'react';
import { getIcon } from './iconRegistry';
import type { IconName } from './iconRegistry';

export const resolveIconComponent = (
  name: IconName | React.ComponentType<React.SVGProps<SVGSVGElement>>
): React.ComponentType<React.SVGProps<SVGSVGElement>> | null => {
  if (typeof name === 'string') {
    const IconComponent = getIcon(name);
    if (!IconComponent) {
      console.warn(`Icon "${name}" not found in registry`);
      return null;
    }
    return IconComponent;
  }
  
  return name;
};

export const createIconProps = (
  sizeValue: number,
  colorValue: string,
  iconStyles: React.CSSProperties,
  className?: string,
  ref?: React.Ref<SVGSVGElement>,
  additionalProps?: Record<string, any>
) => ({
  width: sizeValue,
  height: sizeValue,
  color: colorValue,
  style: iconStyles,
  className,
  ref,
  ...additionalProps,
});

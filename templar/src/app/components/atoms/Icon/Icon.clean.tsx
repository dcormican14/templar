'use client';

import React, { forwardRef, useMemo } from 'react';
import { useCSSVariables, useSettings } from '../../../providers';
import type { IconProps } from './Icon.types';
import { getSizeValue, getColorValue, getAnimationStyles, createIconStyles } from './Icon.styles';
import { resolveIconComponent, createIconProps } from './Icon.utils';
import { IconAnimations } from './IconAnimations';

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ 
    name,
    size = 'md',
    color = 'inherit',
    spin = false,
    pulse = false,
    className,
    style,
    ...props 
  }, ref) => {
    // Hooks
    const cssVars = useCSSVariables();
    const { settings } = useSettings();

    // Computed values
    const animationsEnabled = settings.appearance.animations;
    const IconComponent = useMemo(() => resolveIconComponent(name), [name]);

    // Early return if icon not found
    if (!IconComponent) {
      return null;
    }

    // Style computations
    const sizeValue = useMemo(() => getSizeValue(size), [size]);
    const colorValue = useMemo(() => getColorValue(color, cssVars), [color, cssVars]);
    const animationStyles = useMemo(() => 
      getAnimationStyles(spin, pulse, animationsEnabled), 
      [spin, pulse, animationsEnabled]
    );
    const iconStyles = useMemo(() => 
      createIconStyles(sizeValue, colorValue, animationStyles, style),
      [sizeValue, colorValue, animationStyles, style]
    );

    // Icon props
    const iconProps = createIconProps(
      sizeValue,
      colorValue,
      iconStyles,
      className,
      ref,
      props
    );

    return (
      <>
        <IconAnimations 
          hasAnimations={animationsEnabled}
          spin={spin}
          pulse={pulse}
        />
        <IconComponent {...iconProps} />
      </>
    );
  }
);

Icon.displayName = 'Icon';

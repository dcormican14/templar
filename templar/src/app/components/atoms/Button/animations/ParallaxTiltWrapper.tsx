'use client';

import React, { cloneElement, isValidElement } from 'react';
import Tilt from 'react-parallax-tilt';

interface ParallaxTiltWrapperProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const ParallaxTiltWrapper: React.FC<ParallaxTiltWrapperProps> = ({
  children,
  disabled = false,
  className,
  style,
}) => {
  if (disabled) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  // Extract border radius and box shadow from child element
  let childBorderRadius = '0px';
  let childBoxShadow = 'none';
  let shouldPreserveShadow = false;
  
  if (isValidElement(children) && children.props && typeof children.props === 'object') {
    const childProps = children.props as { style?: React.CSSProperties };
    const childStyle = childProps.style;
    if (childStyle?.borderRadius) {
      childBorderRadius = childStyle.borderRadius as string;
    }
    if (childStyle?.boxShadow) {
      childBoxShadow = childStyle.boxShadow as string;
      // Check if this is a glassmorphic shadow (contains multiple shadows)
      shouldPreserveShadow = childBoxShadow.includes('32px') || childBoxShadow.includes('40px');
    }
  }

  return (
    <Tilt
      className={className}
      style={{
        borderRadius: childBorderRadius,
        // Only use overflow hidden if we don't need to preserve shadows
        overflow: shouldPreserveShadow ? 'visible' : 'hidden',
        // Apply the child's box shadow to the wrapper if it's a glassmorphic shadow
        boxShadow: shouldPreserveShadow ? childBoxShadow : 'none',
        ...style,
      }}
      tiltReverse={true}
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      perspective={1200}
      scale={1.0}
      transitionSpeed={300}
      gyroscope={true}
      glareEnable={true}
      glareMaxOpacity={0.3}
      glareColor="#ffffff"
      glarePosition="all"
      glareReverse={false}
      glareBorderRadius={childBorderRadius}
    >
      {/* Remove box shadow from child if we're handling it on wrapper */}
      {shouldPreserveShadow && isValidElement(children) && children.props && typeof children.props === 'object'
        ? cloneElement(children, {
            style: {
              ...(children.props as { style?: React.CSSProperties }).style,
              boxShadow: 'none'
            }
          } as Partial<typeof children.props>)
        : children
      }
    </Tilt>
  );
};
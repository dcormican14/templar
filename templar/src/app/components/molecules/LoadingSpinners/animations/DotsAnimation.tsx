'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { DotsAnimationProps } from '../LoadingSpinners.types';
import { getColorValue, createDotsStyles } from '../LoadingSpinners.styles';

export const DotsAnimation: React.FC<DotsAnimationProps> = ({
  size,
  color,
  duration,
  show,
  cssVars
}) => {
  if (!show) return null;

  const colorValue = getColorValue(color, cssVars);
  const containerStyles = createDotsStyles(size, color, cssVars);
  
  // Size mapping for dots
  const dotSizeMap = {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '10px',
    xl: '12px',
  };

  const dotSize = dotSizeMap[size];

  return (
    <div style={containerStyles}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: '50%',
            backgroundColor: colorValue,
          }}
          animate={{
            y: ['0%', '-50%', '0%'],
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            delay: index * 0.1,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

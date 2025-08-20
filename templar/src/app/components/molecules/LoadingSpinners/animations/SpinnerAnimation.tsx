'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { SpinnerAnimationProps } from '../LoadingSpinners.types';
import { getColorValue, getSizeStyles } from '../LoadingSpinners.styles';

export const SpinnerAnimation: React.FC<SpinnerAnimationProps> = ({
  size,
  color,
  duration,
  show,
  cssVars
}) => {
  if (!show) return null;

  const colorValue = getColorValue(color, cssVars);
  const sizeStyles = getSizeStyles(size);

  return (
    <motion.div
      style={{
        ...sizeStyles,
        border: `2px solid transparent`,
        borderTop: `2px solid ${colorValue}`,
        borderRadius: '50%',
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear'
      }}
    />
  );
};

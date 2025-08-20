'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { PulseAnimationProps } from '../LoadingSpinners.types';
import { createPulseStyles } from '../LoadingSpinners.styles';

export const PulseAnimation: React.FC<PulseAnimationProps> = ({
  size,
  color,
  duration,
  show,
  cssVars
}) => {
  if (!show) return null;

  const baseStyles = createPulseStyles(size, color, cssVars);

  return (
    <motion.div
      style={baseStyles}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [1, 0.7, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

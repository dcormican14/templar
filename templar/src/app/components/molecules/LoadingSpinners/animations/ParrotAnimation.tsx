'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { ParrotAnimationProps } from '../LoadingSpinners.types';
import { createParrotColors } from '../LoadingSpinners.styles';

export const ParrotAnimation: React.FC<ParrotAnimationProps> = ({
  size,
  color,
  duration,
  show,
  cssVars
}) => {
  if (!show) return null;

  const colors = createParrotColors(color, cssVars);
  
  // Size mapping for the parrot animation
  const sizeMap = {
    xs: { containerSize: '48px', innerSize: '32px' },
    sm: { containerSize: '64px', innerSize: '48px' },
    md: { containerSize: '96px', innerSize: '64px' },
    lg: { containerSize: '128px', innerSize: '96px' },
    xl: { containerSize: '160px', innerSize: '128px' },
  };

  const { containerSize, innerSize } = sizeMap[size];

  return (
    <div 
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div 
        style={{
          position: 'relative',
          width: containerSize,
          height: containerSize,
          overflow: 'hidden',
        }}
      >
        {/* Crest - outer semicircle using accent color */}
        <motion.div
          style={{
            position: 'absolute',
            inset: '0',
            margin: 'auto',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            overflow: 'hidden',
            backgroundImage: `linear-gradient(to right, ${colors.crest} 50%, transparent 50%)`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat'
          }}
          animate={{ rotate: [0, 180, 180, 360, 360] }}
          transition={{
            duration,
            repeat: Infinity,
            times: [0, 0.25, 0.5, 0.75, 1],
            ease: "linear"
          }}
        />

        {/* Face - theme-aware semicircle */}
        <motion.div
          style={{
            position: 'absolute',
            inset: '0',
            margin: 'auto',
            borderRadius: '50%',
            overflow: 'hidden',
            width: '65%',
            height: '65%',
            backgroundImage: `linear-gradient(to right, ${colors.face} 50%, transparent 50%)`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat'
          }}
          animate={{ rotate: [0, -180, -180, -360, -360] }}
          transition={{
            duration,
            repeat: Infinity,
            times: [0, 0.25, 0.5, 0.75, 1],
            ease: "linear"
          }}
        />

        {/* Cheek - theme-aware quarter circle */}
        <motion.div
          style={{
            position: 'absolute',
            inset: '0',
            margin: 'auto',
            borderRadius: '50%',
            overflow: 'hidden',
            width: '65%',
            height: '65%',
            backgroundImage: `linear-gradient(to right, ${colors.cheek} 50%, transparent 50%, transparent 100%)`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            maskImage: 'linear-gradient(to bottom, transparent 50%, black 50%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 50%, black 50%)'
          }}
          animate={{ rotate: [90, -90, -90, -360, -360] }}
          transition={{
            duration,
            repeat: Infinity,
            times: [0, 0.25, 0.5, 0.75, 1],
            ease: "linear"
          }}
        />

        {/* Upper Lip - enhanced for dark mode */}
        <motion.div
          style={{
            position: 'absolute',
            inset: '0',
            margin: 'auto',
            borderRadius: '50%',
            overflow: 'hidden',
            width: '65%',
            height: '65%',
            backgroundImage: `linear-gradient(to right, ${colors.upperLip} 50%, transparent 50%)`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            maskImage: 'linear-gradient(to bottom, black 50%, transparent 50%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 50%)'
          }}
          animate={{ rotate: [90, 0, 0, 90, 90] }}
          transition={{
            duration,
            repeat: Infinity,
            times: [0, 0.25, 0.5, 0.75, 1],
            ease: "linear"
          }}
        />

        {/* Lower Lip - enhanced for dark mode */}
        <motion.div
          style={{
            position: 'absolute',
            inset: '0',
            margin: 'auto',
            borderRadius: '50%',
            overflow: 'hidden',
            width: '35%',
            height: '35%',
            backgroundImage: `linear-gradient(to right, ${colors.lowerLip} 50%, transparent 50%)`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            maskImage: 'linear-gradient(to bottom, black 50%, transparent 50%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 50%)'
          }}
          animate={{ rotate: [180, 270, 270, 180, 180] }}
          transition={{
            duration,
            repeat: Infinity,
            times: [0, 0.25, 0.5, 0.75, 1],
            ease: "linear"
          }}
        />

        {/* Eye - theme-aware circle */}
        <motion.div
          style={{
            position: 'absolute',
            width: '15%',
            height: '15%',
            borderRadius: '50%',
            backgroundColor: colors.eye,
            top: '50%',
            left: '50%',
            marginTop: '-7.5%',
            marginLeft: '-7.5%'
          }}
          animate={{
            x: ['-60%', '60%', '60%', '-60%', '-60%'],
            y: ['-60%', '-60%', '-60%', '-60%', '-60%']
          }}
          transition={{
            duration,
            repeat: Infinity,
            times: [0, 0.25, 0.5, 0.75, 1],
            ease: "linear"
          }}
        />
      </div>
    </div>
  );
};

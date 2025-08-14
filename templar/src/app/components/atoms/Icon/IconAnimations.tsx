import React from 'react';

interface IconAnimationsProps {
  hasAnimations: boolean;
  spin: boolean;
  pulse: boolean;
}

export const IconAnimations: React.FC<IconAnimationsProps> = ({ 
  hasAnimations, 
  spin, 
  pulse 
}) => {
  if (!hasAnimations || (!spin && !pulse)) {
    return null;
  }

  return (
    <style jsx global>{`
      @keyframes icon-spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      
      @keyframes icon-pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }
    `}</style>
  );
};

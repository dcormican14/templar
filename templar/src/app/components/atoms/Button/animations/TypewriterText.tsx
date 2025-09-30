'use client';

import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  deleteSpeed?: number;
  showCursor?: boolean;
  cursorChar?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  waitTime?: number;
  loop?: number | 'infinite'; // Number of times to loop, or 'infinite' for continuous loop
}

type TypewriterPhase = 'typing' | 'waiting' | 'deleting';

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 100,
  deleteSpeed = 50,
  showCursor = true,
  cursorChar = '|',
  disabled = false,
  children,
  waitTime, // Will be calculated randomly if not provided
  loop = 'infinite', // Default to infinite loop for backward compatibility
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursorBlink, setShowCursorBlink] = useState(true);
  const [phase, setPhase] = useState<TypewriterPhase>('typing');
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    if (disabled) {
      setDisplayText(text);
      return;
    }

    let timeout: NodeJS.Timeout;

    switch (phase) {
      case 'typing':
        if (currentIndex < text.length) {
          timeout = setTimeout(() => {
            setDisplayText(text.slice(0, currentIndex + 1));
            setCurrentIndex(currentIndex + 1);
          }, speed);
        } else {
          // Finished typing, wait before deleting
          // Generate random wait time between 6-8 seconds if not provided
          const randomWaitTime = waitTime || (6000 + Math.random() * 2000);
          timeout = setTimeout(() => {
            setPhase('deleting');
          }, randomWaitTime);
        }
        break;

      case 'deleting':
        if (currentIndex > 0) {
          timeout = setTimeout(() => {
            setCurrentIndex(currentIndex - 1);
            setDisplayText(text.slice(0, currentIndex - 1));
          }, deleteSpeed);
        } else {
          // Finished deleting, check if we should loop again
          const shouldContinueLooping = loop === 'infinite' || cycleCount < loop - 1;

          if (shouldContinueLooping) {
            setCycleCount(cycleCount + 1);
            setPhase('typing');
          } else {
            // Finished all loops, show complete text and stay
            setDisplayText(text);
            setCurrentIndex(text.length);
            setPhase('typing'); // Set to typing but won't progress since index === length
          }
        }
        break;
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, text, speed, deleteSpeed, disabled, phase, waitTime]);

  useEffect(() => {
    if (disabled) return;

    const cursorInterval = setInterval(() => {
      setShowCursorBlink((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, [disabled]);

  // Reset animation when text changes
  useEffect(() => {
    if (!disabled) {
      setCurrentIndex(0);
      setDisplayText('');
      setPhase('typing');
      setCycleCount(0);
    }
  }, [text, disabled]);

  if (disabled) {
    return <>{children || text}</>;
  }

  return (
    <>
      {displayText}
      {showCursor && (
        <span
          style={{
            opacity: showCursorBlink ? 1 : 0,
            transition: 'opacity 0.1s ease-in-out',
          }}
        >
          {cursorChar}
        </span>
      )}
    </>
  );
};
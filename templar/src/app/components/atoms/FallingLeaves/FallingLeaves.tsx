'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

interface Leaf {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  speed: number;
  drift: number;
  horizontalSpeed: number;
  gravity: number;
  image: string;
  rotationSpeed: number;
}

interface FallingLeavesProps {
  /** Number of leaves to maintain on screen */
  leafCount?: number;
  /** How often to spawn new leaves (ms) */
  spawnRate?: number;
  /** Enable/disable the effect */
  enabled?: boolean;
}

export function FallingLeaves({
  leafCount = 15,
  spawnRate = 2000,
  enabled = true
}: FallingLeavesProps) {
  const [leaves, setLeaves] = useState<Leaf[]>([]);
  const [mounted, setMounted] = useState(false);
  const nextIdRef = useRef(0);

  // Available leaf images
  const leafImages = [
    '/assets/leaf_1.png',
    '/assets/leaf_2.png',
    '/assets/leaf_3.png',
    '/assets/leaf_4.png'
  ];

  // Create a new leaf (stable function)
  const createLeaf = (): Leaf => {
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const id = nextIdRef.current++;
    const leaf = {
      id: id,
      x: Math.random() * screenWidth,
      y: -50, // Start just above the screen
      rotation: Math.random() * 360,
      scale: 0.3 + Math.random() * 0.7, // 0.3 to 1.0 scale
      speed: 3 + Math.random() * 4, // Fall speed (much faster)
      drift: (Math.random() - 0.5) * 0.5, // Horizontal drift
      horizontalSpeed: -2 - Math.random() * 3, // Move left (-2 to -5 pixels per frame)
      gravity: 0.02 + Math.random() * 0.03, // Acceleration downward (parabolic effect)
      image: leafImages[Math.floor(Math.random() * leafImages.length)],
      rotationSpeed: (Math.random() - 0.5) * 2 // Rotation speed
    };
    return leaf;
  };

  // Ensure component is mounted on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Spawn new leaves
  useEffect(() => {
    if (!enabled || !mounted) return;

    const spawnInterval = setInterval(() => {
      setLeaves(currentLeaves => {
        if (currentLeaves.length < leafCount) {
          const newLeaf = createLeaf();
          return [...currentLeaves, newLeaf];
        }
        return currentLeaves;
      });
    }, spawnRate);

    return () => clearInterval(spawnInterval);
  }, [enabled, mounted, leafCount, spawnRate]);

  // Animate leaves
  useEffect(() => {
    if (!enabled || !mounted) return;

    const animationInterval = setInterval(() => {
      setLeaves(currentLeaves => {
        return currentLeaves
          .map(leaf => ({
            ...leaf,
            y: leaf.y + leaf.speed,
            x: leaf.x + leaf.horizontalSpeed,
            speed: leaf.speed + leaf.gravity,
            rotation: leaf.rotation + leaf.rotationSpeed
          }))
          .filter(leaf => {
            const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
            return leaf.y < screenHeight + 100;
          });
      });
    }, 16); // ~60fps

    return () => clearInterval(animationInterval);
  }, [enabled, mounted]);

  // Clean up when disabled
  useEffect(() => {
    if (!enabled) {
      setLeaves([]);
    }
  }, [enabled]);

  if (!enabled || !mounted) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 100, // High z-index to ensure visibility for debugging
        overflow: 'hidden'
      }}
    >
      {leaves.map(leaf => (
        <img
          key={leaf.id}
          src={leaf.image}
          alt="Falling leaf"
          onError={(e) => console.error('Failed to load leaf image:', leaf.image)}
          onLoad={() => console.log('Loaded leaf image:', leaf.image)}
          style={{
            position: 'absolute',
            left: `${leaf.x}px`,
            top: `${leaf.y}px`,
            transform: `rotate(${leaf.rotation}deg) scale(${leaf.scale})`,
            width: '60px',
            height: 'auto',
            opacity: 0.8,
            transition: 'none',
            // border: '2px solid red' // Debug border (removed)
          }}
        />
      ))}
      {/* Debug info (hidden) */}
      {/* <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '10px',
        fontSize: '14px',
        borderRadius: '4px'
      }}>
        Leaves count: {leaves.length}
      </div> */}
    </div>
  );
}
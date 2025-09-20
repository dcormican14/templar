export interface FallingLeavesProps {
  /** Number of leaves to maintain on screen */
  leafCount?: number;
  /** How often to spawn new leaves (ms) */
  spawnRate?: number;
  /** Enable/disable the effect */
  enabled?: boolean;
}

export interface Leaf {
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
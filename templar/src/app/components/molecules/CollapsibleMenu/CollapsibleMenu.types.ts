import React from 'react';

// Since this is a molecule, we'll import individual universal types rather than using the WithFormProps pattern
export type CollapsibleMenuSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type CollapsibleMenuColor = 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'info' | 'custom';
export type CollapsibleMenuShape = 'sharp' | 'default' | 'round' | 'pill';
export type CollapsibleMenuPosition = 'left' | 'right';

// CollapsibleMenu props interface
export interface CollapsibleMenuProps {
  /**
   * Whether the menu is collapsed
   * @default false
   */
  collapsed?: boolean;
  
  /**
   * Default collapsed state for uncontrolled component
   * @default false
   */
  defaultCollapsed?: boolean;
  
  /**
   * Callback fired when the collapsed state changes
   */
  onToggle?: (collapsed: boolean) => void;
  
  /**
   * Position of the menu
   * @default 'left'
   */
  position?: CollapsibleMenuPosition;
  
  /**
   * Width of the menu when expanded
   * @default '250px'
   */
  expandedWidth?: string | number;
  
  /**
   * Width of the menu when collapsed
   * @default '60px'
   */
  collapsedWidth?: string | number;
  
  /**
   * Content to display in the menu
   */
  children?: React.ReactNode;
  
  /**
   * Custom toggle tag content (replaces default caret)
   */
  toggleContent?: React.ReactNode;
  
  /**
   * Whether to show the toggle tag
   * @default true
   */
  showToggle?: boolean;
  
  /**
   * Additional styling for the toggle tag
   */
  toggleStyle?: React.CSSProperties;
  
  /**
   * Additional className for the toggle tag
   */
  toggleClassName?: string;
  
  /**
   * Z-index for the menu
   * @default 1000
   */
  zIndex?: number;
  
  /**
   * Whether the menu should overlay content or push it
   * @default false
   */
  overlay?: boolean;
  
  /**
   * Animation duration in milliseconds
   * @default 300
   */
  animationDuration?: number;
  
  /**
   * Color variant
   * @default 'primary'
   */
  color?: CollapsibleMenuColor;
  
  /**
   * Custom color (when color is 'custom')
   */
  customColor?: string;
  
  /**
   * Size variant
   * @default 'md'
   */
  size?: CollapsibleMenuSize;
  
  /**
   * Shape variant
   * @default 'default'
   */
  shape?: CollapsibleMenuShape;
  
  /**
   * Whether the menu is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether animations are enabled
   * @default true
   */
  animate?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Component ID
   */
  id?: string;
}

export interface CollapsibleMenuRef {
  toggle: () => void;
  expand: () => void;
  collapse: () => void;
  isCollapsed: () => boolean;
}
import React from 'react';

// Control types for different prop inputs
export type ControlType = 'select' | 'checkbox' | 'text' | 'number' | 'color';

export interface PropControl {
  key: string;
  label: string;
  type: ControlType;
  options?: Array<{ label: string; value: any }>;
  defaultValue?: any;
  min?: number;
  max?: number;
  step?: number;
}

export interface PropControlGroup {
  title: string;
  controls: PropControl[];
}

// InteractiveComponentDisplay props
export interface InteractiveComponentDisplayProps {
  /**
   * The component to render and control
   */
  children: React.ReactElement;
  
  /**
   * Left side controls
   */
  leftControls?: PropControlGroup[];
  
  /**
   * Right side controls
   */
  rightControls?: PropControlGroup[];
  
  /**
   * Initial prop values
   */
  initialProps?: Record<string, any>;
  
  /**
   * Callback when props change
   */
  onPropsChange?: (props: Record<string, any>) => void;
  
  /**
   * Title for the component being displayed
   */
  title?: string;
  
  /**
   * Description for the component
   */
  description?: string;
  
  /**
   * Whether to show the code preview
   * @default true
   */
  showCode?: boolean;
  
  /**
   * Whether to show the props panel
   * @default true
   */
  showControls?: boolean;
  
  /**
   * Custom styling for the display area
   */
  displayStyle?: React.CSSProperties;
  
  /**
   * Custom className for the display area
   */
  displayClassName?: string;
  
  /**
   * Whether the display area should have padding
   * @default true
   */
  padded?: boolean;
  
  /**
   * Background pattern for the display area
   * @default 'none'
   */
  background?: 'none' | 'dots' | 'grid' | 'subtle';
  
  /**
   * Size of the interactive display
   * @default 'lg'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Layout orientation
   * @default 'horizontal'
   */
  layout?: 'horizontal' | 'vertical';
}

export interface InteractiveComponentDisplayRef {
  getProps: () => Record<string, any>;
  setProps: (props: Record<string, any>) => void;
  resetProps: () => void;
}
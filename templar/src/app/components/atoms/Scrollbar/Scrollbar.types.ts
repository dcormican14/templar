import { ComponentProps, ReactNode } from 'react';

export type ScrollbarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ScrollbarColor = 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'info' | 'custom';
export type ScrollbarVariant = 'solid' | 'ghost' | 'outline';
export type ScrollbarShape = 'sharp' | 'round' | 'pill';
export type ScrollbarOrientation = 'horizontal' | 'vertical' | 'both';

export interface ScrollbarProps extends Omit<ComponentProps<'div'>, 'size'> {
  /**
   * Color scheme of the scrollbar
   * @default 'primary'
   */
  color?: ScrollbarColor;
  
  /**
   * Custom color when color is set to 'custom'
   */
  customColor?: string;
  
  /**
   * Visual style variant of the scrollbar
   * @default 'solid'
   */
  variant?: ScrollbarVariant;
  
  /**
   * Shape of the scrollbar
   * @default 'round'
   */
  shape?: ScrollbarShape;
  
  /**
   * Size of the scrollbar
   * @default 'md'
   */
  size?: ScrollbarSize;
  
  /**
   * Whether the scrollbar is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * The orientation of the scrollbar
   * @default 'vertical'
   */
  orientation?: ScrollbarOrientation;
  
  /**
   * The content to be scrolled
   */
  children?: ReactNode;
  
  /**
   * The height of the scrollable container
   */
  height?: number | string;
  
  /**
   * The width of the scrollable container
   */
  width?: number | string;
  
  /**
   * The minimum height of the scrollable container
   */
  minHeight?: number | string;
  
  /**
   * The minimum width of the scrollable container
   */
  minWidth?: number | string;
  
  /**
   * The maximum height of the scrollable container
   */
  maxHeight?: number | string;
  
  /**
   * The maximum width of the scrollable container
   */
  maxWidth?: number | string;
  
  /**
   * Whether to show the scrollbar always or only on hover
   * @default 'auto'
   */
  visibility?: 'always' | 'hover' | 'auto' | 'hidden';
  
  /**
   * Whether to enable smooth scrolling
   * @default true
   */
  smoothScrolling?: boolean;
  
  /**
   * Whether to hide the native scrollbars
   * @default true
   */
  hideNative?: boolean;
  
  /**
   * Whether to enable scroll momentum on touch devices
   * @default true
   */
  momentum?: boolean;
  
  /**
   * Auto-hide delay in milliseconds
   * @default 1000
   */
  autoHideDelay?: number;
  
  /**
   * Whether to enable scroll indicators
   * @default false
   */
  showIndicators?: boolean;
  
  /**
   * Padding around the scrollable content
   */
  padding?: number | string;
  
  /**
   * Callback when scroll position changes
   */
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
  
  /**
   * Callback when scrolling starts
   */
  onScrollStart?: () => void;
  
  /**
   * Callback when scrolling ends
   */
  onScrollEnd?: () => void;
  
  /**
   * Callback when reaching the top
   */
  onReachTop?: () => void;
  
  /**
   * Callback when reaching the bottom
   */
  onReachBottom?: () => void;
  
  /**
   * Callback when reaching the left edge
   */
  onReachLeft?: () => void;
  
  /**
   * Callback when reaching the right edge
   */
  onReachRight?: () => void;
  
  /**
   * Custom scroll thumb size (0-1 representing percentage of track)
   */
  thumbSize?: number;
  
  /**
   * Custom scroll position (0-1 representing percentage of content)
   */
  scrollPosition?: { x?: number; y?: number };
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Unique identifier for the component
   */
  id?: string;
}

export interface ScrollbarRef {
  scrollTo: (position: { top?: number; left?: number; behavior?: 'auto' | 'smooth' }) => void;
  scrollIntoView: (element: Element, options?: ScrollIntoViewOptions) => void;
  getScrollPosition: () => { top: number; left: number };
}

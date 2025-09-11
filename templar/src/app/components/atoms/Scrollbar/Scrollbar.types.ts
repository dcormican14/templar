import { ComponentProps, ReactNode } from 'react';
import type { 
  WithContainerProps, 
  UniversalSize, 
  UniversalColor, 
  UniversalVariant, 
  UniversalShape 
} from '../types';

// Component-specific type aliases (for backward compatibility)
export type ScrollbarSize = UniversalSize;
export type ScrollbarColor = UniversalColor;
export type ScrollbarVariant = UniversalVariant;
export type ScrollbarShape = UniversalShape;
export type ScrollbarOrientation = 'horizontal' | 'vertical' | 'both';
export type ScrollbarAlignment = 'start' | 'end'; // start = left/top, end = right/bottom

// Component-specific props (not covered by universal props)
export interface ScrollbarSpecificProps extends Omit<ComponentProps<'div'>, 'size' | 'color' | 'style' | 'className' | 'id' | 'children' | 'onClick' | 'width' | 'height'> {
  
  /**
   * The orientation of the scrollbar
   * @default 'vertical'
   */
  orientation?: ScrollbarOrientation;
  
  /**
   * Whether to show the scrollbar always or only on hover
   * @default 'auto'
   */
  visibility?: 'always' | 'hover' | 'auto' | 'hidden';
  
  /**
   * Alignment of the scrollbar (start = left/top, end = right/bottom)
   * @default 'end'
   */
  alignment?: ScrollbarAlignment;
  
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
}

// Complete Scrollbar props interface extending universal props
export interface ScrollbarProps extends WithContainerProps<ScrollbarSpecificProps> {}

export interface ScrollbarRef {
  scrollTo: (position: { top?: number; left?: number; behavior?: 'auto' | 'smooth' }) => void;
  scrollIntoView: (element: Element, options?: ScrollIntoViewOptions) => void;
  getScrollPosition: () => { top: number; left: number };
}

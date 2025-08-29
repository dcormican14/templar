import { ComponentProps, ReactNode } from 'react';

export type ScrollbarSize = 'sm' | 'md' | 'lg';
export type ScrollbarVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error';
export type ScrollbarOrientation = 'horizontal' | 'vertical';
export type ScrollbarTrackSize = 'none' | 'sm' | 'md' | 'lg';

export interface ScrollbarProps extends Omit<ComponentProps<'div'>, 'size'> {
  /**
   * The size of the scrollbar
   * @default 'md'
   */
  size?: ScrollbarSize;
  
  /**
   * The visual variant of the scrollbar
   * @default 'primary'
   */
  variant?: ScrollbarVariant;
  
  /**
   * The orientation of the scrollbar
   * @default 'vertical'
   */
  orientation?: ScrollbarOrientation;
  
  /**
   * The size of the track background
   * @default 'md'
   */
  trackSize?: ScrollbarTrackSize;
  
  /**
   * The content to be scrolled
   */
  children?: ReactNode;
  
  /**
   * The height of the scrollable container (for vertical scrollbars)
   */
  height?: number | string;
  
  /**
   * The width of the scrollable container (for horizontal scrollbars)
   */
  width?: number | string;
  
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
   * @default 'hover'
   */
  visibility?: 'always' | 'hover' | 'auto';
  
  /**
   * Whether to enable smooth scrolling
   * @default true
   */
  smoothScrolling?: boolean;
  
  /**
   * Whether the scrollbar should be disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Callback when scroll position changes
   */
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
  
  /**
   * Custom scroll thumb size (0-1 representing percentage of track)
   */
  thumbSize?: number;
  
  /**
   * Custom scroll position (0-1 representing percentage of content)
   */
  scrollPosition?: number;
}

export interface ScrollbarRef {
  scrollTo: (position: { top?: number; left?: number; behavior?: 'auto' | 'smooth' }) => void;
  scrollIntoView: (element: Element, options?: ScrollIntoViewOptions) => void;
  getScrollPosition: () => { top: number; left: number };
}

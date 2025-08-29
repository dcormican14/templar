import { ScrollbarSize, ScrollbarVariant, ScrollbarOrientation } from './Scrollbar.types';

/**
 * Check if the browser supports WebKit scrollbar styling
 */
export const supportsWebKitScrollbar = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check if browser supports webkit scrollbar pseudo-elements
  return CSS.supports('-webkit-appearance', 'none');
};

/**
 * Calculate scroll thumb size based on content and container dimensions
 */
export const calculateThumbSize = (
  contentSize: number,
  containerSize: number
): number => {
  if (contentSize <= containerSize) return 1;
  return Math.max(containerSize / contentSize, 0.1); // Minimum 10% thumb size
};

/**
 * Calculate scroll thumb position based on scroll position
 */
export const calculateThumbPosition = (
  scrollPosition: number,
  contentSize: number,
  containerSize: number,
  thumbSize: number
): number => {
  if (contentSize <= containerSize) return 0;
  const maxScrollPosition = contentSize - containerSize;
  const scrollRatio = scrollPosition / maxScrollPosition;
  const maxThumbPosition = 1 - thumbSize;
  return Math.max(0, Math.min(scrollRatio * maxThumbPosition, maxThumbPosition));
};

/**
 * Get scroll position from thumb position
 */
export const getScrollPositionFromThumb = (
  thumbPosition: number,
  contentSize: number,
  containerSize: number,
  thumbSize: number
): number => {
  if (contentSize <= containerSize) return 0;
  const maxThumbPosition = 1 - thumbSize;
  const scrollRatio = maxThumbPosition > 0 ? thumbPosition / maxThumbPosition : 0;
  const maxScrollPosition = contentSize - containerSize;
  return scrollRatio * maxScrollPosition;
};

/**
 * Check if scrolling is needed based on content and container sizes
 */
export const isScrollingNeeded = (
  contentSize: number,
  containerSize: number
): boolean => {
  return contentSize > containerSize;
};

/**
 * Get default size for consistency
 */
export const getDefaultSize = (): ScrollbarSize => 'md';

/**
 * Get default variant for consistency
 */
export const getDefaultVariant = (): ScrollbarVariant => 'primary';

/**
 * Get default orientation for consistency
 */
export const getDefaultOrientation = (): ScrollbarOrientation => 'vertical';

/**
 * Validate scrollbar props
 */
export const validateScrollbarProps = (props: {
  height?: number | string;
  width?: number | string;
  maxHeight?: number | string;
  maxWidth?: number | string;
  orientation?: ScrollbarOrientation;
}) => {
  const { height, width, maxHeight, maxWidth, orientation } = props;
  
  if (process.env.NODE_ENV === 'development') {
    if (orientation === 'vertical' && !height && !maxHeight) {
      console.warn(
        'Scrollbar: For vertical orientation, consider providing height or maxHeight for better UX.'
      );
    }
    
    if (orientation === 'horizontal' && !width && !maxWidth) {
      console.warn(
        'Scrollbar: For horizontal orientation, consider providing width or maxWidth for better UX.'
      );
    }
  }
};

/**
 * Apply custom scrollbar styles using CSS-in-JS
 */
export const applyScrollbarStyles = (
  element: HTMLElement,
  styles: Record<string, React.CSSProperties>
) => {
  if (!element || !supportsWebKitScrollbar()) return;
  
  // This would require a CSS-in-JS solution like styled-components or emotion
  // For now, we'll apply basic styles that can be set directly
  Object.entries(styles).forEach(([selector, style]) => {
    if (selector === '&::-webkit-scrollbar' && style.width) {
      element.style.setProperty('--scrollbar-width', style.width as string);
    }
    if (selector === '&::-webkit-scrollbar' && style.height) {
      element.style.setProperty('--scrollbar-height', style.height as string);
    }
  });
};

/**
 * Get ARIA attributes for scrollbar accessibility
 */
export const getScrollbarAriaAttributes = (
  orientation: ScrollbarOrientation,
  scrollPosition: number,
  maxScroll: number,
  disabled: boolean
) => {
  const scrollPercentage = maxScroll > 0 ? Math.round((scrollPosition / maxScroll) * 100) : 0;
  
  return {
    'aria-orientation': orientation,
    'aria-valuenow': scrollPercentage,
    'aria-valuemin': 0,
    'aria-valuemax': 100,
    'aria-valuetext': `${scrollPercentage}% scrolled`,
    'aria-disabled': disabled,
    role: 'scrollbar',
  };
};

/**
 * Throttle scroll events for performance
 */
export const throttleScrollEvent = <T extends (...args: any[]) => any>(
  func: T,
  delay: number = 16 // ~60fps
): T => {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;
  
  return ((...args: any[]) => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  }) as T;
};

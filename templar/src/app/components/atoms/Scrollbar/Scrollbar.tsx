import React, { forwardRef, useRef, useImperativeHandle, useState, useEffect, useCallback } from 'react';
import { useCSSVariables } from '../../../providers';
import { ScrollbarProps, ScrollbarRef } from './Scrollbar.types';
import {
  getScrollbarContainerStyles,
  getWebKitScrollbarStyles,
  getFallbackScrollbarStyles,
  getScrollbarContentStyles,
  getCustomScrollbarTrackStyles,
  getCustomScrollbarThumbStyles,
} from './Scrollbar.styles';
import {
  supportsWebKitScrollbar,
  calculateThumbSize,
  calculateThumbPosition,
  getScrollPositionFromThumb,
  isScrollingNeeded,
  getDefaultSize,
  getDefaultVariant,
  getDefaultOrientation,
  validateScrollbarProps,
  getScrollbarAriaAttributes,
  throttleScrollEvent,
} from './Scrollbar.utils';

export const Scrollbar = forwardRef<ScrollbarRef, ScrollbarProps>(({
  size = getDefaultSize(),
  variant = getDefaultVariant(),
  orientation = getDefaultOrientation(),
  trackSize = 'md',
  children,
  height,
  width,
  maxHeight,
  maxWidth,
  visibility = 'hover',
  smoothScrolling = true,
  disabled = false,
  onScroll,
  thumbSize: customThumbSize,
  scrollPosition: customScrollPosition,
  className,
  style,
  ...rest
}, ref) => {
  // Get CSS variables for theming
  const cssVars = useCSSVariables();
  
  // Validate props in development
  validateScrollbarProps({ height, width, maxHeight, maxWidth, orientation });
  
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // State for custom scrollbar implementation
  const [scrollState, setScrollState] = useState({
    scrollTop: 0,
    scrollLeft: 0,
    scrollHeight: 0,
    scrollWidth: 0,
    clientHeight: 0,
    clientWidth: 0,
  });
  
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, scrollTop: 0, scrollLeft: 0 });
  
  // Update scroll state
  const updateScrollState = useCallback(() => {
    if (!containerRef.current) return;
    
    const element = containerRef.current;
    setScrollState({
      scrollTop: element.scrollTop,
      scrollLeft: element.scrollLeft,
      scrollHeight: element.scrollHeight,
      scrollWidth: element.scrollWidth,
      clientHeight: element.clientHeight,
      clientWidth: element.clientWidth,
    });
  }, []);
  
  // Throttled scroll handler
  const throttledScrollHandler = useCallback(
    throttleScrollEvent((event: React.UIEvent<HTMLDivElement>) => {
      updateScrollState();
      onScroll?.(event);
    }),
    [updateScrollState, onScroll]
  );
  
  // Handle scroll
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    if (disabled) return;
    throttledScrollHandler(event);
  };
  
  // Expose imperative methods
  useImperativeHandle(ref, () => ({
    scrollTo: ({ top, left, behavior = 'auto' }) => {
      if (!containerRef.current) return;
      containerRef.current.scrollTo({ top, left, behavior });
    },
    scrollIntoView: (element: Element, options?: ScrollIntoViewOptions) => {
      element.scrollIntoView(options);
    },
    getScrollPosition: () => ({
      top: scrollState.scrollTop,
      left: scrollState.scrollLeft,
    }),
  }));
  
  // Calculate thumb properties for custom scrollbar
  const verticalThumbSize = customThumbSize ?? calculateThumbSize(scrollState.scrollHeight, scrollState.clientHeight);
  const horizontalThumbSize = customThumbSize ?? calculateThumbSize(scrollState.scrollWidth, scrollState.clientWidth);
  
  const verticalThumbPosition = customScrollPosition ?? calculateThumbPosition(
    scrollState.scrollTop,
    scrollState.scrollHeight,
    scrollState.clientHeight,
    verticalThumbSize
  );
  
  const horizontalThumbPosition = customScrollPosition ?? calculateThumbPosition(
    scrollState.scrollLeft,
    scrollState.scrollWidth,
    scrollState.clientWidth,
    horizontalThumbSize
  );
  
  // Check if scrolling is needed
  const needsVerticalScroll = isScrollingNeeded(scrollState.scrollHeight, scrollState.clientHeight);
  const needsHorizontalScroll = isScrollingNeeded(scrollState.scrollWidth, scrollState.clientWidth);
  
  // Update scroll state on mount and resize
  useEffect(() => {
    updateScrollState();
    
    const resizeObserver = new ResizeObserver(updateScrollState);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => resizeObserver.disconnect();
  }, [updateScrollState]);
  
  // Handle thumb drag (for custom scrollbar)
  const handleThumbMouseDown = (event: React.MouseEvent, scrollOrientation: 'vertical' | 'horizontal') => {
    if (disabled) return;
    
    event.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: event.clientX,
      y: event.clientY,
      scrollTop: scrollState.scrollTop,
      scrollLeft: scrollState.scrollLeft,
    });
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const deltaY = e.clientY - dragStart.y;
      const deltaX = e.clientX - dragStart.x;
      
      if (scrollOrientation === 'vertical') {
        const scrollRange = scrollState.scrollHeight - scrollState.clientHeight;
        const thumbRange = scrollState.clientHeight * (1 - verticalThumbSize);
        const scrollDelta = (deltaY / thumbRange) * scrollRange;
        containerRef.current.scrollTop = dragStart.scrollTop + scrollDelta;
      } else {
        const scrollRange = scrollState.scrollWidth - scrollState.clientWidth;
        const thumbRange = scrollState.clientWidth * (1 - horizontalThumbSize);
        const scrollDelta = (deltaX / thumbRange) * scrollRange;
        containerRef.current.scrollLeft = dragStart.scrollLeft + scrollDelta;
      }
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  // Generate scrollbar styles
  const webkitStyles = getWebKitScrollbarStyles(size, variant, orientation, trackSize, visibility, disabled, cssVars);
  const fallbackStyles = getFallbackScrollbarStyles(size, variant, cssVars);
  
  // Combine container styles
  const containerStyles = {
    ...getScrollbarContainerStyles(orientation, height, width, maxHeight, maxWidth, smoothScrolling, disabled),
    ...fallbackStyles,
    ...style,
  };
  
  // Apply webkit styles via CSS custom properties (requires CSS support)
  const cssVarsForWebkit = Object.entries(webkitStyles).reduce((acc, [key, styles]) => {
    // Convert webkit styles to CSS custom properties that can be used in CSS
    if (key === '&::-webkit-scrollbar' && styles.width) {
      acc['--scrollbar-width'] = styles.width;
    }
    if (key === '&::-webkit-scrollbar' && styles.height) {
      acc['--scrollbar-height'] = styles.height;
    }
    return acc;
  }, {} as Record<string, any>);
  
  const finalContainerStyles = {
    ...containerStyles,
    ...cssVarsForWebkit,
  };
  
  // Get ARIA attributes
  const verticalAriaAttributes = getScrollbarAriaAttributes(
    'vertical',
    scrollState.scrollTop,
    scrollState.scrollHeight - scrollState.clientHeight,
    disabled
  );
  
  const horizontalAriaAttributes = getScrollbarAriaAttributes(
    'horizontal',
    scrollState.scrollLeft,
    scrollState.scrollWidth - scrollState.clientWidth,
    disabled
  );
  
  return (
    <div
      ref={containerRef}
      className={`scrollbar-container ${className || ''}`}
      style={finalContainerStyles}
      onScroll={handleScroll}
      {...rest}
    >
      {/* Content */}
      <div
        ref={contentRef}
        style={getScrollbarContentStyles()}
      >
        {children}
      </div>
      
      {/* Custom scrollbar implementation for better control */}
      {visibility === 'always' && !supportsWebKitScrollbar() && (
        <>
          {/* Vertical scrollbar */}
          {needsVerticalScroll && (
            <>
              <div style={getCustomScrollbarTrackStyles('vertical', size, trackSize, cssVars)} />
              <div
                style={getCustomScrollbarThumbStyles(
                  'vertical',
                  size,
                  variant,
                  verticalThumbPosition,
                  verticalThumbSize,
                  disabled,
                  cssVars
                )}
                onMouseDown={(e) => handleThumbMouseDown(e, 'vertical')}
                {...verticalAriaAttributes}
              />
            </>
          )}
          
          {/* Horizontal scrollbar */}
          {needsHorizontalScroll && (
            <>
              <div style={getCustomScrollbarTrackStyles('horizontal', size, trackSize, cssVars)} />
              <div
                style={getCustomScrollbarThumbStyles(
                  'horizontal',
                  size,
                  variant,
                  horizontalThumbPosition,
                  horizontalThumbSize,
                  disabled,
                  cssVars
                )}
                onMouseDown={(e) => handleThumbMouseDown(e, 'horizontal')}
                {...horizontalAriaAttributes}
              />
            </>
          )}
        </>
      )}
    </div>
  );
});

Scrollbar.displayName = 'Scrollbar';
import React, { forwardRef, useRef, useImperativeHandle, useState, useEffect, useCallback } from 'react';
import { useCSSVariables, useSettings } from '../../../providers';
import { extractContainerProps, UNIVERSAL_DEFAULTS } from '../types';
import { ScrollbarProps, ScrollbarRef } from './Scrollbar.types';
import {
  createScrollbarContainerStyles,
  getScrollableContentStyles,
  getWebKitScrollbarStyles,
  getFirefoxScrollbarStyles,
  getCustomScrollbarTrackStyles,
  getCustomScrollbarThumbStyles,
  getScrollIndicatorStyles,
} from './Scrollbar.styles';
import {
  supportsWebKitScrollbar,
  calculateThumbSize,
  calculateThumbPosition,
  getScrollPositionFromThumb,
  isScrollingNeeded,
  validateScrollbarProps,
  getScrollbarAriaAttributes,
  throttleScrollEvent,
} from './Scrollbar.utils';

export const Scrollbar = forwardRef<ScrollbarRef, ScrollbarProps>((allProps, ref) => {
  // Extract container props and component-specific props
  const [containerProps, componentProps] = extractContainerProps(allProps);
  
  // Destructure container props with defaults
  const {
    color = UNIVERSAL_DEFAULTS.color,
    customColor,
    variant = 'outline', // Scrollbar-specific default
    shape = UNIVERSAL_DEFAULTS.shape,
    size = UNIVERSAL_DEFAULTS.size,
    disabled = UNIVERSAL_DEFAULTS.disabled,
    width,
    height,
    className,
    style,
    id,
    animate = UNIVERSAL_DEFAULTS.animate,
    children,
  } = containerProps;
  
  // Destructure component-specific props
  const {
    orientation = 'vertical',
    visibility = 'hover',
    smoothScrolling = true,
    hideNative = true,
    momentum = true,
    autoHideDelay = 1000,
    showIndicators = false,
    onScroll,
    onScrollStart,
    onScrollEnd,
    onReachTop,
    onReachBottom,
    onReachLeft,
    onReachRight,
    thumbSize: customThumbSize,
    scrollPosition: customScrollPosition,
    ...rest
  } = componentProps;

  // Get CSS variables for theming and settings
  const cssVars = useCSSVariables();
  const { settings } = useSettings();
  const animationsEnabled = (settings.appearance.animations ?? true) && animate;
  
  // Validate props in development
  validateScrollbarProps({ height, width, orientation });
  
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const verticalTrackRef = useRef<HTMLDivElement>(null);
  const verticalThumbRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const horizontalThumbRef = useRef<HTMLDivElement>(null);
  
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
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);
  
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
      
      // Detect scroll boundaries
      const element = event.currentTarget;
      const { scrollTop, scrollLeft, scrollHeight, scrollWidth, clientHeight, clientWidth } = element;
      
      if (scrollTop === 0) onReachTop?.();
      if (scrollTop + clientHeight >= scrollHeight) onReachBottom?.();
      if (scrollLeft === 0) onReachLeft?.();
      if (scrollLeft + clientWidth >= scrollWidth) onReachRight?.();
    }, 16),
    [updateScrollState, onScroll, onReachTop, onReachBottom, onReachLeft, onReachRight]
  );
  
  // Handle scroll start/end
  const handleScrollStart = useCallback(() => {
    if (!isScrolling) {
      setIsScrolling(true);
      onScrollStart?.();
    }
    
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    
    const timeout = setTimeout(() => {
      setIsScrolling(false);
      onScrollEnd?.();
    }, 150);
    
    setScrollTimeout(timeout);
  }, [isScrolling, scrollTimeout, onScrollStart, onScrollEnd]);
  
  // Handle scroll events
  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      handleScrollStart();
      throttledScrollHandler(event);
    },
    [handleScrollStart, throttledScrollHandler]
  );
  
  // Imperative API
  useImperativeHandle(ref, () => ({
    scrollTo: ({ top, left, behavior = 'smooth' }) => {
      if (containerRef.current) {
        containerRef.current.scrollTo({ top, left, behavior });
      }
    },
    scrollIntoView: (element: Element, options?: ScrollIntoViewOptions) => {
      element.scrollIntoView(options);
    },
    getScrollPosition: () => ({
      top: scrollState.scrollTop,
      left: scrollState.scrollLeft,
    }),
  }));
  
  // Update scroll state on mount and when content changes
  useEffect(() => {
    updateScrollState();
  }, [updateScrollState, children]);
  
  // Handle custom scroll position
  useEffect(() => {
    if (customScrollPosition && containerRef.current) {
      const { x, y } = customScrollPosition;
      if (typeof y === 'number') {
        containerRef.current.scrollTop = y * (scrollState.scrollHeight - scrollState.clientHeight);
      }
      if (typeof x === 'number') {
        containerRef.current.scrollLeft = x * (scrollState.scrollWidth - scrollState.clientWidth);
      }
    }
  }, [customScrollPosition, scrollState]);
  
  // Styles
  const containerStyles = createScrollbarContainerStyles(
    shape,
    width,
    height,
    undefined, // minWidth
    undefined, // minHeight
    undefined, // maxWidth
    undefined, // maxHeight
    undefined, // padding
    smoothScrolling,
    hideNative,
    momentum,
    Boolean(disabled),
    animationsEnabled
  );
  
  const contentStyles = getScrollableContentStyles(
    orientation,
    animationsEnabled
  );
  
  const needsVerticalScrollbar = isScrollingNeeded(scrollState.scrollHeight, scrollState.clientHeight);
  const needsHorizontalScrollbar = isScrollingNeeded(scrollState.scrollWidth, scrollState.clientWidth);
  
  const verticalThumbSize = calculateThumbSize(scrollState.clientHeight, scrollState.scrollHeight);
  const horizontalThumbSize = calculateThumbSize(scrollState.clientWidth, scrollState.scrollWidth);
  
  const verticalThumbPosition = calculateThumbPosition(
    scrollState.scrollTop,
    scrollState.scrollHeight,
    scrollState.clientHeight,
    verticalThumbSize
  );
  
  const horizontalThumbPosition = calculateThumbPosition(
    scrollState.scrollLeft,
    scrollState.scrollWidth,
    scrollState.clientWidth,
    horizontalThumbSize
  );
  
  // Custom scrollbar track styles
  const verticalTrackStyles = getCustomScrollbarTrackStyles(
    'vertical',
    color,
    customColor,
    variant,
    size,
    shape,
    Boolean(disabled),
    animationsEnabled,
    cssVars
  );
  
  const horizontalTrackStyles = getCustomScrollbarTrackStyles(
    'horizontal',
    color,
    customColor,
    variant,
    size,
    shape,
    Boolean(disabled),
    animationsEnabled,
    cssVars
  );
  
  // Custom scrollbar thumb styles
  const verticalThumbStyles = getCustomScrollbarThumbStyles(
    'vertical',
    color,
    customColor,
    variant,
    size,
    shape,
    verticalThumbPosition,
    verticalThumbSize,
    Boolean(disabled),
    isDragging,
    animationsEnabled
  );
  
  const horizontalThumbStyles = getCustomScrollbarThumbStyles(
    'horizontal',
    color,
    customColor,
    variant,
    size,
    shape,
    horizontalThumbPosition,
    horizontalThumbSize,
    Boolean(disabled),
    isDragging,
    animationsEnabled
  );
  
  const combinedStyles: React.CSSProperties = {
    ...containerStyles,
    ...style,
  };
  
  // Accessibility attributes
  const ariaAttributes = getScrollbarAriaAttributes(
    orientation,
    orientation === 'vertical' ? scrollState.scrollTop : scrollState.scrollLeft,
    orientation === 'vertical' ? scrollState.scrollHeight - scrollState.clientHeight : scrollState.scrollWidth - scrollState.clientWidth,
    Boolean(disabled)
  );
  
  return (
    <div
      className={className}
      style={combinedStyles}
      id={id}
      {...ariaAttributes}
      {...rest}
    >
      <div
        ref={containerRef}
        style={contentStyles}
        onScroll={handleScroll}
        tabIndex={disabled ? -1 : 0}
      >
        <div ref={contentRef}>
          {children}
        </div>
      </div>
      
      {/* Custom vertical scrollbar */}
      {!hideNative && needsVerticalScrollbar && (orientation === 'vertical' || orientation === 'both') && (
        <div
          ref={verticalTrackRef}
          style={verticalTrackStyles}
          onClick={(e) => {
            // Handle track click to jump to position
            const rect = e.currentTarget.getBoundingClientRect();
            const clickY = e.clientY - rect.top;
            const trackHeight = rect.height;
            const scrollPercentage = clickY / trackHeight;
            const newScrollTop = scrollPercentage * (scrollState.scrollHeight - scrollState.clientHeight);
            
            if (containerRef.current) {
              containerRef.current.scrollTop = newScrollTop;
            }
          }}
        >
          <div
            ref={verticalThumbRef}
            style={verticalThumbStyles}
          />
        </div>
      )}
      
      {/* Custom horizontal scrollbar */}
      {!hideNative && needsHorizontalScrollbar && (orientation === 'horizontal' || orientation === 'both') && (
        <div
          ref={horizontalTrackRef}
          style={horizontalTrackStyles}
          onClick={(e) => {
            // Handle track click to jump to position
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const trackWidth = rect.width;
            const scrollPercentage = clickX / trackWidth;
            const newScrollLeft = scrollPercentage * (scrollState.scrollWidth - scrollState.clientWidth);
            
            if (containerRef.current) {
              containerRef.current.scrollLeft = newScrollLeft;
            }
          }}
        >
          <div
            ref={horizontalThumbRef}
            style={horizontalThumbStyles}
          />
        </div>
      )}
      
      {/* Scroll indicators */}
      {showIndicators && (
        <>
          {needsVerticalScrollbar && (
            <div
              style={getScrollIndicatorStyles(
                'vertical',
                color,
                customColor,
                size,
                scrollState.scrollTop > 0 ? 'top' : 'bottom',
                Boolean(disabled),
                animationsEnabled,
                cssVars
              )}
            />
          )}
          {needsHorizontalScrollbar && (
            <div
              style={getScrollIndicatorStyles(
                'horizontal',
                color,
                customColor,
                size,
                scrollState.scrollLeft > 0 ? 'left' : 'right',
                Boolean(disabled),
                animationsEnabled,
                cssVars
              )}
            />
          )}
        </>
      )}
    </div>
  );
});

Scrollbar.displayName = 'Scrollbar';
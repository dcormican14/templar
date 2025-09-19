import React, { forwardRef, useRef, useImperativeHandle, useState, useEffect, useCallback, useMemo } from 'react';
import { useCSSVariables, useSettings } from '../../../providers';
import { extractContainerProps, UNIVERSAL_DEFAULTS } from '../types';
import { ScrollbarProps, ScrollbarRef } from './Scrollbar.types';
import { Icon } from '../Icon/Icon';
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

// Utility to inject webkit scrollbar styles as CSS
const createWebkitScrollbarCSS = (
  uniqueId: string, 
  webkitStyles: Record<string, React.CSSProperties>
): string => {
  let css = '';
  let hoverStyles = null;
  
  Object.entries(webkitStyles).forEach(([selector, styles]) => {
    if (selector === '__hover__') {
      // Special case for hover state
      hoverStyles = styles;
    } else if (selector.includes('::-webkit-scrollbar')) {
      const cleanSelector = selector.replace('&', `#${uniqueId} > div:first-child`);
      const cssProps = Object.entries(styles as Record<string, any>)
        .map(([prop, value]) => {
          // Convert camelCase to kebab-case
          const kebabProp = prop.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
          return `${kebabProp}: ${value};`;
        })
        .join(' ');
      
      css += `${cleanSelector} { ${cssProps} }`;
    }
  });
  
  // Add hover state for the container
  if (hoverStyles) {
    css += `#${uniqueId}:hover > div:first-child::-webkit-scrollbar-thumb { opacity: ${hoverStyles.opacity}; }`;
  }
  
  return css;
};

// Utility to inject or update CSS styles in the document head
const injectCSS = (uniqueId: string, css: string) => {
  if (typeof document === 'undefined') return;
  
  const existingStyle = document.getElementById(`scrollbar-${uniqueId}`);
  
  if (existingStyle) {
    existingStyle.textContent = css;
  } else {
    const style = document.createElement('style');
    style.id = `scrollbar-${uniqueId}`;
    style.textContent = css;
    document.head.appendChild(style);
  }
};

// Cleanup injected CSS
const cleanupCSS = (uniqueId: string) => {
  if (typeof document === 'undefined') return;
  
  const style = document.getElementById(`scrollbar-${uniqueId}`);
  if (style) {
    style.remove();
  }
};

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
    visibility = 'always',
    alignment = 'end',
    smoothScrolling = true,
    momentum = true,
    hideNative, // Remove this prop to prevent it from being passed to DOM
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
  
  // Generate unique ID for this scrollbar instance
  const uniqueId = useMemo(() => 
    id || `scrollbar-${Math.random().toString(36).substr(2, 9)}`, 
    [id]
  );
  const animationsEnabled = (settings.appearance.animations ?? true) && animate;
  
  // Validate props in development
  validateScrollbarProps({ height, width, orientation });

  // Special handling for both orientation with start alignment
  const isStartBothCase = alignment === 'start' && orientation === 'both';

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

  // Drag handling functions
  const handleThumbMouseDown = useCallback((e: React.MouseEvent, orientation: 'vertical' | 'horizontal') => {
    e.preventDefault();
    e.stopPropagation();

    if (!containerRef.current) return;

    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      scrollTop: containerRef.current.scrollTop,
      scrollLeft: containerRef.current.scrollLeft,
    });
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      // Use requestAnimationFrame for smooth updates
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        if (!containerRef.current) return;

        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;

        if (orientation === 'vertical' || orientation === 'both') {
          const containerHeight = scrollState.clientHeight;
          const contentHeight = scrollState.scrollHeight;
          const scrollableHeight = contentHeight - containerHeight;

          if (scrollableHeight > 0) {
            // Calculate the thumb height and available track space
            const thumbHeight = Math.max(20, (containerHeight / contentHeight) * containerHeight);
            const trackSpace = containerHeight - thumbHeight;

            // Convert mouse movement to scroll position
            const scrollRatio = deltaY / trackSpace;
            const newScrollTop = Math.max(0, Math.min(scrollableHeight, dragStart.scrollTop + (scrollRatio * scrollableHeight)));

            containerRef.current.scrollTop = newScrollTop;
          }
        }

        if (orientation === 'horizontal' || orientation === 'both') {
          const containerWidth = scrollState.clientWidth;
          const contentWidth = scrollState.scrollWidth;
          const scrollableWidth = contentWidth - containerWidth;

          if (scrollableWidth > 0) {
            // Calculate the thumb width and available track space
            const thumbWidth = Math.max(20, (containerWidth / contentWidth) * containerWidth);
            const trackSpace = containerWidth - thumbWidth;

            // Convert mouse movement to scroll position
            const scrollRatio = deltaX / trackSpace;
            const newScrollLeft = Math.max(0, Math.min(scrollableWidth, dragStart.scrollLeft + (scrollRatio * scrollableWidth)));

            containerRef.current.scrollLeft = newScrollLeft;
          }
        }
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      cancelAnimationFrame(animationFrameId);
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: false });
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDragging, dragStart, orientation, scrollState]);
  
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
      if (!element) return;
      
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
    width,
    height,
    undefined, // minWidth
    undefined, // minHeight
    undefined, // maxWidth
    undefined, // maxHeight
    undefined, // padding
    smoothScrolling,
    false, // Never hide native scrollbars
    momentum,
    Boolean(disabled),
    animationsEnabled
  );
  
  // Use native scrollbars with direction CSS for start alignment

  // Apply CSS transforms for start alignment positioning
  const containerDirectionStyles = alignment === 'start' ? (() => {
    if (orientation === 'vertical') {
      // Use direction: rtl for vertical scrollbar on left
      return { direction: 'rtl' as const };
    } else if (orientation === 'horizontal') {
      // Use rotateX(180deg) for horizontal scrollbar on top
      return { transform: 'rotateX(180deg)' };
    } else if (orientation === 'both') {
      // For both orientations, only apply direction: rtl for vertical scrollbar
      // Horizontal scrollbar will be handled by custom scrollbar positioned at top
      return { direction: 'rtl' as const };
    }
    return {};
  })() : {};

  const contentDirectionStyles = alignment === 'start' ? (() => {
    if (orientation === 'vertical') {
      // Reset text direction for vertical
      return { direction: 'ltr' as const };
    } else if (orientation === 'horizontal') {
      // Flip content back for horizontal
      return { transform: 'rotateX(180deg)' };
    } else if (orientation === 'both') {
      // For both orientations, only reset text direction
      // No transform needed since we'll use custom horizontal scrollbar
      return { direction: 'ltr' as const };
    }
    return {};
  })() : {};

  const contentStyles = {
    ...getScrollableContentStyles(
      orientation,
      animationsEnabled,
      false, // Never hide native scrollbars
      smoothScrolling,
      momentum,
      Boolean(disabled)
    ),
    ...containerDirectionStyles
  };
  
  const needsVerticalScrollbar = isScrollingNeeded(scrollState.scrollHeight, scrollState.clientHeight);
  const needsHorizontalScrollbar = isScrollingNeeded(scrollState.scrollWidth, scrollState.clientWidth);
  
  const verticalThumbSize = calculateThumbSize(scrollState.scrollHeight, scrollState.clientHeight);
  const horizontalThumbSize = calculateThumbSize(scrollState.scrollWidth, scrollState.clientWidth);
  
  // Calculate base thumb positions
  const baseVerticalThumbPosition = calculateThumbPosition(
    scrollState.scrollTop,
    scrollState.scrollHeight,
    scrollState.clientHeight,
    verticalThumbSize
  );
  
  const baseHorizontalThumbPosition = calculateThumbPosition(
    scrollState.scrollLeft,
    scrollState.scrollWidth,
    scrollState.clientWidth,
    horizontalThumbSize
  );
  
  // Adjust thumb positions when indicators are shown to prevent overlap
  const verticalThumbPosition = showIndicators ? 
    baseVerticalThumbPosition * 0.85 : // Scale down range to leave space for indicators
    baseVerticalThumbPosition;
    
  const horizontalThumbPosition = showIndicators ?
    baseHorizontalThumbPosition * 0.85 : // Scale down range to leave space for indicators
    baseHorizontalThumbPosition;
  
  // Custom scrollbar track styles
  const verticalTrackStyles = getCustomScrollbarTrackStyles(
    'vertical',
    color,
    customColor,
    variant,
    size,
    shape,
    alignment,
    Boolean(disabled),
    animationsEnabled,
    cssVars,
    showIndicators
  );

  const horizontalTrackStyles = getCustomScrollbarTrackStyles(
    'horizontal',
    color,
    customColor,
    variant,
    size,
    shape,
    alignment,
    Boolean(disabled),
    animationsEnabled,
    cssVars,
    showIndicators
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
    animationsEnabled,
    cssVars,
    showIndicators
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
    animationsEnabled,
    cssVars,
    showIndicators
  );
  
  const combinedStyles: React.CSSProperties = {
    ...containerStyles,
    ...style,
  };
  
  // Handle webkit scrollbar styles via CSS injection
  const webkitStyles = getWebKitScrollbarStyles(
    color,
    customColor,
    variant,
    size,
    shape,
    orientation,
    visibility,
    alignment,
    Boolean(disabled),
    animationsEnabled,
    cssVars
  );
  
  useEffect(() => {
    // Apply webkit styles when using native scrollbar (both 'end' and 'start' alignments)
    if (supportsWebKitScrollbar()) {
      // Apply custom webkit scrollbar styles for both alignments
      let css = createWebkitScrollbarCSS(uniqueId, webkitStyles);

      // For both + start case, no special horizontal scrollbar handling needed

      if (css) {
        injectCSS(uniqueId, css);
      }
    }

    return () => {
      cleanupCSS(uniqueId);
    };
  }, [uniqueId, color, customColor, variant, size, shape, orientation, visibility, alignment, disabled, animationsEnabled, cssVars, isStartBothCase]);
  
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
      id={uniqueId}
      {...ariaAttributes}
      {...rest}
    >
      {/* Use standard structure for all cases */}
      <div
        ref={containerRef}
        style={contentStyles}
        onScroll={handleScroll}
        tabIndex={disabled ? -1 : 0}
      >
        <div ref={contentRef} style={contentDirectionStyles}>
          {children}
        </div>
      </div>
      
      {/* Custom vertical scrollbar - only show if webkit is not supported */}
      {!supportsWebKitScrollbar() && needsVerticalScrollbar && (orientation === 'vertical' || orientation === 'both') && variant !== 'invisible' && (
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
            onMouseDown={(e) => handleThumbMouseDown(e, 'vertical')}
          />
        </div>
      )}
      
      {/* Custom horizontal scrollbar - only show if webkit is not supported */}
      {!supportsWebKitScrollbar() && needsHorizontalScrollbar && (orientation === 'horizontal' || orientation === 'both') && variant !== 'invisible' && (
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
            onMouseDown={(e) => handleThumbMouseDown(e, 'horizontal')}
          />
        </div>
      )}
      
      {/* Scroll indicators - Arrow icons in the track */}
      {showIndicators && needsVerticalScrollbar && (orientation === 'vertical' || orientation === 'both') && variant !== 'invisible' && (
        <>
          {/* Top indicator */}
          <div
            style={getScrollIndicatorStyles(
              'vertical',
              color,
              customColor,
              size,
              'top',
              scrollState.scrollTop > 0,
              Boolean(disabled),
              animationsEnabled,
              cssVars,
              alignment,
              variant
            )}
            onClick={() => {
              if (containerRef.current && !disabled) {
                containerRef.current.scrollTop = Math.max(0, scrollState.scrollTop - 100);
              }
            }}
          >
            <Icon 
              name="NavArrowUpSolid" 
              size={size === 'xs' ? 12 : size === 'sm' ? 14 : size === 'md' ? 16 : size === 'lg' ? 18 : 20}
              style={{ 
                transform: 'rotate(0deg)',
                opacity: scrollState.scrollTop > 0 ? 1 : 0.3
              }}
            />
          </div>
          {/* Bottom indicator */}
          <div
            style={getScrollIndicatorStyles(
              'vertical',
              color,
              customColor,
              size,
              'bottom',
              scrollState.scrollTop < scrollState.scrollHeight - scrollState.clientHeight,
              Boolean(disabled),
              animationsEnabled,
              cssVars,
              alignment,
              variant
            )}
            onClick={() => {
              if (containerRef.current && !disabled) {
                containerRef.current.scrollTop = Math.min(
                  scrollState.scrollHeight - scrollState.clientHeight,
                  scrollState.scrollTop + 100
                );
              }
            }}
          >
            <Icon 
              name="NavArrowUpSolid" 
              size={size === 'xs' ? 12 : size === 'sm' ? 14 : size === 'md' ? 16 : size === 'lg' ? 18 : 20}
              style={{ 
                transform: 'rotate(180deg)',
                opacity: scrollState.scrollTop < scrollState.scrollHeight - scrollState.clientHeight ? 1 : 0.3
              }}
            />
          </div>
        </>
      )}
      
      {/* Horizontal scroll indicators */}
      {showIndicators && needsHorizontalScrollbar && (orientation === 'horizontal' || orientation === 'both') && variant !== 'invisible' && (
        <>
          {/* Left indicator */}
          <div
            style={getScrollIndicatorStyles(
              'horizontal',
              color,
              customColor,
              size,
              'left',
              scrollState.scrollLeft > 0,
              Boolean(disabled),
              animationsEnabled,
              cssVars,
              alignment,
              variant
            )}
            onClick={() => {
              if (containerRef.current && !disabled) {
                containerRef.current.scrollLeft = Math.max(0, scrollState.scrollLeft - 100);
              }
            }}
          >
            <Icon 
              name="NavArrowUpSolid" 
              size={size === 'xs' ? 12 : size === 'sm' ? 14 : size === 'md' ? 16 : size === 'lg' ? 18 : 20}
              style={{ 
                transform: 'rotate(-90deg)',
                opacity: scrollState.scrollLeft > 0 ? 1 : 0.3
              }}
            />
          </div>
          {/* Right indicator */}
          <div
            style={getScrollIndicatorStyles(
              'horizontal',
              color,
              customColor,
              size,
              'right',
              scrollState.scrollLeft < scrollState.scrollWidth - scrollState.clientWidth,
              Boolean(disabled),
              animationsEnabled,
              cssVars,
              alignment,
              variant
            )}
            onClick={() => {
              if (containerRef.current && !disabled) {
                containerRef.current.scrollLeft = Math.min(
                  scrollState.scrollWidth - scrollState.clientWidth,
                  scrollState.scrollLeft + 100
                );
              }
            }}
          >
            <Icon 
              name="NavArrowUpSolid" 
              size={size === 'xs' ? 12 : size === 'sm' ? 14 : size === 'md' ? 16 : size === 'lg' ? 18 : 20}
              style={{ 
                transform: 'rotate(90deg)',
                opacity: scrollState.scrollLeft < scrollState.scrollWidth - scrollState.clientWidth ? 1 : 0.3
              }}
            />
          </div>
        </>
      )}
    </div>
  );
});

Scrollbar.displayName = 'Scrollbar';
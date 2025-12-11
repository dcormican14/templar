'use client';

import React, { forwardRef, useState } from 'react';
import { useCSSVariables } from '../../../providers';
import { Divider } from '../../../components/atoms/Divider/Divider';
import { Icon } from '../../../components/atoms/Icon/Icon';
import type { NavigationProps, NavigationTabProps, NavigationBrandProps } from './Navigation.types';
import {
  createNavigationStyles,
  createBrandStyles,
  createTabStyles,
  createTabUnderlineStyles,
  createTabHoverStyles,
  createContentAreaStyles,
  createTabsContainerStyles,
  createContainerStyles,
} from './Navigation.styles';

// Brand/Logo Component
const NavigationBrand = forwardRef<HTMLDivElement, NavigationBrandProps>(
  ({ icon, appName, onClick, size }, ref) => {
    const cssVars = useCSSVariables();
    
    const brandStyles = createBrandStyles(size, cssVars);

    if (!icon && !appName) return null;

    return (
      <div
        ref={ref}
        style={brandStyles}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={onClick ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        } : undefined}
      >
        {icon && (
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            {icon}
          </div>
        )}
        {appName && (
          <span style={{ 
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            height: '100%'
          }}>
            {appName}
          </span>
        )}
      </div>
    );
  }
);

NavigationBrand.displayName = 'NavigationBrand';

// Tab Component
const NavigationTab = forwardRef<HTMLButtonElement, NavigationTabProps>(
  ({ tab, isActive, onSelect, size, color = 'primary', customColor }, ref) => {
    const cssVars = useCSSVariables();
    const [isHovered, setIsHovered] = useState(false);

    const tabStyles = createTabStyles(isActive, size, color, customColor, cssVars);
    const underlineStyles = createTabUnderlineStyles(isActive, cssVars);
    const hoverStyles = isHovered && !isActive ? createTabHoverStyles(color, customColor, cssVars) : {};
    const hoverUnderlineStyles = isHovered && !isActive ? { width: '100%', opacity: 0.3 } : {};

    const handleClick = () => {
      if (!tab.disabled) {
        if (tab.onClick) {
          tab.onClick();
        }
        onSelect(tab.id);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && !tab.disabled) {
        e.preventDefault();
        handleClick();
      }
    };

    const handleMouseEnter = (e: React.MouseEvent) => {
      // Only set hover if the mouse is actually over the element
      if (e.currentTarget === e.target || e.currentTarget.contains(e.target as Node)) {
        setIsHovered(true);
      }
    };

    const handleMouseLeave = (e: React.MouseEvent) => {
      // Only clear hover if the mouse is actually leaving the element
      if (e.currentTarget === e.target || !e.currentTarget.contains(e.relatedTarget as Node)) {
        setIsHovered(false);
      }
    };

    return (
      <button
        ref={ref}
        style={{ 
          ...tabStyles, 
          ...hoverStyles,
          opacity: tab.disabled ? 0.5 : 1,
          cursor: tab.disabled ? 'not-allowed' : 'pointer',
        }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        disabled={tab.disabled}
        aria-selected={isActive}
        role="tab"
      >
        {tab.icon && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {tab.icon}
          </div>
        )}
        
        {/* Fixed-width centered text container */}
        <div style={{ 
          width: '120px', // Increased from 80px to 120px for wider text area
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          overflow: 'hidden'
        }}>
          <span style={{ 
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%'
          }}>
            {tab.label}
          </span>
        </div>
        
        {tab.badge && (
          <div
            style={{
              backgroundColor: cssVars.primary,
              color: cssVars.primaryForeground,
              borderRadius: '10px',
              padding: '2px 6px',
              fontSize: '11px',
              fontWeight: '600',
              minWidth: '18px',
              height: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {tab.badge}
          </div>
        )}
        
        {/* Active underline */}
        <div style={underlineStyles} />
        
        {/* Hover underline - only show when not active */}
        {!isActive && (
          <div 
            style={{
              ...underlineStyles,
              ...hoverUnderlineStyles,
              backgroundColor: cssVars.getColorWithOpacity('primary', 0.3),
            }} 
          />
        )}
      </button>
    );
  }
);

NavigationTab.displayName = 'NavigationTab';

// Main Navigation Component
export const Navigation = forwardRef<HTMLElement, NavigationProps>(
  ({
    icon,
    appName,
    onBrandClick,
    tabs = [],
    activeTab,
    onTabChange,
    leadingContent,
    trailingContent,
    variant = 'default',
    color = 'primary',
    customColor,
    size = 'md',
    sticky = false,
    fullWidth = false,
    maxWidth,
    className,
    style,
    ...props
  }, ref) => {
    const cssVars = useCSSVariables();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [hasOverflow, setHasOverflow] = useState(false);
    const tabsContainerRef = React.useRef<HTMLDivElement>(null);

    // Check if screen is mobile or if tabs overflow
    React.useEffect(() => {
      const checkLayout = () => {
        const windowWidth = window.innerWidth;
        const tabCount = tabs.length;

        // Determine if mobile based on tab count and window width
        let shouldUseMobileMenu = false;

        if (tabCount >= 4) {
          // 4+ tabs: use mobile menu below 1024px
          shouldUseMobileMenu = windowWidth < 1024;
        } else {
          // 3 or fewer tabs: use mobile menu below 768px
          shouldUseMobileMenu = windowWidth < 768;
        }

        // Also check for actual overflow on larger screens
        let tabsOverflow = false;
        if (tabsContainerRef.current && !shouldUseMobileMenu) {
          const container = tabsContainerRef.current;
          // Check if content is wider than available space
          tabsOverflow = container.scrollWidth > container.clientWidth;
        }

        setIsMobile(shouldUseMobileMenu);
        setHasOverflow(tabsOverflow);
      };

      checkLayout();
      window.addEventListener('resize', checkLayout);

      // Also check on mount and when tabs change
      const timeoutId = setTimeout(checkLayout, 100);

      return () => {
        window.removeEventListener('resize', checkLayout);
        clearTimeout(timeoutId);
      };
    }, [tabs]);

    const navigationStyles = createNavigationStyles(variant, color, customColor, size, sticky, cssVars);
    const containerStyles = createContainerStyles(fullWidth, maxWidth);
    const contentAreaStyles = createContentAreaStyles();

    const handleTabSelect = (tabId: string) => {
      if (onTabChange) {
        onTabChange(tabId);
      }
      // Close mobile menu after selection
      setIsMobileMenuOpen(false);
    };

    return (
      <nav
        ref={ref}
        className={className}
        style={{ ...navigationStyles, ...style, position: 'relative' }}
        role="navigation"
        {...props}
      >
        <div style={containerStyles}>
          {/* Left third: Brand centered */}
          <div style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <NavigationBrand
              icon={icon}
              appName={appName}
              onClick={onBrandClick}
              size={size}
            />
          </div>

          {/* Middle third: Tabs and Leading Content - Desktop only (when no overflow) */}
          {!isMobile && !hasOverflow && (
            <div style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '16px'
            }}>
              {/* Leading Content */}
              {leadingContent && (
                <div style={contentAreaStyles}>
                  {leadingContent}
                </div>
              )}

              {/* Tabs */}
              {tabs.length > 0 && (
                <div
                  ref={tabsContainerRef}
                  style={{
                    ...createTabsContainerStyles(),
                  }}
                  role="tablist"
                >
                  {tabs.map((tab, index) => (
                    <React.Fragment key={tab.id}>
                      <NavigationTab
                        tab={tab}
                        isActive={activeTab === tab.id}
                        onSelect={handleTabSelect}
                        size={size}
                        color={color}
                        customColor={customColor}
                      />
                      {/* Add vertical divider between tabs (not after the last one) */}
                      {index < tabs.length - 1 && (
                        <Divider
                          orientation="vertical"
                          variant="outline"
                          rounded
                          size="sm"
                          spacing="xs"
                          style={{
                            height: '60%', // Adjust height relative to tab height
                            alignSelf: 'center', // Center the divider vertically
                          }}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Mobile or Overflow: Hamburger menu button */}
          {(isMobile || hasOverflow) && tabs.length > 0 && (
            <div style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingLeft: '16px'
            }}>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: cssVars.foreground,
                  transition: 'transform 0.3s ease, opacity 0.2s ease'
                }}
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      animation: isMobileMenuOpen ? 'iconFadeOut 0.2s ease forwards' : 'iconFadeIn 0.2s ease forwards',
                      transform: isMobileMenuOpen ? 'rotate(90deg) scale(0.8)' : 'rotate(0deg) scale(1)',
                      transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      opacity: isMobileMenuOpen ? 0 : 1
                    }}
                  >
                    <Icon name="Menu" size="lg" />
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      animation: isMobileMenuOpen ? 'iconFadeIn 0.2s ease forwards' : 'iconFadeOut 0.2s ease forwards',
                      transform: isMobileMenuOpen ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0.8)',
                      transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      opacity: isMobileMenuOpen ? 1 : 0
                    }}
                  >
                    <Icon name="Xmark" size="lg" />
                  </div>
                </div>
              </button>
            </div>
          )}

          {/* Right third: Trailing Content centered */}
          <div style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {trailingContent && (
              <div style={contentAreaStyles}>
                {trailingContent}
              </div>
            )}
          </div>
        </div>

        {/* Mobile or Overflow Menu Dropdown */}
        {(isMobile || hasOverflow) && isMobileMenuOpen && tabs.length > 0 && (
          <div
            onClick={() => console.log('Dropdown container clicked')}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: cssVars.getColorWithOpacity('background', 0.9),
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderTop: `1px solid ${cssVars.getColorWithOpacity('border', 0.5)}`,
              boxShadow: `0 8px 16px ${cssVars.getColorWithOpacity('background-shadow', 0.25)}`,
              zIndex: 10000,
              maxHeight: '70vh',
              overflowY: 'auto',
              pointerEvents: 'auto'
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={(e) => {
                  console.log('Mobile menu button clicked:', tab.id);
                  e.preventDefault();
                  e.stopPropagation();
                  if (!tab.disabled) {
                    if (tab.onClick) {
                      tab.onClick();
                    }
                    handleTabSelect(tab.id);
                  }
                }}
                disabled={tab.disabled}
                style={{
                  width: '100%',
                  padding: '16px 24px',
                  border: 'none',
                  borderBottom: `1px solid ${cssVars.border}40`,
                  backgroundColor: activeTab === tab.id
                    ? `${cssVars.primary}20`
                    : 'transparent',
                  color: activeTab === tab.id ? cssVars.primary : cssVars.foreground,
                  textAlign: 'left',
                  cursor: tab.disabled ? 'not-allowed' : 'pointer',
                  opacity: tab.disabled ? 0.5 : 1,
                  fontSize: '16px',
                  fontWeight: activeTab === tab.id ? '600' : '400',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.2s ease',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  pointerEvents: 'auto',
                  userSelect: 'none',
                  WebkitTapHighlightColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (!tab.disabled && activeTab !== tab.id) {
                    e.currentTarget.style.backgroundColor = `${cssVars.backgroundHover}60`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!tab.disabled && activeTab !== tab.id) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
                onTouchStart={(e) => {
                  if (!tab.disabled && activeTab !== tab.id) {
                    e.currentTarget.style.backgroundColor = `${cssVars.backgroundHover}60`;
                  }
                }}
                onTouchEnd={(e) => {
                  if (!tab.disabled && activeTab !== tab.id) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {tab.icon && <div style={{ pointerEvents: 'none' }}>{tab.icon}</div>}
                <span style={{ pointerEvents: 'none' }}>{tab.label}</span>
                {tab.badge && (
                  <div
                    style={{
                      backgroundColor: cssVars.primary,
                      color: cssVars.primaryForeground,
                      borderRadius: '10px',
                      padding: '2px 8px',
                      fontSize: '12px',
                      fontWeight: '600',
                      marginLeft: 'auto',
                      pointerEvents: 'none'
                    }}
                  >
                    {tab.badge}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </nav>
    );
  }
);

Navigation.displayName = 'Navigation';

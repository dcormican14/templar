'use client';

import React, { forwardRef, useState } from 'react';
import { useCSSVariables } from '../../../providers';
import { Divider } from '../../../components/atoms/Divider/Divider';
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
  ({ tab, isActive, onSelect, size }, ref) => {
    const cssVars = useCSSVariables();
    const [isHovered, setIsHovered] = useState(false);
    
    const tabStyles = createTabStyles(isActive, size, cssVars);
    const underlineStyles = createTabUnderlineStyles(isActive, cssVars);
    const hoverStyles = isHovered && !isActive ? createTabHoverStyles(cssVars) : {};
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
    size = 'md',
    sticky = false,
    fullWidth = false,
    maxWidth,
    className,
    style,
    // Filter out interactive config props that shouldn't be passed to DOM
    disabled,
    loading,
    showBrand,
    showBrandIcon,
    tabCount,
    showTabIcons,
    showTabBadges,
    tab1Label,
    tab1Badge,
    tab1Disabled,
    tab2Label,
    tab2Badge,
    tab2Disabled,
    tab3Label,
    tab3Badge,
    tab3Disabled,
    tab4Label,
    tab4Badge,
    tab4Disabled,
    tab5Label,
    tab5Badge,
    tab5Disabled,
    showLeadingContent,
    leadingContentType,
    showTrailingContent,
    trailingContentType,
    _navigationComputed,
    ...props
  }, ref) => {
    const cssVars = useCSSVariables();

    const navigationStyles = createNavigationStyles(variant, size, sticky, cssVars);
    const containerStyles = createContainerStyles(fullWidth, maxWidth);
    const contentAreaStyles = createContentAreaStyles();

    const handleTabSelect = (tabId: string) => {
      if (onTabChange) {
        onTabChange(tabId);
      }
    };

    return (
      <nav
        ref={ref}
        className={className}
        style={{ ...navigationStyles, ...style }}
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

          {/* Middle third: Tabs and Leading Content */}
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
      </nav>
    );
  }
);

Navigation.displayName = 'Navigation';

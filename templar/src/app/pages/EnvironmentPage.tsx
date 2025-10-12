'use client';

import React, { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CollapsibleMenu } from '../components/molecules/CollapsibleMenu/CollapsibleMenu';
import { Icon } from '../components/atoms';
import { useCSSVariables } from '../providers';
import { EnvironmentShowcase } from '../components/EnvironmentShowcase/EnvironmentShowcase';

const configurationItems = [
  '.mourn Configuration'
];

const providers = [
  'ThemeProvider',
  'AuthProvider',
  'ToastProvider',
  'LoadingProvider',
  'ModalProvider',
  'SettingsProvider',
  'RoundTable'
];

export function EnvironmentPage() {
  const cssVars = useCSSVariables();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [menuCollapsed, setMenuCollapsed] = useState(false);

  // Get selected item directly from URL
  const getSelectedItemFromURL = () => {
    const itemParam = searchParams.get('provider');
    if (!itemParam) return null;

    // Check if it's a configuration item first
    // Handle both '.mourn-configuration' and '.mourn configuration' formats
    const normalizedParam = itemParam.toLowerCase().replace(/-/g, ' ');
    const configMatch = configurationItems.find(item =>
      item.toLowerCase() === normalizedParam ||
      item.toLowerCase().replace(/\s+/g, '-') === itemParam.toLowerCase()
    );
    if (configMatch) return configMatch;

    // Then check providers
    const providerMatch = providers.find(prov =>
      prov.toLowerCase() === itemParam.toLowerCase()
    );

    return providerMatch || null;
  };

  const selectedItem = getSelectedItemFromURL();

  // Handle item selection from UI - only update URL
  const handleItemSelect = useCallback((item: string) => {
    const params = new URLSearchParams();
    params.set('provider', item.toLowerCase().replace(/\s+/g, '-'));
    router.push(`/environment?${params.toString()}`, { scroll: false });
  }, [router]);

  const renderProviderTree = () => {
    const renderItem = (item: string, icon: string) => (
      <button
        key={item}
        onClick={() => handleItemSelect(item)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          background: selectedItem === item
            ? cssVars.primaryBackground
            : 'transparent',
          color: selectedItem === item
            ? cssVars.primary
            : cssVars.foreground,
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: selectedItem === item ? '500' : '400',
          textAlign: 'left',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          if (selectedItem !== item) {
            e.currentTarget.style.backgroundColor = cssVars.backgroundHover;
          }
        }}
        onMouseLeave={(e) => {
          if (selectedItem !== item) {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        <Icon name={icon as any} size="sm" />
        {item}
      </button>
    );

    return (
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Configuration Section */}
        <div>
          <h3
            style={{
              color: cssVars.foreground,
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '12px'
            }}
          >
            Configuration
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {configurationItems.map(item => renderItem(item, 'DatabaseSettings'))}
          </div>
        </div>

        {/* Providers Section */}
        <div>
          <h3
            style={{
              color: cssVars.foreground,
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '12px'
            }}
          >
            Providers
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {providers.map(provider => renderItem(provider, 'Settings'))}
          </div>
        </div>
      </div>
    );
  };

  const renderMainContent = () => {
    if (!selectedItem) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            textAlign: 'center',
            padding: '40px',
          }}
        >
          <Icon name="Settings" size="xl" style={{ color: cssVars.foregroundAccent, marginBottom: '24px' }} />
          <h2 style={{ color: cssVars.foreground, fontSize: '24px', fontWeight: '600', marginBottom: '12px' }}>
            Select a Configuration or Provider
          </h2>
          <p style={{ color: cssVars.foregroundAccent, fontSize: '16px', maxWidth: '400px' }}>
            Choose an item from the sidebar to view its documentation, configuration options, and usage examples.
          </p>
        </div>
      );
    }

    return <EnvironmentShowcase key={selectedItem} providerName={selectedItem} />;
  };

  return (
    <div style={{
      display: 'flex',
      height: 'calc(100vh - 48px)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Collapsible Menu */}
      <CollapsibleMenu
        collapsed={menuCollapsed}
        onToggle={setMenuCollapsed}
        expandedWidth="280px"
        collapsedWidth="34px"
        position="left"
        style={{
          borderRight: `1px solid ${cssVars.border}`,
          backgroundColor: cssVars.background,
          height: '100%',
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        {renderProviderTree()}
      </CollapsibleMenu>

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          backgroundColor: cssVars.background,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {renderMainContent()}
      </div>
    </div>
  );
}

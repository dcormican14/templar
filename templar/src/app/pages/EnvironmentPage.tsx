'use client';

import React, { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CollapsibleMenu } from '../components/molecules/CollapsibleMenu/CollapsibleMenu';
import { Icon, Button, CodeBlock, Scrollbar } from '../components/atoms';
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

const aiDocItems = [
  'AI Documentation'
];

export function EnvironmentPage() {
  const cssVars = useCSSVariables();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Detect mobile and collapse menu by default on mobile
  const [menuCollapsed, setMenuCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768; // Collapse on mobile by default
    }
    return false;
  });

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

    // Check AI doc items
    const aiDocMatch = aiDocItems.find(item =>
      item.toLowerCase() === normalizedParam ||
      item.toLowerCase().replace(/\s+/g, '-') === itemParam.toLowerCase()
    );
    if (aiDocMatch) return aiDocMatch;

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

        {/* AI Documentation Section */}
        <div>
          <h3
            style={{
              color: cssVars.foreground,
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '12px'
            }}
          >
            AI Integration
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {aiDocItems.map(item => renderItem(item, 'BrainResearch'))}
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

    if (selectedItem === 'AI Documentation') {
      return <AiDocumentationShowcase />;
    }

    return <EnvironmentShowcase key={selectedItem} providerName={selectedItem} />;
  };

  return (
    <div style={{
      display: 'flex',
      height: 'calc(100dvh - 48px)',
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

function AiDocumentationShowcase() {
  const cssVars = useCSSVariables();
  const [componentSlugs, setComponentSlugs] = React.useState<{ name: string; slug: string; category: string }[]>([]);

  const baseUrl = typeof window !== 'undefined'
    ? `${window.location.protocol}//${window.location.host}`
    : 'https://your-domain.com';

  React.useEffect(() => {
    fetch('/api/llms-components')
      .then((r) => r.json())
      .then(setComponentSlugs)
      .catch(() => {});
  }, []);

  const endpoints = [
    {
      path: '/llms.txt',
      label: 'Manifest',
      description: 'Index of all available documentation endpoints. Start here.',
      icon: 'List' as const,
      color: cssVars.primary,
    },
    {
      path: '/llms-full.txt',
      label: 'Full Context',
      description: 'All documentation concatenated into a single file — ideal for pasting into an AI chat or using as system context.',
      icon: 'BookStack' as const,
      color: cssVars.secondary,
    },
    {
      path: '/llms/design-standards.txt',
      label: 'Design Standards',
      description: 'Color system, sizing scale, spacing, typography, and accessibility guidelines.',
      icon: 'Palette' as const,
      color: cssVars.warning,
    },
    {
      path: '/llms/css-variables.txt',
      label: 'CSS Variables',
      description: 'Complete reference for all 80+ CSS variables across every built-in theme.',
      icon: 'Code' as const,
      color: cssVars.info,
    },
    {
      path: '/llms/element-library-overview.txt',
      label: 'Component Overview',
      description: 'Props, variants, and usage patterns for all atomic and molecule components.',
      icon: 'Component' as const,
      color: cssVars.success,
    },
    {
      path: '/llms/mourn-configuration.txt',
      label: 'Mourn Configuration',
      description: 'How to configure providers, themes, and features via .mourn files.',
      icon: 'DatabaseSettings' as const,
      color: cssVars.primary,
    },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        borderBottom: `1px solid ${cssVars.border}`,
        padding: '20px 32px',
        backgroundColor: cssVars.background,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Icon name="BrainResearch" size="lg" style={{ color: cssVars.primary }} />
          <div>
            <h1 style={{ color: cssVars.foreground, fontSize: '24px', fontWeight: '700', margin: 0 }}>
              AI Documentation
            </h1>
            <p style={{ color: cssVars.foregroundAccent, fontSize: '14px', margin: 0 }}>
              Machine-readable docs following the llms.txt standard
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <Scrollbar
        variant="ghost"
        color="secondary"
        size="md"
        shape="round"
        orientation="vertical"
        visibility="hover"
        smoothScrolling
        showIndicators
        animate
        height="100%"
        style={{ flex: 1, height: '100%' }}
      >
      <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

        {/* Intro */}
        <div style={{
          padding: '20px 24px',
          borderRadius: '12px',
          border: `1px solid ${cssVars.border}`,
          backgroundColor: cssVars.card,
          display: 'flex',
          gap: '16px',
          alignItems: 'flex-start',
        }}>
          <Icon name="InfoCircle" size="md" style={{ color: cssVars.info, flexShrink: 0, marginTop: '2px' }} />
          <div>
            <p style={{ color: cssVars.foreground, margin: '0 0 8px 0', fontWeight: '500' }}>
              Templar ships with <a href="https://llmstxt.org" target="_blank" rel="noopener noreferrer" style={{ color: cssVars.primary }}>llms.txt</a> support — a standard for making documentation AI-readable.
            </p>
            <p style={{ color: cssVars.foregroundAccent, margin: 0, fontSize: '14px' }}>
              Point any AI tool at <code style={{ backgroundColor: cssVars.backgroundAccent, padding: '1px 6px', borderRadius: '4px', fontSize: '13px' }}>{baseUrl}/llms.txt</code> or fetch <code style={{ backgroundColor: cssVars.backgroundAccent, padding: '1px 6px', borderRadius: '4px', fontSize: '13px' }}>/llms-full.txt</code> for a single-file context dump covering every component, design standard, and configuration option.
            </p>
          </div>
        </div>

        {/* Endpoint cards */}
        <div>
          <h2 style={{ color: cssVars.foreground, fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0' }}>
            Available Endpoints
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
            {endpoints.map((ep) => (
              <a
                key={ep.path}
                href={ep.path}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <div
                  style={{
                    padding: '20px',
                    borderRadius: '10px',
                    border: `1px solid ${cssVars.border}`,
                    backgroundColor: cssVars.card,
                    cursor: 'pointer',
                    transition: 'border-color 0.2s ease',
                    height: '100%',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = ep.color; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = cssVars.border; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <Icon name={ep.icon} size="sm" style={{ color: ep.color }} />
                    <span style={{ color: cssVars.foreground, fontWeight: '600', fontSize: '15px' }}>{ep.label}</span>
                  </div>
                  <p style={{ color: cssVars.foregroundAccent, fontSize: '13px', margin: '0 0 12px 0', lineHeight: '1.5' }}>
                    {ep.description}
                  </p>
                  <code style={{
                    display: 'block',
                    fontSize: '12px',
                    color: ep.color,
                    backgroundColor: cssVars.backgroundAccent,
                    padding: '4px 8px',
                    borderRadius: '4px',
                    wordBreak: 'break-all',
                  }}>
                    {baseUrl}{ep.path}
                  </code>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Per-component endpoints */}
        <div>
          <h2 style={{ color: cssVars.foreground, fontSize: '18px', fontWeight: '600', margin: '0 0 8px 0' }}>
            Per-Component Endpoints
          </h2>
          <p style={{ color: cssVars.foregroundAccent, fontSize: '14px', margin: '0 0 16px 0' }}>
            Each component has its own endpoint at <code style={{ backgroundColor: cssVars.backgroundAccent, padding: '1px 6px', borderRadius: '4px', fontSize: '13px' }}>/llms/[component].txt</code>
          </p>
          <div style={{
            padding: '16px 20px',
            borderRadius: '10px',
            border: `1px solid ${cssVars.border}`,
            backgroundColor: cssVars.card,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
          }}>
            {componentSlugs.length === 0 ? (
              <span style={{ color: cssVars.foregroundAccent, fontSize: '13px' }}>Loading...</span>
            ) : componentSlugs.map((comp) => (
              <a
                key={comp.slug}
                href={`/llms/${comp.slug}.txt`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '13px',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  backgroundColor: cssVars.backgroundAccent,
                  color: comp.category === 'atom' ? cssVars.primary : cssVars.secondary,
                  textDecoration: 'none',
                  border: `1px solid ${cssVars.border}`,
                  transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = cssVars.primaryBackground; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = cssVars.backgroundAccent; }}
              >
                {comp.name}
              </a>
            ))}
          </div>
        </div>

        {/* Usage example */}
        <div>
          <h2 style={{ color: cssVars.foreground, fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0' }}>
            How to Use
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'In Claude or any AI chat', code: `Fetch ${baseUrl}/llms-full.txt and use it as context for this project.` },
              { label: 'In an LLM application', code: `const docs = await fetch('${baseUrl}/llms-full.txt').then(r => r.text());\n// Pass docs as system prompt context` },
              { label: 'Single component', code: `fetch('${baseUrl}/llms/button.txt')` },
            ].map(({ label, code }) => (
              <div key={label} style={{
                borderRadius: '10px',
                border: `1px solid ${cssVars.border}`,
                backgroundColor: cssVars.card,
                overflow: 'hidden',
              }}>
                <div style={{
                  padding: '10px 16px',
                  borderBottom: `1px solid ${cssVars.border}`,
                  backgroundColor: cssVars.backgroundAccent,
                  fontSize: '13px',
                  fontWeight: '500',
                  color: cssVars.foregroundAccent,
                }}>
                  {label}
                </div>
                <div style={{ padding: '16px' }}>
                  <CodeBlock language="text" size="sm" copyable variant="glassmorphic" color="primary">
                    {code}
                  </CodeBlock>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      </Scrollbar>
    </div>
  );
}

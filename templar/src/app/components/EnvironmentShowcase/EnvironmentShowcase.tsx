'use client';

import React, { useState } from 'react';
import { useCSSVariables } from '../../providers';
import { ReadmeDisplay } from '../molecules/ReadmeDisplay/ReadmeDisplay';
import { Scrollbar, Icon, SegmentedControl, CodeBlock } from '../atoms';
import { getProviderDocumentation, getProviderConfig } from './providerConfigs';

interface EnvironmentShowcaseProps {
  providerName: string;
}

export function EnvironmentShowcase({ providerName }: EnvironmentShowcaseProps) {
  const cssVars = useCSSVariables();
  const [activeTab, setActiveTab] = useState<'overview' | 'config'>('overview');

  const documentation = getProviderDocumentation(providerName);
  const configExample = getProviderConfig(providerName);

  const handleModeChange = (mode: 'overview' | 'config') => {
    setActiveTab(mode);
  };

  const renderOverview = () => {
    return (
      <div style={{
        padding: '32px',
        maxWidth: 'none',
        textAlign: 'left'
      }}>
        <ReadmeDisplay
          content={documentation}
          loading={false}
        />
      </div>
    );
  };

  const renderConfig = () => {
    return (
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Config Example */}
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          backgroundColor: cssVars.card,
          borderRadius: '12px',
          border: `1px solid ${cssVars.border}`,
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '16px 24px',
            borderBottom: `1px solid ${cssVars.border}`,
            backgroundColor: cssVars.backgroundAccent,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Icon name="Code" size="sm" style={{ color: cssVars.foreground }} />
            <h4 style={{
              margin: 0,
              fontSize: '18px',
              fontWeight: '600',
              color: cssVars.foreground
            }}>
              Configuration Example
            </h4>
          </div>
          <div style={{ padding: '24px' }}>
            <CodeBlock
              language="tsx"
              size="sm"
              lineNumbers={true}
              copyable={true}
              color="primary"
              variant="glassmorphic"
              style={{ margin: 0 }}
            >
              {configExample}
            </CodeBlock>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div
        style={{
          borderBottom: `1px solid ${cssVars.border}`,
          padding: '20px 32px',
          backgroundColor: cssVars.background,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Icon
              name="Settings"
              size="lg"
              style={{ color: cssVars.primary }}
            />
            <div>
              <h1
                style={{
                  color: cssVars.foreground,
                  fontSize: '24px',
                  fontWeight: '700',
                  margin: 0
                }}
              >
                {providerName}
              </h1>
              <p
                style={{
                  color: cssVars.foregroundAccent,
                  fontSize: '14px',
                  margin: 0,
                }}
              >
                Provider Configuration
              </p>
            </div>
          </div>

          <SegmentedControl
            items={['Overview', 'Config']}
            selectedIndex={activeTab === 'overview' ? 0 : 1}
            onChange={(index) => handleModeChange(index === 0 ? 'overview' : 'config')}
            color="primary"
            shape="pill"
            variant="solid"
            animationMode="isometric"
            size="sm"
          />
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
        {activeTab === 'overview' ? renderOverview() : renderConfig()}
      </Scrollbar>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { CollapsibleMenu } from '../components/molecules/CollapsibleMenu/CollapsibleMenu';
import { Icon, Button } from '../components/atoms';
import { useCSSVariables } from '../providers';
import { ComponentShowcase } from '../components/ComponentShowcase/ComponentShowcase';
import { getAvailableComponents } from '../utils/componentUtils';

export function ComponentsPage() {
  const cssVars = useCSSVariables();
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  
  const components = getAvailableComponents();

  const renderComponentTree = () => {
    return (
      <div style={{ padding: '16px' }}>
        <h3 
          style={{ 
            color: cssVars.foreground, 
            fontSize: '16px', 
            fontWeight: '600',
            marginBottom: '16px'
          }}
        >
          Components
        </h3>
        
        {/* Atomic Components Section */}
        <div style={{ marginBottom: '24px' }}>
          <h4 
            style={{ 
              color: cssVars.foregroundAccent, 
              fontSize: '14px', 
              fontWeight: '500',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            Atomic Components
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {components.atoms.map(component => (
              <button
                key={component}
                onClick={() => setSelectedComponent(component)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  background: selectedComponent === component 
                    ? cssVars.primaryBackground 
                    : 'transparent',
                  color: selectedComponent === component 
                    ? cssVars.primary 
                    : cssVars.foreground,
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: selectedComponent === component ? '500' : '400',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (selectedComponent !== component) {
                    e.currentTarget.style.backgroundColor = cssVars.backgroundHover;
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedComponent !== component) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <Icon name="Component" size="sm" />
                {component}
              </button>
            ))}
          </div>
        </div>

        {/* Molecules Section */}
        {components.molecules.length > 0 && (
          <div>
            <h4 
              style={{ 
                color: cssVars.foregroundAccent, 
                fontSize: '14px', 
                fontWeight: '500',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              Molecule Components
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {components.molecules.map(component => (
                <button
                  key={component}
                  onClick={() => setSelectedComponent(component)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    background: selectedComponent === component 
                      ? cssVars.secondaryBackground 
                      : 'transparent',
                    color: selectedComponent === component 
                      ? cssVars.secondary 
                      : cssVars.foreground,
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: selectedComponent === component ? '500' : '400',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (selectedComponent !== component) {
                      e.currentTarget.style.backgroundColor = cssVars.backgroundHover;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedComponent !== component) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <Icon name="Atom" size="sm" />
                  {component}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderMainContent = () => {
    if (!selectedComponent) {
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
          <Icon name="Component" size="xl" style={{ color: cssVars.foregroundAccent, marginBottom: '24px' }} />
          <h2 style={{ color: cssVars.foreground, fontSize: '24px', fontWeight: '600', marginBottom: '12px' }}>
            Select a Component
          </h2>
          <p style={{ color: cssVars.foregroundAccent, fontSize: '16px', maxWidth: '400px' }}>
            Choose a component from the sidebar to view its documentation, interactive examples, and usage guidelines.
          </p>
        </div>
      );
    }

    return <ComponentShowcase componentName={selectedComponent} />;
  };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 48px)', overflow: 'hidden' }}>
      <CollapsibleMenu
        collapsed={menuCollapsed}
        onToggle={setMenuCollapsed}
        expandedWidth="280px"
        collapsedWidth="60px"
        position="left"
        style={{
          borderRight: `1px solid ${cssVars.border}`,
          backgroundColor: cssVars.background,
        }}
      >
        {renderComponentTree()}
      </CollapsibleMenu>
      
      <div 
        style={{ 
          flex: 1, 
          overflow: 'auto',
          backgroundColor: cssVars.background,
        }}
      >
        {renderMainContent()}
      </div>
    </div>
  );
}
'use client';

import React, { useState } from 'react';
import { useCSSVariables } from '../providers';
import { Card, Icon } from '../components/atoms';
import { Navigation } from '../components/molecules';

export function NavigationPage() {
  const cssVars = useCSSVariables();
  const [activeTab, setActiveTab] = useState('overview');

  const headingStyle = {
    color: cssVars.foreground
  };

  const mutedTextStyle = {
    color: cssVars.mutedForeground
  };

  const demoTabs = [
    { id: 'overview', label: 'Overview', icon: <Icon name="Home" size="sm" /> },
    { id: 'components', label: 'Components', icon: <Icon name="CompAlignLeft" size="sm" /> },
    { id: 'examples', label: 'Examples', icon: <Icon name="LightBulb" size="sm" /> },
    { id: 'api', label: 'API', icon: <Icon name="Settings" size="sm" /> }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2" style={headingStyle}>
        Navigation Component
      </h1>
      <p className="mb-8" style={mutedTextStyle}>
        Flexible navigation molecule component with tabs, brand area, and content slots.
      </p>

      {/* Live Demo */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" style={headingStyle}>Live Demo</h2>
        <Card className="p-6">
          <Navigation
            icon={<Icon name="Temple" size="lg" />}
            appName="Templar"
            tabs={demoTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            leadingContent={
              <div className="flex items-center gap-2">
                <span className="text-sm" style={mutedTextStyle}>v1.0.0</span>
              </div>
            }
            trailingContent={
              <div className="flex items-center gap-2">
                <button 
                  className="text-sm px-3 py-1 rounded"
                  style={{ 
                    backgroundColor: cssVars.primary,
                    color: cssVars.primaryForeground
                  }}
                >
                  Get Started
                </button>
              </div>
            }
          />
          
          <div className="mt-6 p-4 border rounded" style={{ borderColor: cssVars.border }}>
            <h3 className="font-semibold mb-2" style={headingStyle}>
              Active Tab: {demoTabs.find(tab => tab.id === activeTab)?.label}
            </h3>
            <p style={mutedTextStyle}>
              Content for the {activeTab} tab would be displayed here.
            </p>
          </div>
        </Card>
      </section>

      {/* Features */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" style={headingStyle}>Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-3" style={headingStyle}>🎯 Flexible Structure</h3>
            <ul className="space-y-2 text-sm" style={mutedTextStyle}>
              <li>• Brand area for logos/titles</li>
              <li>• Tab navigation with icons</li>
              <li>• Leading and trailing content slots</li>
              <li>• Vertical dividers between sections</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-3" style={headingStyle}>✨ Smooth Animations</h3>
            <ul className="space-y-2 text-sm" style={mutedTextStyle}>
              <li>• Hover state animations</li>
              <li>• Growing underline indicators</li>
              <li>• Cubic-bezier transitions</li>
              <li>• Proper event handling</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-3" style={headingStyle}>🎨 Theme Integration</h3>
            <ul className="space-y-2 text-sm" style={mutedTextStyle}>
              <li>• CSS variable support</li>
              <li>• Automatic color adaptation</li>
              <li>• Variant and size system</li>
              <li>• Accessibility features</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Code Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4" style={headingStyle}>Usage Examples</h2>
        
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-3" style={headingStyle}>Basic Navigation</h3>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <pre className="text-sm" style={mutedTextStyle}>
{`<Navigation
  brand={<span>My App</span>}
  tabs={[
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About', icon: 'ℹ️' }
  ]}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>`}
              </pre>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-3" style={headingStyle}>With Content Slots</h3>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <pre className="text-sm" style={mutedTextStyle}>
{`<Navigation
  brand={<Logo />}
  tabs={tabs}
  activeTab={activeTab}
  onTabChange={setActiveTab}
  leadingContent={<SearchBox />}
  trailingContent={<UserMenu />}
/>`}
              </pre>
            </div>
          </Card>
        </div>
      </section>

      {/* API Reference */}
      <section>
        <h2 className="text-2xl font-semibold mb-4" style={headingStyle}>Props</h2>
        <Card className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: cssVars.border }}>
                  <th className="text-left p-2" style={headingStyle}>Prop</th>
                  <th className="text-left p-2" style={headingStyle}>Type</th>
                  <th className="text-left p-2" style={headingStyle}>Default</th>
                  <th className="text-left p-2" style={headingStyle}>Description</th>
                </tr>
              </thead>
              <tbody className="text-sm" style={mutedTextStyle}>
                <tr className="border-b" style={{ borderColor: cssVars.border }}>
                  <td className="p-2 font-mono">brand</td>
                  <td className="p-2">ReactNode</td>
                  <td className="p-2">-</td>
                  <td className="p-2">Content for the brand/logo area</td>
                </tr>
                <tr className="border-b" style={{ borderColor: cssVars.border }}>
                  <td className="p-2 font-mono">tabs</td>
                  <td className="p-2">NavigationTab[]</td>
                  <td className="p-2">[]</td>
                  <td className="p-2">Array of tab configurations</td>
                </tr>
                <tr className="border-b" style={{ borderColor: cssVars.border }}>
                  <td className="p-2 font-mono">activeTab</td>
                  <td className="p-2">string</td>
                  <td className="p-2">-</td>
                  <td className="p-2">ID of the currently active tab</td>
                </tr>
                <tr className="border-b" style={{ borderColor: cssVars.border }}>
                  <td className="p-2 font-mono">onTabChange</td>
                  <td className="p-2">(id: string) =&gt; void</td>
                  <td className="p-2">-</td>
                  <td className="p-2">Callback when tab is changed</td>
                </tr>
                <tr className="border-b" style={{ borderColor: cssVars.border }}>
                  <td className="p-2 font-mono">leadingContent</td>
                  <td className="p-2">ReactNode</td>
                  <td className="p-2">-</td>
                  <td className="p-2">Content before the tabs</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono">trailingContent</td>
                  <td className="p-2">ReactNode</td>
                  <td className="p-2">-</td>
                  <td className="p-2">Content after the tabs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </div>
  );
}

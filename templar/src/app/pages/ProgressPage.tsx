'use client';

import React, { useState, useEffect } from 'react';
import { useCSSVariables } from '../providers';
import { Card, ProgressIndicator } from '../components/atoms';

export function ProgressPage() {
  const cssVars = useCSSVariables();
  const [animatedProgress, setAnimatedProgress] = useState(0);

  // Animate progress for demonstration
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedProgress(prev => (prev >= 100 ? 0 : prev + 1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const headingStyle = {
    color: cssVars.foreground
  };

  const mutedTextStyle = {
    color: cssVars.mutedForeground
  };

  const sectionStyle = {
    marginBottom: '2rem'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem'
  };

  const demoItemStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem'
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2" style={headingStyle}>
        Progress Indicators
      </h1>
      <p className="mb-8" style={mutedTextStyle}>
        Loading spinners, progress bars, and status indicators with various sizes and styles.
      </p>

      {/* Spinners Section */}
      <section style={sectionStyle}>
        <h2 className="text-2xl font-semibold mb-4" style={headingStyle}>
          Loading Spinners
        </h2>
        
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-medium mb-3" style={headingStyle}>
            Spinner Sizes
          </h3>
          <div style={gridStyle}>
            <div style={demoItemStyle}>
              <ProgressIndicator type="spinner" size="xs" />
              <span style={mutedTextStyle}>Extra Small</span>
            </div>
            <div style={demoItemStyle}>
              <ProgressIndicator type="spinner" size="sm" />
              <span style={mutedTextStyle}>Small</span>
            </div>
            <div style={demoItemStyle}>
              <ProgressIndicator type="spinner" size="md" />
              <span style={mutedTextStyle}>Medium</span>
            </div>
            <div style={demoItemStyle}>
              <ProgressIndicator type="spinner" size="lg" />
              <span style={mutedTextStyle}>Large</span>
            </div>
            <div style={demoItemStyle}>
              <ProgressIndicator type="spinner" size="xl" />
              <span style={mutedTextStyle}>Extra Large</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <h3 className="text-lg font-medium mb-3" style={headingStyle}>
            Spinner Colors
          </h3>
          <div style={gridStyle}>
            <div style={demoItemStyle}>
              <ProgressIndicator type="spinner" color="primary" />
              <span style={mutedTextStyle}>Primary</span>
            </div>
            <div style={demoItemStyle}>
              <ProgressIndicator type="spinner" color="secondary" />
              <span style={mutedTextStyle}>Secondary</span>
            </div>
            <div style={demoItemStyle}>
              <ProgressIndicator type="spinner" color="success" />
              <span style={mutedTextStyle}>Success</span>
            </div>
            <div style={demoItemStyle}>
              <ProgressIndicator type="spinner" color="warning" />
              <span style={mutedTextStyle}>Warning</span>
            </div>
            <div style={demoItemStyle}>
              <ProgressIndicator type="spinner" color="error" />
              <span style={mutedTextStyle}>Error</span>
            </div>
            <div style={demoItemStyle}>
              <ProgressIndicator type="spinner" color="info" />
              <span style={mutedTextStyle}>Info</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <h3 className="text-lg font-medium mb-3" style={headingStyle}>
            Spinners with Percentage
          </h3>
          <div style={gridStyle}>
            <div style={demoItemStyle}>
              <ProgressIndicator 
                type="spinner" 
                size="lg" 
                value={animatedProgress} 
                showPercentage={true}
                color="primary"
              />
              <span style={mutedTextStyle}>Animated Progress</span>
            </div>
            <div style={demoItemStyle}>
              <ProgressIndicator 
                type="spinner" 
                size="lg" 
                value={75} 
                showPercentage={true}
                color="success"
              />
              <span style={mutedTextStyle}>75% Complete</span>
            </div>
            <div style={demoItemStyle}>
              <ProgressIndicator 
                type="spinner" 
                size="lg" 
                value={33} 
                showPercentage={true}
                color="warning"
              />
              <span style={mutedTextStyle}>33% Complete</span>
            </div>
          </div>
        </Card>
      </section>

      {/* Progress Bars Section */}
      <section style={sectionStyle}>
        <h2 className="text-2xl font-semibold mb-4" style={headingStyle}>
          Progress Bars
        </h2>
        
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-medium mb-3" style={headingStyle}>
            Basic Progress Bars
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ marginBottom: '0.5rem', ...mutedTextStyle }}>
                Animated Progress ({animatedProgress}%)
              </div>
              <ProgressIndicator 
                type="progressBar" 
                value={animatedProgress} 
                width={400}
                color="primary"
                showPercentage={true}
              />
            </div>
            <div>
              <div style={{ marginBottom: '0.5rem', ...mutedTextStyle }}>
                Download Progress (75%)
              </div>
              <ProgressIndicator 
                type="progressBar" 
                value={75} 
                width={400}
                color="success"
                showPercentage={true}
              />
            </div>
            <div>
              <div style={{ marginBottom: '0.5rem', ...mutedTextStyle }}>
                Upload Progress (33%)
              </div>
              <ProgressIndicator 
                type="progressBar" 
                value={33} 
                width={400}
                color="info"
                showPercentage={true}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <h3 className="text-lg font-medium mb-3" style={headingStyle}>
            Progress Bar Sizes
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ marginBottom: '0.5rem', ...mutedTextStyle }}>Extra Small</div>
              <ProgressIndicator 
                type="progressBar" 
                size="xs"
                value={60} 
                width={300}
                color="primary"
              />
            </div>
            <div>
              <div style={{ marginBottom: '0.5rem', ...mutedTextStyle }}>Small</div>
              <ProgressIndicator 
                type="progressBar" 
                size="sm"
                value={60} 
                width={300}
                color="primary"
              />
            </div>
            <div>
              <div style={{ marginBottom: '0.5rem', ...mutedTextStyle }}>Medium</div>
              <ProgressIndicator 
                type="progressBar" 
                size="md"
                value={60} 
                width={300}
                color="primary"
              />
            </div>
            <div>
              <div style={{ marginBottom: '0.5rem', ...mutedTextStyle }}>Large</div>
              <ProgressIndicator 
                type="progressBar" 
                size="lg"
                value={60} 
                width={300}
                color="primary"
              />
            </div>
            <div>
              <div style={{ marginBottom: '0.5rem', ...mutedTextStyle }}>Extra Large</div>
              <ProgressIndicator 
                type="progressBar" 
                size="xl"
                value={60} 
                width={300}
                color="primary"
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <h3 className="text-lg font-medium mb-3" style={headingStyle}>
            Progress Bar Colors
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ marginBottom: '0.5rem', ...mutedTextStyle }}>Primary (85%)</div>
              <ProgressIndicator 
                type="progressBar" 
                value={85} 
                width={350}
                color="primary"
                showPercentage={true}
              />
            </div>
            <div>
              <div style={{ marginBottom: '0.5rem', ...mutedTextStyle }}>Secondary (70%)</div>
              <ProgressIndicator 
                type="progressBar" 
                value={70} 
                width={350}
                color="secondary"
                showPercentage={true}
              />
            </div>
            <div>
              <div style={{ marginBottom: '0.5rem', ...mutedTextStyle }}>Success (95%)</div>
              <ProgressIndicator 
                type="progressBar" 
                value={95} 
                width={350}
                color="success"
                showPercentage={true}
              />
            </div>
            <div>
              <div style={{ marginBottom: '0.5rem', ...mutedTextStyle }}>Warning (45%)</div>
              <ProgressIndicator 
                type="progressBar" 
                value={45} 
                width={350}
                color="warning"
                showPercentage={true}
              />
            </div>
            <div>
              <div style={{ marginBottom: '0.5rem', ...mutedTextStyle }}>Error (25%)</div>
              <ProgressIndicator 
                type="progressBar" 
                value={25} 
                width={350}
                color="error"
                showPercentage={true}
              />
            </div>
          </div>
        </Card>
      </section>

      {/* Real-world Examples */}
      <section style={sectionStyle}>
        <h2 className="text-2xl font-semibold mb-4" style={headingStyle}>
          Examples
        </h2>
        
        <div style={gridStyle}>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-3" style={headingStyle}>
              File Upload
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <ProgressIndicator type="spinner" size="sm" color="info" />
              <span style={mutedTextStyle}>Uploading...</span>
            </div>
            <ProgressIndicator 
              type="progressBar" 
              value={animatedProgress} 
              width={250}
              color="info"
              showPercentage={true}
            />
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium mb-3" style={headingStyle}>
              Installation Progress
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={mutedTextStyle}>Installing packages...</span>
                <span style={mutedTextStyle}>3/5</span>
              </div>
              <ProgressIndicator 
                type="progressBar" 
                value={60} 
                width={250}
                color="success"
              />
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium mb-3" style={headingStyle}>
              Loading State
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <ProgressIndicator type="spinner" size="lg" color="primary" />
              <span style={mutedTextStyle}>Loading data...</span>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium mb-3" style={headingStyle}>
              Battery Level
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={mutedTextStyle}>Battery</span>
                <span style={mutedTextStyle}>Low</span>
              </div>
              <ProgressIndicator 
                type="progressBar" 
                value={15} 
                width={250}
                color="error"
                showPercentage={true}
              />
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

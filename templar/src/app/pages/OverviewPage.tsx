'use client';

import React, { useState } from 'react';
import { Scrollbar, Card, Icon, FallingLeaves } from '../components/atoms';
import { useCSSVariables } from '../providers';

export function OverviewPage() {
  const cssVars = useCSSVariables();
  const [scrollY, setScrollY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget || event.target as HTMLDivElement;
    if (target && typeof target.scrollTop === 'number') {
      setScrollY(target.scrollTop);
    }
  };

  const handleScrollStart = () => {
    setIsDragging(true);
  };

  const handleScrollEnd = () => {
    setIsDragging(false);
  };

  // Calculate parallax offset based on content and actual image dimensions
  const contentHeight = 500; // 500vh content height
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;

  // Image has 3:2 aspect ratio (height:width)
  // When width = 100vw, height = (100vw * 3/2) = 150vw
  // Convert to vh: 150vw = 150 * (viewportWidth/viewportHeight) vh
  const actualImageHeightVH = 150 * (viewportWidth / viewportHeight);

  // Calculate the maximum scroll distance for content
  const maxContentScroll = (contentHeight / 100) * viewportHeight - viewportHeight; // 4vh worth of pixels

  // Calculate the maximum image movement needed (image height minus viewport height)
  const maxImageMovement = ((actualImageHeightVH / 100) * viewportHeight) - viewportHeight;

  // Calculate the parallax ratio so image finishes moving when content finishes scrolling
  const parallaxRatio = maxImageMovement / maxContentScroll;

  const imageOffset = scrollY * parallaxRatio;

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', margin: 0, padding: 0 }}>
      {/* Falling leaves effect */}
      <FallingLeaves
        leafCount={5}
        spawnRate={1000}
        enabled={true}
      />

      {/* Fixed background knight image - extends to full viewport */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          zIndex: 1
        }}
      >
        <img
          src="/assets/knight_background.png"
          alt="Knight Background"
          style={{
            width: '100%',
            height: 'auto',
            transform: `translateY(-${imageOffset}px)`,
            transition: isDragging ? 'none' : 'transform 0.1s ease-out'
          }}
        />
      </div>

      {/* Scrollable content overlay */}
      <Scrollbar
        height="100vh"
        width="100vw"
        variant="ghost"
        color="secondary"
        size="md"
        visibility="hover"
        smoothScrolling={!isDragging}
        orientation="vertical"
        style={{ position: 'relative', zIndex: 50 }}
        onScroll={handleScroll}
        onScrollStart={handleScrollStart}
        onScrollEnd={handleScrollEnd}
      >
        <div style={{ height: '500vh', position: 'relative' }}>
          {/* Dummy content cards */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '32px',
            padding: 'calc(48px + 8vh) 32px 32px 32px' // Start below nav + higher on viewport
          }}>
            {/* Mournshire Splash Page */}
            <div style={{
              textAlign: 'center',
              width: '100%',
              padding: '80px 32px',
              minHeight: '80vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div style={{ position: 'relative', marginBottom: '24px' }}>
                {/* Navy shadow text */}
                <h1 style={{
                  fontSize: 'clamp(4rem, 8vw, 8rem)',
                  fontWeight: 'bold',
                  color: '#1E2A3A',
                  letterSpacing: '0.02em',
                  lineHeight: '1.1',
                  position: 'absolute',
                  top: '8px',
                  left: '-8px',
                  zIndex: 1
                }}>
                  Mournshire
                </h1>
                {/* Main text */}
                <h1 style={{
                  fontSize: 'clamp(4rem, 8vw, 8rem)',
                  fontWeight: 'bold',
                  color: cssVars.foreground,
                  textShadow: `2px 2px 4px ${cssVars.backgroundShadow}`,
                  letterSpacing: '0.02em',
                  lineHeight: '1.1',
                  position: 'relative',
                  zIndex: 2
                }}>
                  Mournshire
                </h1>
              </div>
              <p style={{
                fontSize: 'clamp(1.25rem, 3vw, 2rem)',
                color: cssVars.foregroundAccent,
                fontStyle: 'italic',
                marginTop: '16px',
                textShadow: `1px 1px 2px ${cssVars.backgroundShadow}`,
                maxWidth: '800px',
                lineHeight: '1.4'
              }}>
                Where the last leaf of autumn falls
              </p>
            </div>

            <Card
              variant="glassmorphic"
              size="lg"
              shape="round"
              color="secondary"
              style={{
                maxWidth: '600px',
                width: '100%',
                backgroundColor: `${cssVars.background}E6`,
                backdropFilter: 'blur(20px)',
                border: `1px solid ${cssVars.border}80`
              }}
            >
              <div style={{ padding: '40px' }}>
                <Icon name="Atom" size="lg" style={{ color: cssVars.secondary, marginBottom: '16px' }} />
                <h2 style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: cssVars.foreground,
                  marginBottom: '16px'
                }}>
                  Atomic Design System
                </h2>
                <p style={{
                  fontSize: '18px',
                  color: cssVars.foregroundAccent,
                  lineHeight: '1.6'
                }}>
                  Built with a systematic approach to component architecture, ensuring consistency and scalability across your entire application.
                </p>
              </div>
            </Card>

            <Card
              variant="glassmorphic"
              size="lg"
              shape="round"
              color="success"
              style={{
                maxWidth: '600px',
                width: '100%',
                backgroundColor: `${cssVars.background}E6`,
                backdropFilter: 'blur(20px)',
                border: `1px solid ${cssVars.border}80`
              }}
            >
              <div style={{ padding: '40px' }}>
                <Icon name="Palette" size="lg" style={{ color: cssVars.success, marginBottom: '16px' }} />
                <h2 style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: cssVars.foreground,
                  marginBottom: '16px'
                }}>
                  Advanced Theming
                </h2>
                <p style={{
                  fontSize: '18px',
                  color: cssVars.foregroundAccent,
                  lineHeight: '1.6'
                }}>
                  Comprehensive theme system with 80+ CSS variables, multiple built-in themes, and full customization support.
                </p>
              </div>
            </Card>

            <Card
              variant="glassmorphic"
              size="lg"
              shape="round"
              color="info"
              style={{
                maxWidth: '600px',
                width: '100%',
                backgroundColor: `${cssVars.background}E6`,
                backdropFilter: 'blur(20px)',
                border: `1px solid ${cssVars.border}80`
              }}
            >
              <div style={{ padding: '40px' }}>
                <Icon name="Code" size="lg" style={{ color: cssVars.info, marginBottom: '16px' }} />
                <h2 style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: cssVars.foreground,
                  marginBottom: '16px'
                }}>
                  TypeScript First
                </h2>
                <p style={{
                  fontSize: '18px',
                  color: cssVars.foregroundAccent,
                  lineHeight: '1.6'
                }}>
                  Full TypeScript support with comprehensive type safety, intelligent autocomplete, and robust development experience.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </Scrollbar>
    </div>
  );
}
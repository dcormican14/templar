'use client';

import React, { useState, useEffect } from 'react';
import { Scrollbar, Card, Icon, FallingLeaves } from '../components/atoms';
import { useCSSVariables } from '../providers';

// Animated Card Wrapper Component
interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
  scrollY: number;
  triggerOffset?: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, delay = 0, scrollY, triggerOffset = 600 }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Card is visible when its top is within viewport
      // Card becomes invisible when it scrolls past the top
      if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
        setIsVisible(true);
      } else if (rect.top > windowHeight || rect.bottom < -100) {
        setIsVisible(false);
      }
    }
  }, [scrollY]);

  return (
    <div
      ref={cardRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
        transition: `opacity 0.4s ease-out ${delay}ms, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
        breakInside: 'avoid',
        marginBottom: '32px',
        display: 'inline-block',
        width: '100%',
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
};

export function OverviewPage() {
  const cssVars = useCSSVariables();
  const [scrollY, setScrollY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [imageHeight, setImageHeight] = useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const imageRef = React.useRef<HTMLImageElement>(null);

  // Measure image height when it loads
  useEffect(() => {
    const updateImageHeight = () => {
      if (imageRef.current) {
        const height = imageRef.current.clientHeight;
        console.log('Image height measured:', height);
        setImageHeight(height);
      }
    };

    const img = imageRef.current;

    // Update on load
    if (img) {
      if (img.complete && img.naturalHeight > 0) {
        // Image already loaded
        updateImageHeight();
      } else {
        // Wait for image to load
        img.addEventListener('load', updateImageHeight);
      }
    }

    // Update on resize
    window.addEventListener('resize', updateImageHeight);

    // Try updating after a short delay in case image loads slowly
    const timeout = setTimeout(updateImageHeight, 100);

    return () => {
      window.removeEventListener('resize', updateImageHeight);
      clearTimeout(timeout);
      if (img) {
        img.removeEventListener('load', updateImageHeight);
      }
    };
  }, []);

  // Handle hash navigation on mount
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#docs-section') {
      setTimeout(() => {
        const docsSection = document.getElementById('docs-section');
        if (docsSection) {
          docsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else if (hash === '#contact-section') {
      setTimeout(() => {
        const contactSection = document.getElementById('contact-section');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  // Expose scroll container to parent for scroll detection
  useEffect(() => {
    // Find the outer wrapper first
    const outerContainer = document.querySelector('[data-scroll-container="overview"]');
    // Then get the actual scrollable inner div (first child of the outer div)
    const scrollContainer = outerContainer?.querySelector('div[style*="overflow"]') as HTMLDivElement;

    if (scrollContainer) {
      (window as any).__overviewScrollContainer = scrollContainer;
    }
    return () => {
      delete (window as any).__overviewScrollContainer;
    };
  }, []);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget || event.target as HTMLDivElement;
    if (target && typeof target.scrollTop === 'number') {
      setScrollY(target.scrollTop);

      // Check section positions and dispatch custom event
      const docsSection = document.getElementById('docs-section');
      const contactSection = document.getElementById('contact-section');

      // Use window height for consistent viewport calculation
      const viewportHeight = window.innerHeight;
      const viewportMiddle = viewportHeight / 2;

      let currentSection = 'overview';

      // Check which section the middle of the viewport is in
      // The section's top should be above viewport middle, and bottom should be below it

      // Contact section (check this first since it's last)
      if (contactSection) {
        const contactRect = contactSection.getBoundingClientRect();
        // If section spans across the viewport middle
        if (contactRect.top <= viewportMiddle && contactRect.bottom >= viewportMiddle) {
          currentSection = 'contact';
        }
      }

      // Docs section (only if we haven't found contact)
      if (currentSection === 'overview' && docsSection) {
        const docsRect = docsSection.getBoundingClientRect();
        // If section spans across the viewport middle
        if (docsRect.top <= viewportMiddle && docsRect.bottom >= viewportMiddle) {
          currentSection = 'docs';
        }
      }

      window.dispatchEvent(new CustomEvent('overviewScroll', { detail: { currentSection } }));
    }
  };

  const handleScrollStart = () => {
    setIsDragging(true);
  };

  const handleScrollEnd = () => {
    setIsDragging(false);
  };

  // Parallax calculations
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
  const imageAspectRatio = 1.5; 
  const calculatedImageHeight = viewportWidth * imageAspectRatio;
  const effectiveImageHeight = imageHeight > 0 ? imageHeight : calculatedImageHeight;
  const maxImageMovement = Math.max(0, effectiveImageHeight - viewportHeight);
  const H = effectiveImageHeight * 3; 
  const targetScrollForFullReveal = effectiveImageHeight * 1.5; 
  const backgroundSpeed = maxImageMovement / targetScrollForFullReveal;
  const imageOffset = Math.min(scrollY * backgroundSpeed, maxImageMovement);

  // Debug logging
  React.useEffect(() => {
    if (scrollY > 0 && scrollY % 500 < 50) {
      console.log('Parallax Debug:', {
        scrollY,
        imageHeight,
        calculatedImageHeight,
        effectiveImageHeight,
        viewportHeight,
        viewportWidth,
        maxImageMovement,
        H,
        targetScrollForFullReveal,
        backgroundSpeed,
        imageOffset,
        imageRevealPercentage: (imageOffset / maxImageMovement * 100).toFixed(2) + '%',
        clampingActive: scrollY * backgroundSpeed > maxImageMovement
      });
    }
  }, [scrollY, maxImageMovement, imageOffset, H, targetScrollForFullReveal, backgroundSpeed]);

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
          ref={imageRef}
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

      {/* Fixed header text overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        pointerEvents: 'none',
        padding: '80px 32px',
        gap: '48px'
      }}>
        {/* Text content */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'center'
        }}>
          <div style={{ position: 'relative', marginBottom: '24px', opacity: Math.max(0, 1 - scrollY / 400) }}>
            {/* Navy shadow text */}
            <h1 style={{
              fontSize: '6rem',
              fontWeight: 'bold',
              color: '#1E2A3A',
              letterSpacing: '0.02em',
              lineHeight: '1.1',
              position: 'absolute',
              top: '8px',
              left: '8px',
              zIndex: 1,
              whiteSpace: 'nowrap'
            }}>
              Mournshire
            </h1>
            {/* Main text */}
            <h1 style={{
              fontSize: '6rem',
              fontWeight: 'bold',
              color: cssVars.foreground,
              textShadow: `2px 2px 4px ${cssVars.backgroundShadow}`,
              letterSpacing: '0.02em',
              lineHeight: '1.1',
              position: 'relative',
              zIndex: 2,
              whiteSpace: 'nowrap'
            }}>
              Mournshire
            </h1>
          </div>
          <p style={{
            fontSize: '1.5rem',
            color: cssVars.foregroundAccent,
            fontStyle: 'italic',
            marginTop: '0px',
            textShadow: `1px 1px 2px ${cssVars.backgroundShadow}`,
            maxWidth: '500px',
            lineHeight: '1.4',
            opacity: Math.max(0, 1 - scrollY / 400),
            textAlign: 'right'
          }}>
            A themable React component library
          </p>
        </div>

        {/* Knight image */}
        <img
          src="/assets/knight_1.gif"
          alt="Knight"
          style={{
            width: '250px',
            height: 'auto',
            opacity: Math.max(0, 1 - scrollY / 400)
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
        data-scroll-container="overview"
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
            {/* Spacer for fixed header */}
            <div style={{
              minHeight: '80vh',
              width: '100%'
            }}></div>

            {/* Overview Feature Cards */}
            <div style={{
              display: 'flex',
              flexDirection: window.innerWidth < 768 ? 'column' : 'row',
              gap: '48px',
              width: '100%',
              maxWidth: '1200px',
              alignItems: 'stretch'
            }}>
              <AnimatedCard scrollY={scrollY} delay={0}>
                <Card
                  variant="glassmorphic"
                  size="lg"
                  shape="round"
                  color="secondary"
                  style={{
                    backgroundColor: `${cssVars.background}E6`,
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${cssVars.border}80`
                  }}
                >
                  <div style={{ padding: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                      <Icon name="Atom" size="lg" style={{ color: cssVars.secondary, flexShrink: 0 }} />
                      <h2 style={{ fontSize: '24px', fontWeight: '600', color: cssVars.foreground, margin: 0 }}>
                        Atomic Design System
                      </h2>
                    </div>
                    <div>
                      <p style={{ fontSize: '16px', color: cssVars.foregroundAccent, lineHeight: '1.6' }}>
                        20+ carefully crafted components organized into atoms and molecules. Built with a systematic approach to component architecture for consistency and scalability.
                      </p>
                      <ul style={{ fontSize: '14px', color: cssVars.foregroundAccent, lineHeight: '1.8', listStyle: 'none', paddingLeft: 0, marginTop: '16px' }}>
                        <li>• Atoms: 18 atomic components and growing!</li>
                        <li>• Molecules: 3 molecules for now, with some on the way</li>
                        <li>• Iconnoir Iconography</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </AnimatedCard>

              <AnimatedCard scrollY={scrollY} delay={200}>
                <Card
                  variant="glassmorphic"
                  size="lg"
                  shape="round"
                  color="info"
                  style={{
                    backgroundColor: `${cssVars.background}E6`,
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${cssVars.border}80`
                  }}
                >
                  <div style={{ padding: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                      <Icon name="Code" size="lg" style={{ color: cssVars.info, flexShrink: 0 }} />
                      <h2 style={{ fontSize: '24px', fontWeight: '600', color: cssVars.foreground, margin: 0 }}>
                        TypeScript First
                      </h2>
                    </div>
                    <div>
                      <p style={{ fontSize: '16px', color: cssVars.foregroundAccent, lineHeight: '1.6' }}>
                        Built with TypeScript 5 and React 19. Full type safety, intelligent autocomplete, and comprehensive type definitions for every component and hook.
                      </p>
                      <ul style={{ fontSize: '14px', color: cssVars.foregroundAccent, lineHeight: '1.8', listStyle: 'none', paddingLeft: 0, marginTop: '16px' }}>
                        <li>• Comprehensive type definitions</li>
                        <li>• IntelliSense support</li>
                        <li>• Strict mode enabled</li>
                        <li>• Zero any types</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </AnimatedCard>
            </div>

            {/* Documentation Section */}
            <div id="docs-section" style={{
              width: '100%',
              maxWidth: '1200px',
              padding: '80px 32px',
              marginTop: '40vh'
            }}>
              <div style={{ marginBottom: '48px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px' }}>
                  <div style={{ position: 'relative' }}>
                    {/* Icon shadow */}
                    <Icon name="BookSolid" size="xl" style={{
                      color: cssVars.foreground,
                      position: 'absolute',
                      top: '3px',
                      left: '3px',
                      zIndex: 1
                    }} />
                    {/* Main icon */}
                    <Icon name="BookSolid" size="xl" style={{
                      color: cssVars.info,
                      position: 'relative',
                      zIndex: 2
                    }} />
                  </div>
                  <div style={{ position: 'relative' }}>
                    {/* Navy shadow text */}
                    <h1 style={{
                      fontSize: '3.5rem',
                      fontWeight: 'bold',
                      color: '#1E2A3A',
                      letterSpacing: '0.02em',
                      position: 'absolute',
                      top: '4px',
                      left: '4px',
                      margin: 0,
                      zIndex: 1
                    }}>
                      Documentation
                    </h1>
                    {/* Main text */}
                    <h1 style={{
                      fontSize: '3.5rem',
                      fontWeight: 'bold',
                      color: cssVars.foreground,
                      textShadow: `2px 2px 4px ${cssVars.backgroundShadow}`,
                      letterSpacing: '0.02em',
                      position: 'relative',
                      margin: 0,
                      zIndex: 2
                    }}>
                      Documentation
                    </h1>
                  </div>
                </div>
                <p style={{
                  fontSize: '1.25rem',
                  color: cssVars.foregroundAccent,
                  textShadow: `1px 1px 2px ${cssVars.backgroundShadow}`,
                  margin: 0
                }}>
                  Comprehensive guides, API references, and examples
                </p>
              </div>

              <div style={{
                columns: window.innerWidth < 768 ? 1 : 2,
                columnGap: '48px'
              }}>
                <AnimatedCard scrollY={scrollY} delay={100}>
                  <Card
                    variant="glassmorphic"
                    size="lg"
                    shape="round"
                    color="secondary"
                    style={{
                      backgroundColor: `${cssVars.background}CC`,
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${cssVars.border}80`
                    }}
                  >
                    <div style={{ padding: '32px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                        <Icon name="Settings" size="lg" style={{ color: cssVars.secondary, flexShrink: 0 }} />
                        <h2 style={{ fontSize: '24px', fontWeight: '600', color: cssVars.foreground, margin: 0 }}>
                          RoundTable Providers
                        </h2>
                      </div>
                      <div>
                        <p style={{ fontSize: '16px', color: cssVars.foregroundAccent, lineHeight: '1.6' }}>
                          Understand the provider ecosystem wrapping all components. ThemeProvider, AuthProvider, ToastProvider, LoadingProvider, ModalProvider, and SettingsProvider work together seamlessly.
                        </p>
                        <ul style={{ fontSize: '14px', color: cssVars.foregroundAccent, lineHeight: '1.8', listStyle: 'none', paddingLeft: 0, marginTop: '16px' }}>
                          <li>• Configure RoundTable wrapper</li>
                          <li>• Provider composition patterns</li>
                          <li>• Context hook usage</li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                </AnimatedCard>

                <AnimatedCard scrollY={scrollY} delay={200}>
                  <Card
                    variant="glassmorphic"
                    size="lg"
                    shape="round"
                    color="primary"
                    style={{
                      backgroundColor: `${cssVars.background}CC`,
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${cssVars.border}80`
                    }}
                  >
                    <div style={{ padding: '32px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                        <Icon name="OpenBook" size="lg" style={{ color: cssVars.primary, flexShrink: 0 }} />
                        <h2 style={{ fontSize: '24px', fontWeight: '600', color: cssVars.foreground, margin: 0 }}>
                          Quick Start Guide
                        </h2>
                      </div>
                      <div>
                        <p style={{ fontSize: '16px', color: cssVars.foregroundAccent, lineHeight: '1.6' }}>
                          Get started with Next.js 15 and Turbopack. Learn installation, RoundTable provider setup, and integrate your first component in minutes.
                        </p>
                      </div>
                    </div>
                  </Card>
                </AnimatedCard>

                <AnimatedCard scrollY={scrollY} delay={300}>
                  <Card
                    variant="glassmorphic"
                    size="lg"
                    shape="round"
                    color="secondary"
                    style={{
                      backgroundColor: `${cssVars.background}CC`,
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${cssVars.border}80`
                    }}
                  >
                    <div style={{ padding: '32px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                        <Icon name="DataTransferBoth" size="lg" style={{ color: cssVars.secondary, flexShrink: 0 }} />
                        <h2 style={{ fontSize: '24px', fontWeight: '600', color: cssVars.foreground, margin: 0 }}>
                          Component API
                        </h2>
                      </div>
                      <div>
                        <p style={{ fontSize: '16px', color: cssVars.foregroundAccent, lineHeight: '1.6' }}>
                          Complete API reference for all 20+ components, hooks like useCSSVariables(), and utilities. Includes TypeScript definitions, prop tables, and live examples.
                        </p>
                        <ul style={{ fontSize: '14px', color: cssVars.foregroundAccent, lineHeight: '1.8', listStyle: 'none', paddingLeft: 0, marginTop: '16px' }}>
                          <li>• Component props documentation</li>
                          <li>• Hook usage examples</li>
                          <li>• Provider configuration</li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                </AnimatedCard>

                <AnimatedCard scrollY={scrollY} delay={500}>
                  <Card
                    variant="glassmorphic"
                    size="lg"
                    shape="round"
                    color="primary"
                    style={{
                      backgroundColor: `${cssVars.background}CC`,
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${cssVars.border}80`
                    }}
                  >
                    <div style={{ padding: '32px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                        <Icon name="CodeBracketsSquare" size="lg" style={{ color: cssVars.primary, flexShrink: 0 }} />
                        <h2 style={{ fontSize: '24px', fontWeight: '600', color: cssVars.foreground, margin: 0 }}>
                          Design Standards
                        </h2>
                      </div>
                      <div>
                        <p style={{ fontSize: '16px', color: cssVars.foregroundAccent, lineHeight: '1.6' }}>
                          Understand atomic design principles, the RoundTable provider architecture, component composition patterns, and WCAG AA accessibility guidelines.
                        </p>
                        <ul style={{ fontSize: '14px', color: cssVars.foregroundAccent, lineHeight: '1.8', listStyle: 'none', paddingLeft: 0, marginTop: '16px' }}>
                          <li>• 4px spacing system</li>
                          <li>• Size scales: xs, sm, md, lg, xl</li>
                          <li>• Color variants and shapes</li>
                          <li>• Animation modes</li>
                          <li>• More design standards defined in the docs</li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                </AnimatedCard>

                <AnimatedCard scrollY={scrollY} delay={400}>
                  <Card
                    variant="glassmorphic"
                    size="lg"
                    shape="round"
                    color="info"
                    style={{
                      backgroundColor: `${cssVars.background}CC`,
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${cssVars.border}80`
                    }}
                  >
                    <div style={{ padding: '32px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                        <Icon name="ColorPicker" size="lg" style={{ color: cssVars.info, flexShrink: 0 }} />
                        <h2 style={{ fontSize: '24px', fontWeight: '600', color: cssVars.foreground, margin: 0 }}>
                          Theming System
                        </h2>
                      </div>
                      <div>
                        <p style={{ fontSize: '16px', color: cssVars.foregroundAccent, lineHeight: '1.6' }}>
                          Deep dive into the ThemeProvider and 80+ CSS variables. Learn to create custom themes, implement dark mode, and use design tokens effectively.
                        </p>
                      </div>
                    </div>
                  </Card>
                </AnimatedCard>
              </div>
            </div>

            {/* Contact Section */}
            <div id="contact-section" style={{
              width: '100%',
              maxWidth: '1200px',
              padding: '80px 32px',
              marginTop: '40vh'
            }}>
              <div style={{ marginBottom: '48px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px' }}>
                  <div style={{ position: 'relative' }}>
                    {/* Icon shadow */}
                    <Icon name="ChatLinesSolid" size="xl" style={{
                      color: cssVars.foreground,
                      position: 'absolute',
                      top: '3px',
                      left: '3px',
                      zIndex: 1
                    }} />
                    {/* Main icon */}
                    <Icon name="ChatLinesSolid" size="xl" style={{
                      color: cssVars.secondary,
                      position: 'relative',
                      zIndex: 2
                    }} />
                  </div>
                  <div style={{ position: 'relative' }}>
                    {/* Navy shadow text */}
                    <h1 style={{
                      fontSize: '3.5rem',
                      fontWeight: 'bold',
                      color: '#1E2A3A',
                      letterSpacing: '0.02em',
                      position: 'absolute',
                      top: '4px',
                      left: '4px',
                      margin: 0,
                      zIndex: 1,
                      whiteSpace: 'nowrap'
                    }}>
                      Get in Touch
                    </h1>
                    {/* Main text */}
                    <h1 style={{
                      fontSize: '3.5rem',
                      fontWeight: 'bold',
                      color: cssVars.foreground,
                      textShadow: `2px 2px 4px ${cssVars.backgroundShadow}`,
                      letterSpacing: '0.02em',
                      position: 'relative',
                      margin: 0,
                      zIndex: 2,
                      whiteSpace: 'nowrap'
                    }}>
                      Get in Touch
                    </h1>
                  </div>
                </div>
                <p style={{
                  fontSize: '1.25rem',
                  color: cssVars.foregroundAccent,
                  textShadow: `1px 1px 2px ${cssVars.backgroundShadow}`,
                  margin: 0
                }}>
                  Have questions, feedback, or want to contribute? We'd love to hear from you!
                </p>
              </div>

              <div style={{
                columns: window.innerWidth < 768 ? 1 : 2,
                columnGap: '48px'
              }}>
                <AnimatedCard scrollY={scrollY} delay={100}>
                  <Card
                    variant="glassmorphic"
                    size="lg"
                    shape="round"
                    color="primary"
                    style={{
                      backgroundColor: `${cssVars.background}CC`,
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${cssVars.border}80`
                    }}
                  >
                    <div style={{ padding: '32px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                        <Icon name="Github" size="lg" style={{ color: cssVars.primary, flexShrink: 0 }} />
                        <h2 style={{ fontSize: '24px', fontWeight: '600', color: cssVars.foreground, margin: 0 }}>
                          Open Source
                        </h2>
                      </div>
                      <div>
                        <p style={{ fontSize: '16px', color: cssVars.foregroundAccent, lineHeight: '1.6' }}>
                          Explore the source code on GitHub. Report issues, submit pull requests, and contribute to the future of Templar's development.
                        </p>
                        <ul style={{ fontSize: '14px', color: cssVars.foregroundAccent, lineHeight: '1.8', listStyle: 'none', paddingLeft: 0, marginTop: '16px' }}>
                          <li>• Fork and star the repository</li>
                          <li>• Submit bug reports</li>
                          <li>• Contribute new components</li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                </AnimatedCard>

                <AnimatedCard scrollY={scrollY} delay={200}>
                  <Card
                    variant="glassmorphic"
                    size="lg"
                    shape="round"
                    color="info"
                    style={{
                      backgroundColor: `${cssVars.background}CC`,
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${cssVars.border}80`
                    }}
                  >
                    <div style={{ padding: '32px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                        <Icon name="Community" size="lg" style={{ color: cssVars.info, flexShrink: 0 }} />
                        <h2 style={{ fontSize: '24px', fontWeight: '600', color: cssVars.foreground, margin: 0 }}>
                          Join the Community
                        </h2>
                      </div>
                      <div>
                        <p style={{ fontSize: '16px', color: cssVars.foregroundAccent, lineHeight: '1.6' }}>
                          Connect with other developers, share your projects, ask questions, and help shape the roadmap. Your feedback matters.
                        </p>
                        <ul style={{ fontSize: '14px', color: cssVars.foregroundAccent, lineHeight: '1.8', listStyle: 'none', paddingLeft: 0, marginTop: '16px' }}>
                          <li>• Join discussions on GitHub</li>
                          <li>• Share showcase projects</li>
                          <li>• Request features</li>
                          <li>• Help other developers</li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                </AnimatedCard>

                <AnimatedCard scrollY={scrollY} delay={300}>
                  <Card
                    variant="glassmorphic"
                    size="lg"
                    shape="round"
                    color="secondary"
                    style={{
                      backgroundColor: `${cssVars.background}CC`,
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${cssVars.border}80`
                    }}
                  >
                    <div style={{ padding: '32px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                        <Icon name="MessageText" size="lg" style={{ color: cssVars.secondary, flexShrink: 0 }} />
                        <h2 style={{ fontSize: '24px', fontWeight: '600', color: cssVars.foreground, margin: 0 }}>
                          Direct Support
                        </h2>
                      </div>
                      <div>
                        <p style={{ fontSize: '16px', color: cssVars.foregroundAccent, lineHeight: '1.6' }}>
                          Need enterprise support or custom solutions? Reach out for dedicated assistance, consulting services, and priority feature requests.
                        </p>
                      </div>
                    </div>
                  </Card>
                </AnimatedCard>

                <AnimatedCard scrollY={scrollY} delay={500}>
                  <Card
                    variant="glassmorphic"
                    size="lg"
                    shape="round"
                    color="primary"
                    style={{
                      backgroundColor: `${cssVars.background}CC`,
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${cssVars.border}80`
                    }}
                  >
                    <div style={{ padding: '32px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                        <Icon name="SendDiagonal" size="lg" style={{ color: cssVars.primary, flexShrink: 0 }} />
                        <h2 style={{ fontSize: '24px', fontWeight: '600', color: cssVars.foreground, margin: 0 }}>
                          Stay Updated
                        </h2>
                      </div>
                      <div>
                        <p style={{ fontSize: '16px', color: cssVars.foregroundAccent, lineHeight: '1.6' }}>
                          Subscribe to our newsletter for release updates, new features, tutorials, and best practices delivered directly to your inbox.
                        </p>
                      </div>
                    </div>
                  </Card>
                </AnimatedCard>
              </div>
            </div>
          </div>
        </div>
      </Scrollbar>
    </div>
  );
}
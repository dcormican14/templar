'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, Icon, FallingLeaves } from '../components/atoms';
import { useCSSVariables } from '../providers';

// Animated card using IntersectionObserver — no scroll tracking needed
interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.5s ease-out ${delay}ms, transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
        width: '100%',
        breakInside: 'avoid',
        marginBottom: '32px',
      }}
    >
      {children}
    </div>
  );
};

// Reusable section heading with text-shadow instead of duplicate DOM nodes
const SectionHeading: React.FC<{
  icon?: string;
  iconColor?: string;
  title: string;
  subtitle: string;
  cssVars: any;
  isMobile: boolean;
}> = ({ icon, iconColor, title, subtitle, cssVars, isMobile }) => (
  <div style={{ marginBottom: '48px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px' }}>
      {icon && !isMobile && (
        <Icon name={icon} size="xl" style={{ color: iconColor, filter: 'drop-shadow(3px 3px 0 var(--foreground))' }} />
      )}
      <h1 style={{
        fontSize: isMobile ? '2.5rem' : '3.5rem',
        fontWeight: 'bold',
        color: cssVars.foreground,
        textShadow: `3px 3px 0 #1E2A3A, 2px 2px 4px ${cssVars.backgroundShadow}`,
        letterSpacing: '0.02em',
        margin: 0,
      }}>
        {title}
      </h1>
    </div>
    <p style={{ fontSize: '1.25rem', color: cssVars.foregroundAccent, textShadow: `1px 1px 2px ${cssVars.backgroundShadow}`, margin: 0 }}>
      {subtitle}
    </p>
  </div>
);

export function OverviewPage() {
  const cssVars = useCSSVariables();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <>
      <FallingLeaves leafCount={5} spawnRate={1000} enabled={true} />

      {/* Hero — background image is CSS, flows naturally, no fixed positioning */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '80px 32px',
          gap: '48px',
          backgroundImage: 'url(/assets/knight_background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'center' : 'flex-end', justifyContent: 'center' }}>
          <h1 style={{
            fontSize: isMobile ? '3.5rem' : '6rem',
            fontWeight: 'bold',
            color: cssVars.foreground,
            textShadow: `${isMobile ? '5px 5px' : '8px 8px'} 0 #1E2A3A, 2px 2px 4px ${cssVars.backgroundShadow}`,
            letterSpacing: '0.02em',
            lineHeight: '1.1',
            marginBottom: '24px',
            whiteSpace: 'nowrap',
          }}>
            Mournshire
          </h1>
          <p style={{
            fontSize: '1.5rem',
            color: cssVars.foregroundAccent,
            fontStyle: 'italic',
            textShadow: `1px 1px 2px ${cssVars.backgroundShadow}`,
            maxWidth: '500px',
            lineHeight: '1.4',
            textAlign: isMobile ? 'center' : 'right',
          }}>
            A themable React component library
          </p>
        </div>

        {!isMobile && (
          <img src="/assets/knight_1.gif" alt="Knight" style={{ width: '250px', height: 'auto' }} />
        )}
      </section>

      {/* Feature cards */}
      <section style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: '48px',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 32px 64px',
        alignItems: 'stretch',
      }}>
        <AnimatedCard delay={0}>
          <Card variant="glassmorphic" size="lg" shape="round" color="secondary">
            <div style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <Icon name="Atom" size="lg" style={{ color: cssVars.secondary, flexShrink: 0 }} />
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: cssVars.foreground, margin: 0 }}>
                  Atomic Design System
                </h2>
              </div>
              <p style={{ fontSize: '16px', color: cssVars.foregroundAccent, lineHeight: '1.6' }}>
                20+ carefully crafted components organized into atoms and molecules. Built with a systematic approach to component architecture for consistency and scalability.
              </p>
              <ul style={{ fontSize: '14px', color: cssVars.foregroundAccent, lineHeight: '1.8', listStyle: 'none', paddingLeft: 0, marginTop: '16px' }}>
                <li>{'\u2022'} Atoms: 18 atomic components and growing!</li>
                <li>{'\u2022'} Molecules: 3 molecules for now, with some on the way</li>
                <li>{'\u2022'} Iconnoir Iconography</li>
              </ul>
            </div>
          </Card>
        </AnimatedCard>

        <AnimatedCard delay={200}>
          <Card variant="glassmorphic" size="lg" shape="round" color="info">
            <div style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <Icon name="Code" size="lg" style={{ color: cssVars.info, flexShrink: 0 }} />
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: cssVars.foreground, margin: 0 }}>
                  TypeScript First
                </h2>
              </div>
              <p style={{ fontSize: '16px', color: cssVars.foregroundAccent, lineHeight: '1.6' }}>
                Built with TypeScript 5 and React 19. Full type safety, intelligent autocomplete, and comprehensive type definitions for every component and hook.
              </p>
              <ul style={{ fontSize: '14px', color: cssVars.foregroundAccent, lineHeight: '1.8', listStyle: 'none', paddingLeft: 0, marginTop: '16px' }}>
                <li>{'\u2022'} Comprehensive type definitions</li>
                <li>{'\u2022'} IntelliSense support</li>
                <li>{'\u2022'} Strict mode enabled</li>
                <li>{'\u2022'} Zero any types</li>
              </ul>
            </div>
          </Card>
        </AnimatedCard>
      </section>

      {/* Documentation section */}
      <section id="docs-section" style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 32px' }}>
        <SectionHeading
          icon="BookSolid"
          iconColor={cssVars.info}
          title="Documentation"
          subtitle="Comprehensive guides, API references, and examples"
          cssVars={cssVars}
          isMobile={isMobile}
        />
        <div style={{ columns: isMobile ? 1 : 2, columnGap: '48px' }}>
          <AnimatedCard delay={100}>
            <Card variant="glassmorphic" size="lg" shape="round" color="secondary">
              <div style={{ padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <Icon name="Settings" size="lg" style={{ color: cssVars.secondary, flexShrink: 0 }} />
                  <h2 style={{ fontSize: '24px', fontWeight: '600', color: cssVars.foreground, margin: 0 }}>RoundTable Providers</h2>
                </div>
                <p style={{ fontSize: '16px', color: cssVars.foregroundAccent, lineHeight: '1.6' }}>
                  Understand the provider ecosystem wrapping all components. ThemeProvider, AuthProvider, ToastProvider, LoadingProvider, ModalProvider, and SettingsProvider work together seamlessly.
                </p>
                <ul style={{ fontSize: '14px', color: cssVars.foregroundAccent, lineHeight: '1.8', listStyle: 'none', paddingLeft: 0, marginTop: '16px' }}>
                  <li>{'\u2022'} Configure RoundTable wrapper</li>
                  <li>{'\u2022'} Provider composition patterns</li>
                  <li>{'\u2022'} Context hook usage</li>
                </ul>
              </div>
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={200}>
            <Card variant="glassmorphic" size="lg" shape="round" color="primary">
              <div style={{ padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <Icon name="OpenBook" size="lg" style={{ color: cssVars.primary, flexShrink: 0 }} />
                  <h2 style={{ fontSize: '24px', fontWeight: '600', color: cssVars.foreground, margin: 0 }}>Quick Start Guide</h2>
                </div>
                <p style={{ fontSize: '16px', color: cssVars.foregroundAccent, lineHeight: '1.6' }}>
                  Get started with Next.js 15 and Turbopack. Learn installation, RoundTable provider setup, and integrate your first component in minutes.
                </p>
              </div>
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={300}>
            <Card variant="glassmorphic" size="lg" shape="round" color="secondary">
              <div style={{ padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <Icon name="DataTransferBoth" size="lg" style={{ color: cssVars.secondary, flexShrink: 0 }} />
                  <h2 style={{ fontSize: '24px', fontWeight: '600', color: cssVars.foreground, margin: 0 }}>Component API</h2>
                </div>
                <p style={{ fontSize: '16px', color: cssVars.foregroundAccent, lineHeight: '1.6' }}>
                  Complete API reference for all 20+ components, hooks like useCSSVariables(), and utilities. Includes TypeScript definitions, prop tables, and live examples.
                </p>
                <ul style={{ fontSize: '14px', color: cssVars.foregroundAccent, lineHeight: '1.8', listStyle: 'none', paddingLeft: 0, marginTop: '16px' }}>
                  <li>{'\u2022'} Component props documentation</li>
                  <li>{'\u2022'} Hook usage examples</li>
                  <li>{'\u2022'} Provider configuration</li>
                </ul>
              </div>
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={400}>
            <Card variant="glassmorphic" size="lg" shape="round" color="primary">
              <div style={{ padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <Icon name="CodeBracketsSquare" size="lg" style={{ color: cssVars.primary, flexShrink: 0 }} />
                  <h2 style={{ fontSize: '24px', fontWeight: '600', color: cssVars.foreground, margin: 0 }}>Design Standards</h2>
                </div>
                <p style={{ fontSize: '16px', color: cssVars.foregroundAccent, lineHeight: '1.6' }}>
                  Understand atomic design principles, the RoundTable provider architecture, component composition patterns, and WCAG AA accessibility guidelines.
                </p>
                <ul style={{ fontSize: '14px', color: cssVars.foregroundAccent, lineHeight: '1.8', listStyle: 'none', paddingLeft: 0, marginTop: '16px' }}>
                  <li>{'\u2022'} 4px spacing system</li>
                  <li>{'\u2022'} Size scales: xs, sm, md, lg, xl</li>
                  <li>{'\u2022'} Color variants and shapes</li>
                  <li>{'\u2022'} Animation modes</li>
                  <li>{'\u2022'} More design standards defined in the docs</li>
                </ul>
              </div>
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={500}>
            <Card variant="glassmorphic" size="lg" shape="round" color="info">
              <div style={{ padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <Icon name="ColorPicker" size="lg" style={{ color: cssVars.info, flexShrink: 0 }} />
                  <h2 style={{ fontSize: '24px', fontWeight: '600', color: cssVars.foreground, margin: 0 }}>Theming System</h2>
                </div>
                <p style={{ fontSize: '16px', color: cssVars.foregroundAccent, lineHeight: '1.6' }}>
                  Deep dive into the ThemeProvider and 80+ CSS variables. Learn to create custom themes, implement dark mode, and use design tokens effectively.
                </p>
              </div>
            </Card>
          </AnimatedCard>
        </div>
      </section>

      {/* Contact section */}
      <section id="contact-section" style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 32px', paddingBottom: 'calc(80px + var(--safe-bottom))' }}>
        <SectionHeading
          icon="ChatLinesSolid"
          iconColor={cssVars.secondary}
          title="Get in Touch"
          subtitle="Have questions, feedback, or want to contribute? We'd love to hear from you!"
          cssVars={cssVars}
          isMobile={isMobile}
        />
        <div style={{ columns: isMobile ? 1 : 2, columnGap: '48px' }}>
          <AnimatedCard delay={100}>
            <Card variant="glassmorphic" size="lg" shape="round" color="primary" clickable animationMode="parallax"
              onClick={() => window.open('https://github.com/dcormican14/templar', '_blank')}>
              <div style={{ padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <Icon name="Github" size="lg" style={{ color: cssVars.primary, flexShrink: 0 }} />
                  <h2 style={{ fontSize: '24px', fontWeight: '600', color: cssVars.foreground, margin: 0, flex: 1 }}>Open Source</h2>
                  <Icon name="OpenNewWindow" size="md" style={{ color: cssVars.foregroundAccent, flexShrink: 0 }} />
                </div>
                <p style={{ fontSize: '16px', color: cssVars.foregroundAccent, lineHeight: '1.6' }}>
                  Explore the source code on GitHub. Report issues, submit pull requests, and contribute to the future of Templar's development.
                </p>
                <ul style={{ fontSize: '14px', color: cssVars.foregroundAccent, lineHeight: '1.8', listStyle: 'none', paddingLeft: 0, marginTop: '16px' }}>
                  <li>{'\u2022'} Fork and star the repository</li>
                  <li>{'\u2022'} Submit bug reports</li>
                  <li>{'\u2022'} Contribute new components</li>
                </ul>
              </div>
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={200}>
            <Card variant="glassmorphic" size="lg" shape="round" color="destructive" clickable animationMode="parallax"
              onClick={() => window.open('https://www.npmjs.com/package/mournshire', '_blank')}>
              <div style={{ padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <Icon name="Package" size="lg" style={{ color: cssVars.destructive, flexShrink: 0 }} />
                  <h2 style={{ fontSize: '24px', fontWeight: '600', color: cssVars.foreground, margin: 0, flex: 1 }}>npm Package</h2>
                  <Icon name="OpenNewWindow" size="md" style={{ color: cssVars.foregroundAccent, flexShrink: 0 }} />
                </div>
                <p style={{ fontSize: '16px', color: cssVars.foregroundAccent, lineHeight: '1.6' }}>
                  Install Mournshire from npm and start building with our themable component library. Get updates, view documentation, and explore the package ecosystem.
                </p>
                <ul style={{ fontSize: '14px', color: cssVars.foregroundAccent, lineHeight: '1.8', listStyle: 'none', paddingLeft: 0, marginTop: '16px' }}>
                  <li>{'\u2022'} Simple npm install</li>
                  <li>{'\u2022'} Regular updates and releases</li>
                  <li>{'\u2022'} Comprehensive package docs</li>
                  <li>{'\u2022'} Explore dependencies</li>
                </ul>
              </div>
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={300}>
            <Card variant="glassmorphic" size="lg" shape="round" color="info">
              <div style={{ padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <Icon name="Community" size="lg" style={{ color: cssVars.info, flexShrink: 0 }} />
                  <h2 style={{ fontSize: '24px', fontWeight: '600', color: cssVars.foreground, margin: 0 }}>Join the Community</h2>
                </div>
                <p style={{ fontSize: '16px', color: cssVars.foregroundAccent, lineHeight: '1.6' }}>
                  Connect with other developers, share your projects, ask questions, and help shape the roadmap. Your feedback matters.
                </p>
                <ul style={{ fontSize: '14px', color: cssVars.foregroundAccent, lineHeight: '1.8', listStyle: 'none', paddingLeft: 0, marginTop: '16px' }}>
                  <li>{'\u2022'} Join discussions on GitHub</li>
                  <li>{'\u2022'} Share showcase projects</li>
                  <li>{'\u2022'} Request features</li>
                  <li>{'\u2022'} Help other developers</li>
                </ul>
              </div>
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={400}>
            <Card variant="glassmorphic" size="lg" shape="round" color="secondary">
              <div style={{ padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <Icon name="MessageText" size="lg" style={{ color: cssVars.secondary, flexShrink: 0 }} />
                  <h2 style={{ fontSize: '24px', fontWeight: '600', color: cssVars.foreground, margin: 0 }}>Direct Support</h2>
                </div>
                <p style={{ fontSize: '16px', color: cssVars.foregroundAccent, lineHeight: '1.6' }}>
                  Need enterprise support or custom solutions? Reach out for dedicated assistance, consulting services, and priority feature requests.
                </p>
              </div>
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={500}>
            <Card variant="glassmorphic" size="lg" shape="round" color="primary">
              <div style={{ padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <Icon name="SendDiagonal" size="lg" style={{ color: cssVars.primary, flexShrink: 0 }} />
                  <h2 style={{ fontSize: '24px', fontWeight: '600', color: cssVars.foreground, margin: 0 }}>Stay Updated</h2>
                </div>
                <p style={{ fontSize: '16px', color: cssVars.foregroundAccent, lineHeight: '1.6' }}>
                  Subscribe to our newsletter for release updates, new features, tutorials, and best practices delivered directly to your inbox.
                </p>
              </div>
            </Card>
          </AnimatedCard>
        </div>
      </section>
    </>
  );
}

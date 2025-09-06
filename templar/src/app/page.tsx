'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navigation } from './components/molecules/Navigation/Navigation';
import { Icon, Button, Scrollbar } from './components/atoms';
import { OverviewPage, DocumentationPage, ContactPage, ComponentsPage } from './pages';
import {
  useTheme,
  useCSSVariables
} from './providers';

export default function Page() {
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to avoid SSR issues
  if (!mounted) {
    return (
      <div className="!h-screen transition-all duration-300" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
        <div className="h-16 animate-pulse" style={{ backgroundColor: 'var(--muted)' }}></div>
        <main className="container mx-auto px-6 py-8">
          <div className="h-32 animate-pulse rounded" style={{ backgroundColor: 'var(--muted)' }}></div>
        </main>
      </div>
    );
  }

  return <PageContent />;
}

function PageContent() {
  const router = useRouter();

  // Redirect to overview page by default
  useEffect(() => {
    router.push('/overview');
  }, [router]);

  // Show loading state while redirecting
  return (
    <div className="!h-screen transition-all duration-300" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="h-16 animate-pulse" style={{ backgroundColor: 'var(--muted)' }}></div>
      <main className="container mx-auto px-6 py-8">
        <div className="h-32 animate-pulse rounded" style={{ backgroundColor: 'var(--muted)' }}></div>
      </main>
    </div>
  );
}

'use client';

import { Suspense } from 'react';
import { PageWrapper } from '../components/PageWrapper';
import { ComponentsPage } from '../pages';

export default function Components() {
  return (
    <Suspense>
      <PageWrapper activeTab="components">
        <ComponentsPage />
      </PageWrapper>
    </Suspense>
  );
}
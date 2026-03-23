'use client';

import { Suspense } from 'react';
import { PageWrapper } from '../components/PageWrapper';
import { EnvironmentPage } from '../pages/EnvironmentPage';

export default function Environment() {
  return (
    <Suspense>
      <PageWrapper activeTab="environment">
        <EnvironmentPage />
      </PageWrapper>
    </Suspense>
  );
}

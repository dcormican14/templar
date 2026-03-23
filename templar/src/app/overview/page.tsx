'use client';

import { Suspense } from 'react';
import { PageWrapper } from '../components/PageWrapper';
import { OverviewPage } from '../pages';

export default function Overview() {
  return (
    <Suspense>
      <PageWrapper activeTab="overview">
        <OverviewPage />
      </PageWrapper>
    </Suspense>
  );
}
'use client';

import { PageWrapper } from './components/PageWrapper';
import { OverviewPage } from './pages';

export default function Home() {
  return (
    <PageWrapper activeTab="overview">
      <OverviewPage />
    </PageWrapper>
  );
}

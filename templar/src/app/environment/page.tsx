'use client';

import { PageWrapper } from '../components/PageWrapper';
import { EnvironmentPage } from '../pages/EnvironmentPage';

export default function Environment() {
  return (
    <PageWrapper activeTab="environment">
      <EnvironmentPage />
    </PageWrapper>
  );
}

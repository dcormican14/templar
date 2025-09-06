'use client';

import { PageWrapper } from '../components/PageWrapper';
import { ComponentsPage } from '../pages';

export default function Components() {
  return (
    <PageWrapper activeTab="components" useScrollbar={false}>
      <ComponentsPage />
    </PageWrapper>
  );
}
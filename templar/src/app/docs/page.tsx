'use client';

import { useRouter } from 'next/navigation';
import { PageWrapper } from '../components/PageWrapper';
import { DocumentationPage } from '../pages';

export default function Docs() {
  const router = useRouter();

  return (
    <PageWrapper activeTab="docs">
      <DocumentationPage onNavigateToComponents={() => router.push('/components')} />
    </PageWrapper>
  );
}
'use client';

import { PageWrapper } from '../components/PageWrapper';
import { ContactPage } from '../pages';

export default function Contact() {
  return (
    <PageWrapper activeTab="contact">
      <ContactPage />
    </PageWrapper>
  );
}
'use client';

import { RoundTable } from "../providers";

interface ClientProviderWrapperProps {
  children: React.ReactNode;
}

export function ClientProviderWrapper({ children }: ClientProviderWrapperProps) {
  return (
    <RoundTable
      config={{
        theme: {
          defaultTheme: 'system',
          storageKey: 'templar-theme',
        },
        auth: {
          storageKey: 'templar-auth',
        },
        toast: {
          maxToasts: 5,
          defaultDuration: 5000,
        },
        loading: {
          showGlobalSpinner: true,
        },
        modal: {
          maxModals: 3,
        },
        settings: {
          storageKey: 'templar-settings',
        },
      }}
    >
      {children}
    </RoundTable>
  );
}
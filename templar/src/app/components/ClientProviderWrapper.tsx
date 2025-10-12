'use client';

import { RoundTable } from "../providers";
// Import the mourn configuration
import "../../mourn.config";

interface ClientProviderWrapperProps {
  children: React.ReactNode;
}

export function ClientProviderWrapper({ children }: ClientProviderWrapperProps) {
  return (
    <RoundTable>
      {children}
    </RoundTable>
  );
}
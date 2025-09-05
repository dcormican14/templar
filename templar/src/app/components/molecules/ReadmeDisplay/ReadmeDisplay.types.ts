import { ReactNode } from 'react';

export interface ReadmeDisplayProps {
  content: string;
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
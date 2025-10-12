import React from 'react';

export interface NavigationTab {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  badge?: string | number;
  icon?: React.ReactNode;
}

export interface NavigationProps {
  // Brand/Logo area
  icon?: React.ReactNode;
  appName?: string;
  onBrandClick?: () => void;
  
  // Tabs
  tabs?: NavigationTab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  
  // Flexible content areas
  leadingContent?: React.ReactNode;
  trailingContent?: React.ReactNode;
  
  // Styling
  variant?: 'default' | 'elevated' | 'bordered' | 'minimal' | 'solid' | 'ghost' | 'outline' | 'glassmorphic';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'info' | 'custom';
  customColor?: string;
  size?: 'sm' | 'md' | 'lg';
  sticky?: boolean;
  
  // Layout
  fullWidth?: boolean;
  maxWidth?: string;
  
  // Standard props
  className?: string;
  style?: React.CSSProperties;
}

export interface NavigationTabProps {
  tab: NavigationTab;
  isActive: boolean;
  onSelect: (tabId: string) => void;
  size: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'info' | 'custom';
  customColor?: string;
}

export interface NavigationBrandProps {
  icon?: React.ReactNode;
  appName?: string;
  onClick?: () => void;
  size: 'sm' | 'md' | 'lg';
}

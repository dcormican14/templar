import React from 'react';
import type { 
  WithContainerProps, 
  UniversalSize, 
  UniversalColor, 
  UniversalVariant, 
  UniversalShape 
} from '../types';

// Component-specific type aliases (for backward compatibility)
export type DropdownColor = UniversalColor;
export type DropdownVariant = UniversalVariant;
export type DropdownSize = UniversalSize;
export type DropdownShape = UniversalShape;
export type DropdownPosition = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'left' | 'right';

// Text alignment options for header
export type DropdownTextAlignment = 'left' | 'center' | 'right';

export interface DropdownOption {
  value: string | number;
  label: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: string;
  divider?: boolean;
}

export interface DropdownGroup {
  label?: string;
  options: DropdownOption[];
}

// Component-specific props (not covered by universal props)
export interface DropdownSpecificProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Position of the dropdown menu relative to trigger
   * @default 'bottom-start'
   */
  position?: DropdownPosition;
  
  /**
   * Dropdown options or groups
   */
  options: (DropdownOption | DropdownGroup)[];
  
  /**
   * Currently selected value(s)
   */
  value?: string | number | (string | number)[];
  
  /**
   * Whether multiple selection is allowed
   * @default false
   */
  multiple?: boolean;
  
  /**
   * Whether to show search/filter input
   * @default false
   */
  searchable?: boolean;
  
  /**
   * Search placeholder text
   * @default 'Search...'
   */
  searchPlaceholder?: string;
  
  /**
   * Custom filter function for search
   */
  filterFunction?: (option: DropdownOption, query: string) => boolean;
  
  /**
   * Whether to close dropdown after selection (ignored for multiple)
   * @default true
   */
  closeOnSelect?: boolean;
  
  /**
   * Maximum height of dropdown menu
   * @default '300px'
   */
  maxHeight?: string;
  
  /**
   * Custom trigger element
   */
  trigger?: React.ReactNode;
  
  /**
   * Whether to use portals for dropdown menu
   * @default false
   */
  portal?: boolean;
  
  /**
   * Custom empty state message
   * @default 'No options available'
   */
  emptyMessage?: string;
  
  /**
   * Custom no results message for search
   * @default 'No results found'
   */
  noResultsMessage?: string;
  
  /**
   * Whether dropdown menu is currently open (controlled)
   */
  open?: boolean;
  
  /**
   * Callback when dropdown open state changes
   */
  onOpenChange?: (open: boolean) => void;
  
  /**
   * Custom icon for the dropdown trigger
   */
  icon?: React.ReactNode;
  
  /**
   * Whether to show the dropdown arrow
   * @default true
   */
  showArrow?: boolean;
  
  /**
   * Custom className for the dropdown menu
   */
  menuClassName?: string;
  
  /**
   * Custom styles for the dropdown menu
   */
  menuStyle?: React.CSSProperties;
  
  /**
   * Callback when dropdown is about to close
   */
  onClose?: () => void;
  
  /**
   * Callback when dropdown is about to open
   */
  onOpen?: () => void;
  
  /**
   * Optional header content (rendered above the dropdown)
   */
  header?: React.ReactNode;
  
  /**
   * Alignment of the header text
   * @default 'left'
   */
  headerAlignment?: DropdownTextAlignment;
}

// Complete Dropdown props interface extending universal form props for error handling
export interface DropdownProps extends WithContainerProps<DropdownSpecificProps> {
  /**
   * Callback when selection changes
   */
  onChange?: (value: string | number | (string | number)[]) => void;
  
  /**
   * Whether the dropdown has an error state
   */
  error?: boolean;
  
  /**
   * Error text to display
   */
  errorText?: string;
}

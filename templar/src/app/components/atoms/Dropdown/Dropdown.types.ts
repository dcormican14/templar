import React from 'react';

export type DropdownSize = 'sm' | 'md' | 'lg';
export type DropdownVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type DropdownPosition = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'left' | 'right';

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

export interface DropdownProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Visual style variant of the dropdown
   * @default 'outline'
   */
  variant?: DropdownVariant;
  
  /**
   * Size of the dropdown
   * @default 'md'
   */
  size?: DropdownSize;
  
  /**
   * Width of the dropdown
   * @default '200px'
   */
  width?: string | number;
  
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
   * Callback when selection changes
   */
  onChange?: (value: string | number | (string | number)[]) => void;
  
  /**
   * Placeholder text when no selection
   */
  placeholder?: string;
  
  /**
   * Whether multiple selection is allowed
   * @default false
   */
  multiple?: boolean;
  
  /**
   * Whether the dropdown is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether the dropdown is in an error state
   * @default false
   */
  error?: boolean;
  
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
   * Loading state
   * @default false
   */
  loading?: boolean;
  
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
   * Whether to use rounded corners
   * @default false
   */
  rounded?: boolean;
  
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
}

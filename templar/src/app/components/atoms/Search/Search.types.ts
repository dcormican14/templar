import React from 'react';

export type SearchSize = 'sm' | 'md' | 'lg';
export type SearchVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';

export interface SearchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /**
   * Visual style variant of the search input
   * @default 'outline'
   */
  variant?: SearchVariant;
  
  /**
   * Size of the search input
   * @default 'md'
   */
  size?: SearchSize;
  
  /**
   * Current search value
   */
  value?: string;
  
  /**
   * Callback fired when search value changes
   */
  onChange?: (value: string) => void;
  
  /**
   * Callback fired when search is submitted (Enter key or search icon click)
   */
  onSearch?: (value: string) => void;
  
  /**
   * Callback fired when clear button is clicked
   */
  onClear?: () => void;
  
  /**
   * Whether the search input is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether the search input is in an error state
   * @default false
   */
  error?: boolean;
  
  /**
   * Whether to show a search icon
   * @default true
   */
  showSearchIcon?: boolean;
  
  /**
   * Whether to show a clear button when there's text
   * @default true
   */
  showClearButton?: boolean;
  
  /**
   * Position of the search icon
   * @default 'left'
   */
  searchIconPosition?: 'left' | 'right';
  
  /**
   * Whether to use rounded corners
   * @default false
   */
  rounded?: boolean;
  
  /**
   * Loading state
   * @default false
   */
  loading?: boolean;
  
  /**
   * Debounce delay for onChange in milliseconds
   * @default 300
   */
  debounceDelay?: number;
  
  /**
   * Custom search icon
   */
  searchIcon?: React.ReactNode;
  
  /**
   * Custom clear icon
   */
  clearIcon?: React.ReactNode;
  
  /**
   * Width of the search input
   */
  width?: string | number;
  
  /**
   * Whether to clear on escape key
   * @default true
   */
  clearOnEscape?: boolean;
}

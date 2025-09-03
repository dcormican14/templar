import React from 'react';
import type { 
  WithFormProps, 
  UniversalSize, 
  UniversalColor, 
  UniversalVariant, 
  UniversalShape 
} from '../types';

// Component-specific type aliases (for backward compatibility)
export type SearchSize = UniversalSize;
export type SearchColor = UniversalColor;
export type SearchVariant = UniversalVariant;
export type SearchShape = UniversalShape;

// Component-specific props (not covered by universal props)
export interface SearchSpecificProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'color'> {
  /**
   * Callback fired when search is submitted (Enter key or search icon click)
   */
  onSearch?: (value: string) => void;
  
  /**
   * Callback fired when clear button is clicked
   */
  onClear?: () => void;
  
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
   * Whether to clear on escape key
   * @default true
   */
  clearOnEscape?: boolean;
}

// Complete Search props interface extending universal props with custom onChange
export interface SearchProps extends Omit<WithFormProps<SearchSpecificProps>, 'onChange'> {
  /**
   * Callback fired when search value changes
   */
  onChange?: (value: string) => void;
}
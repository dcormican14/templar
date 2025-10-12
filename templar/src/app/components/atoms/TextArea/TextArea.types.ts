import React from 'react';
import type { 
  WithFormProps, 
  UniversalSize, 
  UniversalColor, 
  UniversalVariant,
  UniversalShape 
} from '../types';

// Component-specific type aliases (for backward compatibility)
export type TextAreaSize = UniversalSize;
export type TextAreaColor = UniversalColor;
export type TextAreaVariant = UniversalVariant;
export type TextAreaShape = UniversalShape;
export type TextAreaResize = 'none' | 'both' | 'horizontal' | 'vertical';

// Component-specific props (not covered by universal props)
export interface TextAreaSpecificProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'color'> {
  /**
   * Resize behavior
   * @default 'vertical'
   */
  resize?: TextAreaResize;
  
  /**
   * Description text shown below the textarea
   */
  description?: string;
  
  /**
   * Error message shown when error is true
   */
  errorMessage?: string;
  
  /**
   * Whether to show character count
   * @default false
   */
  showCharacterCount?: boolean;
  
  /**
   * Maximum character length
   */
  maxLength?: number;
  
  /**
   * Minimum number of rows
   * @default 3
   */
  minRows?: number;
  
  /**
   * Maximum number of rows (for auto-resize)
   */
  maxRows?: number;
  
  /**
   * Whether to auto-resize based on content
   * @default false
   */
  autoResize?: boolean;
  
  /**
   * Whether to show line numbers
   * @default false
   */
  showLineNumbers?: boolean;
  
  /**
   * Loading state
   * @default false
   */
  loading?: boolean;
  
  /**
   * Whether to clear on escape key
   * @default false
   */
  clearOnEscape?: boolean;
  
  /**
   * Custom icon to display
   */
  icon?: React.ReactNode;
  
  /**
   * Icon position
   * @default 'top-right'
   */
  iconPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  
  /**
   * Whether clicking on the icon should trigger an action
   * @default false
   */
  iconClickable?: boolean;
  
  /**
   * Icon click handler
   */
  onIconClick?: () => void;
  
}

// Complete TextArea props interface extending universal props
export interface TextAreaProps extends WithFormProps<TextAreaSpecificProps> {
  // No additional overrides needed since TextArea uses standard onChange signature
}

export interface TextAreaRef {
  focus: () => void;
  blur: () => void;
  select: () => void;
  setSelectionRange: (start: number, end: number) => void;
  getValue: () => string;
  setValue: (value: string) => void;
}
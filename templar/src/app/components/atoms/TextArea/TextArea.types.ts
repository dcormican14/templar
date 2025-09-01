import React from 'react';

export type TextAreaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TextAreaColor = 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'info' | 'custom';
export type TextAreaVariant = 'solid' | 'ghost' | 'outline';
export type TextAreaShape = 'sharp' | 'round' | 'pill';
export type TextAreaResize = 'none' | 'both' | 'horizontal' | 'vertical';

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /**
   * Color scheme of the textarea
   * @default 'primary'
   */
  color?: TextAreaColor;
  
  /**
   * Custom color when color is set to 'custom'
   */
  customColor?: string;
  
  /**
   * Visual style variant of the textarea
   * @default 'outline'
   */
  variant?: TextAreaVariant;
  
  /**
   * Shape of the textarea
   * @default 'round'
   */
  shape?: TextAreaShape;
  
  /**
   * Size of the textarea
   * @default 'md'
   */
  size?: TextAreaSize;
  
  /**
   * Resize behavior
   * @default 'vertical'
   */
  resize?: TextAreaResize;
  
  /**
   * Whether the textarea is in an error state
   * @default false
   */
  error?: boolean;
  
  /**
   * Label for the textarea
   */
  label?: string;
  
  /**
   * Description text shown below the textarea
   */
  description?: string;
  
  /**
   * Helper text shown below the textarea
   */
  helperText?: string;
  
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
  
  /**
   * Custom width
   */
  width?: string | number;
  
  /**
   * Custom height
   */
  height?: string | number;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
}

export interface TextAreaRef {
  focus: () => void;
  blur: () => void;
  select: () => void;
  setSelectionRange: (start: number, end: number) => void;
  getValue: () => string;
  setValue: (value: string) => void;
}
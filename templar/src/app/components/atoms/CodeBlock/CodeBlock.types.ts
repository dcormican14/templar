import React from 'react';
import type { 
  WithContainerProps, 
  UniversalSize, 
  UniversalColor, 
  UniversalVariant, 
  UniversalShape 
} from '../types';

// Component-specific type aliases (for backward compatibility)
export type CodeBlockColor = UniversalColor;
export type CodeBlockVariant = UniversalVariant;
export type CodeBlockSize = UniversalSize;
export type CodeBlockShape = UniversalShape;

// Component-specific props (not covered by universal props)
export interface CodeBlockSpecificProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onCopy'> {
  /**
   * Programming language for syntax highlighting
   */
  language?: string;
  
  /**
   * Whether to show a copy button
   * @default false
   */
  copyable?: boolean;
  
  /**
   * Whether to show line numbers
   * @default false
   */
  lineNumbers?: boolean;
  
  /**
   * Line numbers to highlight
   */
  highlight?: number | number[];
  
  /**
   * Whether to enable syntax highlighting
   * @default true
   */
  syntaxHighlighting?: boolean;
  
  /**
   * Callback when copy button is clicked
   */
  onCopy?: (content: string) => void;
  
  /**
   * Code content to display
   */
  children: string | React.ReactNode;
}

// Complete CodeBlock props interface extending universal props
export interface CodeBlockProps extends WithContainerProps<CodeBlockSpecificProps> {}

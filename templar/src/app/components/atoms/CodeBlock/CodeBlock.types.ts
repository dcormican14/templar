export type CodeBlockSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type CodeBlockColor = 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'info' | 'custom';
export type CodeBlockVariant = 'solid' | 'ghost' | 'outline';
export type CodeBlockShape = 'sharp' | 'round' | 'pill';

export interface CodeBlockProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onCopy'> {
  /**
   * Color scheme of the code block
   * @default 'primary'
   */
  color?: CodeBlockColor;
  
  /**
   * Custom color when color is set to 'custom'
   */
  customColor?: string;
  
  /**
   * Visual style variant of the code block
   * @default 'outline'
   */
  variant?: CodeBlockVariant;
  
  /**
   * Shape of the code block
   * @default 'round'
   */
  shape?: CodeBlockShape;
  
  /**
   * Size of the code block
   * @default 'md'
   */
  size?: CodeBlockSize;
  
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
   * Whether to use rounded corners
   * @default false
   * @deprecated Use shape prop instead
   */
  rounded?: boolean;
  
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
   * Maximum height before scrolling
   */
  maxHeight?: string;
  
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

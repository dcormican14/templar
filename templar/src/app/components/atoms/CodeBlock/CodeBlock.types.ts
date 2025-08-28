export type CodeBlockVariant = 'default' | 'inline' | 'terminal' | 'success' | 'error' | 'warning';
export type CodeBlockSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface CodeBlockProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onCopy'> {
  variant?: CodeBlockVariant;
  size?: CodeBlockSize;
  language?: string;
  copyable?: boolean;
  rounded?: boolean;
  lineNumbers?: boolean;
  highlight?: number | number[];
  maxHeight?: string;
  syntaxHighlighting?: boolean;
  onCopy?: (content: string) => void;
  children: string | React.ReactNode;
}

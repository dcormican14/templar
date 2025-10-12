import type { TextAreaSize, TextAreaColor } from './TextArea.types';

/**
 * Get the default size for consistency
 */
export const getDefaultSize = (): TextAreaSize => 'md';

/**
 * Get the default color for consistency
 */
export const getDefaultColor = (): TextAreaColor => 'primary';

/**
 * Calculate the number of lines in text
 */
export const getLineCount = (text: string): number => {
  if (!text) return 1;
  return text.split('\n').length;
};

/**
 * Generate line numbers for display
 */
export const generateLineNumbers = (lineCount: number): string => {
  const lines = [];
  for (let i = 1; i <= lineCount; i++) {
    lines.push(i.toString());
  }
  return lines.join('\n');
};

/**
 * Calculate the character count with optional newline handling
 */
export const getCharacterCount = (
  text: string,
  countNewlines: boolean = true
): number => {
  if (!text) return 0;
  
  if (countNewlines) {
    return text.length;
  }
  
  // Don't count newline characters
  return text.replace(/\n/g, '').length;
};

/**
 * Check if character count is over the limit
 */
export const isOverCharacterLimit = (
  text: string,
  maxLength: number | undefined,
  countNewlines: boolean = true
): boolean => {
  if (!maxLength) return false;
  return getCharacterCount(text, countNewlines) > maxLength;
};

/**
 * Auto-resize textarea height based on content
 */
export const calculateAutoHeight = (
  textarea: HTMLTextAreaElement,
  minRows: number,
  maxRows: number | undefined,
  lineHeight: number
): number => {
  // Reset height to auto to get the correct scroll height
  textarea.style.height = 'auto';
  
  const scrollHeight = textarea.scrollHeight;
  const paddingHeight = 24; // Approximate padding
  const minHeight = minRows * lineHeight + paddingHeight;
  
  let height = Math.max(scrollHeight, minHeight);
  
  if (maxRows) {
    const maxHeight = maxRows * lineHeight + paddingHeight;
    height = Math.min(height, maxHeight);
  }
  
  return height;
};

/**
 * Handle keyboard shortcuts
 */
export const handleKeyDown = (
  event: React.KeyboardEvent<HTMLTextAreaElement>,
  clearOnEscape: boolean,
  onClear?: () => void
) => {
  const { key, ctrlKey, metaKey } = event;
  
  // Handle escape key for clearing
  if (key === 'Escape' && clearOnEscape) {
    event.preventDefault();
    onClear?.();
    return;
  }
  
  // Handle common shortcuts
  if (ctrlKey || metaKey) {
    switch (key) {
      case 'a':
        // Select all - let it work naturally
        break;
      case 'z':
        // Undo - let it work naturally
        break;
      case 'y':
        // Redo - let it work naturally
        break;
      default:
        break;
    }
  }
  
  // Handle tab indentation (optional feature)
  if (key === 'Tab') {
    // Allow tab to work naturally for navigation
    // If we want to add tab indentation, we could handle it here
  }
};

/**
 * Format character count display
 */
export const formatCharacterCount = (
  current: number,
  max: number | undefined
): string => {
  if (max) {
    return `${current}/${max}`;
  }
  return current.toString();
};

/**
 * Validate textarea props
 */
export const validateTextAreaProps = (props: {
  minRows: number;
  maxRows?: number;
  maxLength?: number;
  autoResize: boolean;
}) => {
  const { minRows, maxRows, maxLength, autoResize } = props;
  
  if (process.env.NODE_ENV === 'development') {
    if (minRows < 1) {
      console.warn('TextArea: minRows should be at least 1');
    }
    
    if (maxRows && maxRows < minRows) {
      console.warn('TextArea: maxRows should be greater than or equal to minRows');
    }
    
    if (maxLength && maxLength < 1) {
      console.warn('TextArea: maxLength should be a positive number');
    }
    
    if (autoResize && !maxRows) {
      console.warn('TextArea: Consider setting maxRows when using autoResize to prevent unlimited growth');
    }
  }
};

/**
 * Get ARIA attributes for textarea
 */
export const getAriaAttributes = (props: {
  error: boolean;
  disabled: boolean;
  label?: string;
  description?: string;
  helperText?: string;
  errorMessage?: string;
  maxLength?: number;
  describedBy?: string;
  labelledBy?: string;
}) => {
  const { 
    error, 
    disabled, 
    label, 
    description, 
    helperText, 
    errorMessage, 
    maxLength, 
    describedBy, 
    labelledBy 
  } = props;
  
  const ariaDescribedBy = [];
  if (describedBy) ariaDescribedBy.push(describedBy);
  if (description) ariaDescribedBy.push('textarea-description');
  if (helperText) ariaDescribedBy.push('textarea-helper');
  if (error && errorMessage) ariaDescribedBy.push('textarea-error');
  
  return {
    'aria-invalid': error,
    'aria-disabled': disabled,
    'aria-label': label,
    'aria-describedby': ariaDescribedBy.length > 0 ? ariaDescribedBy.join(' ') : undefined,
    'aria-labelledby': labelledBy,
    'aria-required': undefined, // Will be set by required prop
    maxLength,
  };
};

/**
 * Handle paste events with formatting
 */
export const handlePaste = (
  event: React.ClipboardEvent<HTMLTextAreaElement>,
  maxLength: number | undefined,
  currentValue: string,
  selectionStart: number,
  selectionEnd: number
): { shouldPrevent: boolean; newValue?: string } => {
  if (!maxLength) {
    return { shouldPrevent: false };
  }
  
  const pastedText = event.clipboardData.getData('text');
  const beforeSelection = currentValue.substring(0, selectionStart);
  const afterSelection = currentValue.substring(selectionEnd);
  const newValue = beforeSelection + pastedText + afterSelection;
  
  if (newValue.length > maxLength) {
    // Trim the pasted text to fit within the limit
    const availableSpace = maxLength - beforeSelection.length - afterSelection.length;
    const trimmedPaste = pastedText.substring(0, Math.max(0, availableSpace));
    const finalValue = beforeSelection + trimmedPaste + afterSelection;
    
    return {
      shouldPrevent: true,
      newValue: finalValue,
    };
  }
  
  return { shouldPrevent: false };
};

/**
 * Debounce function for auto-resize
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Get cursor position information
 */
export const getCursorInfo = (textarea: HTMLTextAreaElement) => {
  const { selectionStart, selectionEnd, value } = textarea;
  const beforeCursor = value.substring(0, selectionStart);
  const selectedText = value.substring(selectionStart, selectionEnd);
  const afterCursor = value.substring(selectionEnd);
  
  const lineNumber = beforeCursor.split('\n').length;
  const columnNumber = beforeCursor.split('\n').pop()?.length ?? 0;
  
  return {
    selectionStart,
    selectionEnd,
    selectedText,
    lineNumber,
    columnNumber: columnNumber + 1, // 1-indexed
    hasSelection: selectionStart !== selectionEnd,
  };
};
import React from 'react';

export type FilePickerVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type FilePickerSize = 'sm' | 'md' | 'lg';

export interface FilePickerProps {
  /**
   * Visual style variant of the file picker
   * @default 'outline'
   */
  variant?: FilePickerVariant;
  
  /**
   * Size of the file picker
   * @default 'md'
   */
  size?: FilePickerSize;
  
  /**
   * Whether the file picker is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether the file picker has an error state
   * @default false
   */
  error?: boolean;
  
  /**
   * Whether to use rounded corners
   * @default false
   */
  rounded?: boolean;
  
  /**
   * Accept attribute for file input (file types)
   * @example "image/*", ".pdf,.doc,.docx", "image/png,image/jpeg"
   */
  accept?: string;
  
  /**
   * Whether to allow multiple file selection
   * @default false
   */
  multiple?: boolean;
  
  /**
   * Maximum file size in bytes
   */
  maxSize?: number;
  
  /**
   * Maximum number of files (when multiple is true)
   */
  maxFiles?: number;
  
  /**
   * Custom text for the upload area
   */
  uploadText?: string;
  
  /**
   * Custom text shown below the main upload text
   */
  subText?: string;
  
  /**
   * Helper text displayed below the drop zone
   */
  helperText?: string;
  
  /**
   * Error text to display (overrides internal error state)
   */
  errorText?: string;
  
  /**
   * Placeholder text for the drop zone
   */
  placeholder?: string;
  
  /**
   * Custom icon for the upload area
   */
  icon?: React.ReactNode;
  
  /**
   * Callback fired when files are selected or dropped
   */
  onFilesChange?: (files: File[]) => void;
  
  /**
   * Callback fired when there's an error (file too large, too many files, etc.)
   */
  onError?: (error: string) => void;
  
  /**
   * Current selected files (for controlled component)
   */
  files?: File[];
  
  /**
   * Whether to show the file list
   * @default true
   */
  showFileList?: boolean;
  
  /**
   * Custom width for the file picker
   */
  width?: string | number;
  
  /**
   * Custom height for the file picker
   */
  height?: string | number;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Custom inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Custom ID for the component
   */
  id?: string;
}

export interface FilePickerFileItemProps {
  file: File;
  onRemove?: () => void;
  size: FilePickerSize;
  variant: FilePickerVariant;
  disabled?: boolean;
}

/** Ref interface for imperative FilePicker methods */
export interface FilePickerRef {
  /** Clear all selected files */
  clear: () => void;
  /** Get currently selected files */
  getFiles: () => File[];
  /** Programmatically open file browser */
  browse: () => void;
}

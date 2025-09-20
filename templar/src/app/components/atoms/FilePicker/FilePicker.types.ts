import React from 'react';
import type { 
  WithFormProps, 
  UniversalSize, 
  UniversalColor, 
  UniversalVariant, 
  UniversalShape 
} from '../types';

// Component-specific type aliases (for backward compatibility)
export type FilePickerSize = UniversalSize;
export type FilePickerColor = UniversalColor;
export type FilePickerVariant = UniversalVariant;
export type FilePickerShape = UniversalShape;

// Component-specific props (not covered by universal props)
export interface FilePickerSpecificProps {
  /**
   * Accept attribute for file input (file types)
   * @example "image/*", ".pdf,.doc,.docx", "image/png,image/jpeg"
   */
  accept?: string;

  /**
   * Maximum file size in bytes
   */
  maxSize?: number;

  /**
   * Maximum number of files (automatically enables multiple when > 1)
   * @default 1
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
}

// Complete FilePicker props interface extending universal props
export interface FilePickerProps extends WithFormProps<FilePickerSpecificProps> {}

export interface FilePickerFileItemProps {
  file: File;
  onRemove?: () => void;
  size: FilePickerSize;
  color: FilePickerColor;
  customColor?: string;
  variant: FilePickerVariant;
  shape: FilePickerShape;
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

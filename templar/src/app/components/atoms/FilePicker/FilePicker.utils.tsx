import React from 'react';

// Format file size in human readable format
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

// Get file extension from filename
export const getFileExtension = (filename: string): string => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

// Validate file type against accept string
export const isFileTypeAccepted = (file: File, accept?: string): boolean => {
  if (!accept) return true;
  
  const acceptedTypes = accept.split(',').map(type => type.trim());
  
  return acceptedTypes.some(acceptedType => {
    if (acceptedType.startsWith('.')) {
      // File extension check
      return file.name.toLowerCase().endsWith(acceptedType.toLowerCase());
    } else if (acceptedType.includes('*')) {
      // MIME type with wildcard (e.g., "image/*")
      const [mainType] = acceptedType.split('/');
      return file.type.startsWith(mainType);
    } else {
      // Exact MIME type check
      return file.type === acceptedType;
    }
  });
};

// Validate file size
export const isFileSizeValid = (file: File, maxSize?: number): boolean => {
  if (!maxSize) return true;
  return file.size <= maxSize;
};

// Validate total number of files
export const isFileCountValid = (files: File[], maxFiles?: number): boolean => {
  if (!maxFiles) return true;
  return files.length <= maxFiles;
};

// Process dropped files
export const processDroppedFiles = (
  items: DataTransferItemList,
  accept?: string,
  maxSize?: number,
  maxFiles?: number,
  multiple: boolean = false
): { validFiles: File[]; errors: string[] } => {
  const files: File[] = [];
  const errors: string[] = [];

  // Convert DataTransferItemList to File array
  Array.from(items).forEach(item => {
    if (item.kind === 'file') {
      const file = item.getAsFile();
      if (file) {
        files.push(file);
      }
    }
  });

  // Filter files if not multiple
  const filesToProcess = multiple ? files : files.slice(0, 1);

  // Validate each file
  const validFiles: File[] = [];
  
  filesToProcess.forEach(file => {
    // Check file type
    if (!isFileTypeAccepted(file, accept)) {
      errors.push(`"${file.name}" is not an accepted file type.`);
      return;
    }

    // Check file size
    if (!isFileSizeValid(file, maxSize)) {
      errors.push(`"${file.name}" is too large. Maximum size is ${formatFileSize(maxSize!)}.`);
      return;
    }

    validFiles.push(file);
  });

  // Check total file count
  if (!isFileCountValid(validFiles, maxFiles)) {
    errors.push(`Too many files. Maximum allowed is ${maxFiles}.`);
    return { validFiles: [], errors };
  }

  return { validFiles, errors };
};

// Handle file input change
export const handleFileInputChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  accept?: string,
  maxSize?: number,
  maxFiles?: number,
  multiple: boolean = false
): { validFiles: File[]; errors: string[] } => {
  const files = Array.from(event.target.files || []);
  const errors: string[] = [];

  // Filter files if not multiple
  const filesToProcess = multiple ? files : files.slice(0, 1);

  // Validate each file
  const validFiles: File[] = [];
  
  filesToProcess.forEach(file => {
    // Check file type
    if (!isFileTypeAccepted(file, accept)) {
      errors.push(`"${file.name}" is not an accepted file type.`);
      return;
    }

    // Check file size
    if (!isFileSizeValid(file, maxSize)) {
      errors.push(`"${file.name}" is too large. Maximum size is ${formatFileSize(maxSize!)}.`);
      return;
    }

    validFiles.push(file);
  });

  // Check total file count
  if (!isFileCountValid(validFiles, maxFiles)) {
    errors.push(`Too many files. Maximum allowed is ${maxFiles}.`);
    return { validFiles: [], errors };
  }

  return { validFiles, errors };
};

// Custom hook for drag and drop functionality
export const useDragAndDrop = (
  onFilesChange?: (files: File[]) => void,
  onError?: (error: string) => void,
  accept?: string,
  maxSize?: number,
  maxFiles?: number,
  multiple: boolean = false,
  disabled: boolean = false
) => {
  const [isDragActive, setIsDragActive] = React.useState(false);
  const dragCounter = React.useRef(0);

  const handleDragEnter = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (disabled) return;
    
    dragCounter.current++;
    
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragActive(true);
    }
  }, [disabled]);

  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (disabled) return;
    
    dragCounter.current--;
    
    if (dragCounter.current === 0) {
      setIsDragActive(false);
    }
  }, [disabled]);

  const handleDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (disabled) return;
    
    e.dataTransfer.dropEffect = 'copy';
  }, [disabled]);

  const handleDrop = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (disabled) return;
    
    setIsDragActive(false);
    dragCounter.current = 0;

    if (e.dataTransfer.items) {
      const { validFiles, errors } = processDroppedFiles(
        e.dataTransfer.items,
        accept,
        maxSize,
        maxFiles,
        multiple
      );

      if (errors.length > 0) {
        onError?.(errors.join(' '));
      }

      if (validFiles.length > 0) {
        onFilesChange?.(validFiles);
      }
    }
  }, [disabled, accept, maxSize, maxFiles, multiple, onFilesChange, onError]);

  return {
    isDragActive,
    dragProps: {
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDragOver: handleDragOver,
      onDrop: handleDrop,
    },
  };
};

// Generate unique ID for file picker
export const generateFilePickerId = (): string => {
  return `filepicker-${Math.random().toString(36).substr(2, 9)}`;
};

// Create accessibility props
export const createFilePickerAccessibilityProps = (
  id: string,
  disabled: boolean,
  error: boolean,
  accept?: string,
  multiple?: boolean
) => {
  const acceptDescription = accept ? ` Accepted file types: ${accept}.` : '';
  const multipleDescription = multiple ? ' You can select multiple files.' : ' You can select one file.';
  
  return {
    role: 'button',
    tabIndex: disabled ? -1 : 0,
    'aria-disabled': disabled,
    'aria-invalid': error,
    'aria-describedby': `${id}-description`,
    'aria-label': `File upload area.${acceptDescription}${multipleDescription} Click to browse or drag and drop files here.`,
  };
};

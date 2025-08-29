import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { Icon } from '../Icon';
import { FilePickerProps, FilePickerRef } from './FilePicker.types';
import { 
  dropZoneStyles,
  fileListStyles, 
  fileItemStyles, 
  removeButtonStyles,
  hiddenInputStyles,
  errorStyles,
  helperTextStyles
} from './FilePicker.styles';
import { 
  useDragAndDrop, 
  handleFileInputChange, 
  formatFileSize, 
  generateFilePickerId,
  createFilePickerAccessibilityProps 
} from './FilePicker.utils';

export const FilePicker = forwardRef<FilePickerRef, FilePickerProps>(({
  variant = 'outline',
  size = 'md',
  multiple = false,
  disabled = false,
  accept,
  maxSize,
  maxFiles,
  helperText,
  errorText,
  placeholder = 'Drop files here or click to browse',
  showFileList = true,
  onFilesChange,
  onError,
  className,
  style,
  ...props
}, ref) => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [error, setError] = React.useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const filePickerId = React.useMemo(() => generateFilePickerId(), []);

  // Expose methods through ref
  useImperativeHandle(ref, () => ({
    clear: () => {
      setFiles([]);
      setError('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    getFiles: () => files,
    browse: () => {
      if (!disabled && fileInputRef.current) {
        fileInputRef.current.click();
      }
    }
  }));

  // Handle error states
  const currentError = errorText || error;
  const isError = Boolean(currentError);

  // Drag and drop functionality
  const { isDragActive, dragProps } = useDragAndDrop(
    (newFiles) => {
      const updatedFiles = multiple ? [...files, ...newFiles] : newFiles;
      setFiles(updatedFiles);
      setError('');
      onFilesChange?.(updatedFiles);
    },
    (errorMessage) => {
      setError(errorMessage);
      onError?.(errorMessage);
    },
    accept,
    maxSize,
    maxFiles,
    multiple,
    disabled
  );

  // Handle file input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { validFiles, errors } = handleFileInputChange(
      event,
      accept,
      maxSize,
      maxFiles,
      multiple
    );

    if (errors.length > 0) {
      const errorMessage = errors.join(' ');
      setError(errorMessage);
      onError?.(errorMessage);
      return;
    }

    const updatedFiles = multiple ? [...files, ...validFiles] : validFiles;
    setFiles(updatedFiles);
    setError('');
    onFilesChange?.(updatedFiles);
  };

  // Handle clicking the drop zone
  const handleDropZoneClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle removing a file
  const handleRemoveFile = (indexToRemove: number) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(updatedFiles);
    setError('');
    onFilesChange?.(updatedFiles);

    // Clear the input value if no files remain
    if (updatedFiles.length === 0 && fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleDropZoneClick();
    }
  };

  // Create accessibility props
  const accessibilityProps = createFilePickerAccessibilityProps(
    filePickerId,
    disabled,
    isError,
    accept,
    multiple
  );

  return (
    <div className={className} style={style}>
      {/* Drop Zone */}
      <div
        {...dragProps}
        {...accessibilityProps}
        onClick={handleDropZoneClick}
        onKeyDown={handleKeyDown}
        style={{
          ...dropZoneStyles({
            variant,
            size,
            disabled,
            error: isError,
            isDragActive
          }),
        }}
        {...props}
      >
        <Icon 
          name="CloudUpload" 
          size={size === 'lg' ? 24 : size === 'sm' ? 16 : 20}
          style={{ 
            marginBottom: size === 'lg' ? '12px' : size === 'sm' ? '6px' : '8px',
            opacity: disabled ? 0.5 : 1 
          }}
        />
        
        <span style={{
          fontSize: size === 'lg' ? '16px' : size === 'sm' ? '12px' : '14px',
          opacity: disabled ? 0.5 : 1
        }}>
          {isDragActive ? 'Drop files here' : placeholder}
        </span>

        {/* Helper text */}
        {helperText && !isError && (
          <span 
            id={`${filePickerId}-description`}
            style={helperTextStyles({ size })}
          >
            {helperText}
          </span>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleInputChange}
        style={hiddenInputStyles}
        tabIndex={-1}
        aria-hidden="true"
      />

      {/* Error message */}
      {isError && (
        <div 
          id={`${filePickerId}-error`}
          style={errorStyles({ size })}
          role="alert"
          aria-live="polite"
        >
          <Icon name="AlertCircle" size={14} style={{ marginRight: '6px' }} />
          {currentError}
        </div>
      )}

      {/* File list */}
      {showFileList && files.length > 0 && (
        <div style={fileListStyles({ size })}>
          {files.map((file, index) => (
            <div
              key={`${file.name}-${file.size}-${index}`}
              style={fileItemStyles({ size })}
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                flex: 1,
                minWidth: 0 // Allows text truncation
              }}>
                <Icon 
                  name="Attachment" 
                  size={size === 'lg' ? 16 : size === 'sm' ? 12 : 14}
                  style={{ 
                    marginRight: size === 'lg' ? '8px' : '6px',
                    flexShrink: 0
                  }}
                />
                <div style={{ 
                  flex: 1,
                  minWidth: 0,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <span style={{
                    fontSize: size === 'lg' ? '14px' : size === 'sm' ? '11px' : '12px',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {file.name}
                  </span>
                  <span style={{
                    fontSize: size === 'lg' ? '12px' : size === 'sm' ? '10px' : '11px',
                    opacity: 0.7,
                    color: 'var(--foreground-muted)'
                  }}>
                    {formatFileSize(file.size)}
                  </span>
                </div>
              </div>
              
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile(index);
                }}
                style={removeButtonStyles({ size })}
                aria-label={`Remove ${file.name}`}
                disabled={disabled}
              >
                <Icon 
                  name="Cancel" 
                  size={size === 'lg' ? 16 : size === 'sm' ? 12 : 14}
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

FilePicker.displayName = 'FilePicker';

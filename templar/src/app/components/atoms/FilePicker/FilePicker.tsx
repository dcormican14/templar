import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { Icon } from '../Icon';
import { Button } from '../Button';
import { useCSSVariables } from '@/app/providers';
import { extractFormProps, UNIVERSAL_DEFAULTS } from '../types';
import { FilePickerProps, FilePickerRef } from './FilePicker.types';
import {
  createFilePickerContainerStyles,
  getFilePickerDropZoneStyles,
  getIconStyles,
  getUploadTextStyles,
  getSubTextStyles,
  getHelperTextStyles,
  getFileListStyles,
  getFileItemStyles,
  getFileInfoStyles,
  getFileNameStyles,
  getFileSizeStyles,
  getHiddenInputStyles
} from './FilePicker.styles';
import { 
  useDragAndDrop, 
  handleFileInputChange, 
  formatFileSize, 
  generateFilePickerId,
  createFilePickerAccessibilityProps 
} from './FilePicker.utils';

export const FilePicker = forwardRef<FilePickerRef, FilePickerProps>((allProps, ref) => {
  // Extract form props and component-specific props
  const [formProps, componentProps] = extractFormProps(allProps);
  
  // Destructure form props with defaults
  const {
    color = UNIVERSAL_DEFAULTS.color,
    customColor,
    variant = UNIVERSAL_DEFAULTS.variant,
    shape = UNIVERSAL_DEFAULTS.shape,
    size = UNIVERSAL_DEFAULTS.size,
    disabled = UNIVERSAL_DEFAULTS.disabled,
    loading = UNIVERSAL_DEFAULTS.loading,
    loadingKey,
    width,
    height,
    className,
    style,
    id,
    'data-testid': dataTestId,
    animate = UNIVERSAL_DEFAULTS.animate,
    rounded, // Legacy support
    helperText,
    errorText,
    error,
  } = formProps;
  
  // Destructure component-specific props
  const {
    accept,
    multiple = false,
    maxSize,
    maxFiles,
    uploadText,
    subText,
    icon,
    onFilesChange,
    onError,
    files,
    showFileList = true,
    ...restProps
  } = componentProps;
  
  const cssVars = useCSSVariables();
  const animationsEnabled = animate;

  // Don't render if cssVars is not ready
  if (!cssVars) {
    return null;
  }
  const [internalFiles, setInternalFiles] = React.useState<File[]>([]);
  const [internalError, setInternalError] = React.useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const filePickerId = React.useMemo(() => id || generateFilePickerId(), [id]);

  // Use controlled or uncontrolled files
  const currentFiles = files !== undefined ? files : internalFiles;
  const setCurrentFiles = files !== undefined ? 
    (newFiles: File[]) => onFilesChange?.(newFiles) : 
    setInternalFiles;

  // Handle error states
  const currentError = errorText || internalError;
  const isError = error || Boolean(currentError);

  // Expose methods through ref
  useImperativeHandle(ref, () => ({
    clear: () => {
      setCurrentFiles([]);
      setInternalError('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    getFiles: () => currentFiles,
    browse: () => {
      if (!disabled && fileInputRef.current) {
        fileInputRef.current.click();
      }
    }
  }));

  // Drag and drop functionality
  const { isDragActive, dragProps } = useDragAndDrop(
    (newFiles) => {
      const updatedFiles = multiple ? [...currentFiles, ...newFiles] : newFiles;
      setCurrentFiles(updatedFiles);
      setInternalError('');
    },
    (errorMessage) => {
      setInternalError(errorMessage);
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
      setInternalError(errorMessage);
      onError?.(errorMessage);
      return;
    }

    const updatedFiles = multiple ? [...currentFiles, ...validFiles] : validFiles;
    setCurrentFiles(updatedFiles);
    setInternalError('');
  };

  // Handle clicking the drop zone
  const handleDropZoneClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle removing a file
  const handleRemoveFile = (indexToRemove: number) => {
    const updatedFiles = currentFiles.filter((_, index) => index !== indexToRemove);
    setCurrentFiles(updatedFiles);
    setInternalError('');

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
    <div 
      className={className} 
      style={{
        ...createFilePickerContainerStyles(shape, width, height, animationsEnabled, rounded),
        ...style
      }}
      data-testid={dataTestId}
    >
      {/* Drop Zone */}
      <div
        {...dragProps}
        {...accessibilityProps}
        onClick={handleDropZoneClick}
        onKeyDown={handleKeyDown}
        style={getFilePickerDropZoneStyles(
          color,
          customColor,
          variant,
          size,
          shape,
          disabled,
          isError,
          isDragActive,
          animationsEnabled,
          cssVars,
          rounded
        )}
        {...restProps}
      >
        {/* Icon */}
        <div style={getIconStyles(size, cssVars)}>
          {icon || (
            <Icon 
              name="CloudUpload" 
              size="lg"
            />
          )}
        </div>
        
        {/* Main upload text */}
        <div style={getUploadTextStyles(size, cssVars)}>
          {isDragActive 
            ? 'Drop files here' 
            : uploadText || 'Drop files here or click to browse'
          }
        </div>

        {/* Sub text */}
        {subText && (
          <div style={getSubTextStyles(size, cssVars)}>
            {subText}
          </div>
        )}
      </div>

      {/* Helper text */}
      {helperText && !isError && (
        <div 
          id={`${filePickerId}-description`}
          style={getHelperTextStyles(size, disabled, false, cssVars)}
        >
          {helperText}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        id={filePickerId}
        multiple={multiple}
        accept={accept}
        onChange={handleInputChange}
        style={getHiddenInputStyles()}
        tabIndex={-1}
        aria-hidden="true"
      />

      {/* Error message */}
      {isError && (
        <div 
          id={`${filePickerId}-error`}
          style={getHelperTextStyles(size, disabled, true, cssVars)}
          role="alert"
          aria-live="polite"
        >
          <Icon name="WarningCircle" size="sm" style={{ marginRight: '6px' }} />
          {currentError}
        </div>
      )}

      {/* File list */}
      {showFileList && currentFiles.length > 0 && (
        <div style={getFileListStyles()}>
          {currentFiles.map((file, index) => (
            <div
              key={`${file.name}-${file.size}-${index}`}
              style={getFileItemStyles(
                color,
                customColor,
                variant,
                size,
                shape,
                disabled,
                animationsEnabled,
                cssVars,
                rounded
              )}
            >
              <div style={getFileInfoStyles()}>
                <Icon 
                  name="Attachment" 
                  size="sm"
                  style={{ 
                    marginRight: '8px',
                    flexShrink: 0
                  }}
                />
                <div style={{ 
                  flex: 1,
                  minWidth: 0,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <span style={getFileNameStyles(cssVars)}>
                    {file.name}
                  </span>
                  <span style={getFileSizeStyles(cssVars)}>
                    {formatFileSize(file.size)}
                  </span>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                color={variant === 'outline' || variant === 'solid' ? 'custom' : color}
                customColor={variant === 'outline' || variant === 'solid' ? cssVars.foreground : undefined}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile(index);
                }}
                aria-label={`Remove ${file.name}`}
                disabled={disabled}
                animate={animationsEnabled}
                style={{
                  minWidth: 'auto',
                  padding: '4px',
                  borderRadius: '50%',
                  aspectRatio: '1',
                }}
              >
                <Icon
                  name="Xmark"
                  size="sm"
                />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

FilePicker.displayName = 'FilePicker';

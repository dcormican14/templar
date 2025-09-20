'use client';

import React, { forwardRef, useMemo, useState, useCallback } from 'react';
import { useCSSVariables, useSettings, useToast } from '../../../providers';
import { extractContainerProps, UNIVERSAL_DEFAULTS } from '../types';
import type { CodeBlockProps } from './CodeBlock.types';
import {
  getVariantStyles,
  getSizeStyles,
  createBaseStyles,
  getCopyButtonStyles,
  getLineNumberStyles,
  getColorVariables,
  getInlineCodeStyles
} from './CodeBlock.styles';
import { 
  extractTextContent, 
  copyToClipboard, 
  createCopyButton, 
  createLineNumbers, 
  highlightLines,
  getLanguageLabel 
} from './CodeBlock.utils';
import { highlightSyntax, createSyntaxTheme } from './CodeBlock.syntax';
import { Button, Icon } from '../';

export const CodeBlock = forwardRef<HTMLElement, CodeBlockProps>((allProps, ref) => {
  // Extract container props and component-specific props
  const [containerProps, componentProps] = extractContainerProps(allProps);
  
  // Destructure container props with defaults
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
    children,
    clickable,
    onClick,
    onAsyncClick,
    maxHeight,
  } = containerProps;
  
  // Destructure component-specific props
  const {
    language,
    copyable = false,
    lineNumbers = false,
    highlight,
    syntaxHighlighting = true,
    inline = false,
    onCopy,
    showLineNumbers, // Legacy prop that should not be passed to DOM
    code, // Legacy prop that should not be passed to DOM
    ...restProps
  } = componentProps;
    // Hooks
    const cssVars = useCSSVariables();
    const { settings } = useSettings();
    const { success, error } = useToast();

    // State
    const [copied, setCopied] = useState(false);

    // Computed values
    const isInline = inline;
    const animationsEnabled = (settings.appearance.animations ?? true) && animate;
    const textContent = extractTextContent(children);
    const syntaxTheme = useMemo(() => createSyntaxTheme(cssVars), [cssVars]);

    // Event handlers
    const handleCopy = useCallback(async () => {
      const copySuccess = await copyToClipboard(textContent);
      if (copySuccess) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        onCopy?.(textContent);
        success('Code copied to clipboard!');
      } else {
        error('Failed to copy code to clipboard');
      }
    }, [textContent, onCopy, success, error]);

    // Styles
    const baseStyles = useMemo(() => createBaseStyles(
      shape,
      typeof maxHeight === 'string' ? maxHeight : maxHeight?.toString(),
      animationsEnabled,
      lineNumbers, // Pass line numbers flag
      rounded // Legacy support
    ), [shape, maxHeight, animationsEnabled, lineNumbers, rounded]);

    const variantStyles = useMemo(() => getVariantStyles(color, customColor, variant, cssVars, lineNumbers), [color, customColor, variant, cssVars, lineNumbers]);
    const sizeStyles = useMemo(() => getSizeStyles(size), [size]);

    const combinedStyles: React.CSSProperties = {
      ...baseStyles,
      ...sizeStyles,
      ...variantStyles,
      paddingTop: language ? '32px' : sizeStyles.padding,
      paddingLeft: lineNumbers ? '52px' : '16px',
      width,
      height,
      ...style,
    };

    const copyButtonStyles = useMemo(() => getCopyButtonStyles(size, cssVars, animationsEnabled), [size, cssVars, animationsEnabled]);
    const lineNumberStyles = useMemo(() => getLineNumberStyles(size, cssVars, color, customColor, shape), [size, cssVars, color, customColor, shape]);
    const inlineStyles = useMemo(() => getInlineCodeStyles(color, customColor, variant, size, shape, cssVars), [color, customColor, variant, size, shape, cssVars]);

    // Content rendering
    const renderContent = () => {
      if (typeof children === 'string') {
        // Apply syntax highlighting if language is specified and enabled
        if (language && syntaxHighlighting) {
          const highlightedElements = highlightSyntax(children, language, syntaxTheme);
          
          // If we also have line highlighting, we need to combine both
          if (highlight) {
            const lines = children.split('\n');
            const highlightArray = Array.isArray(highlight) ? highlight : [highlight];
            
            return lines.map((line, index) => {
              const lineNumber = index + 1;
              const isHighlighted = highlightArray.includes(lineNumber);
              const lineHighlighted = highlightSyntax(line, language, syntaxTheme);
              
              return (
                <div
                  key={lineNumber}
                  style={{
                    backgroundColor: isHighlighted 
                      ? cssVars.getColorWithOpacity?.('primary', 0.1) || 'rgba(59, 130, 246, 0.1)'
                      : 'transparent',
                    padding: '0 4px',
                    margin: '0 -4px',
                  }}
                >
                  {lineHighlighted}
                  {index < lines.length - 1 && '\n'}
                </div>
              );
            });
          }
          
          return highlightedElements;
        }
        
        // Fallback to line highlighting without syntax highlighting
        if (highlight) {
          return highlightLines(children, highlight, cssVars);
        }
      }
      
      return children;
    };

    // For inline code blocks, use <code> element
    if (isInline) {
      return (
        <code
          ref={ref as React.Ref<HTMLElement>}
          id={id}
          style={{...inlineStyles, ...style}}
          className={className}
          data-testid={dataTestId}
          {...restProps}
        >
          {children}
        </code>
      );
    }

    return (
      <div style={{ position: 'relative' }}>
        {/* Language label */}
        {language && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: lineNumbers ? '52px' : '16px', // Move right when line numbers are present
              fontSize: '12px',
              color: variant === 'solid'
                ? getColorVariables(color, customColor, cssVars).foreground
                : getColorVariables(color, customColor, cssVars).main,
              fontFamily: 'inherit',
              zIndex: 2, // Higher z-index to appear above line numbers
              opacity: 0.8,
              userSelect: 'none',
              fontWeight: '500',
            }}
          >
            {getLanguageLabel(language)}
          </div>
        )}

        {/* Copy button */}
        {copyable && (
          <div style={{
            position: 'absolute',
            top: '4px',
            right: '8px',
            zIndex: 2
          }}>
            <Button
              size="sm"
              variant="ghost"
              color={color}
              onClick={handleCopy}
              animate={animationsEnabled}
              style={{
                minWidth: 'auto',
                padding: '6px 8px',
                color: variant === 'solid'
                  ? getColorVariables(color, customColor, cssVars).foreground
                  : (variant === 'outline' || variant === 'glassmorphic' || variant === 'ghost')
                    ? getColorVariables(color, customColor, cssVars).main
                    : undefined
              }}
            >
              <Icon 
                name={copied ? "CheckCircle" : "Copy"} 
                size="sm" 
              />
            </Button>
          </div>
        )}

        {/* Line numbers */}
        {lineNumbers && createLineNumbers(textContent, lineNumberStyles)}

        {/* Main code block */}
        <pre
          ref={ref as React.Ref<HTMLPreElement>}
          id={id}
          style={combinedStyles}
          className={className}
          data-testid={dataTestId}
          {...restProps}
        >
          <code>
            {renderContent()}
          </code>
        </pre>
      </div>
    );
  }
);

CodeBlock.displayName = 'CodeBlock';
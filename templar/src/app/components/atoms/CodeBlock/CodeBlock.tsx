'use client';

import React, { forwardRef, useMemo, useState, useCallback } from 'react';
import { useCSSVariables, useSettings, useToast } from '../../../providers';
import type { CodeBlockProps } from './CodeBlock.types';
import { 
  getVariantStyles, 
  getSizeStyles, 
  createBaseStyles, 
  getCopyButtonStyles,
  getLineNumberStyles
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

export const CodeBlock = forwardRef<HTMLElement, CodeBlockProps>(
  ({ 
    variant = 'default',
    size = 'md',
    language,
    copyable = false,
    rounded = false,
    lineNumbers = false,
    highlight,
    maxHeight,
    syntaxHighlighting = true,
    onCopy,
    children,
    className,
    style,
    ...props 
  }, ref) => {
    // Hooks
    const cssVars = useCSSVariables();
    const { settings } = useSettings();
    const { success, error } = useToast();

    // State
    const [copied, setCopied] = useState(false);

    // Computed values
    const isInline = variant === 'inline';
    const animationsEnabled = settings.appearance.animations;
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
      Boolean(rounded),
      isInline,
      maxHeight,
      animationsEnabled
    ), [rounded, isInline, maxHeight, animationsEnabled]);

    const variantStyles = useMemo(() => getVariantStyles(variant, cssVars), [variant, cssVars]);
    const sizeStyles = useMemo(() => getSizeStyles(size), [size]);

    const combinedStyles: React.CSSProperties = {
      ...baseStyles,
      ...sizeStyles,
      ...variantStyles,
      paddingTop: language ? '24px' : sizeStyles.padding,
      paddingLeft: lineNumbers ? '52px' : '16px',
      ...style,
    };

    const copyButtonStyles = useMemo(() => getCopyButtonStyles(cssVars, animationsEnabled), [cssVars, animationsEnabled]);
    const lineNumberStyles = useMemo(() => getLineNumberStyles(cssVars), [cssVars]);

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
          style={variantStyles}
          className={className}
          {...props}
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
              top: '8px',
              left: '16px',
              fontSize: '12px',
              color: cssVars.mutedForeground,
              fontFamily: 'inherit',
              zIndex: 1,
              opacity: 0.7,
              userSelect: 'none',
            }}
          >
            {getLanguageLabel(language)}
          </div>
        )}

        {/* Copy button */}
        {copyable && createCopyButton(handleCopy, copied, copyButtonStyles, animationsEnabled)}

        {/* Line numbers */}
        {lineNumbers && createLineNumbers(textContent, lineNumberStyles)}

        {/* Main code block */}
        <pre
          ref={ref as React.Ref<HTMLPreElement>}
          style={combinedStyles}
          className={className}
          {...props}
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
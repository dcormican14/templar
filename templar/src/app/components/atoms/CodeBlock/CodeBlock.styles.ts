import React from 'react';
import type { CodeBlockVariant, CodeBlockSize } from './CodeBlock.types';

export const getVariantStyles = (variant: CodeBlockVariant, cssVars: any): React.CSSProperties => {
  const baseStyles = {
    borderWidth: '1px',
    borderStyle: 'solid' as const,
  };

  switch (variant) {
    case 'default':
      return {
        backgroundColor: cssVars.getColorWithOpacity?.('muted', 0.8) || cssVars.muted,
        color: cssVars.mutedForeground,
        borderColor: cssVars.border,
        ...baseStyles,
      };
    case 'inline':
      return {
        backgroundColor: cssVars.getColorWithOpacity?.('muted', 0.6) || cssVars.muted,
        color: cssVars.mutedForeground,
        borderColor: cssVars.border,
        borderWidth: '1px',
        borderRadius: '8px',
        padding: '2px 6px',
        fontSize: '0.9em',
        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
      };
    case 'terminal':
      return {
        backgroundColor: '#1a1a1a',
        color: '#00ff00',
        borderColor: '#333333',
        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
        ...baseStyles,
      };
    case 'success':
      return {
        backgroundColor: cssVars.getColorWithOpacity?.('success', 0.1) || cssVars.success,
        color: cssVars.successForeground,
        borderColor: cssVars.getColorWithOpacity?.('success', 0.3) || cssVars.success,
        ...baseStyles,
      };
    case 'error':
      return {
        backgroundColor: cssVars.getColorWithOpacity?.('error', 0.1) || cssVars.error,
        color: cssVars.errorForeground,
        borderColor: cssVars.getColorWithOpacity?.('error', 0.3) || cssVars.error,
        ...baseStyles,
      };
    case 'warning':
      return {
        backgroundColor: cssVars.getColorWithOpacity?.('warning', 0.1) || cssVars.warning,
        color: cssVars.warningForeground,
        borderColor: cssVars.getColorWithOpacity?.('warning', 0.3) || cssVars.warning,
        ...baseStyles,
      };
    default:
      return {
        backgroundColor: cssVars.muted,
        color: cssVars.mutedForeground,
        borderColor: cssVars.border,
        ...baseStyles,
      };
  }
};

export const getSizeStyles = (size: CodeBlockSize): React.CSSProperties => {
  const sizeMap = {
    xs: { 
      padding: '8px', 
      fontSize: '11px', 
      lineHeight: '1.4',
      borderRadius: '8px'
    },
    sm: { 
      padding: '12px', 
      fontSize: '12px', 
      lineHeight: '1.4',
      borderRadius: '8px'
    },
    md: { 
      padding: '16px', 
      fontSize: '13px', 
      lineHeight: '1.5',
      borderRadius: '8px'
    },
    lg: { 
      padding: '20px', 
      fontSize: '14px', 
      lineHeight: '1.5',
      borderRadius: '8px'
    },
    xl: { 
      padding: '24px', 
      fontSize: '15px', 
      lineHeight: '1.6',
      borderRadius: '8px'
    },
  };
  return sizeMap[size];
};

export const createBaseStyles = (
  rounded: boolean,
  isInline: boolean,
  maxHeight?: string,
  animationsEnabled?: boolean
): React.CSSProperties => ({
  display: isInline ? 'inline-block' : 'block',
  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
  whiteSpace: isInline ? 'nowrap' : 'pre-wrap',
  overflowX: isInline ? 'visible' : 'auto',
  overflowY: maxHeight ? 'auto' : 'visible',
  maxHeight: maxHeight || 'none',
  borderRadius: rounded ? '24px' : undefined,
  transition: animationsEnabled ? 'all 0.2s ease' : 'none',
  position: 'relative',
  wordBreak: 'break-all',
  tabSize: 2,
});

export const getCopyButtonStyles = (cssVars: any, animationsEnabled: boolean): React.CSSProperties => ({
  position: 'absolute',
  top: '8px',
  right: '8px',
  backgroundColor: cssVars.getColorWithOpacity?.('background', 0.8) || cssVars.background,
  color: cssVars.mutedForeground,
  border: `1px solid ${cssVars.border}`,
  borderRadius: '8px',
  padding: '4px 8px',
  fontSize: '12px',
  cursor: 'pointer',
  transition: animationsEnabled ? 'all 0.2s ease' : 'none',
  fontFamily: 'inherit',
  zIndex: 1,
});

export const getLineNumberStyles = (cssVars: any): React.CSSProperties => ({
  position: 'absolute',
  left: '0',
  top: '0',
  bottom: '0',
  width: '40px',
  backgroundColor: cssVars.getColorWithOpacity?.('muted', 0.5) || cssVars.muted,
  borderRight: `1px solid ${cssVars.border}`,
  padding: '16px 8px',
  fontSize: '12px',
  lineHeight: '1.5',
  color: cssVars.getColorWithOpacity?.('mutedForeground', 0.7) || cssVars.mutedForeground,
  userSelect: 'none',
  textAlign: 'right',
});

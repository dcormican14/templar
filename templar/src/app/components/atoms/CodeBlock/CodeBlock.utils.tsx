import React from 'react';
import { Icon } from '../Icon';

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    }
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};

export const extractTextContent = (children: React.ReactNode): string => {
  if (typeof children === 'string') {
    return children;
  }
  
  if (React.isValidElement(children)) {
    const element = children as React.ReactElement<any>;
    return extractTextContent(element.props.children);
  }
  
  if (Array.isArray(children)) {
    return children.map(extractTextContent).join('');
  }
  
  return String(children || '');
};

export const createCopyButton = (
  onCopy: () => void,
  copied: boolean,
  styles: React.CSSProperties,
  animationsEnabled: boolean
): React.ReactElement => (
  <button
    onClick={onCopy}
    style={styles}
    onMouseEnter={(e) => {
      if (animationsEnabled) {
        e.currentTarget.style.opacity = '1';
      }
    }}
    onMouseLeave={(e) => {
      if (animationsEnabled) {
        e.currentTarget.style.opacity = '0.8';
      }
    }}
    title={copied ? 'Copied!' : 'Copy to clipboard'}
    aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
  >
    <Icon name={copied ? 'CheckCircle' : 'Copy'} size="xs" />
    <span style={{ marginLeft: '4px', userSelect: 'none' }}>
      {copied ? 'Copied!' : 'Copy'}
    </span>
  </button>
);

export const createLineNumbers = (
  content: string,
  styles: React.CSSProperties
): React.ReactElement => {
  const lines = content.split('\n');
  
  return (
    <div style={styles}>
      {lines.map((_, index) => (
        <div key={index + 1}>
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export const highlightLines = (
  content: string,
  highlight: number | number[],
  cssVars: any
): React.ReactElement => {
  const lines = content.split('\n');
  const highlightArray = Array.isArray(highlight) ? highlight : [highlight];
  
  return (
    <>
      {lines.map((line, index) => {
        const lineNumber = index + 1;
        const isHighlighted = highlightArray.includes(lineNumber);
        
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
            {line}
          </div>
        );
      })}
    </>
  );
};

export const getLanguageLabel = (language: string): string => {
  const languageMap: Record<string, string> = {
    js: 'JavaScript',
    ts: 'TypeScript',
    tsx: 'TypeScript React',
    jsx: 'JavaScript React',
    py: 'Python',
    sh: 'Shell',
    bash: 'Bash',
    css: 'CSS',
    html: 'HTML',
    json: 'JSON',
    md: 'Markdown',
    sql: 'SQL',
    yaml: 'YAML',
    yml: 'YAML',
  };
  
  return languageMap[language.toLowerCase()] || language.toUpperCase();
};

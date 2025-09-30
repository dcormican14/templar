'use client';

import React, { Fragment } from 'react';
import { useCSSVariables } from '../../../providers';
import { Icon, CodeBlock, ProgressIndicator } from '../../atoms';
import type { ReadmeDisplayProps } from './ReadmeDisplay.types';

export function ReadmeDisplay({ content, loading = false, className, style }: ReadmeDisplayProps) {
  const cssVars = useCSSVariables();

  // Parse and render markdown text with inline formatting
  const parseInlineText = (text: string) => {
    const parts: (string | JSX.Element)[] = [];
    let currentIndex = 0;
    let partIndex = 0;

    // Find bold text **text**
    const boldRegex = /\*\*(.*?)\*\*/g;
    let match;

    // Find italic text *text*
    const italicRegex = /\*(.*?)\*/g;

    // Find inline code `code`
    const codeRegex = /`([^`]+)`/g;

    // Create a combined regex to find all formatting
    const combinedRegex = /(\*\*(.*?)\*\*|\*([^*]+?)\*|`([^`]+)`)/g;

    text.replace(combinedRegex, (match, fullMatch, bold, italic, code, offset) => {
      // Add text before the match
      if (offset > currentIndex) {
        parts.push(text.slice(currentIndex, offset));
      }

      // Add the formatted element
      if (bold !== undefined) {
        parts.push(
          <strong 
            key={`bold-${partIndex++}`}
            style={{ 
              color: cssVars.primary, 
              fontWeight: '600' 
            }}
          >
            {bold}
          </strong>
        );
      } else if (italic !== undefined) {
        parts.push(
          <em 
            key={`italic-${partIndex++}`}
            style={{ 
              color: cssVars.primary, 
              fontStyle: 'italic' 
            }}
          >
            {italic}
          </em>
        );
      } else if (code !== undefined) {
        parts.push(
          <code 
            key={`code-${partIndex++}`}
            style={{ 
              backgroundColor: cssVars.backgroundSecondary,
              color: cssVars.foreground,
              padding: '2px 4px',
              borderRadius: '4px',
              fontFamily: 'var(--font-geist-mono, monospace)',
              fontSize: '0.9em'
            }}
          >
            {code}
          </code>
        );
      }

      currentIndex = offset + match.length;
      return match;
    });

    // Add remaining text
    if (currentIndex < text.length) {
      parts.push(text.slice(currentIndex));
    }

    return parts.length > 1 ? parts : text;
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div style={{ 
          padding: '40px', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          gap: '16px' 
        }}>
          <ProgressIndicator variant="circle" size="lg" color="primary" />
          <p style={{ color: cssVars.foregroundAccent }}>Loading documentation...</p>
        </div>
      );
    }

    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeBlockLanguage = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Handle code blocks
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          // Start of code block
          inCodeBlock = true;
          codeBlockLanguage = line.replace('```', '').trim();
          codeBlockContent = [];
        } else {
          // End of code block
          inCodeBlock = false;
          elements.push(
            <div key={`codeblock-${i}`} style={{ marginBottom: '16px' }}>
              <CodeBlock
                language={codeBlockLanguage || 'text'}
                lineNumbers={true}
                copyable={true}
                color="primary"
                variant="outline"
                size="sm"
              >
                {codeBlockContent.join('\n')}
              </CodeBlock>
            </div>
          );
          codeBlockContent = [];
          codeBlockLanguage = '';
        }
        continue;
      }

      // If we're in a code block, collect the content
      if (inCodeBlock) {
        codeBlockContent.push(line);
        continue;
      }

      // Handle headings
      if (line.startsWith('# ')) {
        elements.push(
          <h1 
            key={`h1-${i}`}
            style={{ 
              color: cssVars.primary, 
              fontSize: '28px', 
              fontWeight: '700',
              marginBottom: '16px',
              marginTop: elements.length === 0 ? '0' : '32px'
            }}
          >
            {parseInlineText(line.replace('# ', ''))}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 
            key={`h2-${i}`}
            style={{ 
              color: cssVars.foreground, 
              fontSize: '22px', 
              fontWeight: '600',
              marginBottom: '12px',
              marginTop: '24px'
            }}
          >
            {parseInlineText(line.replace('## ', ''))}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 
            key={`h3-${i}`}
            style={{ 
              color: cssVars.foreground, 
              fontSize: '18px', 
              fontWeight: '600',
              marginBottom: '8px',
              marginTop: '20px'
            }}
          >
            {parseInlineText(line.replace('### ', ''))}
          </h3>
        );
      } else if (line.startsWith('- ')) {
        // Handle list items
        elements.push(
          <li 
            key={`li-${i}`}
            style={{ 
              color: cssVars.foregroundAccent,
              marginBottom: '4px',
              listStyleType: 'disc',
              marginLeft: '20px'
            }}
          >
            {parseInlineText(line.replace('- ', ''))}
          </li>
        );
      } else if (line.trim() === '') {
        // Empty line
        elements.push(<br key={`br-${i}`} />);
      } else if (line.trim() !== '') {
        // Regular paragraph
        elements.push(
          <p 
            key={`p-${i}`}
            style={{ 
              color: cssVars.foregroundAccent,
              marginBottom: '12px',
              lineHeight: '1.6'
            }}
          >
            {parseInlineText(line)}
          </p>
        );
      }
    }

    return elements;
  };

  return (
    <div 
      className={className}
      style={{
        color: cssVars.foreground,
        lineHeight: '1.6',
        fontSize: '14px',
        textAlign: 'left',
        ...style
      }}
    >
      {renderContent()}
    </div>
  );
}
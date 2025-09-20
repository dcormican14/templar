import React from 'react';
import { CodeBlock } from './CodeBlock';
import { universalColorControls, universalSizeShapeControls, universalStateControls } from '../shared/universalControls';
import type { ControlType } from '../../molecules/InteractiveComponentDisplay/InteractiveComponentDisplay.types';

const sampleCode = `function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

const message = greet("World");
console.log(message);`;

export const CodeBlockConfig = {
  component: <CodeBlock language="typescript" lineNumbers copyable>{sampleCode}</CodeBlock>,
  leftControls: [universalColorControls, universalSizeShapeControls],
  rightControls: [
    {
      title: 'State',
      controls: [
        {
          key: 'inline',
          label: 'Inline',
          type: 'checkbox' as ControlType
        }
      ]
    },
    {
      title: 'CodeBlock Options',
      controls: [
        {
          key: 'language',
          label: 'Language',
          type: 'select' as ControlType,
          options: [
            { label: 'None', value: '' },
            { label: 'JavaScript', value: 'javascript' },
            { label: 'TypeScript', value: 'typescript' },
            { label: 'TSX', value: 'tsx' },
            { label: 'JSX', value: 'jsx' },
            { label: 'CSS', value: 'css' },
            { label: 'HTML', value: 'html' },
            { label: 'JSON', value: 'json' },
            { label: 'Markdown', value: 'markdown' },
            { label: 'Python', value: 'python' },
            { label: 'Shell', value: 'sh' },
            { label: 'Bash', value: 'bash' },
            { label: 'Plain Text', value: 'text' }
          ]
        },
        {
          key: 'syntaxHighlighting',
          label: 'Syntax Highlighting',
          type: 'checkbox' as ControlType
        },
        {
          key: 'copyable',
          label: 'Copyable',
          type: 'checkbox' as ControlType
        },
        {
          key: 'lineNumbers',
          label: 'Line Numbers',
          type: 'checkbox' as ControlType
        },
        {
          key: 'children',
          label: 'Code Content',
          type: 'textarea' as ControlType
        }
      ]
    }
  ],
  initialProps: {
    color: 'primary',
    variant: 'outline',
    size: 'md',
    shape: 'round',
    language: 'typescript',
    copyable: true,
    lineNumbers: true,
    syntaxHighlighting: true,
    inline: false,
    children: sampleCode
  }
};
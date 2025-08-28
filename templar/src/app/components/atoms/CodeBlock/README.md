# CodeBlock Component

A sophisticated and highly customizable code block component built with React and TypeScript, following the Templar Design Standards.

## Features

- **Multiple variants**: default, inline, terminal, success, error, warning
- **Flexible sizing**: xs, sm, md, lg, xl
- **Syntax highlighting**: Language labeling and highlighting support
- **Copy functionality**: One-click copying to clipboard with feedback
- **Line numbers**: Optional line number display
- **Line highlighting**: Highlight specific lines for emphasis
- **Real-time syntax parsing**: Automatic color coding for keywords, strings, comments, etc.
- **Theme integration**: High contrast styling that adapts to all themes
- **Accessibility**: Proper ARIA attributes and keyboard navigation
- **Performance**: Memoized computations and efficient rendering

## File Structure

```
CodeBlock/
├── index.ts                 # Main exports
├── CodeBlock.tsx           # Main component implementation
├── CodeBlock.types.ts      # TypeScript type definitions
├── CodeBlock.styles.ts     # Style computation functions
├── CodeBlock.utils.tsx     # Utility functions for functionality
└── README.md               # Documentation
```

## Usage

### Basic Usage

```tsx
import { CodeBlock } from './components/atoms/CodeBlock';

<CodeBlock variant="default" size="md">
  {`function hello() {
  console.log('Hello, World!');
}`}
</CodeBlock>
```

### Inline Code

```tsx
<p>
  Use the <CodeBlock variant="inline">useState</CodeBlock> hook for state management.
</p>
```

### With Syntax Highlighting

```tsx
<CodeBlock 
  variant="default" 
  language="typescript"
  syntaxHighlighting
  copyable
  onCopy={(content) => console.log('Copied:', content)}
>
  {`interface User {
  id: number;
  name: string;
  email: string;
}`}
</CodeBlock>
```

### With Line Numbers and Highlighting

```tsx
<CodeBlock 
  variant="default"
  language="javascript"
  lineNumbers
  highlight={[2, 4]}
  copyable
>
  {`function calculateTotal(items) {
  let total = 0;
  for (const item of items) {
    total += item.price;
  }
  return total;
}`}
</CodeBlock>
```

### Terminal Style

```tsx
<CodeBlock variant="terminal" copyable>
  {`$ npm install @templar/components
$ npm run build
$ npm start`}
</CodeBlock>
```

### Status Variants

```tsx
<CodeBlock variant="success">
  ✓ Build completed successfully
</CodeBlock>

<CodeBlock variant="error">
  ✗ Error: Module not found
</CodeBlock>

<CodeBlock variant="warning">
  ⚠ Warning: Deprecated API usage
</CodeBlock>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `CodeBlockVariant` | `'default'` | Visual style variant |
| `size` | `CodeBlockSize` | `'md'` | Size of the code block |
| `language` | `string` | - | Programming language for labeling |
| `copyable` | `boolean` | `false` | Whether code can be copied to clipboard |
| `rounded` | `boolean` | `false` | Whether to use rounded corners |
| `lineNumbers` | `boolean` | `false` | Whether to show line numbers |
| `highlight` | `number \| number[]` | - | Line numbers to highlight |
| `maxHeight` | `string` | - | Maximum height with scrolling |
| `syntaxHighlighting` | `boolean` | `true` | Whether to apply syntax highlighting |
| `onCopy` | `(content: string) => void` | - | Callback when code is copied |

## Variants

- **default**: Standard code block with high contrast background
- **inline**: Inline code styling for use within text
- **terminal**: Dark terminal-style appearance
- **success**: Green-themed for successful operations
- **error**: Red-themed for error messages
- **warning**: Yellow-themed for warnings

## Sizes

- **xs**: Extra small (8px padding, 11px font)
- **sm**: Small (12px padding, 12px font)
- **md**: Medium (16px padding, 13px font)
- **lg**: Large (20px padding, 14px font)
- **xl**: Extra large (24px padding, 15px font)

## Architecture

### Separation of Concerns

1. **Types** (`CodeBlock.types.ts`): All TypeScript interfaces and type definitions
2. **Styles** (`CodeBlock.styles.ts`): Pure functions for computing CSS styles with high contrast
3. **Utils** (`CodeBlock.utils.tsx`): Utility functions for clipboard, text extraction, and rendering
4. **Main** (`CodeBlock.tsx`): Main component that orchestrates everything

### Design Principles

- **High contrast**: Dark backgrounds with light text for optimal code readability
- **Theme integration**: Colors adapt to current theme while maintaining contrast
- **Accessibility**: Proper semantic HTML and ARIA attributes
- **Performance**: Memoized computations and efficient re-renders
- **Type safety**: Full TypeScript coverage with strict types
- **Modularity**: Composable utilities for different features

## Integration

The CodeBlock component integrates seamlessly with the Templar provider ecosystem:

- **ThemeProvider**: High contrast adaptation to all themes
- **SettingsProvider**: Respects user animation preferences
- **ToastProvider**: Copy feedback notifications
- **CSSVariables**: Dynamic theming with enhanced contrast

## Accessibility

- Semantic HTML with `<pre>` and `<code>` elements
- Proper ARIA labels for copy functionality
- Keyboard navigation support
- Screen reader compatibility
- High contrast ratios for code readability
- Focus management for interactive elements

## Advanced Features

### Copy Functionality
- Automatic text extraction from children
- Visual feedback with icon changes
- Toast notifications for user feedback
- Fallback for older browsers

### Line Numbers
- Automatically generated line numbers
- Proper alignment with code content
- Non-selectable for clean copying

### Line Highlighting
- Single or multiple line highlighting
- Subtle background highlighting
- Maintains readability

### Syntax Highlighting
- Automatic token parsing for multiple languages
- Color-coded keywords, strings, comments, numbers, operators, functions
- Supports JavaScript, TypeScript, TSX, JSX, CSS, JSON
- Theme-aware colors that adapt to current theme
- Can be disabled with `syntaxHighlighting={false}`

### Language Support
- **javascript/js**: Full ES6+ syntax support
- **typescript/ts**: TypeScript-specific keywords and types  
- **tsx**: TypeScript + JSX syntax
- **jsx**: JavaScript + JSX syntax
- **css**: CSS properties, functions, and values
- **json**: JSON syntax with property highlighting
- **text/plain**: No highlighting (fallback)

## Usage Guidelines

### Do's
- Use for displaying code snippets and commands
- Choose appropriate variants for context (terminal for CLI, error for error messages)
- Enable copy functionality for user convenience
- Use line numbers for longer code blocks
- Highlight important lines for emphasis

### Don'ts
- Don't use inline variant for multi-line code
- Don't make code blocks too wide without max-width
- Don't forget to provide language when known
- Don't use status variants for regular code
- Don't nest CodeBlocks inside each other

## Examples

### React Component Example
```tsx
<CodeBlock 
  variant="default"
  language="tsx"
  lineNumbers
  copyable
  highlight={[3, 7]}
>
  {`import React from 'react';

export function Button({ children, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="btn btn-primary"
    >
      {children}
    </button>
  );
}`}
</CodeBlock>
```

### Terminal Commands
```tsx
<CodeBlock variant="terminal" copyable>
  {`$ git clone https://github.com/user/repo.git
$ cd repo
$ npm install
$ npm run dev`}
</CodeBlock>
```

### Error Messages
```tsx
<CodeBlock variant="error" size="sm">
  TypeError: Cannot read property 'map' of undefined
  at Component.render (Component.js:42:18)
</CodeBlock>
```

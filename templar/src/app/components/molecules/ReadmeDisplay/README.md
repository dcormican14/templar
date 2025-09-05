# ReadmeDisplay Component

A molecule component that renders markdown content with proper styling, including support for headings, bold text, italic text, inline code, and code blocks.

## Features

- **Markdown Parsing**: Supports headings (H1, H2, H3), bold text, italic text, lists, and code blocks
- **Syntax Highlighting**: Uses CodeBlock component for code blocks with syntax highlighting
- **Theme Integration**: Uses CSS variables for consistent styling
- **Typography**: Proper typography hierarchy with appropriate spacing
- **Left Alignment**: Content is left-aligned for better readability

## Usage

```tsx
import { ReadmeDisplay } from '@templar/components';

function Example() {
  const markdownContent = `
# Heading 1
## Heading 2
### Heading 3

This is a paragraph with **bold text** and *italic text*.

- List item 1
- List item 2

\`\`\`tsx
// Code block
const example = "Hello World";
\`\`\`
`;

  return (
    <ReadmeDisplay 
      content={markdownContent}
      loading={false}
    />
  );
}
```

## Props

- `content`: string - The markdown content to display
- `loading`: boolean - Shows loading state when true
- `className`: string - Additional CSS classes
- `style`: CSSProperties - Inline styles
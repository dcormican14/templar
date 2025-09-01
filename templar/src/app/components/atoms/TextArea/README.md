# TextArea Component

A comprehensive, accessible textarea component that follows the Templar design system standards with advanced features for text editing.

## Features

- **Full Design System**: Supports all semantic colors (primary, secondary, success, warning, destructive, info, custom)
- **Multiple Variants**: solid, ghost, outline with consistent styling
- **Shape System**: sharp, round (12px), pill variants
- **Multiple Sizes**: xs, sm, md, lg, xl with proportional scaling
- **Advanced Features**: Auto-resize, line numbers, character count, loading states
- **Accessibility**: Full ARIA support, keyboard navigation, screen reader friendly
- **Controlled/Uncontrolled**: Supports both controlled and uncontrolled modes
- **Rich Interactions**: Custom icons, paste handling, escape to clear
- **Animation Support**: Smooth transitions with settings integration
- **Type Safety**: Full TypeScript support with comprehensive prop types

## Basic Usage

```tsx
import { TextArea } from '@/components/atoms/TextArea';

// Basic textarea
<TextArea 
  placeholder="Enter your message..."
  onChange={(e) => console.log(e.target.value)}
/>

// With label and description
<TextArea
  label="Message"
  description="Enter your message below"
  placeholder="Type here..."
  minRows={4}
  showCharacterCount
  maxLength={500}
/>
```

## Color Variants

```tsx
// Semantic colors
<TextArea color="primary" />
<TextArea color="secondary" />
<TextArea color="success" />
<TextArea color="warning" />
<TextArea color="destructive" />
<TextArea color="info" />

// Custom color
<TextArea color="custom" customColor="#ff6b35" />
```

## Variants

```tsx
<TextArea variant="outline" />  {/* Default - outline style */}
<TextArea variant="solid" />    {/* Filled background */}
<TextArea variant="ghost" />    {/* Minimal styling */}
```

## Shapes

```tsx
<TextArea shape="sharp" />  {/* Square corners */}
<TextArea shape="round" />  {/* 12px radius (default) */}
<TextArea shape="pill" />   {/* Full rounded */}
```

## Sizes

```tsx
<TextArea size="xs" />  {/* Extra small */}
<TextArea size="sm" />  {/* Small */}
<TextArea size="md" />  {/* Medium (default) */}
<TextArea size="lg" />  {/* Large */}
<TextArea size="xl" />  {/* Extra large */}
```

## Advanced Features

```tsx
// Auto-resizing textarea
<TextArea
  autoResize
  minRows={2}
  maxRows={10}
  placeholder="This textarea grows with content"
/>

// With line numbers
<TextArea
  showLineNumbers
  minRows={10}
  placeholder="Code or structured text"
/>

// With character counting
<TextArea
  showCharacterCount
  maxLength={280}
  placeholder="Tweet-style message"
/>

// With icon and actions
<TextArea
  icon={<SendIcon />}
  iconClickable
  onIconClick={() => console.log('Send clicked')}
  placeholder="Message with send button"
/>

// Error state with validation
<TextArea
  error
  errorMessage="This field is required"
  placeholder="Required field"
/>

// Loading state
<TextArea
  loading
  disabled
  placeholder="Processing..."
/>
```

## Controlled Mode

```tsx
const [value, setValue] = useState('');

<TextArea
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Controlled textarea"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `TextAreaColor` | `'primary'` | Color scheme of the textarea |
| `customColor` | `string` | - | Custom color when color is 'custom' |
| `variant` | `'solid' \| 'ghost' \| 'outline'` | `'outline'` | Visual style variant |
| `shape` | `'sharp' \| 'round' \| 'pill'` | `'round'` | Corner style |
| `size` | `TextAreaSize` | `'md'` | Size of the textarea |
| `resize` | `'none' \| 'both' \| 'horizontal' \| 'vertical'` | `'vertical'` | Resize behavior |
| `error` | `boolean` | `false` | Whether in error state |
| `label` | `string` | - | Label text |
| `description` | `string` | - | Description text |
| `helperText` | `string` | - | Helper text |
| `errorMessage` | `string` | - | Error message |
| `showCharacterCount` | `boolean` | `false` | Show character counter |
| `maxLength` | `number` | - | Maximum character limit |
| `minRows` | `number` | `3` | Minimum rows |
| `maxRows` | `number` | - | Maximum rows (for auto-resize) |
| `autoResize` | `boolean` | `false` | Auto-resize height |
| `showLineNumbers` | `boolean` | `false` | Show line numbers |
| `loading` | `boolean` | `false` | Loading state |
| `clearOnEscape` | `boolean` | `false` | Clear on Escape key |
| `icon` | `ReactNode` | - | Custom icon |
| `iconPosition` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'top-right'` | Icon position |
| `iconClickable` | `boolean` | `false` | Icon is clickable |
| `onIconClick` | `() => void` | - | Icon click handler |
| `width` | `string \| number` | - | Custom width |
| `height` | `string \| number` | - | Custom height |
| `value` | `string` | - | Controlled value |
| `defaultValue` | `string` | `''` | Default value |
| `onChange` | `(event: ChangeEvent) => void` | - | Change handler |
| `disabled` | `boolean` | `false` | Whether disabled |
| `className` | `string` | - | Additional CSS classes |
| `style` | `CSSProperties` | - | Inline styles |

## Types

```tsx
type TextAreaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type TextAreaColor = 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'info' | 'custom';
type TextAreaVariant = 'solid' | 'ghost' | 'outline';
type TextAreaShape = 'sharp' | 'round' | 'pill';
type TextAreaResize = 'none' | 'both' | 'horizontal' | 'vertical';

interface TextAreaRef {
  focus: () => void;
  blur: () => void;
  select: () => void;
  setSelectionRange: (start: number, end: number) => void;
  getValue: () => string;
  setValue: (value: string) => void;
}
```

## Accessibility

The TextArea component is built with accessibility in mind:

- Full ARIA support with proper labeling
- Keyboard navigation and shortcuts
- Screen reader announcements
- Focus management with visible indicators
- Proper association of labels, descriptions, and error messages
- Character count announcements for screen readers

## Keyboard Shortcuts

- **Escape**: Clear textarea (when `clearOnEscape` is true)
- **Ctrl/Cmd + A**: Select all text
- **Ctrl/Cmd + Z**: Undo
- **Ctrl/Cmd + Y**: Redo
- **Tab**: Navigation (respects tab order)

## Features

### Auto-Resize
The textarea can automatically adjust its height based on content:

```tsx
<TextArea
  autoResize
  minRows={2}
  maxRows={10}
  placeholder="I grow with content!"
/>
```

### Character Counting
Track and limit character input with visual feedback:

```tsx
<TextArea
  showCharacterCount
  maxLength={280}
  placeholder="Tweet-length message"
/>
```

### Line Numbers
Perfect for code input or structured text:

```tsx
<TextArea
  showLineNumbers
  minRows={10}
  placeholder="Line numbers appear on the left"
/>
```

### Loading State
Show loading during async operations:

```tsx
<TextArea
  loading
  disabled
  placeholder="Processing your input..."
/>
```

## Styling

The component follows the Templar design system:

- Uses CSS variables for theming
- Supports animation preferences from settings
- Responsive sizing and touch targets
- Consistent visual hierarchy
- Focus states with proper contrast

## Examples

See the component showcase page for interactive examples and detailed usage patterns.

## Performance

- Debounced auto-resize to prevent layout thrashing
- Efficient character counting
- Optimized line number generation
- Smart paste handling with character limits
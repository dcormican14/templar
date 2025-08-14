# Button Component

A comprehensive, accessible, and highly customizable button component built with React and TypeScript.

## Features

- **Multiple variants**: primary, secondary, outline, ghost, destructive
- **Flexible sizing**: xs, sm, md, lg, xl
- **Icon support**: leading and trailing icon positions with automatic sizing
- **Loading states**: built-in async operation handling
- **Theme integration**: automatic adaptation to RoundTable theme system
- **Accessibility**: proper ARIA attributes and keyboard navigation
- **Hover effects**: smooth animations and visual feedback
- **Rounded variant**: pill-shaped styling option

## File Structure

```
Button/
├── index.ts                 # Main exports
├── Button.clean.tsx         # Main component implementation
├── Button.types.ts          # TypeScript type definitions
├── Button.styles.ts         # Style computation functions
├── Button.utils.tsx         # Utility functions for rendering
├── LoadingSpinner.tsx       # Loading spinner component
├── useAsyncClick.ts         # Custom hook for async operations
├── useButtonHover.ts        # Custom hook for hover effects
└── README.md               # Documentation
```

## Usage

### Basic Usage

```tsx
import { Button } from './components/atoms/Button';

<Button variant="primary" size="md">
  Click me
</Button>
```

### With Icons

```tsx
<Button 
  variant="primary" 
  icon={<Icon name="Plus" />}
  iconPosition="leading"
>
  Add Item
</Button>

<Button 
  variant="secondary" 
  icon={<Icon name="ArrowRight" />}
  iconPosition="trailing"
>
  Next
</Button>
```

### Async Operations

```tsx
<Button
  variant="primary"
  loadingKey="save-action"
  onAsyncClick={async () => {
    await saveData();
  }}
>
  Save
</Button>
```

### Rounded Variant

```tsx
<Button 
  variant="primary" 
  rounded
  icon={<Icon name="Heart" />}
  iconPosition="leading"
>
  Like
</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `ButtonVariant` | `'primary'` | Visual style variant |
| `size` | `ButtonSize` | `'md'` | Size of the button |
| `loading` | `boolean` | `false` | Manual loading state |
| `loadingKey` | `string` | - | Key for LoadingProvider integration |
| `icon` | `React.ReactNode` | - | Icon element to display |
| `iconPosition` | `'leading' \| 'trailing'` | `'leading'` | Position of the icon |
| `fullWidth` | `boolean` | `false` | Whether button takes full width |
| `rounded` | `boolean` | `false` | Whether to use rounded (pill) styling |
| `onAsyncClick` | `() => Promise<void>` | - | Async click handler with automatic loading/error handling |

## Variants

- **primary**: Main call-to-action button
- **secondary**: Secondary actions
- **outline**: Outlined button with transparent background
- **ghost**: Minimal button with no background
- **destructive**: For dangerous actions (delete, remove, etc.)

## Sizes

- **xs**: Extra small (40px height, 64px min-width)
- **sm**: Small (40px height, 80px min-width)
- **md**: Medium (48px height, 96px min-width)
- **lg**: Large (56px height, 112px min-width)
- **xl**: Extra large (64px height, 128px min-width)

## Architecture

### Separation of Concerns

1. **Types** (`Button.types.ts`): All TypeScript interfaces and type definitions
2. **Styles** (`Button.styles.ts`): Pure functions for computing CSS styles
3. **Utils** (`Button.utils.tsx`): Utility functions for rendering logic
4. **Hooks** (`useAsyncClick.ts`, `useButtonHover.ts`): Custom hooks for specific behaviors
5. **Components** (`LoadingSpinner.tsx`): Sub-components used by the main Button
6. **Main** (`Button.clean.tsx`): Main component that orchestrates everything

### Design Principles

- **Composition over inheritance**: Uses utility functions and hooks
- **Single responsibility**: Each file has a specific purpose
- **Immutable**: No direct DOM manipulation, uses React patterns
- **Testable**: Pure functions and separated concerns make testing easier
- **Type-safe**: Full TypeScript coverage with proper type definitions
- **Performance**: Uses `useMemo` for expensive computations and `useCallback` for event handlers

## Integration

The Button component integrates seamlessly with the RoundTable provider ecosystem:

- **ThemeProvider**: Automatic color adaptation
- **LoadingProvider**: Built-in loading state management
- **ToastProvider**: Automatic success/error notifications
- **SettingsProvider**: Respects user animation preferences
- **CSSVariables**: Dynamic theming support

## Accessibility

- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- High contrast theme support

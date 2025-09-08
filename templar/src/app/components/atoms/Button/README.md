# Button Component

A comprehensive, accessible, and highly customizable button component built with React and TypeScript.

## Features

- **Multiple variants**: solid, ghost, outline, glassmorphic with color theming
- **Flexible sizing**: xs, sm, md, lg, xl with responsive design
- **Icon support**: leading and trailing icon positions with automatic sizing
- **Icon-only mode**: automatic square/circular styling when no text content
- **Loading states**: built-in async operation handling with color-matched spinners
- **Animation modes**: default, parallax tilt, typewriter, and isometric 3D effects
- **Theme integration**: automatic adaptation to RoundTable theme system
- **Accessibility**: proper ARIA attributes and keyboard navigation
- **Hover effects**: smooth animations and visual feedback
- **Shape variants**: sharp, round, and pill styling options

## File Structure

```
Button/
├── index.ts                 # Main exports
├── Button.tsx               # Main component implementation
├── Button.types.ts          # TypeScript type definitions
├── Button.styles.ts         # Style computation functions
├── Button.utils.tsx         # Utility functions for rendering
├── hooks/
│   ├── index.ts            # Hook exports
│   ├── useAsyncClick.ts    # Custom hook for async operations
│   └── useButtonHover.ts   # Custom hook for hover effects
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

### Icon-Only Buttons

When no text content is provided, buttons with icons automatically become square or circular based on the shape prop:

```tsx
{/* Square icon button */}
<Button 
  variant="primary" 
  shape="sharp"
  icon={<Icon name="Settings" />}
/>

{/* Circular icon button */}
<Button 
  variant="primary" 
  shape="round"
  icon={<Icon name="Heart" />}
/>

{/* Pill-shaped icon button */}
<Button 
  variant="primary" 
  shape="pill"
  icon={<Icon name="Star" />}
/>
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

### Animation Modes

```tsx
{/* Default hover animations */}
<Button animationMode="default">
  Default Animation
</Button>

{/* Parallax tilt effect */}
<Button animationMode="parallax">
  Parallax Tilt
</Button>

{/* Typewriter text effect */}
<Button animationMode="typewriter">
  Typewriter Effect
</Button>

{/* Isometric 3D button effect */}
<Button animationMode="isometric">
  Isometric 3D
</Button>
```

### Loading States

Loading spinners automatically match the button's color theme:

```tsx
<Button 
  variant="solid"
  color="success" 
  loading
>
  Success Loading {/* Shows green spinner */}
</Button>

<Button 
  variant="solid"
  color="destructive" 
  loading
>
  Destructive Loading {/* Shows red spinner */}
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

- **solid**: Filled button with solid background (default)
- **outline**: Outlined button with transparent background
- **ghost**: Minimal button with no background or border
- **glassmorphic**: Modern glass-like appearance with backdrop blur and reflections

## Colors

- **primary**: Main brand color theme
- **secondary**: Secondary brand color theme
- **success**: For positive actions (save, confirm, etc.)
- **warning**: For cautionary actions (caution, alert, etc.)
- **destructive**: For dangerous actions (delete, remove, etc.)
- **info**: For informational actions (learn more, details, etc.)
- **custom**: Allows custom color with customColor prop

## Sizes

- **xs**: Extra small (40px height, 82px min-width)
- **sm**: Small (40px height, 82px min-width)
- **md**: Medium (48px height, 112px min-width)
- **lg**: Large (52px height, 112px min-width)
- **xl**: Extra large (60px height, 142px min-width)

## Design Notes

### Icon-Only Buttons
- Automatically adjust to square/circular shape when no text content is provided
- Icon position setting becomes irrelevant for centering in icon-only mode
- Maintains consistent aspect ratio (1:1) across all sizes

### Icon Spacing
- Both leading and trailing icons receive balanced left and right margins
- Spacing scales responsively with button size (2px-6px based on size)
- No spacing applied in icon-only mode to ensure perfect centering

### Loading State Consistency
- Spinner color automatically matches the selected button color theme
- Spinner size scales appropriately with button size
- Loading state preserves button dimensions and accessibility

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

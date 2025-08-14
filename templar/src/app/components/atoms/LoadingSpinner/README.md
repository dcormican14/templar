# LoadingSpinner Component

A flexible, theme-aware loading spinner component built with React and TypeScript.

## Features

- **Multiple sizes**: xs, sm, md, lg, xl or custom pixel values
- **Color variants**: primary, secondary, success, warning, error, info, muted, inherit, or custom colors
- **Customizable thickness**: Adjustable border width
- **Theme integration**: Automatic adaptation to RoundTable theme system
- **Animation control**: Respects user animation preferences
- **Accessibility**: Proper ARIA attributes for screen readers
- **Lightweight**: Minimal dependencies and optimized performance

## File Structure

```
LoadingSpinner/
├── index.ts                        # Main exports
├── LoadingSpinner.tsx              # Main component implementation
├── LoadingSpinner.types.ts         # TypeScript type definitions
├── LoadingSpinner.styles.ts        # Style computation functions
└── README.md                       # Documentation
```

## Usage

### Basic Usage

```tsx
import { LoadingSpinner } from './components/atoms/LoadingSpinner';

<LoadingSpinner />
```

### Size Variations

```tsx
{/* Predefined sizes */}
<LoadingSpinner size="xs" />   {/* 12px */}
<LoadingSpinner size="sm" />   {/* 16px */}
<LoadingSpinner size="md" />   {/* 20px */}
<LoadingSpinner size="lg" />   {/* 24px */}
<LoadingSpinner size="xl" />   {/* 32px */}

{/* Custom size */}
<LoadingSpinner size={40} />   {/* 40px */}
```

### Color Variants

```tsx
{/* Theme colors */}
<LoadingSpinner color="primary" />
<LoadingSpinner color="secondary" />
<LoadingSpinner color="success" />
<LoadingSpinner color="warning" />
<LoadingSpinner color="error" />
<LoadingSpinner color="info" />
<LoadingSpinner color="muted" />

{/* Inherit from parent */}
<LoadingSpinner color="inherit" />

{/* Custom color */}
<LoadingSpinner color="#ff0000" />
```

### Customization

```tsx
{/* Custom thickness */}
<LoadingSpinner thickness={3} />

{/* Combined customization */}
<LoadingSpinner 
  size="lg"
  color="primary"
  thickness={4}
  className="my-spinner"
  style={{ margin: '10px' }}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `LoadingSpinnerSize \| number` | `'md'` | Size of the spinner (predefined or custom pixels) |
| `color` | `LoadingSpinnerVariant \| 'inherit' \| string` | `'primary'` | Color of the spinner |
| `thickness` | `number` | `2` | Thickness of the spinner border in pixels |
| `className` | `string` | - | Additional CSS classes |
| `style` | `React.CSSProperties` | - | Inline styles |

## Types

### LoadingSpinnerSize
```typescript
type LoadingSpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

### LoadingSpinnerVariant
```typescript
type LoadingSpinnerVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'muted';
```

## Integration

The LoadingSpinner component integrates seamlessly with the RoundTable provider ecosystem:

- **ThemeProvider**: Automatic color adaptation based on current theme
- **SettingsProvider**: Respects user animation preferences
- **CSSVariables**: Dynamic theming support

## Use Cases

### In Buttons
```tsx
import { Button, LoadingSpinner } from './components/atoms';

const MyButton = ({ isLoading, ...props }) => (
  <Button disabled={isLoading} {...props}>
    {isLoading ? <LoadingSpinner size="sm" color="inherit" /> : 'Click me'}
  </Button>
);
```

### In Cards
```tsx
const LoadingCard = () => (
  <div className="card">
    <LoadingSpinner size="lg" color="primary" />
    <p>Loading content...</p>
  </div>
);
```

### Page Loading
```tsx
const PageLoader = () => (
  <div className="page-loader">
    <LoadingSpinner size={48} color="primary" thickness={3} />
    <h2>Loading...</h2>
  </div>
);
```

## Accessibility

- Includes `role="status"` for screen readers
- Uses `aria-label="Loading"` to describe the spinner's purpose
- Works with keyboard navigation and focus management
- Supports high contrast themes

## Performance

- Lightweight implementation with minimal dependencies
- Uses CSS animations for smooth performance
- Optimized re-renders with proper prop handling
- No unnecessary DOM manipulations

## Browser Support

- Modern browsers with CSS animation support
- Graceful degradation when animations are disabled
- Respects user's reduced motion preferences

# LoadingSpinners Component

A comprehensive collection of animated loading spinners and placeholders built with React, TypeScript, and Framer Motion. Designed to provide engaging loading states while pages or content finish loading.

## Features

- **Multiple animation variants**: parrot, spinner, dots, pulse
- **Flexible sizing**: xs, sm, md, lg, xl
- **Theme integration**: automatic adaptation to RoundTable theme system
- **Color customization**: primary, secondary, accent, success, warning, error, inherit
- **Animation control**: customizable duration and show/hide states
- **Accessibility**: respects user animation preferences
- **Performance**: optimized animations with proper cleanup

## File Structure

```
LoadingSpinners/
├── index.ts                    # Main exports
├── LoadingSpinners.tsx         # Main component implementation
├── LoadingSpinners.types.ts    # TypeScript type definitions
├── LoadingSpinners.styles.ts   # Style computation functions
├── animations/                 # Animation sub-components
│   ├── index.ts               # Animation exports
│   ├── ParrotAnimation.tsx    # Parrot loading animation
│   ├── SpinnerAnimation.tsx   # Simple spinning circle
│   ├── DotsAnimation.tsx      # Bouncing dots animation
│   └── PulseAnimation.tsx     # Pulsing circle animation
└── README.md                  # Documentation
```

## Usage

### Basic Usage

```tsx
import { LoadingSpinners } from './components/molecules/LoadingSpinners';

<LoadingSpinners variant="parrot" size="md" />
```

### With Custom Colors

```tsx
<LoadingSpinners 
  variant="parrot" 
  size="lg" 
  color="accent"
  duration={3}
/>
```

### Different Variants

```tsx
{/* Parrot Animation (Default) */}
<LoadingSpinners variant="parrot" />

{/* Simple Spinner */}
<LoadingSpinners variant="spinner" />

{/* Bouncing Dots */}
<LoadingSpinners variant="dots" />

{/* Pulsing Circle */}
<LoadingSpinners variant="pulse" />
```

### Conditional Display

```tsx
<LoadingSpinners 
  variant="parrot" 
  show={isLoading} 
  centered
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `LoadingSpinnerVariant` | `'parrot'` | Animation style variant |
| `size` | `LoadingSpinnerSize` | `'md'` | Size of the spinner |
| `color` | `LoadingSpinnerColor` | `'primary'` | Color theme for the spinner |
| `duration` | `number` | `2` | Animation duration in seconds |
| `show` | `boolean` | `true` | Whether to show the spinner |
| `fullWidth` | `boolean` | `false` | Whether spinner takes full width |
| `centered` | `boolean` | `true` | Center the spinner in its container |

## Variants

- **parrot**: Complex animated parrot face with rotating elements
- **spinner**: Simple spinning circle animation
- **dots**: Three bouncing dots with staggered timing
- **pulse**: Pulsing circle with scale and opacity changes

## Sizes

- **xs**: Extra small (16px)
- **sm**: Small (24px)
- **md**: Medium (48px)
- **lg**: Large (64px)
- **xl**: Extra large (96px)

## Colors

- **primary**: Uses theme primary color
- **secondary**: Uses theme secondary color
- **accent**: Uses theme accent color
- **success**: Uses theme success color
- **warning**: Uses theme warning color
- **error**: Uses theme error color
- **inherit**: Uses current text color

## Architecture

### Separation of Concerns

1. **Types** (`LoadingSpinners.types.ts`): All TypeScript interfaces and type definitions
2. **Styles** (`LoadingSpinners.styles.ts`): Pure functions for computing CSS styles
3. **Animations** (`animations/`): Individual animation components
4. **Main** (`LoadingSpinners.tsx`): Main component that orchestrates everything

### Design Principles

- **Composition over inheritance**: Uses separate animation components
- **Single responsibility**: Each animation component has a specific purpose
- **Theme integration**: Fully integrated with RoundTable theme system
- **Performance**: Uses `useMemo` for expensive computations
- **Accessibility**: Respects user animation preferences
- **Type-safe**: Full TypeScript coverage with proper type definitions

## Integration

The LoadingSpinners component integrates seamlessly with the RoundTable provider ecosystem:

- **ThemeProvider**: Automatic color adaptation
- **SettingsProvider**: Respects user animation preferences
- **CSSVariables**: Dynamic theming support

## Accessibility

- Respects user motion preferences from settings
- Gracefully disables animations when animations are disabled
- Maintains proper contrast ratios across all themes
- Screen reader friendly with proper ARIA attributes

## Performance

- Optimized animations using Framer Motion
- Proper cleanup of animation resources
- Memoized style computations
- Minimal re-renders through proper dependency management

## Customization

### Adding New Animations

To add a new animation variant:

1. Create a new animation component in the `animations/` folder
2. Add the variant type to `LoadingSpinnerVariant`
3. Add the animation props interface
4. Update the main component's render logic
5. Export from the animations index file

### Custom Colors

The component supports custom colors through the theme system. Colors automatically adapt to light/dark themes and maintain proper contrast ratios.

## Examples

### Page Loading State

```tsx
function MyPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 3000);
  }, []);

  if (isLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingSpinners variant="parrot" size="lg" color="primary" />
      </div>
    );
  }

  return <div>Page Content</div>;
}
```

### Button Loading State

```tsx
function MyButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await someAsyncOperation();
    setIsLoading(false);
  };

  return (
    <button onClick={handleClick} disabled={isLoading}>
      {isLoading ? (
        <LoadingSpinners variant="dots" size="sm" color="inherit" />
      ) : (
        'Click Me'
      )}
    </button>
  );
}
```

### Theme-Aware Loading

```tsx
function ThemeAwareLoader() {
  return (
    <LoadingSpinners 
      variant="pulse" 
      size="md" 
      color="accent"
      duration={1.5}
      centered
    />
  );
}
```

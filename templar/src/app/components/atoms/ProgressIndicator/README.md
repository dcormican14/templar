# ProgressIndicator Component

A versatile, theme-aware progress indicator component that can display either a loading spinner or a progress bar based on user requirements.

## Features

- **Dual Display Types**: Toggle between spinner and progress bar modes
- **Flexible Sizing**: xs, sm, md, lg, xl or custom pixel values
- **Color Variants**: Theme colors, inherit, or custom colors
- **Progress Tracking**: Real-time progress values with percentage display
- **Theme Integration**: Automatic adaptation to RoundTable theme system
- **Accessibility**: Proper ARIA attributes and screen reader support
- **Animations**: Smooth transitions and spinner animations with settings integration
- **Backward Compatibility**: Maintains LoadingSpinner API for existing code

## File Structure

```
ProgressIndicator/
├── index.ts                     # Main exports and legacy compatibility
├── ProgressIndicator.tsx        # Main component implementation
├── ProgressIndicator.types.ts   # TypeScript type definitions
├── ProgressIndicator.styles.ts  # Style computation functions
└── README.md                   # Documentation
```

## Usage

### Spinner Mode (Default)

```tsx
import { ProgressIndicator } from './components/atoms/ProgressIndicator';

// Basic spinner
<ProgressIndicator />

// Custom spinner
<ProgressIndicator 
  type="spinner"
  size="lg" 
  color="primary" 
  thickness={3}
/>
```

### Progress Bar Mode

```tsx
// Basic progress bar
<ProgressIndicator 
  type="progressBar"
  value={45}
  width={300}
/>

// Progress bar with percentage
<ProgressIndicator 
  type="progressBar"
  value={75}
  max={100}
  showPercentage={true}
  color="success"
  width="100%"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'spinner' \| 'progressBar'` | `'spinner'` | Type of progress indicator |
| `size` | `ProgressIndicatorSize \| number` | `'md'` | Size preset or custom pixels |
| `color` | `ProgressIndicatorVariant \| 'inherit' \| string` | `'primary'` | Color variant or custom color |
| `thickness` | `number` | `2` | Border thickness (spinner) or height (progress bar) |
| `value` | `number` | `0` | Current progress value (progress bar only) |
| `max` | `number` | `100` | Maximum progress value |
| `showPercentage` | `boolean` | `false` | Show percentage text on progress bar |
| `label` | `string` | Auto-generated | Custom accessibility label |
| `width` | `number \| string` | `200` | Width for progress bar |
| `className` | `string` | - | Additional CSS classes |
| `style` | `CSSProperties` | - | Custom inline styles |

## Type Definitions

```typescript
type ProgressIndicatorSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ProgressIndicatorVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'muted';
type ProgressIndicatorType = 'spinner' | 'progressBar';
```

## Examples

### Loading States
```tsx
// File upload progress
<ProgressIndicator 
  type="progressBar"
  value={uploadProgress}
  showPercentage={true}
  color="primary"
  label="File upload progress"
/>

// Indeterminate loading
<ProgressIndicator 
  type="spinner"
  size="sm"
  color="inherit"
/>
```

### Status Indicators
```tsx
// Success progress
<ProgressIndicator 
  type="progressBar"
  value={100}
  color="success"
  showPercentage={true}
/>

// Warning state
<ProgressIndicator 
  type="spinner"
  color="warning"
  size="lg"
/>
```

## Backward Compatibility

The component maintains full backward compatibility with the previous `LoadingSpinner` component:

```tsx
// This still works
import { LoadingSpinner } from './components/atoms/ProgressIndicator';

<LoadingSpinner size="md" color="primary" />
```

## Accessibility

- **Spinner**: Uses `role="status"` with appropriate `aria-label`
- **Progress Bar**: Uses `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`
- **Screen Readers**: Automatic or custom labels for assistive technology
- **Keyboard**: No keyboard interaction required (display-only component)

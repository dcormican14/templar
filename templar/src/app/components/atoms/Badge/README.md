# Badge Component

A flexible and customizable badge component built with React and TypeScript, following the Templar Design Standards.

## Features

- **Multiple variants**: primary, secondary, outline, ghost, destructive, success, warning
- **Flexible sizing**: xs, sm, md, lg, xl
- **Icon support**: leading and trailing icon positions with automatic sizing
- **Removable badges**: optional remove functionality with accessible controls
- **Theme integration**: automatic adaptation to Templar theme system
- **Accessibility**: proper ARIA attributes and keyboard navigation
- **Rounded variant**: fully rounded styling option

## File Structure

```
Badge/
├── index.ts                 # Main exports
├── Badge.tsx               # Main component implementation
├── Badge.types.ts          # TypeScript type definitions
├── Badge.styles.ts         # Style computation functions
├── Badge.utils.tsx         # Utility functions for rendering
└── README.md               # Documentation
```

## Usage

### Basic Usage

```tsx
import { Badge } from './components/atoms/Badge';

<Badge variant="primary" size="md">
  New
</Badge>
```

### With Icons

```tsx
<Badge 
  variant="success" 
  icon={<Icon name="CheckCircle" />}
  iconPosition="leading"
>
  Verified
</Badge>

<Badge 
  variant="warning" 
  icon={<Icon name="AlertTriangle" />}
  iconPosition="trailing"
>
  Warning
</Badge>
```

### Removable Badges

```tsx
<Badge
  variant="secondary"
  removable
  onRemove={() => console.log('Badge removed')}
>
  Removable Tag
</Badge>
```

### Rounded Variant

```tsx
<Badge 
  variant="primary" 
  rounded
  icon={<Icon name="Star" />}
>
  Featured
</Badge>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `BadgeVariant` | `'primary'` | Visual style variant |
| `size` | `BadgeSize` | `'md'` | Size of the badge |
| `rounded` | `boolean` | `false` | Whether to use fully rounded styling |
| `icon` | `React.ReactNode` | - | Icon element to display |
| `iconPosition` | `'leading' \| 'trailing'` | `'leading'` | Position of the icon |
| `removable` | `boolean` | `false` | Whether the badge can be removed |
| `onRemove` | `() => void` | - | Callback when remove button is clicked |

## Variants

- **primary**: Main status indicators
- **secondary**: Secondary status or categories  
- **outline**: Outlined badge with transparent background
- **ghost**: Minimal badge with muted background
- **destructive**: For errors or negative states
- **success**: For positive states and confirmations
- **warning**: For warnings and cautionary states

## Sizes

- **xs**: Extra small (20px height, 11px font)
- **sm**: Small (24px height, 12px font)
- **md**: Medium (28px height, 13px font)
- **lg**: Large (32px height, 14px font)
- **xl**: Extra large (36px height, 15px font)

## Architecture

### Separation of Concerns

1. **Types** (`Badge.types.ts`): All TypeScript interfaces and type definitions
2. **Styles** (`Badge.styles.ts`): Pure functions for computing CSS styles
3. **Utils** (`Badge.utils.tsx`): Utility functions for rendering logic
4. **Main** (`Badge.tsx`): Main component that orchestrates everything

### Design Principles

- **Composition over inheritance**: Uses utility functions for modularity
- **Single responsibility**: Each file has a specific purpose
- **Immutable**: No direct DOM manipulation, uses React patterns
- **Testable**: Pure functions and separated concerns make testing easier
- **Type-safe**: Full TypeScript coverage with proper type definitions
- **Performance**: Uses `useMemo` for expensive computations

## Integration

The Badge component integrates seamlessly with the Templar provider ecosystem:

- **ThemeProvider**: Automatic color adaptation
- **SettingsProvider**: Respects user animation preferences
- **CSSVariables**: Dynamic theming support

## Accessibility

- Proper ARIA attributes for removable badges
- Keyboard navigation support for remove functionality
- Screen reader compatibility
- High contrast theme support
- Clear focus indicators

## Usage Guidelines

### Do's
- Use badges for status indicators and labels
- Choose appropriate variants for semantic meaning
- Use consistent sizing within the same interface
- Provide clear labels for removable badges
- Use icons to enhance meaning when appropriate

### Don'ts
- Don't use badges for primary navigation
- Don't make badges too large or prominent
- Don't use destructive variant for non-error states
- Don't forget accessibility when using removable badges
- Don't mix too many variants in the same area

## Examples

### Status Indicators
```tsx
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="destructive">Error</Badge>
```

### Category Tags
```tsx
<Badge variant="outline" removable onRemove={handleRemove}>
  JavaScript
</Badge>
<Badge variant="outline" removable onRemove={handleRemove}>
  React
</Badge>
```

### Notification Badges
```tsx
<Badge variant="primary" size="xs" rounded>
  3
</Badge>
```

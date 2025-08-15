# Card Component

A versatile, themeable card component built with the Templar design system.

## Features

- **Multiple Variants**: Default, elevated, outlined, filled, and transparent styles
- **Flexible Sizing**: Five size options (xs, sm, md, lg, xl) affecting border radius and minimum height
- **Customizable Padding**: Six padding levels from none to xl
- **Interactive**: Optional clickable behavior with hover effects
- **Loading States**: Built-in loading overlay with spinner
- **Structured Layout**: Optional header and footer sections
- **Accessibility**: Proper ARIA attributes and keyboard navigation
- **Theme Integration**: Full integration with Templar's CSS variable system

## Usage

### Basic Card

```tsx
import { Card } from './components/atoms';

<Card>
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</Card>
```

### Card Variants

```tsx
// Default card with border and shadow
<Card variant="default">Default card</Card>

// Elevated card with larger shadow, no border
<Card variant="elevated">Elevated card</Card>

// Outlined card with prominent border
<Card variant="outlined">Outlined card</Card>

// Filled card with muted background
<Card variant="filled">Filled card</Card>

// Transparent card with no background
<Card variant="transparent">Transparent card</Card>
```

### Sizes and Padding

```tsx
// Different sizes affect border radius and minimum height
<Card size="xs" padding="sm">Small card</Card>
<Card size="lg" padding="lg">Large card</Card>

// Custom padding levels
<Card padding="none">No padding</Card>
<Card padding="xl">Extra large padding</Card>
```

### Interactive Cards

```tsx
// Clickable card with hover effects
<Card 
  clickable 
  onClick={() => console.log('Card clicked')}
>
  Click me!
</Card>

// Async clickable card
<Card 
  clickable 
  onAsyncClick={async () => {
    await performAsyncAction();
  }}
>
  Async action card
</Card>
```

### Structured Content

```tsx
<Card 
  header={<h2>Card Header</h2>}
  footer={<button>Action Button</button>}
>
  <p>Main card content</p>
</Card>
```

### Loading State

```tsx
<Card loading>
  <p>This content is hidden while loading</p>
</Card>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'elevated' \| 'outlined' \| 'filled' \| 'transparent'` | `'default'` | Visual style variant |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size affecting border radius and min height |
| `padding` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Internal padding |
| `clickable` | `boolean` | `false` | Whether the card is clickable |
| `disabled` | `boolean` | `false` | Whether the card is disabled |
| `loading` | `boolean` | `false` | Whether to show loading state |
| `header` | `React.ReactNode` | - | Optional header content |
| `footer` | `React.ReactNode` | - | Optional footer content |
| `onAsyncClick` | `() => Promise<void>` | - | Async click handler |

## Styling

The Card component uses CSS variables from the Templar theme system:

- `--card`: Card background color
- `--card-foreground`: Card text color
- `--border`: Border color
- `--muted`: Muted background color
- `--muted-foreground`: Muted text color
- `--shadow-sm`, `--shadow-md`, `--shadow-lg`: Shadow definitions

## Accessibility

- Clickable cards have `role="button"` and `tabIndex={0}`
- Proper `aria-disabled` attribute when disabled
- Loading state is properly indicated with overlay
- Keyboard navigation support for clickable cards

## Examples

### Dashboard Card

```tsx
<Card 
  variant="elevated"
  size="lg"
  header={
    <div className="flex items-center justify-between">
      <h3>Analytics</h3>
      <Icon name="BarChart" />
    </div>
  }
  footer={
    <Button variant="outline" size="sm">
      View Details
    </Button>
  }
>
  <div className="space-y-4">
    <div className="text-2xl font-bold">1,234</div>
    <div className="text-sm text-muted">+12% from last month</div>
  </div>
</Card>
```

### Action Card

```tsx
<Card 
  variant="outlined"
  clickable
  onAsyncClick={async () => {
    await handleAction();
  }}
  className="hover:border-primary"
>
  <div className="text-center">
    <Icon name="Plus" size="lg" className="mb-2" />
    <h3>Add New Item</h3>
    <p className="text-sm text-muted">Click to create</p>
  </div>
</Card>
```

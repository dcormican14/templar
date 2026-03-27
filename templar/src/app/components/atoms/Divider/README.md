# Divider Component

A flexible separator component for visually dividing content, supporting horizontal and vertical orientations, optional labels, and multiple line styles.

## Features

- **Orientations**: horizontal and vertical
- **Line styles**: solid (default), dashed, dotted
- **Label support**: optional text or node label with start/center/end positioning
- **Spacing system**: follows the 4px spacing scale
- **Subtle mode**: reduced opacity for de-emphasized separators
- **Color variants**: all universal colors plus `muted` (default)
- **Theme integration**: uses CSS variables for automatic theme adaptation
- **Accessibility**: proper ARIA role attributes

## File Structure

```
Divider/
├── index.ts                 # Main exports
├── Divider.tsx              # Main component implementation
├── Divider.types.ts         # TypeScript type definitions
├── Divider.styles.ts        # Style computation functions
├── Divider.utils.tsx        # Utility/render functions
├── Divider.config.tsx       # Default config values
└── README.md                # Documentation
```

## Usage

### Basic

```tsx
import { Divider } from './components/atoms/Divider';

<Divider />
```

### Vertical

```tsx
<div style={{ display: 'flex', height: '40px', alignItems: 'center' }}>
  <span>Left</span>
  <Divider orientation="vertical" spacing="sm" />
  <span>Right</span>
</div>
```

### With Label

```tsx
<Divider label="OR" />

<Divider label="Section Title" labelPosition="start" />
```

### Line Styles

```tsx
<Divider dashed />
<Divider dotted />
```

### Colors & Subtle

```tsx
<Divider color="primary" />
<Divider color="muted" subtle />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Direction of the divider line |
| `spacing` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Margin around the divider |
| `fullSize` | `boolean` | `true` | Whether to stretch to full width/height |
| `label` | `React.ReactNode` | — | Optional label rendered on the line |
| `labelPosition` | `'start' \| 'center' \| 'end'` | `'center'` | Position of the label along the line |
| `subtle` | `boolean` | `false` | Apply reduced opacity for a lighter appearance |
| `dashed` | `boolean` | `false` | Use a dashed line style |
| `dotted` | `boolean` | `false` | Use a dotted line style |
| `color` | `UniversalColor \| 'muted'` | `'muted'` | Line color |

Also accepts all standard `HTMLDivElement` attributes and universal container props (`size`, `disabled`, `animate`, `rounded`, `width`, `height`, etc.).

## Accessibility

- Renders with `role="separator"` and `aria-orientation` matching the `orientation` prop
- Compatible with high contrast themes via CSS variables

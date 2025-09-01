# Slider Component

A comprehensive, accessible slider component that follows the Templar design system standards.

## Features

- **Full Design System**: Supports all semantic colors (primary, secondary, success, warning, destructive, info, custom)
- **Multiple Sizes**: xs, sm, md, lg, xl with proportional scaling
- **Orientation Support**: Both horizontal and vertical orientations
- **Accessibility**: Full ARIA support, keyboard navigation, screen reader friendly
- **Interactive Features**: Tooltips, tick marks, min/max labels, custom formatting
- **Controlled/Uncontrolled**: Supports both controlled and uncontrolled modes
- **Touch Support**: Works on mobile devices with touch events
- **Animation Support**: Smooth transitions with settings integration
- **Type Safety**: Full TypeScript support with comprehensive prop types

## Basic Usage

```tsx
import { Slider } from '@/components/atoms/Slider';

// Basic slider
<Slider 
  defaultValue={50}
  onChange={(value) => console.log(value)}
/>

// With label and description
<Slider
  label="Volume"
  description="Adjust the audio volume level"
  min={0}
  max={100}
  step={5}
  showLabels
  showTooltip
/>
```

## Color Variants

```tsx
// Semantic colors
<Slider color="primary" />
<Slider color="secondary" />
<Slider color="success" />
<Slider color="warning" />
<Slider color="destructive" />
<Slider color="info" />

// Custom color
<Slider color="custom" customColor="#ff6b35" />
```

## Sizes

```tsx
<Slider size="xs" />  {/* Extra small */}
<Slider size="sm" />  {/* Small */}
<Slider size="md" />  {/* Medium (default) */}
<Slider size="lg" />  {/* Large */}
<Slider size="xl" />  {/* Extra large */}
```

## Orientations

```tsx
// Horizontal (default)
<Slider orientation="horizontal" length="300px" />

// Vertical
<Slider orientation="vertical" length="200px" />
```

## Advanced Features

```tsx
// With tick marks and custom formatting
<Slider
  min={0}
  max={100}
  step={10}
  showTicks
  showTooltip
  formatValue={(value) => `${value}%`}
  ticks={[
    { value: 0, label: 'Min' },
    { value: 50, label: 'Mid' },
    { value: 100, label: 'Max' }
  ]}
/>

// Controlled mode
const [value, setValue] = useState(25);
<Slider
  value={value}
  onChange={(newValue) => setValue(newValue)}
  min={0}
  max={100}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `SliderColor` | `'primary'` | Color scheme of the slider |
| `customColor` | `string` | - | Custom color when color is 'custom' |
| `size` | `SliderSize` | `'md'` | Size of the slider |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Slider orientation |
| `value` | `number` | - | Current value (controlled mode) |
| `defaultValue` | `number` | `0` | Default value (uncontrolled mode) |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step increment |
| `disabled` | `boolean` | `false` | Whether the slider is disabled |
| `error` | `boolean` | `false` | Whether the slider is in error state |
| `onChange` | `(value: number, event: ChangeEvent) => void` | - | Value change callback |
| `onInput` | `(value: number, event: FormEvent) => void` | - | Input event callback |
| `showTooltip` | `boolean` | `false` | Show value tooltip |
| `showTicks` | `boolean` | `false` | Show tick marks |
| `ticks` | `Array<{value: number, label?: string}>` | - | Custom tick configuration |
| `label` | `string` | - | Slider label |
| `description` | `string` | - | Description text |
| `showLabels` | `boolean` | `false` | Show min/max labels |
| `minLabel` | `string` | - | Custom min label |
| `maxLabel` | `string` | - | Custom max label |
| `length` | `string \| number` | - | Slider length |
| `formatValue` | `(value: number) => string` | - | Value formatter |
| `className` | `string` | - | Additional CSS classes |
| `style` | `CSSProperties` | - | Inline styles |

## Types

```tsx
type SliderSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type SliderColor = 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'info' | 'custom';
type SliderOrientation = 'horizontal' | 'vertical';

interface SliderRef {
  focus: () => void;
  blur: () => void;
}
```

## Accessibility

The Slider component is built with accessibility in mind:

- Full ARIA support (`role="slider"`, `aria-valuemin/max/now`, etc.)
- Keyboard navigation (Arrow keys, Page Up/Down, Home/End)
- Screen reader announcements for value changes
- Focus management with visible focus indicators
- Proper labeling and descriptions

## Keyboard Navigation

- **Arrow Keys**: Increase/decrease by step amount
- **Page Up/Down**: Increase/decrease by 10× step amount  
- **Home/End**: Jump to min/max values
- **Tab**: Focus/unfocus the slider

## Styling

The component follows the Templar design system:

- Uses CSS variables for theming
- Supports animation preferences from settings
- Responsive sizing and touch targets
- Consistent visual hierarchy

## Examples

See the component showcase page for interactive examples and detailed usage patterns.
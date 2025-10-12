# Toggle Component

An animated toggle/switch component with smooth bubble animation. Features a clean, modern design with a single animated bubble that slides between states.

## Features

- **Smooth Animation**: Single bubble with elegant slide transition
- **Multiple Variants**: Primary, secondary, success, warning, and error color schemes
- **Three Sizes**: Small, medium, and large options
- **Accessibility**: Full keyboard navigation and screen reader support
- **Form Integration**: Works with forms, controlled/uncontrolled modes
- **Customizable**: Labels, descriptions, and positioning options

## Animation Details

The toggle features a playful bouncy animation:
- **Bounce Effect**: Bubble bounces slightly when sliding between states
- **Color Change**: Background changes to variant color when active
- **Spring Easing**: Uses cubic-bezier(0.34, 1.56, 0.64, 1) for playful bounce effect
- **Duration**: 0.4s for satisfying tactile feedback

## Basic Usage

```tsx
import { Toggle } from '@/components/atoms';

function MyComponent() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <Toggle
      checked={isEnabled}
      onChange={(checked) => setIsEnabled(checked)}
      label="Enable notifications"
    />
  );
}
```

## Props

### State Props
- `checked`: Controlled checked state
- `defaultChecked`: Default checked state for uncontrolled mode
- `onChange`: Callback fired when toggle state changes
- `disabled`: Whether the toggle is disabled

### Appearance Props
- `size`: Toggle size ('sm' | 'md' | 'lg')
- `variant`: Color variant ('primary' | 'secondary' | 'success' | 'warning' | 'error')

### Content Props
- `label`: Label text for the toggle
- `description`: Description text shown below the label
- `labelPosition`: Position of label ('left' | 'right')

### Form Props
- `name`: Form input name
- `value`: Form input value
- `required`: Whether the toggle is required

### Accessibility Props
- `aria-label`: Custom aria-label
- `aria-describedby`: Custom aria-describedby
- `id`: Custom ID for the toggle

## Variants

### Primary (Default)
```tsx
<Toggle variant="primary" label="Primary toggle" />
```

### Secondary
```tsx
<Toggle variant="secondary" label="Secondary toggle" />
```

### Success
```tsx
<Toggle variant="success" label="Success toggle" />
```

### Warning
```tsx
<Toggle variant="warning" label="Warning toggle" />
```

### Error
```tsx
<Toggle variant="error" label="Error toggle" />
```

## Sizes

### Small
```tsx
<Toggle size="sm" label="Small toggle" />
```

### Medium (Default)
```tsx
<Toggle size="md" label="Medium toggle" />
```

### Large
```tsx
<Toggle size="lg" label="Large toggle" />
```

## Label Positioning

### Right Side (Default)
```tsx
<Toggle label="Label on right" labelPosition="right" />
```

### Left Side
```tsx
<Toggle label="Label on left" labelPosition="left" />
```

## With Description

```tsx
<Toggle
  label="Enable notifications"
  description="Receive email notifications when new messages arrive"
/>
```

## Form Integration

### Controlled
```tsx
function ControlledExample() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <form>
      <Toggle
        name="notifications"
        checked={isChecked}
        onChange={(checked) => setIsChecked(checked)}
        label="Email notifications"
        required
      />
    </form>
  );
}
```

### Uncontrolled
```tsx
<form>
  <Toggle
    name="notifications"
    defaultChecked={true}
    label="Email notifications"
  />
</form>
```

## Accessibility

The Toggle component includes comprehensive accessibility features:

- **Keyboard Navigation**: Space/Enter to toggle
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Focus Management**: Clear focus indicators
- **Form Integration**: Works with form libraries and validation

## Imperative API

Use a ref to access imperative methods:

```tsx
import { useRef } from 'react';
import { Toggle, ToggleRef } from '@/components/atoms';

function MyComponent() {
  const toggleRef = useRef<ToggleRef>(null);

  const focusToggle = () => {
    toggleRef.current?.focus();
  };

  const clickToggle = () => {
    toggleRef.current?.click();
  };

  return (
    <Toggle
      ref={toggleRef}
      label="Toggle with ref"
    />
  );
}
```

## Styling

The component uses CSS variables from the Templar design system:

- `--primary-rgb`: Primary color (default)
- `--secondary-rgb`: Secondary color
- `--success-rgb`: Success color
- `--warning-rgb`: Warning color
- `--error-rgb`: Error color
- `--foreground`: Text color
- `--foreground-muted`: Muted text color
- `--muted-rgb`: Unchecked background color

## Animation Customization

The bubble animation uses:
- **Duration**: 0.4s for bubble transitions
- **Easing**: `cubic-bezier(0.34, 1.56, 0.64, 1)` for bounce effect
- **Properties**: `transform`, `background-color`, `opacity`

Custom animations can be applied via CSS-in-JS or by overriding the component styles.

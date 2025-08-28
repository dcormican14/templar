# CheckBox Component

A versatile and accessible checkbox component following the Templar design standards.

## Features

- **Simple State Management**: Works uncontrolled by default - no need to manage state manually
- **Controlled Mode**: Optional controlled mode for advanced use cases
- **Multiple Sizes**: xs, sm, md (default), lg, xl
- **Multiple Variants**: default, primary, secondary, success, warning, error
- **Indeterminate State**: Support for mixed/indeterminate state
- **Label & Description**: Optional label and description text
- **Content Toggle**: Control whether clicking labels toggles the checkbox
- **Accessibility**: Full keyboard navigation and screen reader support
- **Theme Integration**: Automatic adaptation to light/dark themes
- **Rounded Corners**: Optional rounded styling
- **Error States**: Built-in error state styling
- **Animation Support**: Smooth transitions (when enabled in settings)

## Usage

### Simple Uncontrolled (Recommended)

```tsx
import { CheckBox } from '@/components/atoms';

function Example() {
  return (
    <CheckBox
      id="terms"
      defaultChecked={false}
      onChange={(checked) => {
        console.log('User accepted terms:', checked);
        // Handle side effects like API calls
        updateUserPreferences({ termsAccepted: checked });
      }}
      label="Accept terms and conditions"
    />
  );
}
```

### Controlled Mode (Advanced)

Use controlled mode only when you need complex state logic:

```tsx
function AdvancedExample() {
  const [checked, setChecked] = useState(false);

  return (
    <CheckBox
      checked={checked}
      onChange={(newChecked) => setChecked(newChecked)}
      label="Accept terms and conditions"
    />
  );
}
```

### With Description

```tsx
<CheckBox
  defaultChecked={false}
  onChange={(checked) => console.log('Notifications:', checked)}
  label="Send notifications"
  description="Get notified about important updates and changes to your account"
/>
```

### Sizes

```tsx
<CheckBox size="xs" defaultChecked label="Extra Small" />
<CheckBox size="sm" defaultChecked label="Small" />
<CheckBox size="md" defaultChecked label="Medium (Default)" />
<CheckBox size="lg" defaultChecked label="Large" />
<CheckBox size="xl" defaultChecked label="Extra Large" />
```

### Variants

```tsx
<CheckBox variant="default" defaultChecked label="Default" />
<CheckBox variant="primary" defaultChecked label="Primary" />
<CheckBox variant="secondary" defaultChecked label="Secondary" />
<CheckBox variant="success" defaultChecked label="Success" />
<CheckBox variant="warning" defaultChecked label="Warning" />
<CheckBox variant="error" defaultChecked label="Error" />
```

### Indeterminate State

For indeterminate state, you typically need controlled mode:

```tsx
function SelectAllExample() {
  const [items, setItems] = useState([
    { id: 1, selected: true },
    { id: 2, selected: false },
    { id: 3, selected: false }
  ]);
  
  const allSelected = items.every(item => item.selected);
  const someSelected = items.some(item => item.selected);
  const indeterminate = someSelected && !allSelected;

  return (
    <CheckBox
      checked={allSelected}
      indeterminate={indeterminate}
      onChange={(checked) => {
        setItems(items.map(item => ({ ...item, selected: checked })));
      }}
      label="Select all items"
      description={`${items.filter(item => item.selected).length} of ${items.length} selected`}
    />
  );
}
```

### Content Toggle Control

```tsx
// Enable content toggle (default)
<CheckBox
  contentToggleable={true}
  label="Clickable label"
  description="Clicking this text will toggle the checkbox"
/>

// Disable content toggle
<CheckBox
  contentToggleable={false}
  label="Non-clickable label"
  description="Only the checkbox itself is clickable"
/>
```

### Error State

```tsx
<CheckBox
  error={true}
  defaultChecked={false}
  label="Required field"
  description="This field must be checked to continue"
  onChange={(checked) => {
    if (checked) clearFieldError('terms');
  }}
/>
```

**Note:** Error checkboxes show an asterisk (*) icon when unchecked to indicate required fields. The asterisk color matches the variant's theme color (e.g., red for error state). Unchecked checkboxes have no border for a cleaner appearance.

### Disabled State

```tsx
<CheckBox
  disabled={true}
  defaultChecked={true}
  label="Disabled checkbox"
/>
```

### Rounded Style

```tsx
<CheckBox
  rounded={true}
  defaultChecked={false}
  label="Rounded checkbox"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size of the checkbox |
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error'` | `'default'` | Visual variant |
| `checked` | `boolean` | - | Controlled mode: Whether the checkbox is checked |
| `defaultChecked` | `boolean` | `false` | Uncontrolled mode: Initial checked state |
| `indeterminate` | `boolean` | `false` | Whether the checkbox is in indeterminate state |
| `disabled` | `boolean` | `false` | Whether the checkbox is disabled |
| `error` | `boolean` | `false` | Whether the checkbox is in error state |
| `label` | `string` | - | Label text for the checkbox |
| `description` | `string` | - | Description text shown below the label |
| `rounded` | `boolean` | `false` | Whether to use rounded corners |
| `contentToggleable` | `boolean` | `true` | Whether clicking labels/descriptions toggles checkbox |
| `onChange` | `(checked: boolean, event: ChangeEvent) => void` | - | Callback when state changes |
| `className` | `string` | - | Additional CSS classes |
| `style` | `CSSProperties` | - | Additional inline styles |

## Usage Modes

### Uncontrolled (Recommended)
Use `defaultChecked` prop. Component manages its own state internally.
- Simpler code - no state management needed
- Better performance - no re-renders on state change
- Handle changes with `onChange` for side effects

### Controlled (Advanced)
Use `checked` prop. Parent component manages the state.
- Full control over state
- Useful for complex validation logic
- Required by some form libraries

## Accessibility

- Uses proper ARIA attributes (`aria-checked`, `aria-describedby`)
- Supports keyboard navigation (Space and Enter keys)
- Screen reader compatible
- Focus indicators for keyboard users
- Proper labeling and descriptions
- **Interactive labels and descriptions**: Clicking on labels or descriptions toggles the checkbox state

## Interaction Behavior

- **Checkbox click**: Toggles checked state
- **Label click**: Toggles checked state (proper label association)
- **Description click**: Toggles checked state for better UX
- **Keyboard**: Space or Enter keys toggle state
- **Focus**: Clear visual focus indicators with variant-matched colors

## Design Standards Compliance

- **Sizes**: Follow the standard sizing scale (xs: 16px, sm: 18px, md: 20px, lg: 24px, xl: 28px)
- **Border Radius**: Standard 8px, rounded 24px
- **Colors**: Uses theme CSS variables for consistent theming
- **Spacing**: 4px-based spacing system
- **Typography**: Responsive font sizes based on component size
- **Animations**: Respects user animation preferences

# RadioButton Component

A flexible and accessible radio button component with support for variants, sizes, labels, descriptions, and grouping functionality.

## Features

- ✅ **Multiple Variants**: Primary, secondary, success, warning, error
- ✅ **Three Sizes**: Small (sm), medium (md), large (lg)
- ✅ **Accessibility**: Full ARIA support, keyboard navigation
- ✅ **Flexible Labels**: Support for labels and descriptions
- ✅ **Theme Integration**: Uses CSS variables for consistent theming
- ✅ **Group Support**: RadioButtonGroup component for easy grouping
- ✅ **Focus Management**: Auto-focus on interaction
- ✅ **Validation**: Invalid state support
- ✅ **Form Integration**: Full form compatibility

## Basic Usage

```tsx
import { RadioButton } from '@/components/atoms';

// Basic radio button
<RadioButton
  name="choice"
  value="option1"
  label="Option 1"
/>

// With description
<RadioButton
  name="choice"
  value="option2"
  label="Premium Plan"
  description="Get access to all features"
  variant="primary"
  size="lg"
/>

// Controlled component
const [selectedValue, setSelectedValue] = useState('option1');

<RadioButton
  name="choice"
  value="option1"
  checked={selectedValue === 'option1'}
  onChange={(e) => setSelectedValue(e.target.value)}
  label="Option 1"
/>
```

## RadioButton Group

```tsx
import { RadioButtonGroup } from '@/components/atoms';

const [selectedPlan, setSelectedPlan] = useState('basic');

<RadioButtonGroup
  name="plan"
  value={selectedPlan}
  onChange={setSelectedPlan}
  variant="primary"
  size="md"
  options={[
    {
      value: 'basic',
      label: 'Basic Plan',
      description: 'Perfect for getting started'
    },
    {
      value: 'premium',
      label: 'Premium Plan', 
      description: 'For growing businesses'
    },
    {
      value: 'enterprise',
      label: 'Enterprise Plan',
      description: 'For large organizations',
      disabled: true
    }
  ]}
/>
```

## Props

### RadioButton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the radio button |
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error'` | `'primary'` | Visual variant |
| `label` | `ReactNode` | - | Label text for the radio button |
| `description` | `ReactNode` | - | Description text shown below the label |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Position of label relative to radio button |
| `invalid` | `boolean` | `false` | Whether the radio button is in an invalid state |
| `contentToggleable` | `boolean` | `true` | Whether clicking on label/description toggles the radio button |
| `disabled` | `boolean` | `false` | Whether the radio button is disabled |
| `checked` | `boolean` | - | Controlled checked state |
| `defaultChecked` | `boolean` | `false` | Default checked state for uncontrolled component |
| `onChange` | `(event: ChangeEvent<HTMLInputElement>) => void` | - | Change event handler |
| `name` | `string` | - | Name attribute for grouping |
| `value` | `string` | - | Value attribute |

### RadioButtonGroup Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | **Required** | Name attribute for all radio buttons in the group |
| `value` | `string` | - | Currently selected value |
| `onChange` | `(value: string) => void` | - | Callback when selected value changes |
| `size` | `RadioButtonSize` | `'md'` | Size of all radio buttons in the group |
| `variant` | `RadioButtonVariant` | `'primary'` | Variant of all radio buttons in the group |
| `disabled` | `boolean` | `false` | Whether all radio buttons are disabled |
| `invalid` | `boolean` | `false` | Whether all radio buttons are in invalid state |
| `options` | `Array<Option>` | **Required** | Array of radio button options |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Position of labels relative to radio buttons |
| `orientation` | `'horizontal' \| 'vertical'` | `'vertical'` | Layout direction for the group |

### Option Object

```tsx
{
  value: string;           // Required: The value for this option
  label?: ReactNode;       // Optional: Label text
  description?: ReactNode; // Optional: Description text
  disabled?: boolean;      // Optional: Whether this option is disabled
}
```

## Variants

- **Primary**: Default blue variant
- **Secondary**: Gray variant for secondary actions
- **Success**: Green variant for positive actions
- **Warning**: Yellow/orange variant for warnings
- **Error**: Red variant for errors or invalid states

## Sizes

- **Small (sm)**: 16px radio button, ideal for compact layouts
- **Medium (md)**: 20px radio button, standard size
- **Large (lg)**: 24px radio button, for prominent selections

## Accessibility

- Full keyboard navigation support (Tab, Space, Arrow keys)
- Proper ARIA attributes
- Screen reader compatible
- Focus management
- Required field support

## Styling

The component uses CSS variables for theming and can be customized through the theme system. Focus states and hover effects are automatically handled.

## Form Integration

Works seamlessly with form libraries and native form submission. Supports both controlled and uncontrolled usage patterns.

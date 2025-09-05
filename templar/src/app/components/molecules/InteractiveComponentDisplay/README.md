# InteractiveComponentDisplay

A powerful molecule component that allows users to interactively modify props of other components in real-time. Perfect for documentation, testing, and development workflows.

## Features

- **Real-time prop editing**: Modify component props through intuitive controls
- **Flexible control types**: Support for select dropdowns, checkboxes, text inputs, number inputs, and color pickers
- **Code generation**: Automatically generates JSX code preview of the component with current props
- **Responsive layout**: Supports both horizontal and vertical layouts
- **Theme integration**: Fully integrated with the Templar theme system
- **TypeScript support**: Full type safety for all props and controls

## Usage

### Basic Example

```tsx
import { InteractiveComponentDisplay } from '@/components/molecules';
import { Button } from '@/components/atoms';

function ButtonDemo() {
  return (
    <InteractiveComponentDisplay
      title="Button Component"
      description="Explore different button configurations"
      leftControls={[
        {
          title: 'Appearance',
          controls: [
            {
              key: 'color',
              label: 'Color',
              type: 'select',
              options: [
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
                { label: 'Success', value: 'success' },
              ],
              defaultValue: 'primary'
            },
            {
              key: 'variant',
              label: 'Variant',
              type: 'select',
              options: [
                { label: 'Solid', value: 'solid' },
                { label: 'Outline', value: 'outline' },
                { label: 'Ghost', value: 'ghost' },
              ],
              defaultValue: 'solid'
            }
          ]
        }
      ]}
      rightControls={[
        {
          title: 'State',
          controls: [
            {
              key: 'disabled',
              label: 'Disabled',
              type: 'checkbox',
              defaultValue: false
            },
            {
              key: 'loading',
              label: 'Loading',
              type: 'checkbox',
              defaultValue: false
            }
          ]
        }
      ]}
    >
      <Button>Click me</Button>
    </InteractiveComponentDisplay>
  );
}
```

### Universal Controls

For atomic components that follow the universal design system, you can use the pre-built control configuration:

```tsx
import { InteractiveComponentDisplay, createUniversalControls } from '@/components/molecules';
import { Button } from '@/components/atoms';

function ButtonDemoWithUniversalControls() {
  const controls = createUniversalControls();
  
  return (
    <InteractiveComponentDisplay
      title="Button with Universal Controls"
      leftControls={[controls.appearance]}
      rightControls={[controls.state]}
    >
      <Button>Universal Button</Button>
    </InteractiveComponentDisplay>
  );
}
```

### Custom Control Types

```tsx
// Text input
{
  key: 'placeholder',
  label: 'Placeholder',
  type: 'text',
  defaultValue: 'Enter text...'
}

// Number input with constraints
{
  key: 'maxLength',
  label: 'Max Length',
  type: 'number',
  min: 0,
  max: 100,
  step: 1,
  defaultValue: 50
}

// Color picker
{
  key: 'customColor',
  label: 'Custom Color',
  type: 'color',
  defaultValue: '#ff0000'
}
```

### Layout Options

```tsx
// Vertical layout for narrow spaces
<InteractiveComponentDisplay
  layout="vertical"
  size="md"
  leftControls={[...]}
>
  <YourComponent />
</InteractiveComponentDisplay>

// Custom display area styling
<InteractiveComponentDisplay
  background="dots"
  padded={true}
  displayStyle={{ minHeight: '400px' }}
>
  <YourComponent />
</InteractiveComponentDisplay>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactElement` | - | The component to render and control |
| `leftControls` | `PropControlGroup[]` | `[]` | Control groups for the left panel |
| `rightControls` | `PropControlGroup[]` | `[]` | Control groups for the right panel |
| `initialProps` | `Record<string, any>` | `{}` | Initial prop values |
| `onPropsChange` | `(props: Record<string, any>) => void` | - | Callback when props change |
| `title` | `string` | - | Title for the component display |
| `description` | `string` | - | Description for the component |
| `showCode` | `boolean` | `true` | Whether to show code preview |
| `showControls` | `boolean` | `true` | Whether to show control panels |
| `displayStyle` | `React.CSSProperties` | - | Custom styling for display area |
| `displayClassName` | `string` | - | Custom className for display area |
| `padded` | `boolean` | `true` | Whether display area should have padding |
| `background` | `'none' \| 'dots' \| 'grid' \| 'subtle'` | `'none'` | Background pattern |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'lg'` | Size of the display |
| `layout` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout orientation |

## Control Types

### PropControl Interface

```tsx
interface PropControl {
  key: string;           // The prop key to control
  label: string;         // Display label for the control
  type: ControlType;     // Type of control input
  options?: Array<{      // Options for select controls
    label: string;
    value: any;
  }>;
  defaultValue?: any;    // Default value
  min?: number;         // Min value for number inputs
  max?: number;         // Max value for number inputs
  step?: number;        // Step for number inputs
}
```

### Control Types

- **`select`**: Dropdown selection
- **`checkbox`**: Boolean toggle
- **`text`**: Text input
- **`number`**: Number input with optional constraints
- **`color`**: Color picker

## Ref Methods

```tsx
const displayRef = useRef<InteractiveComponentDisplayRef>(null);

// Get current props
const currentProps = displayRef.current?.getProps();

// Set props programmatically
displayRef.current?.setProps({ color: 'success', disabled: true });

// Reset to initial state
displayRef.current?.resetProps();
```

## Styling

The InteractiveComponentDisplay is fully integrated with the Templar theme system and will automatically adapt to theme changes. All colors, spacing, and styling respect the current theme's CSS variables.

### Background Patterns

- **`none`**: Plain background
- **`dots`**: Dotted pattern for better visual contrast
- **`grid`**: Grid pattern for alignment reference
- **`subtle`**: Subtle background tint

## Best Practices

1. **Group related controls**: Use `PropControlGroup` to organize controls logically
2. **Provide defaults**: Always set reasonable `defaultValue` for controls
3. **Use descriptive labels**: Make control labels clear and concise
4. **Validate constraints**: Use `min`, `max`, and `step` for number inputs
5. **Test edge cases**: Ensure your component handles all possible prop combinations

## Examples

### Input Component Demo

```tsx
<InteractiveComponentDisplay
  title="Input Component"
  leftControls={[
    {
      title: 'Content',
      controls: [
        {
          key: 'placeholder',
          label: 'Placeholder',
          type: 'text',
          defaultValue: 'Enter text...'
        },
        {
          key: 'type',
          label: 'Type',
          type: 'select',
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Email', value: 'email' },
            { label: 'Password', value: 'password' },
          ],
          defaultValue: 'text'
        }
      ]
    }
  ]}
>
  <Input />
</InteractiveComponentDisplay>
```

This creates a comprehensive interactive demo for testing and showcasing component functionality.
# Notification Component

A versatile notification component following the Templar design standards, designed to work seamlessly with the ToastProvider system.

## Features

- **Card-like Styling**: Solid backgrounds matching the Card component theme
- **Multiple Types**: success, error, warning, info, default with accent border colors
- **Multiple Sizes**: sm, md (default), lg
- **Auto-dismiss**: Configurable auto-dismiss duration
- **Actions**: Support for action buttons
- **Accessibility**: Full keyboard navigation and screen reader support
- **Theme Integration**: Automatic adaptation to light/dark themes
- **Dismissible**: Optional dismiss functionality
- **Custom Icons**: Support for custom icons or default type-based icons
- **Animation Support**: Smooth transitions (when enabled in settings)

## Usage

### Basic Notification

```tsx
import { Notification } from '@/components/atoms';

function Example() {
  return (
    <Notification
      type="success"
      title="Success!"
      description="Your action was completed successfully."
      onDismiss={() => console.log('Dismissed')}
    />
  );
}
```

### With ToastProvider

The component is designed to work with the ToastProvider:

```tsx
import { useToast } from '@/providers';

function Example() {
  const { success, error, warning, info } = useToast();

  const handleSuccess = () => {
    success("Operation completed", "Your data has been saved successfully");
  };

  const handleError = () => {
    error("Something went wrong", "Please try again later");
  };

  return (
    <div>
      <button onClick={handleSuccess}>Show Success</button>
      <button onClick={handleError}>Show Error</button>
    </div>
  );
}
```

### Different Types

```tsx
<Notification type="success" title="Success notification" />
<Notification type="error" title="Error notification" />
<Notification type="warning" title="Warning notification" />
<Notification type="info" title="Info notification" />
<Notification type="default" title="Default notification" />
```

### Different Sizes

```tsx
<Notification size="sm" title="Small notification" />
<Notification size="md" title="Medium notification (default)" />
<Notification size="lg" title="Large notification" />
```

### With Actions

```tsx
<Notification
  type="warning"
  title="Confirm action"
  description="Are you sure you want to delete this item?"
  actions={[
    {
      label: "Cancel",
      onClick: () => console.log("Cancelled"),
      variant: "secondary"
    },
    {
      label: "Delete",
      onClick: () => console.log("Deleted"),
      variant: "primary"
    }
  ]}
/>
```

### Custom Icon

```tsx
<Notification
  title="Custom notification"
  customIcon={<Icon name="Star" size="sm" />}
  description="Using a custom icon"
/>
```

### Auto-dismiss

```tsx
<Notification
  title="Auto-dismiss notification"
  description="This will disappear in 3 seconds"
  duration={3000}
  onDismiss={() => console.log('Auto-dismissed')}
/>
```

### Non-dismissible

```tsx
<Notification
  title="Persistent notification"
  description="This notification cannot be dismissed"
  dismissible={false}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | auto-generated | Unique identifier for the notification |
| `type` | `'success' \| 'error' \| 'warning' \| 'info' \| 'default'` | `'default'` | Visual type affecting styling |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the notification |
| `title` | `string` | - | Main title/heading (required) |
| `description` | `string` | - | Optional description or detailed message |
| `dismissible` | `boolean` | `true` | Whether the notification can be dismissed |
| `showIcon` | `boolean` | `true` | Whether to show the type-based icon |
| `customIcon` | `ReactNode` | - | Custom icon to display instead of default |
| `actions` | `NotificationAction[]` | - | Optional action buttons |
| `onDismiss` | `() => void` | - | Callback when notification is dismissed |
| `duration` | `number \| null` | - | Auto-dismiss duration in milliseconds |
| `rounded` | `boolean` | `false` | Whether to use rounded corners |
| `className` | `string` | - | Additional CSS classes |
| `style` | `CSSProperties` | - | Additional inline styles |
| `children` | `ReactNode` | - | Custom content |

## NotificationAction

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Button text (required) |
| `onClick` | `() => void` | - | Click handler (required) |
| `variant` | `'default' \| 'primary' \| 'secondary'` | `'default'` | Button variant |

## Integration with ToastProvider

The ToastProvider automatically creates Notification components and manages their lifecycle:

```tsx
// ToastProvider convenience methods create notifications
const toast = useToast();

// These automatically create Notification components
toast.success("Title", "Description");
toast.error("Title", "Description");
toast.warning("Title", "Description");
toast.info("Title", "Description");

// Or use the generic addToast method
toast.addToast({
  type: 'success',
  title: 'Custom notification',
  description: 'With custom options',
  duration: 5000,
  action: {
    label: 'Action',
    onClick: () => console.log('Action clicked')
  }
});
```

## Accessibility

- Uses proper ARIA attributes (`role="alert"`, `aria-label`)
- Supports keyboard navigation (Escape key to dismiss)
- Screen reader compatible
- Focus management for dismissible notifications
- Proper semantic HTML structure
- High contrast support

## Design Standards Compliance

- **Background**: Uses Card component theming (solid backgrounds)
- **Accent Colors**: Left border with type-specific colors (success, error, etc.)
- **Sizes**: Follow the standard sizing scale
- **Border Radius**: Standard 4px/8px, rounded 12px/16px
- **Colors**: Uses theme CSS variables for consistent theming
- **Spacing**: 4px-based spacing system
- **Typography**: Responsive font sizes based on component size
- **Animations**: Respects user animation preferences
- **Icons**: Type-specific icons with accent colors

## Best Practices

### ✅ Do
- Use appropriate types for the context (success for completions, error for failures)
- Provide clear, concise titles
- Use descriptions for additional context
- Set appropriate auto-dismiss durations (3-5 seconds for success, longer for errors)
- Use actions sparingly and only when necessary
- Test with keyboard navigation and screen readers

### ❌ Don't
- Don't use too many notifications simultaneously
- Don't make critical error notifications auto-dismiss
- Don't use vague or unclear messaging
- Don't overuse actions (max 2-3 buttons)
- Don't forget to handle dismiss callbacks
- Don't rely solely on color to convey meaning

# Icon Component

A comprehensive, theme-aware icon component built with React, TypeScript, and the iconoir icon library.

## Features

- **1000+ Icons**: Complete iconoir icon library with dynamic loading
- **Flexible sizing**: xs, sm, md, lg, xl or custom pixel values
- **Color variants**: Theme colors, inherit, or custom colors
- **Animations**: Built-in spin and pulse animations
- **Theme integration**: Automatic adaptation to RoundTable theme system
- **Type safety**: Full TypeScript support with icon name autocompletion
- **Performance**: Memoized computations and optimized re-renders
- **Accessibility**: Proper SVG attributes and screen reader support

## File Structure

```
Icon/
├── index.ts                 # Main exports
├── Icon.tsx                 # Main component implementation
├── Icon.types.ts            # TypeScript type definitions
├── Icon.styles.ts           # Style computation functions
├── Icon.utils.ts            # Utility functions
├── iconRegistry.ts          # Icon registry and dynamic loading
├── components/
│   ├── index.ts            # Component exports
│   └── IconAnimations.tsx  # Animation styles component
└── README.md               # Documentation
```

- **1500+ Icons**: Access to the complete Iconoir icon library via iconoir-react
- **Theme Integration**: Automatic color adaptation using RoundTable ThemeProvider
- **Size Flexibility**: Predefined sizes (xs, sm, md, lg, xl) or custom pixel values
- **Animation Support**: Built-in spin and pulse animations with settings integration
- **Type Safety**: Full TypeScript support with icon name validation
- **Performance**: Tree-shakable React components from iconoir-react
- **Accessibility**: Proper ARIA attributes and screen reader support

## Basic Usage

```tsx
import { Icon, IconSun, IconMoon } from './components/atoms';

// Basic icon
<Icon name="user" />

// With size and color
<Icon name="settings" size="lg" color="primary" />

// Predefined convenience components
<IconSun color="warning" />
<IconMoon color="info" />
```

## Using Any Iconoir Icon

You can use any icon from the iconoir-react library directly:

```tsx
import { Icon } from './components/atoms';
import { Camera, Wifi } from 'iconoir-react';

// Use any iconoir-react component directly
<Icon name={Camera} size="md" color="primary" />
<Icon name={Wifi} size="lg" color="success" />
```

## Props

```tsx
interface IconProps {
  name: IconName | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'muted' | string;
  spin?: boolean;
  pulse?: boolean;
  className?: string;
  // Plus all standard SVG props
}
```

## Size Options

| Size | Pixels | Usage |
|------|--------|-------|
| `xs` | 12px | Small indicators, badges |
| `sm` | 16px | Inline text, small buttons |
| `md` | 20px | Default size, most UI elements |
| `lg` | 24px | Larger buttons, navigation |
| `xl` | 32px | Headers, hero sections |
| Custom | Any number | `size={28}` for 28px |

## Color System Integration

The Icon component automatically integrates with the RoundTable theme system:

```tsx
// Theme colors (adapt automatically)
<Icon name="user" color="primary" />     // Uses theme primary color
<Icon name="user" color="secondary" />   // Uses theme secondary color
<Icon name="user" color="muted" />       // Uses theme muted color

// Status colors
<Icon name="check" color="success" />    // Green
<Icon name="warning" color="warning" />  // Orange/Yellow
<Icon name="x" color="error" />          // Red
<Icon name="info" color="info" />        // Blue

// Custom colors
<Icon name="user" color="#ff0000" />     // Any CSS color
<Icon name="user" color="inherit" />     // Inherits from parent
```

## Animations

Icons support built-in animations that respect the user's animation preferences:

```tsx
// Spinning animation (great for loading states)
<Icon name="settings" spin />

// Pulsing animation (great for notifications)
<Icon name="bell" pulse />

// Animations automatically disabled if user prefers reduced motion
```

## Using Custom Icons

You can use any icon from the iconoir-react library:

```tsx
import { Icon } from './components/atoms';
import { Camera, Wifi, Apple, Windows } from 'iconoir-react';

// Use any iconoir-react component directly
<Icon name={Camera} size="md" color="primary" />
<Icon name={Wifi} size="lg" color="success" />

// Or import and use directly (bypassing our wrapper)
<Camera width={24} height={24} color="#3b82f6" />
```

## Available Pre-loaded Icons

The component includes 30+ commonly used icons by default:

### Navigation & Actions
- `home`, `user`, `settings`, `search`, `menu`
- `arrow-left`, `arrow-right`, `plus`, `minus`
- `check`, `x`, `edit`, `delete`

### Theme & Status
- `sun`, `moon`, `star`, `heart`, `bell`
- `warning`, `info`, `check`, `x`

### Security & Data
- `lock`, `unlock`, `eye`, `eye-off`
- `download`, `upload`, `share`, `copy`

### System
- `loading` (auto-spins), `settings`

## Using Custom Icons

You can use any icon from the Iconoir library:

```tsx
import CustomIcon from 'iconoir/icons/custom-icon-name.svg';

<Icon name={CustomIcon} size="md" color="primary" />
```

## Integration with Button Component

Icons work seamlessly with the Button component:

```tsx
import { Button, Icon } from './components/atoms';

<Button
  icon={<Icon name="plus" />}
  iconPosition="left"
  variant="primary"
>
  Add Item
</Button>

<Button
  icon={<Icon name="arrow-right" />}
  iconPosition="right"
  variant="secondary"
>
  Continue
</Button>
```

## Convenience Components

For commonly used icons, convenience components are available:

```tsx
import { 
  IconSun, 
  IconMoon, 
  IconUser, 
  IconSettings,
  IconPlus,
  IconCheck,
  IconLoading  // Automatically spins
} from './components/atoms';

<IconSun color="warning" />
<IconMoon color="info" />
<IconLoading />  // Perfect for loading states
```

## Accessibility

The Icon component automatically includes proper accessibility attributes:

- `role="img"` for decorative icons
- `aria-hidden="true"` when used purely decoratively
- Inherits color for proper contrast
- Respects `prefers-reduced-motion` for animations

## Performance

- **Tree Shaking**: Only imported icons are included in the bundle
- **SVG Optimization**: Icons are optimized SVGs from Iconoir
- **No Runtime Dependencies**: Pure React components
- **CSS-in-JS**: Styles are applied directly, no external CSS needed

## Examples

### Theme Toggle Button
```tsx
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      icon={theme === 'dark' ? <IconSun /> : <IconMoon />}
      iconPosition="left"
    >
      {theme === 'dark' ? 'Light' : 'Dark'} Mode
    </Button>
  );
};
```

### Loading State
```tsx
const LoadingButton = ({ loading, children, ...props }) => (
  <Button
    {...props}
    disabled={loading}
    icon={loading ? <IconLoading /> : undefined}
    iconPosition="left"
  >
    {loading ? 'Loading...' : children}
  </Button>
);
```

### Status Indicators
```tsx
const StatusIndicator = ({ status }) => {
  const iconProps = {
    success: { name: 'check', color: 'success' },
    warning: { name: 'warning', color: 'warning' },
    error: { name: 'x', color: 'error' },
    info: { name: 'info', color: 'info' }
  }[status];
  
  return <Icon {...iconProps} />;
};
```

## Contributing

To add more commonly used icons to the default set:

1. Import the icon from iconoir: `import NewIcon from 'iconoir/icons/new-icon.svg';`
2. Add to the `iconRegistry` object
3. Export a convenience component: `export const IconNewIcon = (props) => <Icon name="new-icon" {...props} />;`
4. Update the type definitions and exports

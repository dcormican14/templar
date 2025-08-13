# CSS Variables in Templar ThemeProvider

The Templar ThemeProvider now includes powerful CSS variable support that allows you to access theme colors and properties dynamically in your React components.

## Features

- **Automatic CSS Variable Updates**: All CSS variables update automatically when the theme changes
- **TypeScript Support**: Full type safety for all theme variables
- **Multiple Access Methods**: Access variables through hooks, direct CSS, or utility functions
- **Pre-built Surface Styles**: Ready-to-use style objects for common UI patterns

## CSS Variables Available

All themes include these CSS variables:

### Base Colors
- `--background` / `--foreground`
- `--primary` / `--primary-foreground` / `--primary-hover`
- `--secondary` / `--secondary-foreground` / `--secondary-hover`
- `--accent` / `--accent-foreground`

### Status Colors
- `--success` / `--success-foreground`
- `--warning` / `--warning-foreground`
- `--error` / `--error-foreground`
- `--info` / `--info-foreground`

### UI Elements
- `--border` / `--border-hover`
- `--muted` / `--muted-foreground`
- `--card` / `--card-foreground`
- `--input` / `--input-border` / `--input-placeholder`

### Shadows
- `--shadow-sm` / `--shadow` / `--shadow-md` / `--shadow-lg`

## Usage Methods

### 1. Direct CSS (Traditional)

```css
.my-component {
  background-color: var(--primary);
  color: var(--primary-foreground);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}
```

### 2. useTheme Hook (Basic)

```tsx
import { useTheme } from './providers';

function MyComponent() {
  const { themeVariables, getCSSVariable } = useTheme();
  
  return (
    <div style={{
      backgroundColor: themeVariables.primary,
      color: themeVariables.primaryForeground
    }}>
      Primary Component
    </div>
  );
}
```

### 3. useCSSVariables Hook (Advanced)

```tsx
import { useCSSVariables } from './providers';

function MyComponent() {
  const cssVars = useCSSVariables();
  
  return (
    <div>
      {/* Pre-built surface styles */}
      <div style={cssVars.surface.primary}>
        Primary Surface
      </div>
      
      {/* Custom styles */}
      <div style={cssVars.createStyles({
        backgroundColor: 'card',
        color: 'card-foreground',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'border'
      })}>
        Custom Card
      </div>
      
      {/* With opacity */}
      <div style={{
        backgroundColor: cssVars.getColorWithOpacity('primary', 0.1),
        color: cssVars.primary
      }}>
        Subtle Background
      </div>
    </div>
  );
}
```

## Pre-built Surface Styles

The `useCSSVariables` hook provides ready-to-use surface styles:

- `cssVars.surface.primary` - Primary button/surface style
- `cssVars.surface.secondary` - Secondary surface style
- `cssVars.surface.card` - Card/container style with border
- `cssVars.surface.success` - Success state style
- `cssVars.surface.warning` - Warning state style
- `cssVars.surface.error` - Error state style
- `cssVars.surface.info` - Info state style

## Utility Functions

### `createStyles(styleMap)`
Create a style object using CSS variable names:

```tsx
const styles = cssVars.createStyles({
  backgroundColor: 'primary',
  color: 'primary-foreground',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'border'
});
```

### `getColorWithOpacity(colorVariable, opacity)`
Get a color with specified opacity:

```tsx
const subtleBackground = cssVars.getColorWithOpacity('primary', 0.1);
```

### `getVariable(name, fallback)`
Get any CSS variable with optional fallback:

```tsx
const customColor = cssVars.getVariable('my-custom-color', '#fallback');
```

## Benefits

1. **Theme Consistency**: All components automatically use the current theme colors
2. **Dynamic Updates**: Colors change instantly when theme switches
3. **Type Safety**: Full TypeScript support prevents typos and invalid values
4. **Performance**: CSS variables are handled natively by the browser
5. **Flexibility**: Multiple ways to access and use theme values

## Adding Custom Variables

To add custom CSS variables to your themes:

1. Add the variable to your theme CSS files:
```css
[data-theme="light"] {
  --my-custom-color: #123456;
}

[data-theme="dark"] {
  --my-custom-color: #abcdef;
}
```

2. Access it using the utility functions:
```tsx
const myColor = cssVars.getVariable('my-custom-color');
```

## Best Practices

1. **Use semantic color names** rather than specific color values
2. **Prefer CSS variables over hardcoded colors** for theme consistency
3. **Use the pre-built surface styles** when possible for consistency
4. **Test with all themes** to ensure proper contrast and accessibility
5. **Use TypeScript** to catch variable name errors at compile time

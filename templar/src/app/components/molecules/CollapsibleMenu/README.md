# CollapsibleMenu Component

A collapsible side navigation menu molecule component with customizable positioning and styling.

## Features

- **Collapsible**: Toggle between expanded and collapsed states
- **Positioning**: Can be placed on the left or right side
- **Toggle Tag**: Protruding toggle button with animated caret icon
- **Overlay/Inline**: Can overlay content or push it aside
- **Responsive**: Adapts to different screen sizes
- **Accessible**: Full keyboard navigation and screen reader support
- **Themeable**: Supports all color variants and CSS variables

## Basic Usage

```tsx
import { CollapsibleMenu } from '@/components/molecules/CollapsibleMenu';

// Uncontrolled menu
<CollapsibleMenu>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </nav>
</CollapsibleMenu>

// Controlled menu
const [collapsed, setCollapsed] = useState(false);

<CollapsibleMenu 
  collapsed={collapsed} 
  onToggle={setCollapsed}
  position="right"
>
  <div>Menu content here</div>
</CollapsibleMenu>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `collapsed` | `boolean` | `undefined` | Controlled collapsed state |
| `defaultCollapsed` | `boolean` | `false` | Default collapsed state for uncontrolled mode |
| `onToggle` | `(collapsed: boolean) => void` | `undefined` | Callback when collapsed state changes |
| `position` | `'left' \| 'right'` | `'left'` | Position of the menu |
| `expandedWidth` | `string \| number` | `'250px'` | Width when expanded |
| `collapsedWidth` | `string \| number` | `'60px'` | Width when collapsed |
| `showToggle` | `boolean` | `true` | Whether to show the toggle button |
| `toggleContent` | `React.ReactNode` | `undefined` | Custom toggle button content |
| `overlay` | `boolean` | `false` | Whether to overlay content or push it |
| `zIndex` | `number` | `1000` | Z-index for overlay mode |
| `animationDuration` | `number` | `300` | Animation duration in milliseconds |
| `color` | `CollapsibleMenuColor` | `'primary'` | Color variant |
| `size` | `CollapsibleMenuSize` | `'md'` | Size variant |
| `shape` | `CollapsibleMenuShape` | `'default'` | Shape variant |
| `disabled` | `boolean` | `false` | Whether the menu is disabled |
| `animate` | `boolean` | `true` | Whether animations are enabled |
| `className` | `string` | `undefined` | Additional CSS classes |
| `style` | `React.CSSProperties` | `undefined` | Additional inline styles |

## Examples

### Left Side Navigation
```tsx
<CollapsibleMenu position="left" expandedWidth="280px">
  <div style={{ padding: '20px' }}>
    <h3>Navigation</h3>
    <ul>
      <li><a href="/">Dashboard</a></li>
      <li><a href="/users">Users</a></li>
      <li><a href="/settings">Settings</a></li>
    </ul>
  </div>
</CollapsibleMenu>
```

### Right Side Panel
```tsx
<CollapsibleMenu 
  position="right" 
  color="secondary"
  defaultCollapsed={true}
  overlay={true}
>
  <div>
    <h3>Filters</h3>
    <form>
      {/* Filter controls */}
    </form>
  </div>
</CollapsibleMenu>
```

### Custom Toggle Button
```tsx
<CollapsibleMenu 
  toggleContent={<span>☰</span>}
  color="primary"
  shape="round"
>
  <nav>Menu items</nav>
</CollapsibleMenu>
```

### Controlled with State
```tsx
function App() {
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  
  return (
    <div style={{ display: 'flex' }}>
      <CollapsibleMenu 
        collapsed={menuCollapsed}
        onToggle={setMenuCollapsed}
        expandedWidth={300}
        collapsedWidth={80}
      >
        <nav>
          {/* Navigation content */}
        </nav>
      </CollapsibleMenu>
      
      <main style={{ flex: 1, padding: '20px' }}>
        <button onClick={() => setMenuCollapsed(!menuCollapsed)}>
          Toggle Menu
        </button>
        {/* Main content */}
      </main>
    </div>
  );
}
```

## Styling

The component supports color, size, and shape variants:

```tsx
<CollapsibleMenu 
  color="primary"
  size="lg"
  shape="round"
  style={{ 
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
  }}
>
  {/* Content */}
</CollapsibleMenu>
```

## Accessibility

- Full keyboard navigation support
- ARIA labels and attributes
- Screen reader friendly
- Focus management
- Proper semantic HTML structure

## Ref Methods

```tsx
const menuRef = useRef<CollapsibleMenuRef>(null);

// Imperative methods
menuRef.current?.toggle();    // Toggle collapsed state
menuRef.current?.expand();    // Expand the menu
menuRef.current?.collapse();  // Collapse the menu
menuRef.current?.isCollapsed(); // Get current collapsed state
```
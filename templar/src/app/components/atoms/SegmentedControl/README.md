# SegmentedControl

A segmented control component that displays a set of mutually exclusive options with a smooth bouncy sliding indicator animation and consistent fixed-width sizing.

## Features

- **Fixed width segments** - Consistent 120px per segment (480px for 4 segments)
- **Bouncy sliding indicator** - Smooth cubic-bezier animation with playful overshoot
- **Variant-themed indicators** - Sliding indicator uses variant foreground colors
- **Bold selected text** - Selected text becomes bold with variant accent color
- **Layout stability** - Ghost text technique prevents width shifting during text weight changes
- **Dynamic items** - Accepts array of strings as options
- **Controlled/Uncontrolled** - Supports both usage patterns
- **Keyboard navigation** - Arrow keys, Home, End support
- **Full accessibility** - Complete ARIA support with proper roles and attributes
- **Theme integration** - Uses CSS variables with consistent container backgrounds
- **Multiple variants** - Primary, Secondary, Outline, Ghost (indicator styling only)
- **Size options** - xs, sm, md, lg, xl following design standards

## Usage

### Basic Usage

```tsx
import { SegmentedControl } from '@/components/atoms/SegmentedControl';

function MyComponent() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  return (
    <SegmentedControl
      items={['Option 1', 'Option 2', 'Option 3']}
      selectedIndex={selectedIndex}
      onChange={(index, item) => {
        setSelectedIndex(index);
        console.log('Selected:', item);
      }}
    />
  );
}
```

### Uncontrolled Usage

```tsx
<SegmentedControl
  items={['Daily', 'Weekly', 'Monthly']}
  defaultSelectedIndex={1}
  onChange={(index, item) => console.log('Selected:', item)}
/>
```

### With Different Sizes and Variants

```tsx
<SegmentedControl
  items={['Small', 'Medium', 'Large']}
  size="lg"
  variant="secondary"
  rounded
  fullWidth
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `string[]` | **required** | Array of segment labels |
| `selectedIndex` | `number` | `undefined` | Controlled selected index |
| `defaultSelectedIndex` | `number` | `0` | Initial selected index for uncontrolled mode |
| `onChange` | `(index: number, item: string) => void` | `undefined` | Callback when selection changes |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Component size |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | Visual variant |
| `disabled` | `boolean` | `false` | Disable all segments |
| `fullWidth` | `boolean` | `false` | Expand to full container width |
| `rounded` | `boolean` | `false` | Use rounded corners (24px vs 8px) |
| `name` | `string` | `undefined` | Accessibility name for the group |

## Size Specifications

Following the project's design standards with fixed width calculations:

- **xs**: 40px height, 120px per segment 
- **sm**: 40px height, 120px per segment  
- **md**: 48px height, 120px per segment (default)
- **lg**: 52px height, 120px per segment
- **xl**: 60px height, 120px per segment

**Width Examples:**
- 2 segments: 240px total width
- 3 segments: 360px total width  
- 4 segments: 480px total width
- 5 segments: 600px total width

Set `fullWidth={true}` to override and expand to container width.

## Variants

All variants share the same container background (`cssVars.muted`) with consistent borders. Only the sliding indicator styling differs:

- **Primary**: Uses `primaryForeground` background, selected text in `primary` color
- **Secondary**: Uses `secondaryForeground` background, selected text in `secondary` color  
- **Outline**: Uses `primaryForeground` background with border accent, selected text in `primary` color
- **Ghost**: Same as primary but with no container border (`borderWidth: 0`)

## Imperative API

```tsx
const segmentedControlRef = useRef<SegmentedControlRef>(null);

// Focus the selected segment
segmentedControlRef.current?.focus();

// Blur the selected segment
segmentedControlRef.current?.blur();

// Programmatically select an index
segmentedControlRef.current?.selectIndex(2);
```

## Keyboard Navigation

- **Arrow Left/Up**: Select previous segment
- **Arrow Right/Down**: Select next segment  
- **Home**: Select first segment
- **End**: Select last segment

## Animation

The sliding indicator uses CSS transforms with a bouncy cubic-bezier timing function:

```css
transform: translateX(${selectedIndex * 100}%);
transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
```

**Key Features:**
- **Duration**: 0.4s for a more deliberate, satisfying animation
- **Timing**: `cubic-bezier(0.34, 1.56, 0.64, 1)` creates a playful bounce effect
- **Distance**: Reduced travel distance with 6px padding for more subtle movement
- **Stability**: Ghost text technique prevents layout shifts during font-weight transitions

## Technical Implementation

### Layout Stability
The component uses a "ghost text" technique to prevent layout shifts:

```tsx
{/* Invisible bold text reserves space */}
<span style={{
  visibility: 'hidden',
  fontWeight: '600',
  position: 'absolute',
  // ...
}}>
  {item}
</span>
{/* Visible text changes weight without affecting layout */}
<span>{item}</span>
```

### Styling Architecture
- **Container**: Consistent `cssVars.muted` background across all variants
- **Variants**: Only affect sliding indicator and selected text colors
- **Border conflicts**: Uses separate `borderWidth`, `borderStyle`, `borderColor` properties
- **Fixed positioning**: 6px padding with calculated indicator width

## Accessibility

- Uses `role="tablist"` for the container
- Each segment has `role="tab"` with appropriate ARIA attributes
- Proper keyboard navigation support
- Focus management with visual focus indicators
- Screen reader friendly with accessible names and descriptions
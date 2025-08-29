# Scrollbar Component

A customizable scrollbar component styled similarly to the ProgressIndicator loading bar, with support for variants, sizes, orientations, and cross-browser compatibility.

## Features

- ✅ **Multiple Variants**: Primary, secondary, success, warning, error
- ✅ **Three Sizes**: Small (sm), medium (md), large (lg)
- ✅ **Dual Orientation**: Vertical and horizontal scrollbars
- ✅ **Track Customization**: Configurable track thickness and visibility
- ✅ **Visibility Modes**: Always visible, hover-only, or auto
- ✅ **Cross-browser Support**: WebKit scrollbar styling + fallback for Firefox
- ✅ **Custom Implementation**: Custom scrollbar for precise control
- ✅ **Accessibility**: Full ARIA support and keyboard navigation
- ✅ **Performance**: Throttled scroll events and ResizeObserver
- ✅ **Theme Integration**: Uses CSS variables for consistent theming

## Basic Usage

```tsx
import { Scrollbar } from '@/components/atoms';

// Basic vertical scrollbar
<Scrollbar height={300}>
  <div>Your scrollable content...</div>
</Scrollbar>

// Horizontal scrollbar
<Scrollbar 
  orientation="horizontal" 
  width="100%" 
  maxWidth={600}
>
  <div style={{ width: '1200px' }}>Wide content...</div>
</Scrollbar>

// Always visible with custom styling
<Scrollbar
  height={400}
  variant="primary"
  size="lg"
  visibility="always"
  trackSize="lg"
>
  <div>Long content that needs scrolling...</div>
</Scrollbar>
```

## Advanced Usage

```tsx
// Controlled scrollbar
const [scrollPosition, setScrollPosition] = useState(0);

<Scrollbar
  height={300}
  scrollPosition={scrollPosition}
  onScroll={(e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    setScrollPosition(scrollTop / (scrollHeight - clientHeight));
  }}
>
  <YourContent />
</Scrollbar>

// With ref for programmatic control
const scrollbarRef = useRef<ScrollbarRef>(null);

const scrollToTop = () => {
  scrollbarRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
};

<Scrollbar ref={scrollbarRef} height={300}>
  <YourContent />
</Scrollbar>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the scrollbar thumb |
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error'` | `'primary'` | Visual variant |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Scrollbar orientation |
| `trackSize` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Size of the track background |
| `height` | `number \| string` | - | Height of the scrollable container |
| `width` | `number \| string` | - | Width of the scrollable container |
| `maxHeight` | `number \| string` | - | Maximum height of the container |
| `maxWidth` | `number \| string` | - | Maximum width of the container |
| `visibility` | `'always' \| 'hover' \| 'auto'` | `'hover'` | When to show the scrollbar |
| `smoothScrolling` | `boolean` | `true` | Enable smooth scrolling behavior |
| `disabled` | `boolean` | `false` | Whether scrolling is disabled |
| `onScroll` | `(event: UIEvent) => void` | - | Scroll event handler |
| `thumbSize` | `number` | - | Custom thumb size (0-1) |
| `scrollPosition` | `number` | - | Custom scroll position (0-1) |

## Sizes

- **Small (sm)**: 6px track, 4px thumb - ideal for compact layouts
- **Medium (md)**: 12px track, 8px thumb - standard size
- **Large (lg)**: 16px track, 12px thumb - for prominent scrolling areas

## Variants

- **Primary**: Default blue variant
- **Secondary**: Gray variant for secondary content
- **Success**: Green variant for positive content
- **Warning**: Yellow/orange variant for attention
- **Error**: Red variant for error states

## Track Sizes

- **None**: No visible track background
- **Small**: Thin track background
- **Medium**: Standard track background
- **Large**: Thick track background

## Visibility Modes

- **Always**: Scrollbar always visible
- **Hover**: Scrollbar appears on container hover
- **Auto**: Browser default behavior

## Browser Support

### WebKit Browsers (Chrome, Safari, Edge)
- Full custom styling support
- Hover effects and animations
- Custom colors and sizes

### Firefox
- Fallback to `scrollbar-width` and `scrollbar-color`
- Limited styling options but consistent theming

### Custom Implementation
- For `visibility="always"` mode
- Custom thumb and track rendering
- Full drag and drop support
- Cross-browser consistent appearance

## Accessibility

- **ARIA Support**: Proper `role="scrollbar"` and value attributes
- **Keyboard Navigation**: Standard scrolling keyboard shortcuts
- **Screen Reader**: Announces scroll position and percentage
- **Focus Management**: Proper focus handling for custom scrollbars

## Performance

- **Throttled Events**: Scroll events throttled to ~60fps
- **ResizeObserver**: Efficient content size monitoring
- **Optimized Rendering**: Minimal re-renders on scroll

## Styling Integration

The scrollbar uses the same color system as ProgressIndicator:
- Rounded corners with border-radius
- Smooth transitions and hover effects
- CSS variable integration for theming
- Consistent visual hierarchy

## Ref Methods

```tsx
interface ScrollbarRef {
  scrollTo: (position: { top?: number; left?: number; behavior?: 'auto' | 'smooth' }) => void;
  scrollIntoView: (element: Element, options?: ScrollIntoViewOptions) => void;
  getScrollPosition: () => { top: number; left: number };
}
```

## Use Cases

- **Content Areas**: Long text content or documentation
- **Data Tables**: Horizontal scrolling for wide tables
- **Code Editors**: Syntax highlighting with custom scrollbars
- **Image Galleries**: Horizontal scrolling galleries
- **Chat Windows**: Auto-scrolling message containers

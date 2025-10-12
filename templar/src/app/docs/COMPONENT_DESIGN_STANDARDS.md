# Component Design Standards

This document outlines the standardized design system properties used across all Templar components. These standards ensure consistency, maintainability, and predictable behavior throughout the component library.

## Color System

### Available Colors
- **primary** (default) - Main brand color for primary actions and emphasis
- **secondary** - Secondary brand color for supporting elements
- **success** - Green color for positive actions and success states
- **warning** - Yellow/amber color for caution and warning states
- **destructive** - Red color for dangerous or destructive actions
- **info** - Blue color for informational content and neutral actions
- **custom** - Accepts custom hex color values (e.g., "#FF5733")

### Color Foregrounds
Text and foreground elements should use the corresponding foreground color from the theme:
- `primary` color → `primaryForeground` text
- `secondary` color → `secondaryForeground` text
- `success` color → `successForeground` text
- `warning` color → `warningForeground` text
- `destructive` color → `destructiveForeground` text
- `info` color → `infoForeground` text

### CSS Variable Mapping
Colors are implemented using CSS variables for theme consistency. Each color has multiple variants for different states and usage:

#### Base Colors
```css
--background: /* Main background color */
--background-hover: /* Background hover state */
--background-accent: /* Accented background */
--background-shadow: /* Shadow color for backgrounds */
--background-disabled: /* Disabled background */
--background-border: /* Border color for backgrounds */

--foreground: /* Main text/foreground color */
--foreground-hover: /* Foreground hover state */
--foreground-accent: /* Accented foreground */
--foreground-shadow: /* Shadow color for foregrounds */
--foreground-disabled: /* Disabled foreground */
--foreground-border: /* Border color for foregrounds */
```

#### Semantic Colors
Each semantic color (primary, secondary, success, warning, destructive, info) has a complete set of variants:

```css
/* Primary Colors */
--primary: /* Base primary color */
--primary-background: /* Background when using primary */
--primary-foreground: /* Text color on primary background */
--primary-hover: /* Primary color on hover */
--primary-accent: /* Accented primary color */
--primary-shadow: /* Shadow color for primary elements */
--primary-disabled: /* Disabled primary color */
--primary-border: /* Border color for primary elements */
--primary-font: /* Font color for primary elements */

/* Secondary Colors */
--secondary: /* Base secondary color */
--secondary-background: /* Background when using secondary */
--secondary-foreground: /* Text color on secondary background */
--secondary-hover: /* Secondary color on hover */
--secondary-accent: /* Accented secondary color */
--secondary-shadow: /* Shadow color for secondary elements */
--secondary-disabled: /* Disabled secondary color */
--secondary-border: /* Border color for secondary elements */
--secondary-font: /* Font color for secondary elements */

/* Success Colors */
--success: /* Base success color */
--success-background: /* Background when using success */
--success-foreground: /* Text color on success background */
--success-hover: /* Success color on hover */
--success-accent: /* Accented success color */
--success-shadow: /* Shadow color for success elements */
--success-disabled: /* Disabled success color */
--success-border: /* Border color for success elements */
--success-font: /* Font color for success elements */

/* Warning Colors */
--warning: /* Base warning color */
--warning-background: /* Background when using warning */
--warning-foreground: /* Text color on warning background */
--warning-hover: /* Warning color on hover */
--warning-accent: /* Accented warning color */
--warning-shadow: /* Shadow color for warning elements */
--warning-disabled: /* Disabled warning color */
--warning-border: /* Border color for warning elements */
--warning-font: /* Font color for warning elements */

/* Destructive Colors */
--destructive: /* Base destructive color */
--destructive-background: /* Background when using destructive */
--destructive-foreground: /* Text color on destructive background */
--destructive-hover: /* Destructive color on hover */
--destructive-accent: /* Accented destructive color */
--destructive-shadow: /* Shadow color for destructive elements */
--destructive-disabled: /* Disabled destructive color */
--destructive-border: /* Border color for destructive elements */
--destructive-font: /* Font color for destructive elements */

/* Info Colors */
--info: /* Base info color */
--info-background: /* Background when using info */
--info-foreground: /* Text color on info background */
--info-hover: /* Info color on hover */
--info-accent: /* Accented info color */
--info-shadow: /* Shadow color for info elements */
--info-disabled: /* Disabled info color */
--info-border: /* Border color for info elements */
--info-font: /* Font color for info elements */
```

## Variant System

### Available Variants
- **solid** (default) - Filled background with contrasting foreground text
- **ghost** - Transparent background with colored text, subtle hover effects
- **outline** - Transparent background with colored border and text
- **glassmorphic** - Frosted glass appearance with backdrop blur and transparency

### Variant Behavior
- **Solid**: Uses accent color for vibrant appearance, foreground color for text, enhanced with accent hover effects
- **Ghost**: Transparent background, uses main color for text, hover adds selected color's background with transparency
- **Outline**: Transparent background, colored border and text, hover adds selected color's background fill
- **Glassmorphic**: Semi-transparent background with backdrop blur filter, includes diagonal reflection lines using selected color's hover variant, uses color-specific shadow (e.g., `primary-shadow`, `success-shadow`)

## Icon Placement

### Icon Positions
- **leading** - Icon appears before the text content
- **trailing** - Icon appears after the text content

### Icon-Only Elements
When only an icon is present (no text):
- Spacing is reduced to create a more square aspect ratio
- Padding is adjusted to maintain visual balance
- Minimum touch target of 44px × 44px is maintained for accessibility

### Implementation Guidelines
- Icons should use the same color as text content
- Icon size should scale appropriately with component size
- Maintain consistent spacing between icon and text (typically 8px)

## Shape System

### Available Shapes
- **sharp** - No border radius (0px)
- **round** (default) - Standard border radius (12px)
- **pill** - Fully rounded borders (50% or large radius value)

### Shape Implementation
```css
/* Sharp */
border-radius: 0;

/* Round (default) */
border-radius: 12px;

/* Pill */
border-radius: 9999px; /* Large value for full rounding */
```

### Usage Guidelines
- **Sharp**: Modern, minimal designs; data tables, cards in dense layouts
- **Round**: Default for most UI elements; buttons, inputs, cards
- **Pill**: Tags, badges, toggle elements, status indicators

## Status System

### Available Status States
- **loading** - Shows loading indicator, disables interaction
- **disabled** - Reduces opacity, prevents interaction, shows disabled cursor

### Status Implementation
- **Loading**: 
  - Shows spinner or loading indicator
  - Maintains original dimensions
  - Disables click handlers
  - Prevents form submission
- **Disabled**:
  - Reduces opacity to 0.5
  - Sets `cursor: not-allowed`
  - Disables all interactions
  - Removes from keyboard navigation flow

### Accessibility Considerations
- Loading states should announce changes to screen readers
- Disabled elements should have appropriate ARIA attributes
- Focus should be managed appropriately during status changes

## Size System

### Available Sizes
- **xs** - Extra small (40px height, 82px min-width)
- **sm** - Small (40px height, 82px min-width) - *Primary use*
- **md** - Medium (48px height, 112px min-width) - *Primary use* (default)
- **lg** - Large (52px height, 112px min-width) - *Primary use*
- **xl** - Extra large (60px height, 142px min-width)

### Size Guidelines
Most components should primarily use **sm**, **md**, and **lg** sizes for consistency and optimal user experience.

### Size Specifications

#### Height Values
```css
/* xs */ height: 40px;
/* sm */ height: 40px;
/* md */ height: 48px; /* Default */
/* lg */ height: 52px;
/* xl */ height: 60px;
```

#### Minimum Width Values
```css
/* xs */ min-width: 82px;
/* sm */ min-width: 82px;
/* md */ min-width: 112px;
/* lg */ min-width: 112px;
/* xl */ min-width: 142px;
```

#### Font Size Scaling
```css
/* xs */ font-size: 14px;
/* sm */ font-size: 14px;
/* md */ font-size: 16px;
/* lg */ font-size: 16px;
/* xl */ font-size: 18px;
```

#### Padding Scaling
Horizontal padding scales with size to maintain proportions:
- **xs/sm**: 12px horizontal padding
- **md**: 16px horizontal padding  
- **lg**: 20px horizontal padding
- **xl**: 24px horizontal padding

## Implementation Standards

### TypeScript Types
All components should define their props using TypeScript with these standardized types:

```typescript
export type ComponentColor = 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'info' | 'custom';
export type ComponentVariant = 'solid' | 'ghost' | 'outline' | 'gradient' | 'glassmorphic' | 'isomorphic';
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ComponentShape = 'sharp' | 'round' | 'pill';
export type ComponentAnimationMode = 'none' | 'default' | 'parallax' | 'typewriter';
export type IconPlacement = 'leading' | 'trailing';

export interface StandardComponentProps {
  color?: ComponentColor;
  customColor?: string; // Used when color="custom"
  variant?: ComponentVariant;
  size?: ComponentSize;
  shape?: ComponentShape;
  iconPlacement?: IconPlacement;
  loading?: boolean;
  disabled?: boolean;
  animate?: boolean;
  animationMode?: ComponentAnimationMode;
}
```

### CSS Variables Usage
Always use CSS variables for colors to ensure theme compatibility:
```css
background-color: var(--primary);
color: var(--primary-foreground);
border-color: var(--border);
```

### Spacing System
Use the 4px spacing system consistently:
- 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px

### Accessibility Requirements
- Maintain WCAG AA contrast ratios
- Ensure minimum 44px touch targets
- Provide appropriate ARIA labels and states
- Support keyboard navigation
- Announce state changes to screen readers

## Component-Specific Considerations

### Buttons
- Default: `color="primary"`, `variant="solid"`, `size="md"`, `shape="round"`, `animationMode="default"`
- Support all color, variant, size, shape, and animation mode options
- Icon-only buttons use square aspect ratio

#### Color Implementation
- **Solid Variant**: Uses `accent` color for vibrant appearance, fallback to `main` color
- **Color-specific Hover**: Each variant uses the selected color's hover properties (e.g., `success-hover`, `warning-hover`)
- **Glassmorphic Shadows**: Automatically uses color-specific shadows (e.g., `primary-shadow`, `destructive-shadow`)

#### Animation Modes Usage
- **`default`**: Standard hover effects and transitions
- **`parallax`**: Premium/marketing buttons with 3D tilt and glare effects
- **`typewriter`**: Call-to-action elements with continuous typing animation
- **`isometric`**: Interactive buttons with realistic 3D press feedback
- **`none`**: Data-heavy interfaces or accessibility-focused designs

#### Variant-Animation Compatibility
- **All Variants**: Support `default`, `parallax`, `typewriter`, and `none` animations
- **Isometric Animation**: Only supports `solid` and `outline` variants
- **Ghost + Isometric**: Maintains default ghost hover effects (background color change)
- **Glassmorphic + Isometric**: Maintains default glassmorphic effects (no isometric styling applied)
- **Parallax + Glassmorphic**: Special shadow preservation system maintains glassmorphic shadows during 3D tilt

### Form Inputs
- Default: `size="md"`, `shape="round"`
- Focus states use primary color
- Error states use destructive color

### Cards and Containers
- Default: `shape="round"`
- Background uses muted color variables
- Borders use border color variables

### Status Indicators (Badges, Tags)
- Default: `shape="pill"`, `size="sm"`
- Use appropriate semantic colors for status

## Animation System

### Animation Principles
Templar components use consistent animation patterns to create smooth, delightful user experiences while maintaining performance and accessibility.

### Animation Modes
Components can use different animation modes through the `animationMode` prop, providing varied interactive experiences while maintaining consistent behavior patterns.

#### Available Animation Modes
- **none** - Disables all animations for the component
- **default** - Standard CSS transitions and hover effects (default behavior)
- **parallax** - Interactive 3D parallax tilt effect with glare lighting
- **typewriter** - Continuous typewriter text effect with typing, waiting, and deletion cycles
- **isometric** - 3D button press effect with large bottom border and bouncy animation

#### Animation Mode Implementation
```typescript
// Animation mode type definition
export type UniversalAnimationMode = 'none' | 'default' | 'parallax' | 'typewriter' | 'isometric';

// Usage in components
interface ComponentProps {
  animate?: boolean;           // Master animation toggle
  animationMode?: UniversalAnimationMode; // Specific animation style
}
```

#### Animation Mode Behaviors

##### Default Mode
```typescript
<Button animationMode="default">Standard Button</Button>
```
- CSS transition-based animations
- Hover state changes (opacity, background color)
- Focus ring animations
- Loading spinner transitions
- Compatible with all variants and shapes

##### Parallax Mode  
```typescript
<Button animationMode="parallax">3D Tilt Button</Button>
```
- Interactive 3D tilt following mouse movement
- Dynamic glare effect with realistic lighting
- Enhanced scale and perspective transforms
- Automatically inherits button shape (round, pill, sharp)
- Disabled interaction during loading/disabled states
- **Glassmorphic Shadow Preservation**: Special handling to preserve glassmorphic shadows by moving them to the parallax wrapper

**Technical Specifications:**
- Tilt angles: ±15° on both X and Y axes
- Scale factor: 1.05x on interaction
- Glare opacity: 30% maximum
- Transition speed: 300ms
- Reverse tilt direction for enhanced feel

##### Typewriter Mode
```typescript
<Button animationMode="typewriter">Type Me</Button>
```
- Continuous typing animation cycle
- Types text character by character (100ms per character)
- Random wait period between 6-8 seconds
- Deletes text with faster speed (50ms per character)  
- Includes blinking cursor effect
- Preserves hover effects alongside text animation

**Animation Cycle:**
1. **Typing Phase**: Types each character sequentially
2. **Waiting Phase**: Random 6-8 second pause with blinking cursor
3. **Deleting Phase**: Removes characters in reverse order
4. **Loop**: Restarts cycle automatically

##### Isometric Mode
```typescript
<Button animationMode="isometric">3D Press Button</Button>
```
- Large 6px bottom border using foreground color (solid) or main color (outline)
- Bouncy button press animation: `translateY(3px)` with border reduction to 3px
- Spring-based easing with `cubic-bezier(0.34, 1.56, 0.64, 1)`
- **Variant Support**: Only works with `solid` and `outline` variants
- **Excluded Variants**: `ghost` and `glassmorphic` maintain default hover effects instead
- **Border Color Logic**:
  - **Solid**: All borders use foreground color for unified appearance
  - **Outline**: Bottom border uses main color, side borders remain unchanged

**Technical Specifications:**
- Rest state: `translateY(0)` with 6px bottom border
- Press state: `translateY(3px)` with 3px bottom border
- Transition: 0.4s spring easing
- Box-sizing: `border-box` with relative positioning

##### None Mode
```typescript
<Button animationMode="none">Static Button</Button>
```
- Completely disables all animations
- Instant state changes
- No transitions or effects
- Optimal for reduced-motion preferences
- Performance-focused implementation

### Timing and Easing

#### Standard Durations
- **Fast**: 0.2s - For quick state changes (text color, font weight)
- **Medium**: 0.4s - For most transitions (transforms, background colors, opacity)
- **Slow**: 0.6s+ - Reserved for complex animations or page transitions

#### Easing Functions

##### Primary Easing (Spring)
```css
cubic-bezier(0.34, 1.56, 0.64, 1)
```
- **Usage**: Main interactive elements (Toggle bubble, SegmentedControl indicator)
- **Effect**: Playful bounce that overshoots slightly before settling
- **Best for**: State changes that need to feel responsive and engaging

##### Secondary Easing (Smooth)
```css
ease-in-out
```
- **Usage**: Subtle transitions (text color changes, font weight)
- **Effect**: Smooth acceleration and deceleration
- **Best for**: Text and subtle property changes

### Animation Patterns

#### Toggle Component
```css
/* Background transition */
transition: background-color 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), 
            opacity 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

/* Bubble movement */
transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
transform: translateX(0) scale(1); /* or translateX(Xpx) scale(1) when checked */
```

#### SegmentedControl Component  
```css
/* Indicator sliding */
transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
transform: translateX(X%); /* Based on selected index */

/* Text state changes */
transition: color 0.2s ease-in-out, font-weight 0.2s ease-in-out;
```

### Animation Properties

#### Commonly Animated Properties
- **transform**: translateX, translateY, scale, rotate
- **opacity**: Fade in/out effects
- **background-color**: State changes
- **color**: Text color transitions
- **font-weight**: Emphasis changes
- **box-shadow**: Focus states and elevation

#### Performance Considerations
- Prefer `transform` and `opacity` for best performance
- Use `will-change` property sparingly for complex animations
- Avoid animating layout properties (width, height, padding, margin)

### Focus and Interaction States

#### Focus Animations
```css
/* Standard focus outline */
outline: 2px solid var(--primary);
outline-offset: 2px;
box-shadow: 0 0 0 2px rgba(primary, 0.2);
transition: outline 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
```

#### Hover States
- Use subtle opacity or color changes
- Duration: 0.2s with ease-in-out
- Avoid dramatic movements that could be jarring

### Accessibility Considerations

#### Reduced Motion Support
Always respect user preferences for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

#### Screen Reader Compatibility
- Ensure animations don't interfere with screen reader announcements
- Use `aria-live` regions for dynamic content changes
- Don't rely solely on animation to convey important information

### Implementation Guidelines

#### CSS Variables for Consistency
Define animation values as CSS variables when used across multiple components:

```css
:root {
  --animation-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --animation-smooth: ease-in-out;
  --duration-fast: 0.2s;
  --duration-medium: 0.4s;
  --duration-slow: 0.6s;
}
```

#### Component-Specific Patterns

##### Toggle-Style Components
- Use spring easing for main state transitions
- 0.4s duration for position and background changes
- Include scale transforms for micro-interactions

##### Selection Components (Tabs, SegmentedControl)
- Sliding indicators with spring easing
- Fast text transitions (0.2s) for immediate feedback
- Medium duration (0.4s) for indicator movement

##### Modal and Overlay Components
- Fade-in with opacity transitions
- Slide or scale transforms for entrance
- Backdrop blur animations when supported

This animation system ensures consistency across all Templar components while providing flexibility for various use cases and maintaining excellent accessibility standards.

## Advanced Button Architecture

### CSS Property Consistency
The button system uses non-shorthand CSS properties throughout to prevent React property conflicts:

```css
/* Non-shorthand border properties */
borderTopWidth: '1px',
borderRightWidth: '1px', 
borderBottomWidth: '1px',
borderLeftWidth: '1px',
borderTopStyle: 'solid',
borderRightStyle: 'solid',
borderBottomStyle: 'solid',
borderLeftStyle: 'solid',
borderTopColor: colors.main,
borderRightColor: colors.main,
borderLeftColor: colors.main,
borderBottomColor: colors.main
```

**Rationale**: Prevents React warnings when mixing shorthand (`borderColor`) with non-shorthand (`borderBottomWidth`) properties during animation state changes.

### Glassmorphic Glass Reflection System
Glassmorphic variant includes realistic glass reflection effects:

```css
/* Dual-layer reflection gradients */
topReflectionGradient: linear-gradient(135deg, transparent 0%, ${color}20 20%, ${color}15 25%, transparent 35%)
bottomReflectionGradient: linear-gradient(135deg, transparent 45%, ${color}25 55%, ${color}20 65%, transparent 80%)

/* Layered background */
background: `
  ${topReflectionGradient},
  ${bottomReflectionGradient},
  rgba(255, 255, 255, 0.1)
`
```

**Features**:
- **Two diagonal reflection lines** traveling from top-right to bottom-left
- **Dynamic color adaptation** using selected color's hover variant
- **Realistic glass physics** with varying opacity and thickness
- **Enhanced on hover** with increased reflection intensity

### Parallax-Glassmorphic Shadow Preservation
Special handling ensures glassmorphic shadows remain visible during parallax tilt:

```typescript
// Shadow detection and preservation
const shouldPreserveShadow = childBoxShadow.includes('32px') || childBoxShadow.includes('40px');

// Conditional overflow handling
overflow: shouldPreserveShadow ? 'visible' : 'hidden',
boxShadow: shouldPreserveShadow ? childBoxShadow : 'none',

// Remove shadow from child to prevent duplication
{shouldPreserveShadow && isValidElement(children) 
  ? cloneElement(children, { style: { ...children.props.style, boxShadow: 'none' } })
  : children
}
```

**Technical Solution**:
1. **Detects glassmorphic shadows** by signature shadow dimensions
2. **Transfers shadow to wrapper** to prevent overflow clipping
3. **Removes duplicate shadow** from child element
4. **Maintains all other styling** without interference

### Multi-Animation Architecture
The system supports future multiple animation selection through extensible types:

```typescript
// Current single animation
animationMode?: UniversalAnimationMode;

// Future multiple animations
animationModes?: UniversalAnimationModes; // Array of animation modes
```

**Implementation Notes**:
- **Priority-based execution**: Isometric animation takes precedence over default variant hover effects
- **Variant-aware logic**: Ghost and glassmorphic maintain their characteristics even with unsupported animations
- **Graceful fallbacks**: Unsupported animation-variant combinations default to appropriate behavior
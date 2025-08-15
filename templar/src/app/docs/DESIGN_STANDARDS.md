# Templar Design Standards

## Overview

This document defines the universal templating standards for the Templar component library. These standards ensure consistency, accessibility, and maintainability across all components in the atomic design system.

---

## 1. Sizing Standards

### Size Scale
All components must use the following standardized size scale:

| Size | Usage | Height | Min Width | Padding | Font Size |
|------|-------|--------|-----------|---------|-----------|
| `xs` | Extra small elements | 40px | 82px | 4px 8px | 14px |
| `sm` | Small elements | 40px | 82px | 6px 12px | 16px |
| `md` | Default/medium elements | 48px | 112px | 8px 16px | 18px |
| `lg` | Large elements | 52px | 112px | 10px 20px | 20px |
| `xl` | Extra large elements | 60px | 142px | 12px 24px | 22px |

### Implementation Rules
- Components **must** use sizes from this scale only
- Components **do not** have to implement all sizes
- Icon sizes should scale appropriately with component sizes
- Minimum touch target of 40px for xs/sm, scaling up appropriately
- Consistent minimum widths ensure visual balance

### Icon Size Mapping
Icons should scale with their container component using this mapping:
```typescript
const iconSizeMap = {
  xs: 'sm', // 16px icon in 40px button
  sm: 'sm', // 16px icon in 40px button  
  md: 'md', // 20px icon in 48px button
  lg: 'md', // 20px icon in 52px button
  xl: 'lg'  // 24px icon in 60px button
};
```

### Icon Spacing Standards
Icon spacing should be responsive to button size:
```typescript
const iconSpacing = {
  xs: '2px',
  sm: '3px', 
  md: '4px',
  lg: '5px',
  xl: '6px'
};
```

---

## 2. Theming Standards

### Core Variants
All interactive components should implement these core variants:

#### a. **Primary**
- Background: `--primary`
- Foreground: `--primary-foreground`
- Hover: `--primary-hover`
- Usage: Main call-to-action elements

#### b. **Secondary**
- Background: `--secondary`
- Foreground: `--secondary-foreground`
- Hover: `--secondary-hover`
- Usage: Secondary actions, complementary elements

#### c. **Outline**
- Background: `transparent`
- Foreground: `--primary`
- Border: `1px solid --primary`
- Hover: Handled by component-specific hover logic
- Usage: Secondary actions with emphasis

#### d. **Ghost**
- Background: `transparent`
- Foreground: `--primary`
- Border: `none` (borderWidth: '0')
- Hover: Handled by component-specific hover logic
- Usage: Minimal visual weight actions

### Additional Semantic Variants
Components may implement additional semantic variants:

#### **Destructive**
- Background: `--error`
- Foreground: `--error-foreground`
- Usage: Dangerous or irreversible actions

#### **Success**
- Background: `--success`
- Foreground: `--success-foreground`
- Usage: Positive confirmation actions

#### **Warning**
- Background: `--warning`
- Foreground: `--warning-foreground`
- Usage: Cautionary actions

### Advanced Component Features
Interactive components should support these advanced patterns:

#### **Loading States**
- Async operation support with `onAsyncClick` handlers
- Loading key integration with global loading provider
- Spinner replacement during loading states
- Proper spinner sizing based on component size

#### **Icon Integration**
- Support for leading and trailing icon positions
- Responsive icon spacing based on component size
- Automatic icon size mapping to component size
- Proper icon rendering with React.cloneElement for flexibility

#### **Hover Management**
- Custom hover handlers for enhanced interactivity
- Variant-aware hover states
- Animation-aware hover transitions
- Disabled state hover prevention

### Theme Integration Rules
- Always use CSS variables from the theme system
- Never hardcode color values
- Support all available themes (light, dark, high-contrast, sepia, sepia-dark, solarized-dark)
- Respect user accessibility preferences

---

## 3. Styling Standards

### Border Radius
- **Standard elements**: `8px` border radius
- **Rounded elements**: `24px` border radius (when `rounded` prop is true)
- **Fully rounded**: `50%` for circular elements (avatars, badges)

### Spacing System
All spacing must be divisible by **4px**:
- 4px, 8px, 12px, 16px, 20px, 24px, 28px, 32px, etc.
- Use these values for: padding, margins, gaps, positioning

### Component Behavior Standards

#### **Memoization and Performance**
- Use `useMemo` for computed styles to prevent unnecessary recalculations
- Separate base styles, variant styles, and size styles for optimal caching
- Memoize expensive computations based on their dependencies

#### **Event Handling Patterns**
- Support both sync and async operations
- Provide loading state management for async operations
- Use custom hooks for complex event handling logic
- Maintain proper event delegation and accessibility

#### **Provider Integration**
- Always integrate with `useCSSVariables` for theming
- Respect `useSettings` for user preferences (animations, etc.)
- Integrate with global loading states when applicable
- Support theme switching without component remounting

#### **State Management**
- Use computed values for derived state
- Properly handle disabled states across all interactions
- Maintain consistent loading state behavior
- Support controlled and uncontrolled patterns where applicable

### Typography Standards
- **Font weight**: 500 (medium) for button text and important elements
- **Font family**: `inherit` to respect application typography
- **Font sizes**: Must follow the standardized size scale
- **Text rendering**: Ensure proper vertical alignment with `verticalAlign: 'top'`
- **User selection**: Disable text selection on interactive elements with `userSelect: 'none'`

### Visual Hierarchy
- **Elevation**: Use `--shadow-sm`, `--shadow`, `--shadow-md`, `--shadow-lg`
- **Borders**: Use `--border` and `--border-hover`
- **Typography**: Follow size scale for consistent text sizing
- **Focus states**: Always provide clear focus indicators using `outline: 'none'` with custom focus management
- **Elevation**: Use `--shadow-sm`, `--shadow`, `--shadow-md`, `--shadow-lg`
- **Borders**: Use `--border` and `--border-hover`
- **Typography**: Follow size scale for consistent text sizing
- **Focus states**: Always provide clear focus indicators

### Animation Standards
- **Transition duration**: 200ms (0.2s)
- **Easing**: `ease` for smooth interactions
- **Property**: `all` for comprehensive state changes
- **Respect user preferences**: Check `useSettings().appearance.animations`
- **Conditional animations**: Components should gracefully disable animations when `animationsEnabled: false`

### Disabled States
- **Opacity**: 0.6 for disabled elements
- **Cursor**: `not-allowed` for disabled interactive elements  
- **Pointer events**: `none` to prevent interaction
- **Loading states**: Use spinners for async operations

---

## 4. Measurement Standards

### Unit Requirements
- **Always use `px` measurements** for:
  - Font sizes
  - Padding and margins
  - Border radius
  - Box shadows
  - Heights and widths
- **Avoid relative units** except for:
  - Percentages for layout (width: 100%)
  - Em/rem only in exceptional cases with strong justification

### Responsive Considerations
- Components should work at all supported sizes
- Maintain readability at all zoom levels
- Ensure touch targets meet accessibility guidelines

---

## 5. File Structure Standards

Each atomic component must follow this exact structure:

```
ComponentName/
├── ComponentName.tsx          # Main component file
├── ComponentName.types.ts     # TypeScript interfaces
├── ComponentName.styles.ts    # Styling logic and utilities  
├── ComponentName.utils.tsx    # Component-specific utilities
├── README.md                 # Component documentation
├── index.ts                  # Export barrel
└── hooks/                    # Component-specific hooks (optional)
    ├── index.ts              # Hook exports
    ├── useComponentName.ts   # Primary component hook
    └── useComponentFeature.ts # Feature-specific hooks
```

### Advanced Structure Notes
- **Hooks folder**: Optional but recommended for complex components
- **Custom hooks**: Should handle specific component behaviors (async operations, hover states, etc.)
- **Utils separation**: Keep rendering utilities separate from business logic
- **Type safety**: All files should have complete TypeScript coverage

### File Content Standards

#### ComponentName.tsx
```typescript
'use client';

import React, { forwardRef } from 'react';
import { useCSSVariables, useSettings } from '../../providers';
import type { ComponentNameProps } from './ComponentName.types';
import { createBaseStyles, getVariantStyles, getSizeStyles } from './ComponentName.styles';

export const ComponentName = forwardRef<HTMLElement, ComponentNameProps>(
  ({ 
    variant = 'primary',
    size = 'md', 
    className,
    children,
    ...props 
  }, ref) => {
    const cssVars = useCSSVariables();
    const { settings } = useSettings();
    
    const styles = {
      ...createBaseStyles(/* params */),
      ...getVariantStyles(variant, cssVars),
      ...getSizeStyles(size),
    };

    return (
      <element
        ref={ref}
        style={styles}
        className={className}
        {...props}
      >
        {children}
      </element>
    );
  }
);

ComponentName.displayName = 'ComponentName';
```

#### ComponentName.types.ts
```typescript
import React from 'react';

export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ComponentVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';

export interface ComponentNameProps {
  // Core props
  variant?: ComponentVariant;
  size?: ComponentSize;
  
  // Behavioral props
  disabled?: boolean;
  fullWidth?: boolean;
  rounded?: boolean;
  
  // Content props
  children?: React.ReactNode;
  
  // HTML props
  className?: string;
  
  // Additional specific props
}
```

#### ComponentName.styles.ts
```typescript
import React from 'react';
import type { ComponentVariant, ComponentSize } from './ComponentName.types';

export const getVariantStyles = (variant: ComponentVariant, cssVars: any): React.CSSProperties => {
  const baseStyles = {
    borderWidth: '0',
    borderStyle: 'solid' as const,
    borderColor: 'transparent',
  };

  switch (variant) {
    case 'primary':
      return {
        backgroundColor: cssVars.primary,
        color: cssVars.primaryForeground,
        ...baseStyles,
      };
    case 'secondary':
      return {
        backgroundColor: cssVars.secondary,
        color: cssVars.secondaryForeground,
        ...baseStyles,
      };
    case 'outline':
      return {
        backgroundColor: 'transparent',
        color: cssVars.primary,
        borderWidth: '1px',
        borderStyle: 'solid' as const,
        borderColor: cssVars.primary,
      };
    case 'ghost':
      return {
        backgroundColor: 'transparent',
        color: cssVars.primary,
        ...baseStyles,
      };
    default:
      return {
        backgroundColor: cssVars.primary,
        color: cssVars.primaryForeground,
        ...baseStyles,
      };
  }
};

export const getSizeStyles = (size: ComponentSize): React.CSSProperties => {
  const sizeMap = {
    xs: { padding: '4px 8px', fontSize: '14px', minWidth: '82px', height: '40px' },
    sm: { padding: '6px 12px', fontSize: '16px', minWidth: '82px', height: '40px' },
    md: { padding: '8px 16px', fontSize: '18px', minWidth: '112px', height: '48px' },
    lg: { padding: '10px 20px', fontSize: '20px', minWidth: '112px', height: '52px' },
    xl: { padding: '12px 24px', fontSize: '22px', minWidth: '142px', height: '60px' },
  };
  return sizeMap[size];
};

export const createBaseStyles = (
  fullWidth: boolean,
  isDisabled: boolean,
  hasIcon: boolean,
  rounded: boolean,
  animationsEnabled: boolean
): React.CSSProperties => ({
  width: fullWidth ? '100%' : 'auto',
  opacity: isDisabled ? 0.6 : 1,
  cursor: isDisabled ? 'not-allowed' : 'pointer',
  pointerEvents: isDisabled ? 'none' : 'auto',
  transition: animationsEnabled ? 'all 0.2s ease' : 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'top',
  borderRadius: rounded ? '24px' : '8px',
  fontWeight: '500',
  outline: 'none',
  position: 'relative',
  fontFamily: 'inherit',
  userSelect: 'none',
});
```

---

## 6. Accessibility Standards

### Required Features
- **Keyboard navigation**: All interactive elements must be keyboard accessible
- **Screen reader support**: Proper ARIA labels and roles
- **Focus management**: Clear focus indicators and logical tab order
- **Color contrast**: Meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
- **Touch targets**: Minimum 44px for touch interfaces

### Implementation Requirements
- Use semantic HTML elements when possible
- Provide meaningful alt text for images
- Support high contrast themes
- Respect user motion preferences
- Test with screen readers

---

## 7. Performance Standards

### Code Quality
- **Tree-shakeable**: Components should be importable individually
- **Type-safe**: Full TypeScript support with strict types
- **Memoized**: Use React.memo for pure components
- **Minimal dependencies**: Avoid unnecessary external dependencies

### Bundle Optimization
- Keep component bundle size minimal
- Use CSS-in-JS efficiently with the theme system
- Avoid inline styles when possible (use CSS variables)
- Optimize for production builds

---

## 8. Testing Standards

### Required Testing
- **Unit tests**: Test component logic and rendering
- **Accessibility tests**: Automated a11y testing
- **Visual regression**: Prevent UI regressions
- **Type checking**: Ensure TypeScript compliance

### Testing Files
```
ComponentName/
├── __tests__/
│   ├── ComponentName.test.tsx
│   ├── ComponentName.accessibility.test.tsx
│   └── ComponentName.visual.test.tsx
```

---

## 9. Documentation Standards

### README.md Requirements
Each component must include:
- Purpose and use cases
- Props documentation with examples
- Variant demonstrations
- Accessibility considerations  
- Common usage patterns
- Do's and Don'ts

### Code Comments
- Document complex logic
- Explain accessibility considerations
- Note browser compatibility issues
- Reference design decisions

---

## 10. Version Control Standards

### Commit Messages
Follow conventional commits:
- `feat(Button): add rounded variant`
- `fix(Button): correct focus outline in high contrast`
- `docs(Button): update accessibility guidelines`

### Breaking Changes
- Always document breaking changes
- Provide migration guides
- Use semantic versioning
- Deprecate before removal

---

## Compliance Checklist

Before submitting a component, verify:

- [ ] Uses standard size scale (xs, sm, md, lg, xl)
- [ ] Implements core theming variants (primary, secondary, outline, ghost)
- [ ] Uses CSS variables exclusively for colors
- [ ] Follows 4px spacing system
- [ ] Uses px measurements throughout
- [ ] Implements proper file structure
- [ ] Includes TypeScript interfaces
- [ ] Meets accessibility standards
- [ ] Provides comprehensive documentation
- [ ] Passes all tests
- [ ] Supports all available themes
- [ ] Respects user preferences (animations, motion)
- [ ] Maintains consistent visual hierarchy
- [ ] Uses appropriate focus indicators

---

## Related Documentation

- [Implementation Guide](./IMPLEMENTATION_GUIDE.md)
- [CSS Variables Reference](./CSS_VARIABLES.md)
- [Atomic Components PRD](./ATOMIC_COMPONENTS_PRD.md)
- [Implementation Summary](./IMPLEMENTATION_SUMMARY.md)

---

*This document is a living standard and should be updated as the design system evolves.*

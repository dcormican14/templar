# Templar Design System - Element Library Overview

> **Comprehensive guide to all atomic components and molecules in the Templar design system**

This document serves as a complete reference for developers using the Templar design system, detailing every available component, their props, and usage patterns.

## Table of Contents

- [Universal Props System](#universal-props-system)
- [Atomic Components](#atomic-components)
- [Molecule Components](#molecule-components)
- [Design Patterns](#design-patterns)
- [Quick Reference](#quick-reference)

---

## Universal Props System

All atomic components in Templar inherit from a comprehensive universal props system that ensures consistency across the library.

### Universal Types

```typescript
type UniversalColor = 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'info' | 'custom';
type UniversalVariant = 'solid' | 'ghost' | 'outline';
type UniversalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type UniversalShape = 'sharp' | 'round' | 'pill';
```

### Base Universal Props

Every atomic component includes these props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `UniversalColor` | `'primary'` | Color theme variant |
| `customColor` | `string` | - | Custom color when color='custom' |
| `variant` | `UniversalVariant` | `'solid'` | Visual variant style |
| `shape` | `UniversalShape` | `'round'` | Border radius style |
| `size` | `UniversalSize` | `'md'` | Component size |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Loading state |
| `loadingKey` | `string` | - | Global loading state key |
| `width` | `string \| number` | - | Custom width |
| `height` | `string \| number` | - | Custom height |
| `className` | `string` | - | Additional CSS classes |
| `style` | `React.CSSProperties` | - | Inline styles |
| `id` | `string` | - | DOM element ID |
| `data-testid` | `string` | - | Test identifier |
| `animate` | `boolean` | `true` | Enable animations |
| `animationDuration` | `number` | - | Custom animation duration |

Plus standard ARIA attributes for accessibility.

---

## Atomic Components

### Badge
**Path:** `@/components/atoms/Badge`  
**Extends:** Universal Props + Container Props

A versatile label component for status indicators, tags, and notifications.

**Component-Specific Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `React.ReactNode` | - | Icon to display |
| `iconPosition` | `'leading' \| 'trailing'` | `'leading'` | Icon placement |
| `removable` | `boolean` | `false` | Show remove button |
| `onRemove` | `() => void` | - | Remove button callback |

**Usage:**
```tsx
<Badge color="success" removable onRemove={() => console.log('removed')}>
  Active
</Badge>
<Badge icon={<CheckIcon />} color="primary">
  Verified
</Badge>
```

---

### Button
**Path:** `@/components/atoms/Button`  
**Extends:** Universal Props + Interactive Props + ButtonHTMLAttributes

Primary interactive element for user actions.

**Component-Specific Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `React.ReactNode` | - | Icon to display |
| `iconPosition` | `'leading' \| 'trailing'` | `'leading'` | Icon placement |
| `onAsyncClick` | `() => Promise<void>` | - | Async click handler with loading |

**Usage:**
```tsx
<Button variant="solid" color="primary" onClick={handleClick}>
  Save Changes
</Button>
<Button icon={<PlusIcon />} variant="outline" onAsyncClick={handleAsyncSave}>
  Create New
</Button>
```

---

### Card
**Path:** `@/components/atoms/Card`  
**Extends:** Universal Props + Container Props + HTMLDivAttributes

Container component for grouping related content.

**Component-Specific Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `header` | `React.ReactNode` | - | Header content |
| `footer` | `React.ReactNode` | - | Footer content |

**Usage:**
```tsx
<Card header={<h3>Card Title</h3>} footer={<Button>Action</Button>}>
  <p>Card content goes here</p>
</Card>
```

---

### CheckBox
**Path:** `@/components/atoms/CheckBox`  
**Extends:** Universal Props + Form Props + InputHTMLAttributes

Boolean input component with support for indeterminate state.

**Component-Specific Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | - | Controlled state |
| `defaultChecked` | `boolean` | `false` | Uncontrolled default |
| `indeterminate` | `boolean` | - | Indeterminate state |
| `description` | `string` | - | Description below label |
| `contentToggleable` | `boolean` | `true` | Click label to toggle |
| `onChange` | `(checked: boolean, event: React.ChangeEvent) => void` | - | Change handler |

**Usage:**
```tsx
<CheckBox label="Accept terms" required />
<CheckBox 
  label="Select all" 
  indeterminate={someSelected} 
  checked={allSelected}
  onChange={(checked) => setAllSelected(checked)}
/>
```

---

### CodeBlock
**Path:** `@/components/atoms/CodeBlock`  
**Extends:** Universal Props + Container Props + HTMLElementAttributes

Syntax-highlighted code display with copy functionality.

**Component-Specific Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `language` | `string` | - | Programming language |
| `copyable` | `boolean` | `false` | Show copy button |
| `lineNumbers` | `boolean` | `false` | Show line numbers |
| `highlight` | `number \| number[]` | - | Lines to highlight |
| `syntaxHighlighting` | `boolean` | `true` | Enable syntax highlighting |
| `onCopy` | `(content: string) => void` | - | Copy callback |
| `children` | `string \| React.ReactNode` | **Required** | Code content |

**Usage:**
```tsx
<CodeBlock language="javascript" copyable lineNumbers>
{`function hello() {
  console.log("Hello, world!");
}`}
</CodeBlock>
```

---

### Divider
**Path:** `@/components/atoms/Divider`  
**Extends:** Universal Props + Container Props + HTMLDivAttributes

Visual separator with optional labels and styling variants.

**Component-Specific Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Divider orientation |
| `spacing` | `'none' \| UniversalSize` | `'md'` | Spacing around divider |
| `fullSize` | `boolean` | `true` | Take full width/height |
| `label` | `React.ReactNode` | - | Center label |
| `labelPosition` | `'start' \| 'center' \| 'end'` | `'center'` | Label position |
| `subtle` | `boolean` | `false` | Reduced opacity |
| `dashed` | `boolean` | `false` | Dashed line style |
| `dotted` | `boolean` | `false` | Dotted line style |
| `color` | `UniversalColor \| 'muted'` | `'muted'` | Divider color |

**Usage:**
```tsx
<Divider />
<Divider label="OR" />
<Divider orientation="vertical" height="100px" />
<Divider dashed color="primary" />
```

---

### Dropdown
**Path:** `@/components/atoms/Dropdown`  
**Extends:** Universal Props + Form Props + HTMLDivAttributes

Advanced select component with search, grouping, and multiple selection.

**Types:**
```typescript
interface DropdownOption {
  value: string | number;
  label: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: string;
  divider?: boolean;
}

interface DropdownGroup {
  label?: string;
  options: DropdownOption[];
}
```

**Component-Specific Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `(DropdownOption \| DropdownGroup)[]` | **Required** | Dropdown options |
| `value` | `string \| number \| (string \| number)[]` | - | Selected value(s) |
| `multiple` | `boolean` | `false` | Multiple selection |
| `searchable` | `boolean` | `false` | Enable search |
| `searchPlaceholder` | `string` | `'Search...'` | Search placeholder |
| `position` | `'bottom-start' \| 'bottom-end' \| 'top-start' \| 'top-end' \| 'left' \| 'right'` | `'bottom-start'` | Menu position |
| `closeOnSelect` | `boolean` | `true` | Close on selection |
| `maxHeight` | `string` | `'300px'` | Max menu height |
| `trigger` | `React.ReactNode` | - | Custom trigger |
| `portal` | `boolean` | `false` | Use portals |
| `open` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | Open state callback |
| `onChange` | `(value: string \| number \| (string \| number)[]) => void` | - | Change handler |

**Usage:**
```tsx
<Dropdown
  options={[
    { value: '1', label: 'Option 1', icon: <CheckIcon /> },
    { value: '2', label: 'Option 2', description: 'With description' }
  ]}
  placeholder="Select option..."
  onChange={(value) => console.log(value)}
/>

// With groups and search
<Dropdown
  searchable
  multiple
  options={[
    {
      label: 'Group 1',
      options: [
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B' }
      ]
    }
  ]}
/>
```

---

### FilePicker
**Path:** `@/components/atoms/FilePicker`  
**Extends:** Universal Props + Form Props

Drag-and-drop file upload component with validation.

**Component-Specific Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `accept` | `string` | - | File types (e.g., "image/*") |
| `multiple` | `boolean` | `false` | Multiple files |
| `maxSize` | `number` | - | Max file size (bytes) |
| `maxFiles` | `number` | - | Max file count |
| `uploadText` | `string` | - | Custom upload text |
| `subText` | `string` | - | Subtitle text |
| `icon` | `React.ReactNode` | - | Custom upload icon |
| `files` | `File[]` | - | Controlled files |
| `showFileList` | `boolean` | `true` | Show file list |
| `onFilesChange` | `(files: File[]) => void` | - | Files change handler |
| `onError` | `(error: string) => void` | - | Error handler |

**Ref Methods:**
```typescript
interface FilePickerRef {
  clear: () => void;
  getFiles: () => File[];
  browse: () => void;
}
```

**Usage:**
```tsx
<FilePicker
  accept="image/*"
  multiple
  maxSize={5 * 1024 * 1024} // 5MB
  onFilesChange={(files) => setSelectedFiles(files)}
  onError={(error) => console.error(error)}
/>
```

---

### Icon
**Path:** `@/components/atoms/Icon`  
**Extends:** SVGProps

Icon component using Iconoir library with 200+ icons.

**Component-Specific Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `IconName \| React.ComponentType<React.SVGProps<SVGSVGElement>>` | **Required** | Icon name or component |
| `size` | `UniversalSize \| number` | `'md'` | Icon size |
| `color` | `UniversalColor \| 'inherit' \| 'muted' \| string` | `'inherit'` | Icon color |
| `customColor` | `string` | - | Custom color |
| `spin` | `boolean` | `false` | Spinning animation |
| `pulse` | `boolean` | `false` | Pulse animation |

**Usage:**
```tsx
<Icon name="Check" size="lg" color="success" />
<Icon name="Loading" spin />
<Icon name={CustomIcon} color="primary" />
```

---

### Notification
**Path:** `@/components/atoms/Notification`  
**Extends:** Universal Props + Container Props

Toast notification component with actions and auto-dismiss.

**Types:**
```typescript
interface NotificationAction {
  label: string;
  onClick: () => void;
  variant?: UniversalVariant;
  disabled?: boolean;
}
```

**Component-Specific Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **Required** | Notification title |
| `description` | `string` | - | Detailed message |
| `dismissible` | `boolean` | `true` | Can be dismissed |
| `showIcon` | `boolean` | `true` | Show color-based icon |
| `customIcon` | `React.ReactNode` | - | Custom icon |
| `actions` | `NotificationAction[]` | - | Action buttons |
| `onDismiss` | `() => void` | - | Dismiss callback |
| `duration` | `number \| null` | - | Auto-dismiss duration |
| `showProgress` | `boolean` | `false` | Progress indicator |
| `toastPosition` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right' \| 'top-center' \| 'bottom-center'` | `'top-right'` | Toast position |

**Usage:**
```tsx
<Notification
  title="Success!"
  description="Your changes have been saved"
  color="success"
  duration={5000}
  actions={[
    { label: 'Undo', onClick: handleUndo },
    { label: 'View', onClick: handleView }
  ]}
/>
```

---

### ProgressIndicator
**Path:** `@/components/atoms/ProgressIndicator`  
**Extends:** Universal Props + Container Props + HTMLDivAttributes

Progress display component with multiple visual styles.

**Component-Specific Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'spinner' \| 'bar' \| 'progressBar' \| 'circular' \| 'dots'` | `'spinner'` | Progress type |
| `value` | `number` | `0` | Progress value (0-100) |
| `max` | `number` | `100` | Maximum value |
| `showPercentage` | `boolean` | `false` | Show percentage |
| `showValue` | `boolean` | `false` | Show current value |
| `label` | `string` | - | Custom label |
| `duration` | `number` | `300` | Animation duration |
| `striped` | `boolean` | `false` | Striped pattern |
| `stripedAnimation` | `boolean` | `false` | Animate stripes |
| `indeterminate` | `boolean` | `false` | Indeterminate state |

**Usage:**
```tsx
<ProgressIndicator type="bar" value={75} showPercentage />
<ProgressIndicator type="circular" value={50} />
<ProgressIndicator type="spinner" indeterminate />
```

---

### RadioButton
**Path:** `@/components/atoms/RadioButton`  
**Extends:** Universal Props + Form Props + InputHTMLAttributes

Single-selection input component with group support.

**Component-Specific Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `ReactNode` | - | Label content |
| `description` | `ReactNode` | - | Description below label |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Label position |
| `contentToggleable` | `boolean` | `true` | Click label to toggle |

**Ref Methods:**
```typescript
interface RadioButtonRef {
  focus: () => void;
  blur: () => void;
  click: () => void;
}
```

**Group Component Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | **Required** | Form name |
| `value` | `string` | - | Selected value |
| `onChange` | `(value: string) => void` | - | Change handler |
| `options` | `Array<{value: string, label?: ReactNode, description?: ReactNode, disabled?: boolean}>` | **Required** | Options |
| `orientation` | `'horizontal' \| 'vertical'` | `'vertical'` | Layout orientation |

**Usage:**
```tsx
<RadioButton name="choice" value="a" label="Option A" />

<RadioButtonGroup
  name="selection"
  value={selectedValue}
  onChange={setSelectedValue}
  options={[
    { value: 'a', label: 'Option A', description: 'First choice' },
    { value: 'b', label: 'Option B', description: 'Second choice' }
  ]}
/>
```

---

### Scrollbar
**Path:** `@/components/atoms/Scrollbar`  
**Extends:** Universal Props + Container Props + HTMLDivAttributes

Custom scrollbar component with advanced features.

**Component-Specific Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical' \| 'both'` | `'vertical'` | Scroll direction |
| `visibility` | `'always' \| 'hover' \| 'auto' \| 'hidden'` | `'auto'` | Scrollbar visibility |
| `smoothScrolling` | `boolean` | `true` | Smooth scrolling |
| `hideNative` | `boolean` | `true` | Hide native scrollbars |
| `momentum` | `boolean` | `true` | Touch momentum |
| `autoHideDelay` | `number` | `1000` | Auto-hide delay (ms) |
| `showIndicators` | `boolean` | `false` | Scroll indicators |
| `thumbSize` | `number` | - | Thumb size (0-1) |
| `scrollPosition` | `{x?: number, y?: number}` | - | Position (0-1) |
| `onScroll` | `(event: React.UIEvent<HTMLDivElement>) => void` | - | Scroll handler |
| `onScrollStart` | `() => void` | - | Scroll start |
| `onScrollEnd` | `() => void` | - | Scroll end |
| `onReachTop/Bottom/Left/Right` | `() => void` | - | Edge callbacks |

**Ref Methods:**
```typescript
interface ScrollbarRef {
  scrollTo: (position: {top?: number, left?: number, behavior?: 'auto' | 'smooth'}) => void;
  scrollIntoView: (element: Element, options?: ScrollIntoViewOptions) => void;
  getScrollPosition: () => {top: number, left: number};
}
```

**Usage:**
```tsx
<Scrollbar height="300px" onReachBottom={() => loadMore()}>
  <div>Long content...</div>
</Scrollbar>
```

---

### Search
**Path:** `@/components/atoms/Search`  
**Extends:** Universal Props + Form Props + InputHTMLAttributes

Search input component with debouncing and clear functionality.

**Component-Specific Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSearch` | `(value: string) => void` | - | Submit callback |
| `onClear` | `() => void` | - | Clear callback |
| `showSearchIcon` | `boolean` | `true` | Show search icon |
| `showClearButton` | `boolean` | `true` | Show clear button |
| `searchIconPosition` | `'left' \| 'right'` | `'left'` | Search icon position |
| `debounceDelay` | `number` | `300` | Debounce delay (ms) |
| `searchIcon` | `React.ReactNode` | - | Custom search icon |
| `clearIcon` | `React.ReactNode` | - | Custom clear icon |
| `clearOnEscape` | `boolean` | `true` | Clear on escape |
| `onChange` | `(value: string) => void` | - | Change handler |

**Usage:**
```tsx
<Search
  placeholder="Search users..."
  onSearch={(query) => performSearch(query)}
  debounceDelay={500}
/>
```

---

### SegmentedControl
**Path:** `@/components/atoms/SegmentedControl`  
**Extends:** HTMLDivAttributes

Multi-option selection component with tab-like interface.

**Component-Specific Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `string[]` | **Required** | Segment options |
| `selectedIndex` | `number` | - | Controlled selection |
| `defaultSelectedIndex` | `number` | - | Uncontrolled default |
| `onChange` | `(selectedIndex: number, selectedItem: string) => void` | - | Change handler |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Component size |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'destructive' \| 'warning' \| 'success'` | - | Visual variant |
| `disabled` | `boolean` | `false` | Disabled state |
| `fullWidth` | `boolean` | `false` | Full width |
| `rounded` | `boolean` | `false` | Rounded corners |
| `name` | `string` | - | Form name |

**Ref Methods:**
```typescript
interface SegmentedControlRef {
  focus: () => void;
  blur: () => void;
  selectIndex: (index: number) => void;
}
```

**Usage:**
```tsx
<SegmentedControl
  items={['Daily', 'Weekly', 'Monthly']}
  selectedIndex={activeIndex}
  onChange={(index, item) => setActiveIndex(index)}
  fullWidth
/>
```

---

### Slider
**Path:** `@/components/atoms/Slider`  
**Extends:** Universal Props + Form Props + InputHTMLAttributes

Range input component with tooltips and custom ticks.

**Component-Specific Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Slider orientation |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step increment |
| `showTooltip` | `boolean` | `false` | Value tooltip |
| `showTicks` | `boolean` | `false` | Tick marks |
| `ticks` | `Array<{value: number, label?: string}>` | - | Custom ticks |
| `showLabels` | `boolean` | `false` | Min/max labels |
| `minLabel` | `string` | - | Custom min label |
| `maxLabel` | `string` | - | Custom max label |
| `length` | `string \| number` | - | Custom length |
| `formatValue` | `(value: number) => string` | - | Value formatter |
| `onChange` | `(value: number, event: React.ChangeEvent) => void` | - | Change handler |
| `onInput` | `(value: number, event: React.FormEvent) => void` | - | Input handler |

**Usage:**
```tsx
<Slider
  min={0}
  max={100}
  value={sliderValue}
  onChange={(value) => setSliderValue(value)}
  showTooltip
  showLabels
/>
```

---

### TextArea
**Path:** `@/components/atoms/TextArea`  
**Extends:** Universal Props + Form Props + TextareaHTMLAttributes

Multi-line text input with auto-resize and character counting.

**Component-Specific Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `resize` | `'none' \| 'both' \| 'horizontal' \| 'vertical'` | `'vertical'` | Resize behavior |
| `description` | `string` | - | Description text |
| `errorMessage` | `string` | - | Error message |
| `showCharacterCount` | `boolean` | `false` | Character counter |
| `maxLength` | `number` | - | Max characters |
| `minRows` | `number` | `3` | Minimum rows |
| `maxRows` | `number` | - | Maximum rows |
| `autoResize` | `boolean` | `false` | Auto-resize height |
| `showLineNumbers` | `boolean` | `false` | Line numbers |
| `clearOnEscape` | `boolean` | `false` | Clear on escape |
| `icon` | `React.ReactNode` | - | Custom icon |
| `iconPosition` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'top-right'` | Icon position |
| `iconClickable` | `boolean` | `false` | Icon is clickable |
| `onIconClick` | `() => void` | - | Icon click handler |

**Ref Methods:**
```typescript
interface TextAreaRef {
  focus: () => void;
  blur: () => void;
  select: () => void;
  setSelectionRange: (start: number, end: number) => void;
  getValue: () => string;
  setValue: (value: string) => void;
}
```

**Usage:**
```tsx
<TextArea
  label="Description"
  placeholder="Enter description..."
  autoResize
  maxRows={10}
  showCharacterCount
  maxLength={500}
/>
```

---

### Toggle
**Path:** `@/components/atoms/Toggle`  
**Extends:** Universal Props + Form Props

Switch-style boolean input component.

**Component-Specific Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | - | Controlled state |
| `defaultChecked` | `boolean` | - | Uncontrolled default |
| `description` | `string` | - | Description text |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Label position |
| `onChange` | `(checked: boolean, event: React.ChangeEvent) => void` | - | Change handler |

**Ref Methods:**
```typescript
interface ToggleRef {
  focus: () => void;
  blur: () => void;
  click: () => void;
}
```

**Usage:**
```tsx
<Toggle label="Enable notifications" defaultChecked />
<Toggle
  label="Dark mode"
  checked={darkMode}
  onChange={(checked) => setDarkMode(checked)}
/>
```

---

## Molecule Components

### CollapsibleMenu
**Path:** `@/components/molecules/CollapsibleMenu`

Collapsible side navigation menu with toggle functionality.

**Component-Specific Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `collapsed` | `boolean` | `false` | Collapsed state |
| `defaultCollapsed` | `boolean` | `false` | Uncontrolled default |
| `onToggle` | `(collapsed: boolean) => void` | - | Toggle callback |
| `position` | `'left' \| 'right'` | `'left'` | Menu position |
| `expandedWidth` | `string \| number` | `'250px'` | Expanded width |
| `collapsedWidth` | `string \| number` | `'60px'` | Collapsed width |
| `showToggle` | `boolean` | `true` | Show toggle button |
| `toggleContent` | `React.ReactNode` | - | Custom toggle content |
| `overlay` | `boolean` | `false` | Overlay or push content |
| `zIndex` | `number` | `1000` | Z-index |
| `animationDuration` | `number` | `300` | Animation duration |
| `color` | `UniversalColor` | `'primary'` | Color theme |
| `size` | `UniversalSize` | `'md'` | Size variant |
| `shape` | `UniversalShape` | `'default'` | Border radius |

**Ref Methods:**
```typescript
interface CollapsibleMenuRef {
  toggle: () => void;
  expand: () => void;
  collapse: () => void;
  isCollapsed: () => boolean;
}
```

**Usage:**
```tsx
<CollapsibleMenu position="left" expandedWidth="280px">
  <nav>
    <ul>
      <li><a href="/">Dashboard</a></li>
      <li><a href="/users">Users</a></li>
    </ul>
  </nav>
</CollapsibleMenu>
```

---

### Navigation
**Path:** `@/components/molecules/Navigation`

Application navigation bar with branding and tabs.

**Types:**
```typescript
interface NavigationTab {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  badge?: string | number;
  icon?: React.ReactNode;
}
```

**Component-Specific Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `React.ReactNode` | - | Brand/logo icon |
| `appName` | `string` | - | Application name |
| `onBrandClick` | `() => void` | - | Brand click handler |
| `tabs` | `NavigationTab[]` | - | Navigation tabs |
| `activeTab` | `string` | - | Active tab ID |
| `onTabChange` | `(tabId: string) => void` | - | Tab change handler |
| `leadingContent` | `React.ReactNode` | - | Leading content |
| `trailingContent` | `React.ReactNode` | - | Trailing content |
| `variant` | `'default' \| 'elevated' \| 'bordered' \| 'minimal'` | `'default'` | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `sticky` | `boolean` | `false` | Sticky positioning |
| `fullWidth` | `boolean` | `false` | Full width |
| `maxWidth` | `string` | - | Maximum width |

**Usage:**
```tsx
<Navigation
  appName="My App"
  icon={<LogoIcon />}
  tabs={[
    { id: 'home', label: 'Home', href: '/' },
    { id: 'about', label: 'About', onClick: () => navigate('/about') }
  ]}
  activeTab="home"
  trailingContent={<UserMenu />}
/>
```

---

## Design Patterns

### 1. Universal Props System
All atomic components inherit comprehensive base props ensuring consistency across the library.

### 2. Form Integration
Form components extend `WithFormProps` providing standard form handling with controlled/uncontrolled modes.

### 3. Ref Methods
Interactive components provide imperative methods via refs for programmatic control.

### 4. Theming Integration
CSS variables-based theming system supporting 7 built-in themes and custom colors.

### 5. Loading States
Global loading state management using `loadingKey` for coordinated loading indicators.

### 6. Animation System
Consistent animation patterns with `animate` prop and configurable durations.

### 7. Size Scale
Standardized 5-tier sizing (xs, sm, md, lg, xl) with specific pixel values:
- **xs**: 32px height, minimal spacing
- **sm**: 36px height, compact spacing
- **md**: 40px height, standard spacing (default)
- **lg**: 44px height, comfortable spacing
- **xl**: 48px height, spacious layout

### 8. Accessibility Built-in
- ARIA attributes and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- High contrast support

### 9. Icon Integration
Iconoir library with 200+ icons plus support for custom React components.

---

## Quick Reference

### Import Patterns
```typescript
// Individual components
import { Button, Card, Dropdown } from '@/components/atoms';
import { Navigation, CollapsibleMenu } from '@/components/molecules';

// With types
import { Button, type ButtonProps } from '@/components/atoms/Button';
```

### Common Props Combinations
```tsx
// Standard button
<Button variant="solid" color="primary" size="md">Save</Button>

// Form input with validation
<TextArea
  label="Description"
  required
  error={hasError}
  errorMessage="This field is required"
  maxLength={500}
  showCharacterCount
/>

// Loading state
<Button loading loadingKey="save-action" onAsyncClick={handleSave}>
  Save Changes
</Button>

// Custom theming
<Card color="custom" customColor="#ff6b6b" variant="outline">
  Custom colored card
</Card>
```

### Size Reference
```tsx
// All components support consistent sizing
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium (default)</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
```

### Color Reference
```tsx
// Universal color system
<Badge color="primary">Primary</Badge>
<Badge color="secondary">Secondary</Badge>
<Badge color="success">Success</Badge>
<Badge color="warning">Warning</Badge>
<Badge color="destructive">Destructive</Badge>
<Badge color="info">Info</Badge>
<Badge color="custom" customColor="#purple">Custom</Badge>
```

---

*For detailed implementation examples and advanced usage patterns, refer to the individual component README files in their respective directories.*
# Dropdown Component

A full-featured dropdown/select component with support for single and multi-select, search/filter, option groups, keyboard navigation, and controlled/uncontrolled modes.

## Features

- **Single & multi-select**: `multiple` prop toggles multi-selection mode
- **Searchable**: built-in filter input with customizable placeholder and filter function
- **Option groups**: flat options or grouped via `DropdownGroup`
- **Rich options**: icons, descriptions, dividers, and disabled states per option
- **Keyboard navigation**: Arrow keys, Enter, Escape fully supported
- **Controlled mode**: `open` + `onOpenChange` for external state control
- **Portal rendering**: optional `portal` prop to escape overflow/z-index constraints
- **Error state**: `error` + `errorText` for form validation
- **All universal variants**: color, variant, size, shape, animate, animationMode, glassmorphic, etc.
- **Theme integration**: CSS variable-based theming

## File Structure

```
Dropdown/
├── index.ts                 # Main exports
├── Dropdown.tsx             # Main component implementation
├── Dropdown.types.ts        # TypeScript type definitions
├── Dropdown.styles.ts       # Style computation functions
├── Dropdown.utils.tsx       # Utility/render functions
├── Dropdown.config.tsx      # Default config values
└── README.md                # Documentation
```

## Usage

### Basic

```tsx
import { Dropdown } from './components/atoms/Dropdown';

<Dropdown
  options={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte' },
  ]}
  placeholder="Select a framework"
  onChange={(value) => console.log(value)}
/>
```

### Multi-select

```tsx
<Dropdown
  options={options}
  multiple
  value={selected}
  onChange={(values) => setSelected(values as string[])}
/>
```

### Searchable

```tsx
<Dropdown
  options={options}
  searchable
  searchPlaceholder="Filter options..."
/>
```

### With Groups

```tsx
<Dropdown
  options={[
    {
      label: 'Frontend',
      options: [
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
      ],
    },
    {
      label: 'Backend',
      options: [
        { value: 'node', label: 'Node.js' },
        { value: 'django', label: 'Django' },
      ],
    },
  ]}
/>
```

### With Icons & Descriptions

```tsx
<Dropdown
  options={[
    {
      value: 'admin',
      label: 'Administrator',
      icon: <Icon name="Shield" />,
      description: 'Full access to all settings',
    },
    {
      value: 'viewer',
      label: 'Viewer',
      icon: <Icon name="Eye" />,
      description: 'Read-only access',
      disabled: true,
    },
  ]}
/>
```

### Error State

```tsx
<Dropdown
  options={options}
  error
  errorText="Please select an option"
/>
```

### Custom Trigger

```tsx
<Dropdown
  options={options}
  trigger={<Button variant="outline">Open Menu</Button>}
/>
```

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `(DropdownOption \| DropdownGroup)[]` | required | Options list or grouped options |
| `value` | `string \| number \| (string \| number)[]` | — | Currently selected value(s) |
| `onChange` | `(value) => void` | — | Called when selection changes |
| `multiple` | `boolean` | `false` | Allow multiple selections |
| `placeholder` | `string` | — | Trigger placeholder text |

### Search

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `searchable` | `boolean` | `false` | Show filter input |
| `searchPlaceholder` | `string` | `'Search...'` | Filter input placeholder |
| `filterFunction` | `(option, query) => boolean` | — | Custom filter logic |
| `emptyMessage` | `string` | `'No options available'` | Shown when no options exist |
| `noResultsMessage` | `string` | `'No results found'` | Shown when search yields nothing |

### Behavior

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `closeOnSelect` | `boolean` | `true` | Close menu after selecting (ignored for `multiple`) |
| `open` | `boolean` | — | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | — | Callback for open state changes |
| `onOpen` | `() => void` | — | Called when dropdown opens |
| `onClose` | `() => void` | — | Called when dropdown closes |
| `portal` | `boolean` | `false` | Render menu in a portal |

### Layout & Appearance

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `DropdownPosition` | `'bottom-start'` | Menu placement relative to trigger |
| `maxHeight` | `string` | `'300px'` | Max height of the menu |
| `showArrow` | `boolean` | `true` | Show chevron arrow on trigger |
| `icon` | `React.ReactNode` | — | Custom trigger icon |
| `trigger` | `React.ReactNode` | — | Fully custom trigger element |
| `header` | `React.ReactNode` | — | Content rendered above the option list |
| `headerAlignment` | `'left' \| 'center' \| 'right'` | `'left'` | Alignment of header text |
| `menuClassName` | `string` | — | Extra class on the menu element |
| `menuStyle` | `React.CSSProperties` | — | Inline styles for the menu |

### Validation

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `error` | `boolean` | `false` | Show error state |
| `errorText` | `string` | — | Error message to display |

### Universal Props

Also accepts: `color`, `variant`, `size`, `shape`, `disabled`, `loading`, `animate`, `animationMode`, `rounded`, `glassmorphic`, `customColor`, `width`, `height`, and all standard `HTMLDivElement` attributes.

## Types

### `DropdownOption`

| Field | Type | Description |
|-------|------|-------------|
| `value` | `string \| number` | Option value |
| `label` | `React.ReactNode` | Display label |
| `disabled` | `boolean` | Disable this option |
| `icon` | `React.ReactNode` | Leading icon |
| `description` | `string` | Secondary description text |
| `divider` | `boolean` | Render a divider after this option |

### `DropdownGroup`

| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | Group heading |
| `options` | `DropdownOption[]` | Options in the group |

### `DropdownPosition`

`'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'left' | 'right'`

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `↓ / ↑` | Move focus between options |
| `Enter` | Select focused option |
| `Escape` | Close the dropdown |
| `Tab` | Close and move focus |

## Accessibility

- ARIA roles: `combobox`, `listbox`, `option`
- `aria-expanded`, `aria-selected`, `aria-disabled` attributes
- Keyboard fully navigable without a mouse
- Compatible with high contrast themes

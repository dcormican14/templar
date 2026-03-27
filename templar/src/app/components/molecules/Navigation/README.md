# Navigation Component

A responsive top navigation bar with a three-section layout: brand/logo area, tab list, and flexible content slots. Supports sticky positioning, mobile overflow handling, and all standard Templar visual variants.

## Features

- **Three-section layout**: brand (left), tabs (center), content slots (right)
- **Responsive**: desktop shows tabs inline; overflow triggers a hamburger/mobile menu
- **Tab system**: active indicator, badges, icons, disabled state, href or onClick
- **Variants**: default, elevated, bordered, minimal, solid, ghost, outline, glassmorphic
- **Color system**: all semantic colors plus custom color support
- **Sticky positioning**: optional `sticky` prop with safe-area-inset support for notched devices
- **Flexible content**: `leadingContent` and `trailingContent` slots for arbitrary React nodes
- **Theme integration**: CSS variable-based colors and glassmorphic effects

## File Structure

```
Navigation/
├── index.ts                 # Main exports
├── Navigation.tsx           # Main component implementation
├── Navigation.types.ts      # TypeScript type definitions
├── Navigation.styles.ts     # Style computation functions
├── Navigation.config.tsx    # Sub-components (tabs, brand)
└── README.md                # Documentation
```

## Usage

### Basic with Tabs

```tsx
import { Navigation } from './components/molecules/Navigation';

<Navigation
  appName="My App"
  tabs={[
    { id: 'home', label: 'Home' },
    { id: 'docs', label: 'Docs' },
    { id: 'pricing', label: 'Pricing' },
  ]}
  activeTab="home"
  onTabChange={(id) => setActiveTab(id)}
/>
```

### With Brand Icon & Trailing Content

```tsx
<Navigation
  icon={<Icon name="Templar" />}
  appName="Templar"
  tabs={tabs}
  activeTab={activeTab}
  onTabChange={setActiveTab}
  trailingContent={<Button size="sm">Sign In</Button>}
/>
```

### Sticky Glassmorphic

```tsx
<Navigation
  appName="My App"
  tabs={tabs}
  activeTab={activeTab}
  onTabChange={setActiveTab}
  variant="glassmorphic"
  sticky
/>
```

### Tabs with Badges & Icons

```tsx
<Navigation
  tabs={[
    { id: 'inbox', label: 'Inbox', badge: 4, icon: <Icon name="Mail" /> },
    { id: 'sent', label: 'Sent', icon: <Icon name="Send" /> },
    { id: 'archive', label: 'Archive', disabled: true },
  ]}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>
```

### Tabs as Links

```tsx
<Navigation
  tabs={[
    { id: 'home', label: 'Home', href: '/' },
    { id: 'docs', label: 'Docs', href: '/docs' },
  ]}
/>
```

## Props

### `NavigationProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `React.ReactNode` | — | Logo/icon in the brand area |
| `appName` | `string` | — | App name text in the brand area |
| `onBrandClick` | `() => void` | — | Click handler for the brand area |
| `tabs` | `NavigationTab[]` | — | Tab definitions |
| `activeTab` | `string` | — | ID of the currently active tab |
| `onTabChange` | `(tabId: string) => void` | — | Called when a tab is selected |
| `leadingContent` | `React.ReactNode` | — | Content rendered before the tabs |
| `trailingContent` | `React.ReactNode` | — | Content rendered after the tabs (right side) |
| `variant` | `NavigationVariant` | `'default'` | Visual style variant |
| `color` | `NavigationColor` | — | Semantic color theme |
| `customColor` | `string` | — | Custom hex/CSS color (used when `color='custom'`) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Navigation bar height and font size |
| `sticky` | `boolean` | `false` | Stick to the top of the viewport on scroll |
| `fullWidth` | `boolean` | `false` | Stretch content to full viewport width |
| `maxWidth` | `string` | — | Max width CSS value for the inner content |
| `className` | `string` | — | Additional CSS classes |
| `style` | `React.CSSProperties` | — | Inline styles |

### `NavigationTab`

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique tab identifier |
| `label` | `string` | Display label |
| `href` | `string` | If provided, renders as an `<a>` tag |
| `onClick` | `() => void` | Click handler (used alongside or instead of `href`) |
| `disabled` | `boolean` | Disable the tab |
| `badge` | `string \| number` | Badge count or label shown on the tab |
| `icon` | `React.ReactNode` | Icon shown before the label |

## Variants

| Variant | Description |
|---------|-------------|
| `default` | Standard nav with background and subtle border |
| `elevated` | Adds a drop shadow |
| `bordered` | Explicit bottom border |
| `minimal` | Transparent with no border |
| `solid` | Solid filled background using the active color |
| `ghost` | Semi-transparent background |
| `outline` | Outlined border all around |
| `glassmorphic` | Frosted glass effect — pairs well with `sticky` |

## Accessibility

- Tab elements use appropriate `<a>` or `<button>` semantics
- `aria-current="page"` on the active tab
- `aria-disabled` on disabled tabs
- Hamburger menu button labeled for screen readers
- Safe-area-inset padding for notched/curved displays

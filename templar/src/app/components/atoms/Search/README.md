# Search Component

A flexible and accessible search input component that follows the Templar design system standards.

## Features

- **Multiple Variants**: outline, ghost, primary, secondary
- **Three Sizes**: small, medium, large  
- **Search Icon**: Configurable position (left/right) and custom icons
- **Clear Button**: Optional clear functionality
- **Loading State**: Built-in loading indicator
- **Debounced Input**: Configurable debounce delay
- **Keyboard Navigation**: Enter to search, Escape to clear
- **Accessibility**: Full ARIA support and screen reader compatibility
- **Focus Management**: Visual focus states and programmatic focus control
- **Validation**: Optional input validation with error states

## Basic Usage

```tsx
import { Search } from '@/components/atoms';

// Basic search
<Search 
  placeholder="Search..." 
  onSearch={(value) => console.log('Searching:', value)}
/>

// With clear button
<Search 
  placeholder="Type to search..."
  showClearButton={true}
  onSearch={(value) => handleSearch(value)}
  onClear={() => handleClear()}
/>

// Controlled component
<Search 
  value={searchValue}
  onChange={setSearchValue}
  onSearch={handleSearch}
/>
```

## Variants

```tsx
<Search variant="outline" placeholder="Outline search..." />
<Search variant="ghost" placeholder="Ghost search..." />
<Search variant="primary" placeholder="Primary search..." />
<Search variant="secondary" placeholder="Secondary search..." />
```

## Sizes

```tsx
<Search size="sm" placeholder="Small search..." />
<Search size="md" placeholder="Medium search..." />
<Search size="lg" placeholder="Large search..." />
```

## Advanced Features

```tsx
// Custom width and debounce
<Search 
  width="300px"
  debounceDelay={500}
  placeholder="Custom search..."
/>

// Loading state
<Search 
  loading={true}
  placeholder="Loading..."
/>

// Error state
<Search 
  error={true}
  placeholder="Search with error..."
/>

// Custom icons
<Search 
  searchIcon={<CustomSearchIcon />}
  clearIcon={<CustomClearIcon />}
  placeholder="Custom icons..."
/>

// Icon positioning
<Search 
  searchIconPosition="right"
  placeholder="Search icon on right..."
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'outline' \| 'ghost' \| 'primary' \| 'secondary'` | `'outline'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the search input |
| `value` | `string` | `undefined` | Controlled value |
| `onChange` | `(value: string) => void` | `undefined` | Value change handler |
| `onSearch` | `(value: string) => void` | `undefined` | Search submission handler |
| `onClear` | `() => void` | `undefined` | Clear button handler |
| `disabled` | `boolean` | `false` | Whether input is disabled |
| `error` | `boolean` | `false` | Whether input is in error state |
| `loading` | `boolean` | `false` | Whether to show loading indicator |
| `showSearchIcon` | `boolean` | `true` | Whether to show search icon |
| `showClearButton` | `boolean` | `true` | Whether to show clear button |
| `searchIconPosition` | `'left' \| 'right'` | `'left'` | Position of search icon |
| `rounded` | `boolean` | `false` | Whether to use rounded corners |
| `debounceDelay` | `number` | `300` | Debounce delay in milliseconds |
| `clearOnEscape` | `boolean` | `true` | Whether to clear on Escape key |
| `width` | `string \| number` | `'auto'` | Width of the search input |
| `searchIcon` | `React.ReactNode` | `undefined` | Custom search icon |
| `clearIcon` | `React.ReactNode` | `undefined` | Custom clear icon |

## Keyboard Navigation

- **Enter**: Triggers search (calls `onSearch`)
- **Escape**: Clears input (if `clearOnEscape` is true)

## Accessibility Features

- Proper ARIA attributes (`role="searchbox"`, `aria-disabled`, etc.)
- Focus management and visual focus indicators
- Screen reader support
- Keyboard navigation
- Error state announcements

## Integration with Dropdown

The Search component can be used with the Dropdown component for search functionality:

```tsx
<Dropdown
  options={filteredOptions}
  searchable={true}
  searchPlaceholder="Search options..."
  filterFunction={(option, query) => 
    option.label.toLowerCase().includes(query.toLowerCase())
  }
/>
```

## Styling

The component follows Templar design standards:
- Uses CSS variables for theming
- Respects animation preferences
- Consistent spacing (4px system)
- Semantic color variants
- Focus styles with proper contrast

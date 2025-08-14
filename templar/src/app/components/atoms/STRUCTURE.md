# Atomic Components Directory Structure

This document outlines the organized structure of all atomic components in the templar project.

## Overview

All atomic components follow a consistent, modular architecture with clear separation of concerns:

- **Core files**: Component implementation, types, styles, utilities
- **Subdirectories**: Organized by function (hooks, components, etc.)
- **Index files**: Clean export patterns for easy imports
- **Documentation**: Comprehensive README files

## Directory Structures

### Button Component
```
Button/
├── index.ts                 # Main exports and re-exports
├── Button.tsx               # Main component implementation
├── Button.types.ts          # TypeScript type definitions
├── Button.styles.ts         # Style computation functions
├── Button.utils.tsx         # Utility functions for rendering
├── hooks/
│   ├── index.ts            # Hook exports
│   ├── useAsyncClick.ts    # Custom hook for async operations
│   └── useButtonHover.ts   # Custom hook for hover effects
└── README.md               # Comprehensive documentation
```

### Icon Component
```
Icon/
├── index.ts                 # Main exports and re-exports
├── Icon.tsx                 # Main component implementation
├── Icon.types.ts            # TypeScript type definitions
├── Icon.styles.ts           # Style computation functions
├── Icon.utils.ts            # Utility functions
├── iconRegistry.ts          # Icon registry and dynamic loading
├── components/
│   ├── index.ts            # Component exports
│   └── IconAnimations.tsx  # Animation styles component
└── README.md               # Comprehensive documentation
```

### ProgressIndicator Component
```
ProgressIndicator/
├── index.ts                     # Main exports and legacy compatibility
├── ProgressIndicator.tsx        # Main component implementation
├── ProgressIndicator.types.ts   # TypeScript type definitions
├── ProgressIndicator.styles.ts  # Style computation functions
└── README.md                   # Comprehensive documentation
```

## Organizational Principles

1. **Hooks Subdirectory**: All custom hooks are organized in a `hooks/` subdirectory with their own index file
2. **Components Subdirectory**: Sub-components and animation components are organized in a `components/` subdirectory
3. **Clean Exports**: Each subdirectory has an index file that exports all its contents
4. **Consistent Naming**: All files follow the same naming convention (ComponentName.category.ts)
5. **No Temp Files**: All temporary and backup files have been removed

## Benefits

- **Better Organization**: Related files are grouped together logically
- **Easier Navigation**: Developers can quickly find hooks, components, styles, etc.
- **Cleaner Imports**: Subdirectories have their own exports, reducing import statement complexity
- **Maintainability**: Clear separation makes it easier to modify and extend components
- **Scalability**: Structure supports adding more hooks, components, or utilities as needed

## Import Examples

```typescript
// Clean imports from subdirectories
import { Button, useAsyncClick, useButtonHover } from './components/atoms/Button';
import { Icon, IconAnimations } from './components/atoms/Icon';
import { ProgressIndicator, LoadingSpinner } from './components/atoms/ProgressIndicator';

// Specific imports still work
import { useAsyncClick } from './components/atoms/Button/hooks';
import { IconAnimations } from './components/atoms/Icon/components';

// New ProgressIndicator with dual modes
<ProgressIndicator type="spinner" />
<ProgressIndicator type="progressBar" value={75} />

// Backward compatibility maintained
<LoadingSpinner size="md" color="primary" />
```

This structure follows React best practices and makes the codebase more professional and maintainable.

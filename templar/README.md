# Mournshire

A modern React component library built with atomic design principles, featuring advanced theming and configuration via `.mourn` files.

## Features

- 🧩 **Atomic Design**: 15+ atomic components, molecular components
- 🎨 **Advanced Theming**: 6 built-in themes, CSS variables
- ⚙️ **Configuration System**: `.mourn` files for customization
- 🎭 **Provider Architecture**: RoundTable provider system
- 📦 **Tree-Shakeable**: Only include what you need
- 💪 **TypeScript**: Full type safety
- ♿ **Accessible**: WCAG AA compliant

## Installation

```bash
npm install mournshire react react-dom iconoir-react
# or
yarn add mournshire react react-dom iconoir-react
# or
pnpm add mournshire react react-dom iconoir-react
```

## Quick Start

### 1. Create Configuration

Create `src/mourn.config.ts`:

```typescript
import { setGlobalMournConfig } from 'mournshire/environment';

setGlobalMournConfig({
  providers: {
    theme: {
      enabled: true,
      defaultTheme: 'dark'
    }
  }
});
```

### 2. Wrap Your App

```tsx
import './mourn.config';
import { RoundTable } from 'mournshire/providers';

function App() {
  return (
    <RoundTable>
      <YourApp />
    </RoundTable>
  );
}
```

### 3. Use Components

```tsx
import { Button, Card, Icon } from 'mournshire';

function MyComponent() {
  return (
    <Card>
      <Button
        variant="solid"
        color="primary"
        icon={<Icon name="Check" />}
      >
        Click Me
      </Button>
    </Card>
  );
}
```

## Documentation

- [Official Site](https://mournshire.vercel.app)
- [Component Library](https://github.com/dcormican14/templar/blob/main/templar/src/app/docs/ELEMENT_LIBRARY_OVERVIEW.md)
- [.mourn Configuration](https://github.com/dcormican14/templar/blob/main/templar/src/app/docs/MOURN_CONFIGURATION.md)
- [Design Standards](https://github.com/dcormican14/templar/blob/main/templar/src/app/docs/COMPONENT_DESIGN_STANDARDS.md)
- [CSS Variables](https://github.com/dcormican14/templar/blob/main/templar/src/app/docs/CSS_VARIABLES.md)

## Components

### Atoms
Button, Card, Icon, CheckBox, Input, TextArea, Badge, ProgressIndicator, Slider, Toggle, Dropdown, CodeBlock, Scrollbar, SegmentedControl, Divider, RadioButton, FilePicker, Notification, Search, FallingLeaves

### Molecules
Navigation, CollapsibleMenu, InteractiveComponentDisplay, ReadmeDisplay

### Providers
- ThemeProvider - Theme management
- AuthProvider - Authentication
- ToastProvider - Notifications
- LoadingProvider - Loading states
- ModalProvider - Modal dialogs
- SettingsProvider - User preferences
- EnvironmentProvider - Configuration management

## License

MIT © dcorm

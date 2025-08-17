# Templar

**Templar** is a modern React component library built with Next.js 15, featuring a comprehensive atomic design system with advanced theming capabilities. It provides a complete set of reusable UI components following atomic design principles with built-in accessibility, multiple theme support, and provider-based state management.

## ✨ Features

- 🎨 **6 Built-in Themes**: Light, Dark, Sepia Light, Sepia Dark, High Contrast, and Solarized Dark
- 🧩 **Atomic Design System**: Organized components following atomic design principles (atoms, molecules, organisms)
- 🎯 **TypeScript First**: Full TypeScript support with comprehensive type definitions
- ♿ **Accessibility**: WCAG compliant components with proper ARIA attributes
- 🎭 **Advanced Theming**: CSS variables-based theming with real-time switching
- 🔄 **Provider Ecosystem**: Comprehensive provider system for state management
- 📱 **Responsive**: Mobile-first responsive design
- 🚀 **Next.js 15**: Built with the latest Next.js features including Turbopack

## 📦 Installation

### Prerequisites

- Node.js 18.x or later
- npm, yarn, or pnpm

### Clone and Setup

```bash
# Clone the repository
git clone https://github.com/dcormican14/templar.git
cd templar

# Navigate to the project directory
cd templar

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

## 🚀 Getting Started

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
npm run start
# or
yarn build
yarn start
# or
pnpm build
pnpm start
```

### Linting

```bash
npm run lint
# or
yarn lint
# or
pnpm lint
```

## 🏗️ Project Structure

```
templar/
├── src/
│   └── app/
│       ├── components/
│       │   ├── atoms/          # Basic building blocks
│       │   │   ├── Button/
│       │   │   ├── Card/
│       │   │   ├── Icon/
│       │   │   ├── ProgressIndicator/
│       │   │   └── ...
│       │   └── molecules/      # Component combinations
│       │       ├── Navigation/
│       │       ├── Modal/
│       │       └── ...
│       ├── docs/              # Documentation
│       ├── pages/             # Demo pages
│       ├── providers/         # Context providers
│       ├── styles/            # Global styles and themes
│       └── ...
├── public/                    # Static assets
└── package.json
```

## 🎨 Theming System

Templar includes a sophisticated theming system with 6 built-in themes:

- **Light**: Clean, minimal light theme
- **Dark**: Modern dark theme
- **Sepia Light**: Warm, paper-like light theme
- **Sepia Dark**: Warm dark theme for low-light reading
- **High Contrast**: Accessibility-focused high contrast theme
- **Solarized Dark**: Popular developer-friendly dark theme

### Using Themes

The theme system uses CSS variables and can be controlled programmatically:

```tsx
import { useTheme } from './providers';

function MyComponent() {
  const { theme, setTheme, cycleTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme('dark')}>Dark Theme</button>
      <button onClick={cycleTheme}>Cycle Themes</button>
    </div>
  );
}
```

## 🧩 Using Components

### Basic Usage

```tsx
import { Button, Card, Icon } from './components/atoms';

function App() {
  return (
    <Card>
      <Button size="md" variant="primary">
        <Icon name="save" />
        Save Changes
      </Button>
    </Card>
  );
}
```

### With Providers

Wrap your app with the provider ecosystem:

```tsx
import { RoundTable } from './providers';

function App() {
  return (
    <RoundTable>
      <YourAppContent />
    </RoundTable>
  );
}
```

## 🛠️ Development Guide

### Adding New Components

1. **Create Component Directory**: Follow the atomic design structure
   ```bash
   mkdir src/app/components/atoms/NewComponent
   ```

2. **Component Files**: Create the required files
   ```
   NewComponent/
   ├── index.ts           # Export file
   ├── NewComponent.tsx   # Main component
   ├── NewComponent.types.ts # Type definitions
   ├── NewComponent.styles.ts # Styles
   ├── NewComponent.utils.ts  # Utilities
   └── README.md         # Component documentation
   ```

3. **Follow Design Standards**: Reference `src/app/docs/DESIGN_STANDARDS.md` for:
   - Size scales (xs, sm, md, lg, xl)
   - Color standards
   - Accessibility requirements
   - Component patterns

4. **Use CSS Variables**: Leverage the theming system
   ```tsx
   import { useCSSVariables } from '../providers';
   
   function NewComponent() {
     const cssVars = useCSSVariables();
     
     const styles = {
       backgroundColor: cssVars.background,
       color: cssVars.foreground,
       borderColor: cssVars.border
     };
     
     return <div style={styles}>Content</div>;
   }
   ```

### Modifying Existing Components

1. **Check Current Implementation**: Review the component's structure and dependencies
2. **Update Types**: Modify `ComponentName.types.ts` if adding new props
3. **Update Styles**: Modify `ComponentName.styles.ts` for visual changes
4. **Test Across Themes**: Ensure changes work with all 6 themes
5. **Update Documentation**: Update the component's README.md

### Adding New Themes

1. **Create Theme File**: Add a new CSS file in `src/app/styles/themes/`
   ```css
   /* new-theme.css */
   [data-theme="new-theme"] {
     --background: #ffffff;
     --foreground: #000000;
     /* Add all required CSS variables */
   }
   ```

2. **Update Theme Provider**: Add the theme to the provider's theme list
3. **Import Theme**: Add the import to `src/app/styles/index.css`

### CSS Variables Reference

Key CSS variables used throughout the system:

```css
/* Core colors */
--background
--foreground
--primary
--secondary
--accent
--border

/* Component specific */
--button-background
--button-foreground
--card-background
--progress-track
--progress-track-text

/* State colors */
--success
--warning
--error
--info
```

## 📚 Documentation

- **Design Standards**: `src/app/docs/DESIGN_STANDARDS.md`
- **Implementation Guide**: `src/app/docs/IMPLEMENTATION_GUIDE.md`
- **CSS Variables**: `src/app/docs/CSS_VARIABLES.md`
- **Component Docs**: Each component includes its own README.md

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Follow the development guide** above for adding/modifying components
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Development Standards

- Follow TypeScript best practices
- Use the existing component patterns
- Ensure accessibility compliance
- Test across all themes
- Document new features
- Follow the atomic design principles

## 📄 License

This project is private and proprietary.

## 🔧 Technology Stack

- **Next.js 15**: React framework with App Router
- **React 19**: User interface library
- **TypeScript 5**: Type safety
- **Tailwind CSS 4**: Utility-first CSS framework
- **Iconoir**: Icon library
- **CSS Variables**: Dynamic theming

## 📞 Support

For questions or support, please refer to the documentation in the `src/app/docs/` directory or review the implementation examples in the demo pages.
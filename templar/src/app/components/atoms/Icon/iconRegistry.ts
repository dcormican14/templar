// Icon registry - consolidates iconoir-react imports
// This file dynamically imports all available icons from iconoir-react

import * as IconoirIcons from 'iconoir-react';

// Filter out non-icon exports (IconoirContext, IconoirProvider, default export)
const iconComponents = Object.entries(IconoirIcons).reduce((acc, [name, component]) => {
  // Skip non-icon exports
  if (name === 'IconoirContext' || name === 'IconoirProvider' || name === 'default') {
    return acc;
  }
  
  // Add the icon component
  acc[name] = component;
  return acc;
}, {} as Record<string, React.ComponentType<any>>);
// Create the icon registry with string name mappings
export const iconRegistry: Record<string, React.ComponentType<any>> = {
  // Direct component name mappings (PascalCase only)
  ...iconComponents,
};

// Export available icon names for documentation/autocomplete
export const availableIcons = Object.keys(iconRegistry);

// Helper function to get an icon component by name
export function getIcon(name: string): React.ComponentType<any> | undefined {
  return iconRegistry[name];
}

// Export count for debugging
export const iconCount = availableIcons.length;

console.log(`Icon registry loaded with ${iconCount} icons`);

export type IconName = keyof typeof iconRegistry;

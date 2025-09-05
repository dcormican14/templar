// This file contains utilities for working with component metadata
// In a real implementation, this could be generated at build time or use dynamic imports

export interface ComponentInfo {
  name: string;
  type: 'atom' | 'molecule';
  path: string;
  hasReadme: boolean;
  hasInteractive: boolean;
}

export function getAvailableComponents() {
  // Hardcoded list of components - in production this could be generated dynamically
  const atoms = [
    'Badge',
    'Button', 
    'Card',
    'CheckBox',
    'CodeBlock',
    'Divider',
    'Dropdown',
    'FilePicker',
    'Icon',
    'Notification',
    'ProgressIndicator',
    'RadioButton',
    'Scrollbar',
    'Search',
    'SegmentedControl',
    'Slider',
    'TextArea',
    'Toggle'
  ];

  const molecules = [
    'Navigation',
    'CollapsibleMenu',
    'InteractiveComponentDisplay'
  ];

  return {
    atoms: atoms.sort(),
    molecules: molecules.sort(),
    all: [...atoms, ...molecules].sort()
  };
}

export function getComponentType(componentName: string): 'atom' | 'molecule' | null {
  const components = getAvailableComponents();
  
  if (components.atoms.includes(componentName)) return 'atom';
  if (components.molecules.includes(componentName)) return 'molecule';
  return null;
}

export function getComponentPath(componentName: string): string {
  const type = getComponentType(componentName);
  if (!type) throw new Error(`Unknown component: ${componentName}`);
  
  const typeDir = type === 'atom' ? 'atoms' : 'molecules';
  return `./components/${typeDir}/${componentName}`;
}

export function getReadmePath(componentName: string): string {
  const componentPath = getComponentPath(componentName);
  return `${componentPath}/README.md`;
}
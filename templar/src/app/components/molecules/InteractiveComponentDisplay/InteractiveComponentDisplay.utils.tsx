import React from 'react';
import type { PropControl } from './InteractiveComponentDisplay.types';

/**
 * Generate JSX code string from props
 */
export const generateCodeString = (
  componentName: string,
  props: Record<string, any>,
  children?: React.ReactNode
): string => {
  const propStrings = Object.entries(props)
    .filter(([_, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => {
      if (typeof value === 'boolean') {
        return value ? key : `${key}={false}`;
      }
      if (typeof value === 'string') {
        return `${key}="${value}"`;
      }
      if (typeof value === 'number') {
        return `${key}={${value}}`;
      }
      if (Array.isArray(value)) {
        return `${key}={${JSON.stringify(value)}}`;
      }
      if (typeof value === 'object') {
        return `${key}={${JSON.stringify(value)}}`;
      }
      return `${key}={${JSON.stringify(value)}}`;
    });

  const hasChildren = children && React.Children.count(children) > 0;
  
  if (propStrings.length === 0) {
    return hasChildren 
      ? `<${componentName}>\n  {/* children */}\n</${componentName}>`
      : `<${componentName} />`;
  }

  const propsString = propStrings.join('\n  ');
  
  if (hasChildren) {
    return `<${componentName}\n  ${propsString}\n>\n  {/* children */}\n</${componentName}>`;
  }

  return propStrings.length === 1 
    ? `<${componentName} ${propStrings[0]} />`
    : `<${componentName}\n  ${propsString}\n/>`;
};

/**
 * Extract component name from React element
 */
export const getComponentName = (element: React.ReactElement): string => {
  if (typeof element.type === 'string') {
    return element.type;
  }
  if (typeof element.type === 'function') {
    return (element.type as any).displayName || (element.type as any).name || 'Component';
  }
  return 'Component';
};

/**
 * Clone element with new props
 */
export const cloneElementWithProps = (
  element: React.ReactElement,
  newProps: Record<string, any>
): React.ReactElement => {
  // Filter out undefined values to avoid overriding default props unnecessarily
  const filteredProps = Object.entries(newProps).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, any>);

  return React.cloneElement(element, filteredProps);
};

/**
 * Get initial props from controls
 */
export const getInitialPropsFromControls = (
  leftControls?: Array<{ controls: PropControl[] }>,
  rightControls?: Array<{ controls: PropControl[] }>,
  initialProps?: Record<string, any>
): Record<string, any> => {
  const props: Record<string, any> = { ...initialProps };
  
  const allControls = [
    ...(leftControls || []).flatMap(group => group.controls),
    ...(rightControls || []).flatMap(group => group.controls),
  ];

  allControls.forEach(control => {
    if (props[control.key] === undefined && control.defaultValue !== undefined) {
      props[control.key] = control.defaultValue;
    }
  });

  return props;
};

/**
 * Validate prop value based on control type
 */
export const validatePropValue = (control: PropControl, value: any): any => {
  switch (control.type) {
    case 'checkbox':
      return Boolean(value);
    
    case 'number':
      const numValue = Number(value);
      if (isNaN(numValue)) return control.defaultValue || 0;
      
      if (control.min !== undefined && numValue < control.min) {
        return control.min;
      }
      if (control.max !== undefined && numValue > control.max) {
        return control.max;
      }
      return numValue;
    
    case 'select':
      if (control.options) {
        const validOption = control.options.find(opt => opt.value === value);
        return validOption ? value : control.defaultValue;
      }
      return value;
    
    case 'text':
    case 'color':
    default:
      return value;
  }
};

/**
 * Generate a unique ID for form elements
 */
export const generateControlId = (controlKey: string, groupTitle: string): string => {
  return `${groupTitle.toLowerCase().replace(/\s+/g, '-')}-${controlKey}`;
};

/**
 * Format prop value for display
 */
export const formatPropValue = (value: any): string => {
  if (value === null || value === undefined) {
    return 'undefined';
  }
  if (typeof value === 'boolean') {
    return value.toString();
  }
  if (typeof value === 'string') {
    return `"${value}"`;
  }
  if (typeof value === 'number') {
    return value.toString();
  }
  if (Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value === 'object') {
    return JSON.stringify(value, null, 2);
  }
  return String(value);
};

/**
 * Check if controls have changed from initial state
 */
export const hasPropsChanged = (
  currentProps: Record<string, any>,
  initialProps: Record<string, any>
): boolean => {
  const currentKeys = Object.keys(currentProps);
  const initialKeys = Object.keys(initialProps);
  
  if (currentKeys.length !== initialKeys.length) {
    return true;
  }
  
  return currentKeys.some(key => currentProps[key] !== initialProps[key]);
};

/**
 * Create common control configurations for atomic components
 */
export const createUniversalControls = () => ({
  appearance: {
    title: 'Appearance',
    controls: [
      {
        key: 'color',
        label: 'Color',
        type: 'select' as const,
        options: [
          { label: 'Primary', value: 'primary' },
          { label: 'Secondary', value: 'secondary' },
          { label: 'Success', value: 'success' },
          { label: 'Warning', value: 'warning' },
          { label: 'Destructive', value: 'destructive' },
          { label: 'Info', value: 'info' },
        ],
        defaultValue: 'primary',
      },
      {
        key: 'variant',
        label: 'Variant',
        type: 'select' as const,
        options: [
          { label: 'Solid', value: 'solid' },
          { label: 'Outline', value: 'outline' },
          { label: 'Ghost', value: 'ghost' },
        ],
        defaultValue: 'solid',
      },
      {
        key: 'size',
        label: 'Size',
        type: 'select' as const,
        options: [
          { label: 'XS', value: 'xs' },
          { label: 'SM', value: 'sm' },
          { label: 'MD', value: 'md' },
          { label: 'LG', value: 'lg' },
          { label: 'XL', value: 'xl' },
        ],
        defaultValue: 'md',
      },
      {
        key: 'shape',
        label: 'Shape',
        type: 'select' as const,
        options: [
          { label: 'Sharp', value: 'sharp' },
          { label: 'Round', value: 'round' },
          { label: 'Pill', value: 'pill' },
        ],
        defaultValue: 'round',
      },
    ],
  },
  state: {
    title: 'State',
    controls: [
      {
        key: 'disabled',
        label: 'Disabled',
        type: 'checkbox' as const,
        defaultValue: false,
      },
      {
        key: 'loading',
        label: 'Loading',
        type: 'checkbox' as const,
        defaultValue: false,
      },
    ],
  },
});
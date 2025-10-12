import type { PropControlGroup, ControlType } from '../../molecules/InteractiveComponentDisplay/InteractiveComponentDisplay.types';

// Universal control groups that most components use
export const universalColorControls: PropControlGroup = {
  title: 'Color & Variant',
  controls: [
    {
      key: 'color',
      label: 'Color',
      type: 'select' as ControlType,
      options: [
        { value: 'primary', label: 'Primary' },
        { value: 'secondary', label: 'Secondary' },
        { value: 'success', label: 'Success' },
        { value: 'warning', label: 'Warning' },
        { value: 'destructive', label: 'Destructive' },
        { value: 'info', label: 'Info' },
        { value: 'custom', label: 'Custom' }
      ]
    },
    {
      key: 'variant',
      label: 'Variant',
      type: 'select' as ControlType,
      options: [
        { value: 'solid', label: 'Solid' },
        { value: 'ghost', label: 'Ghost' },
        { value: 'outline', label: 'Outline' },
        { value: 'glassmorphic', label: 'Glassmorphic' }
      ]
    },
    {
      key: 'customColor',
      label: 'Custom Color',
      type: 'color' as ControlType
    }
  ]
};

export const universalSizeShapeControls: PropControlGroup = {
  title: 'Size & Shape',
  controls: [
    {
      key: 'size',
      label: 'Size',
      type: 'select' as ControlType,
      options: [
        { value: 'xs', label: 'Extra Small' },
        { value: 'sm', label: 'Small' },
        { value: 'md', label: 'Medium' },
        { value: 'lg', label: 'Large' },
        { value: 'xl', label: 'Extra Large' }
      ]
    },
    {
      key: 'shape',
      label: 'Shape',
      type: 'select' as ControlType,
      options: [
        { value: 'sharp', label: 'Sharp' },
        { value: 'round', label: 'Round' },
        { value: 'pill', label: 'Pill' }
      ]
    }
  ]
};

export const universalStateControls: PropControlGroup = {
  title: 'State',
  controls: [
    {
      key: 'disabled',
      label: 'Disabled',
      type: 'checkbox' as ControlType
    },
    {
      key: 'loading',
      label: 'Loading',
      type: 'checkbox' as ControlType
    }
  ]
};

export const universalAnimationControls: PropControlGroup = {
  title: 'Animation',
  controls: [
    {
      key: 'animate',
      label: 'Enable Animations',
      type: 'checkbox' as ControlType
    },
    {
      key: 'animationMode',
      label: 'Animation Mode',
      type: 'select' as ControlType,
      options: [
        { value: 'default', label: 'Default' },
        { value: 'parallax', label: 'Parallax Tilt' },
        { value: 'typewriter', label: 'Typewriter' },
        { value: 'isometric', label: 'Isometric' }
      ]
    }
  ]
};
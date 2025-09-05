import React from 'react';
import { 
  Button, 
  Badge, 
  Card, 
  CheckBox, 
  Toggle, 
  Icon,
  ProgressIndicator,
  Divider
} from '../atoms';
import type { PropControlGroup } from '../molecules/InteractiveComponentDisplay/InteractiveComponentDisplay.types';

interface ComponentConfig {
  component: React.ReactElement;
  leftControls: PropControlGroup[];
  rightControls: PropControlGroup[];
  initialProps: Record<string, any>;
}

// Universal control groups that most components use
const universalColorControls: PropControlGroup = {
  title: 'Color & Variant',
  controls: [
    {
      key: 'color',
      label: 'Color',
      type: 'select',
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
      type: 'select',
      options: [
        { value: 'solid', label: 'Solid' },
        { value: 'ghost', label: 'Ghost' },
        { value: 'outline', label: 'Outline' }
      ]
    },
    {
      key: 'customColor',
      label: 'Custom Color',
      type: 'color'
    }
  ]
};

const universalSizeShapeControls: PropControlGroup = {
  title: 'Size & Shape',
  controls: [
    {
      key: 'size',
      label: 'Size',
      type: 'select',
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
      type: 'select',
      options: [
        { value: 'sharp', label: 'Sharp' },
        { value: 'round', label: 'Round' },
        { value: 'pill', label: 'Pill' }
      ]
    }
  ]
};

const universalStateControls: PropControlGroup = {
  title: 'State',
  controls: [
    {
      key: 'disabled',
      label: 'Disabled',
      type: 'checkbox'
    },
    {
      key: 'loading',
      label: 'Loading',
      type: 'checkbox'
    }
  ]
};

export function getComponentInteractiveConfig(componentName: string): ComponentConfig | null {
  switch (componentName) {
    case 'Button':
      return {
        component: <Button>Click Me</Button>,
        leftControls: [universalColorControls, universalSizeShapeControls],
        rightControls: [
          universalStateControls,
          {
            title: 'Content',
            controls: [
              {
                key: 'children',
                label: 'Button Text',
                type: 'text'
              }
            ]
          }
        ],
        initialProps: {
          color: 'primary',
          variant: 'solid',
          size: 'md',
          shape: 'round',
          children: 'Click Me'
        }
      };

    case 'Badge':
      return {
        component: <Badge>New</Badge>,
        leftControls: [universalColorControls, universalSizeShapeControls],
        rightControls: [
          {
            title: 'Badge Options',
            controls: [
              {
                key: 'children',
                label: 'Badge Text',
                type: 'text'
              },
              {
                key: 'removable',
                label: 'Removable',
                type: 'checkbox'
              }
            ]
          }
        ],
        initialProps: {
          color: 'primary',
          variant: 'solid',
          size: 'md',
          shape: 'round',
          children: 'New',
          removable: false
        }
      };

    case 'Card':
      return {
        component: <Card>Card Content</Card>,
        leftControls: [
          universalColorControls, 
          universalSizeShapeControls,
          universalStateControls
        ],
        rightControls: [
          {
            title: 'Content',
            controls: [
              {
                key: 'header',
                label: 'Header Content',
                type: 'text'
              },
              {
                key: 'children',
                label: 'Card Content',
                type: 'text'
              },
              {
                key: 'footer',
                label: 'Footer Content',
                type: 'text'
              }
            ]
          },
          {
            title: 'Layout & Style',
            controls: [
              {
                key: 'clickable',
                label: 'Clickable',
                type: 'checkbox'
              },
              {
                key: 'animate',
                label: 'Animations',
                type: 'checkbox'
              }
            ]
          }
        ],
        initialProps: {
          color: 'primary',
          variant: 'outline',
          size: 'md',
          shape: 'round',
          children: 'Card Content',
          disabled: false,
          loading: false,
          clickable: false,
          animate: true
        }
      };

    case 'CheckBox':
      return {
        component: <CheckBox label="Check me" />,
        leftControls: [universalColorControls, universalSizeShapeControls],
        rightControls: [
          universalStateControls,
          {
            title: 'CheckBox Options',
            controls: [
              {
                key: 'label',
                label: 'Label Text',
                type: 'text'
              },
              {
                key: 'checked',
                label: 'Checked',
                type: 'checkbox'
              }
            ]
          }
        ],
        initialProps: {
          color: 'primary',
          size: 'md',
          label: 'Check me',
          checked: false
        }
      };

    case 'Toggle':
      return {
        component: <Toggle label="Toggle me" />,
        leftControls: [universalColorControls, universalSizeShapeControls],
        rightControls: [
          universalStateControls,
          {
            title: 'Toggle Options',
            controls: [
              {
                key: 'label',
                label: 'Label Text',
                type: 'text'
              },
              {
                key: 'checked',
                label: 'Checked',
                type: 'checkbox'
              }
            ]
          }
        ],
        initialProps: {
          color: 'primary',
          size: 'md',
          label: 'Toggle me',
          checked: false
        }
      };

    case 'ProgressIndicator':
      return {
        component: <ProgressIndicator type="bar" value={50} />,
        leftControls: [universalColorControls, universalSizeShapeControls],
        rightControls: [
          {
            title: 'Progress Options',
            controls: [
              {
                key: 'type',
                label: 'Type',
                type: 'select',
                options: [
                  { value: 'spinner', label: 'Spinner' },
                  { value: 'bar', label: 'Progress Bar' },
                  { value: 'circular', label: 'Circular' },
                  { value: 'dots', label: 'Dots' }
                ]
              },
              {
                key: 'value',
                label: 'Value',
                type: 'number',
                min: 0,
                max: 100,
                step: 5
              },
              {
                key: 'showPercentage',
                label: 'Show Percentage',
                type: 'checkbox'
              }
            ]
          }
        ],
        initialProps: {
          color: 'primary',
          size: 'md',
          type: 'bar',
          value: 50,
          showPercentage: false
        }
      };

    case 'Divider':
      return {
        component: <Divider />,
        leftControls: [
          {
            title: 'Color & Style',
            controls: [
              {
                key: 'color',
                label: 'Color',
                type: 'select',
                options: [
                  { value: 'muted', label: 'Muted' },
                  { value: 'primary', label: 'Primary' },
                  { value: 'secondary', label: 'Secondary' },
                  { value: 'success', label: 'Success' },
                  { value: 'warning', label: 'Warning' },
                  { value: 'destructive', label: 'Destructive' },
                  { value: 'info', label: 'Info' }
                ]
              },
              {
                key: 'dashed',
                label: 'Dashed',
                type: 'checkbox'
              },
              {
                key: 'dotted',
                label: 'Dotted',
                type: 'checkbox'
              }
            ]
          }
        ],
        rightControls: [
          {
            title: 'Layout Options',
            controls: [
              {
                key: 'orientation',
                label: 'Orientation',
                type: 'select',
                options: [
                  { value: 'horizontal', label: 'Horizontal' },
                  { value: 'vertical', label: 'Vertical' }
                ]
              },
              {
                key: 'label',
                label: 'Label Text',
                type: 'text'
              },
              {
                key: 'spacing',
                label: 'Spacing',
                type: 'select',
                options: [
                  { value: 'none', label: 'None' },
                  { value: 'sm', label: 'Small' },
                  { value: 'md', label: 'Medium' },
                  { value: 'lg', label: 'Large' }
                ]
              }
            ]
          }
        ],
        initialProps: {
          color: 'muted',
          orientation: 'horizontal',
          spacing: 'md',
          dashed: false,
          dotted: false
        }
      };

    case 'Icon':
      return {
        component: <Icon name="HomeShield" />,
        leftControls: [
          {
            title: 'Icon Properties',
            controls: [
              {
                key: 'name',
                label: 'Icon Name',
                type: 'select',
                options: [
                  { value: 'HomeShield', label: 'Home Shield' },
                  { value: 'Component', label: 'Component' },
                  { value: 'Atom', label: 'Atom' },
                  { value: 'Book', label: 'Book' },
                  { value: 'User', label: 'User' },
                  { value: 'Mail', label: 'Mail' },
                  { value: 'Check', label: 'Check' },
                  { value: 'Loading', label: 'Loading' }
                ]
              },
              {
                key: 'size',
                label: 'Size',
                type: 'select',
                options: [
                  { value: 'xs', label: 'Extra Small' },
                  { value: 'sm', label: 'Small' },
                  { value: 'md', label: 'Medium' },
                  { value: 'lg', label: 'Large' },
                  { value: 'xl', label: 'Extra Large' }
                ]
              }
            ]
          }
        ],
        rightControls: [
          {
            title: 'Animation & Color',
            controls: [
              {
                key: 'color',
                label: 'Color',
                type: 'select',
                options: [
                  { value: 'inherit', label: 'Inherit' },
                  { value: 'primary', label: 'Primary' },
                  { value: 'secondary', label: 'Secondary' },
                  { value: 'success', label: 'Success' },
                  { value: 'warning', label: 'Warning' },
                  { value: 'destructive', label: 'Destructive' },
                  { value: 'info', label: 'Info' },
                  { value: 'muted', label: 'Muted' }
                ]
              },
              {
                key: 'spin',
                label: 'Spin Animation',
                type: 'checkbox'
              },
              {
                key: 'pulse',
                label: 'Pulse Animation',
                type: 'checkbox'
              }
            ]
          }
        ],
        initialProps: {
          name: 'HomeShield',
          size: 'md',
          color: 'inherit',
          spin: false,
          pulse: false
        }
      };

    default:
      return null;
  }
}
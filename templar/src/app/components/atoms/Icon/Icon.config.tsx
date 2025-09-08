import React from 'react';
import { Icon } from './Icon';
import type { PropControlGroup, ControlType } from '../../molecules/InteractiveComponentDisplay/InteractiveComponentDisplay.types';

export const IconConfig = {
  component: <Icon name="HomeShield" />,
  leftControls: [
    {
      title: 'Icon Properties',
      controls: [
        {
          key: 'name',
          label: 'Icon Name',
          type: 'select' as ControlType,
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
          type: 'select' as ControlType,
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
          type: 'select' as ControlType,
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
          type: 'checkbox' as ControlType
        },
        {
          key: 'pulse',
          label: 'Pulse Animation',
          type: 'checkbox' as ControlType
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
import React from 'react';
import { Divider } from './Divider';
import type { PropControlGroup, ControlType } from '../../molecules/InteractiveComponentDisplay/InteractiveComponentDisplay.types';

export const DividerConfig = {
  component: <Divider />,
  leftControls: [
    {
      title: 'Color & Style',
      controls: [
        {
          key: 'color',
          label: 'Color',
          type: 'select' as ControlType,
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
          type: 'checkbox' as ControlType
        },
        {
          key: 'dotted',
          label: 'Dotted',
          type: 'checkbox' as ControlType
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
          type: 'select' as ControlType,
          options: [
            { value: 'horizontal', label: 'Horizontal' },
            { value: 'vertical', label: 'Vertical' }
          ]
        },
        {
          key: 'label',
          label: 'Label Text',
          type: 'text' as ControlType
        },
        {
          key: 'spacing',
          label: 'Spacing',
          type: 'select' as ControlType,
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
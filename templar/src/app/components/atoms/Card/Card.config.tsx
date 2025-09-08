import React from 'react';
import { Card } from './Card';
import { universalColorControls, universalSizeShapeControls, universalStateControls } from '../shared/universalControls';
import type { ControlType } from '../../molecules/InteractiveComponentDisplay/InteractiveComponentDisplay.types';

export const CardConfig = {
  component: <Card />,
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
          type: 'text' as ControlType
        },
        {
          key: 'children',
          label: 'Card Content',
          type: 'text' as ControlType
        },
        {
          key: 'footer',
          label: 'Footer Content',
          type: 'text' as ControlType
        }
      ]
    },
    {
      title: 'Layout & Style',
      controls: [
        {
          key: 'clickable',
          label: 'Clickable',
          type: 'checkbox' as ControlType
        },
        {
          key: 'animate',
          label: 'Animations',
          type: 'checkbox' as ControlType
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
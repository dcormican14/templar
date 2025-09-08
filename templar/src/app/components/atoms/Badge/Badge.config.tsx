import React from 'react';
import { Badge } from './Badge';
import { universalColorControls, universalSizeShapeControls } from '../shared/universalControls';
import type { ControlType } from '../../molecules/InteractiveComponentDisplay/InteractiveComponentDisplay.types';

export const BadgeConfig = {
  component: <Badge>New</Badge>,
  leftControls: [universalColorControls, universalSizeShapeControls],
  rightControls: [
    {
      title: 'Badge Options',
      controls: [
        {
          key: 'children',
          label: 'Badge Text',
          type: 'text' as ControlType
        },
        {
          key: 'removable',
          label: 'Removable',
          type: 'checkbox' as ControlType
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
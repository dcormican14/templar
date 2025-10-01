import React from 'react';
import { Toggle } from './Toggle';
import { universalColorControls, universalSizeShapeControls, universalStateControls } from '../shared/universalControls';
import type { ControlType } from '../../molecules/InteractiveComponentDisplay/InteractiveComponentDisplay.types';

export const ToggleConfig = {
  component: <Toggle label="Toggle me" />,
  leftControls: [universalColorControls, universalSizeShapeControls],
  rightControls: [
    {
      title: 'State',
      controls: [
        {
          key: 'disabled',
          label: 'Disabled',
          type: 'checkbox' as ControlType
        }
      ]
    },
    {
      title: 'Toggle Options',
      controls: [
        {
          key: 'label',
          label: 'Label Text',
          type: 'text' as ControlType
        },
      ]
    }
  ],
  initialProps: {
    color: 'primary',
    variant: 'solid',
    size: 'md',
    shape: 'pill',
    label: 'Toggle me',
    checked: false
  }
};
import React from 'react';
import { Toggle } from './Toggle';
import { universalColorControls, universalSizeShapeControls, universalStateControls } from '../shared/universalControls';
import type { ControlType } from '../../molecules/InteractiveComponentDisplay/InteractiveComponentDisplay.types';

export const ToggleConfig = {
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
          type: 'text' as ControlType
        },
        {
          key: 'checked',
          label: 'Checked',
          type: 'checkbox' as ControlType
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
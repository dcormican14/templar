import React from 'react';
import { CheckBox } from './CheckBox';
import { universalColorControls, universalSizeShapeControls, universalStateControls } from '../shared/universalControls';
import type { ControlType } from '../../molecules/InteractiveComponentDisplay/InteractiveComponentDisplay.types';

export const CheckBoxConfig = {
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
    label: 'Check me',
    checked: false
  }
};
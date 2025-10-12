import React from 'react';
import { CheckBox } from './CheckBox';
import { universalColorControls, universalSizeShapeControls, universalStateControls } from '../shared/universalControls';
import type { ControlType } from '../../molecules/InteractiveComponentDisplay/InteractiveComponentDisplay.types';

export const CheckBoxConfig = {
  component: (
    <CheckBox
      label="Check me"
      checked={false}
      onChange={(checked) => console.log('Checkbox changed:', checked)}
    />
  ),
  leftControls: [universalColorControls, universalSizeShapeControls],
  rightControls: [
    {
      title: 'State',
      controls: [
        {
          key: 'disabled',
          label: 'Disabled',
          type: 'checkbox' as ControlType
        },
        {
          key: 'indeterminate',
          label: 'Indeterminate State',
          type: 'checkbox' as ControlType
        },
        {
          key: 'contentToggleable',
          label: 'Label Clickable',
          type: 'checkbox' as ControlType
        },
        {
          key: 'required',
          label: 'Required',
          type: 'checkbox' as ControlType
        },
      ]
    },
    {
      title: 'Labels & Text',
      controls: [
        {
          key: 'label',
          label: 'Label Text',
          type: 'text' as ControlType
        },
        {
          key: 'description',
          label: 'Description',
          type: 'text' as ControlType
        }
      ]
    }
  ],
  initialProps: {
    color: 'primary',
    variant: 'outline',
    size: 'md',
    shape: 'round',
    disabled: false,
    loading: false,
    checked: false,
    indeterminate: false,
    contentToggleable: true,
    label: 'Check me',
    description: '',
    id: 'demo-checkbox',
    name: '',
    value: '',
    required: false,
    error: false,
    // Computed props for callbacks
    _checkboxComputed: true
  }
};
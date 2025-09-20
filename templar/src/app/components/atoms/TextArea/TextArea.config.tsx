import React from 'react';
import { TextArea } from './TextArea';
import { universalColorControls, universalSizeShapeControls, universalStateControls } from '../shared/universalControls';
import type { ControlType } from '../../molecules/InteractiveComponentDisplay/InteractiveComponentDisplay.types';

export const TextAreaConfig = {
  component: (
    <TextArea
      label="Demo TextArea"
      placeholder="Enter your text here..."
      value=""
      onChange={(e) => console.log('TextArea value changed:', e.target.value)}
      minRows={3}
    />
  ),
  leftControls: [universalColorControls, universalSizeShapeControls],
  rightControls: [
    universalStateControls,
    {
      title: 'TextArea Options',
      controls: [
        {
          key: 'resize',
          label: 'Resize Behavior',
          type: 'select' as ControlType,
          options: [
            { label: 'None', value: 'none' },
            { label: 'Both', value: 'both' },
            { label: 'Horizontal', value: 'horizontal' },
            { label: 'Vertical', value: 'vertical' }
          ]
        },
        {
          key: 'value',
          label: 'Text Content',
          type: 'textarea' as ControlType
        },
        {
          key: 'minRows',
          label: 'Minimum Rows',
          type: 'number' as ControlType
        },
        {
          key: 'maxRows',
          label: 'Maximum Rows',
          type: 'number' as ControlType
        },
        {
          key: 'maxLength',
          label: 'Max Character Length',
          type: 'number' as ControlType
        },
        {
          key: 'autoResize',
          label: 'Auto Resize',
          type: 'checkbox' as ControlType
        },
        {
          key: 'showLineNumbers',
          label: 'Show Line Numbers',
          type: 'checkbox' as ControlType
        },
        {
          key: 'showCharacterCount',
          label: 'Show Character Count',
          type: 'checkbox' as ControlType
        },
        {
          key: 'clearOnEscape',
          label: 'Clear on Escape',
          type: 'checkbox' as ControlType
        }
      ]
    },
    {
      title: 'Labels & Text',
      controls: [
        {
          key: 'label',
          label: 'Label',
          type: 'text' as ControlType
        },
        {
          key: 'placeholder',
          label: 'Placeholder',
          type: 'text' as ControlType
        },
        {
          key: 'description',
          label: 'Description',
          type: 'text' as ControlType
        },
        {
          key: 'helperText',
          label: 'Helper Text',
          type: 'text' as ControlType
        },
        {
          key: 'errorMessage',
          label: 'Error Message',
          type: 'text' as ControlType
        }
      ]
    },
    {
      title: 'Icon Options',
      controls: [
        {
          key: 'iconPosition',
          label: 'Icon Position',
          type: 'select' as ControlType,
          options: [
            { label: 'None', value: '' },
            { label: 'Top Left', value: 'top-left' },
            { label: 'Top Right', value: 'top-right' },
            { label: 'Bottom Left', value: 'bottom-left' },
            { label: 'Bottom Right', value: 'bottom-right' }
          ]
        },
        {
          key: 'iconClickable',
          label: 'Icon Clickable',
          type: 'checkbox' as ControlType
        }
      ]
    },
    {
      title: 'Form Options',
      controls: [
        {
          key: 'name',
          label: 'Form Name',
          type: 'text' as ControlType
        },
        {
          key: 'required',
          label: 'Required',
          type: 'checkbox' as ControlType
        },
        {
          key: 'readOnly',
          label: 'Read Only',
          type: 'checkbox' as ControlType
        },
        {
          key: 'autoFocus',
          label: 'Auto Focus',
          type: 'checkbox' as ControlType
        },
        {
          key: 'autoComplete',
          label: 'Auto Complete',
          type: 'select' as ControlType,
          options: [
            { label: 'Off', value: 'off' },
            { label: 'On', value: 'on' },
            { label: 'Street Address', value: 'street-address' },
            { label: 'Address Line 1', value: 'address-line1' },
            { label: 'Address Line 2', value: 'address-line2' }
          ]
        }
      ]
    }
  ],
  initialProps: {
    color: 'primary',
    variant: 'outline',
    size: 'md',
    shape: 'round',
    resize: 'vertical',
    value: '',
    minRows: 3,
    maxRows: undefined,
    maxLength: undefined,
    autoResize: false,
    showLineNumbers: false,
    showCharacterCount: false,
    clearOnEscape: false,
    label: 'Demo TextArea',
    placeholder: 'Enter your text here...',
    description: '',
    helperText: '',
    errorMessage: '',
    iconPosition: '',
    iconClickable: false,
    name: '',
    required: false,
    readOnly: false,
    autoFocus: false,
    autoComplete: 'off',
    // Computed props for callbacks
    _textAreaComputed: true
  }
};
import React from 'react';
import { RadioButton, RadioButtonGroup } from './RadioButton';
import { universalColorControls, universalSizeShapeControls, universalStateControls } from '../shared/universalControls';
import type { ControlType } from '../../molecules/InteractiveComponentDisplay/InteractiveComponentDisplay.types';

export const RadioButtonConfig = {
  component: (
    <RadioButtonGroup
      name="demo-radio-group"
      value="option1"
      options={[
        { value: 'option1', label: 'Option 1', description: 'First choice' },
        { value: 'option2', label: 'Option 2', description: 'Second choice' },
        { value: 'option3', label: 'Option 3', description: 'Third choice' }
      ]}
      onChange={(value) => console.log('Radio button changed:', value)}
    />
  ),
  leftControls: [universalColorControls, universalSizeShapeControls],
  rightControls: [
    universalStateControls,
    {
      title: 'RadioButton Options',
      controls: [
        {
          key: 'componentType',
          label: 'Component Type',
          type: 'select' as ControlType,
          options: [
            { label: 'Single RadioButton', value: 'single' },
            { label: 'RadioButton Group', value: 'group' }
          ]
        },
        {
          key: 'label',
          label: 'Label',
          type: 'text' as ControlType
        },
        {
          key: 'description',
          label: 'Description',
          type: 'text' as ControlType
        },
        {
          key: 'labelPosition',
          label: 'Label Position',
          type: 'select' as ControlType,
          options: [
            { label: 'Right', value: 'right' },
            { label: 'Left', value: 'left' }
          ]
        },
        {
          key: 'contentToggleable',
          label: 'Content Toggleable',
          type: 'checkbox' as ControlType
        },
        {
          key: 'checked',
          label: 'Checked (Single)',
          type: 'checkbox' as ControlType
        },
        {
          key: 'required',
          label: 'Required',
          type: 'checkbox' as ControlType
        }
      ]
    },
    {
      title: 'Group Options',
      controls: [
        {
          key: 'orientation',
          label: 'Orientation',
          type: 'select' as ControlType,
          options: [
            { label: 'Vertical', value: 'vertical' },
            { label: 'Horizontal', value: 'horizontal' }
          ]
        },
        {
          key: 'groupValue',
          label: 'Selected Value',
          type: 'select' as ControlType,
          options: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' }
          ]
        },
        {
          key: 'optionCount',
          label: 'Number of Options',
          type: 'select' as ControlType,
          options: [
            { label: '2 Options', value: '2' },
            { label: '3 Options', value: '3' },
            { label: '4 Options', value: '4' },
            { label: '5 Options', value: '5' }
          ]
        }
      ]
    }
  ],
  initialProps: {
    color: 'primary',
    variant: 'solid',
    size: 'md',
    shape: 'pill',
    componentType: 'group',
    label: 'Sample Option',
    description: 'This is a sample description',
    labelPosition: 'right',
    contentToggleable: true,
    checked: false,
    required: false,
    orientation: 'vertical',
    groupValue: 'option1',
    optionCount: '3',
    // Computed props for rendering
    _componentComputed: true
  }
};
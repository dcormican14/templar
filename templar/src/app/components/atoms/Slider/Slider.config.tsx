import React from 'react';
import { Slider } from './Slider';
import { universalColorControls, universalSizeShapeControls, universalStateControls } from '../shared/universalControls';
import type { ControlType } from '../../molecules/InteractiveComponentDisplay/InteractiveComponentDisplay.types';

export const SliderConfig = {
  component: (
    <Slider
      min={0}
      max={100}
      step={1}
      value={50}
      label="Demo Slider"
      onChange={(value) => console.log('Slider value changed:', value)}
    />
  ),
  leftControls: [universalColorControls, universalSizeShapeControls],
  rightControls: [
    universalStateControls,
    {
      title: 'Slider Options',
      controls: [
        {
          key: 'orientation',
          label: 'Orientation',
          type: 'select' as ControlType,
          options: [
            { label: 'Horizontal', value: 'horizontal' },
            { label: 'Vertical', value: 'vertical' }
          ]
        },
        {
          key: 'value',
          label: 'Current Value',
          type: 'number' as ControlType
        },
        {
          key: 'min',
          label: 'Minimum Value',
          type: 'number' as ControlType
        },
        {
          key: 'max',
          label: 'Maximum Value',
          type: 'number' as ControlType
        },
        {
          key: 'step',
          label: 'Step Increment',
          type: 'number' as ControlType
        },
        {
          key: 'showTooltip',
          label: 'Show Tooltip',
          type: 'checkbox' as ControlType
        },
        {
          key: 'showTicks',
          label: 'Show Tick Marks',
          type: 'checkbox' as ControlType
        },
        {
          key: 'showLabels',
          label: 'Show Min/Max Labels',
          type: 'checkbox' as ControlType
        }
      ]
    },
    {
      title: 'Labels & Text',
      controls: [
        {
          key: 'label',
          label: 'Slider Label',
          type: 'text' as ControlType
        },
        {
          key: 'description',
          label: 'Description',
          type: 'text' as ControlType
        },
        {
          key: 'minLabel',
          label: 'Custom Min Label',
          type: 'text' as ControlType
        },
        {
          key: 'maxLabel',
          label: 'Custom Max Label',
          type: 'text' as ControlType
        },
        {
          key: 'length',
          label: 'Length (px)',
          type: 'number' as ControlType
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
        }
      ]
    }
  ],
  initialProps: {
    color: 'primary',
    variant: 'solid',
    size: 'md',
    shape: 'round',
    orientation: 'horizontal',
    value: 50,
    min: 0,
    max: 100,
    step: 1,
    showTooltip: false,
    showTicks: false,
    showLabels: false,
    label: 'Demo Slider',
    description: '',
    minLabel: '',
    maxLabel: '',
    length: 300,
    name: '',
    required: false,
    readOnly: false,
    autoFocus: false,
    // Computed props for callbacks
    _sliderComputed: true
  }
};
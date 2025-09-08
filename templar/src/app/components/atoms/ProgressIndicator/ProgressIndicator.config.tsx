import React from 'react';
import { ProgressIndicator } from './ProgressIndicator';
import { universalColorControls, universalSizeShapeControls } from '../shared/universalControls';
import type { ControlType } from '../../molecules/InteractiveComponentDisplay/InteractiveComponentDisplay.types';

export const ProgressIndicatorConfig = {
  component: <ProgressIndicator type="bar" value={50} />,
  leftControls: [universalColorControls, universalSizeShapeControls],
  rightControls: [
    {
      title: 'Progress Options',
      controls: [
        {
          key: 'type',
          label: 'Type',
          type: 'select' as ControlType,
          options: [
            { value: 'spinner', label: 'Spinner' },
            { value: 'bar', label: 'Progress Bar' },
            { value: 'circular', label: 'Circular' },
            { value: 'dots', label: 'Dots' }
          ]
        },
        {
          key: 'value',
          label: 'Value',
          type: 'number' as ControlType,
          min: 0,
          max: 100,
          step: 5
        },
        {
          key: 'showPercentage',
          label: 'Show Percentage',
          type: 'checkbox' as ControlType
        }
      ]
    }
  ],
  initialProps: {
    color: 'primary',
    size: 'md',
    type: 'bar',
    value: 50,
    showPercentage: false
  }
};
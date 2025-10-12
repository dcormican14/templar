import React from 'react';
import { ProgressIndicator } from './ProgressIndicator';
import { universalColorControls, universalSizeShapeControls } from '../shared/universalControls';
import type { ControlType } from '../../molecules/InteractiveComponentDisplay/InteractiveComponentDisplay.types';

export const ProgressIndicatorConfig = {
  component: <ProgressIndicator type="circular" variant="solid" showPercentage={true} indeterminate={true} />,
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
            { value: 'bar', label: 'Progress Bar' },
            { value: 'circular', label: 'Circular' }
          ]
        },
        {
          key: 'showPercentage',
          label: 'Show Percentage',
          type: 'checkbox' as ControlType
        },
        {
          key: 'indeterminate',
          label: 'Indeterminate Loading',
          type: 'checkbox' as ControlType
        },
        {
          key: 'autoProgress',
          label: 'Auto Progress',
          type: 'checkbox' as ControlType
        },
        {
          key: 'autoProgressDuration',
          label: 'Auto Duration (ms)',
          type: 'number' as ControlType,
          min: 1000,
          max: 10000,
          step: 500
        }
      ]
    }
  ],
  initialProps: {
    color: 'primary',
    variant: 'solid',
    size: 'md',
    type: 'circular',
    value: 75,
    showPercentage: true,
    indeterminate: true,
    autoProgress: false,
    autoProgressDuration: 3000
  }
};
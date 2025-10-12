import React from 'react';
import { SegmentedControl } from './SegmentedControl';
import { universalColorControls, universalSizeShapeControls, universalStateControls } from '../shared/universalControls';
import type { ControlType, PropControlGroup } from '../../molecules/InteractiveComponentDisplay/InteractiveComponentDisplay.types';

// Custom animation controls for SegmentedControl (only default and isometric)
const segmentedControlAnimationControls: PropControlGroup = {
  title: 'Animation',
  controls: [
    {
      key: 'animate',
      label: 'Enable Animations',
      type: 'checkbox' as ControlType
    },
    {
      key: 'animationMode',
      label: 'Animation Mode',
      type: 'select' as ControlType,
      options: [
        { value: 'default', label: 'Default' },
        { value: 'isometric', label: 'Isometric' }
      ]
    }
  ]
};

export const SegmentedControlConfig = {
  component: (
    <SegmentedControl
      items={['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']}
      selectedIndex={0}
    />
  ),
  leftControls: [universalColorControls, universalSizeShapeControls],
  rightControls: [universalStateControls, segmentedControlAnimationControls],
  initialProps: {
    items: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'],
    color: 'primary',
    variant: 'solid',
    size: 'md',
    shape: 'round',
    selectedIndex: 0, // This will be managed by the component's onChange handler
    animate: true,
    animationMode: 'default'
  }
};
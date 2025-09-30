import React from 'react';
import { SegmentedControl } from './SegmentedControl';
import { universalColorControls, universalSizeShapeControls, universalStateControls } from '../shared/universalControls';
import type { ControlType } from '../../molecules/InteractiveComponentDisplay/InteractiveComponentDisplay.types';

export const SegmentedControlConfig = {
  component: (
    <SegmentedControl
      items={['Option 1', 'Option 2', 'Option 3']}
    />
  ),
  leftControls: [universalColorControls, universalSizeShapeControls],
  rightControls: [
    universalStateControls,
    {
      title: 'SegmentedControl Options',
      controls: [
        {
          key: 'variant',
          label: 'Variant',
          type: 'select' as ControlType,
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
            { label: 'Ghost', value: 'ghost' },
            { label: 'Destructive', value: 'destructive' },
            { label: 'Warning', value: 'warning' },
            { label: 'Success', value: 'success' }
          ]
        },
        {
          key: 'itemCount',
          label: 'Number of Items',
          type: 'select' as ControlType,
          options: [
            { label: '2 Items', value: 2 },
            { label: '3 Items', value: 3 },
            { label: '4 Items', value: 4 },
            { label: '5 Items', value: 5 }
          ]
        },
        {
          key: 'fullWidth',
          label: 'Full Width',
          type: 'checkbox' as ControlType
        },
        {
          key: 'rounded',
          label: 'Rounded',
          type: 'checkbox' as ControlType
        }
      ]
    },
    {
      title: 'Item Customization',
      controls: [
        {
          key: 'item1',
          label: 'Item 1 Text',
          type: 'text' as ControlType
        },
        {
          key: 'item2',
          label: 'Item 2 Text',
          type: 'text' as ControlType
        },
        {
          key: 'item3',
          label: 'Item 3 Text',
          type: 'text' as ControlType
        },
        {
          key: 'item4',
          label: 'Item 4 Text',
          type: 'text' as ControlType
        },
        {
          key: 'item5',
          label: 'Item 5 Text',
          type: 'text' as ControlType
        }
      ]
    }
  ],
  initialProps: {
    color: 'primary',
    variant: 'primary',
    size: 'md',
    shape: 'round',
    selectedIndex: 0,
    itemCount: 3,
    fullWidth: false,
    rounded: false,
    item1: 'Option 1',
    item2: 'Option 2',
    item3: 'Option 3',
    item4: 'Option 4',
    item5: 'Option 5',
    // Computed props for dynamic items array
    _itemsComputed: true
  }
};
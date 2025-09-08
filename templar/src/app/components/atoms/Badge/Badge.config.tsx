import React from 'react';
import { Badge } from './Badge';
import { Icon } from '../Icon';
import type { ControlType } from '../../molecules/InteractiveComponentDisplay/InteractiveComponentDisplay.types';
import { 
  universalColorControls,
  universalSizeShapeControls,
  universalStateControls,
  universalAnimationControls 
} from '../shared/universalControls';

// Define the default icon to use
const defaultIcon = <Icon name="Bell" />;

export const BadgeConfig = {
  component: <Badge icon={defaultIcon} onRemove={() => console.log('Badge removed')}>12+</Badge>,
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
          key: 'removable',
          label: 'Removable',
          type: 'checkbox' as ControlType
        }
      ]
    },
    {
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
            { value: 'typewriter', label: 'Typewriter' },
            { value: 'isometric', label: 'Isometric' }
          ]
        }
      ]
    },
    {
      title: 'Content',
      controls: [
        {
          key: 'children',
          label: 'Badge Text',
          type: 'text' as ControlType
        },
        {
          key: 'icon',
          label: 'Icon',
          type: 'checkbox' as ControlType
        },
        {
          key: 'iconPosition',
          label: 'Icon Position',
          type: 'select' as ControlType,
          options: [
            { value: 'leading', label: 'Leading' },
            { value: 'trailing', label: 'Trailing' }
          ]
        },
      ]
    }
  ],
  initialProps: {
    color: 'primary',
    variant: 'solid',
    size: 'md',
    shape: 'round',
    icon: true, // Boolean for the checkbox control
    iconPosition: 'leading',
    children: '12+',
    removable: false,
    onRemove: () => console.log('Badge removed'),
    animate: true,
    animationMode: 'default',
    // Store the actual icon component for reference
    _defaultIcon: defaultIcon
  }
};
import React from 'react';
import { Button } from './Button';
import { Icon } from '../Icon';
import type { ControlType } from '../../molecules/InteractiveComponentDisplay/InteractiveComponentDisplay.types';
import { 
  universalColorControls,
  universalSizeShapeControls,
  universalStateControls,
  universalAnimationControls 
} from '../shared/universalControls';

// Define the default icon to use
const defaultIcon = <Icon name="RoundFlask" />;

export const ButtonConfig = {
  component: <Button icon={defaultIcon}>Welcome To The Lab</Button>,
  leftControls: [universalColorControls, universalSizeShapeControls],
  rightControls: [
    universalStateControls,
    universalAnimationControls,
    {
      title: 'Content',
      controls: [
        {
          key: 'children',
          label: 'Button Text',
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
        }
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
    children: 'Welcome To The Lab',
    animate: true,
    animationMode: 'default',
    // Store the actual icon component for reference
    _defaultIcon: defaultIcon
  }
};
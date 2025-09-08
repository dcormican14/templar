import React from 'react';
import { Card } from './Card';
import { universalColorControls, universalSizeShapeControls, universalStateControls, universalAnimationControls } from '../shared/universalControls';
import type { ControlType } from '../../molecules/InteractiveComponentDisplay/InteractiveComponentDisplay.types';

export const CardConfig = {
  component: <Card />,
  leftControls: [
    universalColorControls, 
    universalSizeShapeControls,
    {
      title: 'Layout & Behavior',
      controls: [
        {
          key: 'clickable',
          label: 'Clickable',
          type: 'checkbox' as ControlType
        },
        {
          key: 'padding',
          label: 'Padding',
          type: 'select' as ControlType,
          options: [
            { value: 'none', label: 'None' },
            { value: 'xs', label: 'Extra Small' },
            { value: 'sm', label: 'Small' },
            { value: 'md', label: 'Medium' },
            { value: 'lg', label: 'Large' },
            { value: 'xl', label: 'Extra Large' }
          ]
        }
      ]
    },
    universalAnimationControls,
  ],
  rightControls: [
    universalStateControls,
    {
      title: 'Content',
      controls: [
        {
          key: 'children',
          label: 'Card Content',
          type: 'text' as ControlType
        },
        {
          key: 'header',
          label: 'Header Text',
          type: 'text' as ControlType
        },
        {
          key: 'headerAlignment',
          label: 'Header Alignment',
          type: 'select' as ControlType,
          options: [
            { value: 'left', label: 'Left' },
            { value: 'center', label: 'Center' },
            { value: 'right', label: 'Right' }
          ]
        },
        {
          key: 'footer',
          label: 'Footer Text',
          type: 'text' as ControlType
        },
        {
          key: 'footerAlignment',
          label: 'Footer Alignment',
          type: 'select' as ControlType,
          options: [
            { value: 'left', label: 'Left' },
            { value: 'center', label: 'Center' },
            { value: 'right', label: 'Right' }
          ]
        }
      ]
    },
    
  ],
  initialProps: {
    color: 'primary',
    variant: 'outline',
    size: 'md',
    shape: 'round',
    children: 'This is the main card content area',
    header: 'Card Header',
    footer: 'Card Footer',
    headerAlignment: 'left',
    footerAlignment: 'left',
    disabled: false,
    loading: false,
    clickable: false,
    animate: true,
    animationMode: 'default',
    padding: 'md'
  }
};
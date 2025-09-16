import React, { useState } from 'react';
import { Dropdown } from './Dropdown';
import { universalColorControls, universalSizeShapeControls, universalStateControls, universalAnimationControls } from '../shared/universalControls';
import type { ControlType } from '../../molecules/InteractiveComponentDisplay/InteractiveComponentDisplay.types';

// Stateful wrapper for the demo
const StatefulDropdown = (props: any) => {
  const [value, setValue] = useState<string | number | (string | number)[] | undefined>(undefined);
  return <Dropdown {...props} value={value} onChange={setValue} />;
};

export const DropdownConfig = {
  component: <StatefulDropdown />,
  leftControls: [
    universalColorControls, 
    universalSizeShapeControls,
    {
      title: 'Dropdown Behavior',
      controls: [
        {
          key: 'multiple',
          label: 'Multiple Selection',
          type: 'checkbox' as ControlType
        },
        {
          key: 'searchable',
          label: 'Searchable',
          type: 'checkbox' as ControlType
        },
        {
          key: 'showArrow',
          label: 'Show Arrow',
          type: 'checkbox' as ControlType
        }
      ]
    },
    universalAnimationControls,
  ],
  rightControls: [
    universalStateControls,
    {
      title: 'Error State',
      controls: [
        {
          key: 'error',
          label: 'Error State',
          type: 'checkbox' as ControlType
        },
        {
          key: 'errorText',
          label: 'Error Text',
          type: 'text' as ControlType
        }
      ]
    },
    {
      title: 'Content & Layout',
      controls: [
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
          key: 'placeholder',
          label: 'Placeholder Text',
          type: 'text' as ControlType
        },
        {
          key: 'searchPlaceholder',
          label: 'Search Placeholder',
          type: 'text' as ControlType
        },
        {
          key: 'position',
          label: 'Menu Position',
          type: 'select' as ControlType,
          options: [
            { value: 'bottom-start', label: 'Bottom Start' },
            { value: 'bottom-end', label: 'Bottom End' },
            { value: 'top-start', label: 'Top Start' },
            { value: 'top-end', label: 'Top End' },
            { value: 'left', label: 'Left' },
            { value: 'right', label: 'Right' }
          ]
        },
      ]
    },
  ],
  initialProps: {
    color: 'primary',
    variant: 'outline',
    size: 'md',
    shape: 'round',
    disabled: false,
    loading: false,
    animate: true,
    animationMode: 'default',
    placeholder: 'Select an option...',
    searchPlaceholder: 'Search options...',
    multiple: false,
    searchable: true,
    showArrow: true,
    position: 'bottom-start',
    maxHeight: '300px',
    emptyMessage: 'No options available',
    noResultsMessage: 'No results found',
    error: false,
    errorText: 'This field has an error',
    header: undefined,
    headerAlignment: 'left',
    options: [
      {
        value: 'react',
        label: 'React',
        description: 'A JavaScript library for building user interfaces'
      },
      {
        value: 'vue',
        label: 'Vue.js',
        description: 'The Progressive JavaScript Framework'
      },
      {
        value: 'angular',
        label: 'Angular',
        description: 'Platform for building mobile and desktop web applications'
      },
      {
        value: 'svelte',
        label: 'Svelte',
        description: 'Cybernetically enhanced web apps'
      },
      {
        value: 'solid',
        label: 'SolidJS',
        description: 'Simple and performant reactivity for building user interfaces'
      },
      {
        value: 'qwik',
        label: 'Qwik',
        description: 'The HTML-first framework'
      }
    ]
  }
};
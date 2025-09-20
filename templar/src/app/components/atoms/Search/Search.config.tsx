import React from 'react';
import { Search } from './Search';
import { universalColorControls, universalSizeShapeControls, universalStateControls } from '../shared/universalControls';
import type { ControlType } from '../../molecules/InteractiveComponentDisplay/InteractiveComponentDisplay.types';

export const SearchConfig = {
  component: (
    <Search
      placeholder="Search for anything..."
      value=""
      onChange={(value) => console.log('Search value changed:', value)}
      onSearch={(value) => console.log('Search submitted:', value)}
      onClear={() => console.log('Search cleared')}
    />
  ),
  leftControls: [universalColorControls, universalSizeShapeControls],
  rightControls: [
    universalStateControls,
    {
      title: 'Search Options',
      controls: [
        {
          key: 'placeholder',
          label: 'Placeholder',
          type: 'text' as ControlType
        },
        {
          key: 'value',
          label: 'Search Value',
          type: 'text' as ControlType
        },
        {
          key: 'showSearchIcon',
          label: 'Show Search Icon',
          type: 'checkbox' as ControlType
        },
        {
          key: 'showClearButton',
          label: 'Show Clear Button',
          type: 'checkbox' as ControlType
        },
        {
          key: 'searchIconPosition',
          label: 'Search Icon Position',
          type: 'select' as ControlType,
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' }
          ]
        },
        {
          key: 'clearOnEscape',
          label: 'Clear on Escape',
          type: 'checkbox' as ControlType
        },
        {
          key: 'debounceDelay',
          label: 'Debounce Delay (ms)',
          type: 'number' as ControlType
        }
      ]
    },
    {
      title: 'Form Options',
      controls: [
        {
          key: 'label',
          label: 'Label',
          type: 'text' as ControlType
        },
        {
          key: 'helperText',
          label: 'Helper Text',
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
        },
        {
          key: 'autoComplete',
          label: 'Auto Complete',
          type: 'select' as ControlType,
          options: [
            { label: 'Off', value: 'off' },
            { label: 'On', value: 'on' },
            { label: 'Name', value: 'name' },
            { label: 'Email', value: 'email' },
            { label: 'Username', value: 'username' },
            { label: 'Organization', value: 'organization' }
          ]
        }
      ]
    }
  ],
  initialProps: {
    color: 'primary',
    variant: 'outline',
    size: 'md',
    shape: 'round',
    placeholder: 'Search for anything...',
    value: '',
    showSearchIcon: true,
    showClearButton: true,
    searchIconPosition: 'left',
    clearOnEscape: true,
    debounceDelay: 300,
    label: '',
    helperText: '',
    required: false,
    readOnly: false,
    autoFocus: false,
    autoComplete: 'off',
    // Computed props for callbacks
    _callbacksComputed: true
  }
};
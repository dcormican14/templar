import React from 'react';
import { Navigation } from './Navigation';
import { universalColorControls, universalSizeShapeControls, universalStateControls } from '../../atoms/shared/universalControls';
import type { ControlType } from '../../molecules/InteractiveComponentDisplay/InteractiveComponentDisplay.types';

export const NavigationConfig = {
  component: (
    <Navigation
      appName="My App"
      tabs={[
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'contact', label: 'Contact' }
      ]}
      activeTab="home"
      onTabChange={(tabId) => console.log('Tab changed:', tabId)}
      onBrandClick={() => console.log('Brand clicked')}
    />
  ),
  leftControls: [
    {
      title: 'Layout & Style',
      controls: [
        {
          key: 'variant',
          label: 'Variant',
          type: 'select' as ControlType,
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Elevated', value: 'elevated' },
            { label: 'Bordered', value: 'bordered' },
            { label: 'Minimal', value: 'minimal' }
          ]
        },
        {
          key: 'size',
          label: 'Size',
          type: 'select' as ControlType,
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' }
          ]
        },
        {
          key: 'sticky',
          label: 'Sticky Position',
          type: 'checkbox' as ControlType
        },
        {
          key: 'fullWidth',
          label: 'Full Width',
          type: 'checkbox' as ControlType
        },
        {
          key: 'maxWidth',
          label: 'Max Width (px)',
          type: 'text' as ControlType
        }
      ]
    }
  ],
  rightControls: [
    universalStateControls,
    {
      title: 'Brand Configuration',
      controls: [
        {
          key: 'showBrand',
          label: 'Show Brand',
          type: 'checkbox' as ControlType
        },
        {
          key: 'appName',
          label: 'App Name',
          type: 'text' as ControlType
        },
        {
          key: 'showBrandIcon',
          label: 'Show Brand Icon',
          type: 'checkbox' as ControlType
        }
      ]
    },
    {
      title: 'Tab Configuration',
      controls: [
        {
          key: 'tabCount',
          label: 'Number of Tabs',
          type: 'select' as ControlType,
          options: [
            { label: '1 Tab', value: '1' },
            { label: '2 Tabs', value: '2' },
            { label: '3 Tabs', value: '3' },
            { label: '4 Tabs', value: '4' },
            { label: '5 Tabs', value: '5' }
          ]
        },
        {
          key: 'activeTab',
          label: 'Active Tab Index',
          type: 'select' as ControlType,
          options: [
            { label: 'Tab 1', value: 'tab1' },
            { label: 'Tab 2', value: 'tab2' },
            { label: 'Tab 3', value: 'tab3' },
            { label: 'Tab 4', value: 'tab4' },
            { label: 'Tab 5', value: 'tab5' }
          ]
        },
        {
          key: 'showTabIcons',
          label: 'Show Tab Icons',
          type: 'checkbox' as ControlType
        },
        {
          key: 'showTabBadges',
          label: 'Show Tab Badges',
          type: 'checkbox' as ControlType
        }
      ]
    },
    {
      title: 'Tab Customization',
      controls: [
        {
          key: 'tab1Label',
          label: 'Tab 1 Label',
          type: 'text' as ControlType
        },
        {
          key: 'tab1Badge',
          label: 'Tab 1 Badge',
          type: 'text' as ControlType
        },
        {
          key: 'tab1Disabled',
          label: 'Tab 1 Disabled',
          type: 'checkbox' as ControlType
        },
        {
          key: 'tab2Label',
          label: 'Tab 2 Label',
          type: 'text' as ControlType
        },
        {
          key: 'tab2Badge',
          label: 'Tab 2 Badge',
          type: 'text' as ControlType
        },
        {
          key: 'tab2Disabled',
          label: 'Tab 2 Disabled',
          type: 'checkbox' as ControlType
        },
        {
          key: 'tab3Label',
          label: 'Tab 3 Label',
          type: 'text' as ControlType
        },
        {
          key: 'tab3Badge',
          label: 'Tab 3 Badge',
          type: 'text' as ControlType
        },
        {
          key: 'tab3Disabled',
          label: 'Tab 3 Disabled',
          type: 'checkbox' as ControlType
        },
        {
          key: 'tab4Label',
          label: 'Tab 4 Label',
          type: 'text' as ControlType
        },
        {
          key: 'tab4Badge',
          label: 'Tab 4 Badge',
          type: 'text' as ControlType
        },
        {
          key: 'tab4Disabled',
          label: 'Tab 4 Disabled',
          type: 'checkbox' as ControlType
        },
        {
          key: 'tab5Label',
          label: 'Tab 5 Label',
          type: 'text' as ControlType
        },
        {
          key: 'tab5Badge',
          label: 'Tab 5 Badge',
          type: 'text' as ControlType
        },
        {
          key: 'tab5Disabled',
          label: 'Tab 5 Disabled',
          type: 'checkbox' as ControlType
        }
      ]
    },
    {
      title: 'Content Areas',
      controls: [
        {
          key: 'showLeadingContent',
          label: 'Show Leading Content',
          type: 'checkbox' as ControlType
        },
        {
          key: 'leadingContentType',
          label: 'Leading Content Type',
          type: 'select' as ControlType,
          options: [
            { label: 'Search Box', value: 'search' },
            { label: 'Button', value: 'button' },
            { label: 'Custom Text', value: 'text' }
          ]
        },
        {
          key: 'showTrailingContent',
          label: 'Show Trailing Content',
          type: 'checkbox' as ControlType
        },
        {
          key: 'trailingContentType',
          label: 'Trailing Content Type',
          type: 'select' as ControlType,
          options: [
            { label: 'User Profile', value: 'profile' },
            { label: 'Settings', value: 'settings' },
            { label: 'Button', value: 'button' },
            { label: 'Custom Text', value: 'text' }
          ]
        }
      ]
    }
  ],
  initialProps: {
    variant: 'default',
    size: 'md',
    sticky: false,
    fullWidth: false,
    maxWidth: '',
    disabled: false,
    loading: false,
    showBrand: true,
    appName: 'My App',
    showBrandIcon: false,
    tabCount: 3,
    activeTab: 'tab1',
    showTabIcons: false,
    showTabBadges: false,
    tab1Label: 'Home',
    tab1Badge: '',
    tab1Disabled: false,
    tab2Label: 'About',
    tab2Badge: '',
    tab2Disabled: false,
    tab3Label: 'Contact',
    tab3Badge: '',
    tab3Disabled: false,
    tab4Label: 'Services',
    tab4Badge: '',
    tab4Disabled: false,
    tab5Label: 'Blog',
    tab5Badge: '',
    tab5Disabled: false,
    showLeadingContent: false,
    leadingContentType: 'search',
    showTrailingContent: false,
    trailingContentType: 'profile',
    // Computed props for dynamic configuration
    _navigationComputed: true
  }
};
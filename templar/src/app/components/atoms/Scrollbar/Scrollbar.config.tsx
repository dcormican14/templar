import React from 'react';
import { Scrollbar } from './Scrollbar';
import { universalColorControls, universalSizeShapeControls, universalStateControls, universalAnimationControls } from '../shared/universalControls';
import type { ControlType } from '../../molecules/InteractiveComponentDisplay/InteractiveComponentDisplay.types';

// Demo content for scrollbar
const DemoContent = () => (
  <div style={{ padding: '20px' }}>
    <h3 style={{ marginBottom: '16px' }}>Scrollable Content</h3>
    <p style={{ marginBottom: '12px' }}>
      This is a demonstration of the Scrollbar component with various styling options.
    </p>
    {Array.from({ length: 20 }, (_, i) => (
      <div key={i} style={{ 
        padding: '12px', 
        marginBottom: '8px',
        backgroundColor: 'var(--card-background)',
        border: '1px solid var(--border)',
        textWrap:'wrap',
        width: '500px',
      }}>
        <h4>Section {i + 1}</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
    ))}
  </div>
);

export const ScrollbarConfig = {
  component: (
    <Scrollbar>
      <DemoContent />
    </Scrollbar>
  ),
  leftControls: [
    {
    title: 'Color & Variant',
    controls: [
      {
        key: 'color',
        label: 'Color',
        type: 'select' as ControlType,
        options: [
          { value: 'primary', label: 'Primary' },
          { value: 'secondary', label: 'Secondary' },
          { value: 'success', label: 'Success' },
          { value: 'warning', label: 'Warning' },
          { value: 'destructive', label: 'Destructive' },
          { value: 'info', label: 'Info' },
        ]
      },
      {
        key: 'variant',
          label: 'Variant',
          type: 'select' as ControlType,
          options: [
            { value: 'outline', label: 'Outline' },
            { value: 'solid', label: 'Solid' },
            { value: 'ghost', label: 'Ghost' },
            { value: 'glassmorphic', label: 'Glassmorphic' },
            { value: 'invisible', label: 'Invisible' },
          ]
      },
      {
        key: 'customColor',
        label: 'Custom Color',
        type: 'color' as ControlType
      }
    ]
    },
    universalSizeShapeControls,
    {
      title: 'State',
      controls: [
        {
          key: 'disabled',
          label: 'Disabled',
          type: 'checkbox' as ControlType
        },
      ]
    },
  ],
  rightControls: [
    {
      title: 'Scrollbar Behavior',
      controls: [
        {
          key: 'orientation',
          label: 'Orientation',
          type: 'select' as ControlType,
          options: [
            { value: 'vertical', label: 'Vertical' },
            { value: 'horizontal', label: 'Horizontal' },
            { value: 'both', label: 'Both' }
          ]
        },
        {
          key: 'alignment',
          label: 'Alignment',
          type: 'select' as ControlType,
          options: [
            { value: 'start', label: 'Start (Left/Top)' },
            { value: 'end', label: 'End (Right/Bottom)' }
          ]
        },
        {
          key: 'hideNative',
          label: 'Hide Native Scrollbar',
          type: 'checkbox' as ControlType
        },
        {
          key: 'smoothScrolling',
          label: 'Smooth Scrolling',
          type: 'checkbox' as ControlType
        },
        {
          key: 'momentum',
          label: 'Momentum Scrolling',
          type: 'checkbox' as ControlType
        },
        {
          key: 'showIndicators',
          label: 'Show Indicators',
          type: 'checkbox' as ControlType
        }
      ]
    },
    {
      title: 'Dimensions',
      controls: [
        {
          key: 'width',
          label: 'Width',
          type: 'text' as ControlType
        },
        {
          key: 'height',
          label: 'Height',
          type: 'text' as ControlType
        }
      ]
    },
  ],
  initialProps: {
    color: 'primary',
    variant: 'outline',
    size: 'md',
    shape: 'round',
    orientation: 'vertical',
    alignment: 'end',
    hideNative: false,
    smoothScrolling: true,
    momentum: true,
    showIndicators: false,
    disabled: false,
    animate: true,
    animationMode: 'default',
    width: '400px',
    height: '400px'
  }
};
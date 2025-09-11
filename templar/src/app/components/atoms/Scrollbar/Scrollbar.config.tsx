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
        border: '1px solid var(--border)'
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
    universalColorControls,
    {
      title: 'Variant',
      controls: [
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
        }
      ]
    },
    universalSizeShapeControls,
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
          key: 'visibility',
          label: 'Visibility',
          type: 'select' as ControlType,
          options: [
            { value: 'always', label: 'Always' },
            { value: 'hover', label: 'On Hover' },
            { value: 'auto', label: 'Auto' },
            { value: 'hidden', label: 'Hidden' }
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
    universalAnimationControls,
  ],
  rightControls: [
    universalStateControls,
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
          type: 'number' as ControlType
        }
      ]
    },
    {
      title: 'Auto Hide',
      controls: [
        {
          key: 'autoHideDelay',
          label: 'Auto Hide Delay (ms)',
          type: 'number' as ControlType
        }
      ]
    }
  ],
  initialProps: {
    color: 'primary',
    variant: 'outline',
    size: 'md',
    shape: 'round',
    orientation: 'vertical',
    alignment: 'end',
    visibility: 'hover',
    hideNative: false,
    smoothScrolling: true,
    momentum: true,
    showIndicators: false,
    disabled: false,
    animate: true,
    animationMode: 'default',
    width: '100%',
    height: 400,
    autoHideDelay: 1000
  }
};
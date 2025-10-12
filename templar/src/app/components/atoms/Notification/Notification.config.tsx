import React from 'react';
import { Notification } from './Notification';
import { universalColorControls, universalSizeShapeControls, universalStateControls } from '../shared/universalControls';
import type { ControlType } from '../../molecules/InteractiveComponentDisplay/InteractiveComponentDisplay.types';

export const NotificationConfig = {
  component: (
    <Notification
      title="Success Notification"
      description="Your action has been completed successfully."
      onDismiss={() => console.log('Notification dismissed')}
      actions={[
        { label: 'Confirm', onClick: () => console.log('Confirm clicked') },
        { label: 'Cancel', onClick: () => console.log('Cancel clicked'), variant: 'outline' }
      ]}
    />
  ),
  leftControls: [universalColorControls, universalSizeShapeControls],
  rightControls: [
    universalStateControls,
    {
      title: 'Notification Options',
      controls: [
        {
          key: 'title',
          label: 'Title',
          type: 'text' as ControlType
        },
        {
          key: 'description',
          label: 'Description',
          type: 'textarea' as ControlType
        },
        {
          key: 'dismissible',
          label: 'Dismissible',
          type: 'checkbox' as ControlType
        },
        {
          key: 'showIcon',
          label: 'Show Icon',
          type: 'checkbox' as ControlType
        },
        {
          key: 'duration',
          label: 'Auto-dismiss (ms)',
          type: 'number' as ControlType
        },
        {
          key: 'showProgress',
          label: 'Show Progress',
          type: 'checkbox' as ControlType
        },
        {
          key: 'toastPosition',
          label: 'Toast Position',
          type: 'select' as ControlType,
          options: [
            { label: 'Top Right', value: 'top-right' },
            { label: 'Top Left', value: 'top-left' },
            { label: 'Top Center', value: 'top-center' },
            { label: 'Bottom Right', value: 'bottom-right' },
            { label: 'Bottom Left', value: 'bottom-left' },
            { label: 'Bottom Center', value: 'bottom-center' }
          ]
        }
      ]
    },
    {
      title: 'Actions',
      controls: [
        {
          key: 'hasActions',
          label: 'Show Actions',
          type: 'checkbox' as ControlType
        },
        {
          key: 'actionLabel1',
          label: 'Action 1 Label',
          type: 'text' as ControlType
        },
        {
          key: 'actionLabel2',
          label: 'Action 2 Label',
          type: 'text' as ControlType
        }
      ]
    }
  ],
  initialProps: {
    color: 'success',
    variant: 'solid',
    size: 'md',
    shape: 'round',
    title: 'Success Notification',
    description: 'Your action has been completed successfully.',
    dismissible: true,
    showIcon: true,
    duration: null,
    showProgress: false,
    toastPosition: 'top-right',
    hasActions: false,
    actionLabel1: 'Confirm',
    actionLabel2: 'Cancel',
    // Computed actions based on hasActions
    _actionsComputed: true
  }
};
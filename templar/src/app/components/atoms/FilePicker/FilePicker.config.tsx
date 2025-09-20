import React from 'react';
import { FilePicker } from './FilePicker';
import { universalColorControls, universalSizeShapeControls, universalStateControls } from '../shared/universalControls';
import type { ControlType } from '../../molecules/InteractiveComponentDisplay/InteractiveComponentDisplay.types';

export const FilePickerConfig = {
  component: <FilePicker uploadText="Drop files here or click to browse" subText="Supports any file type" />,
  leftControls: [universalColorControls, universalSizeShapeControls],
  rightControls: [
    universalStateControls,
    {
      title: 'FilePicker Options',
      controls: [
        {
          key: 'accept',
          label: 'Accept Types',
          type: 'select' as ControlType,
          options: [
            { label: 'Any File', value: '' },
            { label: 'Images Only', value: 'image/*' },
            { label: 'Documents', value: '.pdf,.doc,.docx,.txt' },
            { label: 'Images & PDFs', value: 'image/*,.pdf' },
            { label: 'Audio Files', value: 'audio/*' },
            { label: 'Video Files', value: 'video/*' },
            { label: 'CSV/Excel', value: '.csv,.xlsx,.xls' },
            { label: 'Code Files', value: '.js,.ts,.tsx,.jsx,.html,.css,.json' }
          ]
        },
        {
          key: 'multiple',
          label: 'Multiple Files',
          type: 'checkbox' as ControlType
        },
        {
          key: 'showFileList',
          label: 'Show File List',
          type: 'checkbox' as ControlType
        },
        {
          key: 'uploadText',
          label: 'Upload Text',
          type: 'text' as ControlType
        },
        {
          key: 'subText',
          label: 'Sub Text',
          type: 'text' as ControlType
        },
        {
          key: 'helperText',
          label: 'Helper Text',
          type: 'text' as ControlType
        },
        {
          key: 'maxSize',
          label: 'Max Size (MB)',
          type: 'number' as ControlType
        },
        {
          key: 'maxFiles',
          label: 'Max Files',
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
    accept: '',
    multiple: false,
    showFileList: true,
    uploadText: 'Drop files here or click to browse',
    subText: 'Supports any file type',
    helperText: '',
    maxSize: undefined,
    maxFiles: undefined
  }
};
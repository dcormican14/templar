import React from 'react';
import type { PropControlGroup } from '../molecules/InteractiveComponentDisplay/InteractiveComponentDisplay.types';

// Import individual component configs
import { ButtonConfig } from '../atoms/Button/Button.config';
import { BadgeConfig } from '../atoms/Badge/Badge.config';
import { CardConfig } from '../atoms/Card/Card.config';
import { CheckBoxConfig } from '../atoms/CheckBox/CheckBox.config';
import { CodeBlockConfig } from '../atoms/CodeBlock/CodeBlock.config';
import { DropdownConfig } from '../atoms/Dropdown';
import { FilePickerConfig } from '../atoms/FilePicker/FilePicker.config';
import { ToggleConfig } from '../atoms/Toggle/Toggle.config';
import { NotificationConfig } from '../atoms/Notification/Notification.config';
import { ProgressIndicatorConfig } from '../atoms/ProgressIndicator/ProgressIndicator.config';
import { DividerConfig } from '../atoms/Divider/Divider.config';
import { IconConfig } from '../atoms/Icon/Icon.config';
import { ScrollbarConfig } from '../atoms/Scrollbar/Scrollbar.config';
import { RadioButtonConfig } from '../atoms/RadioButton/RadioButton.config';
import { SearchConfig } from '../atoms/Search/Search.config';
import { SegmentedControlConfig } from '../atoms/SegmentedControl/SegmentedControl.config';
import { SliderConfig } from '../atoms/Slider/Slider.config';
import { TextAreaConfig } from '../atoms/TextArea/TextArea.config';
import { NavigationConfig } from '../molecules/Navigation/Navigation.config';

interface ComponentConfig {
  component: React.ReactElement;
  leftControls: PropControlGroup[];
  rightControls: PropControlGroup[];
  initialProps: Record<string, any>;
  getComponentName?: (props: Record<string, any>) => string;
  generateCodeString?: (props: Record<string, any>) => string;
}

export function getComponentInteractiveConfig(componentName: string): ComponentConfig | null {
  switch (componentName) {
    case 'Button':
      return ButtonConfig;

    case 'Badge':
      return BadgeConfig;

    case 'Card':
      return CardConfig;

    case 'CheckBox':
      return CheckBoxConfig;

    case 'CodeBlock':
      return CodeBlockConfig;

    case 'Dropdown':
      return DropdownConfig;

    case 'FilePicker':
      return FilePickerConfig;

    case 'Toggle':
      return ToggleConfig;

    case 'Notification':
      return NotificationConfig;

    case 'ProgressIndicator':
      return ProgressIndicatorConfig;

    case 'Divider':
      return DividerConfig;

    case 'Icon':
      return IconConfig;

    case 'Scrollbar':
      return ScrollbarConfig;

    case 'RadioButton':
      return RadioButtonConfig;

    case 'Search':
      return SearchConfig;

    case 'SegmentedControl':
      return SegmentedControlConfig;

    case 'Slider':
      return SliderConfig;

    case 'TextArea':
      return TextAreaConfig;

    case 'Navigation':
      return NavigationConfig;

    default:
      return null;
  }
}
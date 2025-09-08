import React from 'react';
import type { PropControlGroup } from '../molecules/InteractiveComponentDisplay/InteractiveComponentDisplay.types';

// Import individual component configs
import { ButtonConfig } from '../atoms/Button/Button.config';
import { BadgeConfig } from '../atoms/Badge/Badge.config';
import { CardConfig } from '../atoms/Card/Card.config';
import { CheckBoxConfig } from '../atoms/CheckBox/CheckBox.config';
import { ToggleConfig } from '../atoms/Toggle/Toggle.config';
import { ProgressIndicatorConfig } from '../atoms/ProgressIndicator/ProgressIndicator.config';
import { DividerConfig } from '../atoms/Divider/Divider.config';
import { IconConfig } from '../atoms/Icon/Icon.config';

interface ComponentConfig {
  component: React.ReactElement;
  leftControls: PropControlGroup[];
  rightControls: PropControlGroup[];
  initialProps: Record<string, any>;
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

    case 'Toggle':
      return ToggleConfig;

    case 'ProgressIndicator':
      return ProgressIndicatorConfig;

    case 'Divider':
      return DividerConfig;

    case 'Icon':
      return IconConfig;

    default:
      return null;
  }
}
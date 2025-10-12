import React, { useState, useEffect } from 'react';
import { RadioButton, RadioButtonGroup } from './RadioButton';
import { universalColorControls, universalSizeShapeControls, universalStateControls } from '../shared/universalControls';
import type { ControlType } from '../../molecules/InteractiveComponentDisplay/InteractiveComponentDisplay.types';

// Dynamic wrapper component for RadioButton demo
const DynamicRadioButtonDemo: React.FC<any> = (props) => {
  const [selectedValue, setSelectedValue] = useState<string>('option1');
  const [singleChecked, setSingleChecked] = useState<boolean>(props.checked || false);

  // Sync single checked state with props when componentType or checked changes
  useEffect(() => {
    if (props.componentType === 'single') {
      setSingleChecked(props.checked || false);
    }
  }, [props.componentType, props.checked]);

  // Generate options based on optionCount
  const generateOptions = (count: number) => {
    const optionLabels = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];
    return Array.from({ length: count }, (_, i) => ({
      value: `option${i + 1}`,
      label: `${optionLabels[i]} Option`,
      header: props.header ? `${optionLabels[i]} choice` : undefined,
    }));
  };

  const options = generateOptions(parseInt(props.optionCount || '3'));

  if (props.componentType === 'single') {
    return (
      <RadioButton
        name="demo-single-radio"
        value="single-option"
        checked={singleChecked}
        onChange={(e) => setSingleChecked(e.target.checked)}
        label={props.label || 'Sample Option'}
        header={props.header ? (props.header || 'This is a sample header') : undefined}
        color={props.color}
        variant={props.variant}
        size={props.size}
        shape={props.shape}
        disabled={props.disabled}
        error={props.error}
        labelPosition={props.labelPosition}
        contentToggleable={props.contentToggleable}
        required={props.required}
      />
    );
  }

  return (
    <RadioButtonGroup
      name="demo-radio-group"
      value={selectedValue}
      onChange={setSelectedValue}
      options={options}
      color={props.color}
      size={props.size}
      shape={props.shape}
      disabled={props.disabled}
      error={props.error}
      labelPosition={props.labelPosition}
      orientation={props.orientation}
    />
  );
};

export const RadioButtonConfig = {
  component: <DynamicRadioButtonDemo />,
  // Dynamic component name based on componentType
  getComponentName: (props: any) => {
    return props.componentType === 'single' ? 'RadioButton' : 'RadioButtonGroup';
  },
  // Custom code generation for detailed examples
  generateCodeString: (props: any) => {
    if (props.componentType === 'single') {
      // Generate single RadioButton code
      const propStrings = [];

      if (props.name) propStrings.push(`name="${props.name}"`);
      if (props.value) propStrings.push(`value="${props.value}"`);
      if (props.checked) propStrings.push('checked={checked}');
      propStrings.push('onChange={(e) => setChecked(e.target.checked)}');
      if (props.label && props.label !== 'Sample Option') propStrings.push(`label="${props.label}"`);
      if (props.header) propStrings.push(`header="${props.header}"`);
      if (props.color !== 'primary') propStrings.push(`color="${props.color}"`);
      if (props.variant !== 'solid') propStrings.push(`variant="${props.variant}"`);
      if (props.size !== 'md') propStrings.push(`size="${props.size}"`);
      if (props.shape !== 'pill') propStrings.push(`shape="${props.shape}"`);
      if (props.labelPosition !== 'right') propStrings.push(`labelPosition="${props.labelPosition}"`);
      if (props.disabled) propStrings.push('disabled');
      if (props.error) propStrings.push('error');
      if (props.required) propStrings.push('required');
      if (!props.contentToggleable) propStrings.push('contentToggleable={false}');

      const propsString = propStrings.join('\n  ');
      return `<RadioButton\n  ${propsString}\n/>`;
    } else {
      // Generate RadioButtonGroup code with options array
      const optionCount = parseInt(props.optionCount || '3');
      const optionLabels = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];

      const optionsArray = Array.from({ length: optionCount }, (_, i) => {
        const option: any = {
          value: `option${i + 1}`,
          label: `${optionLabels[i]} Option`,
        };
        if (props.header) {
          option.header = `${optionLabels[i]} choice`;
        }
        return option;
      });

      const optionsString = optionsArray.map(option => {
        if (option.header) {
          return `  {\n    value: '${option.value}',\n    label: '${option.label}',\n    header: '${option.header}'\n  }`;
        } else {
          return `  { value: '${option.value}', label: '${option.label}' }`;
        }
      }).join(',\n');

      const propStrings = [];
      if (props.name) propStrings.push(`name="${props.name}"`);
      propStrings.push('value={selectedValue}');
      propStrings.push('onChange={setSelectedValue}');
      propStrings.push('options={options}');
      if (props.color !== 'primary') propStrings.push(`color="${props.color}"`);
      if (props.variant !== 'solid') propStrings.push(`variant="${props.variant}"`);
      if (props.size !== 'md') propStrings.push(`size="${props.size}"`);
      if (props.shape !== 'pill') propStrings.push(`shape="${props.shape}"`);
      if (props.labelPosition !== 'right') propStrings.push(`labelPosition="${props.labelPosition}"`);
      if (props.orientation !== 'vertical') propStrings.push(`orientation="${props.orientation}"`);
      if (props.disabled) propStrings.push('disabled');
      if (props.error) propStrings.push('error');

      const groupPropsString = propStrings.join('\n  ');

      return `const options = [\n${optionsString}\n];\n\n<RadioButtonGroup\n  ${groupPropsString}\n/>`;
    }
  },
  leftControls: [
    universalColorControls, 
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
      },],
  rightControls: [
    {
      title: 'RadioButton Options',
      controls: [
        {
          key: 'componentType',
          label: 'Component Type',
          type: 'select' as ControlType,
          options: [
            { label: 'Single RadioButton', value: 'single' },
            { label: 'RadioButton Group', value: 'group' }
          ]
        },
        {
          key: 'label',
          label: 'Label',
          type: 'text' as ControlType
        },
        {
          key: 'header',
          label: 'Header',
          type: 'text' as ControlType
        },
        {
          key: 'labelPosition',
          label: 'Label Position',
          type: 'select' as ControlType,
          options: [
            { label: 'Right', value: 'right' },
            { label: 'Left', value: 'left' }
          ]
        },
        {
          key: 'contentToggleable',
          label: 'Content Toggleable',
          type: 'checkbox' as ControlType
        },
        {
          key: 'required',
          label: 'Required',
          type: 'checkbox' as ControlType
        }
      ]
    },
    {
      title: 'Group Options',
      controls: [
        {
          key: 'orientation',
          label: 'Orientation',
          type: 'select' as ControlType,
          options: [
            { label: 'Vertical', value: 'vertical' },
            { label: 'Horizontal', value: 'horizontal' }
          ]
        },
        {
          key: 'optionCount',
          label: 'Number of Options',
          type: 'select' as ControlType,
          options: [
            { label: '2 Options', value: '2' },
            { label: '3 Options', value: '3' },
            { label: '4 Options', value: '4' },
            { label: '5 Options', value: '5' }
          ]
        }
      ]
    }
  ],
  initialProps: {
    color: 'primary',
    variant: 'solid',
    size: 'md',
    shape: 'pill',
    componentType: 'group',
    label: 'Sample Option',
    header: 'This is a sample header',
    labelPosition: 'right',
    contentToggleable: true,
    checked: false,
    required: false,
    orientation: 'vertical',
    optionCount: '3',
    // Computed props for rendering
    _componentComputed: true
  }
};
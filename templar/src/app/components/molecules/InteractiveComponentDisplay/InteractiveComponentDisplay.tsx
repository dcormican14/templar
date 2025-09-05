'use client';

import React, { forwardRef, useState, useEffect, useImperativeHandle, useCallback } from 'react';
import { useCSSVariables } from '../../../providers';
import { Dropdown, CheckBox } from '../../atoms';
import type { 
  InteractiveComponentDisplayProps, 
  InteractiveComponentDisplayRef,
  PropControl,
  PropControlGroup
} from './InteractiveComponentDisplay.types';
import {
  createContainerStyles,
  createHeaderStyles,
  getTitleStyles,
  getDescriptionStyles,
  createMainContentStyles,
  createDisplayAreaStyles,
  createControlPanelStyles,
  getControlGroupStyles,
  getControlGroupTitleStyles,
  getControlItemStyles,
  getControlLabelStyles,
  createCodePreviewStyles,
  getSelectStyles,
  getCheckboxStyles,
  getInputStyles,
  getColorInputStyles,
} from './InteractiveComponentDisplay.styles';
import {
  generateCodeString,
  getComponentName,
  cloneElementWithProps,
  getInitialPropsFromControls,
  validatePropValue,
  generateControlId,
} from './InteractiveComponentDisplay.utils';

export const InteractiveComponentDisplay = forwardRef<
  InteractiveComponentDisplayRef,
  InteractiveComponentDisplayProps
>((props, ref) => {
  const {
    children,
    leftControls = [],
    rightControls = [],
    initialProps = {},
    onPropsChange,
    title,
    description,
    showCode = true,
    showControls = true,
    displayStyle,
    displayClassName,
    padded = true,
    background = 'none',
    size = 'lg',
    layout = 'horizontal',
    ...restProps
  } = props;

  // Hooks
  const cssVars = useCSSVariables();

  // Initialize props state
  const [componentProps, setComponentProps] = useState<Record<string, any>>(() => 
    getInitialPropsFromControls(leftControls, rightControls, initialProps)
  );

  // Update props when controls change
  useEffect(() => {
    const newProps = getInitialPropsFromControls(leftControls, rightControls, initialProps);
    setComponentProps(newProps);
  }, [leftControls, rightControls, initialProps]);

  // Handle prop changes
  const handlePropChange = useCallback((key: string, value: any, control: PropControl) => {
    const validatedValue = validatePropValue(control, value);
    
    setComponentProps(prev => {
      const newProps = { ...prev, [key]: validatedValue };
      onPropsChange?.(newProps);
      return newProps;
    });
  }, [onPropsChange]);

  // Imperative handle for ref methods
  useImperativeHandle(ref, () => ({
    getProps: () => componentProps,
    setProps: (newProps: Record<string, any>) => {
      setComponentProps(newProps);
      onPropsChange?.(newProps);
    },
    resetProps: () => {
      const initialPropsFromControls = getInitialPropsFromControls(leftControls, rightControls, initialProps);
      setComponentProps(initialPropsFromControls);
      onPropsChange?.(initialPropsFromControls);
    },
  }), [componentProps, leftControls, rightControls, initialProps, onPropsChange]);

  // Render control input based on type using atomic components
  const renderControlInput = (control: PropControl, groupTitle: string) => {
    const controlId = generateControlId(control.key, groupTitle);
    const currentValue = componentProps[control.key];

    // Skip custom color fields
    if (control.key === 'customColor') {
      return null;
    }

    switch (control.type) {
      case 'select':
        return (
          <Dropdown
            options={control.options || []}
            value={currentValue || ''}
            onChange={(value) => handlePropChange(control.key, value, control)}
            size="sm"
            color="primary"
            shape="default"
          />
        );

      case 'checkbox':
        return (
          <CheckBox
            checked={Boolean(currentValue)}
            onChange={(checked) => handlePropChange(control.key, checked, control)}
            label={control.label}
            size="sm"
            color="primary"
          />
        );

      case 'number':
        return (
          <input
            type="number"
            id={controlId}
            value={currentValue || ''}
            min={control.min}
            max={control.max}
            step={control.step || 1}
            onChange={(e) => handlePropChange(control.key, e.target.value, control)}
            style={getInputStyles(cssVars)}
          />
        );

      case 'text':
      default:
        return (
          <input
            type="text"
            id={controlId}
            value={currentValue || ''}
            onChange={(e) => handlePropChange(control.key, e.target.value, control)}
            style={getInputStyles(cssVars)}
          />
        );
    }
  };

  // Render control group
  const renderControlGroup = (group: PropControlGroup, groupTitle: string) => {
    // Filter out custom color controls
    const filteredControls = group.controls.filter(control => control.key !== 'customColor');
    
    if (filteredControls.length === 0) return null;
    
    return (
      <div key={groupTitle} style={getControlGroupStyles(cssVars)}>
        <h4 style={getControlGroupTitleStyles(cssVars)}>{group.title}</h4>
        {filteredControls.map(control => {
          const controlInput = renderControlInput(control, groupTitle);
          if (!controlInput) return null;
          
          return (
            <div key={control.key} style={getControlItemStyles()}>
              {control.type !== 'checkbox' && (
                <label 
                  htmlFor={generateControlId(control.key, groupTitle)}
                  style={getControlLabelStyles(cssVars)}
                >
                  {control.label}
                </label>
              )}
              {controlInput}
            </div>
          );
        })}
      </div>
    );
  };

  // Render control panel
  const renderControlPanel = (controls: PropControlGroup[], side: 'left' | 'right') => {
    if (!showControls || controls.length === 0) return null;

    return (
      <div style={createControlPanelStyles(side, size, cssVars)}>
        {controls.map(group => renderControlGroup(group, group.title))}
      </div>
    );
  };

  // Clone element with new props
  const enhancedElement = cloneElementWithProps(children, componentProps);

  // Styles
  const containerStyles = createContainerStyles(size, layout, cssVars);
  const displayAreaStyles = createDisplayAreaStyles(padded, background, cssVars, displayStyle);

  return (
    <div style={containerStyles} {...restProps}>
      {/* Main Content - Controls and Component Display */}
      <div style={{
        display: 'flex',
        gap: '24px'
      }}>
        {/* Controls Panel - All controls in one column */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          minWidth: '240px',
          flexShrink: 0
        }}>
          {renderControlPanel(leftControls, 'left')}
          {renderControlPanel(rightControls, 'right')}
        </div>

        {/* Display Area - Component preview */}
        <div style={{
          ...displayAreaStyles,
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '200px'
        }} className={displayClassName}>
          {enhancedElement}
        </div>
      </div>
    </div>
  );
});

InteractiveComponentDisplay.displayName = 'InteractiveComponentDisplay';
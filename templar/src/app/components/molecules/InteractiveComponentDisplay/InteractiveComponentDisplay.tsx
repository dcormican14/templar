'use client';

import React, { forwardRef, useState, useEffect, useImperativeHandle, useCallback } from 'react';
import { useCSSVariables } from '../../../providers';
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

  // Render control input based on type
  const renderControlInput = (control: PropControl, groupTitle: string) => {
    const controlId = generateControlId(control.key, groupTitle);
    const currentValue = componentProps[control.key];

    switch (control.type) {
      case 'select':
        return (
          <select
            id={controlId}
            value={currentValue || ''}
            onChange={(e) => handlePropChange(control.key, e.target.value, control)}
            style={getSelectStyles(cssVars)}
          >
            {control.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              id={controlId}
              checked={Boolean(currentValue)}
              onChange={(e) => handlePropChange(control.key, e.target.checked, control)}
              style={getCheckboxStyles()}
            />
            <span style={{ fontSize: '12px', color: cssVars.foregroundAccent }}>
              {control.label}
            </span>
          </label>
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

      case 'color':
        return (
          <input
            type="color"
            id={controlId}
            value={currentValue || '#000000'}
            onChange={(e) => handlePropChange(control.key, e.target.value, control)}
            style={getColorInputStyles(cssVars)}
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
  const renderControlGroup = (group: PropControlGroup, groupTitle: string) => (
    <div key={groupTitle} style={getControlGroupStyles(cssVars)}>
      <h4 style={getControlGroupTitleStyles(cssVars)}>{group.title}</h4>
      {group.controls.map(control => (
        <div key={control.key} style={getControlItemStyles()}>
          {control.type !== 'checkbox' && (
            <label 
              htmlFor={generateControlId(control.key, groupTitle)}
              style={getControlLabelStyles(cssVars)}
            >
              {control.label}
            </label>
          )}
          {renderControlInput(control, groupTitle)}
        </div>
      ))}
    </div>
  );

  // Render control panel
  const renderControlPanel = (controls: PropControlGroup[], side: 'left' | 'right') => {
    if (!showControls || controls.length === 0) return null;

    return (
      <div style={createControlPanelStyles(side, size, cssVars)}>
        {controls.map(group => renderControlGroup(group, group.title))}
      </div>
    );
  };

  // Generate code preview
  const componentName = getComponentName(children);
  const codeString = generateCodeString(componentName, componentProps, children.props.children);

  // Clone element with new props
  const enhancedElement = cloneElementWithProps(children, componentProps);

  // Styles
  const containerStyles = createContainerStyles(size, layout, cssVars);
  const headerStyles = createHeaderStyles(cssVars);
  const titleStyles = getTitleStyles(cssVars);
  const descriptionStyles = getDescriptionStyles(cssVars);
  const mainContentStyles = createMainContentStyles(layout, showControls);
  const displayAreaStyles = createDisplayAreaStyles(padded, background, cssVars, displayStyle);
  const codePreviewStyles = createCodePreviewStyles(cssVars);

  return (
    <div style={containerStyles} {...restProps}>
      {/* Header */}
      {(title || description) && (
        <div style={headerStyles}>
          {title && <h3 style={titleStyles}>{title}</h3>}
          {description && <p style={descriptionStyles}>{description}</p>}
        </div>
      )}

      {/* Main Content */}
      <div style={mainContentStyles}>
        {/* Left Controls */}
        {renderControlPanel(leftControls, 'left')}

        {/* Display Area */}
        <div style={displayAreaStyles} className={displayClassName}>
          {enhancedElement}
        </div>

        {/* Right Controls */}
        {renderControlPanel(rightControls, 'right')}
      </div>

      {/* Code Preview */}
      {showCode && (
        <div style={codePreviewStyles}>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {codeString}
          </pre>
        </div>
      )}
    </div>
  );
});

InteractiveComponentDisplay.displayName = 'InteractiveComponentDisplay';
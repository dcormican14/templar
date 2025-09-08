'use client';

import React, { forwardRef, useState, useEffect, useImperativeHandle, useCallback } from 'react';
import { useCSSVariables } from '../../../providers';
import { Dropdown, CheckBox, TextArea } from '../../atoms';
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

  // Note: Initial props are set in useState initializer above
  // We don't need a useEffect here as it causes state resets on re-renders

  // Handle prop changes
  const handlePropChange = useCallback((key: string, value: any, control: PropControl) => {
    const validatedValue = validatePropValue(control, value);
    
    setComponentProps(prev => {
      const newProps = { ...prev, [key]: validatedValue };
      // Defer the callback to avoid setState during render
      setTimeout(() => {
        onPropsChange?.(newProps);
      }, 0);
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
        // Check if this is the animationMode dropdown and animations are disabled
        const isAnimationModeDisabled = control.key === 'animationMode' && !componentProps.animate;
        
        return (
          <Dropdown
            options={control.options || []}
            value={currentValue}
            onChange={(value) => handlePropChange(control.key, value, control)}
            size="sm"
            color="primary"
            disabled={isAnimationModeDisabled}
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
          <TextArea
            id={controlId}
            value={currentValue || ''}
            onChange={(valueOrEvent) => {
              // Handle both value and event cases
              const value = valueOrEvent?.target?.value ?? valueOrEvent;
              handlePropChange(control.key, value, control);
            }}
            placeholder={`Enter ${control.label.toLowerCase()}...`}
            size="sm"
            color="primary"
            variant="outline"
            autoResize={true}
            maxRows={3}
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
      <>
        {controls.map(group => renderControlGroup(group, group.title))}
      </>
    );
  };

  // Prepare props for rendering - override animationMode to 'none' if animations are disabled
  const renderProps = { ...componentProps };
  if (!componentProps.animate && renderProps.animationMode) {
    renderProps.animationMode = 'none';
  }

  // Handle icon toggle logic - if icon is false (checkbox unchecked), remove the icon prop
  if (renderProps.icon === false) {
    renderProps.icon = undefined; // Explicitly set to undefined to override any default icon
  } else if (renderProps.icon === true && initialProps._defaultIcon) {
    // If icon is true (checkbox checked), use the default icon
    renderProps.icon = initialProps._defaultIcon;
  }

  // Clone element with new props
  const enhancedElement = cloneElementWithProps(children, renderProps);

  // Styles
  const containerStyles = createContainerStyles(size, layout, cssVars);
  const displayAreaStyles = createDisplayAreaStyles(padded, background, cssVars, displayStyle);

  return (
    <div style={{
      ...containerStyles,
      display: 'flex',
      flexDirection: 'row',
      gap: '0',
      minHeight: '400px', // Ensure minimum height
      height: 'auto'
    }} {...restProps}>
      {/* Left Controls Panel */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '240px',
        flexShrink: 0,
        backgroundColor: cssVars.backgroundAccent,
        padding: '16px',
        borderRight: `1px solid ${cssVars.border}`,
        minHeight: '100%'
      }}>
        {renderControlPanel(leftControls, 'left')}
      </div>

      {/* Display Area - Component preview */}
      <div style={{
        ...displayAreaStyles,
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        backgroundColor: cssVars.background
      }} className={displayClassName}>
        {enhancedElement}
      </div>

      {/* Right Controls Panel */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '240px',
        flexShrink: 0,
        backgroundColor: cssVars.backgroundAccent,
        padding: '16px',
        borderLeft: `1px solid ${cssVars.border}`,
        minHeight: '100%'
      }}>
        {renderControlPanel(rightControls, 'right')}
      </div>
    </div>
  );
});

InteractiveComponentDisplay.displayName = 'InteractiveComponentDisplay';
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
            id={controlId}
            checked={Boolean(currentValue)}
            onChange={(checked) => handlePropChange(control.key, checked, control)}
            label={control.label}
            size="sm"
            color="primary"
            contentToggleable={true}
          />
        );

      case 'number':
        return (
          <TextArea
            id={controlId}
            value={currentValue ? String(currentValue) : ''}
            onChange={(valueOrEvent) => {
              // Handle both value and event cases
              const value = valueOrEvent?.target?.value ?? valueOrEvent;
              // Convert to number for number inputs
              const numValue = value === '' ? '' : Number(value);
              handlePropChange(control.key, numValue, control);
            }}
            placeholder={`Enter ${control.label.toLowerCase()}...`}
            size="sm"
            color="primary"
            variant="outline"
            maxRows={1}
            minRows={1}
            autoResize={false}
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

  // Handle computed actions logic - if _actionsComputed is true, build actions from hasActions and action labels
  if (initialProps._actionsComputed && renderProps.hasActions) {
    const actions = [];

    // Add first action if label is provided
    if (renderProps.actionLabel1) {
      actions.push({
        label: renderProps.actionLabel1,
        onClick: () => console.log(`${renderProps.actionLabel1} clicked`),
        variant: 'solid'
      });
    }

    // Add second action if label is provided
    if (renderProps.actionLabel2) {
      actions.push({
        label: renderProps.actionLabel2,
        onClick: () => console.log(`${renderProps.actionLabel2} clicked`),
        variant: 'outline'
      });
    }

    // Set the computed actions array
    renderProps.actions = actions.length > 0 ? actions : undefined;
  } else if (initialProps._actionsComputed && !renderProps.hasActions) {
    // If hasActions is false, remove actions entirely
    renderProps.actions = undefined;
  }

  // Handle computed items logic - if _itemsComputed is true, build items from itemCount and item labels
  if (initialProps._itemsComputed) {
    const items = [];
    const itemCount = renderProps.itemCount || 3;

    // Build items array based on itemCount
    for (let i = 1; i <= itemCount; i++) {
      const itemKey = `item${i}` as keyof typeof renderProps;
      items.push(renderProps[itemKey] || `Option ${i}`);
    }

    // Set the computed items array
    renderProps.items = items;
  }

  // Add callback handlers for interactive components
  const interactiveProps = { ...renderProps };

  // For CheckBox components, add onChange handler to update state
  if (children && React.isValidElement(children)) {
    const componentName = getComponentName(children);

    // Check if this is a checkbox-like component (has checked prop)
    const hasCheckedProp = 'checked' in renderProps;
    if (componentName === 'CheckBox' || hasCheckedProp) {
      interactiveProps.onChange = (checked: boolean) => {
        setComponentProps(prev => ({ ...prev, checked }));
        // Also call original onChange if it exists
        if (renderProps.onChange) {
          renderProps.onChange(checked);
        }
      };
    }

    // For SegmentedControl, add onChange handler to update selectedIndex
    if (componentName === 'SegmentedControl') {
      interactiveProps.onChange = (selectedIndex: number, selectedItem: string) => {
        setComponentProps(prev => ({ ...prev, selectedIndex }));
        // Also call original onChange if it exists
        if (renderProps.onChange) {
          renderProps.onChange(selectedIndex, selectedItem);
        }
      };
    }

    // For Slider, add onChange handler to update value
    if (componentName === 'Slider') {
      interactiveProps.onChange = (value: number) => {
        setComponentProps(prev => ({ ...prev, value }));
        // Also call original onChange if it exists
        if (renderProps.onChange) {
          renderProps.onChange(value);
        }
      };
    }
  }

  // Clone element with new props
  const enhancedElement = cloneElementWithProps(children, interactiveProps);

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
        minHeight: '100%',
        borderTopLeftRadius: '12px',
        borderBottomLeftRadius: '12px'
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
        maxWidth: '718px',
        overflow: 'hidden',
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
        minHeight: '100%',
        borderTopRightRadius: '12px',
        borderBottomRightRadius: '12px'
      }}>
        {renderControlPanel(rightControls, 'right')}
      </div>
    </div>
  );
});

InteractiveComponentDisplay.displayName = 'InteractiveComponentDisplay';
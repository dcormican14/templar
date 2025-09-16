'use client';

import React, { forwardRef, useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { useCSSVariables, useSettings } from '../../../providers';
import { extractContainerProps, UNIVERSAL_DEFAULTS } from '../types';
import { Icon } from '../Icon';
import type { DropdownProps, DropdownOption, DropdownGroup } from './Dropdown.types';
import {
  createBaseStyles,
  getTriggerStyles,
  getArrowStyles,
  getMenuStyles,
  getOptionStyles,
  getSearchStyles,
  getLoadingStyles,
  getEmptyStyles,
  getDividerStyles,
  getGroupLabelStyles,
  getPlaceholderStyles,
  getValueDisplayStyles,
  getMultiValueStyles,
  getFocusStyles,
  getIsometricStyles,
  getColorVariables,
} from './Dropdown.styles';
import {
  isGroup,
  isOption,
  flattenOptions,
  getSelectableOptions,
  filterOptions,
  isSelected,
  getDisplayText,
  handleSelectionChange,
  handleKeyDown,
  generateDropdownId,
  createAccessibilityProps,
  createMenuAccessibilityProps,
  createOptionAccessibilityProps,
  useClickOutside,
  useFocusManagement,
  createDropdownPortal,
  getNextSelectableIndex,
} from './Dropdown.utils';
import { ParallaxTiltWrapper } from '../Button/animations/ParallaxTiltWrapper';
import { TypewriterText } from '../Button/animations/TypewriterText';

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>((allProps, ref) => {
  // Extract container props and component-specific props
  const [containerProps, componentProps] = extractContainerProps(allProps);
  
  // Destructure container props with defaults
  const {
    color = UNIVERSAL_DEFAULTS.color,
    customColor,
    variant = 'outline', // Dropdown-specific default
    shape = UNIVERSAL_DEFAULTS.shape,
    size = UNIVERSAL_DEFAULTS.size,
    disabled = UNIVERSAL_DEFAULTS.disabled,
    loading = UNIVERSAL_DEFAULTS.loading,
    loadingKey,
    width,
    height,
    className,
    style,
    id,
    'data-testid': dataTestId,
    animate = UNIVERSAL_DEFAULTS.animate,
    animationMode = UNIVERSAL_DEFAULTS.animationMode,
    rounded, // Legacy support
  } = containerProps;
  
  // Destructure component-specific props
  const {
    position = 'bottom-start',
    options = [],
    multiple = false,
    searchable = false,
    searchPlaceholder = 'Search...',
    filterFunction,
    closeOnSelect = true,
    maxHeight = '300px',
    trigger,
    portal = false,
    emptyMessage = 'No options available',
    noResultsMessage = 'No results found',
    open: controlledOpen,
    onOpenChange,
    icon,
    showArrow = true,
    menuClassName,
    menuStyle,
    onClose,
    onOpen,
    onChange,
    value,
    placeholder = 'Select option...',
    error,
    errorText,
    header,
    headerAlignment = 'left',
    ...restProps
  } = componentProps;
    // Hooks
    const cssVars = useCSSVariables();
    const { settings } = useSettings();
    const animationsEnabled = (settings.appearance.animations ?? true) && animate;
    const useAnimationMode = animationsEnabled && animationMode !== 'none';
    const hasIsometricAnimation = useAnimationMode && animationMode === 'isometric' && variant !== 'ghost' && variant !== 'glassmorphic';

    // State
    const [internalOpen, setInternalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [isFocused, setIsFocused] = useState(false);

    // Controlled vs uncontrolled open state
    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
    const setIsOpen = useCallback((open: boolean) => {
      if (controlledOpen === undefined) {
        setInternalOpen(open);
      }
      onOpenChange?.(open);
    }, [controlledOpen, onOpenChange]);

    // Refs
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    // Generate unique ID
    const dropdownId = useMemo(() => generateDropdownId(), []);

    // Process options
    const filteredOptions = useMemo(() => {
      if (!searchable || !searchQuery) return options;
      return filterOptions(options, searchQuery, filterFunction);
    }, [options, searchQuery, searchable, filterFunction]);

    const flatOptions = useMemo(() => flattenOptions(filteredOptions), [filteredOptions]);
    const selectableOptions = useMemo(() => getSelectableOptions(filteredOptions), [filteredOptions]);

    // Display text
    const displayText = useMemo(() => 
      getDisplayText(value, options, multiple, placeholder),
      [value, options, multiple, placeholder]
    );

    // Helper function to render text with optional typewriter animation
    const renderAnimatedText = (text: React.ReactNode, isTypewriter: boolean) => {
      if (!isTypewriter || typeof text !== 'string') {
        return text;
      }
      return (
        <TypewriterText
          text={text}
          speed={100}
          deleteSpeed={50}
          showCursor={true}
          disabled={Boolean(disabled)}
        />
      );
    };

    // Event handlers
    const handleToggle = useCallback(() => {
      if (disabled) return;
      
      const newOpen = !isOpen;
      if (newOpen) {
        onOpen?.();
        // Set initial highlighted index to first selectable option
        const selectableOptions = getSelectableOptions(filteredOptions);
        const firstSelectableIndex = selectableOptions.length > 0 ? 0 : -1;
        setHighlightedIndex(firstSelectableIndex);
      } else {
        onClose?.();
      }
      setIsOpen(newOpen);
      
      if (!newOpen) {
        setSearchQuery('');
        setHighlightedIndex(-1);
      }
    }, [disabled, isOpen, setIsOpen, onOpen, onClose, filteredOptions]);

    const handleClose = useCallback(() => {
      setIsOpen(false);
      setSearchQuery('');
      setHighlightedIndex(-1);
      onClose?.();
    }, [setIsOpen, onClose]);

    const handleOptionSelect = useCallback((option: DropdownOption) => {
      if (option.disabled) return;
      
      const newValue = handleSelectionChange(option.value, value, multiple, onChange);
      
      if (!multiple && closeOnSelect) {
        handleClose();
      }
      
      return newValue;
    }, [value, multiple, onChange, closeOnSelect, handleClose]);

    const handleOptionClick = useCallback((option: DropdownOption) => {
      handleOptionSelect(option);
    }, [handleOptionSelect]);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      setHighlightedIndex(-1);
    }, []);

    const handleKeyDownInternal = useCallback((e: React.KeyboardEvent) => {
      handleKeyDown(
        e,
        isOpen,
        highlightedIndex,
        selectableOptions,
        handleToggle,
        (index) => {
          const option = selectableOptions[index];
          if (option) handleOptionSelect(option);
        },
        setHighlightedIndex,
        handleClose
      );
    }, [isOpen, highlightedIndex, selectableOptions, handleToggle, handleOptionSelect, handleClose]);

    // Click outside to close
    useClickOutside(containerRef, handleClose, isOpen);

    // Focus management
    useFocusManagement(isOpen, triggerRef, menuRef);

    // Reset highlighted index when options change
    useEffect(() => {
      setHighlightedIndex(-1);
    }, [filteredOptions]);

    // Styles
    const baseStyles = useMemo(() => 
      createBaseStyles(size, shape, animationsEnabled, width, rounded),
      [size, shape, animationsEnabled, width, rounded]
    );

    const colorVariables = useMemo(() => 
      getColorVariables(color, customColor, cssVars),
      [color, customColor, cssVars]
    );

    const triggerStyles = useMemo(() => {
      const baseStyles = getTriggerStyles(color, variant, size, shape, Boolean(disabled), Boolean(error), isOpen, customColor, cssVars, animationsEnabled, rounded);
      const shouldShowFocus = (isFocused || isOpen) && !disabled;
      const focusStyles = shouldShowFocus ? getFocusStyles(cssVars, variant, Boolean(error), colorVariables) : {};
      const isometricStyles = hasIsometricAnimation ? getIsometricStyles(colorVariables, variant, shape) : {};
      return { ...baseStyles, ...focusStyles, ...isometricStyles };
    }, [color, customColor, variant, size, disabled, error, isOpen, shape, rounded, cssVars, animationsEnabled, isFocused, hasIsometricAnimation, colorVariables]);

    const arrowStyles = useMemo(() => 
      getArrowStyles(size, isOpen, animationsEnabled, cssVars, variant, colorVariables),
      [size, isOpen, animationsEnabled, cssVars, variant, colorVariables]
    );

    const menuStyles = useMemo(() => 
      getMenuStyles(position, maxHeight, Boolean(rounded) || (shape === 'round'), cssVars, animationsEnabled),
      [position, maxHeight, shape, rounded, cssVars, animationsEnabled]
    );

    const searchStyles = useMemo(() => 
      getSearchStyles(size, Boolean(rounded) || (shape === 'round'), cssVars, variant),
      [size, shape, rounded, cssVars, variant]
    );

    const combinedStyles: React.CSSProperties = {
      ...baseStyles,
      ...style,
    };

    const combinedMenuStyles: React.CSSProperties = {
      ...menuStyles,
      ...menuStyle,
    };

    // Accessibility props
    const accessibilityProps = createAccessibilityProps(dropdownId, isOpen, highlightedIndex, Boolean(error));
    const menuAccessibilityProps = createMenuAccessibilityProps(dropdownId);

    // Isometric hover handlers
    const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled && animationsEnabled && hasIsometricAnimation && variant !== 'ghost' && variant !== 'glassmorphic') {
        // Small bouncy press animation - button moves down, border reduces
        e.currentTarget.style.transform = 'translateY(3px)';
        e.currentTarget.style.borderBottomWidth = '3px';
        // Ensure the border color is maintained
        const borderColor = variant === 'outline' ? colorVariables.main : colorVariables.foreground;
        if (borderColor) {
          e.currentTarget.style.borderBottomColor = borderColor;
          // For solid variant, also update all other border colors to match
          if (variant === 'solid') {
            e.currentTarget.style.borderTopColor = borderColor;
            e.currentTarget.style.borderRightColor = borderColor;
            e.currentTarget.style.borderLeftColor = borderColor;
          }
        }
      }
    }, [disabled, animationsEnabled, hasIsometricAnimation, variant, colorVariables]);

    const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled && hasIsometricAnimation && variant !== 'ghost' && variant !== 'glassmorphic') {
        // Return to rest position
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderBottomWidth = '6px';
        // Ensure the border color is maintained
        const borderColor = variant === 'outline' ? colorVariables.main : colorVariables.foreground;
        if (borderColor) {
          e.currentTarget.style.borderBottomColor = borderColor;
          // For solid variant, also update all other border colors to match
          if (variant === 'solid') {
            e.currentTarget.style.borderTopColor = borderColor;
            e.currentTarget.style.borderRightColor = borderColor;
            e.currentTarget.style.borderLeftColor = borderColor;
          }
        }
      }
    }, [disabled, hasIsometricAnimation, variant, colorVariables]);

    // Render trigger
    const renderTrigger = () => {
      if (trigger) {
        const customTrigger = React.cloneElement(trigger as React.ReactElement, {
          onClick: handleToggle,
          onKeyDown: handleKeyDownInternal,
          onFocus: () => setIsFocused(true),
          onBlur: () => setIsFocused(false),
          ...accessibilityProps,
        } as any);

        // Wrap custom trigger with parallax if needed
        if (useAnimationMode && animationMode === 'parallax') {
          return (
            <ParallaxTiltWrapper disabled={disabled || !useAnimationMode}>
              {customTrigger}
            </ParallaxTiltWrapper>
          );
        }
        return customTrigger;
      }

      const triggerButton = (
        <button
          ref={triggerRef}
          type="button"
          style={triggerStyles}
          onClick={handleToggle}
          onKeyDown={handleKeyDownInternal}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          disabled={disabled}
          {...accessibilityProps}
        >
          <div style={getValueDisplayStyles()}>
            {icon && <span style={{ marginRight: '8px' }}>{icon}</span>}
            {multiple && Array.isArray(value) && value.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
                {value.slice(0, 3).map((val) => {
                  const option = flatOptions.find(opt => opt.value === val);
                  const label = typeof option?.label === 'string' ? option.label : val.toString();
                  return (
                    <span key={val} style={getMultiValueStyles(size, Boolean(rounded) || (shape === 'round'), cssVars, variant, colorVariables)}>
                      {label}
                    </span>
                  );
                })}
                {value.length > 3 && (
                  <span style={getMultiValueStyles(size, Boolean(rounded) || (shape === 'round'), cssVars, variant, colorVariables)}>
                    +{value.length - 3}
                  </span>
                )}
              </div>
            ) : (
              <span style={value ? {} : getPlaceholderStyles(cssVars, variant, colorVariables)}>
                {renderAnimatedText(displayText, useAnimationMode && animationMode === 'typewriter')}
              </span>
            )}
          </div>
          {showArrow && (
            <div style={arrowStyles}>
              <Icon name="NavArrowDown" size={size === 'lg' ? 'md' : 'sm'} />
            </div>
          )}
        </button>
      );

      // Wrap trigger button with parallax if needed
      if (useAnimationMode && animationMode === 'parallax') {
        return (
          <ParallaxTiltWrapper disabled={disabled || !useAnimationMode}>
            {triggerButton}
          </ParallaxTiltWrapper>
        );
      }

      return triggerButton;
    };

    // Render option
    const renderOption = (option: DropdownOption, index: number, globalIndex: number) => {
      const selected = isSelected(option.value, value, multiple);
      const highlighted = globalIndex === highlightedIndex;
      const optionStyles = getOptionStyles(size, selected, !!option.disabled, highlighted, cssVars, animationsEnabled, variant, colorVariables);
      const optionAccessibilityProps = createOptionAccessibilityProps(dropdownId, globalIndex, selected, !!option.disabled);

      return (
        <React.Fragment key={option.value}>
          {option.divider && <div style={getDividerStyles(cssVars)} />}
          <button
            type="button"
            style={optionStyles}
            onClick={() => !option.disabled && handleOptionClick(option)}
            onMouseEnter={() => setHighlightedIndex(globalIndex)}
            disabled={option.disabled}
            {...optionAccessibilityProps}
          >
            {option.icon && <span style={{ marginRight: '8px' }}>{option.icon}</span>}
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div>{option.label}</div>
              {option.description && (
                <div style={{ 
                  fontSize: '0.875em', 
                  opacity: 0.7, 
                  marginTop: '2px' 
                }}>
                  {option.description}
                </div>
              )}
            </div>
            {selected && multiple && (
              <span style={{ marginLeft: '8px' }}>
                <Icon name="Check" size="sm" />
              </span>
            )}
          </button>
        </React.Fragment>
      );
    };

    // Render menu content
    const renderMenuContent = () => {
      if (loading) {
        return (
          <div style={getLoadingStyles(size, cssVars)}>
            Loading...
          </div>
        );
      }

      if (filteredOptions.length === 0) {
        return (
          <div style={getEmptyStyles(size, cssVars)}>
            {searchQuery ? noResultsMessage : emptyMessage}
          </div>
        );
      }

      let globalIndex = 0;

      return filteredOptions.map((item, groupIndex) => {
        if (isGroup(item)) {
          return (
            <div key={`group-${groupIndex}`}>
              {item.label && (
                <div style={getGroupLabelStyles(size, cssVars)}>
                  {item.label}
                </div>
              )}
              {item.options.map((option, optionIndex) => {
                const currentGlobalIndex = globalIndex++;
                return renderOption(option, optionIndex, currentGlobalIndex);
              })}
            </div>
          );
        } else {
          const currentGlobalIndex = globalIndex++;
          return renderOption(item, groupIndex, currentGlobalIndex);
        }
      });
    };

    // Render menu
    const renderMenu = () => {
      if (!isOpen) return null;

      const menuContent = (
        <div
          ref={menuRef}
          style={combinedMenuStyles}
          className={menuClassName}
          {...menuAccessibilityProps}
        >
          {searchable && (
            <div style={{
              padding: '8px',
              borderBottom: `1px solid ${cssVars.border}`,
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Icon
                name="Search"
                size="sm"
                style={{
                  position: 'absolute',
                  left: '16px',
                  zIndex: 1,
                  color: cssVars.foregroundAccent || cssVars.foreground,
                  pointerEvents: 'none'
                }}
              />
              <input
                ref={searchRef}
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={handleSearchChange}
                style={{
                  ...searchStyles,
                  paddingLeft: '36px' // Add space for the icon
                }}
                autoComplete="off"
              />
            </div>
          )}
          <div
            className="dropdown-scrollable-content"
            style={{
              maxHeight,
              overflowY: 'auto',
              // Hide scrollbar for IE and Edge
              msOverflowStyle: 'none',
              // Hide scrollbar for Firefox
              scrollbarWidth: 'none'
            }}>
            {renderMenuContent()}
          </div>
        </div>
      );

      return portal ? createDropdownPortal(menuContent) : menuContent;
    };

    // Render header function (copied from Card component pattern)
    const renderHeader = () => {
      // Show error text in header when in error state, similar to card component
      // Priority: if error state and errorText exists, show errorText; otherwise show header
      let headerText: React.ReactNode = null;
      let isErrorText = false;

      if (error && errorText && errorText.toString().trim()) {
        // Error state takes priority - show error text
        headerText = errorText;
        isErrorText = true;
      } else if (header && header.toString().trim()) {
        // Normal state - show regular header (only if not empty string)
        headerText = header;
        isErrorText = false;
      }

      // Always render header section if we have error text, even if no regular header
      if (!headerText || headerText.toString().trim() === '') return null;

      // Use destructive color for error text, otherwise use component theme color
      const headerColor = isErrorText ? cssVars.destructive : (colorVariables.main || cssVars.primary);

      return (
        <div
          style={{
            textAlign: headerAlignment,
            color: headerColor,
            fontWeight: '500',
            fontSize: '14px',
            fontFamily: 'inherit',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            marginBottom: '0px', // Remove margin since positioning is absolute
            // Constrain the header to not be wider than the dropdown
            display: 'block',
            overflow: 'hidden', // Hide any overflow
            boxSizing: 'border-box',
          }}
        >
          {renderAnimatedText(headerText, useAnimationMode && animationMode === 'typewriter')}
        </div>
      );
    };

    // Create the dropdown element
    const dropdownElement = (
      <div
        ref={ref || containerRef}
        style={combinedStyles}
        id={id}
        className={className}
        data-testid={dataTestId}
        {...restProps}
      >
        {renderTrigger()}
        {renderMenu()}
      </div>
    );

    // Create the complete component with header
    // Include header wrapper if there's a header OR if there's error text to display
    const shouldIncludeHeader = header || (error && errorText);
    const completeElement = shouldIncludeHeader ? (
      <div style={{
        position: 'relative',
        display: 'inline-block',
      }}>
        <div style={{
          // Position header absolutely to avoid affecting container size
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          transform: 'translateY(calc(-100% - 8px))', // Move up by full height + spacing
        }}>
          {renderHeader()}
        </div>
        {dropdownElement}
      </div>
    ) : dropdownElement;

    return completeElement;
  }
);

Dropdown.displayName = 'Dropdown';
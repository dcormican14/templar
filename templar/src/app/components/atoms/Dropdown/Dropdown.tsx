'use client';

import React, { forwardRef, useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { useCSSVariables, useSettings } from '../../../providers';
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

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({
    variant = 'outline',
    size = 'md',
    width,
    position = 'bottom-start',
    options = [],
    value,
    onChange,
    placeholder = 'Select option...',
    multiple = false,
    disabled = false,
    error = false,
    searchable = false,
    searchPlaceholder = 'Search...',
    filterFunction,
    closeOnSelect = true,
    maxHeight = '300px',
    loading = false,
    trigger,
    portal = false,
    emptyMessage = 'No options available',
    noResultsMessage = 'No results found',
    open: controlledOpen,
    onOpenChange,
    rounded = false,
    icon,
    showArrow = true,
    menuClassName,
    menuStyle,
    onClose,
    onOpen,
    className,
    style,
    ...props
  }, ref) => {
    // Hooks
    const cssVars = useCSSVariables();
    const { settings } = useSettings();
    const animationsEnabled = settings.appearance.animations;

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
      createBaseStyles(size, rounded, animationsEnabled, width),
      [size, rounded, animationsEnabled, width]
    );

    const triggerStyles = useMemo(() => {
      const baseStyles = getTriggerStyles(variant, size, disabled, error, isOpen, rounded, cssVars, animationsEnabled);
      const shouldShowFocus = (isFocused || isOpen) && !disabled;
      const focusStyles = shouldShowFocus ? getFocusStyles(cssVars, variant, error) : {};
      return { ...baseStyles, ...focusStyles };
    }, [variant, size, disabled, error, isOpen, rounded, cssVars, animationsEnabled, isFocused]);

    const arrowStyles = useMemo(() => 
      getArrowStyles(size, isOpen, animationsEnabled, cssVars, variant),
      [size, isOpen, animationsEnabled, cssVars, variant]
    );

    const menuStyles = useMemo(() => 
      getMenuStyles(position, maxHeight, rounded, cssVars, animationsEnabled),
      [position, maxHeight, rounded, cssVars, animationsEnabled]
    );

    const searchStyles = useMemo(() => 
      getSearchStyles(size, rounded, cssVars, variant),
      [size, rounded, cssVars, variant]
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
    const accessibilityProps = createAccessibilityProps(dropdownId, isOpen, highlightedIndex, error);
    const menuAccessibilityProps = createMenuAccessibilityProps(dropdownId);

    // Render trigger
    const renderTrigger = () => {
      if (trigger) {
        return React.cloneElement(trigger as React.ReactElement, {
          onClick: handleToggle,
          onKeyDown: handleKeyDownInternal,
          onFocus: () => setIsFocused(true),
          onBlur: () => setIsFocused(false),
          ...accessibilityProps,
        } as any);
      }

      return (
        <button
          ref={triggerRef}
          type="button"
          style={triggerStyles}
          onClick={handleToggle}
          onKeyDown={handleKeyDownInternal}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
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
                    <span key={val} style={getMultiValueStyles(size, rounded, cssVars, variant)}>
                      {label}
                    </span>
                  );
                })}
                {value.length > 3 && (
                  <span style={getMultiValueStyles(size, rounded, cssVars, variant)}>
                    +{value.length - 3}
                  </span>
                )}
              </div>
            ) : (
              <span style={value ? {} : getPlaceholderStyles(cssVars, variant)}>
                {displayText}
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
    };

    // Render option
    const renderOption = (option: DropdownOption, index: number, globalIndex: number) => {
      const selected = isSelected(option.value, value, multiple);
      const highlighted = globalIndex === highlightedIndex;
      const optionStyles = getOptionStyles(size, selected, !!option.disabled, highlighted, cssVars, animationsEnabled, variant);
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
            <div style={{ padding: '8px', borderBottom: `1px solid ${cssVars.border}` }}>
              <input
                ref={searchRef}
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={handleSearchChange}
                style={searchStyles}
                autoComplete="off"
              />
            </div>
          )}
          <div style={{ maxHeight, overflowY: 'auto' }}>
            {renderMenuContent()}
          </div>
        </div>
      );

      return portal ? createDropdownPortal(menuContent) : menuContent;
    };

    return (
      <div
        ref={ref || containerRef}
        style={combinedStyles}
        className={className}
        {...props}
      >
        {renderTrigger()}
        {renderMenu()}
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';
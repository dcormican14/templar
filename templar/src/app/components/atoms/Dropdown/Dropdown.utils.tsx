import React from 'react';
import { createPortal } from 'react-dom';
import type { DropdownOption, DropdownGroup } from './Dropdown.types';

// Type guards
export const isGroup = (item: DropdownOption | DropdownGroup): item is DropdownGroup => {
  return 'options' in item && Array.isArray(item.options);
};

export const isOption = (item: DropdownOption | DropdownGroup): item is DropdownOption => {
  return 'value' in item;
};

// Flatten groups into options for easier processing
export const flattenOptions = (items: (DropdownOption | DropdownGroup)[]): DropdownOption[] => {
  const flattened: DropdownOption[] = [];
  
  items.forEach(item => {
    if (isGroup(item)) {
      flattened.push(...item.options);
    } else {
      flattened.push(item);
    }
  });
  
  return flattened;
};

// Get all non-disabled options
export const getSelectableOptions = (items: (DropdownOption | DropdownGroup)[]): DropdownOption[] => {
  return flattenOptions(items).filter(option => !option.disabled);
};

// Default filter function for search
export const defaultFilterFunction = (option: DropdownOption, query: string): boolean => {
  const searchQuery = query.toLowerCase().trim();
  
  if (!searchQuery) return true;
  
  // Search in label if it's a string
  const labelText = typeof option.label === 'string' 
    ? option.label.toLowerCase() 
    : option.value.toString().toLowerCase();
    
  // Search in description if available
  const descriptionText = option.description?.toLowerCase() || '';
  
  return labelText.includes(searchQuery) || descriptionText.includes(searchQuery);
};

// Filter options based on search query
export const filterOptions = (
  items: (DropdownOption | DropdownGroup)[],
  query: string,
  filterFn: (option: DropdownOption, query: string) => boolean = defaultFilterFunction
): (DropdownOption | DropdownGroup)[] => {
  if (!query.trim()) return items;
  
  return items.map(item => {
    if (isGroup(item)) {
      const filteredOptions = item.options.filter(option => filterFn(option, query));
      return filteredOptions.length > 0 ? { ...item, options: filteredOptions } : null;
    } else {
      return filterFn(item, query) ? item : null;
    }
  }).filter(Boolean) as (DropdownOption | DropdownGroup)[];
};

// Check if a value is selected
export const isSelected = (
  optionValue: string | number,
  selectedValue: string | number | (string | number)[] | undefined,
  multiple: boolean
): boolean => {
  if (selectedValue === undefined) return false;
  
  if (multiple) {
    return Array.isArray(selectedValue) && selectedValue.includes(optionValue);
  }
  
  return selectedValue === optionValue;
};

// Get display text for selected values
export const getDisplayText = (
  selectedValue: string | number | (string | number)[] | undefined,
  options: (DropdownOption | DropdownGroup)[],
  multiple: boolean,
  placeholder: string
): string => {
  if (selectedValue === undefined || (Array.isArray(selectedValue) && selectedValue.length === 0)) {
    return placeholder;
  }
  
  const allOptions = flattenOptions(options);
  
  if (multiple && Array.isArray(selectedValue)) {
    if (selectedValue.length === 1) {
      const option = allOptions.find(opt => opt.value === selectedValue[0]);
      return typeof option?.label === 'string' ? option.label : selectedValue[0].toString();
    }
    return `${selectedValue.length} selected`;
  }
  
  const option = allOptions.find(opt => opt.value === selectedValue);
  return typeof option?.label === 'string' ? option.label : selectedValue?.toString() || placeholder;
};

// Handle selection change
export const handleSelectionChange = (
  optionValue: string | number,
  currentValue: string | number | (string | number)[] | undefined,
  multiple: boolean,
  onChange?: (value: string | number | (string | number)[]) => void
): string | number | (string | number)[] => {
  if (multiple) {
    const currentArray = Array.isArray(currentValue) ? currentValue : [];
    const isCurrentlySelected = currentArray.includes(optionValue);
    
    const newValue = isCurrentlySelected
      ? currentArray.filter(v => v !== optionValue)
      : [...currentArray, optionValue];
      
    onChange?.(newValue);
    return newValue;
  } else {
    onChange?.(optionValue);
    return optionValue;
  }
};

// Keyboard navigation helpers
export const getNextSelectableIndex = (
  currentIndex: number,
  options: DropdownOption[],
  direction: 'up' | 'down'
): number => {
  const selectableOptions = options.filter(opt => !opt.disabled);
  const currentSelectableIndex = selectableOptions.findIndex(
    opt => opt === options[currentIndex]
  );
  
  let nextIndex: number;
  
  if (direction === 'down') {
    nextIndex = currentSelectableIndex < selectableOptions.length - 1 
      ? currentSelectableIndex + 1 
      : 0;
  } else {
    nextIndex = currentSelectableIndex > 0 
      ? currentSelectableIndex - 1 
      : selectableOptions.length - 1;
  }
  
  const nextOption = selectableOptions[nextIndex];
  return options.findIndex(opt => opt === nextOption);
};

// Handle keyboard events
export const handleKeyDown = (
  event: React.KeyboardEvent,
  isOpen: boolean,
  highlightedIndex: number,
  options: DropdownOption[],
  onToggle: () => void,
  onSelect: (index: number) => void,
  onHighlight: (index: number) => void,
  onClose: () => void
): void => {
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      if (!isOpen) {
        onToggle();
      } else if (options.length > 0) {
        const nextIndex = getNextSelectableIndex(highlightedIndex, options, 'down');
        onHighlight(nextIndex);
      }
      break;
      
    case 'ArrowUp':
      event.preventDefault();
      if (!isOpen) {
        onToggle();
      } else if (options.length > 0) {
        const nextIndex = getNextSelectableIndex(highlightedIndex, options, 'up');
        onHighlight(nextIndex);
      }
      break;
      
    case 'Enter':
    case ' ':
      event.preventDefault();
      if (!isOpen) {
        onToggle();
      } else if (highlightedIndex >= 0 && highlightedIndex < options.length) {
        onSelect(highlightedIndex);
      }
      break;
      
    case 'Escape':
      event.preventDefault();
      if (isOpen) {
        onClose();
      }
      break;
      
    case 'Tab':
      if (isOpen) {
        onClose();
      }
      break;
      
    default:
      break;
  }
};

// Generate unique ID for accessibility
export const generateDropdownId = (): string => {
  return `dropdown-${Math.random().toString(36).substr(2, 9)}`;
};

// Create accessibility props
export const createAccessibilityProps = (
  id: string,
  isOpen: boolean,
  highlightedIndex: number,
  hasError: boolean
) => ({
  'aria-haspopup': 'listbox' as const,
  'aria-expanded': isOpen,
  'aria-controls': `${id}-menu`,
  'aria-activedescendant': highlightedIndex >= 0 ? `${id}-option-${highlightedIndex}` : undefined,
  'aria-invalid': hasError,
  role: 'combobox',
});

// Create menu accessibility props
export const createMenuAccessibilityProps = (id: string) => ({
  id: `${id}-menu`,
  role: 'listbox',
  'aria-label': 'Options',
});

// Create option accessibility props
export const createOptionAccessibilityProps = (
  id: string,
  index: number,
  selected: boolean,
  disabled: boolean
) => ({
  id: `${id}-option-${index}`,
  role: 'option',
  'aria-selected': selected,
  'aria-disabled': disabled,
});

// Click outside detector
export const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  handler: () => void,
  enabled: boolean = true
): void => {
  React.useEffect(() => {
    if (!enabled) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler, enabled]);
};

// Focus management
export const useFocusManagement = (
  isOpen: boolean,
  triggerRef: React.RefObject<HTMLElement | null>,
  menuRef: React.RefObject<HTMLElement | null>
) => {
  const previousOpenRef = React.useRef(isOpen);
  
  React.useEffect(() => {
    // Only manage focus if the open state actually changed (not on initial mount)
    if (previousOpenRef.current !== isOpen) {
      if (isOpen && triggerRef.current) {
        // Keep focus on trigger when menu opens for keyboard navigation
        triggerRef.current.focus();
      }
      // Don't auto-focus on close to prevent unwanted scrolling
    }
    
    previousOpenRef.current = isOpen;
  }, [isOpen, triggerRef, menuRef]);
};

// Portal helper for dropdown positioning
export const createDropdownPortal = (children: React.ReactNode, container?: Element): React.ReactPortal | React.ReactNode => {
  if (typeof document === 'undefined') return children;
  
  const portalContainer = container || document.body;
  
  // Use createPortal from react-dom
  return createPortal(children, portalContainer);
};

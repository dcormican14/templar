import { useEffect, useRef, useCallback } from 'react';

// Debounce hook for search input
export const useDebounce = (
  value: string,
  delay: number,
  callback: (value: string) => void
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(value);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay, callback]);
};

// Keyboard event handlers
export const handleSearchKeyDown = (
  event: React.KeyboardEvent<HTMLInputElement>,
  value: string,
  onSearch?: (value: string) => void,
  onClear?: () => void,
  clearOnEscape: boolean = true
) => {
  switch (event.key) {
    case 'Enter':
      event.preventDefault();
      onSearch?.(value);
      break;
    case 'Escape':
      if (clearOnEscape && value) {
        event.preventDefault();
        onClear?.();
      }
      break;
  }
};

// Generate unique IDs for accessibility
export const generateSearchId = (() => {
  let counter = 0;
  return (prefix: string = 'search') => `${prefix}-${++counter}`;
})();

// Create accessibility props
export const createSearchAccessibilityProps = (
  id: string,
  disabled: boolean,
  error: boolean,
  loading: boolean
) => ({
  id,
  'aria-disabled': disabled,
  'aria-invalid': error,
  'aria-busy': loading,
  role: 'searchbox',
  type: 'search',
});

// Focus management
export const useFocusManagement = (
  inputRef: React.RefObject<HTMLInputElement>,
  autoFocus: boolean = false
) => {
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus, inputRef]);

  const focus = useCallback(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const blur = useCallback(() => {
    inputRef.current?.blur();
  }, [inputRef]);

  const select = useCallback(() => {
    inputRef.current?.select();
  }, [inputRef]);

  return { focus, blur, select };
};

// Search value validation
export const validateSearchValue = (
  value: string,
  minLength?: number,
  maxLength?: number,
  pattern?: RegExp
): { isValid: boolean; error?: string } => {
  if (minLength && value.length < minLength) {
    return {
      isValid: false,
      error: `Search must be at least ${minLength} characters`,
    };
  }

  if (maxLength && value.length > maxLength) {
    return {
      isValid: false,
      error: `Search must be no more than ${maxLength} characters`,
    };
  }

  if (pattern && !pattern.test(value)) {
    return {
      isValid: false,
      error: 'Search contains invalid characters',
    };
  }

  return { isValid: true };
};

// Handle search icon click
export const handleSearchIconClick = (
  value: string,
  onSearch?: (value: string) => void,
  inputRef?: React.RefObject<HTMLInputElement>
) => {
  if (onSearch) {
    onSearch(value);
  } else {
    // If no onSearch handler, just focus the input
    inputRef?.current?.focus();
  }
};

// Handle clear button click
export const handleClearClick = (
  onClear?: () => void,
  onChange?: (value: string) => void,
  inputRef?: React.RefObject<HTMLInputElement>
) => {
  if (onClear) {
    onClear();
  } else if (onChange) {
    onChange('');
  }
  
  // Focus the input after clearing
  setTimeout(() => {
    inputRef?.current?.focus();
  }, 0);
};

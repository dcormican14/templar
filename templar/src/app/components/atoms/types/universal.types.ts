import React from 'react';

// Universal color system used across all atomic components
export type UniversalColor = 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'info' | 'custom';

// Universal variant system used across all atomic components  
export type UniversalVariant = 'solid' | 'ghost' | 'outline' | 'glassmorphic' | 'invisible';

// Universal size system used across all atomic components
export type UniversalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Universal shape system used across all atomic components
export type UniversalShape = 'sharp' | 'round' | 'pill';

// Universal animation mode system used across all atomic components
export type UniversalAnimationMode = 'none' | 'default' | 'parallax' | 'typewriter' | 'isometric';

// Universal animation modes array (for multiple selection)
export type UniversalAnimationModes = UniversalAnimationMode[];

// Base universal props that all atomic components share
export interface UniversalAtomicProps {
  /**
   * Color scheme of the component
   * @default 'primary'
   */
  color?: UniversalColor;
  
  /**
   * Custom color when color is set to 'custom'
   */
  customColor?: string;
  
  /**
   * Visual style variant of the component
   * @default 'solid'
   */
  variant?: UniversalVariant;
  
  /**
   * Shape of the component
   * @default 'round'
   */
  shape?: UniversalShape;
  
  /**
   * Size of the component
   * @default 'md'
   */
  size?: UniversalSize;
  
  /**
   * Whether the component is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether to show loading state
   * @default false
   */
  loading?: boolean;
  
  /**
   * Loading key for global loading state management
   */
  loadingKey?: string;
  
  /**
   * Custom width for the component
   */
  width?: string | number;
  
  /**
   * Custom height for the component
   */
  height?: string | number;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Unique identifier for the component
   */
  id?: string;
  
  /**
   * Test identifier for automated testing
   */
  'data-testid'?: string;
  
  /**
   * Whether to enable animations
   * @default true
   */
  animate?: boolean;
  
  /**
   * Animation mode to use (single mode)
   * @default 'default'
   */
  animationMode?: UniversalAnimationMode;
  
  /**
   * Multiple animation modes to use simultaneously
   */
  animationModes?: UniversalAnimationModes;
  
  /**
   * Animation duration override in milliseconds
   */
  animationDuration?: number;
  
  // Accessibility props commonly used across components
  /**
   * Accessible label for the component
   */
  'aria-label'?: string;
  
  /**
   * References to elements that describe the component
   */
  'aria-describedby'?: string;
  
  /**
   * References to elements that label the component
   */
  'aria-labelledby'?: string;
  
  /**
   * Whether the component is required
   */
  'aria-required'?: boolean;
  
  /**
   * Whether the component is invalid
   */
  'aria-invalid'?: boolean;
  
  /**
   * Additional ARIA attributes
   */
  'aria-expanded'?: boolean;
  'aria-haspopup'?: boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  'aria-hidden'?: boolean;
  'aria-live'?: 'off' | 'assertive' | 'polite';
  
  // Legacy support for deprecated props (will be removed in future versions)
  /**
   * @deprecated Use shape prop instead
   */
  rounded?: boolean;
}

// Extended universal props for interactive components (buttons, inputs, etc.)
export interface UniversalInteractiveProps extends UniversalAtomicProps {
  /**
   * Whether the component is focused
   */
  focused?: boolean;
  
  /**
   * Whether the component is active/pressed
   */
  active?: boolean;
  
  /**
   * Whether the component should take full width
   */
  fullWidth?: boolean;
  
  /**
   * Tab index for keyboard navigation
   */
  tabIndex?: number;
  
  /**
   * Keyboard event handlers
   */
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onKeyUp?: (event: React.KeyboardEvent) => void;
  onKeyPress?: (event: React.KeyboardEvent) => void;
  
  /**
   * Focus event handlers
   */
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
  
  /**
   * Mouse event handlers
   */
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  onMouseDown?: (event: React.MouseEvent) => void;
  onMouseUp?: (event: React.MouseEvent) => void;
  
  /**
   * Touch event handlers
   */
  onTouchStart?: (event: React.TouchEvent) => void;
  onTouchEnd?: (event: React.TouchEvent) => void;
  onTouchMove?: (event: React.TouchEvent) => void;
  onTouchCancel?: (event: React.TouchEvent) => void;
}

// Universal props for form elements
export interface UniversalFormProps extends UniversalInteractiveProps {
  /**
   * Form name attribute
   */
  name?: string;
  
  /**
   * Form value
   */
  value?: any;
  
  /**
   * Default value for uncontrolled components
   */
  defaultValue?: any;
  
  /**
   * Whether the field is required
   */
  required?: boolean;
  
  /**
   * Whether the field is readonly
   */
  readOnly?: boolean;
  
  /**
   * Placeholder text
   */
  placeholder?: string;
  
  /**
   * Helper text displayed below the field
   */
  helperText?: string;
  
  /**
   * Error text (overrides helperText when present)
   */
  errorText?: string;
  
  /**
   * Whether the field has an error state
   */
  error?: boolean;
  
  /**
   * Label text for the field
   */
  label?: string;
  
  /**
   * Change event handler
   */
  onChange?: (value: any, event?: React.ChangeEvent) => void;
  
  /**
   * Input event handler
   */
  onInput?: (event: React.FormEvent) => void;
  
  /**
   * Form validation
   */
  validate?: (value: any) => string | null;
  
  /**
   * Auto-complete attribute
   */
  autoComplete?: string;
  
  /**
   * Auto-focus on mount
   */
  autoFocus?: boolean;
}

// Universal props for container components
export interface UniversalContainerProps extends UniversalAtomicProps {
  /**
   * Child elements
   */
  children?: React.ReactNode;
  
  /**
   * Padding around the content
   */
  padding?: UniversalSize | 'none';
  
  /**
   * Margin around the component
   */
  margin?: UniversalSize | 'none';
  
  /**
   * Gap between child elements
   */
  gap?: UniversalSize | 'none';
  
  /**
   * Whether the container is clickable
   */
  clickable?: boolean;
  
  /**
   * Click event handler
   */
  onClick?: (event: React.MouseEvent) => void;
  
  /**
   * Async click handler
   */
  onAsyncClick?: () => Promise<void>;
  
  /**
   * Maximum width
   */
  maxWidth?: string | number;
  
  /**
   * Maximum height  
   */
  maxHeight?: string | number;
  
  /**
   * Minimum width
   */
  minWidth?: string | number;
  
  /**
   * Minimum height
   */
  minHeight?: string | number;
  
  /**
   * Overflow behavior
   */
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  
  /**
   * Overflow behavior for x-axis
   */
  overflowX?: 'visible' | 'hidden' | 'scroll' | 'auto';
  
  /**
   * Overflow behavior for y-axis
   */
  overflowY?: 'visible' | 'hidden' | 'scroll' | 'auto';
  
  /**
   * Position of the container
   */
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  
  /**
   * Z-index for stacking
   */
  zIndex?: number;
}

// Utility type to merge universal props with component-specific props
export type WithUniversalProps<T extends Record<string, any>> = UniversalAtomicProps & T;

// Utility type for interactive components
export type WithInteractiveProps<T extends Record<string, any>> = UniversalInteractiveProps & T;

// Utility type for form components
export type WithFormProps<T extends Record<string, any>> = UniversalFormProps & T;

// Utility type for container components
export type WithContainerProps<T extends Record<string, any>> = UniversalContainerProps & T;

// Type guards for component prop types
export const isUniversalColor = (value: any): value is UniversalColor => {
  return ['primary', 'secondary', 'success', 'warning', 'destructive', 'info', 'custom'].includes(value);
};

export const isUniversalVariant = (value: any): value is UniversalVariant => {
  return ['solid', 'ghost', 'outline', 'glassmorphic'].includes(value);
};

export const isUniversalSize = (value: any): value is UniversalSize => {
  return ['xs', 'sm', 'md', 'lg', 'xl'].includes(value);
};

export const isUniversalShape = (value: any): value is UniversalShape => {
  return ['sharp', 'round', 'pill'].includes(value);
};

export const isUniversalAnimationMode = (value: any): value is UniversalAnimationMode => {
  return ['none', 'default', 'parallax', 'typewriter', 'isometric'].includes(value);
};

export const isUniversalAnimationModes = (value: any): value is UniversalAnimationModes => {
  return Array.isArray(value) && value.every(isUniversalAnimationMode);
};

// Default values for universal props
export const UNIVERSAL_DEFAULTS = {
  color: 'primary' as UniversalColor,
  variant: 'solid' as UniversalVariant,
  size: 'md' as UniversalSize,
  shape: 'round' as UniversalShape,
  disabled: false,
  loading: false,
  animate: true,
  animationMode: 'default' as UniversalAnimationMode,
} as const;

// Helper function to extract universal props from a props object
export const extractUniversalProps = <T extends UniversalAtomicProps>(
  props: T
): [UniversalAtomicProps, Omit<T, keyof UniversalAtomicProps>] => {
  const {
    color,
    customColor,
    variant,
    shape,
    size,
    disabled,
    loading,
    loadingKey,
    width,
    height,
    className,
    style,
    id,
    'data-testid': dataTestId,
    animate,
    animationMode,
    animationModes,
    animationDuration,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    'aria-labelledby': ariaLabelledBy,
    'aria-required': ariaRequired,
    'aria-invalid': ariaInvalid,
    'aria-expanded': ariaExpanded,
    'aria-haspopup': ariaHasPopup,
    'aria-hidden': ariaHidden,
    'aria-live': ariaLive,
    rounded,
    ...rest
  } = props;

  const universalProps: UniversalAtomicProps = {
    color,
    customColor,
    variant,
    shape,
    size,
    disabled,
    loading,
    loadingKey,
    width,
    height,
    className,
    style,
    id,
    'data-testid': dataTestId,
    animate,
    animationMode,
    animationModes,
    animationDuration,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    'aria-labelledby': ariaLabelledBy,
    'aria-required': ariaRequired,
    'aria-invalid': ariaInvalid,
    'aria-expanded': ariaExpanded,
    'aria-haspopup': ariaHasPopup,
    'aria-hidden': ariaHidden,
    'aria-live': ariaLive,
    rounded,
  };

  return [universalProps, rest as Omit<T, keyof UniversalAtomicProps>];
};

// Helper function to extract form props from a props object
export const extractFormProps = <T extends UniversalFormProps>(
  props: T
): [UniversalFormProps, Omit<T, keyof UniversalFormProps>] => {
  const {
    // Universal atomic props
    color,
    customColor,
    variant,
    shape,
    size,
    disabled,
    loading,
    loadingKey,
    width,
    height,
    className,
    style,
    id,
    'data-testid': dataTestId,
    animate,
    animationMode,
    animationModes,
    animationDuration,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    'aria-labelledby': ariaLabelledBy,
    'aria-required': ariaRequired,
    'aria-invalid': ariaInvalid,
    'aria-expanded': ariaExpanded,
    'aria-haspopup': ariaHasPopup,
    'aria-hidden': ariaHidden,
    'aria-live': ariaLive,
    rounded,
    // Universal interactive props
    focused,
    active,
    fullWidth,
    tabIndex,
    onKeyDown,
    onKeyUp,
    onKeyPress,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onTouchStart,
    onTouchEnd,
    onTouchMove,
    onTouchCancel,
    // Universal form props
    name,
    value,
    defaultValue,
    required,
    readOnly,
    placeholder,
    helperText,
    errorText,
    error,
    label,
    onChange,
    onInput,
    validate,
    autoComplete,
    autoFocus,
    ...rest
  } = props;

  const formProps: UniversalFormProps = {
    color,
    customColor,
    variant,
    shape,
    size,
    disabled,
    loading,
    loadingKey,
    width,
    height,
    className,
    style,
    id,
    'data-testid': dataTestId,
    animate,
    animationMode,
    animationModes,
    animationDuration,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    'aria-labelledby': ariaLabelledBy,
    'aria-required': ariaRequired,
    'aria-invalid': ariaInvalid,
    'aria-expanded': ariaExpanded,
    'aria-haspopup': ariaHasPopup,
    'aria-hidden': ariaHidden,
    'aria-live': ariaLive,
    rounded,
    focused,
    active,
    fullWidth,
    tabIndex,
    onKeyDown,
    onKeyUp,
    onKeyPress,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onTouchStart,
    onTouchEnd,
    onTouchMove,
    onTouchCancel,
    name,
    value,
    defaultValue,
    required,
    readOnly,
    placeholder,
    helperText,
    errorText,
    error,
    label,
    onChange,
    onInput,
    validate,
    autoComplete,
    autoFocus,
  };

  return [formProps, rest as Omit<T, keyof UniversalFormProps>];
};

// Helper function to extract container props from a props object
export const extractContainerProps = <T extends UniversalContainerProps>(
  props: T
): [UniversalContainerProps, Omit<T, keyof UniversalContainerProps>] => {
  const {
    // Universal atomic props
    color,
    customColor,
    variant,
    shape,
    size,
    disabled,
    loading,
    loadingKey,
    width,
    height,
    className,
    style,
    id,
    'data-testid': dataTestId,
    animate,
    animationMode,
    animationModes,
    animationDuration,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    'aria-labelledby': ariaLabelledBy,
    'aria-required': ariaRequired,
    'aria-invalid': ariaInvalid,
    'aria-expanded': ariaExpanded,
    'aria-haspopup': ariaHasPopup,
    'aria-hidden': ariaHidden,
    'aria-live': ariaLive,
    rounded,
    // Universal container props
    children,
    padding,
    margin,
    gap,
    clickable,
    onClick,
    onAsyncClick,
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,
    overflow,
    overflowX,
    overflowY,
    position,
    zIndex,
    ...rest
  } = props;

  const containerProps: UniversalContainerProps = {
    color,
    customColor,
    variant,
    shape,
    size,
    disabled,
    loading,
    loadingKey,
    width,
    height,
    className,
    style,
    id,
    'data-testid': dataTestId,
    animate,
    animationMode,
    animationModes,
    animationDuration,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    'aria-labelledby': ariaLabelledBy,
    'aria-required': ariaRequired,
    'aria-invalid': ariaInvalid,
    'aria-expanded': ariaExpanded,
    'aria-haspopup': ariaHasPopup,
    'aria-hidden': ariaHidden,
    'aria-live': ariaLive,
    rounded,
    children,
    padding,
    margin,
    gap,
    clickable,
    onClick,
    onAsyncClick,
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,
    overflow,
    overflowX,
    overflowY,
    position,
    zIndex,
  };

  return [containerProps, rest as Omit<T, keyof UniversalContainerProps>];
};

// Helper function to extract interactive props from a props object
export const extractInteractiveProps = <T extends UniversalInteractiveProps>(
  props: T
): [UniversalInteractiveProps, Omit<T, keyof UniversalInteractiveProps>] => {
  const {
    // Universal atomic props
    color,
    customColor,
    variant,
    shape,
    size,
    disabled,
    loading,
    loadingKey,
    width,
    height,
    className,
    style,
    id,
    'data-testid': dataTestId,
    animate,
    animationMode,
    animationModes,
    animationDuration,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    'aria-labelledby': ariaLabelledBy,
    'aria-required': ariaRequired,
    'aria-invalid': ariaInvalid,
    'aria-expanded': ariaExpanded,
    'aria-haspopup': ariaHasPopup,
    'aria-hidden': ariaHidden,
    'aria-live': ariaLive,
    rounded,
    // Universal interactive props
    focused,
    active,
    fullWidth,
    tabIndex,
    onKeyDown,
    onKeyUp,
    onKeyPress,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onTouchStart,
    onTouchEnd,
    onTouchMove,
    onTouchCancel,
    ...rest
  } = props;

  const interactiveProps: UniversalInteractiveProps = {
    color,
    customColor,
    variant,
    shape,
    size,
    disabled,
    loading,
    loadingKey,
    width,
    height,
    className,
    style,
    id,
    'data-testid': dataTestId,
    animate,
    animationMode,
    animationModes,
    animationDuration,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    'aria-labelledby': ariaLabelledBy,
    'aria-required': ariaRequired,
    'aria-invalid': ariaInvalid,
    'aria-expanded': ariaExpanded,
    'aria-haspopup': ariaHasPopup,
    'aria-hidden': ariaHidden,
    'aria-live': ariaLive,
    rounded,
    focused,
    active,
    fullWidth,
    tabIndex,
    onKeyDown,
    onKeyUp,
    onKeyPress,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onTouchStart,
    onTouchEnd,
    onTouchMove,
    onTouchCancel,
  };

  return [interactiveProps, rest as Omit<T, keyof UniversalInteractiveProps>];
};
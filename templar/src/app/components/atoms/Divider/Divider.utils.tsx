/**
 * Creates accessible attributes for the divider
 */
export const createAccessibilityProps = (label?: React.ReactNode) => ({
  role: 'separator',
  'aria-orientation': 'horizontal' as const,
  'aria-label': typeof label === 'string' ? label : undefined,
});

/**
 * Creates vertical accessibility attributes for the divider
 */
export const createVerticalAccessibilityProps = (label?: React.ReactNode) => ({
  role: 'separator',
  'aria-orientation': 'vertical' as const,
  'aria-label': typeof label === 'string' ? label : undefined,
});

/**
 * Validates if the divider configuration is valid
 */
export const validateDividerProps = (
  dashed: boolean,
  dotted: boolean,
  orientation: string,
  fullSize: boolean
): boolean => {
  // Cannot be both dashed and dotted
  if (dashed && dotted) {
    console.warn('Divider: Cannot be both dashed and dotted. Dashed will take precedence.');
    return false;
  }
  
  // Vertical dividers should have a minimum height when not fullSize
  if (orientation === 'vertical' && !fullSize) {
    // This is handled in styles, just a note for developers
  }
  
  return true;
};

/**
 * Creates theme-aware label content
 */
export const createLabelContent = (
  label: React.ReactNode,
  cssVars: any
): React.ReactElement => {
  if (typeof label === 'string') {
    return (
      <span>
        {label}
      </span>
    );
  }
  
  return label as React.ReactElement;
};

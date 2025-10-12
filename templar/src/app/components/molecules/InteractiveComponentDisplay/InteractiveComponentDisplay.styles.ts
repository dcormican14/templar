import type { ThemeVariables } from '../../../providers/ThemeProvider';

// Container styles
export const createContainerStyles = (
  size: string,
  layout: string,
  cssVars: ThemeVariables
): React.CSSProperties => ({
  display: 'flex',
  flexDirection: layout === 'vertical' ? 'column' : 'row',
  gap: size === 'sm' ? '16px' : size === 'md' ? '20px' : size === 'lg' ? '24px' : '32px',
  width: '100%',
  maxWidth: size === 'sm' ? '800px' : size === 'md' ? '1000px' : size === 'lg' ? '1200px' : '1400px',
  margin: '0 auto',
  backgroundColor: cssVars.card,
  borderRadius: '12px',
  border: `1px solid ${cssVars.border}`,
  overflow: 'visible',
});

// Header styles
export const createHeaderStyles = (cssVars: ThemeVariables): React.CSSProperties => ({
  padding: '16px 24px',
  borderBottom: `1px solid ${cssVars.border}`,
  backgroundColor: cssVars.backgroundAccent,
});

export const getTitleStyles = (cssVars: ThemeVariables): React.CSSProperties => ({
  fontSize: '18px',
  fontWeight: '600',
  color: cssVars.foreground,
  margin: '0 0 4px 0',
});

export const getDescriptionStyles = (cssVars: ThemeVariables): React.CSSProperties => ({
  fontSize: '14px',
  color: cssVars.foregroundAccent,
  margin: '0',
});

// Main content area styles
export const createMainContentStyles = (
  layout: string,
  showControls: boolean
): React.CSSProperties => ({
  display: 'flex',
  flexDirection: layout === 'vertical' ? 'column' : 'row',
  flex: 1,
  minHeight: layout === 'vertical' ? 'auto' : '400px',
});

// Display area styles
export const createDisplayAreaStyles = (
  padded: boolean,
  background: string,
  cssVars: ThemeVariables,
  displayStyle?: React.CSSProperties
): React.CSSProperties => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: padded ? '32px' : '0',
  backgroundColor: getBackgroundPattern(background, cssVars),
  backgroundImage: getBackgroundImage(background, cssVars),
  backgroundSize: background === 'dots' ? '20px 20px' : background === 'grid' ? '20px 20px' : 'none',
  backgroundRepeat: background !== 'none' && background !== 'subtle' ? 'repeat' : 'no-repeat',
  position: 'relative',
  minHeight: '200px',
  overflow: 'visible',
  ...displayStyle,
});

// Control panel styles
export const createControlPanelStyles = (
  side: 'left' | 'right',
  size: string,
  cssVars: ThemeVariables
): React.CSSProperties => ({
  width: size === 'sm' ? '250px' : size === 'md' ? '280px' : '320px',
  backgroundColor: cssVars.backgroundAccent,
  borderLeft: side === 'right' ? `1px solid ${cssVars.border}` : 'none',
  borderRight: side === 'left' ? `1px solid ${cssVars.border}` : 'none',
  padding: '16px',
  overflowY: 'auto',
  maxHeight: '600px',
});

// Control group styles
export const getControlGroupStyles = (cssVars: ThemeVariables): React.CSSProperties => ({
  marginBottom: '20px',
});

export const getControlGroupTitleStyles = (cssVars: ThemeVariables): React.CSSProperties => ({
  fontSize: '14px',
  fontWeight: '600',
  color: cssVars.foreground,
  marginBottom: '12px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
});

// Control item styles
export const getControlItemStyles = (): React.CSSProperties => ({
  marginBottom: '12px',
});

export const getControlLabelStyles = (cssVars: ThemeVariables): React.CSSProperties => ({
  display: 'block',
  fontSize: '12px',
  fontWeight: '500',
  color: cssVars.foregroundAccent,
  marginBottom: '4px',
  textTransform: 'capitalize' as const,
});

// Code preview styles
export const createCodePreviewStyles = (cssVars: ThemeVariables): React.CSSProperties => ({
  backgroundColor: cssVars.backgroundAccent,
  borderTop: `1px solid ${cssVars.border}`,
  padding: '16px',
  fontFamily: 'Monaco, Consolas, "Courier New", monospace',
  fontSize: '12px',
  color: cssVars.foregroundAccent,
  overflowX: 'auto' as const,
  maxHeight: '200px',
});

// Helper functions
const getBackgroundPattern = (background: string, cssVars: ThemeVariables): string => {
  switch (background) {
    case 'subtle':
      return cssVars.backgroundAccent;
    case 'dots':
    case 'grid':
      return cssVars.background;
    default:
      return cssVars.background;
  }
};

const getBackgroundImage = (background: string, cssVars: ThemeVariables): string => {
  switch (background) {
    case 'dots':
      return `radial-gradient(circle, ${cssVars.border} 1px, transparent 1px)`;
    case 'grid':
      return `
        linear-gradient(to right, ${cssVars.border} 1px, transparent 1px),
        linear-gradient(to bottom, ${cssVars.border} 1px, transparent 1px)
      `;
    default:
      return 'none';
  }
};

// Control input styles
export const getSelectStyles = (cssVars: ThemeVariables): React.CSSProperties => ({
  width: '100%',
  padding: '6px 8px',
  borderRadius: '6px',
  border: `1px solid ${cssVars.border}`,
  backgroundColor: cssVars.background,
  color: cssVars.foreground,
  fontSize: '12px',
  cursor: 'pointer',
});

export const getCheckboxStyles = (): React.CSSProperties => ({
  marginRight: '6px',
});

export const getInputStyles = (cssVars: ThemeVariables): React.CSSProperties => ({
  width: '100%',
  padding: '6px 8px',
  borderRadius: '6px',
  border: `1px solid ${cssVars.border}`,
  backgroundColor: cssVars.background,
  color: cssVars.foreground,
  fontSize: '12px',
});

export const getColorInputStyles = (cssVars: ThemeVariables): React.CSSProperties => ({
  width: '100%',
  height: '32px',
  padding: '2px',
  borderRadius: '6px',
  border: `1px solid ${cssVars.border}`,
  backgroundColor: cssVars.background,
  cursor: 'pointer',
});
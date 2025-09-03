import type { 
  WithInteractiveProps, 
  UniversalSize, 
  UniversalColor, 
  UniversalVariant, 
  UniversalShape 
} from '../types';

// Component-specific type aliases (for backward compatibility)
export type ButtonColor = UniversalColor;
export type ButtonVariant = UniversalVariant;
export type ButtonSize = UniversalSize;
export type ButtonShape = UniversalShape;
export type IconPosition = 'leading' | 'trailing';

// Component-specific props (not covered by universal props)
export interface ButtonSpecificProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Icon to display in the button
   */
  icon?: React.ReactNode;
  
  /**
   * Position of the icon relative to the text
   * @default 'leading'
   */
  iconPosition?: IconPosition;
  
  /**
   * Async click handler for loading states
   */
  onAsyncClick?: () => Promise<void>;
}

// Complete Button props interface extending universal props
export interface ButtonProps extends WithInteractiveProps<ButtonSpecificProps> {}

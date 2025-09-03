import type { 
  WithContainerProps, 
  UniversalSize, 
  UniversalColor, 
  UniversalVariant, 
  UniversalShape 
} from '../types';

// Component-specific type aliases (for backward compatibility)
export type CardColor = UniversalColor;
export type CardVariant = UniversalVariant;
export type CardSize = UniversalSize;
export type CardShape = UniversalShape;

// Component-specific props (not covered by universal props)
export interface CardSpecificProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional header content
   */
  header?: React.ReactNode;
  
  /**
   * Optional footer content
   */
  footer?: React.ReactNode;
}

// Complete Card props interface extending universal props
export interface CardProps extends WithContainerProps<CardSpecificProps> {}

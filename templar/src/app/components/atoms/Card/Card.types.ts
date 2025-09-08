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

// Text alignment options for header and footer
export type CardTextAlignment = 'left' | 'center' | 'right';

// Component-specific props (not covered by universal props)
export interface CardSpecificProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional header content (rendered above the card)
   */
  header?: React.ReactNode;
  
  /**
   * Optional footer content (rendered below the card)
   */
  footer?: React.ReactNode;
  
  /**
   * Alignment for header text
   * @default 'left'
   */
  headerAlignment?: CardTextAlignment;
  
  /**
   * Alignment for footer text
   * @default 'left'
   */
  footerAlignment?: CardTextAlignment;
}

// Complete Card props interface extending universal props
export interface CardProps extends WithContainerProps<CardSpecificProps> {}

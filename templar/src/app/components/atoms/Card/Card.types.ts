export type CardColor = 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'info' | 'custom' | 'default';
export type CardVariant = 'solid' | 'ghost' | 'outline';
export type CardSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type CardShape = 'sharp' | 'round' | 'pill';
export type CardPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Color scheme of the card
   * @default 'default'
   */
  color?: CardColor;
  
  /**
   * Custom color when color is set to 'custom'
   */
  customColor?: string;
  
  /**
   * Visual style variant of the card
   * @default 'solid'
   */
  variant?: CardVariant;
  
  /**
   * Size affects border radius and minimum dimensions
   * @default 'md'
   */
  size?: CardSize;
  
  /**
   * Shape of the card corners
   * @default 'round'
   */
  shape?: CardShape;
  
  /**
   * Internal padding of the card (follows 4px spacing system)
   * @default 'md'
   */
  padding?: CardPadding;
  
  /**
   * Whether the card is clickable (adds hover effects)
   * @default false
   */
  clickable?: boolean;
  
  /**
   * Whether the card is disabled (affects styling and interactions)
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether to show loading state
   * @default false
   */
  loading?: boolean;
  
  /**
   * Optional header content
   */
  header?: React.ReactNode;
  
  /**
   * Optional footer content
   */
  footer?: React.ReactNode;
  
  /**
   * Async click handler for clickable cards
   */
  onAsyncClick?: () => Promise<void>;
  
  // Legacy support - will be deprecated
  /** @deprecated Use shape="pill" instead */
  rounded?: boolean;
}

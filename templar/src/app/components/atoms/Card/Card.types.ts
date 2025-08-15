export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled' | 'transparent';
export type CardSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type CardPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual style variant of the card
   * @default 'default'
   */
  variant?: CardVariant;
  
  /**
   * Size affects border radius and default padding
   * @default 'md'
   */
  size?: CardSize;
  
  /**
   * Internal padding of the card
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
}

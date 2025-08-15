export type DividerVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'default';
export type DividerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual style variant of the divider
   * @default 'default'
   */
  variant?: DividerVariant;
  
  /**
   * Thickness/size of the divider line
   * @default 'md'
   */
  size?: DividerSize;
  
  /**
   * Orientation of the divider
   * @default 'horizontal'
   */
  orientation?: DividerOrientation;
  
  /**
   * Spacing around the divider (follows 4px spacing system)
   * @default 'md'
   */
  spacing?: DividerSpacing;
  
  /**
   * Whether the divider should use rounded ends
   * @default false
   */
  rounded?: boolean;
  
  /**
   * Whether the divider should take full width/height
   * @default true
   */
  fullSize?: boolean;
  
  /**
   * Optional text label to display in the center of the divider
   */
  label?: React.ReactNode;
  
  /**
   * Position of the label on the divider
   * @default 'center'
   */
  labelPosition?: 'start' | 'center' | 'end';
  
  /**
   * Whether to apply opacity to create a subtle appearance
   * @default false
   */
  subtle?: boolean;
  
  /**
   * Whether to use a dashed line style
   * @default false
   */
  dashed?: boolean;
  
  /**
   * Whether to use a dotted line style
   * @default false
   */
  dotted?: boolean;
}

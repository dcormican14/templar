export type SegmentedControlSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SegmentedControlVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'warning' | 'success';

export interface SegmentedControlProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: string[];
  selectedIndex?: number;
  defaultSelectedIndex?: number;
  onChange?: (selectedIndex: number, selectedItem: string) => void;
  size?: SegmentedControlSize;
  variant?: SegmentedControlVariant;
  disabled?: boolean;
  fullWidth?: boolean;
  rounded?: boolean;
  name?: string;
}

export interface SegmentedControlRef {
  focus: () => void;
  blur: () => void;
  selectIndex: (index: number) => void;
}
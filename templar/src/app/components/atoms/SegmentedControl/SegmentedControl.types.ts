import type { UniversalSize, UniversalVariant, UniversalColor, UniversalShape } from '../types';

export type SegmentedControlSize = UniversalSize;
export type SegmentedControlVariant = UniversalVariant;
export type SegmentedControlColor = UniversalColor;
export type SegmentedControlShape = UniversalShape;

export interface SegmentedControlProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: string[];
  selectedIndex?: number;
  defaultSelectedIndex?: number;
  onChange?: (selectedIndex: number, selectedItem: string) => void;
  size?: SegmentedControlSize;
  variant?: SegmentedControlVariant;
  color?: SegmentedControlColor;
  customColor?: string;
  shape?: SegmentedControlShape;
  disabled?: boolean;
  loading?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  animate?: boolean;
  // Legacy support
  rounded?: boolean;
  name?: string;
  // Interactive config props (used by showcase, filtered out before DOM)
  itemCount?: number;
  item1?: string;
  item2?: string;
  item3?: string;
  item4?: string;
  item5?: string;
  _itemsComputed?: boolean;
}

export interface SegmentedControlRef {
  focus: () => void;
  blur: () => void;
  selectIndex: (index: number) => void;
}
import { SegmentedControlSize, SegmentedControlVariant } from './SegmentedControl.types';

export const getDefaultSize = (): SegmentedControlSize => 'md';
export const getDefaultVariant = (): SegmentedControlVariant => 'solid';

export const validateSegmentedControlProps = (props: {
  items: string[];
  selectedIndex?: number;
  defaultSelectedIndex?: number;
}) => {
  if (process.env.NODE_ENV === 'development') {
    if (props.items.length === 0) {
      console.warn('SegmentedControl: items array should not be empty');
    }
    
    if (props.selectedIndex !== undefined && (props.selectedIndex < 0 || props.selectedIndex >= props.items.length)) {
      console.warn(`SegmentedControl: selectedIndex (${props.selectedIndex}) is out of range for items array of length ${props.items.length}`);
    }
    
    if (props.defaultSelectedIndex !== undefined && (props.defaultSelectedIndex < 0 || props.defaultSelectedIndex >= props.items.length)) {
      console.warn(`SegmentedControl: defaultSelectedIndex (${props.defaultSelectedIndex}) is out of range for items array of length ${props.items.length}`);
    }
  }
};

export const getAriaAttributes = (props: {
  selectedIndex: number;
  disabled: boolean;
  name?: string;
}) => ({
  role: 'tablist',
  'aria-orientation': 'horizontal' as const,
  'aria-disabled': props.disabled,
  'aria-label': props.name,
});

export const getSegmentAriaAttributes = (props: {
  index: number;
  isSelected: boolean;
  disabled: boolean;
  item: string;
  segmentId: string;
}) => ({
  role: 'tab',
  'aria-selected': props.isSelected,
  'aria-disabled': props.disabled,
  'aria-label': props.item,
  id: props.segmentId,
  tabIndex: props.isSelected ? 0 : -1,
});

export const handleKeyboardNavigation = (
  event: React.KeyboardEvent,
  currentIndex: number,
  itemsLength: number,
  onIndexChange: (index: number) => void,
  disabled: boolean
) => {
  if (disabled) return;
  
  let newIndex = currentIndex;
  
  switch (event.key) {
    case 'ArrowLeft':
    case 'ArrowUp':
      event.preventDefault();
      newIndex = currentIndex > 0 ? currentIndex - 1 : itemsLength - 1;
      break;
    case 'ArrowRight':
    case 'ArrowDown':
      event.preventDefault();
      newIndex = currentIndex < itemsLength - 1 ? currentIndex + 1 : 0;
      break;
    case 'Home':
      event.preventDefault();
      newIndex = 0;
      break;
    case 'End':
      event.preventDefault();
      newIndex = itemsLength - 1;
      break;
    default:
      return;
  }
  
  if (newIndex !== currentIndex) {
    onIndexChange(newIndex);
  }
};
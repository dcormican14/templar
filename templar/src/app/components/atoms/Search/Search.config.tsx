import React from 'react';
import { Search } from './Search';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { universalColorControls, universalSizeShapeControls, universalStateControls } from '../shared/universalControls';
import type { ControlType } from '../../molecules/InteractiveComponentDisplay/InteractiveComponentDisplay.types';
import { useToast } from '../../../providers/ToastProvider';

// Wrapper component that uses the toast hook
const DynamicSearchDemo: React.FC<any> = (props) => {
  const { info, success } = useToast();
  const [searchValue, setSearchValue] = React.useState(props.value || "");

  // Update internal state when props.value changes
  React.useEffect(() => {
    setSearchValue(props.value || "");
  }, [props.value]);

  const handleChange = (value: string) => {
    setSearchValue(value);
    console.log('Search value changed:', value);
  };

  const handleSearch = (value: string) => {
    if (value.trim()) {
      success('Search performed!', `You searched for: "${value}"`);
    } else {
      info('Empty search', 'Please enter a search term');
    }
  };

  const handleClear = () => {
    setSearchValue("");
    info('Search cleared', 'Search input has been cleared');
  };

  const handleOpenClick = () => {
    if (searchValue.trim()) {
      info('Open action', `Opening search results for: "${searchValue}"`);
    } else {
      info('Open action', 'Click to open search interface');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Search
        placeholder={props.placeholder || "Search for anything..."}
        value={searchValue}
        onChange={handleChange}
        onSearch={handleSearch}
        onClear={handleClear}
        color={props.color}
        variant={props.variant}
        size={props.size}
        shape={props.shape}
        disabled={props.disabled}
        loading={props.loading}
        error={props.error}
        label={props.label}
        helperText={props.helperText}
        width={props.width}
        height={props.height}
        showSearchIcon={props.showSearchIcon}
        showClearButton={props.showClearButton}
        searchIconPosition={props.searchIconPosition}
        clearOnEscape={props.clearOnEscape}
        debounceDelay={props.debounceDelay}
        required={props.required}
        readOnly={props.readOnly}
        autoFocus={props.autoFocus}
        autoComplete={props.autoComplete}
      />
      <Button
        onClick={handleOpenClick}
        disabled={props.disabled}
        variant={props.variant}
        color={props.error ? 'destructive' : props.color}
        size={props.size}
        shape={props.shape}
        icon={<Icon name="OpenInWindow" size={props.size} />}
        aria-label="Open in new window"
      />
    </div>
  );
};

export const SearchConfig = {
  component: <DynamicSearchDemo />,
  leftControls: [universalColorControls, universalSizeShapeControls],
  rightControls: [
    universalStateControls,
    {
      title: 'Search Options',
      controls: [
        {
          key: 'placeholder',
          label: 'Placeholder',
          type: 'text' as ControlType
        },
        {
          key: 'value',
          label: 'Search Value',
          type: 'text' as ControlType
        },
        {
          key: 'showSearchIcon',
          label: 'Show Search Icon',
          type: 'checkbox' as ControlType
        },
        {
          key: 'showClearButton',
          label: 'Show Clear Button',
          type: 'checkbox' as ControlType
        },
        {
          key: 'searchIconPosition',
          label: 'Search Icon Position',
          type: 'select' as ControlType,
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' }
          ]
        },
        {
          key: 'clearOnEscape',
          label: 'Clear on Escape',
          type: 'checkbox' as ControlType
        },
        {
          key: 'debounceDelay',
          label: 'Debounce Delay (ms)',
          type: 'number' as ControlType
        }
      ]
    },
    {
      title: 'Form Options',
      controls: [
        {
          key: 'label',
          label: 'Label',
          type: 'text' as ControlType
        },
        {
          key: 'helperText',
          label: 'Helper Text',
          type: 'text' as ControlType
        },
        {
          key: 'required',
          label: 'Required',
          type: 'checkbox' as ControlType
        },
        {
          key: 'readOnly',
          label: 'Read Only',
          type: 'checkbox' as ControlType
        },
        {
          key: 'autoFocus',
          label: 'Auto Focus',
          type: 'checkbox' as ControlType
        },
        {
          key: 'autoComplete',
          label: 'Auto Complete',
          type: 'select' as ControlType,
          options: [
            { label: 'Off', value: 'off' },
            { label: 'On', value: 'on' },
            { label: 'Name', value: 'name' },
            { label: 'Email', value: 'email' },
            { label: 'Username', value: 'username' },
            { label: 'Organization', value: 'organization' }
          ]
        }
      ]
    }
  ],
  initialProps: {
    color: 'primary',
    variant: 'outline',
    size: 'md',
    shape: 'round',
    placeholder: 'Search for anything...',
    value: '',
    showSearchIcon: true,
    showClearButton: true,
    searchIconPosition: 'left',
    clearOnEscape: true,
    debounceDelay: 300,
    label: '',
    helperText: '',
    required: false,
    readOnly: false,
    autoFocus: false,
    autoComplete: 'off',
    // Computed props for callbacks
    _callbacksComputed: true
  }
};
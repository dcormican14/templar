export interface PropInfo {
  name: string;
  type: string;
  description: string;
  defaultValue?: string;
  required: boolean;
}

export interface ComponentPropsInfo {
  universalProps: PropInfo[];
  specificProps: PropInfo[];
  componentType: 'interactive' | 'form' | 'container' | 'atomic';
}

// Universal props shared across all components
const baseUniversalProps: PropInfo[] = [
  {
    name: 'color',
    type: "'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'info' | 'custom'",
    description: 'Color scheme of the component',
    defaultValue: "'primary'",
    required: false
  },
  {
    name: 'variant',
    type: "'solid' | 'ghost' | 'outline' | 'glassmorphic' | 'invisible'",
    description: 'Visual style variant of the component',
    defaultValue: "'solid'",
    required: false
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    description: 'Size of the component',
    defaultValue: "'md'",
    required: false
  },
  {
    name: 'shape',
    type: "'sharp' | 'round' | 'pill'",
    description: 'Shape of the component',
    defaultValue: "'round'",
    required: false
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'Whether the component is disabled',
    defaultValue: 'false',
    required: false
  },
  {
    name: 'loading',
    type: 'boolean',
    description: 'Whether to show loading state',
    defaultValue: 'false',
    required: false
  },
  {
    name: 'animate',
    type: 'boolean',
    description: 'Whether to enable animations',
    defaultValue: 'true',
    required: false
  },
  {
    name: 'animationMode',
    type: "'none' | 'default' | 'parallax' | 'typewriter' | 'isometric'",
    description: 'Animation mode to use',
    defaultValue: "'default'",
    required: false
  },
  {
    name: 'width',
    type: 'string | number',
    description: 'Custom width for the component',
    required: false
  },
  {
    name: 'height',
    type: 'string | number',
    description: 'Custom height for the component',
    required: false
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS class names',
    required: false
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    description: 'Additional inline styles',
    required: false
  }
];

const interactiveProps: PropInfo[] = [
  ...baseUniversalProps,
  {
    name: 'fullWidth',
    type: 'boolean',
    description: 'Whether the component should take full width',
    required: false
  },
  {
    name: 'tabIndex',
    type: 'number',
    description: 'Tab index for keyboard navigation',
    required: false
  }
];

const formProps: PropInfo[] = [
  ...interactiveProps,
  {
    name: 'name',
    type: 'string',
    description: 'Form name attribute',
    required: false
  },
  {
    name: 'value',
    type: 'any',
    description: 'Form value',
    required: false
  },
  {
    name: 'required',
    type: 'boolean',
    description: 'Whether the field is required',
    required: false
  },
  {
    name: 'label',
    type: 'string',
    description: 'Label text for the field',
    required: false
  },
  {
    name: 'placeholder',
    type: 'string',
    description: 'Placeholder text',
    required: false
  },
  {
    name: 'helperText',
    type: 'string',
    description: 'Helper text displayed below the field',
    required: false
  },
  {
    name: 'error',
    type: 'boolean',
    description: 'Whether the field has an error state',
    required: false
  },
  {
    name: 'errorText',
    type: 'string',
    description: 'Error text (overrides helperText when present)',
    required: false
  }
];

const containerProps: PropInfo[] = [
  ...baseUniversalProps,
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Child elements',
    required: false
  },
  {
    name: 'padding',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none'",
    description: 'Padding around the content',
    required: false
  },
  {
    name: 'gap',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none'",
    description: 'Gap between child elements',
    required: false
  },
  {
    name: 'clickable',
    type: 'boolean',
    description: 'Whether the container is clickable',
    required: false
  }
];

// Component-specific props data
export const componentPropsData: Record<string, ComponentPropsInfo> = {
  Button: {
    componentType: 'interactive',
    universalProps: interactiveProps,
    specificProps: [
      {
        name: 'icon',
        type: 'React.ReactNode',
        description: 'Icon to display in the button',
        required: false
      },
      {
        name: 'iconPosition',
        type: "'leading' | 'trailing'",
        description: 'Position of the icon relative to the text',
        defaultValue: "'leading'",
        required: false
      },
      {
        name: 'onAsyncClick',
        type: '() => Promise<void>',
        description: 'Async click handler for loading states',
        required: false
      },
      {
        name: 'children',
        type: 'React.ReactNode',
        description: 'Button content',
        required: false
      }
    ]
  },
  Card: {
    componentType: 'container',
    universalProps: containerProps,
    specificProps: [
      {
        name: 'header',
        type: 'React.ReactNode',
        description: 'Optional header content (rendered above the card)',
        required: false
      },
      {
        name: 'footer',
        type: 'React.ReactNode',
        description: 'Optional footer content (rendered below the card)',
        required: false
      },
      {
        name: 'headerAlignment',
        type: "'left' | 'center' | 'right'",
        description: 'Alignment for header text',
        defaultValue: "'left'",
        required: false
      },
      {
        name: 'footerAlignment',
        type: "'left' | 'center' | 'right'",
        description: 'Alignment for footer text',
        defaultValue: "'left'",
        required: false
      }
    ]
  },
  Toggle: {
    componentType: 'form',
    universalProps: formProps,
    specificProps: [
      {
        name: 'checked',
        type: 'boolean',
        description: 'Whether the toggle is checked/active',
        required: false
      },
      {
        name: 'defaultChecked',
        type: 'boolean',
        description: 'Default checked state for uncontrolled component',
        required: false
      },
      {
        name: 'onChange',
        type: '(checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void',
        description: 'Callback fired when the toggle state changes',
        required: false
      },
      {
        name: 'description',
        type: 'string',
        description: 'Description text shown below the label',
        required: false
      },
      {
        name: 'labelPosition',
        type: "'left' | 'right'",
        description: 'Whether to show the label on the left or right side',
        defaultValue: "'right'",
        required: false
      }
    ]
  },
  CheckBox: {
    componentType: 'form',
    universalProps: formProps,
    specificProps: [
      {
        name: 'checked',
        type: 'boolean',
        description: 'Whether the checkbox is checked',
        required: false
      },
      {
        name: 'defaultChecked',
        type: 'boolean',
        description: 'Default checked state for uncontrolled component',
        required: false
      },
      {
        name: 'indeterminate',
        type: 'boolean',
        description: 'Whether to show indeterminate state',
        required: false
      },
      {
        name: 'onChange',
        type: '(checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void',
        description: 'Callback fired when the checkbox state changes',
        required: false
      }
    ]
  },
  Slider: {
    componentType: 'form',
    universalProps: formProps,
    specificProps: [
      {
        name: 'min',
        type: 'number',
        description: 'Minimum value',
        defaultValue: '0',
        required: false
      },
      {
        name: 'max',
        type: 'number',
        description: 'Maximum value',
        defaultValue: '100',
        required: false
      },
      {
        name: 'step',
        type: 'number',
        description: 'Step increment',
        defaultValue: '1',
        required: false
      },
      {
        name: 'showValue',
        type: 'boolean',
        description: 'Whether to show the current value',
        defaultValue: 'true',
        required: false
      },
      {
        name: 'showMarkers',
        type: 'boolean',
        description: 'Whether to show step markers',
        defaultValue: 'false',
        required: false
      }
    ]
  },
  TextArea: {
    componentType: 'form',
    universalProps: formProps,
    specificProps: [
      {
        name: 'rows',
        type: 'number',
        description: 'Number of visible text rows',
        defaultValue: '4',
        required: false
      },
      {
        name: 'resize',
        type: "'none' | 'both' | 'horizontal' | 'vertical'",
        description: 'Resize behavior',
        defaultValue: "'vertical'",
        required: false
      },
      {
        name: 'maxLength',
        type: 'number',
        description: 'Maximum character length',
        required: false
      },
      {
        name: 'showCount',
        type: 'boolean',
        description: 'Whether to show character count',
        defaultValue: 'false',
        required: false
      }
    ]
  },
  Search: {
    componentType: 'form',
    universalProps: formProps,
    specificProps: [
      {
        name: 'onSearch',
        type: '(value: string) => void',
        description: 'Callback fired when search is submitted',
        required: false
      },
      {
        name: 'onClear',
        type: '() => void',
        description: 'Callback fired when search is cleared',
        required: false
      },
      {
        name: 'showClearButton',
        type: 'boolean',
        description: 'Whether to show clear button',
        defaultValue: 'true',
        required: false
      }
    ]
  },
  Icon: {
    componentType: 'atomic',
    universalProps: baseUniversalProps,
    specificProps: [
      {
        name: 'name',
        type: 'string',
        description: 'Name of the icon from Iconoir library',
        required: true
      },
      {
        name: 'strokeWidth',
        type: 'number',
        description: 'Stroke width of the icon',
        defaultValue: '1.5',
        required: false
      }
    ]
  },
  Badge: {
    componentType: 'atomic',
    universalProps: baseUniversalProps,
    specificProps: [
      {
        name: 'children',
        type: 'React.ReactNode',
        description: 'Badge content',
        required: false
      },
      {
        name: 'dot',
        type: 'boolean',
        description: 'Whether to show as a dot badge',
        defaultValue: 'false',
        required: false
      }
    ]
  },
  Divider: {
    componentType: 'atomic',
    universalProps: baseUniversalProps,
    specificProps: [
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        description: 'Orientation of the divider',
        defaultValue: "'horizontal'",
        required: false
      },
      {
        name: 'thickness',
        type: 'number',
        description: 'Thickness in pixels',
        defaultValue: '1',
        required: false
      },
      {
        name: 'label',
        type: 'string',
        description: 'Optional label text',
        required: false
      }
    ]
  },
  RadioButton: {
    componentType: 'form',
    universalProps: formProps,
    specificProps: [
      {
        name: 'label',
        type: 'React.ReactNode',
        description: 'Label text for the radio button',
        required: false
      },
      {
        name: 'header',
        type: 'React.ReactNode',
        description: 'Header text shown above the radio button and label',
        required: false
      },
      {
        name: 'labelPosition',
        type: "'left' | 'right'",
        description: 'Position of the label relative to the radio button',
        defaultValue: "'right'",
        required: false
      },
      {
        name: 'contentToggleable',
        type: 'boolean',
        description: 'Whether clicking on the label/description should toggle the radio button',
        defaultValue: 'true',
        required: false
      }
    ]
  },
  SegmentedControl: {
    componentType: 'interactive',
    universalProps: interactiveProps,
    specificProps: [
      {
        name: 'items',
        type: 'string[]',
        description: 'Array of segment items to display',
        required: true
      },
      {
        name: 'selectedIndex',
        type: 'number',
        description: 'Controlled selected index',
        required: false
      },
      {
        name: 'defaultSelectedIndex',
        type: 'number',
        description: 'Default selected index for uncontrolled component',
        required: false
      },
      {
        name: 'onChange',
        type: '(selectedIndex: number, selectedItem: string) => void',
        description: 'Callback when selection changes',
        required: false
      },
      {
        name: 'fullWidth',
        type: 'boolean',
        description: 'Whether the control should span full width',
        defaultValue: 'false',
        required: false
      }
    ]
  },
  FilePicker: {
    componentType: 'form',
    universalProps: formProps,
    specificProps: [
      {
        name: 'accept',
        type: 'string',
        description: 'Accept attribute for file input (file types)',
        required: false
      },
      {
        name: 'maxSize',
        type: 'number',
        description: 'Maximum file size in bytes',
        required: false
      },
      {
        name: 'maxFiles',
        type: 'number',
        description: 'Maximum number of files (automatically enables multiple when > 1)',
        defaultValue: '1',
        required: false
      },
      {
        name: 'uploadText',
        type: 'string',
        description: 'Custom text for the upload area',
        required: false
      },
      {
        name: 'subText',
        type: 'string',
        description: 'Custom text shown below the main upload text',
        required: false
      },
      {
        name: 'placeholder',
        type: 'string',
        description: 'Placeholder text for the drop zone',
        required: false
      },
      {
        name: 'icon',
        type: 'React.ReactNode',
        description: 'Custom icon for the upload area',
        required: false
      },
      {
        name: 'onFilesChange',
        type: '(files: File[]) => void',
        description: 'Callback fired when files are selected or dropped',
        required: false
      },
      {
        name: 'onError',
        type: '(error: string) => void',
        description: 'Callback fired when there\'s an error (file too large, too many files, etc.)',
        required: false
      },
      {
        name: 'files',
        type: 'File[]',
        description: 'Current selected files (for controlled component)',
        required: false
      },
      {
        name: 'showFileList',
        type: 'boolean',
        description: 'Whether to show the file list',
        defaultValue: 'true',
        required: false
      }
    ]
  },
  Notification: {
    componentType: 'container',
    universalProps: containerProps,
    specificProps: [
      {
        name: 'title',
        type: 'string',
        description: 'Main title/heading of the notification',
        required: true
      },
      {
        name: 'description',
        type: 'string',
        description: 'Optional description or detailed message',
        required: false
      },
      {
        name: 'dismissible',
        type: 'boolean',
        description: 'Whether the notification can be dismissed',
        defaultValue: 'true',
        required: false
      },
      {
        name: 'showIcon',
        type: 'boolean',
        description: 'Whether to show an icon based on the notification color',
        defaultValue: 'true',
        required: false
      },
      {
        name: 'customIcon',
        type: 'React.ReactNode',
        description: 'Custom icon to display instead of the default color icon',
        required: false
      },
      {
        name: 'actions',
        type: 'NotificationAction[]',
        description: 'Optional action button(s)',
        required: false
      },
      {
        name: 'onDismiss',
        type: '() => void',
        description: 'Callback when notification is dismissed',
        required: false
      },
      {
        name: 'duration',
        type: 'number | null',
        description: 'Auto-dismiss duration in milliseconds (0 or null to disable)',
        required: false
      },
      {
        name: 'showProgress',
        type: 'boolean',
        description: 'Progress indicator for auto-dismiss',
        defaultValue: 'false',
        required: false
      },
      {
        name: 'toastPosition',
        type: "'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center'",
        description: 'Toast position for notifications',
        defaultValue: "'top-right'",
        required: false
      }
    ]
  },
  CodeBlock: {
    componentType: 'container',
    universalProps: containerProps,
    specificProps: [
      {
        name: 'language',
        type: 'string',
        description: 'Programming language for syntax highlighting',
        required: false
      },
      {
        name: 'copyable',
        type: 'boolean',
        description: 'Whether to show a copy button',
        defaultValue: 'false',
        required: false
      },
      {
        name: 'lineNumbers',
        type: 'boolean',
        description: 'Whether to show line numbers',
        defaultValue: 'false',
        required: false
      },
      {
        name: 'highlight',
        type: 'number | number[]',
        description: 'Line numbers to highlight',
        required: false
      },
      {
        name: 'syntaxHighlighting',
        type: 'boolean',
        description: 'Whether to enable syntax highlighting',
        defaultValue: 'true',
        required: false
      },
      {
        name: 'inline',
        type: 'boolean',
        description: 'Whether to render as inline code instead of block code',
        defaultValue: 'false',
        required: false
      },
      {
        name: 'onCopy',
        type: '(content: string) => void',
        description: 'Callback when copy button is clicked',
        required: false
      },
      {
        name: 'children',
        type: 'string | React.ReactNode',
        description: 'Code content to display',
        required: true
      }
    ]
  },
  ProgressIndicator: {
    componentType: 'container',
    universalProps: containerProps,
    specificProps: [
      {
        name: 'type',
        type: "'bar' | 'progressBar' | 'circular'",
        description: 'Type of progress indicator to display',
        defaultValue: "'spinner'",
        required: false
      },
      {
        name: 'value',
        type: 'number',
        description: 'Progress value (0-100)',
        defaultValue: '0',
        required: false
      },
      {
        name: 'max',
        type: 'number',
        description: 'Maximum value for progress calculation',
        defaultValue: '100',
        required: false
      },
      {
        name: 'showPercentage',
        type: 'boolean',
        description: 'Whether to show percentage text',
        defaultValue: 'false',
        required: false
      },
      {
        name: 'showValue',
        type: 'boolean',
        description: 'Whether to show the current value',
        defaultValue: 'false',
        required: false
      },
      {
        name: 'label',
        type: 'string',
        description: 'Custom label text',
        required: false
      },
      {
        name: 'duration',
        type: 'number',
        description: 'Animation duration in milliseconds',
        defaultValue: '300',
        required: false
      },
      {
        name: 'striped',
        type: 'boolean',
        description: 'Whether to use striped pattern',
        defaultValue: 'false',
        required: false
      },
      {
        name: 'stripedAnimation',
        type: 'boolean',
        description: 'Whether stripes should animate',
        defaultValue: 'false',
        required: false
      },
      {
        name: 'indeterminate',
        type: 'boolean',
        description: 'Whether to show indeterminate loading state',
        defaultValue: 'false',
        required: false
      },
      {
        name: 'autoProgress',
        type: 'boolean',
        description: 'Whether to automatically increment progress value',
        defaultValue: 'false',
        required: false
      },
      {
        name: 'autoProgressDuration',
        type: 'number',
        description: 'Duration in milliseconds for auto progress to complete (0-100%)',
        defaultValue: '3000',
        required: false
      }
    ]
  },
  Dropdown: {
    componentType: 'container',
    universalProps: containerProps,
    specificProps: [
      {
        name: 'position',
        type: "'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'left' | 'right'",
        description: 'Position of the dropdown menu relative to trigger',
        defaultValue: "'bottom-start'",
        required: false
      },
      {
        name: 'options',
        type: '(DropdownOption | DropdownGroup)[]',
        description: 'Dropdown options or groups',
        required: true
      },
      {
        name: 'value',
        type: 'string | number | (string | number)[]',
        description: 'Currently selected value(s)',
        required: false
      },
      {
        name: 'multiple',
        type: 'boolean',
        description: 'Whether multiple selection is allowed',
        defaultValue: 'false',
        required: false
      },
      {
        name: 'searchable',
        type: 'boolean',
        description: 'Whether to show search/filter input',
        defaultValue: 'false',
        required: false
      },
      {
        name: 'searchPlaceholder',
        type: 'string',
        description: 'Search placeholder text',
        defaultValue: "'Search...'",
        required: false
      },
      {
        name: 'closeOnSelect',
        type: 'boolean',
        description: 'Whether to close dropdown after selection (ignored for multiple)',
        defaultValue: 'true',
        required: false
      },
      {
        name: 'maxHeight',
        type: 'string',
        description: 'Maximum height of dropdown menu',
        defaultValue: "'300px'",
        required: false
      },
      {
        name: 'trigger',
        type: 'React.ReactNode',
        description: 'Custom trigger element',
        required: false
      },
      {
        name: 'portal',
        type: 'boolean',
        description: 'Whether to use portals for dropdown menu',
        defaultValue: 'false',
        required: false
      },
      {
        name: 'emptyMessage',
        type: 'string',
        description: 'Custom empty state message',
        defaultValue: "'No options available'",
        required: false
      },
      {
        name: 'noResultsMessage',
        type: 'string',
        description: 'Custom no results message for search',
        defaultValue: "'No results found'",
        required: false
      },
      {
        name: 'open',
        type: 'boolean',
        description: 'Whether dropdown menu is currently open (controlled)',
        required: false
      },
      {
        name: 'onOpenChange',
        type: '(open: boolean) => void',
        description: 'Callback when dropdown open state changes',
        required: false
      },
      {
        name: 'icon',
        type: 'React.ReactNode',
        description: 'Custom icon for the dropdown trigger',
        required: false
      },
      {
        name: 'showArrow',
        type: 'boolean',
        description: 'Whether to show the dropdown arrow',
        defaultValue: 'true',
        required: false
      },
      {
        name: 'header',
        type: 'React.ReactNode',
        description: 'Optional header content (rendered above the dropdown)',
        required: false
      },
      {
        name: 'headerAlignment',
        type: "'left' | 'center' | 'right'",
        description: 'Alignment of the header text',
        defaultValue: "'left'",
        required: false
      },
      {
        name: 'placeholder',
        type: 'string',
        description: 'Placeholder text for the dropdown trigger',
        required: false
      },
      {
        name: 'onChange',
        type: '(value: string | number | (string | number)[]) => void',
        description: 'Callback when selection changes',
        required: false
      }
    ]
  },
  Scrollbar: {
    componentType: 'container',
    universalProps: containerProps,
    specificProps: [
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical' | 'both'",
        description: 'The orientation of the scrollbar',
        defaultValue: "'vertical'",
        required: false
      },
      {
        name: 'visibility',
        type: "'always' | 'hover' | 'auto' | 'hidden'",
        description: 'Whether to show the scrollbar always or only on hover',
        defaultValue: "'auto'",
        required: false
      },
      {
        name: 'alignment',
        type: "'start' | 'end'",
        description: 'Alignment of the scrollbar (start = left/top, end = right/bottom)',
        defaultValue: "'end'",
        required: false
      },
      {
        name: 'smoothScrolling',
        type: 'boolean',
        description: 'Whether to enable smooth scrolling',
        defaultValue: 'true',
        required: false
      },
      {
        name: 'momentum',
        type: 'boolean',
        description: 'Whether to enable scroll momentum on touch devices',
        defaultValue: 'true',
        required: false
      },
      {
        name: 'showIndicators',
        type: 'boolean',
        description: 'Whether to enable scroll indicators',
        defaultValue: 'false',
        required: false
      },
      {
        name: 'onScroll',
        type: '(event: React.UIEvent<HTMLDivElement>) => void',
        description: 'Callback when scroll position changes',
        required: false
      },
      {
        name: 'thumbSize',
        type: 'number',
        description: 'Custom scroll thumb size (0-1 representing percentage of track)',
        required: false
      }
    ]
  },
  FallingLeaves: {
    componentType: 'atomic',
    universalProps: baseUniversalProps,
    specificProps: [
      {
        name: 'leafCount',
        type: 'number',
        description: 'Number of leaves to maintain on screen',
        required: false
      },
      {
        name: 'spawnRate',
        type: 'number',
        description: 'How often to spawn new leaves (ms)',
        required: false
      },
      {
        name: 'enabled',
        type: 'boolean',
        description: 'Enable/disable the effect',
        required: false
      }
    ]
  }
};

/**
 * Get props info for a component
 */
export function getComponentProps(componentName: string): ComponentPropsInfo | null {
  return componentPropsData[componentName] || null;
}

/**
 * Format props info as markdown for display in documentation
 */
export function formatPropsAsMarkdown(propsInfo: ComponentPropsInfo): string {
  let markdown = '';

  if (propsInfo.specificProps.length > 0) {
    markdown += '### Component-Specific Props\n\n';
    markdown += '| Name | Type | Description | Default | Required |\n';
    markdown += '|------|------|-------------|---------|----------|\n';

    propsInfo.specificProps.forEach(prop => {
      const type = prop.type.length > 50 ? prop.type.substring(0, 47) + '...' : prop.type;
      markdown += `| \`${prop.name}\` | \`${type}\` | ${prop.description} | ${prop.defaultValue || '-'} | ${prop.required ? 'Yes' : 'No'} |\n`;
    });

    markdown += '\n';
  }

  markdown += '### Universal Props\n\n';
  markdown += `This component extends the **${getUniversalPropsTypeName(propsInfo.componentType)}**, providing consistent theming, sizing, and behavior across all Templar components.\n\n`;

  markdown += '| Name | Type | Description | Default |\n';
  markdown += '|------|------|-------------|----------|\n';

  propsInfo.universalProps.forEach(prop => {
    const type = prop.type.length > 50 ? prop.type.substring(0, 47) + '...' : prop.type;
    markdown += `| \`${prop.name}\` | \`${type}\` | ${prop.description} | ${prop.defaultValue || '-'} |\n`;
  });

  return markdown;
}

function getUniversalPropsTypeName(componentType: string): string {
  switch (componentType) {
    case 'interactive':
      return 'Universal Interactive Props';
    case 'form':
      return 'Universal Form Props';
    case 'container':
      return 'Universal Container Props';
    default:
      return 'Universal Atomic Props';
  }
}

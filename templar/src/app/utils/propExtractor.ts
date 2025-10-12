import * as fs from 'fs';
import * as path from 'path';

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

/**
 * Extract prop information from a component's .types.ts file
 */
export function extractComponentProps(componentName: string): ComponentPropsInfo | null {
  try {
    const typesFilePath = getTypesFilePath(componentName);
    if (!typesFilePath || !fs.existsSync(typesFilePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(typesFilePath, 'utf-8');

    // Determine component type from file content
    const componentType = determineComponentType(fileContent);

    // Extract specific props from the SpecificProps interface
    const specificProps = extractSpecificPropsFromFile(fileContent, componentName);

    // Get universal props based on component type
    const universalProps = getUniversalPropsForType(componentType);

    return {
      universalProps,
      specificProps,
      componentType
    };
  } catch (error) {
    console.error(`Error extracting props for ${componentName}:`, error);
    return null;
  }
}

function getTypesFilePath(componentName: string): string | null {
  // Try atoms first
  const atomPath = path.join(
    process.cwd(),
    'src',
    'app',
    'components',
    'atoms',
    componentName,
    `${componentName}.types.ts`
  );

  if (fs.existsSync(atomPath)) {
    return atomPath;
  }

  // Try molecules
  const moleculePath = path.join(
    process.cwd(),
    'src',
    'app',
    'components',
    'molecules',
    componentName,
    `${componentName}.types.ts`
  );

  if (fs.existsSync(moleculePath)) {
    return moleculePath;
  }

  return null;
}

function determineComponentType(fileContent: string): 'interactive' | 'form' | 'container' | 'atomic' {
  if (fileContent.includes('WithFormProps')) {
    return 'form';
  }
  if (fileContent.includes('WithInteractiveProps')) {
    return 'interactive';
  }
  if (fileContent.includes('WithContainerProps')) {
    return 'container';
  }
  return 'atomic';
}

function extractSpecificPropsFromFile(fileContent: string, componentName: string): PropInfo[] {
  const props: PropInfo[] = [];

  // Find the SpecificProps interface
  const interfaceRegex = new RegExp(
    `export interface ${componentName}SpecificProps[^{]*{([^}]*)}`,
    's'
  );

  const match = fileContent.match(interfaceRegex);
  if (!match) {
    return props;
  }

  const interfaceContent = match[1];

  // Extract each property with its JSDoc comment
  const propRegex = /\/\*\*\s*([\s\S]*?)\s*\*\/\s*(\w+)(\?)?:\s*([^;]+);/g;

  let propMatch;
  while ((propMatch = propRegex.exec(interfaceContent)) !== null) {
    const [, comment, propName, optional, propType] = propMatch;

    // Extract description and default value from JSDoc
    const description = comment
      .split('\n')
      .map(line => line.trim().replace(/^\*\s?/, ''))
      .filter(line => !line.startsWith('@'))
      .join(' ')
      .trim();

    const defaultMatch = comment.match(/@default\s+(.+)/);
    const defaultValue = defaultMatch ? defaultMatch[1].trim() : undefined;

    props.push({
      name: propName,
      type: propType.trim(),
      description,
      defaultValue,
      required: !optional
    });
  }

  return props;
}

function getUniversalPropsForType(componentType: 'interactive' | 'form' | 'container' | 'atomic'): PropInfo[] {
  const baseProps: PropInfo[] = [
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
    }
  ];

  if (componentType === 'interactive' || componentType === 'form') {
    baseProps.push(
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
    );
  }

  if (componentType === 'form') {
    baseProps.push(
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
    );
  }

  if (componentType === 'container') {
    baseProps.push(
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
    );
  }

  return baseProps;
}

/**
 * Format props info as markdown for display in documentation
 */
export function formatPropsAsMarkdown(propsInfo: ComponentPropsInfo): string {
  let markdown = '## Props\n\n';

  if (propsInfo.specificProps.length > 0) {
    markdown += '### Component-Specific Props\n\n';
    markdown += '| Name | Type | Description | Default | Required |\n';
    markdown += '|------|------|-------------|---------|----------|\n';

    propsInfo.specificProps.forEach(prop => {
      markdown += `| \`${prop.name}\` | \`${prop.type}\` | ${prop.description} | ${prop.defaultValue || '-'} | ${prop.required ? 'Yes' : 'No'} |\n`;
    });

    markdown += '\n';
  }

  markdown += '### Universal Props\n\n';
  markdown += `This component extends the **${getUniversalPropsTypeName(propsInfo.componentType)}**, providing consistent theming, sizing, and behavior across all Templar components.\n\n`;
  markdown += '| Name | Type | Description | Default |\n';
  markdown += '|------|------|-------------|----------|\n';

  propsInfo.universalProps.forEach(prop => {
    markdown += `| \`${prop.name}\` | \`${prop.type}\` | ${prop.description} | ${prop.defaultValue || '-'} |\n`;
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

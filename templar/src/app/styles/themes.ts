/**
 * Theme utilities and constants for the Templar design system
 */

export const THEME_NAMES = {
  LIGHT: 'light',
  DARK: 'dark',
  HIGH_CONTRAST: 'high-contrast',
  SEPIA: 'sepia',
  SOLARIZED_DARK: 'solarized-dark',
  SYSTEM: 'system',
  AUTO: 'auto',
} as const;

export type ThemeName = typeof THEME_NAMES[keyof typeof THEME_NAMES];

export interface ThemeInfo {
  name: ThemeName;
  displayName: string;
  description: string;
  category: 'light' | 'dark' | 'special' | 'utility';
  cssFile: string;
  isAccessibility?: boolean;
  isDeveloperFriendly?: boolean;
  isComfortReading?: boolean;
}

export const THEME_REGISTRY: Record<ThemeName, ThemeInfo> = {
  [THEME_NAMES.LIGHT]: {
    name: 'light',
    displayName: 'Light',
    description: 'Default bright theme for general use',
    category: 'light',
    cssFile: '/styles/themes/light.css',
  },
  [THEME_NAMES.DARK]: {
    name: 'dark',
    displayName: 'Dark',
    description: 'Low-light environments, battery saving on OLED screens',
    category: 'dark',
    cssFile: '/styles/themes/dark.css',
  },
  [THEME_NAMES.HIGH_CONTRAST]: {
    name: 'high-contrast',
    displayName: 'High Contrast',
    description: 'Maximum readability for low-vision users',
    category: 'special',
    cssFile: '/styles/themes/high-contrast.css',
    isAccessibility: true,
  },
  [THEME_NAMES.SEPIA]: {
    name: 'sepia',
    displayName: 'Sepia',
    description: 'Comfortable reading mode, reduces eye strain',
    category: 'special',
    cssFile: '/styles/themes/sepia.css',
    isComfortReading: true,
  },
  [THEME_NAMES.SOLARIZED_DARK]: {
    name: 'solarized-dark',
    displayName: 'Solarized Dark',
    description: 'Developer-friendly balanced contrast, popular in coding tools',
    category: 'dark',
    cssFile: '/styles/themes/solarized-dark.css',
    isDeveloperFriendly: true,
  },
  [THEME_NAMES.SYSTEM]: {
    name: 'system',
    displayName: 'System',
    description: 'Follow OS preference automatically',
    category: 'utility',
    cssFile: '', // Uses system preference
  },
  [THEME_NAMES.AUTO]: {
    name: 'auto',
    displayName: 'Auto',
    description: 'Time-based switching (light during day, dark at night)',
    category: 'utility',
    cssFile: '', // Uses time-based logic
  },
};

/**
 * Get theme information by name
 */
export function getThemeInfo(themeName: ThemeName): ThemeInfo | undefined {
  return THEME_REGISTRY[themeName];
}

/**
 * Get all themes by category
 */
export function getThemesByCategory(category: ThemeInfo['category']): ThemeInfo[] {
  return Object.values(THEME_REGISTRY).filter(theme => theme.category === category);
}

/**
 * Get themes with specific features
 */
export function getAccessibilityThemes(): ThemeInfo[] {
  return Object.values(THEME_REGISTRY).filter(theme => theme.isAccessibility);
}

export function getDeveloperThemes(): ThemeInfo[] {
  return Object.values(THEME_REGISTRY).filter(theme => theme.isDeveloperFriendly);
}

export function getComfortReadingThemes(): ThemeInfo[] {
  return Object.values(THEME_REGISTRY).filter(theme => theme.isComfortReading);
}

/**
 * Check if a theme is a dark variant
 */
export function isDarkTheme(themeName: ThemeName): boolean {
  const theme = getThemeInfo(themeName);
  return theme?.category === 'dark' || themeName === 'solarized-dark';
}

/**
 * Get the opposite theme (light <-> dark)
 */
export function getOppositeTheme(themeName: ThemeName): ThemeName {
  switch (themeName) {
    case 'light':
      return 'dark';
    case 'dark':
      return 'light';
    case 'solarized-dark':
      return 'light';
    default:
      return themeName; // Return same for special themes
  }
}

/**
 * CSS custom property names used by the theme system
 */
export const CSS_VARIABLES = {
  BACKGROUND: '--background',
  FOREGROUND: '--foreground',
  PRIMARY: '--primary',
  PRIMARY_FOREGROUND: '--primary-foreground',
  PRIMARY_HOVER: '--primary-hover',
  SECONDARY: '--secondary',
  SECONDARY_FOREGROUND: '--secondary-foreground',
  SECONDARY_HOVER: '--secondary-hover',
  ACCENT: '--accent',
  ACCENT_FOREGROUND: '--accent-foreground',
  BORDER: '--border',
  BORDER_HOVER: '--border-hover',
  MUTED: '--muted',
  MUTED_FOREGROUND: '--muted-foreground',
  SUCCESS: '--success',
  SUCCESS_FOREGROUND: '--success-foreground',
  WARNING: '--warning',
  WARNING_FOREGROUND: '--warning-foreground',
  ERROR: '--error',
  ERROR_FOREGROUND: '--error-foreground',
  INFO: '--info',
  INFO_FOREGROUND: '--info-foreground',
  CARD: '--card',
  CARD_FOREGROUND: '--card-foreground',
  INPUT: '--input',
  INPUT_BORDER: '--input-border',
  INPUT_PLACEHOLDER: '--input-placeholder',
  SHADOW_SM: '--shadow-sm',
  SHADOW: '--shadow',
  SHADOW_MD: '--shadow-md',
  SHADOW_LG: '--shadow-lg',
} as const;

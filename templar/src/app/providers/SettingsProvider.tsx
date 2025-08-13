'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface AppSettings {
  language: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  timezone: string;
  currency: string;
  autoSave: boolean;
  notifications: {
    email: boolean;
    push: boolean;
    sound: boolean;
  };
  appearance: {
    fontSize: 'sm' | 'md' | 'lg';
    density: 'compact' | 'comfortable' | 'spacious';
    animations: boolean;
  };
  privacy: {
    analytics: boolean;
    crashReporting: boolean;
  };
}

const defaultSettings: AppSettings = {
  language: 'en',
  dateFormat: 'MM/dd/yyyy',
  timeFormat: '12h',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  currency: 'USD',
  autoSave: true,
  notifications: {
    email: true,
    push: true,
    sound: true,
  },
  appearance: {
    fontSize: 'md',
    density: 'comfortable',
    animations: true,
  },
  privacy: {
    analytics: false,
    crashReporting: false,
  },
};

interface SettingsContextType {
  settings: AppSettings;
  updateSettings: (updates: Partial<AppSettings>) => void;
  updateNestedSetting: <T extends keyof AppSettings>(
    category: T,
    updates: Partial<AppSettings[T]>
  ) => void;
  resetSettings: () => void;
  exportSettings: () => string;
  importSettings: (settingsJson: string) => boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

interface SettingsProviderProps {
  children: React.ReactNode;
  storageKey?: string;
  defaultSettings?: Partial<AppSettings>;
}

export function SettingsProvider({
  children,
  storageKey = 'templar-settings',
  defaultSettings: customDefaults,
}: SettingsProviderProps) {
  const [settings, setSettings] = useState<AppSettings>(() => ({
    ...defaultSettings,
    ...customDefaults,
  }));

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsedSettings = JSON.parse(stored);
        setSettings(current => ({
          ...current,
          ...parsedSettings,
        }));
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  }, [storageKey]);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }, [settings, storageKey]);

  const updateSettings = useCallback((updates: Partial<AppSettings>) => {
    setSettings(current => ({
      ...current,
      ...updates,
    }));
  }, []);

  const updateNestedSetting = useCallback(<T extends keyof AppSettings>(
    category: T,
    updates: Partial<AppSettings[T]>
  ) => {
    setSettings(current => ({
      ...current,
      [category]: {
        ...(current[category] as object),
        ...updates,
      },
    }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings({ ...defaultSettings, ...customDefaults });
  }, [customDefaults]);

  const exportSettings = useCallback(() => {
    return JSON.stringify(settings, null, 2);
  }, [settings]);

  const importSettings = useCallback((settingsJson: string) => {
    try {
      const parsedSettings = JSON.parse(settingsJson);
      setSettings(current => ({
        ...current,
        ...parsedSettings,
      }));
      return true;
    } catch (error) {
      console.error('Failed to import settings:', error);
      return false;
    }
  }, []);

  const value: SettingsContextType = {
    settings,
    updateSettings,
    updateNestedSetting,
    resetSettings,
    exportSettings,
    importSettings,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

// Utility hooks for specific settings
export function useLanguage() {
  const { settings, updateSettings } = useSettings();
  return {
    language: settings.language,
    setLanguage: (language: string) => updateSettings({ language }),
  };
}

export function useNotificationSettings() {
  const { settings, updateNestedSetting } = useSettings();
  return {
    notifications: settings.notifications,
    updateNotifications: (updates: Partial<AppSettings['notifications']>) =>
      updateNestedSetting('notifications', updates),
  };
}

export function useAppearanceSettings() {
  const { settings, updateNestedSetting } = useSettings();
  return {
    appearance: settings.appearance,
    updateAppearance: (updates: Partial<AppSettings['appearance']>) =>
      updateNestedSetting('appearance', updates),
  };
}

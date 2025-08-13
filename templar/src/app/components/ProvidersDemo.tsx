'use client';

import React from 'react';
import {
  useAuth,
  useTheme,
  useToast,
  useLoading,
  useModal,
  useSettings,
  useAsyncOperation,
} from '../providers';

export function ProvidersDemo() {
  const { user, login, logout, isAuthenticated, isLoading: authLoading } = useAuth();
  const { theme, resolvedTheme, setTheme, toggleTheme, availableThemes, cycleTheme } = useTheme();
  const { success, error, warning, info } = useToast();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { openModal, closeAllModals } = useModal();
  const { settings, updateSettings } = useSettings();
  const { execute } = useAsyncOperation();

  const handleLogin = async () => {
    try {
      await login('demo@templar.dev', 'password123');
      success('Welcome back!', 'You have been successfully logged in.');
    } catch (err) {
      error('Login failed', 'Please check your credentials and try again.');
    }
  };

  const handleAsyncDemo = async () => {
    await execute('demo-operation', async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      success('Operation completed!', 'The async operation finished successfully.');
    });
  };

  const openExampleModal = () => {
    openModal({
      title: 'Example Modal',
      size: 'md',
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            This is an example modal opened using the ModalProvider.
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => info('Modal action', 'You clicked a button in the modal!')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Info Toast
            </button>
            <button
              onClick={() => warning('Warning', 'This is a warning from the modal!')}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Warning Toast
            </button>
          </div>
        </div>
      ),
      onClose: () => {
        info('Modal closed', 'The modal was closed.');
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Templar Providers Demo
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Explore the features of our provider ecosystem
        </p>
      </header>

      {/* Theme Controls */}
      <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Theme Provider
        </h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Current: {theme} (resolved: {resolvedTheme})
            </span>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Toggle Theme
            </button>
            <button
              onClick={cycleTheme}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Cycle Themes
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {availableThemes.map((themeOption) => {
              const getThemeDescription = (theme: string) => {
                switch (theme) {
                  case 'light': return 'Light - Default bright theme';
                  case 'dark': return 'Dark - Low-light environments';
                  case 'high-contrast': return 'High Contrast - Maximum readability';
                  case 'sepia': return 'Sepia - Comfortable reading mode';
                  case 'solarized-dark': return 'Solarized Dark - Developer-friendly';
                  case 'system': return 'System - Follow OS preference';
                  case 'auto': return 'Auto - Time-based switching';
                  default: return theme.charAt(0).toUpperCase() + theme.slice(1);
                }
              };

              return (
                <button
                  key={themeOption}
                  onClick={() => setTheme(themeOption)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors text-left ${
                    theme === themeOption
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                  }`}
                >
                  <div className="font-semibold">{themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}</div>
                  <div className="text-xs opacity-75 mt-1">{getThemeDescription(themeOption).split(' - ')[1] || ''}</div>
                </button>
              );
            })}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <div><strong>Light:</strong> Default bright theme for general use</div>
            <div><strong>Dark:</strong> Low-light environments, battery saving on OLED screens</div>
            <div><strong>High Contrast:</strong> Maximum readability for low-vision users</div>
            <div><strong>Sepia:</strong> Comfortable reading mode, reduces eye strain</div>
            <div><strong>Solarized Dark:</strong> Developer-friendly balanced contrast, popular in coding tools</div>
            <div><strong>System:</strong> Follows your OS preference | <strong>Auto:</strong> Light during day (6 AM - 6 PM), dark at night</div>
          </div>
        </div>
      </section>

      {/* Auth Controls */}
      <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Auth Provider
        </h2>
        <div className="space-y-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {user?.avatar && (
                  <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
                )}
                <span className="text-gray-900 dark:text-white">
                  Welcome, {user?.name}!
                </span>
              </div>
              <button
                onClick={logout}
                disabled={authLoading}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
              >
                {authLoading ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              disabled={authLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {authLoading ? 'Logging in...' : 'Login (Demo)'}
            </button>
          )}
        </div>
      </section>

      {/* Toast Controls */}
      <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Toast Provider
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => success('Success!', 'This is a success message.')}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Success Toast
          </button>
          <button
            onClick={() => error('Error!', 'This is an error message.')}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Error Toast
          </button>
          <button
            onClick={() => warning('Warning!', 'This is a warning message.')}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Warning Toast
          </button>
          <button
            onClick={() => info('Info!', 'This is an info message.')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Info Toast
          </button>
        </div>
      </section>

      {/* Loading Controls */}
      <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Loading Provider
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              startLoading('manual-test');
              setTimeout(() => stopLoading('manual-test'), 3000);
            }}
            disabled={isLoading('manual-test')}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
          >
            {isLoading('manual-test') ? 'Loading...' : 'Manual Loading (3s)'}
          </button>
          <button
            onClick={handleAsyncDemo}
            disabled={isLoading('demo-operation')}
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:opacity-50"
          >
            {isLoading('demo-operation') ? 'Processing...' : 'Async Operation (2s)'}
          </button>
        </div>
      </section>

      {/* Modal Controls */}
      <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Modal Provider
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={openExampleModal}
            className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
          >
            Open Modal
          </button>
          <button
            onClick={closeAllModals}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Close All Modals
          </button>
        </div>
      </section>

      {/* Settings Controls */}
      <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Settings Provider
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Language
              </label>
              <select
                value={settings.language}
                onChange={(e) => updateSettings({ language: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Font Size
              </label>
              <select
                value={settings.appearance.fontSize}
                onChange={(e) => updateSettings({ 
                  appearance: { 
                    ...settings.appearance, 
                    fontSize: e.target.value as any 
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="autoSave"
              checked={settings.autoSave}
              onChange={(e) => updateSettings({ autoSave: e.target.checked })}
              className="rounded border-gray-300 dark:border-gray-600"
            />
            <label htmlFor="autoSave" className="text-sm text-gray-700 dark:text-gray-300">
              Enable auto-save
            </label>
          </div>
        </div>
      </section>
    </div>
  );
}

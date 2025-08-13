'use client';

import React, { useState, useEffect } from 'react';
import {
  useTheme,
  useToast,
  useAuth,
  useLoading,
  useModal,
  useSettings,
  useAsyncOperation
} from './providers';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-lg">Loading Templar providers...</div>
      </div>
    );
  }

  return <ProviderTestContent />;
}

function ProviderTestContent() {
  const { theme, setTheme, availableThemes, toggleTheme, resolvedTheme } = useTheme();
  const { success, error, warning, info, clearToasts, toasts } = useToast();
  const { user, login, logout, isAuthenticated, isLoading: authLoading } = useAuth();
  const { startLoading, stopLoading, isLoading, isAnyLoading } = useLoading();
  const { openModal, closeAllModals, modals } = useModal();
  const { settings, updateSettings, resetSettings } = useSettings();
  const { execute } = useAsyncOperation();

  // Test functions
  const handleLogin = async () => {
    try {
      await login('test@example.com', 'password123');
      success('Login Successful!', 'Welcome back to Templar');
    } catch (err) {
      error('Login Failed', 'Invalid credentials');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      info('Logged Out', 'You have been successfully logged out');
    } catch (err) {
      error('Logout Failed', 'Something went wrong');
    }
  };

  const simulateLoading = () => {
    startLoading('demo');
    setTimeout(() => {
      stopLoading('demo');
      success('Loading Complete!', 'Demo loading operation finished');
    }, 3000);
  };

  const simulateAsyncOperation = () => {
    execute('async-demo', async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      return 'Async operation completed!';
    }).then(result => {
      success('Async Success', result as string);
    });
  };

  const openTestModal = () => {
    openModal({
      title: 'Test Modal',
      content: (
        <div className="p-4">
          <p className="mb-4">This is a test modal to demonstrate the Modal Provider!</p>
          <div className="flex gap-2">
            <button
              onClick={() => success('Modal Action', 'Button clicked from within modal')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Test Toast from Modal
            </button>
          </div>
        </div>
      ),
      size: 'md',
      closable: true,
    });
  };

  const openLargeModal = () => {
    openModal({
      title: 'Large Test Modal',
      content: (
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Large Modal Content</h3>
          <p className="mb-4">This demonstrates a larger modal size with more content.</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
              <h4 className="font-medium mb-2">Feature 1</h4>
              <p className="text-sm">Description of feature one</p>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
              <h4 className="font-medium mb-2">Feature 2</h4>
              <p className="text-sm">Description of feature two</p>
            </div>
          </div>
          <button
            onClick={() => warning('Warning from Modal', 'This is a warning toast triggered from a modal')}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Trigger Warning Toast
          </button>
        </div>
      ),
      size: 'lg',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            Templar RoundTable Provider Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Testing all providers in the RoundTable ecosystem
          </p>
        </div>

        {/* Theme Provider Tests */}
        <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Theme Provider</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Current theme: <span className="font-medium">{theme}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Resolved theme: <span className="font-medium">{resolvedTheme}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {availableThemes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`px-3 py-1 text-sm rounded border transition-colors ${
                      theme === t
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <button
                onClick={toggleTheme}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
              >
                Toggle Theme
              </button>
            </div>
          </div>
        </section>

        {/* Toast Provider Tests */}
        <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Toast Provider</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <button
              onClick={() => success('Success!', 'This is a success message')}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Success Toast
            </button>
            <button
              onClick={() => error('Error!', 'This is an error message')}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Error Toast
            </button>
            <button
              onClick={() => warning('Warning!', 'This is a warning message')}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
            >
              Warning Toast
            </button>
            <button
              onClick={() => info('Info!', 'This is an info message')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Info Toast
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={clearToasts}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Clear All Toasts
            </button>
            <span className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              Active toasts: {toasts.length}
            </span>
          </div>
        </section>

        {/* Auth Provider Tests */}
        <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Auth Provider</h2>
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Status: <span className="font-medium">
                {authLoading ? 'Loading...' : isAuthenticated ? 'Authenticated' : 'Not authenticated'}
              </span>
            </p>
            {user && (
              <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded">
                <p className="text-sm"><strong>User:</strong> {user.name}</p>
                <p className="text-sm"><strong>Email:</strong> {user.email}</p>
                <p className="text-sm"><strong>Role:</strong> {user.role || 'User'}</p>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            {!isAuthenticated ? (
              <button
                onClick={handleLogin}
                disabled={authLoading}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 transition-colors"
              >
                {authLoading ? 'Logging in...' : 'Login (Demo)'}
              </button>
            ) : (
              <button
                onClick={handleLogout}
                disabled={authLoading}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 transition-colors"
              >
                {authLoading ? 'Logging out...' : 'Logout'}
              </button>
            )}
          </div>
        </section>

        {/* Loading Provider Tests */}
        <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Loading Provider</h2>
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Demo loading: <span className="font-medium">{isLoading('demo') ? 'Active' : 'Inactive'}</span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Any loading: <span className="font-medium">{isAnyLoading ? 'Yes' : 'No'}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={simulateLoading}
              disabled={isLoading('demo')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 transition-colors"
            >
              {isLoading('demo') ? 'Loading... (3s)' : 'Start Demo Loading'}
            </button>
            <button
              onClick={simulateAsyncOperation}
              disabled={isLoading('async-demo')}
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:opacity-50 transition-colors"
            >
              {isLoading('async-demo') ? 'Async Loading...' : 'Test Async Operation'}
            </button>
          </div>
        </section>

        {/* Modal Provider Tests */}
        <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Modal Provider</h2>
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Active modals: <span className="font-medium">{modals.length}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={openTestModal}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
            >
              Open Test Modal
            </button>
            <button
              onClick={openLargeModal}
              className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors"
            >
              Open Large Modal
            </button>
            <button
              onClick={closeAllModals}
              disabled={modals.length === 0}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50 transition-colors"
            >
              Close All Modals
            </button>
          </div>
        </section>

        {/* Settings Provider Tests */}
        <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Settings Provider</h2>
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Current settings:
            </p>
            <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-3 rounded overflow-x-auto">
              {JSON.stringify(settings, null, 2)}
            </pre>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => updateSettings({ 
                appearance: { 
                  ...settings.appearance, 
                  fontSize: settings.appearance.fontSize === 'md' ? 'lg' : 'md' 
                } 
              })}
              className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
            >
              Toggle Font Size
            </button>
            <button
              onClick={() => updateSettings({ language: settings.language === 'en' ? 'es' : 'en' })}
              className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition-colors"
            >
              Toggle Language
            </button>
            <button
              onClick={resetSettings}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Reset Settings
            </button>
          </div>
        </section>

        {/* Status Summary */}
        <section className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Provider Status Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-2">
              <p><strong>Theme:</strong> {resolvedTheme}</p>
              <p><strong>Auth:</strong> {isAuthenticated ? '✅ Logged in' : '❌ Not logged in'}</p>
            </div>
            <div className="space-y-2">
              <p><strong>Active Toasts:</strong> {toasts.length}</p>
              <p><strong>Active Modals:</strong> {modals.length}</p>
            </div>
            <div className="space-y-2">
              <p><strong>Loading States:</strong> {isAnyLoading ? '🔄 Active' : '✅ Idle'}</p>
              <p><strong>Language:</strong> {settings.language || 'en'}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

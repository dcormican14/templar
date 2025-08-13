'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface LoadingState {
  [key: string]: boolean;
}

interface LoadingContextType {
  loadingStates: LoadingState;
  isLoading: (key?: string) => boolean;
  setLoading: (key: string, loading: boolean) => void;
  startLoading: (key: string) => void;
  stopLoading: (key: string) => void;
  isAnyLoading: boolean;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingProviderProps {
  children: React.ReactNode;
  showGlobalSpinner?: boolean;
}

export function LoadingProvider({ 
  children, 
  showGlobalSpinner = true 
}: LoadingProviderProps) {
  const [loadingStates, setLoadingStates] = useState<LoadingState>({});

  const setLoading = useCallback((key: string, loading: boolean) => {
    setLoadingStates(current => ({
      ...current,
      [key]: loading,
    }));
  }, []);

  const startLoading = useCallback((key: string) => {
    setLoading(key, true);
  }, [setLoading]);

  const stopLoading = useCallback((key: string) => {
    setLoading(key, false);
  }, [setLoading]);

  const isLoading = useCallback((key?: string) => {
    if (key) {
      return loadingStates[key] || false;
    }
    return Object.values(loadingStates).some(Boolean);
  }, [loadingStates]);

  const isAnyLoading = Object.values(loadingStates).some(Boolean);

  const value: LoadingContextType = {
    loadingStates,
    isLoading,
    setLoading,
    startLoading,
    stopLoading,
    isAnyLoading,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {showGlobalSpinner && <GlobalLoadingSpinner />}
    </LoadingContext.Provider>
  );
}

function GlobalLoadingSpinner() {
  const { isAnyLoading } = useLoading();

  if (!isAnyLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="text-gray-700 dark:text-gray-300">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}

// Higher-order hook for managing loading states with async operations
export function useAsyncOperation() {
  const { startLoading, stopLoading } = useLoading();

  const execute = useCallback(
    async <T,>(key: string, operation: () => Promise<T>): Promise<T> => {
      try {
        startLoading(key);
        const result = await operation();
        return result;
      } finally {
        stopLoading(key);
      }
    },
    [startLoading, stopLoading]
  );

  return { execute };
}

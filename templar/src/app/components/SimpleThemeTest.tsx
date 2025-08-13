'use client';

import React from 'react';
import { useTheme } from '../providers/ThemeProvider';

export function SimpleThemeTest() {
  try {
    const { theme, setTheme } = useTheme();
    
    return (
      <div className="p-4">
        <p>Current theme: {theme}</p>
        <button 
          onClick={() => setTheme('dark')}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Set Dark Theme
        </button>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-4 bg-red-100 text-red-800">
        <p>Theme Provider Error: {error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    );
  }
}

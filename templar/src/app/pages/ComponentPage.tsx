'use client';

import React, { useState } from 'react';
import { useCSSVariables } from '../providers';
import { AtomicComponentsPage } from './AtomicComponentsPage';
import { MoleculeComponentPage } from './MoleculeComponentPage';

export function ComponentPage() {
  const [activeSection, setActiveSection] = useState<'atomic' | 'molecules'>('atomic');
  const cssVars = useCSSVariables();

  return (
    <div>
      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-8 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <button
          onClick={() => setActiveSection('atomic')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeSection === 'atomic' 
              ? 'bg-white dark:bg-gray-700 shadow-sm' 
              : 'text-gray-600 dark:text-gray-400'
          }`}
          style={{
            color: activeSection === 'atomic' ? cssVars.foreground : cssVars.mutedForeground
          }}
        >
          Atomic Components
        </button>
        <button
          onClick={() => setActiveSection('molecules')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeSection === 'molecules' 
              ? 'bg-white dark:bg-gray-700 shadow-sm' 
              : 'text-gray-600 dark:text-gray-400'
          }`}
          style={{
            color: activeSection === 'molecules' ? cssVars.foreground : cssVars.mutedForeground
          }}
        >
          Molecule Components
        </button>
      </div>

      {activeSection === 'atomic' ? (
        <AtomicComponentsPage />
      ) : (
        <MoleculeComponentPage />
      )}
    </div>
  );
}

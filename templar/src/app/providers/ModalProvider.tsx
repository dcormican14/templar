'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export interface ModalConfig {
  id: string;
  title?: string;
  content: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
  overlay?: boolean;
  onClose?: () => void;
  className?: string;
}

interface ModalContextType {
  modals: ModalConfig[];
  openModal: (config: Omit<ModalConfig, 'id'>) => string;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
  isModalOpen: (id: string) => boolean;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: React.ReactNode;
  maxModals?: number;
}

export function ModalProvider({ children, maxModals = 5 }: ModalProviderProps) {
  const [modals, setModals] = useState<ModalConfig[]>([]);

  const openModal = useCallback((config: Omit<ModalConfig, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newModal: ModalConfig = {
      ...config,
      id,
      size: config.size || 'md',
      closable: config.closable !== false,
      overlay: config.overlay !== false,
    };

    setModals(current => {
      const updated = [...current, newModal];
      // Remove oldest modals if we exceed maxModals
      if (updated.length > maxModals) {
        return updated.slice(-maxModals);
      }
      return updated;
    });

    return id;
  }, [maxModals]);

  const closeModal = useCallback((id: string) => {
    setModals(current => {
      const modal = current.find(m => m.id === id);
      if (modal?.onClose) {
        modal.onClose();
      }
      return current.filter(m => m.id !== id);
    });
  }, []);

  const closeAllModals = useCallback(() => {
    setModals(current => {
      current.forEach(modal => {
        if (modal.onClose) {
          modal.onClose();
        }
      });
      return [];
    });
  }, []);

  const isModalOpen = useCallback((id: string) => {
    return modals.some(modal => modal.id === id);
  }, [modals]);

  // Close modals on ESC key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && modals.length > 0) {
        const topModal = modals[modals.length - 1];
        if (topModal.closable) {
          closeModal(topModal.id);
        }
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [modals, closeModal]);

  const value: ModalContextType = {
    modals,
    openModal,
    closeModal,
    closeAllModals,
    isModalOpen,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      <ModalContainer />
    </ModalContext.Provider>
  );
}

function ModalContainer() {
  const { modals } = useModal();

  if (modals.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50">
      {modals.map((modal, index) => (
        <ModalWrapper key={modal.id} modal={modal} zIndex={50 + index} />
      ))}
    </div>
  );
}

interface ModalWrapperProps {
  modal: ModalConfig;
  zIndex: number;
}

function ModalWrapper({ modal, zIndex }: ModalWrapperProps) {
  const { closeModal } = useModal();

  const getSizeClasses = (size: ModalConfig['size']) => {
    switch (size) {
      case 'sm': return 'max-w-md';
      case 'md': return 'max-w-lg';
      case 'lg': return 'max-w-2xl';
      case 'xl': return 'max-w-4xl';
      case 'full': return 'max-w-full mx-4';
      default: return 'max-w-lg';
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && modal.closable) {
      closeModal(modal.id);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        modal.overlay ? 'bg-black/50 backdrop-blur-sm' : ''
      }`}
      style={{ zIndex }}
      onClick={handleOverlayClick}
    >
      <div
        className={`
          bg-white dark:bg-gray-800 rounded-lg shadow-xl 
          w-full ${getSizeClasses(modal.size)}
          max-h-[90vh] overflow-hidden
          ${modal.className || ''}
        `}
        onClick={e => e.stopPropagation()}
      >
        {modal.title && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {modal.title}
            </h2>
            {modal.closable && (
              <button
                onClick={() => closeModal(modal.id)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}
        <div className="p-6 overflow-y-auto">
          {modal.content}
        </div>
      </div>
    </div>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}

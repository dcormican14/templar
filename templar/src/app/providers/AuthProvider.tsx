'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role?: string;
  permissions?: string[];
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
  storageKey?: string;
}

export function AuthProvider({ 
  children, 
  storageKey = 'templar-auth' 
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // Initialize auth state from storage
  useEffect(() => {
    const initAuth = async () => {
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          const userData = JSON.parse(stored);
          // In a real app, you'd validate the token here
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        localStorage.removeItem(storageKey);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [storageKey]);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login - replace with your actual auth API
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        role: 'user',
        permissions: ['read', 'write']
      };

      setUser(mockUser);
      localStorage.setItem(storageKey, JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  }, [storageKey]);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      // Clear user state and storage
      setUser(null);
      localStorage.removeItem(storageKey);
      
      // In a real app, you'd also invalidate the token on the server
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, [storageKey]);

  const register = useCallback(async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Mock registration - replace with your actual auth API
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        role: 'user',
        permissions: ['read', 'write']
      };

      setUser(mockUser);
      localStorage.setItem(storageKey, JSON.stringify(mockUser));
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  }, [storageKey]);

  const updateUser = useCallback((userData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem(storageKey, JSON.stringify(updatedUser));
  }, [user, storageKey]);

  const refreshAuth = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // In a real app, you'd refresh the token here
      // For now, just validate the current user
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const userData = JSON.parse(stored);
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth refresh failed:', error);
      setUser(null);
      localStorage.removeItem(storageKey);
    } finally {
      setIsLoading(false);
    }
  }, [user, storageKey]);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    register,
    updateUser,
    refreshAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { type User, type AuthContextType };
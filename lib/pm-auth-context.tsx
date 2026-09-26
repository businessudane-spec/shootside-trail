'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PMUser, UserRole } from './pm-types';
import { pmApi } from './pm-api';

interface PMAuthContextType {
  user: PMUser | null;
  token: string | null;
  isLoading: boolean;
  isAdmin: boolean;
  isMember: boolean;
  login: (username: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: { name?: string; email?: string; password?: string; avatar?: string }) => Promise<{ success: boolean; message?: string }>;
  switchUserRole: (role: UserRole) => void;
  setUser: (user: PMUser | null) => void;
}

const PMAuthContext = createContext<PMAuthContextType | undefined>(undefined);

export const PMAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<PMUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial session load
    const initAuth = async () => {
      const storedToken = pmApi.getToken();
      if (storedToken) {
        setToken(storedToken);
        const res = await pmApi.getMe();
        if (res.success && res.data) {
          setUser(res.data);
        } else {
          // Token is expired or invalid
          pmApi.logout();
          setToken(null);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (username: string, pass: string) => {
    setIsLoading(true);
    const res = await pmApi.login(username, pass);
    setIsLoading(false);

    if (res.success && res.data) {
      setToken(res.data.token);
      setUser(res.data.user);
      return { success: true };
    }
    return { success: false, message: res.message || 'Login failed' };
  };

  const logout = async () => {
    await pmApi.logout();
    setToken(null);
    setUser(null);
  };

  const updateProfile = async (data: { name?: string; email?: string; password?: string; avatar?: string }) => {
    setIsLoading(true);
    const res = await pmApi.updateProfile(data);
    setIsLoading(false);

    if (res.success && res.data) {
      setUser(res.data);
      return { success: true, message: res.message || 'Profile updated successfully' };
    }
    return { success: false, message: res.message || 'Failed to update profile' };
  };

  const switchUserRole = (role: UserRole) => {
    if (role === 'ADMIN') {
      setUser({
        id: 1,
        name: 'Admin ShootSide',
        username: 'admin',
        email: 'admin@shootside.in',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        role: 'ADMIN',
        status: 'active'
      });
    } else {
      setUser({
        id: 2,
        name: 'Sujith K. (Member)',
        username: 'sujith',
        email: 'sujith@shootside.in',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        role: 'MEMBER',
        status: 'active'
      });
    }
  };

  const isAdmin = user?.role === 'ADMIN';
  const isMember = user?.role === 'MEMBER';

  return (
    <PMAuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAdmin,
        isMember,
        login,
        logout,
        updateProfile,
        switchUserRole,
        setUser
      }}
    >
      {children}
    </PMAuthContext.Provider>
  );
};

export const usePMAuth = () => {
  const context = useContext(PMAuthContext);
  if (!context) {
    throw new Error('usePMAuth must be used within a PMAuthProvider');
  }
  return context;
};

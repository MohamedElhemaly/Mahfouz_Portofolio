'use client';

import { useState, useEffect, useCallback } from 'react';
import { login as doLogin, isAuthenticated as checkAuth, logout as doLogout } from '../utils/storage';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const checkAndSetAuth = useCallback(() => {
    setIsAuthenticated(checkAuth());
    setIsChecking(false);
  }, []);

  useEffect(() => {
    checkAndSetAuth();

    const handleAuthChange = () => {
      setIsAuthenticated(checkAuth());
    };

    window.addEventListener('auth-state-changed', handleAuthChange);
    return () => {
      window.removeEventListener('auth-state-changed', handleAuthChange);
    };
  }, [checkAndSetAuth]);

  const login = useCallback((username: string, password: string): boolean => {
    const success = doLogin(username, password);
    if (success) {
      setIsAuthenticated(true);
      window.dispatchEvent(new Event('auth-state-changed'));
    }
    return success;
  }, []);

  const logout = useCallback(() => {
    doLogout();
    setIsAuthenticated(false);
    window.dispatchEvent(new Event('auth-state-changed'));
  }, []);

  return { isAuthenticated, isChecking, login, logout };
}

"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════
   AUTH PROVIDER
   Centralized authentication state for the
   entire app. Uses localStorage for demo
   persistence. Replace with real API later.
   ═══════════════════════════════════════════ */

export interface AuthUser {
  name: string;
  phone: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
}

const STORAGE_KEY = "psj-auth-user";

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  /* ── Hydrate from localStorage on mount ── */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as AuthUser;
        if (parsed.phone) setUser(parsed);
      }
    } catch {
      // Invalid data, ignore
    }
    setIsHydrated(true);
  }, []);

  const login = useCallback((userData: AuthUser) => {
    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    // Clear any onboarding dismissal so it doesn't interfere
    sessionStorage.removeItem("psj-onboarding-hidden");
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  /* Don't render children until hydrated to prevent flash */
  if (!isHydrated) return null;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

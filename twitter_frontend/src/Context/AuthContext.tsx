import { FC, createContext, useState } from "react";
import * as React from 'react'
export const AuthContext: any = createContext<any | null>(null);
const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [from, setFrom] = useState<string>('login')
  const [loading, changeLoading] = useState<boolean>(true)
  const login = (from: number): void => {
    setIsAuthenticated(true);
  };
  const logout = (): void => {
    localStorage.removeItem('twitter')
    setIsAuthenticated(false);
  };
  const setLoading = (): void => {
    changeLoading(prev => !prev);
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading, setLoading, from, setFrom }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;



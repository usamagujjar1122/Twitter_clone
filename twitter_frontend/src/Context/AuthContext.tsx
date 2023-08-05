import { FC, createContext, useState } from "react";
import * as React from 'react'
export const AuthContext: any = createContext<any | null>(null);
const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [loading, changeLoading] = useState<boolean>(true)
  const login = (from: number): void => {
    setIsAuthenticated(true);
  };
  const logout = (): void => {
    setIsAuthenticated(false);
  };
  const setLoading = (): void => {
    changeLoading(prev => !prev);
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;



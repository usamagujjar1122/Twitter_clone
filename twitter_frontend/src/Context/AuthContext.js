import { FC, createContext, useState } from "react";
import * as React from 'react'
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [from, setFrom] = useState('')
  const [loading, changeLoading] = useState(true)
  const login = (from) => {
    setIsAuthenticated(true);
  };
  const logout = () => {
    localStorage.removeItem('twitter')
    setIsAuthenticated(false);
  };
  const setLoading = () => {
    changeLoading(prev => !prev);
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading, setLoading, from, setFrom }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;



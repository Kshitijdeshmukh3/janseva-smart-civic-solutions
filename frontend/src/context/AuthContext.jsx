import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('janseva_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('janseva_token') || null);
  const [activeOrg, setActiveOrg] = useState(() => {
    const saved = localStorage.getItem('janseva_org');
    return saved ? JSON.parse(saved) : { id: 1, name: 'Pune Municipal Corporation', code: 'PMC' };
  });

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem('janseva_user', JSON.stringify(userData));
    localStorage.setItem('janseva_token', jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('janseva_user');
    localStorage.removeItem('janseva_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, activeOrg, setActiveOrg, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

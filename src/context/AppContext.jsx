import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [pageTitle, setPageTitle] = useState('Accueil');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const login = useCallback((credentials) => {
    // Simulation auth — remplacer par un appel API réel
    const mockUser = {
      id: 1,
      nom: 'AFOR Admin',
      email: credentials.email,
      role: 'Administrateur',
      avatar: 'A',
    };
    setUser(mockUser);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    setPageTitle('Accueil');
  }, []);

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        pageTitle,
        setPageTitle,
        isAuthenticated,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
};

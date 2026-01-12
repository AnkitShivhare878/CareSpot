import React, { createContext, useState, useEffect } from 'react';
import { getToken, removeToken, saveToken } from '../utils/auth-storage';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext({
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setToken: (token) => {},
  clearToken: () => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await getToken();
      if (storedToken) {
        setTokenState(storedToken);
        try {
          const decodedUser = jwtDecode(storedToken);
          setUser(decodedUser.user);
        } catch (e) {
          await removeToken();
        }
      }
      setIsLoading(false);
    };
    loadToken();
  }, []);

  const setToken = async (newToken) => {
    await saveToken(newToken);
    setTokenState(newToken);
    if (newToken) {
      try {
        const decodedUser = jwtDecode(newToken);
        setUser(decodedUser.user);
      } catch (e) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  const clearToken = async () => {
    await removeToken();
    setTokenState(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated: !!token, isLoading, setToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};

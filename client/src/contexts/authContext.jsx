import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/axios';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const res = await axios.get('/dashboard'); // protected route
        setCurrentUser(res.data.user);
      } catch {
        // user not logged in
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  const login = async (email, password) => {
    const res = await axios.post('/auth/login', { email, password });
    axios.defaults.headers['Authorization'] = `Bearer ${res.data.accessToken}`;
    setCurrentUser(res.data.user);
  };

  const logout = async () => {
    await axios.post('/auth/logout');
    delete axios.defaults.headers['Authorization'];
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    logout,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <div>Loading ...</div>}
    </AuthContext.Provider>
  );
};

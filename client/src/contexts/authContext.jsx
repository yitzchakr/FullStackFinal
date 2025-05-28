import React, { useState, useEffect, createContext } from 'react';
import api from '../api/axios'; // your custom axios instance

export const AuthContext = createContext(null);

 export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Set up access token from localStorage
  useEffect(() => {
    const initUser = async () => {
      const token = localStorage.getItem('accessToken');

      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }

      try {
        const res = await api.get('/auth/user');
        setCurrentUser(res.data.user);
      } catch (err) {
        console.error('User init failed:', err.response?.data?.message || err.message);
        setCurrentUser(null);
        localStorage.removeItem('accessToken'); // clean up if invalid
      } finally {
        setLoading(false);
      }
    };

    initUser();
  }, []);

  // Login function
  const login = async ({ email, password }) => {
    const res = await api.post('/auth/login', { email, password });
    console.log('Login response:', res.data);
    const token = res.data.accessToken;
    localStorage.setItem('accessToken', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    setCurrentUser(res.data.user);
  };

  // Logout function
  const logout = async () => {
    await api.post('/auth/logout');
    localStorage.removeItem('accessToken');
    delete api.defaults.headers.common['Authorization'];
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

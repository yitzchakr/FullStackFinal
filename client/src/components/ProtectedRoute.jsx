import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Checking authentication...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
export const RoleBasedRoute = ({ allowedRoles }) => {
    const { currentUser, loading } = useAuth();
    
    if (loading) {
      return <div>Checking permissions...</div>;
    }
    
    const hasPermission = allowedRoles.includes(currentUser?.role);
    
    if (!currentUser || !hasPermission) {
      // User doesn't have the required role
      return <Navigate to="/unauthorized" replace />;
    }
    
    // User has the required role
    return <Outlet />;
  };



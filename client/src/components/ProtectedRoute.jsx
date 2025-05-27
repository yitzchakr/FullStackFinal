import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Checking authentication...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace  />;
  }

  return <Outlet/>;
};
export const RoleBasedRoute = ({ allowedRoles }) => {
    const { currentUser, loading } = useAuth();
    console.log(currentUser);
    
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



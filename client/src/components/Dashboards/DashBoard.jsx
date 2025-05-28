// src/pages/Dashboard.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect based on user role
    if (currentUser) {
      switch (currentUser.role) {
        case 'admin':
          navigate('/admin/dashboard',{replace:true});
          break;
        case 'manager':
          navigate('/manager/dashboard',{replace:true});
          break;
        case 'caseworker':
          navigate('/caseworker/dashboard',{replace:true});
          break;
        default:
          // Fallback
          navigate('/unauthorized',{replace:true});
      }
    }
  }, [currentUser, navigate]);
  
  return <div>Redirecting to your dashboard...</div>;
};

export default Dashboard;
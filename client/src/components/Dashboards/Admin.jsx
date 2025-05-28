import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useEffect } from 'react';
import api from '../../api/axios'

export const Admin = () => {
    const [users, setUsers] = React.useState([]);
    const {currentUser}= useAuth();
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/admin/');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

  return (
   <> 
   
    <div>Welcome {currentUser.first_name}</div>
    <div>Role: {currentUser.role}</div>
    <div>Users List:</div>
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.first_name} {user.last_name} - {user.role}
        </li>
      ))}
    </ul>
  </>
  )
}

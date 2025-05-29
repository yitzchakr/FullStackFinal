import React, { useEffect, useState } from 'react';
import useAdmin from '../../../hooks/useAdminCon';
import EditUserForm from './EditUserForm';
import styles from '../../../styles/Admin.module.css';

const AdminPanel = () => {
  const { 
    users, 
    loading, 
    error, 
    fetchUsers, 
    addUser, 
    updateUser, 
    deleteUser, 
    clearError 
  } = useAdmin();
  const defaultPassword = 'defaultPassword123'; // Default password for new users

  const [newUser, setNewUser] = useState({ first_name: '', last_name: '', email: '', role: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [operationLoading, setOperationLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAddUser = async (e) => {
    e.preventDefault();
    setOperationLoading(true);
    try {
      const userData = {
        ...newUser,defaultPassword // Include default password
      };
      await addUser(userData);
      setNewUser({ first_name: '', last_name: '', email: '', role: '' });
    } catch (error) {
      console.error('Add user failed:', error.message);
    } finally {
      setOperationLoading(false);
    }
  };

  const handleUpdateUser = async (userData) => {
    setOperationLoading(true);
    try {
      await updateUser(editingUser.id, userData);
      setEditingUser(null);
    } catch (error) {
      console.error('Update failed:', error.message);
    } finally {
      setOperationLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure?')) {
      setOperationLoading(true);
      try {
        await deleteUser(userId);
      } catch (error) {
        console.error('Delete failed:', error.message);
      } finally {
        setOperationLoading(false);
      }
    }
  };

  if (loading) return <div>Loading users...</div>;
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Admin Panel</h1>

      {error && (
        <div className={styles.error}>
          {error}
          <button onClick={clearError}>×</button>
        </div>
      )}

      <form onSubmit={handleAddUser} className={styles.form}>
        <input
          type="text"
          placeholder="First Name"
          value={newUser.first_name}
          onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
          required
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newUser.last_name}
          onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
          required
          className={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
          className={styles.input}
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          required
          className={styles.select}
        >
          <option value="">Select Role</option>
          <option value="manager">Manager</option>
          <option value="caseworker">Case Worker</option>
        </select>
        <button type="submit" disabled={operationLoading} className={styles.button}>
          {operationLoading ? 'Adding...' : 'Add User'}
        </button>
      </form>

      <div className={styles.userList}>
        {users.map((user) => (
          <div key={user.id} className={styles.userCard}>
            <h3>{user.first_name} {user.last_name}</h3>
            <p>{user.email} - {user.role}</p>
            <button onClick={() => setEditingUser(user)}>Edit</button>
            <button
              onClick={() => handleDeleteUser(user.id)}
              disabled={operationLoading}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {editingUser && (
        <div className={styles.editForm}>
          <h2>Edit User</h2>
          <EditUserForm
            user={editingUser}
            onSave={handleUpdateUser}
            onCancel={() => setEditingUser(null)}
            loading={operationLoading}
          />
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
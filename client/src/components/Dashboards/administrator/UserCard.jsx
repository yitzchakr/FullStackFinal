import React, { useState } from 'react';
import EditUserForm from './EditUserForm';
import styles from '../../../styles/UserCard.module.css';

const UserCard = ({ user, onUpdateUser, onDeleteUser, operationLoading }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async (updatedUser) => {
    try {
      await onUpdateUser(user.id, updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Update failed:', error.message);
    }
  };

  const toggleActiveStatus = async () => {
    try {
      const updatedUser = { ...user, is_active: !user.is_active };
      await onUpdateUser(user.id, updatedUser);
      
    } catch (error) {
      console.error('Failed to toggle active status:', error.message);
    }
  };

  return (
    <div
       className={`${styles.userCard} ${
         user.is_active ? styles.activeCard : styles.inactiveCard
       }`}
    >
      {isEditing ? (
        <EditUserForm
          user={user}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
          loading={operationLoading}
        />
      ) : (
        <>
          <h3>
            {user.first_name} {user.last_name}
          </h3>
          <p>
            {user.email} - {user.role}
          </p>
          <button onClick={() => setIsEditing(true)} className={styles.editButton}>
            Edit
          </button>
          <button
            onClick={() => onDeleteUser(user.id)}
            disabled={operationLoading}
            className={styles.deleteButton}
          >
            Delete
          </button>
          <button
            onClick={toggleActiveStatus}
            disabled={operationLoading}
            className={styles.toggleActiveButton}
          >
            {user.is_active ? 'Deactivate' : 'Activate'}
          </button>
        </>
      )}
    </div>
  );
};

export default UserCard;
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

  return (
    <div className={styles.userCard}>
      {isEditing ? (
        <EditUserForm
          user={user}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
          loading={operationLoading}
        />
      ) : (
        <>
          <h3>{user.first_name} {user.last_name}</h3>
          <p>{user.email} - {user.role}</p>
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
        </>
      )}
    </div>
  );
};

export default UserCard;
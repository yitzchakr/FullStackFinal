import React, { useEffect, useState } from "react";
import useAdmin from "../../../hooks/useAdminCon";
import UserCard from "./UserCard";
import styles from "../../../styles/Admin.module.css";
import AddUserForm from "./AddUserForm";
import Header from "../Header";

const AdminPanel = () => {
  const {
    users,
    loading,
    error,
    fetchUsers,
    updateUser,
    deleteUser,
    clearError,
  } = useAdmin();

  const [operationLoading, setOperationLoading] = useState(false);
  const [addUserForm, setaddUserForm] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure?")) {
      setOperationLoading(true);
      try {
        await deleteUser(userId);
      } catch (error) {
        console.error("Delete failed:", error.message);
      } finally {
        setOperationLoading(false);
      }
    }
  };

  if (loading) return <div>Loading users...</div>;
  return (
    <div className={styles.container}>
      <Header/>
      {error && (
        <div className={styles.error}>
          {error}
          <button onClick={clearError}>×</button>
        </div>
      )}
      <div className={addUserForm ? styles.addUserContainer : undefined}>
        <button
          onClick={() => setaddUserForm(!addUserForm)}
          className={styles.button}
        >
          {!addUserForm ? "Add User" : "x"}
        </button>
        {addUserForm && (
          <AddUserForm
            setOperationLoading={setOperationLoading}
            operationLoading={operationLoading}
          />
        )}
      </div>
      <div className={styles.userList}>
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onUpdateUser={updateUser}
            onDeleteUser={handleDeleteUser}
            operationLoading={operationLoading}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;

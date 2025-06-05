import React from 'react'
import { useState } from 'react';
import styles from '../../../styles/Admin.module.css'
import useAdmin from '../../../hooks/useAdminCon';
const AddUserForm = ({operationLoading,setOperationLoading}) => {
     const [newUser, setNewUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        role: "",
        specialties: "",
        region: ""
      });
      const {addUser} = useAdmin();
      const handleAddUser = async (e) => {
        e.preventDefault();
        setOperationLoading(true);
        try {
          const userData = { ...newUser };
          await addUser(userData);
          setNewUser({ first_name: "", last_name: "", email: "", role: "", specialties: "", region: "" });
        } catch (error) {
          console.error("Add user failed:", error.message);
        } finally {
          setOperationLoading(false);
        }
      };
    
  return (
     <form onSubmit={handleAddUser} className={styles.form}>
            <input
              type="text"
              placeholder="First Name"
              value={newUser.first_name}
              onChange={(e) =>
                setNewUser({ ...newUser, first_name: e.target.value })
              }
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={newUser.last_name}
              onChange={(e) =>
                setNewUser({ ...newUser, last_name: e.target.value })
              }
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
            <input
              type="text-area"
              value={newUser.specialties || ""}
              placeholder="Specialties"
              onChange={(e) =>
                setNewUser({ ...newUser, specialties: e.target.value })
              }
              className={styles.input}
            />
            <select value={newUser.region}
              onChange={(e) => setNewUser({ ...newUser, region: e.target.value })}
              className={styles.select}
            >
              <option value="">Select Region</option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="Center">Center</option>
              <option value="Jerusalem">Jerusalem</option>
            </select>
            <button
              type="submit"
              disabled={operationLoading}
              className={styles.button}
            >
              {operationLoading ? "Adding..." : "Add User"}
            </button>
          </form>
  )
}

export default AddUserForm
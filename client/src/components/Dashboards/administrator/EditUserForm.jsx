import { useState } from "react";
import styles from '../../../styles/EditUserForm.module.css';

const EditUserForm = ({ user, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
    specialties: user.specialties || "",
    region: user.region || ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // This calls handleUpdateUser with the form data
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={formData.first_name}
        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
        required
        placeholder="First Name"
        className={styles.input}
      />
      <input
        type="text"
        value={formData.last_name}
        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
        required
        placeholder="Last Name"
        className={styles.input}
      />
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        placeholder="Email"
        className={styles.input}
      />
      <select
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        required
        className={styles.select}
      >
        <option value="manager">Manager</option>
        <option value="caseworker">Case Worker</option>
      </select>
        <input
            type="text"
            value={formData.specialties || [""]}
            onChange={(e) => setFormData({ ...formData, specialties: e.target.value.split(',').map(s => s.trim()) })}
            placeholder="Specialties (separate by commas)"
            className={styles.input}
        />
      <select
        value={formData.region || ""}
        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
        className={styles.select}
        >
        <option value="">Select Region</option>
        <option value="North">North</option>
        <option value="South">South</option>
        <option value="Center">Center</option>
        <option value="Jerusalem">Jerusalem</option>
      </select>
      <button type="submit" disabled={loading} className={styles.button}>
        {loading ? 'Saving...' : 'Save'}
      </button>
      <button type="button" onClick={onCancel} className={styles.cancelButton}>
        Cancel
      </button>
    </form>
  );
};

export default EditUserForm;
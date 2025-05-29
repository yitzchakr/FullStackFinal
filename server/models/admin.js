const db = require('../config/db');
const bcrypt = require('bcrypt');

const adminModel = {
    queries: {
        getAllusers: async () => {
            try {
                const [rows] = await db.query("SELECT * FROM users");
                // Filter out sensitive information like password hashes
                const filteredUsers = rows.map(user => {
                    const { password_hash, ...userWithoutPassword } = user;
                    return userWithoutPassword;
                });
                return filteredUsers;
            } catch (error) {
                console.error("Error fetching users:", error);
                throw error;
            }
        },
        addUser: async (userData) => {
            try {
                const { first_name, last_name, email, role,defaultPassword} = userData;
                const hashed_password = await bcrypt.hash(defaultPassword, 10);
                const [result] = await db.query(
                    "INSERT INTO users (first_name, last_name, email, role,password_hash) VALUES (?, ?, ?, ?,?)",
                    [first_name, last_name, email, role, hashed_password]
                );
                return { id: result.insertId, first_name, last_name, email, role };
            } catch (error) {
                console.error("Error adding user:", error);
                throw error;
            }
        },
        updateUser: async (userId, userData) => {
            try {
                const { first_name, last_name, email, role } = userData;
                await db.query(
                    "UPDATE users SET first_name = ?, last_name = ?, email = ?, role = ? WHERE id = ?",
                    [first_name, last_name, email, role, userId]
                );
                return { id: userId, first_name, last_name, email, role };
            } catch (error) {
                console.error("Error updating user:", error);
                throw error;
            }
        },
        deleteUser: async (userId) => {
            try {
                await db.query("DELETE FROM users WHERE id = ?", [userId]);
                return { message: "User deleted successfully" };
            } catch (error) {
                console.error("Error deleting user:", error);
                throw error;
            }
        }
    }
};

module.exports = adminModel;
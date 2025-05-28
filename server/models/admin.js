const db = require('../config/db')

const adminModel ={
    queries:{
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
        }
    }
    

   
}
module.exports = adminModel;
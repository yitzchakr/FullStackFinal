const pool = require("../config/db")
requiredFields=['email','firstName','lastName','phone','description','location','familySize','preferredContact'];

const requestModel={
    hasMissingFields:(req)=>{
        const missingFields = requiredFields.filter(field => !req.body[field]);
        return (missingFields) },
    submitRequest: async (req) => {
        const { email, firstName, lastName, phone, description, location, familySize, preferredContact } = req.body;
        const result = await pool.execute('INSERT INTO requests (client_email, client_first_name, client_last_name, client_phone, request_description, geographical_location, family_size, preferred_contact_method) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [email, firstName, lastName, phone, description, location, familySize, preferredContact]);
        return result;
    },
        
   hasOpenRequest: async (req) => {
    const requestEmail = req.body.email;
    if (!requestEmail) {
        throw new Error('Email is required to check for open requests');
    }
    const [rows] = await pool.execute(
        'SELECT EXISTS(SELECT 1 FROM requests WHERE client_email = ? AND status <> "resolved") AS hasOpenRequest',
        [requestEmail]
    );
    return rows[0].hasOpenRequest === 1;
}
}
module.exports = requestModel;
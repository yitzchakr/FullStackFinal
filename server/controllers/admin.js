const { ApiError } = require('../utils/apiError');
const routeHandler = require('../utils/routeHandler');
const adminModel = require('../models/admin');

const adminController = {
    getAllUsers: routeHandler(async (req, res) => {
        try {
            const users = await adminModel.queries.getAllusers();
            res.status(200).json(users);
        } catch (error) {
            console.error("Error fetching users:", error);
            throw new ApiError(500, 'Internal Server Error');
        }
    })
};
module.exports = adminController;
// This code defines an admin controller that handles requests related to user management.
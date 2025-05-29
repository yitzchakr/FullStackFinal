const routeHandler = require("../utils/routeHandler");
const adminModel = require("../models/admin");

const adminController = {
  getAllUsers: routeHandler(async (req, res) => {
    const users = await adminModel.queries.getAllusers();
    res.status(200).json(users);
  }),
  addUser: routeHandler(async (req, res) => {
    const { first_name, last_name, email, role,defaultPassword } = req.body;
    if (!first_name || !last_name || !email || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newUser = await adminModel.queries.addUser({ first_name, last_name, email, role, defaultPassword });
    res.status(201).json(newUser);
  }),
  updateUser: routeHandler(async (req, res) => {
    const userId = req.params.id;
    const { first_name, last_name, email, role } = req.body;
    if (!first_name || !last_name || !email || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const updatedUser = await adminModel.queries.updateUser(userId, {
      first_name,
      last_name,
      email,
      role,
    });
    res.status(200).json(updatedUser);
  }),
  deleteUser: routeHandler(async (req, res) => {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    await adminModel.queries.deleteUser(userId);
    res.status(204).send(); // No content
  }),
};

module.exports = adminController;
// This code defines an admin controller that handles requests related to user management.

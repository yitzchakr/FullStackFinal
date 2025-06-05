const routeHandler = require("../utils/routeHandler");
const adminModel = require("../models/admin");
const defaultPassword = "defaultPassword123"; // Default password for new users
const adminController = {
  getAllUsers: routeHandler(async (req, res) => {
    const users = await adminModel.queries.getAllusers();
    res.status(200).json(users);
  }),
  addUser: routeHandler(async (req, res) => {
    const { first_name, last_name, email, role,specialties,region } = req.body;
    if (!first_name || !last_name || !email || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const usersWithEmail = await adminModel.queries.getUser(email);
    if (usersWithEmail) {
      return res.status(400).json({ message: "User with this email already exists" });
    }
    const newUser = await adminModel.queries.addUser({ first_name, last_name, email, role,specialties,region, defaultPassword });
    res.status(201).json(newUser);
  }),
  updateUser: routeHandler(async (req, res) => {
    const userId = req.params.id;
    const { first_name, last_name, email, role ,specialties,region } = req.body;
    if (!first_name || !last_name || !email || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const usersWithEmail = await adminModel.queries.getUser(email);
    if (usersWithEmail && usersWithEmail.id != userId) {
      return res.status(400).json({ message: "User with this email already exists" });
    }
    const updatedUser = await adminModel.queries.updateUser(userId, {
      first_name,
      last_name,
      email,
      role,
      specialties,
      region
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

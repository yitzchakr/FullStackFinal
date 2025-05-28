const adminRouter = require('express').Router();
const authorize = require('../middleware/authorize');
const auth = require('../middleware/authenticate');
const adminController = require('../controllers/admin')

adminRouter.get('/', auth, authorize(['admin']), adminController.getAllUsers);

module.exports = adminRouter;
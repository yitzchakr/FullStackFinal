const adminRouter = require('express').Router();
const authorize = require('../middleware/authorize');
const auth = require('../middleware/authenticate');
const adminController = require('../controllers/admin')

adminRouter.get('/', auth, authorize(['admin']), adminController.getAllUsers);
adminRouter.post('/', auth, authorize(['admin']), adminController.addUser);
adminRouter.put('/:id', auth, authorize(['admin']), adminController.updateUser);
adminRouter.delete('/:id', auth, authorize(['admin']), adminController.deleteUser);
module.exports = adminRouter;
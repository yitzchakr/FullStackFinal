const authRouter = require('express').Router();
const loginController = require('../controllers/auth/login');
const logoutController = require('../controllers/auth/logout');
const refreshController = require('../controllers/auth/refresh');
const userController = require('../controllers/auth/user');



authRouter.post('/login', loginController);
authRouter.post('/logout', logoutController);
authRouter.get('/refresh', refreshController);
authRouter.get('/user', userController);

module.exports = authRouter;
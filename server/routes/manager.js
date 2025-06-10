const managerRouter = require('express').Router();
const managerController = require('../controllers/manager');
const auth = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

managerRouter.get('/',  managerController.init);

module.exports = managerRouter;
// This code defines a router for manager-related routes in an Express application.
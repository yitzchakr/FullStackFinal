const requestRouter = require('express').Router();
const requestController = require('../controllers/requests');

requestRouter.post('/',requestController.submitRequest); 

module.exports = requestRouter;
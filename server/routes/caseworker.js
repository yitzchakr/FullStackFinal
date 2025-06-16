const caseworkerRouter = require('express').Router();
const caseworkerController = require('../controllers/caseworker');
const auth = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');  

caseworkerRouter.post('/', auth, authorize('caseworker'), caseworkerController.init);

module.exports = caseworkerRouter;
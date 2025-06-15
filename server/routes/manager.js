const managerRouter = require('express').Router();
const managerController =  require('../controllers/manager')
const auth = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

managerRouter.get('/',auth,authorize('manager'),  managerController.init);
managerRouter.post('/assign', auth, authorize('manager'), managerController.assignCaseworker);
managerRouter.put('/reassign', auth, authorize('manager'), managerController.reassignCaseWorker);

module.exports = managerRouter;

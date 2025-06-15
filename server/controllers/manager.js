const {getManagerOverview,assignCaseworker,markRequestAssigned,reassignCaseworker} = require('../models/manager');
const routeHandler = require('../utils/routeHandler');

const managerController = {
    init:routeHandler(async(req,res)=>{
        const overview = await getManagerOverview();
        res.status(200).json({
            message: 'Manager overview fetched successfully',
            data: overview
        });
    }),
    assignCaseworker: routeHandler(async (req, res) => {
        const { requestId, caseworkerId,assignedBy,priorityLevel} = req.body;
        if (!requestId || !caseworkerId) {
            return res.status(400).json({ message: 'Request ID and Caseworker ID are required' });
        }
        const caseId = await assignCaseworker(requestId, caseworkerId,assignedBy,priorityLevel);
        if (!caseId) {
            return res.status(500).json({ message: 'Failed to assign caseworker' });
        }
        await markRequestAssigned(requestId);
        res.status(200).json({
            message: 'Caseworker assigned successfully',
            data: { caseId }
        });
    }),
    reassignCaseWorker: routeHandler(async (req, res) => {
        const { caseId, caseworkerId } = req.body;
        if (!caseId || !caseworkerId) {
            return res.status(400).json({ message: 'Case ID and Caseworker ID are required' });
        }
        await reassignCaseworker(caseId, caseworkerId);
        res.status(200).json({
            message: 'Caseworker reassigned successfully'
        });
    }),
    
}
module.exports = managerController;
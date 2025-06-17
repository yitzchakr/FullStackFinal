const {getAllCases} = require('../models/caseworker');
const routeHandler = require('../utils/routeHandler');
const caseworkerController = {
    init: routeHandler(async (req, res) => {
        const caseworkerId = req.params.id; // 
        if (!caseworkerId) {
            return res.status(400).json({
                message: 'Caseworker ID is required'
            });
        }
        const cases = await getAllCases(caseworkerId);
        res.status(200).json({
            message: 'Caseworker cases fetched successfully',
            data: cases
        });
    }),
};
module.exports = caseworkerController;

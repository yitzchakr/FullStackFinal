const getManagerOverview = require('../models/manager');
const routeHandler = require('../utils/routeHandler');

const managerController = {
    init:routeHandler(async(req,res)=>{
        const overview = await getManagerOverview();
        res.status(200).json({
            message: 'Manager overview fetched successfully',
            data: overview
        });
    })
}
module.exports = managerController;
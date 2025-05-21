const requestModel = require('../models/requests');
const { ApiError } = require('../utils/apiError');
const routeHandler = require('../utils/routeHandler');

const requestController = {
    submitRequest:routeHandler(async (req, res) => {
        if (requestModel.hasMissingFields(req).length > 0) {
            throw new ApiError(400, 'Missing required fields: ' + requestModel.hasMissingFields(req).join(', '));
        }
        const hasOpenRequest = await requestModel.hasOpenRequest(req);
        if (hasOpenRequest) {
            throw new ApiError(400, 'You already have an open request. Please resolve it before submitting a new one.');
        }
        const result = await requestModel.submitRequest(req);
        res.status(201).json({ message: 'Request submitted successfully', data: result });
    })
}
module.exports = requestController;
const requestModel = require('../models/requests');
const { ApiError } = require('../utils/apiError');
const routeHandler = require('../utils/routeHandler');
const {sendEmail} = require('../services/emailService');

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
        if (!result || result.affectedRows === 0) {
            throw new ApiError(500, 'Failed to submit request');
        }
        const{email,firstName,lastName} = req.body;
        const subject = 'Request Submitted Successfully';
        const htmlContent = `<p>Dear ${firstName} ${lastName},</p>
                            <p>Your request has been submitted successfully. We will get back to you shortly.</p>
                            <p>Thank you for reaching out!</p>`;
        const textContent = `Dear ${firstName} ${lastName},\n\nYour request has been submitted successfully. We will get back to you shortly.\n\nThank you for reaching out!`;
        const userEmailResult =await sendEmail(email, subject, htmlContent, textContent);    
         if (!userEmailResult) {
            res.status(500).json({ message: ' Request Proccessed ,Failed to send confirmation email' });
            return;
         }              
        res.status(201).json({ message: 'Request submitted successfully', data: result });
    })
}
module.exports = requestController;
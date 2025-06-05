// emailService.js
const nodemailer = require('nodemailer');

let transporter = null;

// Initialize Ethereal transporter for testing
const initializeTransporter = async () => {
  if (transporter) return transporter;
  
    
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER, // your email
          pass: process.env.EMAIL_PASS 
    }});
    
   
  
  return transporter;
};

const sendEmail = async (to, subject, htmlContent, textContent) => {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: textContent,
        html: htmlContent
      };
      const transporter = await initializeTransporter();
      if (!transporter) {
        throw new Error('Email transporter not initialized');
      }
      const result = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error: error.message };
    }
  };
  
  module.exports = { sendEmail };

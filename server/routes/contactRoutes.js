const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');
const dotenv = require('dotenv');

dotenv.config();

// POST /api/contact
// In your contactRoutes.js file
router.post('/', async (req, res) => {
  try {
    console.log("Contact form request received:", req.body);
    const { name, email, message, subject } = req.body;
        
    // Validate request data
    if (!name || !email || !message) {
      console.log("Validation failed - missing required fields");
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email and message'
      });
    }
    
    // Save to MongoDB - wrapped in try/catch for detailed error
    try {
      const contact = new Contact({
        name,
        email,
        message,
        subject // Assuming you've added this to your schema
      });
      
      const savedContact = await contact.save();
      console.log("Contact saved to database:", savedContact._id);
    } catch (dbError) {
      console.error("MongoDB error:", dbError);
      // Continue with email even if DB fails
    }
    
    // Configure mail transporter
    console.log("Setting up email transporter");
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    
    // Test connection
    try {
      await transporter.verify();
      console.log("Email transporter verified successfully");
    } catch (emailVerifyError) {
      console.error("Email verification failed:", emailVerifyError);
      throw new Error("Email configuration error: " + emailVerifyError.message);
    }
    
    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'paluchurinandini@gmail.com',
      subject: `Portfolio Contact: ${name} - ${subject || 'No Subject'}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
        <p><strong>Message:</strong> ${message}</p>
      `
    };
    
    // Send email - wrapped in try/catch for detailed error
    try {
      console.log("Attempting to send email");
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      throw new Error("Failed to send email: " + emailError.message);
    }
        
    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully!'
    });
  } 
  // Inside your catch block at the end
catch (error) {
  console.error('Contact form error details:', error.message);
  if (error.code) console.error('Error code:', error.code);
  if (error.response) console.error('Error response:', error.response);
  
  res.status(500).json({
    success: false,
    message: 'There was an error sending your message. Please try again later.'
  });
}
});
module.exports = router;
const Contact = require('../models/Contact');
const sendEmail = require('../utils/emailSender');

// Submit contact form
const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Save contact to database
    const contact = new Contact({
      name,
      email,
      subject,
      message,
    });
    
    const savedContact = await contact.save();
    
    // Send email notification
    try {
      await sendEmail({
        name,
        email,
        subject,
        message
      });
    } catch (emailError) {
      console.error('Email sending failed, but contact saved to database:', emailError);
      // Continue execution even if email fails
    }
    
    res.status(201).json({ 
      success: true, 
      message: 'Your message has been sent successfully!', 
      data: savedContact 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  submitContact,
};
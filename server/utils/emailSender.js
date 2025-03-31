const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create transporter
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    },
    // Use port 587 (TLS) instead of 465 (SSL) as it's less likely to be blocked
    port: 587,
    secure: false // true for 465, false for other ports
  });

  // Define email options
  const mailOptions = {
    from: `"${options.name}" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // Send to yourself
    replyTo: options.email,
    subject: options.subject,
    text: options.message,
    html: `
      <p>You have received a new message from your portfolio contact form:</p>
      <h3>Contact Details</h3>
      <ul>
        <li>Name: ${options.name}</li>
        <li>Email: ${options.email}</li>
        <li>Subject: ${options.subject}</li>
      </ul>
      <h3>Message:</h3>
      <p>${options.message}</p>
    `
  };

  // Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

module.exports = sendEmail;
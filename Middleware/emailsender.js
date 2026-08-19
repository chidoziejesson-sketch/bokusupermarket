const nodemailer = require('nodemailer');

// create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., 'Gmail', 'Yahoo', etc.
    auth: {
        user: process.env.EMAIL_USER, // your email address
        pass: process.env.EMAIL_PASS  // your email password or app password
    }
});


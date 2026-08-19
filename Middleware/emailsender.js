const nodemailer = require('nodemailer');

// create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., 'Gmail', 'Yahoo', etc.
    auth: {
        user: process.env.EMAIL_USER, // your email address
        pass: process.env.EMAIL_PASS  // your email password or app password
    }
});

const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER, // sender address
        to: to, // recipient address
        subject: subject, // email subject
        text: text // email body
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;
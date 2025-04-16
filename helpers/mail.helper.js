const nodemailer = require('nodemailer');
module.exports.sendMail = (email, subject, content) => {
    // Import the Nodemailer library
    
    
    // Create a transporter object
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: process.env.EMAIL_SECURE === "true", // use false for STARTTLS; true for SSL on port 465
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        }
    });

    // Configure the mailoptions object
    const mailOptions = {
        from: 'yourusername@email.com',
        to: email,
        subject: subject,
        html: content
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error:', error);
        } else {
            console.log('Email sent: ', info.response);
        }
    });
}
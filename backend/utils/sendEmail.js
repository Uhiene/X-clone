const nodemailer = require("nodemailer");
require("dotenv").config(); // Ensure dotenv is loaded

const sendEmail = async (to, subject, text, html) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587, // Standard port for TLS
        secure: false, // Use TLS for secure connection
        auth: {
            user: process.env.EMAIL_USER, // Gmail email
            pass: process.env.EMAIL_PASSWORD, // Gmail App Password
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
        html,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }
};

module.exports = sendEmail;

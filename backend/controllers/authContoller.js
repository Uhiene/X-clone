const { User } = require("../models/User");
const bcrypt = require ("bcryptjs")
const crypto = require ("crypto")
const generateTokenAndSetCookie  = require ("../utils/generateTokenAndSetCookie")
const sendEmail = require("../utils/sendEmail");

const signup = async (req, res) => {
    const { email, name, dob, password } = req.body;
    try {
        if (!email || !name || !dob || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email,
            password: hashedPassword,
            name,
            isVerified: false, // Default to not verified
        });

        await user.save();

        // Generate verification token
        const verificationToken = generateEmailVerificationToken(user._id);

        // Send verification email
        const verificationUrl = `http://localhost:3000/verify-email?token=${verificationToken}`;
        await sendEmail(
            user.email,
            "Verify Your Email",
            `Please click the link to verify your email: ${verificationUrl}`,
            `<p>Please click the link below to verify your email:</p><a href="${verificationUrl}">Verify Email</a>`
        );

        res.status(201).json({
            success: true,
            message: "User created successfully. Please verify your email.",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const verifyEmail = async (req, res) => {
    const { token } = req.query;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user.isVerified = true;
        await user.save();

        res.status(200).json({ success: true, message: "Email verified successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: "Invalid or expired token" });
    }
};



module.exports = {
    signup, verifyEmail,
};
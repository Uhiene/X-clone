const { User } = require("../models/User");
const bcrypt = require ("bcryptjs")
const crypto = require ("crypto")
const generateTokenAndSetCookie  = require ("../utils/generateTokenAndSetCookie")

const signup = async (req, res) => {
    const { email, name, dob, password} = req.body
    try {
        if (!email || !name || !dob || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const userExists = await User.findOne({ email })

        if(userExists) {
            return res.status(400).json({ success: false, message: "Email Already exist"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const verificationToken = Math.floor(
            100000 + Math.random() * 900000
          ).toString();

        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiredAt: Date.now() + 24 * 60 * 60 * 1000,
        })

        await user.save()

        generateTokenAndSetCookie(res, user._id)

        // sendVerificationEmail(user.email, verificationToken)

        res.status(201).json({
            success: true,
            message: "User cretead successfully",
            user: {
                ...user._doc,
                password: undefined
            },
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    signup,
};
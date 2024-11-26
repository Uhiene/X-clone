const {signup, verifyEmail, login, logout} = require("../controllers/authContoller")
const express = require("express")

const router = express.Router()
router.post("/signup", signup)
router.post("/verifyemail", verifyEmail)
router.post("/login", login)
router.post("/logout", logout)

module.exports = router
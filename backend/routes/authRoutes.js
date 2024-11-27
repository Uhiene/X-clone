const {signup, verifyEmail, login, logout, checkAuth} = require("../controllers/authContoller")
const express = require("express")
const { verifyToken } = require("../middleware/verifyToken")

const router = express.Router()
router.get("/check-auth", verifyToken, checkAuth)

router.post("/signup", signup)
router.post("/verifyemail", verifyEmail)
router.post("/login", login)
router.post("/logout", logout)


module.exports = router
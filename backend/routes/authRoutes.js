const express = require("express")
const {signup} = require("../controllers/authContoller")

const router = express.Router()
router.post("/signup", signup)

module.exports = router
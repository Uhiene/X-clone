const express = require('express');
const { verifyToken } = require('../middleware/verifyToken');
const { getNotifications, deleteNotifications } = require('../controllers/notificationController');

const router = express.Router();

router.get("/", verifyToken, getNotifications);
router.delete("/", verifyToken, deleteNotifications);

module.exports = router;
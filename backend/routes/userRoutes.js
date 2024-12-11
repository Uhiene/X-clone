const express = require('express');
const { getUser, getSuggestedUsers, followUnfollow, updateProfile, getAllUsers } = require('../controllers/userContoller');
const { verifyToken } = require('../middleware/verifyToken');

const router = express.Router();

router.get('/users', verifyToken, getAllUsers);
router.get('/profile/:username', verifyToken, getUser)
router.get('/suggested', verifyToken, getSuggestedUsers)
router.post('/follow/:id', verifyToken, followUnfollow)
router.post('/update', verifyToken, updateProfile)

module.exports = router;
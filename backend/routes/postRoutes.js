const express = require("express");
const multer = require("multer");
const { createPost, getPosts, getFollowersPosts } = require("../controllers/postController");
const { verifyToken } = require('../middleware/verifyToken');

const router = express.Router();

// Set up multer for file handling
const upload = multer({ dest: "uploads/" });

// Create a new post
router.post("/", upload.single("image"), verifyToken, createPost);

// Get all posts
router.get("/", getPosts);
router.get("/following", verifyToken, getFollowersPosts );

module.exports = router;

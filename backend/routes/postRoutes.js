const express = require("express");
const multer = require("multer");
const { createPost, getPosts } = require("../controllers/postController");

const router = express.Router();

// Set up multer for file handling
const upload = multer({ dest: "uploads/" });

// Create a new post
router.post("/posts", upload.single("image"), createPost);

// Get all posts
router.get("/posts", getPosts);

module.exports = router;

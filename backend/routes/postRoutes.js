const express = require("express");
const Post = require("../models/Post");
const multer = require("multer");

const router = express.Router();

// Set up multer for file handling
const upload = multer({ dest: "uploads/" });

// Create a new post
router.post("/posts", upload.single("image"), async (req, res) => {
  const { user, content } = req.body;
  const image = req.file ? req.file.filename : null;

  // Validate input
  if (!content) {
    return res.status(400).json({ message: "Post content cannot be empty" });
  }

  try {
    const newPost = await Post.create({ content, user, image }); // Handle null image
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Failed to create post" });
  }
});

router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    // Sorts last to first
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error while fetching post",
    });
  }
});

module.exports = router;

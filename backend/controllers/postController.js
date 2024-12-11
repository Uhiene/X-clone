const Post = require("../models/Post");

// Create a new post
const createPost = async (req, res) => {
  const { username, content } = req.body;
  const image = req.file ? req.file.filename : null;

  // Validate input
  if (!content) {
    return res.status(400).json({ message: "Post content cannot be empty" });
  }

  try {
    const newPost = await Post.create({ content, username, image });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Failed to create post" });
  }
};

// Get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error while fetching posts",
    });
  }
};

module.exports = { createPost, getPosts };

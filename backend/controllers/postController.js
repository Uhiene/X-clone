const Post = require("../models/Post");
const User = require("../models/User");

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

const getFollowersPosts = async (req, res) => {
  try {
    console.log("Received request for following posts");
    
    // Find the authenticated user
    const user = await User.findById(req.userId);
    console.log("User found:", user);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log("User following:", user.following.length);

    // Get the IDs of users the authenticated user is following
    const followingUserIds = user.following.map(user => user._id);
    console.log("Following user IDs:", followingUserIds);

    // Query MongoDB to get posts from those users
    const posts = await Post.find({
      author: { $in: followingUserIds }
    })
      .sort({ createdAt: -1 }) // Sort by most recent first
      .limit(10); // Limit to 10 posts per request;

    console.log("Number of posts found:", posts.length);

    res.json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching posts', details: error.message });
  }
};



module.exports = { createPost, getPosts, getFollowersPosts };

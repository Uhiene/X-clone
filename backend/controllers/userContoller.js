const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;

const Notification = require("../models/Notifications");
const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No users found" });
    }

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error(error.message, "Error while fetching all users");
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getUser = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username }).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    console.error(error.message, "Error while fetching user");
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const followUnfollow = async (req, res) => {
  try {
   

    const { id } = req.params;
    const currentUser = await User.findOne({_id: req.userId});

    if (id === req.userId.toString()) {
      return res
        .status(400)
        .json({ success: false, message: "Cannot follow yourself" });
    }
    const userToModify = await User.findById(id);
    if (!userToModify || !currentUser)
      return res.status(400).json({ error: "User not found" });

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      await User.findByIdAndUpdate(id, { $pull: { followers: req.userId } });
      await User.findByIdAndUpdate(req.userId, { $pull: { following: id } });

      res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      await User.findByIdAndUpdate(id, { $push: { followers: req.userId } });
      await User.findByIdAndUpdate(req.userId, { $push: { following: id } });

      const newNotification = new Notification({
        type: "follow",
        from: req.userId,
        to: userToModify._id,
      });

      await newNotification.save();

      res.status(200).json({ message: "User followed successfully" });
    }
  } catch (error) {
    console.log(error.message, "Error in followUnfolow User");
    res.status(500).json({ error: error.message });
  }
};

const getSuggestedUsers = async (req, res) => {
  try {
    const currentUser = await User.findById({_id: req.userId}).select("-password");
    if (!currentUser)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const users = await User.find({
      _id: { $nin: [currentUser._id, ...currentUser.following] },
    })
      .limit(10)
      .select("username");

    res.status(200).json({ users });
  } catch (error) {
    console.error(error.message, "Error in getSuggestedUsers");
    res.status(500).json({ error: error.message });
  }
};

const updateProfile = async (req, res) => {
  const { email, username, dob,  currentPassword, newPassword, bio, link } = req.body;
  let { profileImg, coverImg } = req.body;

  const userId = req.userId;

  try {
    let user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    if (
      (!newPassword && currentPassword) ||
      (!currentPassword && newPassword)
    ) {
      return res
        .status(400)
        .json({
          error: "Please provide both current password and new password",
        });
    }

    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch)
        return res.status(400).json({ error: "Current password is incorrect" });
      if (newPassword.length < 6) {
        return res
          .status(400)
          .json({ error: "Password must be at least 6 characters long" });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    if (profileImg) {
      if (user.profileImg) {
        // https://res.cloudinary.com/dyfqon1v6/image/upload/v1712997552/zmxorcxexpdbh8r0bkjb.png
        await cloudinary.uploader.destroy(
          user.profileImg.split("/").pop().split(".")[0]
        );
      }

      const uploadedResponse = await cloudinary.uploader.upload(profileImg);
      profileImg = uploadedResponse.secure_url;
    }

    if (coverImg) {
      if (user.coverImg) {
        await cloudinary.uploader.destroy(
          user.coverImg.split("/").pop().split(".")[0]
        );
      }

      const uploadedResponse = await cloudinary.uploader.upload(coverImg);
      coverImg = uploadedResponse.secure_url;
    }

    user.dob = dob || user.dob;
    user.email = email || user.email;
    user.username = username || user.username;
    user.bio = bio || user.bio;
    user.link = link || user.link;
    user.profileImg = profileImg || user.profileImg;
    user.coverImg = coverImg || user.coverImg;

    user = await user.save();

    // password should be null in response
    user.password = null;

    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in updateUser: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  followUnfollow,
  getSuggestedUsers,
  updateProfile,
};

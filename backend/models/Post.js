const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
			ref: "User",
			required: true,
    },
    image: { type: String },
    author: { type: String },
    likes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		comments: [
			{
				text: {
					type: String,
					required: true,
				},
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
					required: true,
				},
			},
		],

  },
  
  { timestamps: true }
);
// PostSchema.virtual('author').get(function() {
//   return this.username;
// });
const Post = mongoose.model("Post", PostSchema);
module.exports = Post;

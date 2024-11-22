import React, { useRef, useState } from "react";
import { FaImage, FaSmile } from "react-icons/fa";
import axios from "axios";

export default function CreatePost() {
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // For image preview
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Save the actual file for FormData
      setImagePreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  // Handle Post Submission
  const handlePost = async (e) => {
    e.preventDefault();
    setError("");

    // Check if text or image is provided
    if (!postText.trim() && !image) {
      alert("Please enter some text or upload an image!");
      return;
    }

    const formData = new FormData();
    formData.append("user", "Princess"); // Replace with dynamic user data if applicable
    formData.append("content", postText.trim());
    if (image) formData.append("image", image); // Add the image file

    // Check if a file is selected, if so append to FormData
    const imageFile = fileInputRef.current?.files[0];
    if (imageFile) {
      formData.append("image", imageFile); // Append the image if available
    }

    try {
      const response = await axios.post(
        "http://localhost:5173/api/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Post created:", response.data);

      // Clear inputs after successful post
      setPostText("");
      setImage(null);
      setImagePreview(null);
    } catch (err) {
      console.error("Error details:", err);
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="border border-gray-700 rounded-lg p-4 bg-gray-800">
      {/* Input Area */}
      <div className="flex">
        {/* Profile Picture */}
        <div className="mr-4">
          <img
            src="https://via.placeholder.com/48"
            alt="Profile"
            className="rounded-full w-12 h-12"
          />
        </div>

        {/* Text Input */}
        <div className="flex-1">
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="What's happening?"
            className="w-full bg-transparent text-gray-100 resize-none focus:outline-none"
            rows="3"
          />
        </div>
      </div>

      {/* Media Preview */}
      {imagePreview && (
        <div className="mt-4 relative">
          <img
            src={imagePreview}
            alt="Preview"
            className="max-h-64 w-auto rounded-lg mx-auto"
          />
          <button
            onClick={() => {
              setImage(null);
              setImagePreview(null);
              URL.revokeObjectURL(imagePreview); // Cleanup
            }}
            className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Actions */}
      <div className="mt-4 flex justify-between items-center">
        {/* Media Upload Options */}
        <div className="flex items-center space-x-4">
          <label className="cursor-pointer">
            <FaImage className="text-gray-400 hover:text-sky-500 text-lg" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          <FaSmile className="text-gray-400 hover:text-sky-500 text-lg cursor-pointer" />
        </div>

        {/* Post Button */}
        <button
          onClick={handlePost}
          className={`bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg font-semibold ${
            !postText.trim() && !image ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!postText.trim() && !image}
        >
          Post
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

import React from "react";

const DisplayPost = ({ user, content, image, timestamp }) => {
    const formatDate = (timestamp) => {
        const postTime = new Date(timestamp);
      
        const currentTime = new Date();
        const timeDifference = currentTime - postTime; // Difference in milliseconds
      
        const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60)); // Calculate hours ago
      
        if (hoursAgo < 1) {
          const minutesAgo = Math.floor(timeDifference / (1000 * 60)); // If less than 1 hour, calculate minutes
          return `${minutesAgo}m`; // Show minutes
        }
      
        return `${hoursAgo}h`; // Return hours
      };
      

  return (
    <div className="max-w-2xl mx-auto my-4 p-4 border-b border-gray-300 shadow-md bg-transparent">
      {/* Post Header */}
      <div className="flex items-center space-x-3">
        <img
          src="https://i.pravatar.cc/150?img=3" // Placeholder profile image
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="font-semibold">{user}</span>
          <span className="text-sm text-white">{formatDate(timestamp)}</span>
        </div>
      </div>

      {/* Post Content */}
      <div className="my-3">
        <p className="text-lg text-white">{content}</p>
      </div>

      {/* Image (if any) */}
      {image && <img src={`http://localhost:8000/uploads/${image}`} alt="Post image" className="w-full rounded-lg" />}

      {/* Post Actions (like, comment, share buttons) */}
      <div className="flex justify-between items-center mt-4 text-gray-500">
        <button className="flex items-center space-x-2 hover:text-blue-500">
          <span>💬</span>
          <span className="text-sm">Reply</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-blue-500">
          <span>🔁</span>
          <span className="text-sm">Retweet</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-blue-500">
          <span>❤️</span>
          <span className="text-sm">Like</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-blue-500">
          <span>🔗</span>
          <span className="text-sm">Share</span>
        </button>
      </div>
    </div>
  );
};

export default DisplayPost;

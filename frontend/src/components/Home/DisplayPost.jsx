import React from "react";
import { formatPostDate } from "../../utils/date";
import { BiMessageRounded } from "react-icons/bi";
import { FaHeart, FaRetweet, FaShare } from "react-icons/fa";

const DisplayPost = ({ username, content, image, timestamp }) => {
  const backendURL = process.env.BACKEND_URL || "http://localhost:8000";

  return (
    <div className="max-w-2xl mx-auto my-4 p-4 border-b border-gray-300 shadow-md bg-transparent">
      {/* Post Header */}
      <div className="flex space-x-3">
        <img
          src="https://via.placeholder.com/48"
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{username}</span>
            <span className="text-sm text-gray-400 font-light">
              {formatPostDate(timestamp)}
            </span>
          </div>
          <div className="">
            <p className="text-base text-white">{content}</p>
            {image &&
               <img
               src={`${backendURL}/uploads/${image}`}
               alt="Post image"
               className="w-full rounded-lg"
             />
            }
            <div className="flex justify-between items-center mt-4 text-gray-500 ">
              <button className="flex items-center space-x-2 hover:text-blue-500">
                <span><BiMessageRounded /></span>
                <span className="text-sm">Reply</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-blue-500">
                <span><FaRetweet /></span>
                <span className="text-sm">Retweet</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-blue-500">
                <span><FaHeart/></span>
                <span className="text-sm">Like</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-blue-500">
                <span><FaShare/></span>
                <span className="text-sm">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayPost;

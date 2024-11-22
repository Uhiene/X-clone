import React, { useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import DisplayPost from "./DisplayPost";
import axios from "axios";

export default function ContentSwitch() {
  const [view, setView] = useState("forYou"); 
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from the API when the component is mounted
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5173/api/posts");
        setPosts(response.data); // Set fetched posts into the state
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);


  const renderContent = () => {
    
    if (view === "forYou") {
      return (
        <div>
          {posts.map((post) => (
            <DisplayPost
              key={post._id} // Use a unique key for each post
              user={post.user}
              content={post.content}
              image={post.image}
              timestamp={post.timestamp}
            />
          ))}
        </div>
      );
    } else if (view === "following") {
      return (
        <div>
          <h2 className="text-2xl font-bold mb-4">Following</h2>
          <p>Content from the people you're following will appear here.</p>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toggle Buttons */}
      <div className="flex justify-around border-b border-gray-700 mb-4">
        <button
          onClick={() => setView("forYou")}
          className={`flex-1 py-3 text-center font-semibold ${
            view === "forYou"
              ? "text-sky-500 border-b-4 border-sky-500"
              : "text-gray-400"
          }`}
        >
          For You
        </button>
        <button
          onClick={() => setView("following")}
          className={`flex-1 py-3 text-center font-semibold ${
            view === "following"
              ? "text-sky-500 border-b-4 border-sky-500"
              : "text-gray-400"
          }`}
        >
          Following
        </button>
      </div>
      <CreatePost />
      {/* Dynamic Content */}
      <div className="px-4 flex-1 overflow-y-auto">{renderContent()}</div>
    </div>
  );
}

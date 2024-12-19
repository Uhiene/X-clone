import React, { useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import DisplayPost from "./DisplayPost";
import { usePostStore } from "../../store/postStore";

export default function ContentSwitch() {
  const [view, setView] = useState("forYou");
  const {
    postsForYou,
    postsFollowing,
    getPostsForYou,
    getFollowingPosts,
    isLoading,
  } = usePostStore((state) => state);

  useEffect(() => {
    // Fetch "For You" posts on mount
    if (view === "forYou") {
      getPostsForYou();
    } else if (view === "following") {
      getFollowingPosts();
    }
  }, [view, getPostsForYou, getFollowingPosts]);

  const renderContent = () => {
    if (view === "forYou") {
      return (
        <div>
          {isLoading ? (
            <p>Loading posts...</p>
          ) : (
            postsForYou.map((post) => (
              <DisplayPost
                key={post._id} // Use a unique key for each post
                username={post.username} // Assuming username is used here
                content={post.content}
                image={post.image}
                timestamp={post.createdAt}
              />
            ))
          )}
        </div>
      );
    } else if (view === "following") {
      return (
        <div>
        {isLoading ? (
          <p>Loading following posts...</p>
        ) : postsFollowing.length > 0 ? (
          postsFollowing.map((post) => (
            <DisplayPost
              key={post._id}
              user={post.username}
              content={post.content}
              image={post.image}
              timestamp={post.createdAt}
            />
          ))
        ) : (
          <p>No following posts found.</p>
        )}
      </div>
      );
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toggle Buttons */}
      <div className="flex justify-around border-b border-gray-700">
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

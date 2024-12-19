import React, { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";

const SuggestedFollowers = () => {
  const {
    suggestedUsers,
    fetchSuggestedUsers,
    followUnfollowUser,
    error,
  } = useUserStore();
  const [loadingUserId, setLoadingUserId] = useState(null);

  useEffect(() => {
    fetchSuggestedUsers();
  }, [fetchSuggestedUsers]);

  const handleFollow = async (id) => {
    setLoadingUserId(id);
    await followUnfollowUser(id);
    setLoadingUserId(null);
  };

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="border border-gray-700 h-96 overflow-y-scroll rounded-md p-4">
      <h2 className="font-medium text-white text-xl mb-6">Who to follow</h2>
      {suggestedUsers.length === 0 ? (
        <p className="text-gray-400">No users to suggest</p>
      ) : (
        <ul className="space-y-4">
          {suggestedUsers.map((user) => (
            <li
              key={user._id}
              className="flex items-center p-3"
            >
              <img
                src={user.profileImg || "https://via.placeholder.com/40"}
                alt={`${user.username}'s profile`}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div className="flex-1">
                <strong className="text-white">{user.username}</strong>
                <p className="text-sm text-gray-400">
                  {user.name || "No name available"}
                </p>
              </div>
              <button
                onClick={() => handleFollow(user._id)}
                disabled={loadingUserId === user._id}
                className={`ml-auto px-4 py-2 text-sm font-medium rounded-full 
                ${
                  loadingUserId === user._id
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-white"
                } text-black`}
              >
                {loadingUserId === user._id ? (
                  <div
                    className="inline-block w-4 h-4 border-2 border-white border-t-blue-500 rounded-full animate-spin"
                  ></div>
                ) : (
                  "Follow"
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SuggestedFollowers;

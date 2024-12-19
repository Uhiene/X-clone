import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:8000/api/posts";
axios.defaults.withCredentials = true;

export const usePostStore = create((set) => ({
  postsForYou: [],
  postsFollowing: [],
  isLoading: false,
  error: null,

  getPostsForYou: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/`);
      set({
        postsForYou: response.data,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: "Error fetching posts",
        isLoading: false,
      });
    }
  },

  //  getFollowingPosts: async () => {
  //   try {
  //     console.log("Fetching following posts...");
  //     const response = await axios.get(`${API_URL}/following`, {
  //       params: { userId: req.userId },
  //       headers: { Authorization: `Bearer ${token}` }
  //     });
  //     console.log("Following Posts Response:", response.data);
      
  //     if (response.data && Array.isArray(response.data.posts)) {
  //       set({ postsFollowing: response.data.posts, isLoading: false });
  //       console.log("Successfully fetched posts:", response.data.posts.length);
  //     } else {
  //       set({ postsFollowing: [], isLoading: false });
  //       console.warn("No posts found in response");
  //       console.log("Response data:", JSON.stringify(response.data));
  //     }
  //   } catch (error) {
  //     console.error("Error fetching following posts:", error);
  //     set({ error: "Error fetching posts", isLoading: false });
  //   }
  // }
  
}));

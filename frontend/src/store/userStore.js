import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:8000/api/users";
axios.defaults.withCredentials = true;

export const useUserStore = create((set) => ({
  suggestedUsers: [],
  isLoading: false,
  error: null,

  // Fetch suggested users
  fetchSuggestedUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/suggested`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      set({
        suggestedUsers: response.data.users,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: "Error fetching suggested users",
        isLoading: false,
      });
    }
  },

  // Follow or unfollow a user
  followUnfollowUser: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${API_URL}/follow/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      set((state) => ({
        suggestedUsers: state.suggestedUsers.filter((user) => user._id !== id),
        isLoading: false,
      }));
      return response.data.message;
    } catch (error) {
      set({
        error: "Error following/unfollowing user",
        isLoading: false,
      });
    }
  },
}));

import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:8000/api/auth";
axios.defaults.withCredentials = true


export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        name,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (email, password) => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error logging in",
        isLoading: false,
      });
    }
  },

  checkEmail: async (email) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}/check-email`, { email });
      return response.data; // Return the response for navigation
    } catch (error) {
      console.error("Error checking email:", error.response?.data || error.message);
      set({ error: error.response?.data?.message || "Error checking email" });
      throw error; // Re-throw the error for the component to handle
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
  
    try {
      // Make the GET request to check authentication
      const response = await axios.get(`${API_URL}/check-auth`, {
        headers: {
          // Include the token if available
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      // On success, update state with user info and set authentication flag to true
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      console.error("Check Auth Error:", error.response?.data || error.message);
  
      set({
        error: error.response?.data?.message || "Authentication failed",
        isAuthenticated: false,
        isCheckingAuth: false,
      });
    }
  },
  
}));

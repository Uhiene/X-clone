import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const EnterPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      console.error("Password is required");
      return;
    }

    try {
      // Call the login function with email and password
      await login(email, password);

      // Navigate to the home page or desired route on success
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err.message || "Unknown error");
    }
  };

  return (
    <div className="w-80 h-screen mx-auto flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-full justify-between"
      >
        {/* Form Header */}
        <div>
          <p className="mb-4 text-gray-500">Email: {email}</p>
          <h1 className="text-white text-3xl font-semibold mb-6">
            Enter your password
          </h1>

          <input
            type="password"
            id="password"
            className="w-full p-3 mb-4 bg-transparent border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mb-4 text-gray-300">
            <a href="#" className="text-blue-500 hover:text-blue-700">
              Forgot Password
            </a>
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-white text-black w-full py-2 rounded-full hover:bg-gray-100"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default EnterPassword;

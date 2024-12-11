import React, { useState } from "react";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const Signup = () => {
  const [email, setEmail] = useState("");
  const { checkEmail, isLoading, error } = useAuthStore();
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (!email) {
      setLocalError("Email is required");
      return;
    }

    try {
      const response = await checkEmail(email); // Use authStore function
      if (response.success) {
        navigate("/enter-password", { state: { email } }); // Navigate to next step
      }
    } catch (err) {
      setLocalError(err.response?.data?.message || "Error checking email");
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:8000/api/auth/google";
  };

  return (
    <div className="flex flex-col p-4 items-center">
      <div className="w-80">
        <h1 className="text-white text-3xl font-semibold mb-6">Join X today</h1>

        <div className="flex flex-col gap-4 mb-6">
          <button
            className="flex items-center justify-center gap-2 bg-white text-black w-full py-2 rounded-full hover:bg-gray-100"
            onClick={handleGoogleSignup}
          >
            <FcGoogle size={20} />
            Sign in with Google
          </button>
          <button className="flex items-center justify-center gap-2 bg-white text-black w-full py-2 rounded-full hover:bg-gray-100">
            <FaApple size={20} />
            Sign in with Apple
          </button>
        </div>

        <div class="flex items-center mt-3">
          <div class="flex-grow h-px bg-gray-600"></div>
          <span class="px-4 text-white">or</span>
          <div class="flex-grow h-px bg-gray-600"></div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-white text-black w-80 p-2 rounded-full my-4 font-medium"
        >
          {isLoading ? "Loading..." : "Create account"}
        </button>
        <p class="text-sm text-gray-500">
          By signing up, you agree to the 
          <a href="#" class="text-sky-500 hover:underline ml-1">
             Terms of Service 
          </a>{" "}
          and 
          <a href="#" class="text-sky-500 hover:underline ml-1" >
            Privacy Policy 
          </a>
          , including
          <a href="#" class="text-sky-500 hover:underline ml-1">
            Cookie Use 
          </a>
          .
        </p>
        <p class="text-sm text-gray-500 mt-2">
          Have an account already?
          <Link to="/login" class="text-sky-500 font-medium hover:underline ml-1">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

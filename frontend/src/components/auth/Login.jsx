import React, { useState } from "react";
import  {FaApple}  from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useAuthStore } from "../../store/authStore";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");

  const { login, isLoading, error} = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email)
  };

  return (
    <div className="flex flex-col p-4 items-center">
      <div className="w-80">
        <h1 className="text-white text-3xl font-semibold mb-6 ">
          Sign in to X
        </h1>

        <div className="flex flex-col gap-4 mb-6">
          <button
            className="flex items-center justify-center gap-2 bg-white text-black w-full py-2 rounded-full hover:bg-gray-100"
          >
            <FcGoogle size={20} />
            Sign in with Google
          </button>
          <button
            className="flex items-center justify-center gap-2 bg-white text-black w-full py-2 rounded-full hover:bg-gray-100"
          >
            <FaApple size={20} />
            Sign in with Apple
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-3 mt-2 bg-transparent border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Phone, email, or username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 font-semibold mb-2">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}

            className="bg-white text-black w-80 p-2 rounded-full my-4"
          >
            Next
          </button>
        </form>

        <button className="bg-tranparent text-white border border-gray-700 w-80 p-2 rounded-full mb-4">
          Forgot password?
        </button>

        <div className="mt-4 text-center text-gray-300">
          <span>Don't have an account? </span>
          <Link href="/signup" className="text-blue-500 hover:text-blue-700">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

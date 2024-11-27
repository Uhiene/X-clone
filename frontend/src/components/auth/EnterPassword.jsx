import React, { useState } from "react";

const EnterPassword = () => {
  const [password, setPassword] = useState("");

  

  return (
    <div className="w-80 h-screen mx-auto flex items-center justify-center">
      <form className="flex flex-col h-full justify-between">
        {/* Form Header */}
        <div>
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
          className="bg-white text-black w-full py-2 rounded-full hover:bg-gray-100"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default EnterPassword;

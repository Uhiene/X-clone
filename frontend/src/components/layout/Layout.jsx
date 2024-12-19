import { Outlet } from "react-router-dom"; // For rendering nested routes
import Sidebar from "./Sidebar";
import SuggestedFollowers from "./SuggestedFollowers";

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Outlet /> {/* This will render the nested routes like Home, Explore, etc. */}
      </div>

      {/* Right Section (Optional) */}
      <div className="w-96 hidden lg:block bg-gray-800 p-4 border-l border-gray-700">
        <SuggestedFollowers/>
      </div>
    </div>
  );
};

export default Layout;
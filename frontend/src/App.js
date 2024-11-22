import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Grok from "./pages/Grok";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
// import SearchBar from "./components/SearchBar";

export default function App() {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/grok" element={<Grok />} />
        </Routes>
      </div>

      {/* Right Section (Search/Trends/Extras) */}
      <div className="w-80 hidden lg:block bg-gray-800 p-4 border-l border-gray-700">
     
        {/* Add trends or other components here */}
      </div>
    </div>
  );
}

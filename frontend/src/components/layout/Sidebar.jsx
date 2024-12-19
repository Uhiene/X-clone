import { MdHomeFilled } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { RiNotificationFill } from "react-icons/ri";
import { FaEnvelope } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";
import { BsTwitterX } from "react-icons/bs";
import { FaBoltLightning } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { CiCircleMore } from "react-icons/ci";

import { Link } from "react-router-dom";

import { useAuthStore } from "../../store/authStore";
import { BiLogOut } from "react-icons/bi";

const SIDEBAR_ITEMS = [
  { name: "Home", icon: <MdHomeFilled />, color: "#ffffff", href: "/" },
  { name: "Explore", icon: <FaSearch />, color: "#ffffff", href: "/explore" },
  {
    name: "Notifications",
    icon: <RiNotificationFill />,
    color: "#ffffff",
    href: "/notifications",
  },
  {
    name: "Messages",
    icon: <FaEnvelope />,
    color: "#ffffff",
    href: "/messages",
  },
  { name: "Grok", icon: <FaSearch />, color: "#ffffff", href: "/grok" },
  {
    name: "BookMarks",
    icon: <FaBookmark />,
    color: "#ffffff",
    href: "/bookmarks",
  },
  {
    name: "Communities",
    icon: <HiUsers />,
    color: "#ffffff",
    href: "/communities",
  },
  { name: "Premium", icon: <BsTwitterX />, color: "#ffffff", href: "/premium" },
  {
    name: "Verified Orgs",
    icon: <FaBoltLightning />,
    color: "#ffffff",
    href: "/verified",
  },
  { name: "Profile", icon: <FaUser />, color: "#ffffff", href: "/profile" },
  { name: "More", icon: <CiCircleMore />, color: "#ffffff", href: "/more" },
];

const Sidebar = () => {
  const { username, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    console.log("Logout button clicked");
  };

  return (
    <div
      className="relative z-10 bg-gray-800 bg-opacity-25 backdrop-blur-md overflow-y-scroll border-r border-gray-700 flex flex-col h-full 
      lg:w-64 w-20" // Sidebar is fully open on large screens and collapsed on small screens
    >
      <div className="h-full p-4 flex flex-col">
        {/* No toggle button, sidebar is always visible on large screens */}
        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <div className="flex items-center p-3 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
                <div style={{ color: item.color }} className="text-lg">
                  {item.icon}
                </div>
                <span
                  className={`ml-4 text-lg hidden lg:block`} // Hide text on small screens
                >
                  {item.name}
                </span>
              </div>
            </Link>
          ))}
          <div className="mt-auto mb-10 hidden md:flex gap-2 items-start transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-full border">
            <div className="avatar hidden sm:inline-flex">
              <div>
                <img
                  src="https://via.placeholder.com/48"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
            </div>
            <div className="flex justify-between flex-1">
              <div className="hidden sm:block">
                <p className="text-white font-bold text-sm w-20 truncate">
                  Code Queen
                </p>
                <p className="text-slate-500 text-sm">Princess</p>
              </div>
              <button onClick={handleLogout}>
                <BiLogOut className="w-5 h-5 cursor-pointer" />
              </button>
            </div>
          </div>
          <button onClick={handleLogout}>
            <BiLogOut className="w-5 h-5 cursor-pointer" />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

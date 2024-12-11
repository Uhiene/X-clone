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

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

import { useAuthStore } from "../store/authStore";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, logout } = useAuthStore();
  const handleLogout = () => {
    logout();
  };

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 bg-gray-800  bg-opacity-25 backdrop-blur-md ${
        isSidebarOpen ? " flex flex-col items-center border-r border-gray-700" : ""
      }`}
      animate={{ width: isSidebarOpen ? 360 : 80 }}
    >
      <div className="h-full  p-4 flex flex-col ">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
        >
          <BsTwitterX size={24} />
        </motion.button>
        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item, index) => (
            <Link key={item.href} to={item.href}>
              <motion.div className="flex items-center  p-3 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
                <div style={{ color: item.color }} className="text-lg">
                  {item.icon}
                </div>
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap text-lg"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
             
              </motion.div>
            </Link>
          ))}
          <Link
						// to={`/profile/${authUser.username}`}
						className='mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-full border '
					>
						<div className='avatar hidden md:inline-flex'>
							<div>
								<img   src="https://via.placeholder.com/48"  className="w-10 h-10 rounded-full object-cover" />
							</div>
						</div>
            <div className='flex justify-between flex-1'>
							<div className='hidden md:block'>
								<p className='text-white font-bold text-sm w-20 truncate'>Code Queen</p>
								<p className='text-slate-500 text-sm'>Princess</p>
							</div>
							<BiLogOut
								className='w-5 h-5 cursor-pointer'
                onClick={handleLogout}/>
						</div>
					</Link>
           
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;

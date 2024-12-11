import { FaXTwitter } from "react-icons/fa6";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#242D35]">
      <main className="w-2/5 h-3/4 bg-black rounded-xl  flex flex-col p-4 items-center">
      <FaXTwitter className="text-white text-3xl mb-4" />
      {children}</main>
    </div>
  );
};

export default AuthLayout;

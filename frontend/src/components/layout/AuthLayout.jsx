import { FaXTwitter } from "react-icons/fa6";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-600">
      <main className="w-11/12 h-3/4 bg-gray-900 rounded-md  flex flex-col p-4 items-center">
      <FaXTwitter className="text-white text-3xl mb-4" />
      {children}</main>
    </div>
  );
};

export default AuthLayout;

import React from 'react';
import { BsFillWrenchAdjustableCircleFill } from 'react-icons/bs';

const ComingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <BsFillWrenchAdjustableCircleFill className="text-blue-500 text-9xl mb-4" />
      
      <h1 className="text-4xl font-bold mb-2">Page Under Construction</h1>
      
      <p className="text-lg text-gray-600">Stay tuned for something amazing!</p>
    </div>
  );
};

export default ComingSoon;

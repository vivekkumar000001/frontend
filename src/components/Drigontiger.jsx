import React from 'react';
import { useNavigate } from 'react-router-dom';

const Drigontiger = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-gray-900 text-white text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">🚧 Under Maintenance 🚧</h1>
      <p className="text-lg md:text-xl mb-8">
        We're currently working on something awesome. Please check back soon.
      </p>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mb-8"></div>

      <button
        onClick={() => navigate(-1)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300"
      >
        ← Go Back
      </button>
    </div>
  );
};

export default Drigontiger;

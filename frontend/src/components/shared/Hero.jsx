import React from "react";
import { FaSearch } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Find Your Dream Job Today
        </h1>

        <p className="text-gray-500 mb-10">
          Explore thousands of opportunities and take the next step in your career
        </p>

        <div className="flex items-center bg-white rounded-full shadow-md border max-w-xl mx-auto overflow-hidden">
          <input
            type="text"
            placeholder="Search jobs, companies..."
            className="flex-1 px-5 py-3 focus:outline-none text-gray-700"
          />

          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 m-1 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm">
  <FaSearch size={16} />
</button>
        </div>

      </div>
    </div>
  );
};

export default Hero;
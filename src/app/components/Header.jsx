// File: /src/app/components/Header.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Header({ onSearchClick }) {
  const handleLogoClick = () => {
    // Navigate to “/” and force a full page reload
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 inset-x-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo + Title (clickable to refresh) */}
        <div
          onClick={handleLogoClick}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-6 sm:w-6 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-lg sm:text-2xl font-bold text-gray-800 tracking-tight">
            Confidence
            <span className="text-indigo-600">Archetype</span>
          </h1>
        </div>

        {/* Responsive Verify Button */}
        {/* <motion.button
          onClick={onSearchClick}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Verify your results"
          className="
            flex items-center gap-2
            bg-gradient-to-r from-indigo-600 to-purple-600
            text-white font-medium
            px-3 sm:px-4 py-2 sm:py-2.5
            rounded-full
            shadow-xl
            transition duration-200
            focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50
            hover:from-indigo-500 hover:to-purple-500
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-5 sm:w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span className="text-xs sm:text-sm font-medium hidden sm:inline">
            Verify Results
          </span>
        </motion.button> */}
      </div>
    </header>
  );
}

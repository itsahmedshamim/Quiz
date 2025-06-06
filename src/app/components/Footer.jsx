// File: /src/app/components/Footer.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiVideo, FiShield } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="relative z-10 py-6 px-4 text-center text-sm text-gray-300 bg-black/60 backdrop-blur-sm border-t border-gray-700">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Branding (logo + name), now matching Header’s logo */}
          <div className="flex items-center justify-center gap-3">
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
            <p className="font-medium text-gray-200">
              Confidence<span className="text-indigo-400">Archetype</span>
            </p>
          </div>

          {/* Copyright */}
          <p className="text-gray-400">
            © {new Date().getFullYear()} All rights reserved
          </p>

          {/* Navigation Links + “Let’s Talk” */}
          <div className="flex items-center gap-4">
            {/* Admin link */}
            <motion.a
              href="/dashboard"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Admin"
              className="flex items-center gap-1 text-gray-400 hover:text-indigo-400 transition-colors"
            >
              <FiShield className="h-3 w-3 md:h-4 md:w-4" />
              <span>Admin</span>
            </motion.a>

            {/* Let’s Talk as a plain <a> */}
            <motion.a
              href="https://calendly.com/alexdumascoaching/strategy"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Let’s Talk"
              className="
                flex items-center gap-1
                border border-indigo-600
                text-indigo-600 font-medium text-xs md:text-sm
                px-3 py-1.5 md:px-4 md:py-2
                rounded-full
                transition duration-200
                focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50
                hover:text-white hover:border-transparent hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600
              "
            >
              <FiVideo className="h-3 w-3 md:h-4 md:w-4" />
              <span>Let’s Talk</span>
            </motion.a>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Discover your leadership style with our scientifically designed assessment.
        </p>
      </div>
    </footer>
  );
}

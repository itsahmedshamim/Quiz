'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiVideo, FiShield } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="relative z-10 py-6 px-4 text-center text-sm text-gray-300 bg-black/60 backdrop-blur-sm border-t border-gray-700">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Branding */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">C</span>
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
            {/* Admin link can stay as motion.a with plain href */}
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

            {/* Let’s Talk as a plain <a> (motion.a) */}
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

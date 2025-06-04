"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <motion.div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 md:p-12 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
      

        {/* Illustration */}
        <div className="mb-8 text-indigo-500">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-24 w-24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>

        {/* Content */}
        <div className="text-center max-w-lg">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-3"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Page Not Found
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 mb-8 leading-relaxed"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            The page you're looking for doesn't exist or has been moved. 
            Don't worry - let's get you back on track.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 w-full max-w-xs mx-auto"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/" passHref legacyBehavior>
              <motion.a
                className="flex-1 text-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-xl shadow-lg transition-all"
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 10px 25px -10px rgba(59, 130, 246, 0.5)"
                }}
                whileTap={{ scale: 0.97 }}
              >
                Home
              </motion.a>
            </Link>
            
          
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
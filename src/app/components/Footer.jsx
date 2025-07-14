// File: /src/app/components/Footer.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiVideo, FiShield } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="relative z-10 py-8 px-4 text-center bg-[022f6b] backdrop-blur-lg border-t border-gray-700">
      <div className="max-w-6xl mx-auto">
        {/* Main grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] items-center gap-6">
          {/* Logo - left aligned on desktop */}
          <div className="flex justify-center md:justify-start">
            <div className="relative">
              <img
                src="/assets/logo-white.png"
                alt="Confidence Archetype"
                className="
                  w-24 h-24        /* 96×96px */
                  sm:w-28 sm:h-28  /* 112×112px */
                  object-contain
                  drop-shadow-lg
                "
              />
              <div className="absolute inset-0 rounded-full -z-10"></div>
            </div>
          </div>

          {/* Center content - copyright and description */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-gray-300 text-sm md:text-base">
              © {new Date().getFullYear()} Confidence Archetype. All rights reserved.
            </p>
            <p className="text-gray-400 max-w-md mx-auto text-sm md:text-base italic">
              Discover your leadership archetype through our scientifically validated assessment.
            </p>
            
            {/* Mobile-only "Let's Talk" button */}
            <motion.a
              href="https://calendly.com/alexdumascoaching/strategy"
              className="
                md:hidden  /* Hide on desktop */
                flex items-center justify-center gap-2
                border border-[#c2a070] 
                text-[#c2a070] font-medium 
                text-sm
                px-4 py-2
                rounded-full
                mt-3
                transition-all duration-250
                hover:text-white hover:border-transparent 
                hover:bg-gradient-to-r hover:from-[#022f6b] hover:to-[#0a4b9a]
              "
              whileHover={{ 
                y: -2,
                boxShadow: "0 4px 10px rgba(194, 160, 112, 0.25)"
              }}
              whileTap={{ scale: 0.97 }}
            >
              <FiVideo className="h-4 w-4" />
              <span>Let's Talk</span>
            </motion.a>
          </div>

          {/* Admin button - right aligned on desktop */}
          <div className="flex justify-center md:justify-end">
            <motion.a
              href="/dashboard"
              className="
                flex items-center gap-2 
                text-gray-300 hover:text-[#c2a070] 
                transition-colors duration-200
                px-4 py-2
                rounded-lg
                bg-gray-800/50 hover:bg-gray-700/50
                w-fit
              "
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiShield className="h-5 w-5" />
              <span className="text-sm md:text-base font-medium">Admin</span>
            </motion.a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent my-6"></div>
        
      
      </div>
    </footer>
  );
}

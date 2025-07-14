// File: /src/app/components/Header.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiVideo } from "react-icons/fi";

export default function Header({ onSearchClick }) {
  const handleLogoClick = () => {
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 inset-x-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo + Title */}
        <div
          onClick={handleLogoClick}
          className="flex items-center cursor-pointer select-none"
        >
          <div className="relative flex-shrink-0">
            <img
              src="/assets/logo.png"
              alt="Logo"
              className="
                w-16 h-16         /* 64×64px on mobile */
                sm:w-20 sm:h-20   /* 80×80px on small */
                md:w-24 md:h-24   /* 96×96px on medium */
                lg:w-28 lg:h-28   /* 112×112px on large */
                xl:w-32 xl:h-32   /* 128×128px on xl */
                object-contain
                align-middle
              "
            />
          </div>
          <div className="ml-4 flex items-baseline">
            <h1
              className="
                text-2xl sm:text-3xl font-bold tracking-tight
                leading-tight
              "
            >
              <span className="text-[#022f6b]">Confidence</span>
              <span className="text-[#c2a070]">Archetype</span>
            </h1>
          </div>
        </div>

        {/* Desktop Navigation - Right-aligned "Let's Talk" button */}
        <div className="hidden md:block">
          <motion.a
            href="https://calendly.com/alexdumascoaching/strategy"
            whileHover={{
              y: -2,
              boxShadow: "0 4px 14px rgba(194, 160, 112, 0.25)",
            }}
            whileTap={{ scale: 0.97 }}
            aria-label="Let's Talk"
            className="
              flex items-center gap-2
              border border-[#c2a070]
              text-[#c2a070] font-medium
              text-base
              px-5 py-2.5
              rounded-full
              transition-all duration-250
              focus:outline-none focus:ring-2 focus:ring-[#c2a070] focus:ring-opacity-50
              hover:text-white hover:border-transparent
              hover:bg-gradient-to-r hover:from-[#022f6b] hover:to-[#0a4b9a]
              whitespace-nowrap
            "
          >
            <FiVideo className="h-5 w-5" />
            <span>Let's Talk</span>
          </motion.a>
        </div>
      </div>
    </header>
  );
}

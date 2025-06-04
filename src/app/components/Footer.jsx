'use client';

import React from 'react';

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

          {/* Navigation Links */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
              Contact
            </a>
            <a href="/dashboard" className="text-gray-400 hover:text-indigo-400 transition-colors">
              Admin
            </a>
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

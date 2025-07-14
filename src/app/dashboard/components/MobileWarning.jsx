// File: src/app/dashboard/components/MobileWarning.jsx
'use client';

import React from 'react';
import { FiX } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function MobileWarning() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-6">
      <div className="bg-gray-800 rounded-xl shadow-lg p-8 max-w-md text-center">
        <FiX className="h-16 w-16 mx-auto text-[#c2a070] mb-4" />
        <h2 className="text-xl font-bold mb-4 text-gray-100">Desktop Only</h2>
        <p className="text-gray-400 mb-6">
          This dashboard is optimized for desktop or laptop viewing.
        </p>
        <button
          onClick={() => router.push('/')}
          className="bg-[#022f6b] hover:bg-[#c2a070] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
        >
          Return Home
        </button>
      </div>
    </div>
  );
}

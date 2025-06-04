// File: src/app/dashboard/components/SummaryCards.jsx
'use client';

import React from 'react';
import { FiUsers, FiMail } from 'react-icons/fi';

export default function SummaryCards({ totalCount, countsByArchetype, archetypeColors }) {
  // We expect `archetypeColors` to be an object like { "Perfectionist": {...}, ... }
  const summaryEntries = Object.entries(archetypeColors);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Submissions Card */}
      <div className="bg-gray-800 shadow-md rounded-2xl p-6 flex flex-col space-y-4 border border-gray-700">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gray-700 rounded-full">
            <FiUsers className="h-6 w-6 text-gray-300" />
          </div>
          <div>
            <p className="text-sm text-gray-400 uppercase tracking-wider">Total Submissions</p>
            <p className="mt-1 text-2xl font-semibold text-gray-100">{totalCount}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">100% of all responses</span>
          <div className="flex-1 h-2 bg-gray-700 rounded-full">
            <div className="h-full bg-gray-500 rounded-full" style={{ width: '100%' }} />
          </div>
        </div>
      </div>

      {/* Archetype Breakdown Cards */}
      {summaryEntries.map(([type, colorObj]) => {
        const count = countsByArchetype[type] || 0;
        const percentage = totalCount ? Math.round((count / totalCount) * 100) : 0;

        return (
          <div
            key={type}
            className={`
              bg-gray-800 shadow-md rounded-2xl p-6 flex flex-col space-y-4
              border ${colorObj.border}
            `}
          >
            <div className="flex items-center space-x-4">
              <div
                className={`
                  p-3 rounded-full bg-gradient-to-r ${colorObj.gradient}
                `}
              >
                <FiMail className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className={`text-sm ${colorObj.text} uppercase tracking-wider`}>{type}</p>
                <div className="flex items-baseline space-x-1">
                  <p className={`text-2xl font-semibold ${colorObj.text}`}>{count}</p>
                  <p className={`text-sm ${colorObj.text}`}>({percentage}%)</p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-700 rounded-full">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${colorObj.gradient}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-xs text-gray-400">{percentage}% of total</p>
          </div>
        );
      })}
    </div>
  );
}

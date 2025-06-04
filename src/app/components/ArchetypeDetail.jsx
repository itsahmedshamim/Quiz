// src/app/components/ArchetypeDetail.jsx
import React from 'react';
import { motion } from 'framer-motion';
import {
  FiAward,
  FiUser,
  FiHeart,
  FiEyeOff,
  FiZap
} from 'react-icons/fi';
import archetypeData from '../data/archetypeData';

const archetypeColors = {
  Perfectionist: {
    gradient: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800'
  },
  'Quiet Achiever': {
    gradient: 'from-purple-500 to-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-800'
  },
  'People-Pleaser': {
    gradient: 'from-pink-500 to-pink-600',
    bg: 'bg-pink-50',
    border: 'border-pink-200',
    text: 'text-pink-800'
  },
  'Hidden Leader': {
    gradient: 'from-indigo-500 to-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    text: 'text-indigo-800'
  },
  'Bold Believer': {
    gradient: 'from-teal-500 to-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    text: 'text-teal-800'
  },
};

const archetypeIcons = {
  Perfectionist: <FiAward className="text-blue-600" />,
  'Quiet Achiever': <FiUser className="text-purple-600" />,
  'People-Pleaser': <FiHeart className="text-pink-600" />,
  'Hidden Leader': <FiEyeOff className="text-indigo-600" />,
  'Bold Believer': <FiZap className="text-teal-600" />,
};

export default function ArchetypeDetail({ archetype, tally, totalQuestions }) {
  const data = archetypeData[archetype];
  const colorClass = archetypeColors[archetype] || archetypeColors['Quiet Achiever'];
  const icon = archetypeIcons[archetype] || <FiAward />;

  const userScore = tally?.[archetype] || 0;
  const percentage = Math.round((userScore / (totalQuestions || 1)) * 100);

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6 text-center">
        <div className="flex justify-center mb-4">
          <div
            className={`w-16 h-16 rounded-full bg-gradient-to-r bg-opacity-20 flex items-center justify-center ${colorClass.gradient}`}
          >
            {icon}
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{archetype}</h2>
        <p className="text-sm text-gray-600 mb-4">{data.title}</p>

        {/* Score bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div
            className={`h-3 rounded-full bg-gradient-to-r ${colorClass.gradient}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mb-6">
          {userScore} / {totalQuestions} answers ({percentage}%)
        </p>

        {/* Description, challenges, opportunities */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Who You Are</h3>
          <p className="text-gray-700 text-sm">{data.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <h4 className="font-bold text-red-700 mb-1">Challenges</h4>
            <p className="text-gray-700 text-sm">{data.challenges}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <h4 className="font-bold text-green-700 mb-1">Opportunities</h4>
            <p className="text-gray-700 text-sm">{data.opportunities}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Deep Dive</h3>
          <ul className="space-y-3">
            {data.details.map((detail, idx) => (
              <li
                key={idx}
                className="flex items-start bg-gray-50 p-3 rounded-xl border border-gray-100"
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-white mr-3 flex-shrink-0 bg-gradient-to-r ${colorClass.gradient}`}
                >
                  {idx + 1}
                </span>
                <span className="text-gray-700 text-sm">{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

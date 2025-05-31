// src/components/Question.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Question({
  questionData,
  questionIndex,
  totalQuestions,
  onAnswerSelected,
  userName
}) {
  // Calculate progress percentage
  const progress = ((questionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 bg-white rounded-2xl shadow-xl backdrop-blur-sm bg-opacity-90 border border-white border-opacity-30">
      {/* Progress bar with user info */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm font-medium text-indigo-700">
            {userName ? `${userName}'s Assessment` : "Personality Assessment"}
          </div>
          <div className="text-sm font-medium text-gray-600">
            {questionIndex + 1} of {totalQuestions}
          </div>
        </div>
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Question text */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          {questionData.question}
        </h2>
        <motion.div 
          className="h-0.5 bg-gradient-to-r from-indigo-300 to-purple-300"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </div>

      {/* Options */}
      <div className="space-y-4">
        {questionData.options.map((option, index) => (
          <motion.button
            key={option.label}
            onClick={() => onAnswerSelected(option.label)}
            whileHover={{ y: -2, backgroundColor: "#f5f3ff" }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.3,
              delay: index * 0.1,
              ease: "easeOut"
            }}
            className={`
              w-full
              flex items-center
              p-5
              border
              rounded-xl
              bg-white
              text-left
              transition-all duration-200
              focus:outline-none focus:ring-4 focus:ring-indigo-100
              hover:border-indigo-300
            `}
          >
            {/* Letter in circle */}
            <div className={`
              mr-4 flex-shrink-0
              h-10 w-10
              rounded-full
              flex items-center justify-center
              font-bold
              bg-indigo-100 text-indigo-700
            `}>
              {option.label}
            </div>
            
            {/* Option text */}
            <span className="text-gray-800">{option.text}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
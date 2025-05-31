// src/app/components/Question.jsx
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Question({
  questionData,
  questionIndex,
  totalQuestions,
  onAnswerSelected,
  userName
}) {
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  
  // Calculate progress percentage
  const progress = ((questionIndex + 1) / totalQuestions) * 100;

  // Check if this is the last question
  useEffect(() => {
    setIsLastQuestion(questionIndex + 1 === totalQuestions);
  }, [questionIndex, totalQuestions]);

  return (
    <motion.div 
      className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Progress bar with user info */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm font-medium text-indigo-600">
            {userName ? `${userName}'s Assessment` : "Personality Assessment"}
          </div>
          <div className="text-sm font-medium text-gray-500">
            {questionIndex + 1} of {totalQuestions}
          </div>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        
        {/* Progress indicator */}
        <div className="mt-2 text-xs text-gray-500 text-right">
          {isLastQuestion ? "Final question!" : `${Math.round(progress)}% completed`}
        </div>
      </div>

      {/* Question content */}
      <div className="p-8">
        {/* Question text */}
        <div className="mb-8">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {questionData.question}
          </motion.h2>
          <motion.div 
            className="h-0.5 bg-gradient-to-r from-indigo-200 to-purple-200"
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
                delay: 0.2 + index * 0.1,
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
                focus:outline-none focus:ring-2 focus:ring-indigo-100
                hover:border-indigo-300
                group
              `}
            >
              {/* Letter in circle */}
              <div className={`
                mr-4 flex-shrink-0
                h-10 w-10
                rounded-full
                flex items-center justify-center
                font-bold
                bg-indigo-100 text-indigo-600
                group-hover:bg-indigo-600 group-hover:text-white
                transition-colors
              `}>
                {option.label}
              </div>
              
              {/* Option text */}
              <span className="text-gray-800 group-hover:text-indigo-700 transition-colors">
                {option.text}
              </span>
            </motion.button>
          ))}
        </div>
        
        {/* Last question indicator */}
        {isLastQuestion && (
          <motion.div 
            className="mt-8 p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p className="text-indigo-700 font-medium">
              This is the final question! Your results will appear after you select an answer.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
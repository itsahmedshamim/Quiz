// src/app/components/ScoringExplanation.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function ScoringExplanation({ onNext }) {
  const archetypes = [
    { 
      name: "Perfectionist", 
      color: "bg-blue-100 border-blue-300",
      dot: "bg-blue-500"
    },
    { 
      name: "Quiet Achiever", 
      color: "bg-purple-100 border-purple-300",
      dot: "bg-purple-500"
    },
    { 
      name: "People-Pleaser", 
      color: "bg-pink-100 border-pink-300",
      dot: "bg-pink-500"
    },
    { 
      name: "Hidden Leader", 
      color: "bg-indigo-100 border-indigo-300",
      dot: "bg-indigo-500"
    },
    { 
      name: "Bold Believer", 
      color: "bg-teal-100 border-teal-300",
      dot: "bg-teal-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-8">
        <div className="text-center mb-8">
          <motion.div 
            className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </motion.div>
          
          <motion.h2 
            className="text-2xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            How Scoring Works
          </motion.h2>
        </div>
        
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-gray-700 mb-6">
            Each answer you select corresponds to one of five Confidence Archetypes. 
            At the end of the assessment, we'll calculate which archetype you most align with based on your answers.
          </p>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {archetypes.map((archetype, index) => (
              <motion.div 
                key={archetype.name}
                className={`rounded-lg p-3 flex items-center border ${archetype.color}`}
                variants={itemVariants}
              >
                <div className={`w-3 h-3 rounded-full mr-2 ${archetype.dot}`}></div>
                <span className="text-sm font-medium text-gray-700">{archetype.name}</span>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="bg-indigo-50 rounded-xl p-5 border border-indigo-100"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.4 }}
          >
            <h3 className="font-bold text-indigo-700 mb-3">Important:</h3>
            <p className="text-gray-700">
              There are no right or wrong answers. Be honest with yourself to get the most accurate results. 
              Answer based on what feels most true to you, not what you think you "should" say.
            </p>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center"
        >
          <button
            onClick={onNext}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
          >
            I Understand - Let's Begin
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
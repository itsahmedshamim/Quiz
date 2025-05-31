// src/components/EnhancedResult.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";

export default function EnhancedResult({ tally, totalQuestions, userName, onRestart }) {
  // Convert tally to percentages
  const percentages = Object.entries(tally).map(([type, count]) => ({
    type,
    count,
    percent: Math.round((count / totalQuestions) * 100),
  }));
  
  // Sort by percentage
  percentages.sort((a, b) => b.percent - a.percent);
  
  // Primary, secondary, tertiary types
  const primary = percentages[0];
  const secondary = percentages[1];
  const tertiary = percentages[2];
  
  // Personality descriptions
  const typeDescriptions = {
    Visionary: "Imaginative innovators who see possibilities everywhere and inspire others with their vision of the future.",
    Strategist: "Analytical planners who excel at complex problem-solving and creating efficient systems.",
    Connector: "Relationship builders who thrive on social interactions and creating meaningful connections.",
    Builder: "Practical implementers who turn ideas into reality through focused effort and determination.",
    Supporter: "Empathetic helpers who nurture and support others with genuine care and understanding.",
  };
  
  // Personality icons
  const typeIcons = {
    Visionary: "💡",
    Strategist: "📊",
    Connector: "🤝",
    Builder: "🔨",
    Supporter: "❤️",
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block mb-4"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center mx-auto">
              <span className="text-4xl">✨</span>
            </div>
          </motion.div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Your Personality Profile, {userName || "Friend"}!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Based on your answers, here's your unique personality composition
          </p>
        </motion.div>
        
        {/* Results Summary */}
        <motion.div 
          className="glass-card rounded-2xl overflow-hidden mb-16 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="p-8 bg-gradient-to-r from-indigo-600 to-purple-600">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="bg-white/20 backdrop-blur-sm p-5 rounded-2xl">
                  <span className="text-5xl">{typeIcons[primary.type]}</span>
                </div>
              </div>
              <div className="text-center md:text-left">
                <div className="inline-block bg-white/30 px-4 py-1 rounded-full mb-3">
                  <span className="text-white text-sm font-semibold">PERSONALITY BREAKDOWN</span>
                </div>
                <h2 className="text-4xl font-bold text-white mb-2">
                  {primary.percent}% {primary.type}
                </h2>
                <p className="text-white/90 text-xl">
                  {secondary.percent}% {secondary.type} • {tertiary.percent}% {tertiary.type}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-indigo-50 rounded-xl">
                <div className="text-5xl mb-3">{typeIcons[primary.type]}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{primary.type}</h3>
                <p className="text-gray-700">{typeDescriptions[primary.type]}</p>
              </div>
              
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <div className="text-5xl mb-3">{typeIcons[secondary.type]}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{secondary.type}</h3>
                <p className="text-gray-700">{typeDescriptions[secondary.type]}</p>
              </div>
              
              <div className="text-center p-6 bg-pink-50 rounded-xl">
                <div className="text-5xl mb-3">{typeIcons[tertiary.type]}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{tertiary.type}</h3>
                <p className="text-gray-700">{typeDescriptions[tertiary.type]}</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Detailed Breakdown */}
        <motion.div
          className="glass-card rounded-2xl p-8 mb-16 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Your Complete Personality Mix</h2>
          
          <div className="space-y-6">
            {percentages.map((item, index) => (
              <div key={item.type} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700 text-lg">
                    {item.type} {typeIcons[item.type]}
                  </span>
                  <span className="font-bold text-gray-900 text-lg">{item.percent}%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full bg-gradient-to-r ${
                      item.type === "Visionary" 
                        ? "from-indigo-500 to-purple-500" 
                        : item.type === "Strategist" 
                          ? "from-blue-500 to-cyan-500" 
                          : item.type === "Connector"
                            ? "from-emerald-500 to-teal-500"
                            : item.type === "Builder"
                              ? "from-amber-500 to-yellow-500"
                              : "from-rose-500 to-pink-500"
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percent}%` }}
                    transition={{ 
                      duration: 1, 
                      delay: 0.5 + index * 0.1,
                      ease: "easeOut"
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-600 font-medium rounded-2xl shadow-lg hover:shadow-xl border-2 border-indigo-100 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
            </svg>
            Print Results
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRestart}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            Retake Quiz
          </motion.button>
        </motion.div>
        
        {/* Final Insights */}
        <motion.div
          className="glass-card rounded-2xl p-8 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">What This Means For You</h2>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              Your primary personality trait is <strong>{primary.type}</strong>, which makes up {primary.percent}% of your personality. 
              This dominant aspect shapes how you approach challenges and interact with the world.
            </p>
            
            <p>
              Your secondary trait is <strong>{secondary.type}</strong> at {secondary.percent}%, which complements your primary trait 
              and provides balance to your personality.
            </p>
            
            <p>
              Finally, your tertiary trait is <strong>{tertiary.type}</strong> at {tertiary.percent}%, which adds depth and nuance 
              to your personality profile.
            </p>
            
            <div className="mt-6 p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
              <p className="font-medium">
                This unique combination of traits makes you particularly effective at tasks that require {primary.type.toLowerCase()} thinking, 
                supported by {secondary.type.toLowerCase()} approaches, with the added dimension of {tertiary.type.toLowerCase()} perspectives.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
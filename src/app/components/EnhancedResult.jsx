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
    Visionary: {
      description: "You're a dreamer with big ideas that light up the room! Your imagination knows no bounds, and you inspire others with your vision of what could be.",
      strengths: ["Creative thinking", "Future-focused", "Inspirational"],
      advice: "Your superpower is seeing possibilities where others see obstacles. Keep dreaming big, but remember to ground your visions with practical steps.",
      icon: "💡",
      color: "from-indigo-500 to-purple-500"
    },
    Strategist: {
      description: "You're the master planner who sees the chessboard of life three moves ahead. Your analytical mind helps you navigate complexity with grace.",
      strengths: ["Problem-solving", "Organized", "Efficient"],
      advice: "Your ability to create order from chaos is invaluable. Remember to trust your intuition as much as your spreadsheets.",
      icon: "📊",
      color: "from-blue-500 to-cyan-500"
    },
    Connector: {
      description: "You're the social glue that brings people together! Your empathy and communication skills create meaningful relationships wherever you go.",
      strengths: ["Relationship-building", "Empathetic", "Supportive"],
      advice: "Your gift for understanding others makes you irreplaceable. Just remember to nurture your own needs as much as you nurture others.",
      icon: "🤝",
      color: "from-emerald-500 to-teal-500"
    },
    Builder: {
      description: "You're the practical doer who turns dreams into reality! When others are talking, you're already making things happen.",
      strengths: ["Action-oriented", "Practical", "Determined"],
      advice: "Your hands-on approach gets results. Remember to occasionally lift your head from the work to appreciate the bigger picture.",
      icon: "🔨",
      color: "from-amber-500 to-yellow-500"
    },
    Supporter: {
      description: "You're the caring heart that makes everyone feel seen! Your compassion creates safe spaces where people can grow and thrive.",
      strengths: ["Nurturing", "Patient", "Encouraging"],
      advice: "Your kindness changes lives. Remember that caring for yourself isn't selfish—it's necessary to keep helping others.",
      icon: "❤️",
      color: "from-rose-500 to-pink-500"
    }
  };

  // Get details for each type
  const primaryDetails = typeDescriptions[primary.type];
  const secondaryDetails = typeDescriptions[secondary.type];
  const tertiaryDetails = typeDescriptions[tertiary.type];

  // Personalized insights
  const insights = [
    `As a ${primary.type.toLowerCase()}, you lead with ${primaryDetails.strengths[0].toLowerCase()}.`,
    `Your ${secondary.type.toLowerCase()} side gives you ${secondaryDetails.strengths[0].toLowerCase()}.`,
    `And your ${tertiary.percent}% ${tertiary.type.toLowerCase()} adds ${tertiaryDetails.strengths[0].toLowerCase()}.`,
    `Together, they make you uniquely equipped to ${primaryDetails.strengths[0].split(' ')[0].toLowerCase()} ${secondaryDetails.strengths[0].split(' ')[0].toLowerCase()} ${tertiaryDetails.strengths[0].split(' ')[0].toLowerCase()}!`
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with personal greeting */}
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
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center mx-auto shadow-lg">
              <span className="text-4xl">✨</span>
            </div>
          </motion.div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Hey {userName || "friend"}, meet your amazing self!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Based on your answers, here's what makes you uniquely wonderful
          </p>
        </motion.div>
        
        {/* Primary Personality Highlight */}
        <motion.div 
          className="bg-white rounded-2xl overflow-hidden mb-16 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="p-8 bg-gradient-to-r from-indigo-600 to-purple-600">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="bg-white/20 backdrop-blur-sm p-5 rounded-2xl shadow-inner">
                  <span className="text-5xl">{primaryDetails.icon}</span>
                </div>
              </div>
              <div className="text-center md:text-left">
                <div className="inline-block bg-white/30 px-4 py-1 rounded-full mb-3">
                  <span className="text-white text-sm font-semibold">YOUR PRIMARY TRAIT</span>
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
          
          <div className="p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What this means</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {primaryDetails.description}
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Your superpowers</h3>
              <div className="flex flex-wrap gap-3">
                {primaryDetails.strengths.map((strength, i) => (
                  <div key={i} className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full font-medium">
                    {strength}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 bg-indigo-50 rounded-xl border-l-4 border-indigo-500">
              <p className="font-medium text-gray-700">
                {primaryDetails.advice}
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Your Personality Blend */}
        <motion.div
          className="bg-white rounded-2xl p-8 mb-16 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Your Unique Personality Blend
          </h2>
          
          <div className="flex justify-center mb-10">
            <div className="relative w-64 h-64">
              {percentages.map((item, index) => {
                const startAngle = index === 0 
                  ? 0 
                  : percentages.slice(0, index).reduce((sum, curr) => sum + curr.percent, 0) * 3.6;
                
                return (
                  <motion.div
                    key={item.type}
                    className={`absolute inset-0 rounded-full`}
                    style={{
                      clipPath: `conic-gradient(from ${startAngle}deg, transparent ${item.percent * 3.6}deg)`,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.7, 
                      delay: 0.4 + index * 0.1,
                      ease: "easeOut"
                    }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${typeDescriptions[item.type].color}`} />
                  </motion.div>
                );
              })}
              
              {/* Center circle */}
              <div className="absolute inset-10 bg-white rounded-full flex items-center justify-center shadow-inner border border-gray-100">
                <span className="text-lg font-bold text-gray-700">You</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-b from-indigo-50 to-white rounded-xl border border-gray-100 shadow-sm">
              <div className="text-5xl mb-3">{primaryDetails.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{primary.type}</h3>
              <p className="text-gray-600">{primary.percent}% of you</p>
              <p className="mt-3 text-gray-700">{primaryDetails.description.split('!')[0]}!</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-b from-purple-50 to-white rounded-xl border border-gray-100 shadow-sm">
              <div className="text-5xl mb-3">{secondaryDetails.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{secondary.type}</h3>
              <p className="text-gray-600">{secondary.percent}% of you</p>
              <p className="mt-3 text-gray-700">{secondaryDetails.description.split('!')[0]}!</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-b from-pink-50 to-white rounded-xl border border-gray-100 shadow-sm">
              <div className="text-5xl mb-3">{tertiaryDetails.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{tertiary.type}</h3>
              <p className="text-gray-600">{tertiary.percent}% of you</p>
              <p className="mt-3 text-gray-700">{tertiaryDetails.description.split('!')[0]}!</p>
            </div>
          </div>
        </motion.div>
        
        {/* Personalized Insights */}
        <motion.div
          className="bg-white rounded-2xl p-8 mb-16 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Your Personal Insights
          </h2>
          
          <div className="space-y-6">
            {insights.map((insight, index) => (
              <motion.div 
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.2 }}
              >
                <div className="flex-shrink-0 mt-1 mr-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-600">✓</span>
                  </div>
                </div>
                <p className="text-gray-700 text-lg">{insight}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-10 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-l-4 border-indigo-500">
            <h3 className="text-xl font-semibold text-indigo-700 mb-3">How to thrive</h3>
            <p className="text-gray-700">
              Embrace your {primary.type.toLowerCase()} nature by {primaryDetails.strengths[0].split(' ')[0].toLowerCase()} regularly. 
              Let your {secondary.type.toLowerCase()} side help you {secondaryDetails.strengths[1].toLowerCase()}. 
              And remember to {tertiaryDetails.strengths[2].toLowerCase()} to nourish your {tertiary.type.toLowerCase()} aspect. 
              This beautiful combination is what makes you uniquely wonderful!
            </p>
          </div>
        </motion.div>
        
        {/* Action Buttons with Encouragement */}
        <motion.div
          className="flex flex-col items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">What's next on your journey?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Keep this insight as a reminder of your unique strengths, or explore again to see how you grow!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-indigo-600 font-medium rounded-xl shadow-md hover:shadow-lg border border-gray-200 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
              </svg>
              Save My Results
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onRestart}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Explore Again
            </motion.button>
          </div>
        </motion.div>
        
        {/* Final Celebration */}
        <motion.div
          className="text-center py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.2 }}
        >
          <div className="inline-block bg-gradient-to-r from-yellow-100 to-yellow-50 px-6 py-3 rounded-full mb-6">
            <p className="text-yellow-700 font-medium">Celebrate your uniqueness!</p>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">You are wonderfully made</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Remember that personality insights are tools for self-understanding, not boxes to define you. 
            You're always growing, learning, and becoming more you!
          </p>
          
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              {['🎉', '✨', '🌟', '💖', '👏'].map((emoji, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 1.5,
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="text-3xl"
                >
                  {emoji}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
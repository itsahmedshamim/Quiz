"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function EnhancedResult({ tally, totalQuestions, userName, onRestart }) {
  // Convert tally to percentages - FIXED CALCULATION
  const calculatePercentages = () => {
    // Calculate total responses (should equal totalQuestions)
    const totalResponses = Object.values(tally).reduce((sum, count) => sum + count, 0);
    
    return Object.entries(tally).map(([type, count]) => ({
      type,
      count,
      percent: Math.round((count / totalResponses) * 100)
    }));
  };

  const percentages = calculatePercentages();
  
  // Sort by percentage
  percentages.sort((a, b) => b.percent - a.percent);
  
  // Get top 3 types
  const primary = percentages[0] || { type: "", percent: 0 };
  const secondary = percentages[1] || { type: "", percent: 0 };
  const tertiary = percentages[2] || { type: "", percent: 0 };
  
  // Personality descriptions
  const typeDescriptions = {
    Visionary: {
      description: "You're a dreamer with big ideas that light up the room! Your imagination knows no bounds, and you inspire others with your vision of what could be.",
      strengths: ["Creative thinking", "Future-focused", "Inspirational"],
      advice: "Your superpower is seeing possibilities where others see obstacles. Keep dreaming big, but remember to ground your visions with practical steps.",
      icon: "💡",
      color: "from-indigo-500 to-purple-500",
      baseColor: "#6366f1"
    },
    Strategist: {
      description: "You're the master planner who sees the chessboard of life three moves ahead. Your analytical mind helps you navigate complexity with grace.",
      strengths: ["Problem-solving", "Organized", "Efficient"],
      advice: "Your ability to create order from chaos is invaluable. Remember to trust your intuition as much as your spreadsheets.",
      icon: "📊",
      color: "from-blue-500 to-cyan-500",
      baseColor: "#3b82f6"
    },
    Connector: {
      description: "You're the social glue that brings people together! Your empathy and communication skills create meaningful relationships wherever you go.",
      strengths: ["Relationship-building", "Empathetic", "Supportive"],
      advice: "Your gift for understanding others makes you irreplaceable. Just remember to nurture your own needs as much as you nurture others.",
      icon: "🤝",
      color: "from-emerald-500 to-teal-500",
      baseColor: "#10b981"
    }
  };

  // Get details for each type
  const getTypeDetails = (type) => {
    return typeDescriptions[type] || {
      description: "",
      strengths: [],
      advice: "",
      icon: "❓",
      color: "from-gray-500 to-gray-400",
      baseColor: "#9ca3af"
    };
  };

  const primaryDetails = getTypeDetails(primary.type);
  const secondaryDetails = getTypeDetails(secondary.type);
  const tertiaryDetails = getTypeDetails(tertiary.type);

  // Personalized insights
  const insights = [
    `As a ${primary.type.toLowerCase()}, you lead with ${primaryDetails.strengths[0]?.toLowerCase() || 'unique qualities'}.`,
    secondary.percent > 0 ? `Your ${secondary.type.toLowerCase()} side gives you ${secondaryDetails.strengths[0]?.toLowerCase() || 'valuable perspectives'}.` : "Your diverse perspectives give you unique strengths.",
    tertiary.percent > 0 ? `And your ${tertiary.percent}% ${tertiary.type.toLowerCase()} adds ${tertiaryDetails.strengths[0]?.toLowerCase() || 'distinct characteristics'}.` : "Your well-rounded nature adds depth to your personality.",
    `Together, they make you uniquely equipped to succeed!`
  ];

  // State for pie chart
  const [pieVisible, setPieVisible] = useState(false);
  const [activeSegment, setActiveSegment] = useState(null);
  
  useEffect(() => {
    const timer = setTimeout(() => setPieVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Calculate pie chart segments
  const calculatePieSegments = () => {
    const segments = [];
    let startAngle = 0;
    
    percentages.forEach((item) => {
      if (item.percent > 0) {
        const segment = {
          type: item.type,
          percent: item.percent,
          color: typeDescriptions[item.type]?.baseColor || "#9ca3af",
          startAngle,
          endAngle: startAngle + (item.percent * 3.6),
          icon: typeDescriptions[item.type]?.icon || "❓"
        };
        segments.push(segment);
        startAngle = segment.endAngle;
      }
    });
    
    return segments;
  };

  const pieSegments = calculatePieSegments();

  // Handle print functionality
  const handlePrint = () => {
    const originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'visible';
    document.body.classList.add('printing');
    
    setTimeout(() => {
      window.print();
      
      setTimeout(() => {
        document.body.style.overflow = originalBodyOverflow;
        document.body.classList.remove('printing');
      }, 500);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50 py-4 md:py-8 px-2 sm:px-4">
      <div className="max-w-4xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        {/* Header with personal greeting */}
        <motion.div 
          className="text-center mb-6 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-block mb-3"
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
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center mx-auto shadow-lg">
              <span className="text-2xl md:text-3xl">✨</span>
            </div>
          </motion.div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">
            Hey {userName || "friend"}, meet your results!
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Based on your answers, here's your unique personality breakdown
          </p>
        </motion.div>
        
        {/* Primary Personality Highlight */}
        {primary.type && (
          <motion.div 
            className="bg-white rounded-lg md:rounded-xl overflow-hidden mb-10 md:mb-14 shadow-md md:shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="p-4 md:p-6 bg-gradient-to-r from-indigo-600 to-purple-600">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                <div className="flex-shrink-0">
                  <div className="bg-white/20 backdrop-blur-sm p-3 md:p-4 rounded-lg md:rounded-xl shadow-inner">
                    <span className="text-3xl md:text-4xl">{primaryDetails.icon}</span>
                  </div>
                </div>
                <div className="text-center md:text-left mt-3 md:mt-0">
                  <div className="inline-block bg-white/30 px-2 py-1 md:px-3 md:py-1 rounded-full mb-1 md:mb-2 text-xs">
                    <span className="text-white font-medium">PRIMARY TRAIT</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {primary.percent}% {primary.type}
                  </h2>
                  <p className="text-white/90 text-base md:text-lg">
                    {secondary.percent > 0 ? `${secondary.percent}% ${secondary.type}` : ''} 
                    {tertiary.percent > 0 ? ` • ${tertiary.percent}% ${tertiary.type}` : ''}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 md:p-5">
              <div className="mb-4 md:mb-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">What this means</h3>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  {primaryDetails.description}
                </p>
              </div>
              
              <div className="mb-4 md:mb-5">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 md:mb-2">Your superpowers</h3>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {primaryDetails.strengths.map((strength, i) => (
                    <div key={i} className="px-2 py-1 md:px-3 md:py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs md:text-sm font-medium">
                      {strength}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-2 md:p-3 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                <p className="font-medium text-gray-700 text-xs md:text-sm">
                  {primaryDetails.advice}
                </p>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Your Personality Blend */}
        <motion.div
          className="bg-white rounded-lg md:rounded-xl p-4 md:p-5 mb-10 md:mb-14 shadow-md md:shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-5 text-center">
            Your Personality Composition
          </h2>
          
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="relative w-full max-w-xs mx-auto">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {pieSegments.map((segment, index) => {
                  const midAngle = (segment.startAngle + segment.endAngle) / 2;
                  const textX = 50 + 35 * Math.cos((midAngle * Math.PI) / 180);
                  const textY = 50 + 35 * Math.sin((midAngle * Math.PI) / 180);
                  
                  return (
                    <g 
                      key={index}
                      onMouseEnter={() => setActiveSegment(segment)}
                      onMouseLeave={() => setActiveSegment(null)}
                      onClick={() => setActiveSegment(segment === activeSegment ? null : segment)}
                    >
                      <motion.path
                        d={`
                          M 50,50
                          L ${50 + 50 * Math.cos((segment.startAngle * Math.PI) / 180)}, 
                            ${50 + 50 * Math.sin((segment.startAngle * Math.PI) / 180)}
                          A 50,50 0 ${segment.percent > 50 ? 1 : 0},1 
                            ${50 + 50 * Math.cos((segment.endAngle * Math.PI) / 180)},
                            ${50 + 50 * Math.sin((segment.endAngle * Math.PI) / 180)}
                          Z
                        `}
                        fill={segment.color}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: pieVisible ? 1 : 0,
                          scale: pieVisible ? 1 : 0
                        }}
                        transition={{ 
                          duration: 0.7,
                          delay: 0.3 + index * 0.1,
                          type: "spring",
                          damping: 12
                        }}
                        className="cursor-pointer transition-opacity duration-200"
                        style={{ opacity: activeSegment && activeSegment !== segment ? 0.7 : 1 }}
                      />
                      {pieVisible && segment.percent > 10 && (
                        <motion.text
                          x={textX}
                          y={textY}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="white"
                          fontSize="5"
                          fontWeight="bold"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                          className="pointer-events-none"
                        >
                          {segment.percent}%
                        </motion.text>
                      )}
                    </g>
                  );
                })}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="18"
                  fill="white"
                  initial={{ scale: 0 }}
                  animate={{ scale: pieVisible ? 1 : 0 }}
                  transition={{ delay: 1.0, type: "spring" }}
                />
                <motion.text
                  x="50"
                  y="50"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#4f46e5"
                  fontSize="7"
                  fontWeight="bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: pieVisible ? 1 : 0 }}
                  transition={{ delay: 1.2 }}
                >
                  You
                </motion.text>
              </svg>
              
              {/* Tooltip for active segment */}
              {activeSegment && (
                <motion.div 
                  className="absolute bg-black/80 text-white text-xs p-2 rounded-lg shadow-lg z-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 'max-content',
                    maxWidth: '140px'
                  }}
                >
                  <div className="flex items-center gap-1 mb-1">
                    <span>{activeSegment.icon}</span>
                    <span className="font-bold">{activeSegment.type}</span>
                  </div>
                  <div>{activeSegment.percent}% of your personality</div>
                </motion.div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {percentages.slice(0, 3).map((item, index) => {
              const details = getTypeDetails(item.type);
              return (
                <div key={index} className="text-center p-3 md:p-4 bg-gradient-to-b from-indigo-50 to-white rounded-lg border border-gray-100 shadow-sm">
                  <div className="text-3xl md:text-4xl mb-2">{details.icon}</div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">{item.type || "Mixed"}</h3>
                  <p className="text-gray-600 text-xs md:text-sm">{item.percent}% of you</p>
                  <p className="mt-1 md:mt-2 text-gray-700 text-xs md:text-sm">
                    {details.description.split('!')[0] || 'Unique characteristics'}!
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
        
        {/* Personalized Insights */}
        <motion.div
          className="bg-white rounded-lg md:rounded-xl p-4 md:p-5 mb-10 md:mb-14 shadow-md md:shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-5 text-center">
            Your Personal Insights
          </h2>
          
          <div className="space-y-3 md:space-y-4">
            {insights.map((insight, index) => (
              <motion.div 
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.2 }}
              >
                <div className="flex-shrink-0 mt-1 mr-3">
                  <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-600 text-sm">✓</span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm md:text-base">{insight}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-6 md:mt-8 p-3 md:p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border-l-4 border-indigo-500">
            <h3 className="text-base md:text-lg font-semibold text-indigo-700 mb-1 md:mb-2">How to thrive</h3>
            <p className="text-gray-700 text-xs md:text-sm">
              {primaryDetails.advice}
            </p>
          </div>
        </motion.div>
        
        {/* Action Buttons */}
        <motion.div
          className="flex flex-col items-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="text-center mb-5 md:mb-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2">What's next?</h3>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
              Save your results or explore again to see how you evolve!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 w-full max-w-xs md:max-w-sm">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePrint}
              className="flex items-center justify-center gap-1 px-4 py-2.5 text-sm md:px-5 md:py-3 md:text-base bg-white text-indigo-600 font-medium rounded-lg shadow-md hover:shadow-lg border border-gray-200 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 极 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h极v-4z" clipRule="evenodd" />
              </svg>
              Save Results
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onRestart}
              className="flex items-center justify-center gap-1 px-4 py-2.5 text-sm md:px-5 md:py-3 md:text-base bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all mt-2 sm:mt-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Explore Again
            </motion.button>
          </div>
        </motion.div>
        
        {/* Final Celebration */}
        <motion.div
          className="text-center py-6 md:py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <div className="inline-block bg-gradient-to-r from-yellow-100 to-yellow-50 px-4 py-1.5 md:px-5 md:py-2 rounded-full mb-3 md:mb-4">
            <p className="text-yellow-700 font-medium text-xs md:text-sm">Celebrate your uniqueness!</p>
          </div>
          
          <h2 className="text-xl md:text-2极 font-bold text-gray-900 mb-2 md:mb-3">You are wonderfully made</h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Personality insights are tools for self-understanding, not boxes to define you. 
            You're always growing and evolving!
          </p>
          
          <div className="mt-4 md:mt-6 flex justify-center">
            <div className="flex flex-wrap justify-center gap-1">
              {['🎉', '✨', '🌟', '💖', '👏'].map((emoji, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 1.5,
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="text-xl md:text-2xl"
                >
                  {emoji}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Print-specific styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            padding: 0 !important;
            margin: 0 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          
          .no-print {
            display: none !important;
          }
          
          .print-content {
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          
          .bg-gradient-to-b, .bg-gradient-to-r {
            background: white !important;
          }
          
          .shadow-md, .shadow-lg {
            box-shadow: none !important;
          }
          
          .border {
            border: 1px solid #e5e7eb !important;
          }
          
          .text-center {
            text-align: center !important;
          }
        }
      `}</style>
    </div>
  );
}
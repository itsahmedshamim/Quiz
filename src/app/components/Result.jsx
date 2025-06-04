// src/app/components/Result.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBarChart2,
  FiTarget,
  FiStar,
  FiArrowRight,
  FiMenu,
  FiX,
  FiCheck,
  FiUser,
  FiBookOpen,
  FiCalendar,
  FiAward,
  FiCopy
} from "react-icons/fi";
import archetypeData from "../data/archetypeData";

import CongratsBanner from "../components/results/CongratsBanner";
import ArchetypeBreakdown from "../components/results/ArchetypeBreakdown";
import ArchetypeInsights from "../components/results/ArchetypeInsights";
import ArchetypeDetails from "../components/results/ArchetypeDetails";
import ResultsCardGenerator from "../components/results/ResultsCardGenerator";

const archetypeColors = {
  Perfectionist: {
    gradient: "from-blue-600 to-indigo-700",
    bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
    border: "border-blue-200",
    text: "text-blue-800",
    light: "bg-blue-100",
    glass: "bg-blue-500/10 backdrop-blur-sm",
  },
  "Quiet Achiever": {
    gradient: "from-purple-600 to-indigo-700",
    bg: "bg-gradient-to-br from-purple-50 to-indigo-50",
    border: "border-purple-200",
    text: "text-purple-800",
    light: "bg-purple-100",
    glass: "bg-purple-500/10 backdrop-blur-sm",
  },
  "People-Pleaser": {
    gradient: "from-pink-600 to-rose-700",
    bg: "bg-gradient-to-br from-pink-50 to-rose-50",
    border: "border-pink-200",
    text: "text-pink-800",
    light: "bg-pink-100",
    glass: "bg-pink-500/10 backdrop-blur-sm",
  },
  "Hidden Leader": {
    gradient: "from-indigo-600 to-violet-700",
    bg: "bg-gradient-to-br from-indigo-50 to-violet-50",
    border: "border-indigo-200",
    text: "text-indigo-800",
    light: "bg-indigo-100",
    glass: "bg-indigo-500/10 backdrop-blur-sm",
  },
  "Bold Believer": {
    gradient: "from-teal-600 to-emerald-700",
    bg: "bg-gradient-to-br from-teal-50 to-emerald-50",
    border: "border-teal-200",
    text: "text-teal-800",
    light: "bg-teal-100",
    glass: "bg-teal-500/10 backdrop-blur-sm",
  },
};

const archetypeIcons = {
  Perfectionist: <FiAward className="text-blue-600" />,
  "Quiet Achiever": <FiUser className="text-purple-600" />,
  "People-Pleaser": <FiUser className="text-pink-600" />,
  "Hidden Leader": <FiUser className="text-indigo-600" />,
  "Bold Believer": <FiUser className="text-teal-600" />,
};

export default function Result({
  archetype,
  totalQuestions,
  userName,
  userId,
  tally,
  onRestart,
}) {
  const [selectedArchetype, setSelectedArchetype] = useState(archetype);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1400,
    height: typeof window !== "undefined" ? window.innerHeight : 1200,
  });
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      if (window.innerWidth > 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate percentages for each archetype
  const safeTally = tally || {
    Perfectionist: 0,
    "Quiet Achiever": 0,
    "People-Pleaser": 0,
    "Hidden Leader": 0,
    "Bold Believer": 0,
  };
  const calculatePercentage = (score) =>
    Math.round((score / totalQuestions) * 100);

  const archetypePercentages = Object.entries(safeTally)
    .map(([type, score]) => ({
      type,
      percentage: calculatePercentage(score),
      score,
      color: archetypeColors[type] || archetypeColors["Quiet Achiever"],
    }))
    .sort((a, b) => b.percentage - a.percentage);

  // Find the primary archetype's percentage
  const primaryData =
    archetypePercentages.find((item) => item.type === archetype) || {
      percentage: 0,
    };
  const primaryPercentage = primaryData.percentage;

  // Find the selected archetype's percentage
  const selectedData =
    archetypePercentages.find((item) => item.type === selectedArchetype) || {
      percentage: 0,
    };
  const selectedPercentage = selectedData.percentage;

  const data = archetypeData[selectedArchetype] || {};
  const colorClass =
    archetypeColors[selectedArchetype] || archetypeColors["Quiet Achiever"];

  // Tab config
  const tabs = [
    { id: "overview", label: "Overview", icon: <FiBarChart2 /> },
    { id: "strengths", label: "Your Strengths", icon: <FiStar /> },
    { id: "action", label: "Action Plan", icon: <FiTarget /> },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <ArchetypeBreakdown
              archetype={archetype}
              archetypePercentages={archetypePercentages}
              archetypeIcons={archetypeIcons}
              selectedArchetype={selectedArchetype}
              handleArchetypeSelect={handleArchetypeSelect}
              totalQuestions={totalQuestions}
            />
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-5 sm:p-6 border border-white/30">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 flex items-center">
                <FiBookOpen className="mr-2 text-indigo-500" />
                Quick Summary
              </h3>
              <p className="text-gray-600 mb-3 text-sm sm:text-base">
                {data.description}
              </p>
              <button
                onClick={() => setActiveTab("strengths")}
                className="inline-flex items-center text-indigo-600 font-medium text-sm"
              >
                Explore your strengths <FiArrowRight className="ml-1" />
              </button>
            </div>
          </div>
        );
      case "strengths":
        return (
          <ArchetypeInsights
            selectedArchetype={selectedArchetype}
            archetype={archetype}
            colorClass={colorClass}
            data={data}
          />
        );
      case "action":
        return (
          <ArchetypeDetails
            selectedArchetype={selectedArchetype}
            archetype={archetype}
            colorClass={colorClass}
            data={data}
            archetypeIcons={archetypeIcons}
          />
        );
      default:
        return null;
    }
  };

  const isMobile = windowSize.width < 768;

  // Handle user clicking "explore another archetype"
  const handleArchetypeSelect = (type) => {
    setSelectedArchetype(type);
    if (window.innerWidth >= 768) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen">
      <div className="relative max-w-6xl mx-auto sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
        <div className="backdrop-blur-lg bg-white/80 rounded-3xl shadow-xl border border-white/30 overflow-hidden">
        
          {/* Congrats Banner */}
          <CongratsBanner
            userName={userName}
            selectedArchetype={selectedArchetype}
            archetypeData={archetypeData}
            colorClass={colorClass}
            percentage={selectedPercentage}
          />
          
          {/* User ID display */}
          {userId && (
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-gray-100/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-gray-600 flex items-center">
                <span className="mr-1">ID:</span>
                <span className="font-mono truncate max-w-[80px] sm:max-w-[120px]">
                  {userId.length > 8 ? userId.slice(-8) : userId}
                </span>
             <button 
  onClick={() => navigator.clipboard.writeText(userId.slice(-8))} // ✅ Copy last 8 chars only
  className="ml-2 text-gray-500 hover:text-indigo-600"
  title="Copy ID"
>
  <FiCopy className="w-3 h-3" />
</button>


              </div>
            </div>
          )}

          {/* Mobile "Change Archetype" button */}
          <div className="mb-4 sm:mb-6 flex justify-center md:hidden px-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`flex items-center px-3 py-2 sm:px-4 sm:py-3 rounded-xl shadow w-full justify-center text-white text-sm sm:text-base bg-gradient-to-r ${colorClass.gradient} backdrop-blur-sm`}
            >
              <FiMenu className="mr-2" />
              <span>Change Archetype</span>
            </button>
          </div>

          {/* Tab navigation */}
          <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-4 sm:mb-6 bg-white/50 backdrop-blur-sm p-1 rounded-xl shadow-inner mx-4">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                className={`flex items-center px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg transition-all flex-1 min-w-[100px] sm:min-w-[120px] justify-center backdrop-blur-sm ${
                  activeTab === tab.id
                    ? `text-white bg-gradient-to-r ${colorClass.gradient} shadow`
                    : "text-gray-700 bg-white/60 hover:bg-white/80"
                }`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="mr-1 sm:mr-2">{tab.icon}</span>
                <span className="font-medium text-xs sm:text-sm">{tab.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="mb-6 sm:mb-8 px-4"
            >
              {renderActiveTab()}
            </motion.div>
          </AnimatePresence>

          {/* Desktop "Explore Other Archetypes" */}
          {!isMobile && (
            <div className="mb-6 bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg mx-4">
              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-5 text-center">
                Explore Other Archetypes
              </h3>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {Object.keys(archetypeData).map((type) => {
                  const isPrimary = type === archetype;
                  const isCurrentlySelected = selectedArchetype === type;

                  return (
                    <div key={type} className="relative">
                      <motion.button
                        className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium flex items-center backdrop-blur-sm ${
                          isCurrentlySelected
                            ? `text-white bg-gradient-to-r ${archetypeColors[type].gradient} shadow-lg`
                            : "text-gray-700 bg-white/60 hover:bg-white/80 shadow"
                        }`}
                        onClick={() => handleArchetypeSelect(type)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="mr-1 sm:mr-2 text-sm">
                          {archetypeIcons[type]}
                        </span>
                        <span className="text-xs sm:text-sm">{type}</span>
                      </motion.button>

                      {/* Mark primary archetype */}
                      {isPrimary && (
                        <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full backdrop-blur-sm">
                          Primary
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Certificate Generator */}
          <div className="mt-6 mb-5 px-4">
            <ResultsCardGenerator
              userName={userName}
              archetype={archetype}
              percentage={primaryPercentage}
              userId={userId}
            />
          </div>

          {/* Premium CTA */}
          <motion.div
            className="bg-gradient-to-br from-indigo-900/90 to-purple-900/90 backdrop-blur-lg text-white rounded-2xl p-4 sm:p-6 md:p-8 text-center mb-6 sm:mb-8 shadow-lg relative overflow-hidden mx-4"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://assets.website-files.com/5e6c01bb5212506d6c119069/5e6c01bb8abd7762a1f8e48d_pattern-1.svg')] backdrop-blur-sm"></div>

            <div className="relative z-10 max-w-lg mx-auto">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3">
                Unlock Your Full Confidence Potential
              </h3>
              <p className="text-indigo-200 text-sm sm:text-base mb-5">
                Personalized coaching and exclusive resources to help you thrive
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-lg">
                  <div className="text-amber-300 text-sm sm:text-base font-bold mb-1">
                    30-Day Program
                  </div>
                  <ul className="text-left text-xs sm:text-sm space-y-1">
                    <li className="flex items-center">
                      <FiCheck className="mr-1 text-emerald-400" />
                      <span>Personalized coaching</span>
                    </li>
                    <li className="flex items-center">
                      <FiCheck className="mr-1 text-emerald-400" />
                      <span>Custom action plans</span>
                    </li>
                    <li className="flex items-center">
                      <FiCheck className="mr-1 text-emerald-400" />
                      <span>Confidence exercises</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-lg">
                  <div className="text-amber-300 text-sm sm:text-base font-bold mb-1">
                    Community Access
                  </div>
                  <ul className="text-left text-xs sm:text-sm space-y-1">
                    <li className="flex items-center">
                      <FiCheck className="mr-1 text-emerald-400" />
                      <span>Private support group</span>
                    </li>
                    <li className="flex items-center">
                      <FiCheck className="mr-1 text-emerald-400" />
                      <span>Weekly group coaching</span>
                    </li>
                    <li className="flex items-center">
                      <FiCheck className="mr-1 text-emerald-400" />
                      <span>Resource library</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="https://calendly.com/alexdumascoaching/strategy"
                  className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-gray-900 font-bold px-5 sm:px-6 py-2 sm:py-3 rounded-xl transition-all shadow-md flex items-center text-xs sm:text-sm backdrop-blur-sm"
                >
                  <FiCalendar className="mr-1" />
                  Schedule Consultation
                </a>

                <a
                  href="https://www.alexdumascoaching.com/"
                  className="bg-white/20 hover:bg-white/30 text-white font-medium px-5 sm:px-6 py-2 sm:py-3 rounded-xl transition-all flex items-center text-xs sm:text-sm backdrop-blur-sm"
                >
                  <FiBookOpen className="mr-1" />
                  View Program Details
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Action Button (Mobile) */}
      {isMobile && (
        <motion.div
          className="fixed bottom-6 right-6 z-30 md:hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white text-lg bg-gradient-to-r ${colorClass.gradient} backdrop-blur-sm`}
          >
            <FiMenu />
          </button>
        </motion.div>
      )}

      {/* Mobile Archetype Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white/90 backdrop-blur-lg w-4/5 h-full p-5"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800">Archetypes</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <FiX className="text-xl" />
              </button>
            </div>
            <div className="space-y-3">
              {Object.keys(archetypeData).map((type) => (
                <button
                  key={type}
                  className={`w-full text-left px-3 py-2 rounded-lg font-medium flex items-center text-sm ${
                    selectedArchetype === type
                      ? `text-white bg-gradient-to-r ${archetypeColors[type].gradient}`
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => handleArchetypeSelect(type)}
                >
                  <span className="mr-2">{archetypeIcons[type]}</span>
                  {type}
                </button>
              ))}
            </div>
            <div className="mt-6 px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 font-medium flex items-center">
              <FiCheck className="mr-1 text-green-500" />
              Primary:{" "}
              <span className={`ml-1 ${archetypeColors[archetype].text}`}>
                {archetype}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
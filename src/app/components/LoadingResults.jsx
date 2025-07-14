// src/app/components/LoadingResults.jsx
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBarChart2,
  FiPieChart,
  FiTrendingUp,
  FiUser,
  FiAward,
  FiEyeOff,
  FiCheckCircle,
  FiLock
} from "react-icons/fi";

export default function LoadingResults({
  userName,
  onShowResults,
  userEmail,
  archetype,
  tally,
  totalQuestions,
  viewedArchetypes
}) {
  const steps = [
    { icon: <FiBarChart2 className="w-5 h-5 sm:w-6 sm:h-6" />, text: "Analyzing your confidence patterns" },
    { icon: <FiPieChart className="w-5 h-5 sm:w-6 sm:h-6" />, text: "Comparing to archetype benchmarks" },
    { icon: <FiTrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />, text: "Identifying growth opportunities" },
    { icon: <FiUser className="w-5 h-5 sm:w-6 sm:h-6" />, text: "Personalizing your results" },
    { icon: <FiAward className="w-5 h-5 sm:w-6 sm:h-6" />, text: "Finalizing your confidence archetype" }
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length ? prev + 1 : prev));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const percent = Math.min((activeStep / steps.length) * 100, 100);
  const allDone = activeStep >= steps.length;

  const submitResults = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/submit-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName,
          userEmail,
          archetype,
          archetypeScores: tally || {},
          totalQuestions,
          selectedArchetype: archetype,
          viewedArchetypes: viewedArchetypes || []
        })
      });
      const result = await response.json();
      return result.success ? result.insertedId : null;
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShowClick = async () => {
    if (!allDone || isSubmitting) return;
    const newUserId = await submitResults();
    if (newUserId) {
      onShowResults(newUserId);
    }
  };

  return (
    <motion.div
      className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden mx-auto mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* HEADER */}
      <div className="relative p-4 sm:p-6 md:p-8 bg-gray-50">
        <motion.div
          className="absolute top-3 right-3 text-gray-400"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          title="What’s happening?"
        >
          <FiEyeOff className="w-5 h-5 sm:w-6 sm:h-6 text-[#022f6b]" />
        </motion.div>

        <div className="text-center">
          <motion.h2
            className={`${
              allDone ? "text-[#022f6b]" : "text-gray-800"
            } text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {allDone
              ? `Your results are ready${userName ? `, ${userName}` : ""}!`
              : `Processing ${userName || "your"} results`}
          </motion.h2>

          {!allDone && (
            <motion.div
              className="mx-auto mb-3 h-10 w-10 sm:h-12 sm:w-12 border-4 border-t-[#022f6b] border-gray-200 rounded-full animate-spin"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
          )}

          <motion.p
            className={`${
              allDone ? "text-[#022f6b]" : "text-gray-600"
            } text-sm sm:text-base max-w-xs sm:max-w-sm md:max-w-md mx-auto`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {allDone
              ? "Tap the button below to view your personalized insights."
              : "We're carefully analyzing your responses to determine your unique Confidence Archetype."}
          </motion.p>
        </div>
      </div>

      {/* BODY */}
      <div className="p-4 sm:p-6 md:p-8">
        <AnimatePresence mode="wait">
          {!allDone ? (
            <motion.div
              key={activeStep}
              className="flex items-center justify-center p-4 sm:p-6 rounded-xl bg-[#022f6b]/10 border border-[#022f6b]/20 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#022f6b]/20 text-[#022f6b] flex items-center justify-center">
                  {steps[activeStep]?.icon}
                </div>
                <p className="text-sm sm:text-base font-medium text-[#022f6b]">
                  {steps[activeStep]?.text}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="complete"
              className="flex flex-col items-center p-4 sm:p-6 md:p-8 bg-[#022f6b]/10 border border-[#022f6b]/20 rounded-2xl shadow-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FiCheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-[#022f6b] mb-2 sm:mb-3" />
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#022f6b] mb-2">
                Results Ready
              </h3>
              <button
                onClick={handleShowClick}
                disabled={!allDone || isSubmitting}
                className={`w-full sm:w-auto mt-2 px-4 sm:px-6 py-2 sm:py-2.5 ${
                  isSubmitting
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-[#022f6b] hover:bg-[#c2a070] text-white"
                } rounded-lg sm:rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#022f6b]/50 transition text-sm sm:text-base`}
              >
                {isSubmitting ? "Loading..." : "Show My Results"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom progress bar & percentage */}
        <motion.div
          className="mt-6 sm:mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between mb-1 sm:mb-2">
            <span className="text-xs sm:text-sm text-gray-500">
              {allDone ? "Completed" : "Processing"}
            </span>
            <span className="text-xs sm:text-sm font-medium text-[#022f6b]">
              {Math.round(percent)}%
            </span>
          </div>

          <div className="h-2 sm:h-3 rounded-full overflow-hidden bg-gray-200">
            <motion.div
              className="h-full bg-gradient-to-r from-[#022f6b] to-[#c2a070]"
              initial={{ width: "0%" }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>

          <motion.p
            className={`mt-3 sm:mt-4 text-center text-xs sm:text-sm ${
              allDone ? "text-[#022f6b]" : "text-gray-500"
            } italic flex items-center justify-center`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <FiLock className="mr-1 w-4 h-4 sm:w-5 sm:h-5 text-[#022f6b]" />
            {allDone
              ? "Your data is processed privately and securely"
              : "Your personalized confidence archetype is almost ready..."}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}

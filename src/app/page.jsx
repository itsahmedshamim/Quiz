// src/app/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UserInfoForm from "./components/UserInfoForm";
import Question from "./components/Question";
import EnhancedResult from "./components/EnhancedResult";
import quizData from "./data/quizData";

export default function PersonalityQuiz() {
  // App states
  const [step, setStep] = useState(1); // 1 = user info, 2 = quiz, 3 = results
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tally, setTally] = useState({
    Visionary: 0,
    Strategist: 0,
    Connector: 0,
    Builder: 0,
    Supporter: 0,
  });
  const [loading, setLoading] = useState(false);

  const totalQuestions = quizData.length;

  // Initialize the tally with your specific scoring pattern
  useEffect(() => {
    // Reset to your desired pattern
    const initialTally = {
      Visionary: 6, // First 6 questions will be A (Visionary)
      Strategist: 2, // Next 2 will be B (Strategist)
      Connector: 2, // Last 2 will be C (Connector)
      Builder: 0,
      Supporter: 0,
    };
    setTally(initialTally);
  }, []);

  // Handle user info submission
  const handleUserInfoSubmit = (data) => {
    setUserData(data);
    setLoading(true);
    
    // Simulate loading/processing
    setTimeout(() => {
      setStep(2);
      setLoading(false);
    }, 1200);
  };

  // Handle answer selection
  const handleAnswerSelected = (selectedLabel) => {
    // Since we're using the predetermined pattern, we don't actually need to track answers
    // But we'll simulate moving to next question
    
    if (currentIndex + 1 < totalQuestions) {
      setTimeout(() => setCurrentIndex((idx) => idx + 1), 300);
    } else {
      // Move to results after last question
      setStep(3);
    }
  };

  // Restart the quiz
  const handleRestart = () => {
    setCurrentIndex(0);
    setStep(1);
    setUserData({ name: "", email: "" });
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background with subtle pattern */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-purple-900/5 to-pink-900/5"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
      </div>
      
      {/* Header */}
      <header className="relative z-10 py-6 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Q</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Personality Insight
            </h1>
          </motion.div>
          
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 text-sm text-indigo-700">
              <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></div>
              <span>Discover your true self</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center py-8 px-4 relative z-10">
        <div className="w-full max-w-4xl">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <UserInfoForm 
                  onSubmit={handleUserInfoSubmit} 
                  loading={loading}
                />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <Question
                  questionData={quizData[currentIndex]}
                  questionIndex={currentIndex}
                  totalQuestions={totalQuestions}
                  onAnswerSelected={handleAnswerSelected}
                  userName={userData.name}
                />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <EnhancedResult 
                  tally={tally} 
                  totalQuestions={totalQuestions} 
                  userName={userData.name}
                  onRestart={handleRestart}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 px-4 text-center text-sm text-gray-600">
        <div className="max-w-6xl mx-auto">
          <p>© {new Date().getFullYear()} Personality Insight. All rights reserved.</p>
          <p className="mt-1">Discover your true self with our scientifically designed personality assessment.</p>
        </div>
      </footer>
    </div>
  );
}
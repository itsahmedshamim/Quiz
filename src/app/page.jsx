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
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-white">
      {/* Premium background with subtle gradient */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-indigo-50/70 to-purple-50/70"></div>
        <div className="absolute inset-0 bg-[url('/subtle-pattern.svg')] bg-center opacity-[3%]"></div>
      </div>
      
      {/* Floating decorative elements */}
      <div className="fixed top-20 right-20 w-40 h-40 rounded-full bg-indigo-100/30 backdrop-blur-sm -z-10"></div>
      <div className="fixed bottom-10 left-10 w-32 h-32 rounded-full bg-purple-100/30 backdrop-blur-sm -z-10"></div>
      
      {/* Premium header with animation */}
      <header className="relative z-10 py-5 px-4 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
              Personality<span className="text-indigo-600">Insight</span>
            </h1>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="hidden md:flex items-center gap-2 text-sm text-indigo-600 font-medium">
              <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></div>
              <span>Discover your true self</span>
            </div>
          </motion.div>
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
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
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
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

      {/* Premium footer */}
      <footer className="relative z-10 py-6 px-4 text-center text-sm text-gray-500 bg-white/80 backdrop-blur-sm border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">Q</span>
              </div>
              <p className="font-medium">Personality<span className="text-indigo-600">Insight</span></p>
            </div>
            
            <p className="text-gray-500">© {new Date().getFullYear()} All rights reserved</p>
            
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">
                Contact
              </a>
            </div>
          </div>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Discover your true self with our scientifically designed personality assessment.
          </p>
        </div>
      </footer>
    </div>
  );
}
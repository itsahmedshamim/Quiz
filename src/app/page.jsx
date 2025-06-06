// File: /src/app/page.jsx

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ReadyModal from "./components/ReadyModal";
import UserInfoForm from "./components/UserInfoForm";
import QuizIntro from "./components/QuizIntro";
import ScoringExplanation from "./components/ScoringExplanation";
import Question from "./components/Question";
import Result from "./components/Result";
import LoadingResults from "./components/LoadingResults";

import quizData from "./data/quizData";

// Define step constants
const STEPS = {
  USER_INFO: 1,
  QUIZ_INTRO: 2,
  SCORING_EXPLANATION: 3,
  QUIZ: 4,
  LOADING: 5,
  RESULTS: 6,
};

export default function PersonalityQuiz() {
  // ─── App State ─────────────────────────────────────────────────────────
  const [step, setStep] = useState(STEPS.USER_INFO);
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tally, setTally] = useState({
    Perfectionist: 0,
    "Quiet Achiever": 0,
    "People-Pleaser": 0,
    "Hidden Leader": 0,
    "Bold Believer": 0,
  });
  const [loading, setLoading] = useState(false);
  const [showReadyModal, setShowReadyModal] = useState(false);
  const [archetype, setArchetype] = useState(null);
  const [isProcessingResults, setIsProcessingResults] = useState(false);

  // Add new state variable for MongoDB ID (full 24 chars)
  const [mongoId, setMongoId] = useState(null);

  const totalQuestions = quizData.length;

  // ─── Effects ───────────────────────────────────────────────────────────
  // Scroll to top whenever `step` changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [step]);

  // ─── Handlers for the Quiz Flow ────────────────────────────────────────
  const handleUserInfoSubmit = (data) => {
    setUserData(data);
    setLoading(true);
    setTimeout(() => {
      setStep(STEPS.QUIZ_INTRO);
      setLoading(false);
    }, 1200);
  };

  const startQuiz = () => {
    setShowReadyModal(false);
    setStep(STEPS.QUIZ);
  };

  const calculateArchetype = (tallyObj) => {
    let maxScore = 0;
    let dominant = null;
    Object.entries(tallyObj).forEach(([type, score]) => {
      if (score > maxScore) {
        maxScore = score;
        dominant = type;
      }
    });
    return dominant;
  };

  const handleAnswerSelected = (option) => {
    const updatedTally = {
      ...tally,
      [option.type]: tally[option.type] + 1,
    };
    setTally(updatedTally);

    if (currentIndex + 1 < totalQuestions) {
      setTimeout(() => setCurrentIndex((idx) => idx + 1), 300);
    } else {
      // Quiz done → compute archetype
      const dominant = calculateArchetype(updatedTally);
      setArchetype(dominant);

      // Show loading screen
      setIsProcessingResults(true);
      setStep(STEPS.LOADING);

      // Save to localStorage (optional; the actual POST happens inside LoadingResults)
      const resultData = {
        name: userData.name,
        email: userData.email,
        archetype: dominant,
        date: new Date().toISOString(),
        tally: updatedTally,
      };
      localStorage.setItem(
        `result_${userData.email}`,
        JSON.stringify(resultData)
      );
    }
  };

  // Called by <LoadingResults /> when the POST succeeds—returns the new ObjectId
  const showResults = (insertedId) => {
    setMongoId(insertedId);
    setIsProcessingResults(false);
    setStep(STEPS.RESULTS);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setTally({
      Perfectionist: 0,
      "Quiet Achiever": 0,
      "People-Pleaser": 0,
      "Hidden Leader": 0,
      "Bold Believer": 0,
    });
    setArchetype(null);
    setStep(STEPS.USER_INFO);
    setUserData({ name: "", email: "" });
    setShowReadyModal(false);
    setIsProcessingResults(false);
    setMongoId(null);
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background image + overlay */}
      <div className="fixed inset-0">
        <div
          className="absolute inset-0 bg-[url('/assets/bg.webp')] bg-cover bg-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      </div>

      <Header />

      <main className="relative z-10 flex-grow flex items-center justify-center py-8 px-0 m-5 mt-10">
        <div className="w-full max-w-4xl">
          <AnimatePresence mode="wait">
            {/* Step 1: UserInfoForm */}
            {step === STEPS.USER_INFO && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <UserInfoForm onSubmit={handleUserInfoSubmit} loading={loading} />
              </motion.div>
            )}

            {/* Step 2: QuizIntro */}
            {step === STEPS.QUIZ_INTRO && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <QuizIntro
                  onNext={() => setStep(STEPS.SCORING_EXPLANATION)}
                  userName={userData.name}
                />
              </motion.div>
            )}

            {/* Step 3: ScoringExplanation */}
            {step === STEPS.SCORING_EXPLANATION && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <ScoringExplanation onNext={() => setShowReadyModal(true)} />
              </motion.div>
            )}

            {/* Step 4: Quiz Questions */}
            {step === STEPS.QUIZ && (
              <motion.div
                key="step4"
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

            {/* Step 5: LoadingResults (POST to store & return new ID) */}
            {step === STEPS.LOADING && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <LoadingResults
                  userName={userData.name}
                  userEmail={userData.email}
                  archetype={archetype}
                  tally={tally}
                  totalQuestions={totalQuestions}
                  onShowResults={showResults}
                />
              </motion.div>
            )}

            {/* Step 6: Show Result */}
            {step === STEPS.RESULTS && archetype && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
                className="w-full"
              >
                <Result
                  archetype={archetype}
                  totalQuestions={totalQuestions}
                  userName={userData.name}
                  userId={mongoId} // Pass the full 24-char ObjectId
                  onRestart={handleRestart}
                  tally={tally}
                  shouldSubmit={true}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />

      <ReadyModal
        isOpen={showReadyModal}
        onClose={() => setShowReadyModal(false)}
        onStartQuiz={startQuiz}
      />
    </div>
  );
}

// File: /src/app/page.jsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head"; // Added for SEO

import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchModal from "./components/SearchModal";
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

  // Track whether we came from “search”
  const [isFromSearch, setIsFromSearch] = useState(false);

  // ─── Search-Related State ─────────────────────────────────────────────
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchId, setSearchId] = useState("");                // ← last‐8‐chars state
  const [searchResults, setSearchResults] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

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

  // Whenever the modal closes, we clear the input + previous results in the modal.
  const clearSearchResults = useCallback(() => {
    setSearchResults(null);
    setSearchError("");
  }, []);

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
    setIsFromSearch(false);
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
    setIsFromSearch(false);
    setMongoId(null);

    // Also clear any search-related state
    setSearchId("");
    clearSearchResults();
  };

  // ─── Search by last‐8‐chars ID ──────────────────────────────────────────
  // Helper that calls /api/get-result-by-id?idLast8=<searchId>
  const fetchResultByIdLast8 = async (idLast8) => {
    const response = await fetch(
      `/api/get-result-by-id?idLast8=${encodeURIComponent(idLast8)}`
    );
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const payload = await response.json();
    return payload.result || null;
  };

  // Called when user submits the “last 8 characters” in the modal
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setSearchLoading(true);
    setSearchError("");
    setSearchResults(null);

    // Basic validation: must be exactly 8 hex digits (0–9, a–f)
    if (!/^[0-9a-fA-F]{8}$/.test(searchId)) {
      setSearchError("Please enter exactly 8 hexadecimal characters.");
      setSearchLoading(false);
      return;
    }

    try {
      const result = await fetchResultByIdLast8(searchId);
      if (result === null) {
        setSearchError("No results found for that ID segment. Please try again.");
      } else {
        setSearchResults(result);
      }
    } catch (err) {
      console.error("Search error:", err);
      setSearchError("Something went wrong. Please try again.");
    } finally {
      setSearchLoading(false);
    }
  };

  // When user clicks “View Results” in the modal
  const loadResult = (result) => {
    setUserData({ name: result.userName, email: result.userEmail });
    setArchetype(result.archetype);
    setTally(result.archetypeScores || {});
    setMongoId(result._id); // Full 24-char ObjectId from the found document
    setIsFromSearch(true);
    setStep(STEPS.RESULTS);
    setIsSearchOpen(false);
  };

  return (
    <>
      {/* SEO Metadata */}
      <Head>
        <title>Confidence Archetype Quiz | Discover Your Inner Strength</title>
        <meta 
          name="description" 
          content="Uncover your unique confidence archetype and learn how to harness your strengths with our free quiz." 
        />
        
        {/* Open Graph */}
        <meta property="og:title" content="Confidence Archetype Quiz | Discover Your Inner Strength" />
        <meta 
          property="og:description" 
          content="Take the free quiz to discover your confidence archetype and unlock personalized insights to boost your self-confidence." 
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta 
          property="og:image" 
          content="https://yourdomain.com/assets/og-image.jpg" 
        />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Discover Your Confidence Archetype" />
        <meta 
          name="twitter:description" 
          content="Free quiz reveals your unique confidence style and how to leverage it for success." 
        />
        <meta 
          name="twitter:image" 
          content="https://yourdomain.com/assets/twitter-card.jpg" 
        />
      </Head>
      
      <div className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Background image + overlay */}
        <div className="fixed inset-0 ">
          <div
            className="absolute inset-0 bg-[url('/assets/bg.jpg')] bg-cover bg-center"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
        </div>

        <Header onSearchClick={() => setIsSearchOpen(true)} />

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
                    userId={mongoId}       // Pass the full 24-char ObjectId
                    onRestart={handleRestart}
                    tally={tally}
                    shouldSubmit={!isFromSearch} 
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        <Footer />

        {/* ─── SearchModal (now by last 8 chars of ID) ─────────────────────── */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          searchId={searchId}                 // ← last‐8 ID
          setSearchId={setSearchId}           // ← setter
          handleSearch={handleSearch}         // ← calls /api/get-result-by-id
          searchResults={searchResults}
          searchLoading={searchLoading}
          searchError={searchError}
          loadResult={loadResult}
          clearSearchResults={clearSearchResults}
          onRestartQuiz={() => {
            setIsSearchOpen(false);
            setStep(STEPS.USER_INFO);
          }}
        />

        <ReadyModal
          isOpen={showReadyModal}
          onClose={() => setShowReadyModal(false)}
          onStartQuiz={startQuiz}
        />
      </div>
    </>
  );
}
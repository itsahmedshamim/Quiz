// File: /components/SearchModal.jsx
"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiSearch, FiUser, FiArrowRight, FiRefreshCw } from "react-icons/fi";

export default function SearchModal({
  isOpen,
  onClose,
  searchId,            // ← last-8-chars input
  setSearchId,         // ← setter for that last-8-chars
  handleSearch,        // ← calls /api/get-result-by-id?idLast8=<searchId>
  searchResults,
  searchLoading,
  searchError,
  loadResult,
  clearSearchResults,  // ← clears searchResults
  onRestartQuiz,
}) {
  // When modal closes, clear the input & any previous results
  useEffect(() => {
    if (!isOpen) {
      setSearchId("");
      clearSearchResults();
    }
  }, [isOpen, setSearchId, clearSearchResults]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Find Your Results</h3>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-black/10 transition-colors"
                  title="Close"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>
              <p className="mt-2 text-indigo-100 opacity-90 text-sm">
                Enter the <strong>last 8 characters</strong> of the ID you received
                after submitting the quiz.
              </p>
            </div>

            {/* Search Form */}
            <div className="p-5 border-b border-gray-100">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch(e);
                }}
                className="mb-1"
              >
                <div className="relative">
                  {/* Search icon on the left */}
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="search-id-input"
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value.trim())}
                    placeholder="e.g. a1b2c3d4"
                    maxLength={8}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                  />
                  <button
                    type="submit"
                    className="absolute inset-y-0 right-0 px-4 bg-indigo-600 text-white rounded-r-xl hover:bg-indigo-700 transition-colors flex items-center"
                    disabled={searchLoading}
                  >
                    {searchLoading ? (
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <span>Verify</span>
                    )}
                  </button>
                </div>
              </form>

              {searchError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 p-3 bg-red-50 text-red-700 rounded-lg border border-red-100"
                >
                  <p>{searchError}</p>
                </motion.div>
              )}
            </div>

            {/* Results Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {searchResults ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                >
                  {/* Card Header */}
                  <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                    <h4 className="font-bold text-gray-800">Result Found</h4>
                    <span className="text-sm text-gray-500">
                      {new Date(searchResults.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-4">
                    {/* We removed the “Full ID” line per request */}

                    {/* 1) Show userName & userEmail */}
                    <div className="flex items-center gap-4">
                      <div className="bg-indigo-100 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FiUser className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {searchResults.userName}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {searchResults.userEmail}
                        </p>
                      </div>
                    </div>

                    {/* 2) Show their Archetype */}
                    <div className="flex justify-between items-center bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3">
                      <span className="text-gray-700 font-medium">
                        Your Archetype:
                      </span>
                      <span className="font-bold text-indigo-700">
                        {searchResults.archetype}
                      </span>
                    </div>

                    {/* 3) Action buttons: View Results or Clear */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => loadResult(searchResults)}
                        className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md flex items-center justify-center"
                      >
                        View Results
                        <FiArrowRight className="h-4 w-4 ml-2" />
                      </button>
                      <button
                        onClick={clearSearchResults}
                        className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        title="Clear search"
                      >
                        <FiRefreshCw className="h-5 w-5 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : searchLoading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-8"
                >
                  <svg
                    className="animate-spin h-10 w-10 text-indigo-600 mb-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <p className="text-gray-600">Verifying your ID…</p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 text-center"
                >
                  <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center mb-5">
                    <FiSearch className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h4 className="font-bold text-gray-800 text-lg mb-2">
                    Find Your Previous Results
                  </h4>
                  <p className="text-gray-600 max-w-xs mx-auto text-sm">
                    Enter the <strong>last 8 characters</strong> of the ID you
                    received when you took the quiz.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-t border-gray-200">
              <p className="text-sm text-gray-700 text-center">
                Can't find your results?{" "}
                <button
                  onClick={() => {
                    onRestartQuiz();
                    onClose();
                  }}
                  className="text-indigo-700 font-semibold hover:underline"
                >
                  Take the quiz again
                </button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

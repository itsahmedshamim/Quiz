// src/app/components/results/CongratsBanner.jsx
import React from "react";
import { motion } from "framer-motion";
import archetypeData from "../../data/archetypeData"; // adjust to your real path

export default function CongratsBanner({
  userName,
  selectedArchetype,
  colorClass,
  percentage
}) {
  const hasMatch = percentage > 0;
  const imagePath =
    archetypeData[selectedArchetype]?.image || "/assets/images/default-trophy.png";

  return (
    <motion.div
      className="text-center mb-10 rounded-3xl shadow-2xl relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
    >
      {/* ─── Background layers ─── */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-10 w-72 h-72 rounded-full bg-white bg-opacity-10"></div>
        <div className="absolute bottom-10 -right-10 w-80 h-80 rounded-full bg-white bg-opacity-10"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-white bg-opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
            }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 1.5 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* ─── Main content ─── */}
      <div className={`relative z-10 py-12 px-6 bg-gradient-to-br ${colorClass.gradient}`}>
        <div className="max-w-3xl mx-auto">
          {hasMatch ? (
            <>
              {/* Enhanced Archetype Image - Square with Rounded Corners */}
              <motion.div
                className="relative mx-auto mb-8 w-40 h-40 md:w-52 md:h-52"
                initial={{ rotate: -15, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent mix-blend-overlay"></div>
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-white/30 blur-lg animate-pulse-slow"></div>
                
                {/* Image container */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                  {/* Golden frame */}
                  <div className="absolute inset-0 rounded-xl border-[3px] border-amber-300/70 shadow-[inset_0_0_20px_rgba(255,215,0,0.8)]"></div>
                  
                  {/* Image with optimized loading */}
                  <img
                    src={imagePath}
                    alt={selectedArchetype}
                    className="w-full h-full object-contain p-4 bg-white/5"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </motion.div>

              {/* Congratulations Text */}
              <motion.h1
                className="text-2xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Congratulations, <span className="text-amber-300">{userName}</span>!
              </motion.h1>

              <motion.h2
                className="text-xl md:text-2xl font-medium mb-6 text-white/90"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Your Confidence Archetype is Revealed
              </motion.h2>

              <motion.div
                className="inline-block px-8 py-4 rounded-2xl mb-6 bg-white/20 backdrop-blur-md shadow-lg border border-white/30"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
              >
                <h3 className="font-bold text-2xl md:text-3xl text-white">
                  {selectedArchetype}
                </h3>
                <p className="text-white/80 text-lg mt-1">{percentage}% match</p>
              </motion.div>

              <motion.div
                className="max-w-2xl mx-auto mt-6 p-5 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-lg md:text-xl font-medium text-white/90 italic">
                  "{archetypeData[selectedArchetype].title}"
                </p>
              </motion.div>
            </>
          ) : (
            <>
              {/* Fallback: Invitation to Book */}
              <motion.h1
                className="text-2xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Hey, <span className="text-amber-300">{userName}</span>!
              </motion.h1>

              <motion.h2
                className="text-xl md:text-2xl font-medium mb-6 text-white/90"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Let’s unlock your Confidence Archetype together.
              </motion.h2>

              <motion.div
                className="max-w-2xl mx-auto mt-6 p-5 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
              >
                <p className="text-white/80 text-lg md:text-xl">
                  Based on your test-based results, we recommend scheduling a consultation to discover your true Confidence Archetype. 
                  <br />
                  <span className="block mt-2 font-semibold">
                    Book your session now to take the next step!
                  </span>
                </p>
              </motion.div>
            </>
          )}
        </div>
      </div>

      {/* ─── Bottom gradient border ─── */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400"></div>

      {/* ─── Corner accents ─── */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-300"></div>
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-300"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-amber-300"></div>
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-300"></div>
    </motion.div>
  );
}
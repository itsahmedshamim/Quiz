// src/app/components/ProfileCard.jsx
import { motion } from 'framer-motion';
import { FiCheck, FiLinkedin, FiGlobe } from 'react-icons/fi';

export default function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="relative mt-8 p-6 md:p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl max-w-lg md:max-w-xl mx-auto border border-gray-100 overflow-hidden"
    >
      {/* Top decorative bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#022f6b] to-[#c2a070]"></div>
      <div className="absolute -top-4 -right-4 w-24 h-24 md:w-28 md:h-28 bg-[#022f6b]/10 rounded-full opacity-30"></div>
      
      {/* Content */}
      <div className="flex flex-col items-center gap-6 md:gap-8 relative z-10">
        {/* Profile image */}
        <div className="relative flex-shrink-0">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
            className="relative"
          >
            <img
              src="/assets/images/alex-dumas.jpg"
              alt="Alex Dumas"
              className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover border-4 md:border-6 border-white shadow-lg"
            />
            {/* Verified badge */}
            <div className="absolute -bottom-2 -right-2 bg-[#022f6b] rounded-full p-1 md:p-2 shadow-md">
              <FiCheck className="w-4 h-4 md:w-6 md:h-6 text-white" />
            </div>
          </motion.div>
        </div>

        {/* Profile details */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <h4 className="font-bold text-2xl md:text-3xl bg-gradient-to-r from-[#022f6b] to-[#c2a070] bg-clip-text text-transparent tracking-tight">
              Alex Dumas
            </h4>
            <p className="text-sm md:text-base font-medium text-gray-700 mt-1 md:mt-2 mb-2 md:mb-3">
              Keynote Speaker • Bestselling Author • Global Movement Leader
            </p>
            <p className="text-gray-600 italic font-light text-sm md:text-base max-w-md md:max-w-lg mx-auto">
              "Empowering unstoppable leaders of color to create a global impact that uplifts communities and inspires generations!"
            </p>

            {/* Action buttons (solid colors, no gradient) */}
            <motion.div
              className="flex flex-col gap-3 md:gap-4 mt-4 md:mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <a
                href="https://www.linkedin.com/in/alexdumas"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-[#022f6b] hover:bg-[#021e4f] text-white rounded-lg transition-shadow duration-300 shadow hover:shadow-md"
              >
                <FiLinkedin className="w-4 h-4 md:w-6 md:h-6" />
                <span className="text-sm md:text-base font-medium">Connect on LinkedIn</span>
              </a>
              <a
                href="https://www.speakeralexdumas.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-[#c2a070] hover:bg-[#b3925b] text-[#022f6b] rounded-lg transition-shadow duration-300 shadow hover:shadow-md"
              >
                <FiGlobe className="w-4 h-4 md:w-6 md:h-6" />
                <span className="text-sm md:text-base font-medium">Visit My Website</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Premium features */}
      <motion.div
        className="flex flex-wrap justify-center gap-3 md:gap-4 mt-6 md:mt-8 pt-5 md:pt-6 border-t border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="flex items-center bg-[#022f6b]/10 px-3 py-1.5 md:px-4 md:py-2 rounded-lg">
          <FiCheck className="w-4 h-4 md:w-6 md:h-6 text-[#022f6b] mr-1.5 md:mr-2 flex-shrink-0" />
          <span className="text-xs md:text-sm text-gray-700 font-medium">100% Confidential</span>
        </div>
        <div className="flex items-center bg-[#022f6b]/10 px-3 py-1.5 md:px-4 md:py-2 rounded-lg">
          <FiCheck className="w-4 h-4 md:w-6 md:h-6 text-[#022f6b] mr-1.5 md:mr-2 flex-shrink-0" />
          <span className="text-xs md:text-sm text-gray-700 font-medium">Based in Clayton, NC</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

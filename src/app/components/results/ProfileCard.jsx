// src/app/components/ProfileCard.jsx
import { motion } from 'framer-motion';
import { FiCheck, FiLinkedin } from 'react-icons/fi';

export default function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="relative mt-8 p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl max-w-lg mx-auto border border-gray-100 overflow-hidden"
    >
      {/* Premium decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-indigo-100 rounded-full opacity-30"></div>
      
      <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
        {/* Profile image with premium styling */}
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
              className="w-20 h-20 rounded-xl object-cover border-4 border-white shadow-lg"
            />
            {/* Verified badge */}
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full p-1 shadow-md">
              <FiCheck className="w-4 h-4 text-white" />
            </div>
          </motion.div>
        </div>

        {/* Profile details */}
        <div className="text-center md:text-left">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <h4 className="font-bold text-2xl text-gray-900 tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Alex Dumas
            </h4>
            <p className="text-sm font-medium text-gray-700 mt-1 mb-2">
              Keynote Speaker • Bestselling Author • Global Movement Leader
            </p>
            <p className="text-gray-600 italic font-light text-sm max-w-md">
              "Helping leaders speak up, stand out & amplify their impact"
            </p>

            {/* LinkedIn button with premium styling */}
            <motion.div 
              className="flex justify-center md:justify-start mt-4"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <a
                href="https://www.linkedin.com/in/alexdumas"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-lg transition-all duration-300 shadow hover:shadow-md"
              >
                <FiLinkedin className="w-4 h-4" />
                <span className="text-sm font-medium">Connect on LinkedIn</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Premium features section */}
      <motion.div 
        className="flex flex-wrap justify-center gap-3 mt-6 pt-5 border-t border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        <div className="flex items-center bg-indigo-50 px-3 py-1.5 rounded-lg">
          <FiCheck className="w-4 h-4 text-indigo-600 mr-1.5 flex-shrink-0" />
          <span className="text-xs text-gray-700 font-medium">100% Confidential</span>
        </div>
        <div className="flex items-center bg-indigo-50 px-3 py-1.5 rounded-lg">
          <FiCheck className="w-4 h-4 text-indigo-600 mr-1.5 flex-shrink-0" />
          <span className="text-xs text-gray-700 font-medium">Based in Clayton, NC</span>
        </div>
       
      </motion.div>
    </motion.div>
  );
}
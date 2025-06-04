// src/app/components/ArchetypeDetails.jsx
import { motion } from 'framer-motion';
import { FiChevronRight, FiArrowRight } from 'react-icons/fi';
import ProfileCard from './ProfileCard';

export default function ArchetypeDetails({ 
  selectedArchetype, 
  archetype, 
  colorClass, 
  data,
  archetypeIcons
}) {
  const icon = archetypeIcons[selectedArchetype] || <FiAward />;
  
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8 md:mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <div className="p-4 sm:p-6 text-center">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
          {selectedArchetype === archetype
            ? `Understanding Your ${archetype} Archetype`
            : `Exploring the ${selectedArchetype} Archetype`}
        </h1>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          {selectedArchetype === archetype
            ? 'Discover how to leverage your strengths and overcome your unique challenges'
            : 'Learn about this confidence archetype and how it manifests'}
        </p>
      </div>

      <div className={`p-4 sm:p-6 bg-gradient-to-r ${colorClass.gradient} text-white`}>
        <div className="flex flex-col sm:flex-row items-center justify-center">
          <div className="text-2xl md:text-3xl mb-2 sm:mb-0 sm:mr-4">
            {icon}
          </div>
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-center sm:text-left">
            {selectedArchetype === archetype
              ? `Your Primary Archetype: ${selectedArchetype}`
              : `Exploring: ${selectedArchetype}`}
          </h3>
        </div>
      </div>

      <div className="p-4 sm:p-6 md:p-8">
        <div className="mb-8 md:mb-10">
          <h4 className="font-bold text-gray-700 mb-4 md:mb-6 text-lg md:text-xl flex items-center">
            <FiChevronRight className="mr-2 text-indigo-500" />
            Key Characteristics:
          </h4>
          <ul className="space-y-3 md:space-y-4">
            {data.details.map((detail, index) => (
              <motion.li
                key={index}
                className="flex items-start bg-gray-50 p-3 md:p-4 rounded-xl border border-gray-100"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
              >
                <span
                  className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-white mr-3 mt-1 flex-shrink-0 bg-gradient-to-r ${colorClass.gradient}`}
                >
                  {index + 1}
                </span>
                <span className="text-gray-700 text-sm md:text-base">{detail}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="text-center mt-8 md:mt-12"
        >
          <div className="mb-4 md:mb-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">
              Ready to Transform Your Confidence?
            </h3>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto mb-4 md:mb-6">
              Schedule your private strategy session to unlock your full potential
            </p>
          </div>

          <a
            href={data.cta.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 mb-4"
          >
            <span className="text-sm md:text-base">Let's Talk</span>
            <FiArrowRight className="ml-2" />
          </a>

          <ProfileCard />
        </motion.div>
      </div>
    </motion.div>
  );
}
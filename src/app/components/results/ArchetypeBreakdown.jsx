// src/app/components/ArchetypeBreakdown.jsx
import { motion } from 'framer-motion';
import { FiBarChart2 } from 'react-icons/fi';

export default function ArchetypeBreakdown({
  archetype,
  archetypePercentages,
  archetypeIcons,
  selectedArchetype,
  handleArchetypeSelect,
  totalQuestions
}) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 pb-2 md:pb-3 border-b border-gray-200 flex items-center">
        <FiBarChart2 className="mr-2 text-blue-500" />
        Your Confidence Profile
      </h3>

      <div className="space-y-4 md:space-y-5">
        {archetypePercentages.map((item, index) => {
          const isDominant = item.type === archetype;
          const isSelected = item.type === selectedArchetype;

          return (
            <motion.div
              key={item.type}
              onClick={() => handleArchetypeSelect(item.type)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              className={`relative p-3 rounded-xl transition-all duration-300 ${
                isSelected
                  ? `ring-2 ${item.color.border.replace('border', 'ring')} bg-opacity-10 ${item.color.bg}`
                  : isDominant 
                    ? `ring-2 ring-indigo-300/80 bg-indigo-50/60 hover:ring-indigo-400`
                    : 'hover:bg-gray-50 cursor-pointer'
              } ${isDominant ? 'border-l-4 border-indigo-500' : ''}`}
            >
              <div className="flex flex-wrap items-center justify-between mb-1 md:mb-2">
                <div className="flex items-center mb-1">
                  <span className={`text-base md:text-lg mr-2 md:mr-3 ${isDominant ? 'scale-110' : ''}`}>
                    {archetypeIcons[item.type]}
                  </span>
                  <span
                    className={`text-sm md:text-base font-medium ${
                      isDominant ? 'font-bold text-indigo-700' : item.color.text
                    }`}
                  >
                    {item.type}
                    {isDominant && (
                      <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                        Primary
                      </span>
                    )}
                  </span>
                </div>
                <span
                  className={`text-sm md:text-base font-medium ${
                    isDominant ? 'font-bold text-indigo-700' : item.color.text
                  }`}
                >
                  {item.percentage}%
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 md:h-2.5">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${item.color.gradient} ${isDominant ? 'shadow-md' : ''}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.8 + index * 0.1,
                    type: "spring",
                    stiffness: 50
                  }}
                />
              </div>

              <div className="text-right text-xs text-gray-500 mt-1">
                {item.score} of {totalQuestions} responses
              </div>
              
              {isDominant && (
                <motion.div 
                  className="absolute top-0 right-0 -mt-1 -mr-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <span className="flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                  </span>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
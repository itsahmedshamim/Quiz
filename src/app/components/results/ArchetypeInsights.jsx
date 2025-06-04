// src/app/components/ArchetypeInsights.jsx
import { motion } from 'framer-motion';
import { FiChevronRight, FiInfo } from 'react-icons/fi';

export default function ArchetypeInsights({ 
  selectedArchetype, 
  archetype, 
  colorClass, 
  data 
}) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 pb-2 md:pb-3 border-b border-gray-200 flex items-center">
        <FiInfo className="mr-2 text-indigo-500" />
        Key Insights for {selectedArchetype}
        {selectedArchetype === archetype && (
          <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
            Primary Archetype
          </span>
        )}
      </h3>

      <div className="mb-6 md:mb-8">
       <div className={`${colorClass.bg} p-3 md:p-4 rounded-xl border ${colorClass.border}`}>
  <p className="text-gray-700 text-sm md:text-base text-left md:text-center">
    {data.description}
  </p>
</div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-red-50 rounded-xl p-3 md:p-4 border border-red-100">
          <h4 className="font-bold text-red-700 mb-2 flex items-center">
            <FiChevronRight className="mr-2 text-red-500" />
            Challenges
          </h4>
          <p className="text-gray-700 text-sm md:text-base">{data.challenges}</p>
        </div>

        <div className="bg-green-50 rounded-xl p-3 md:p-4 border border-green-100">
          <h4 className="font-bold text-green-700 mb-2 flex items-center">
            <FiChevronRight className="mr-2 text-green-500" />
            Opportunities
          </h4>
          <p className="text-gray-700 text-sm md:text-base">{data.opportunities}</p>
        </div>
      </div>
    </motion.div>
  );
}

import React from 'react';
import { Tool, Category } from '@/types';
import ToolCard from './ToolCard';
import { motion, AnimatePresence } from 'framer-motion';

interface ToolsGridProps {
  categories: Category[];
  isLoading: boolean;
}

const ToolsGrid = ({ categories, isLoading }: ToolsGridProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-medium text-gray-600">Aucun outil trouvé</h3>
        <p className="text-gray-500 mt-2">Essayez un autre terme de recherche</p>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="space-y-12">
        {categories.map((category) => (
          <motion.div 
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="border-b border-gray-200 pb-2">
              <h2 className="text-2xl font-bold text-gray-800">{category.name}</h2>
              <p className="text-gray-600">{category.description}</p>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {category.tools.map((tool, index) => (
                <ToolCard key={`${category.id}-${index}`} tool={tool} />
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
};

export default ToolsGrid;

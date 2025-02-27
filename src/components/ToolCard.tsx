
import React from 'react';
import { Tool } from '@/types';
import Tag from './Tag';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard = ({ tool }: ToolCardProps) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 card-hover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-primary">{tool.name}</h3>
        <a 
          href={tool.source} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 transition-colors"
          aria-label={`Visiter ${tool.name}`}
        >
          <ExternalLink size={20} />
        </a>
      </div>
      
      <p className="text-gray-700 mb-4 text-balance">{tool.description}</p>
      
      <div className="flex flex-wrap gap-2 mt-auto">
        {tool.keywords.map((keyword, index) => (
          <Tag key={`${tool.name}-keyword-${index}`} label={keyword} />
        ))}
      </div>
    </motion.div>
  );
};

export default ToolCard;

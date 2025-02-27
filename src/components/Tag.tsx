
import React from 'react';
import { cn } from '@/lib/utils';

interface TagProps {
  label: string;
  className?: string;
}

const Tag = ({ label, className }: TagProps) => {
  return (
    <span 
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-primary",
        "transition-all duration-300 hover:bg-primary/10",
        className
      )}
    >
      {label}
    </span>
  );
};

export default Tag;


import React from 'react';
import { Category } from '@/types';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, FolderOpen, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  categories: Category[];
  selectedCategory: number | null;
  onSelectCategory: (categoryId: number | null) => void;
  isMobile: boolean;
  isOpen: boolean;
  toggleSidebar: () => void;
  onRefresh: () => void;
  isLoading: boolean;
}

const Sidebar = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory,
  isMobile,
  isOpen,
  toggleSidebar,
  onRefresh,
  isLoading
}: SidebarProps) => {
  const handleCategoryClick = (categoryId: number) => {
    onSelectCategory(selectedCategory === categoryId ? null : categoryId);
    if (isMobile) {
      toggleSidebar();
    }
  };

  const handleAllCategoriesClick = () => {
    onSelectCategory(null);
    if (isMobile) {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Overlay - visible uniquement sur mobile quand le sidebar est ouvert */}
      {isMobile && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={toggleSidebar}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>
      )}

      {/* Bouton toggle pour mobile */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md text-primary"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isOpen ? (
            <ChevronUp className="h-6 w-6" />
          ) : (
            <ChevronDown className="h-6 w-6" />
          )}
        </button>
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <motion.aside
            initial={isMobile ? { x: -300 } : { x: 0 }}
            animate={{ x: 0 }}
            exit={isMobile ? { x: -300 } : undefined}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn(
              "bg-white border-r border-gray-200 p-6 overflow-y-auto",
              isMobile 
                ? "fixed top-0 left-0 h-full w-[280px] z-50 shadow-lg" 
                : "sticky top-0 h-screen w-64"
            )}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-primary">Catégories</h2>
              <button 
                onClick={onRefresh}
                disabled={isLoading}
                className={cn(
                  "p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors",
                  isLoading && "animate-spin text-primary"
                )}
                aria-label="Rafraîchir les données"
              >
                <RefreshCw size={18} />
              </button>
            </div>

            <div className="space-y-1">
              <button
                onClick={handleAllCategoriesClick}
                className={cn(
                  "flex items-center w-full px-3 py-2 rounded-md text-left transition-colors",
                  selectedCategory === null 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <FolderOpen size={18} className="mr-2 flex-shrink-0" />
                <span>Toutes les catégories</span>
              </button>

              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={cn(
                    "flex items-center justify-between w-full px-3 py-2 rounded-md text-left transition-colors",
                    selectedCategory === category.id 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <div className="flex items-center">
                    <FolderOpen size={18} className="mr-2 flex-shrink-0" />
                    <span>{category.name}</span>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {category.tools.length}
                  </span>
                </button>
              ))}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;

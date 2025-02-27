
import React, { useState, useEffect } from 'react';
import { useToolsData } from '@/hooks/useToolsData';
import Sidebar from '@/components/Sidebar';
import SearchBar from '@/components/SearchBar';
import ToolsGrid from '@/components/ToolsGrid';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const { 
    data, 
    isLoading, 
    filteredCategories, 
    refreshData 
  } = useToolsData({
    searchTerm,
    selectedCategory
  });

  // Fermer le sidebar sur desktop, l'ouvrir sur mobile au démarrage
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        categories={data?.categories || []}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        isMobile={isMobile}
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onRefresh={refreshData}
        isLoading={isLoading}
      />
      
      <main className="flex-1 p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Explorateur d'Outils Open Source
            </h1>
            <p className="text-gray-600 mb-6">
              Parcourez, recherchez et découvrez des outils open source pour vos projets
            </p>
            
            <div className="flex items-center space-x-4">
              <SearchBar 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
                className="flex-1"
              />
              
              <button
                onClick={refreshData}
                disabled={isLoading}
                className="p-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="Rafraîchir les données"
              >
                <RefreshCw size={20} className={isLoading ? "animate-spin text-primary" : "text-gray-500"} />
              </button>
            </div>
          </motion.div>
          
          <ToolsGrid 
            categories={filteredCategories} 
            isLoading={isLoading} 
          />
        </div>
      </main>
    </div>
  );
};

export default Index;

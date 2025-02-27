
import { useState, useEffect, useMemo } from 'react';
import { ToolsData, Category, Tool } from '@/types';
import { useToast } from '@/components/ui/use-toast';

interface UseToolsDataOptions {
  searchTerm?: string;
  selectedCategory?: number | null;
}

export const useToolsData = (options: UseToolsDataOptions = {}) => {
  const { searchTerm = '', selectedCategory = null } = options;
  const [data, setData] = useState<ToolsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/open_source_tools.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
        setError(errorMessage);
        toast({
          title: "Erreur de chargement",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/open_source_tools.json?_=' + new Date().getTime());
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setData(jsonData);
      setError(null);
      toast({
        title: "Données actualisées",
        description: "Les données ont été rechargées avec succès.",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(errorMessage);
      toast({
        title: "Erreur de chargement",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCategories = useMemo(() => {
    if (!data) return [];

    // Si on a une catégorie sélectionnée et pas de terme de recherche, on retourne simplement cette catégorie
    if (selectedCategory !== null && !searchTerm) {
      return data.categories.filter(cat => cat.id === selectedCategory);
    }

    // Si on a un terme de recherche (avec ou sans catégorie sélectionnée)
    if (searchTerm) {
      const normalizedSearchTerm = searchTerm.toLowerCase();
      
      return data.categories
        .filter(category => {
          // Si une catégorie est sélectionnée, on ne garde que celle-là
          if (selectedCategory !== null && category.id !== selectedCategory) {
            return false;
          }
          
          // Filtre les outils qui correspondent au terme de recherche
          const filteredTools = category.tools.filter(tool => {
            return (
              tool.name.toLowerCase().includes(normalizedSearchTerm) ||
              tool.description.toLowerCase().includes(normalizedSearchTerm) ||
              tool.keywords.some(keyword => 
                keyword.toLowerCase().includes(normalizedSearchTerm)
              )
            );
          });
          
          // Crée une nouvelle catégorie avec seulement les outils filtrés
          if (filteredTools.length > 0) {
            return {
              ...category,
              tools: filteredTools
            };
          }
          
          return false;
        })
        .filter(Boolean) as Category[]; // Type assertion pour satisfaire TypeScript
    }

    // Si aucun filtre n'est appliqué, retourne toutes les catégories
    return data.categories;
  }, [data, searchTerm, selectedCategory]);

  const allTools = useMemo(() => {
    if (!filteredCategories) return [];
    
    return filteredCategories.flatMap(category => category.tools);
  }, [filteredCategories]);

  return {
    data,
    isLoading,
    error,
    filteredCategories,
    allTools,
    refreshData
  };
};

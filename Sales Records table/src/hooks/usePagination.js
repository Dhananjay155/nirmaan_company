import { useState, useMemo, useCallback } from 'react';

export const useFiltering = (data) => {
  const [filters, setFilters] = useState({
    globalSearch: '',
    genre: '',
    popularity: { min: 0, max: 100 },
    duration: { min: 0, max: 600000 }
  });

  const filteredData = useMemo(() => {
    return data.filter(item => {
      // Global search across multiple columns
      if (filters.globalSearch) {
        const searchTerm = filters.globalSearch.toLowerCase();
        const searchableFields = ['track_name', 'artist_name', 'album_name', 'genre'];
        const matchesSearch = searchableFields.some(field => 
          String(item[field]).toLowerCase().includes(searchTerm)
        );
        if (!matchesSearch) return false;
      }

      // Genre filter
      if (filters.genre && item.genre !== filters.genre) {
        return false;
      }

      // Popularity range filter
      if (item.popularity < filters.popularity.min || item.popularity > filters.popularity.max) {
        return false;
      }

      // Duration range filter
      if (item.duration_ms < filters.duration.min || item.duration_ms > filters.duration.max) {
        return false;
      }

      return true;
    });
  }, [data, filters]);

  const updateFilter = useCallback((filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  }, []);

  return { filteredData, filters, updateFilter };
};
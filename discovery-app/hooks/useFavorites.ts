import { useState, useEffect } from 'react';
import { favoriteService } from '@/services/favoriteService';
import { Place } from '@/services/placeService';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await favoriteService.getAll();
      setFavorites(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar favoritos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const addFavorite = async (placeId: string) => {
    try {
      await favoriteService.add(placeId);
      await fetchFavorites(); // Recarregar a lista
      return true;
    } catch (err: any) {
      setError(err.message || 'Erro ao adicionar favorito');
      return false;
    }
  };

  const removeFavorite = async (placeId: string) => {
    try {
      await favoriteService.remove(placeId);
      await fetchFavorites(); // Recarregar a lista
      return true;
    } catch (err: any) {
      setError(err.message || 'Erro ao remover favorito');
      return false;
    }
  };

  const toggleFavorite = async (placeId: string) => {
    const isFavorite = favorites.some(fav => fav.id === placeId);
    
    if (isFavorite) {
      return await removeFavorite(placeId);
    } else {
      return await addFavorite(placeId);
    }
  };

  const isFavorite = (placeId: string) => {
    return favorites.some(fav => fav.id === placeId);
  };

  const refetch = () => fetchFavorites();

  return {
    favorites,
    loading,
    error,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    refetch,
  };
};
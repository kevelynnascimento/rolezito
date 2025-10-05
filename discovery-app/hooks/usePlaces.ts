import { useState, useEffect } from 'react';
import { placeService, Place, PlaceFilters } from '@/services/placeService';

export const usePlaces = (filters?: PlaceFilters) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlaces = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await placeService.getAll(filters);
      setPlaces(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar lugares');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, [filters?.category, filters?.city, filters?.lat, filters?.lng, filters?.radius]);

  const refetch = () => fetchPlaces();

  return {
    places,
    loading,
    error,
    refetch,
  };
};

export const usePlace = (id: string) => {
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlace = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await placeService.getById(id);
      setPlace(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar lugar');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPlace();
    }
  }, [id]);

  const refetch = () => fetchPlace();

  return {
    place,
    loading,
    error,
    refetch,
  };
};
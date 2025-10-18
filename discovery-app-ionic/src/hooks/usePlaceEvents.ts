import { useState, useEffect, useCallback } from 'react';
import { Place, PlaceType } from '../types/place';

interface UsePlacesAndEventsParams {
  category?: string;
  type: PlaceType | 'all';
}

// Mock data for demonstration - Using Picsum Photos (more reliable than Unsplash)
const mockPlaces: Place[] = [
  {
    id: '1',
    type: PlaceType.LOCAL,
    image: 'https://picsum.photos/seed/bar1/400/300',
    title: 'Bar do João',
    tag: 'Bar • Música ao vivo',
    rating: 4.5,
    distance: '1.2 km',
    status: 'Aberto',
  },
  {
    id: '2',
    type: PlaceType.EVENT,
    image: 'https://picsum.photos/seed/event1/400/300',
    title: 'Show de Rock',
    tag: 'Evento • Música',
    rating: 4.8,
    distance: '2.1 km',
    status: 'Aberto',
    eventDate: '2025-10-15',
    eventTime: '20:00',
  },
  {
    id: '3',
    type: PlaceType.LOCAL,
    image: 'https://picsum.photos/seed/restaurant1/400/300',
    title: 'Restaurante Gourmet',
    tag: 'Restaurante • Fine dining',
    rating: 4.7,
    distance: '0.8 km',
    status: 'Fechado',
  },
  {
    id: '4',
    type: PlaceType.LOCAL,
    image: 'https://picsum.photos/seed/pizza1/400/300',
    title: 'Pizzaria Central',
    tag: 'Pizzaria • Entrega',
    rating: 4.3,
    distance: '1.5 km',
    status: 'Aberto',
  },
  {
    id: '5',
    type: PlaceType.EVENT,
    image: 'https://picsum.photos/seed/festival1/400/300',
    title: 'Festival Gastronômico',
    tag: 'Evento • Gastronomia',
    rating: 4.9,
    distance: '3.2 km',
    status: 'Aberto',
    eventDate: '2025-10-20',
    eventTime: '18:00',
  },
];

export function usePlacesAndEvents({ category, type }: UsePlacesAndEventsParams) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);
    
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        try {
          let filteredPlaces = mockPlaces;
          
          // Filter by type
          if (type !== 'all') {
            filteredPlaces = filteredPlaces.filter(place => place.type === type);
          }
          
          // Filter by category (simplified)
          if (category) {
            filteredPlaces = filteredPlaces.filter(place => 
              place.tag.toLowerCase().includes(category.toLowerCase())
            );
          }
          
          setPlaces(filteredPlaces);
          setLoading(false);
          setRefreshing(false);
          resolve();
        } catch {
          setError('Erro ao carregar dados');
          setLoading(false);
          setRefreshing(false);
          resolve();
        }
      }, isRefresh ? 1500 : 500); // Longer delay for refresh to show skeleton
    });
  }, [category, type]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const refresh = () => {
    return loadData(true);
  };

  return { places, loading, refreshing, error, refresh };
}
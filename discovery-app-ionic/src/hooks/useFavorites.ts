import { useState, useCallback, useEffect } from 'react';
import { Place, PlaceType } from '../types/place';

// Mock data para favoritos - Using Picsum Photos (more reliable)
const mockFavoritePlaces: Place[] = [
  {
    id: 'fav1',
    type: PlaceType.LOCAL,
    image: 'https://picsum.photos/seed/favbar1/400/300',
    title: 'Bar do Zeca',
    tag: 'Bar • Música ao vivo',
    rating: 4.5,
    distance: '0.8 km',
    status: 'Aberto',
  },
  {
    id: 'fav2',
    type: PlaceType.LOCAL,
    image: 'https://picsum.photos/seed/favbar2/400/300',
    title: 'Bar do João',
    tag: 'Bar • Ambiente familiar',
    rating: 4.2,
    distance: '1.2 km',
    status: 'Fechado',
  },
  {
    id: 'fav3',
    type: PlaceType.LOCAL,
    image: 'https://picsum.photos/seed/favrest1/400/300',
    title: 'Restaurante da Ana',
    tag: 'Restaurante • Comida caseira',
    rating: 4.8,
    distance: '2.0 km',
    status: 'Aberto',
  },
  {
    id: 'fav4',
    type: PlaceType.LOCAL,
    image: 'https://picsum.photos/seed/favclub1/400/300',
    title: 'Balada Top',
    tag: 'Balada • Música eletrônica',
    rating: 4.7,
    distance: '3.5 km',
    status: 'Aberto',
  },
  {
    id: 'fav5',
    type: PlaceType.EVENT,
    image: 'https://picsum.photos/seed/favevent1/400/300',
    title: 'Festival de Música',
    tag: 'Evento • Música',
    rating: 4.9,
    distance: '1.8 km',
    status: 'Aberto',
    eventDate: '2025-10-15',
    eventTime: '19:00',
  },
];

export function useFavorites() {
  const [favorites, setFavorites] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFavorites = useCallback(async (isRefresh = false) => {
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
          // Simulate loading updated favorites
          setFavorites(mockFavoritePlaces);
          setLoading(false);
          setRefreshing(false);
          resolve();
        } catch {
          setError('Erro ao carregar favoritos');
          setLoading(false);
          setRefreshing(false);
          resolve();
        }
      }, isRefresh ? 1500 : 500);
    });
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const refresh = () => {
    return loadFavorites(true);
  };

  return { favorites, loading, refreshing, error, refresh };
}
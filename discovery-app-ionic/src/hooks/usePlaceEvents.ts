import { useState, useEffect } from 'react';
import { Place, PlaceType } from '../types/place';

interface UsePlacesAndEventsParams {
  category?: string;
  type: PlaceType | 'all';
}

// Mock data for demonstration
const mockPlaces: Place[] = [
  {
    id: '1',
    type: PlaceType.LOCAL,
    image: 'https://via.placeholder.com/400x300/FF6B35/FFFFFF?text=Bar+do+João',
    title: 'Bar do João',
    tag: 'Bar • Música ao vivo',
    rating: 4.5,
    distance: '1.2 km',
    status: 'Aberto',
  },
  {
    id: '2',
    type: PlaceType.EVENT,
    image: 'https://via.placeholder.com/400x300/10B981/FFFFFF?text=Show+de+Rock',
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
    image: 'https://via.placeholder.com/400x300/A78BFA/FFFFFF?text=Restaurante+Gourmet',
    title: 'Restaurante Gourmet',
    tag: 'Restaurante • Fine dining',
    rating: 4.7,
    distance: '0.8 km',
    status: 'Fechado',
  },
  {
    id: '4',
    type: PlaceType.LOCAL,
    image: 'https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=Pizzaria+Central',
    title: 'Pizzaria Central',
    tag: 'Pizzaria • Entrega',
    rating: 4.3,
    distance: '1.5 km',
    status: 'Aberto',
  },
  {
    id: '5',
    type: PlaceType.EVENT,
    image: 'https://via.placeholder.com/400x300/EF4444/FFFFFF?text=Festival+Gastronômico',
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setError(null);
    
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
      } catch {
        setError('Erro ao carregar dados');
        setLoading(false);
      }
    }, 500); // Simulate network delay
  }, [category, type]);

  return { places, loading, error };
}
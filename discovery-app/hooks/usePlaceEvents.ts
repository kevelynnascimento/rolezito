import { useState, useEffect } from 'react';
import { Place, PlaceType } from '@/types/place';

// Mock data - em produção, isso viria da API
const mockPlacesWithEvents: Place[] = [
  // LOCAIS
  {
    id: "1",
    type: PlaceType.LOCAL,
    image: "https://picsum.photos/200",
    title: "Bar do Zeca",
    tag: "Bar",
    rating: 4.5,
    distance: "0.8 km",
    status: "Aberto",
    description: "Bar aconchegante com música ao vivo e ambiente descontraído.",
    address: "Rua das Flores, 123 - Vila Madalena",
    phone: "(11) 3456-7890",
  },
  {
    id: "2",
    type: PlaceType.LOCAL,
    image: "https://picsum.photos/200",
    title: "Restaurante da Ana",
    tag: "Restaurante",
    rating: 4.8,
    distance: "2.0 km",
    status: "Aberto",
    description: "Culinária caseira com ingredientes frescos e ambiente familiar.",
    address: "Av. Principal, 456 - Centro",
    phone: "(11) 2345-6789",
  },
  {
    id: "3",
    type: PlaceType.LOCAL,
    image: "https://picsum.photos/200",
    title: "Cerimonial Elegance",
    tag: "Cerimonial",
    rating: 4.8,
    distance: "2.3 km",
    status: "Aberto",
    description: "Espaço sofisticado para eventos especiais e celebrações.",
    address: "Rua Elegante, 789 - Bairro Nobre",
    phone: "(11) 1234-5678",
  },

  // EVENTOS
  {
    id: "event1",
    type: PlaceType.EVENT,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=80",
    title: "Sertanejo ao Vivo",
    tag: "Música",
    rating: 4.6,
    distance: "0.8 km",
    status: "Aberto",
    eventDate: "2024-11-15",
    eventTime: "21:00",
    eventEndTime: "02:00",
    eventLocation: "Bar do Zeca - Vila Madalena",
    description: "Noite especial com música sertaneja ao vivo. Uma experiência única!",
    ticketUrl: "https://ingresso.com/sertanejo-ao-vivo",
  },
  {
    id: "event2",
    type: PlaceType.EVENT,
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=400&q=80",
    title: "Happy Hour Especial",
    tag: "Promoção",
    rating: 4.3,
    distance: "0.8 km",
    status: "Aberto",
    eventDate: "2024-11-08",
    eventTime: "17:00",
    eventEndTime: "20:00",
    eventLocation: "Bar do Zeca - Vila Madalena",
    description: "Drinks pela metade do preço até às 20h. Aproveite esta oportunidade!",
    ticketUrl: "https://ingresso.com/happy-hour-especial",
  },
  {
    id: "event3",
    type: PlaceType.EVENT,
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80",
    title: "Churrasquinho do Menos é Mais",
    tag: "Evento",
    rating: 4.7,
    distance: "2.3 km",
    status: "Aberto",
    eventDate: "2024-11-20",
    eventTime: "18:00",
    eventEndTime: "23:00",
    eventLocation: "Cerimonial Elegance - Bairro Nobre",
    description: "Evento especial com churrasco e música do grupo Menos é Mais. Imperdível!",
    ticketUrl: "https://ingresso.com/menos-e-mais-churrasco",
  },
];

// Removido usePlaceEvents pois não haverá mais correlação direta entre locais e eventos

export const usePlacesAndEvents = (filters?: { 
  category?: string; 
  type?: PlaceType | 'all'; // Novo filtro por tipo
  searchTerm?: string;
}) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlacesAndEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simula uma chamada à API
        await new Promise(resolve => setTimeout(resolve, 800));
        
        let results = [...mockPlacesWithEvents];
        
        // Aplica filtros
        if (filters?.category) {
          results = results.filter(place => 
            place.tag.toLowerCase() === filters.category?.toLowerCase()
          );
        }
        
        if (filters?.searchTerm) {
          const term = filters.searchTerm.toLowerCase();
          results = results.filter(place =>
            place.title.toLowerCase().includes(term) ||
            place.tag.toLowerCase().includes(term) ||
            place.description?.toLowerCase().includes(term)
          );
        }
        
        // Filtra por tipo se especificado
        if (filters?.type && filters.type !== 'all') {
          results = results.filter(place => place.type === filters.type);
        }
        
        setPlaces(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao buscar places e eventos');
      } finally {
        setLoading(false);
      }
    };

    fetchPlacesAndEvents();
  }, [filters?.category, filters?.type, filters?.searchTerm]);

  return { places, loading, error };
};
import { useState, useEffect } from 'react';
import { Place, PlaceType } from '../types/place';

interface UsePlaceDetailResult {
  place: Place | null;
  loading: boolean;
  error: string | null;
}

// Mock data for detailed place information
const mockPlaceDetails: Record<string, Place> = {
  '1': {
    id: '1',
    type: PlaceType.LOCAL,
    image: 'https://picsum.photos/seed/bar1/600/400',
    title: 'Bar do João',
    tag: 'Bar • Música ao vivo',
    rating: 4.5,
    distance: '1.2 km',
    status: 'Aberto',
    description:
      'Um bar tradicional com música ao vivo todas as quartas e sextas. Ambiente aconchegante e descontraído, perfeito para um happy hour após o trabalho ou um encontro com amigos no final de semana.',
    address: 'Rua das Flores, 123 - Centro, Vitória - ES',
    phone: '(27) 3333-4444',
    website: 'https://www.bardojoao.com.br',
    openingHours: 'Seg-Sex: 17h - 01h\nSáb-Dom: 18h - 02h',
    vibes: ['🔥 Agitado', '🎶 Música ao vivo', '🍻 Happy hour', '🌿 Terraço'],
  },
  '2': {
    id: '2',
    type: PlaceType.EVENT,
    image: 'https://picsum.photos/seed/event1/600/400',
    title: 'Show de Rock',
    tag: 'Evento • Música',
    rating: 4.8,
    distance: '2.1 km',
    status: 'Aberto',
    eventDate: '2025-11-20',
    eventTime: '20:00',
    description:
      'Prepare-se para uma noite inesquecível de rock! Bandas locais e convidados especiais apresentam seus maiores sucessos. Entrada gratuita até às 21h.',
    address: 'Av. Principal, 456 - Praia do Canto, Vitória - ES',
    phone: '(27) 98765-4321',
    website: 'https://www.eventosrock.com.br',
    vibes: ['🎸 Rock', '🔥 Agitado', '🎤 Ao vivo', '🆓 Entrada gratuita'],
  },
  '3': {
    id: '3',
    type: PlaceType.LOCAL,
    image: 'https://picsum.photos/seed/restaurant1/600/400',
    title: 'Restaurante Gourmet',
    tag: 'Restaurante • Fine dining',
    rating: 4.7,
    distance: '0.8 km',
    status: 'Fechado',
    description:
      'Experiência gastronômica única com menu degustação elaborado pelo chef premiado. Ambiente elegante e sofisticado, ideal para ocasiões especiais.',
    address: 'Rua Gourmet, 789 - Enseada do Suá, Vitória - ES',
    phone: '(27) 3344-5566',
    website: 'https://www.restaurantegourmet.com.br',
    openingHours: 'Ter-Sáb: 19h - 23h\nDom: 12h - 16h\nFechado: Segunda',
    vibes: ['💖 Romântico', '👨‍🍳 Gourmet', '🌅 Vista bonita', '🍷 Carta de vinhos'],
  },
  '4': {
    id: '4',
    type: PlaceType.LOCAL,
    image: 'https://picsum.photos/seed/pizza1/600/400',
    title: 'Pizzaria Central',
    tag: 'Pizzaria • Entrega',
    rating: 4.3,
    distance: '1.5 km',
    status: 'Aberto',
    description:
      'Pizzas artesanais feitas no forno a lenha com ingredientes frescos e selecionados. Ambiente familiar e acolhedor. Delivery disponível.',
    address: 'Rua Central, 321 - Jardim Camburi, Vitória - ES',
    phone: '(27) 3222-1111',
    website: 'https://www.pizzariacentral.com.br',
    openingHours: 'Todos os dias: 18h - 23h',
    vibes: ['👨‍👩‍👧‍👦 Familiar', '💸 Preço acessível', '🚚 Delivery', '🔥 Forno a lenha'],
  },
  '5': {
    id: '5',
    type: PlaceType.EVENT,
    image: 'https://picsum.photos/seed/festival1/600/400',
    title: 'Festival Gastronômico',
    tag: 'Evento • Gastronomia',
    rating: 4.9,
    distance: '3.2 km',
    status: 'Aberto',
    eventDate: '2025-11-25',
    eventTime: '18:00',
    description:
      'Três dias de muita gastronomia com os melhores chefs e restaurantes da região. Mais de 50 expositores, shows ao vivo e workshops culinários.',
    address: 'Parque Municipal, s/n - Ilha do Príncipe, Vitória - ES',
    phone: '(27) 99999-8888',
    website: 'https://www.festivalgastronomico.com.br',
    vibes: ['🍽️ Gastronomia', '🎪 Festival', '🎶 Shows', '👨‍🍳 Workshops'],
  },
};

export const usePlaceDetail = (placeId: string): UsePlaceDetailResult => {
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlaceDetail = async () => {
      setLoading(true);
      setError(null);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const foundPlace = mockPlaceDetails[placeId];

      if (foundPlace) {
        setPlace(foundPlace);
      } else {
        setError('Local não encontrado');
      }

      setLoading(false);
    };

    loadPlaceDetail();
  }, [placeId]);

  return { place, loading, error };
};

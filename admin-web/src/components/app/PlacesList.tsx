import PlaceCard from './PlaceCard';

interface PlacesListProps {
  userLocation?: { latitude: number; longitude: number } | null;
  selectedCity?: string;
}

const PlacesList = ({ userLocation, selectedCity }: PlacesListProps) => {
  const mockPlaces = [
    {
      id: '1',
      name: 'Bar do João',
      category: 'Bar com música ao vivo',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      distance: '0.8 km',
      isOpen: true,
      rating: 4.5,
      priceRange: '$$',
      coordinates: { lat: -23.5505, lng: -46.6333 }
    },
    {
      id: '2',
      name: 'Clube Noturno Venus',
      category: 'Balada Eletrônica',
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
      distance: '1.2 km',
      isOpen: true,
      rating: 4.2,
      priceRange: '$$$',
      coordinates: { lat: -23.5489, lng: -46.6388 }
    },
    {
      id: '3',
      name: 'Boteco do Zeca',
      category: 'Bar tradicional',
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80', // nova imagem
      distance: '2.1 km',
      isOpen: true,
      rating: 4.3,
      priceRange: '$$',
      coordinates: { lat: -23.5520, lng: -46.6320 }
    },
    {
      id: '4',
      name: 'Lounge Sunset',
      category: 'Bar rooftop',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
      distance: '3.0 km',
      isOpen: true,
      rating: 4.8,
      priceRange: '$$$$',
      coordinates: { lat: -23.5530, lng: -46.6350 }
    },
    {
      id: '5',
      name: 'Forró do Centro',
      category: 'Balada Forró',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80', // nova imagem
      distance: '2.7 km',
      isOpen: false,
      rating: 4.1,
      priceRange: '$$',
      coordinates: { lat: -23.5540, lng: -46.6360 }
    }
  ];

  // Calcular distâncias reais se tiver localização do usuário
  const calculateDistance = (placeCoords: { lat: number; lng: number }) => {
    if (!userLocation) return null;
    
    const R = 6371; // Raio da Terra em km
    const dLat = (placeCoords.lat - userLocation.latitude) * Math.PI / 180;
    const dLng = (placeCoords.lng - userLocation.longitude) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(userLocation.latitude * Math.PI / 180) * Math.cos(placeCoords.lat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return `${distance.toFixed(1)} km`;
  };

  const placesWithDistances = mockPlaces.map(place => ({
    ...place,
    distance: calculateDistance(place.coordinates) || place.distance
  }));

  // Ordenar por distância se tiver localização do usuário
  if (userLocation) {
    placesWithDistances.sort((a, b) => {
      const distanceA = parseFloat(a.distance.replace(' km', ''));
      const distanceB = parseFloat(b.distance.replace(' km', ''));
      return distanceA - distanceB;
    });
  }

  const titleText = userLocation 
    ? 'Todos os locais próximos' 
    : `Todos os locais em ${selectedCity}`;

  return (
    <div className="px-4 pb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">{titleText}</h2>
      <div className="space-y-3">
        {placesWithDistances.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </div>
  );
};

export default PlacesList;

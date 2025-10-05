import { Heart } from 'lucide-react';
import { useEffect } from 'react';
import PlaceCard from '../../components/app/PlaceCard';

const FavoritesPage = () => {
  const favoritePlaces = [
    {
      id: '1',
      name: 'Bar do João',
      category: 'Bar com música ao vivo',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      distance: '0.8 km',
      isOpen: true,
      rating: 4.5,
      priceRange: '$$'
    },
    {
      id: '3',
      name: 'Restaurante Bella Vista',
      category: 'Restaurante Romântico',
      image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=400&q=80',
      distance: '0.5 km',
      isOpen: false,
      rating: 4.7,
      priceRange: '$$$$'
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('favoritesScroll');
    if (saved) {
      window.scrollTo(0, parseInt(saved, 10));
      localStorage.removeItem('favoritesScroll');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-4 py-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Meus Favoritos</h1>
      </div>

      {favoritePlaces.length > 0 ? (
        <div className="px-4 py-6 space-y-3">
          {favoritePlaces.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center py-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="text-purple-600" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Nenhum favorito ainda</h3>
            <p className="text-gray-500">Explore locais e adicione aos seus favoritos</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;

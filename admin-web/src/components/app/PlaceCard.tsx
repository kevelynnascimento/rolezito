import { Heart, Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Place {
  id: string;
  name: string;
  category: string;
  image: string;
  distance: string;
  isOpen: boolean;
  rating: number;
  priceRange: string;
}

interface PlaceCardProps {
  place: Place;
}

const PlaceCard = ({ place }: PlaceCardProps) => {
  // Detecta de qual página está sendo renderizado
  const pathname = window.location.pathname;
  let scrollKey = '';
  if (pathname.startsWith('/app/favorites')) {
    scrollKey = 'favoritesScroll';
  } else if (pathname === '/app' || pathname.startsWith('/app?')) {
    scrollKey = 'discoverScroll';
  }
  return (
    <Link 
      to={`/app/place/${place.id}`}
      className="block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
      onClick={() => {
        if (scrollKey) {
          localStorage.setItem(scrollKey, window.scrollY.toString());
        }
      }}
    >
      <div className="flex">
        <div className="w-24 h-24 flex-shrink-0">
          <img
            src={place.image}
            alt={place.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 p-3">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-semibold text-gray-900 text-sm">{place.name}</h3>
            <button className="text-gray-400 hover:text-red-500 transition-colors">
              <Heart size={20} />
            </button>
          </div>
          
          <p className="text-gray-500 text-xs mb-2">{place.category}</p>
          
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Star size={12} className="text-yellow-500 fill-current" />
                <span className="text-gray-600">{place.rating}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <MapPin size={12} className="text-gray-400" />
                <span className="text-gray-600">{place.distance}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                place.isOpen 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {place.isOpen ? 'Aberto' : 'Fechado'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCard;

import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Star, MapPin, Clock, Phone, Share2 } from 'lucide-react';

const PlaceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - seria obtido via API
  const place = {
    id: id,
    name: 'Bar do João',
    category: 'Bar com música ao vivo',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.5,
    reviewCount: 128,
    distance: '0.8 km',
    address: 'Rua das Flores, 123 - Vila Madalena, São Paulo',
    phone: '(11) 3456-7890',
    isOpen: true,
    openingHours: {
      today: '18h às 02h',
      week: [
        'Segunda: Fechado',
        'Terça: Fechado', 
        'Quarta: 18h às 02h',
        'Quinta: 18h às 02h',
        'Sexta: 18h às 03h',
        'Sábado: 18h às 03h',
        'Domingo: 18h às 01h'
      ]
    },
    priceRange: '$$',
    description: 'Um bar aconchegante com música ao vivo todas as noites. Ambiente descontraído, ótimo para ir com amigos ou em um date casual.',
    highlights: [
      'Música ao vivo todas as noites',
      'Happy hour até às 20h',
      'DJ convidado hoje'
    ],
    reviews: [
      {
        id: 1,
        user: 'Maria Santos',
        rating: 5,
        comment: 'Lugar incrível! Música ótima e ambiente super agradável.',
        date: '2 dias atrás'
      },
      {
        id: 2,
        user: 'Pedro Lima',
        rating: 4,
        comment: 'Boa música, mas o atendimento poderia ser mais rápido.',
        date: '1 semana atrás'
      }
    ]
  };

  // Mock data para eventos
  const upcomingEvents = [
    {
      id: 1,
      title: 'Show ao Vivo com Banda Local',
      date: 'Hoje às 22h',
      description: 'Noite especial com música brasileira e muito rock',
      price: 'Entrada gratuita',
      type: 'show'
    },
    {
      id: 2,
      title: 'Happy Hour Extended',
      date: 'Amanhã às 18h',
      description: 'Drinks pela metade do preço até às 21h',
      price: '50% off em drinks',
      type: 'promocao'
    },
    {
      id: 3,
      title: 'Karaokê Night',
      date: 'Sexta às 20h',
      description: 'Venha cantar seus sucessos favoritos',
      price: 'R$ 15 por pessoa',
      type: 'evento'
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'show':
        return '🎵';
      case 'promocao':
        return '💰';
      case 'evento':
        return '🎉';
      default:
        return '📅';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <button
          type="button"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          onClick={() => {
            if (window.history.state && window.history.state.idx > 0) {
              navigate(-1);
            } else {
              // Decide para onde voltar
              if (document.referrer.includes('/app/favorites')) {
                navigate('/app/favorites');
              } else {
                navigate('/app');
              }
            }
          }}
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div className="flex space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Heart size={20} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Share2 size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Images */}
      <div className="relative h-64 bg-gray-200">
        <img
          src={place.images[0]}
          alt={place.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
          1 / {place.images.length}
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{place.name}</h1>
              <p className="text-gray-600">{place.category}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              place.isOpen 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {place.isOpen ? 'Aberto' : 'Fechado'}
            </span>
          </div>

          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-1">
              <Star size={16} className="text-yellow-500 fill-current" />
              <span className="font-semibold">{place.rating}</span>
              <span className="text-gray-600">({place.reviewCount} avaliações)</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin size={16} className="text-gray-400" />
              <span className="text-gray-600">{place.distance}</span>
            </div>
            <span className="text-gray-600">{place.priceRange}</span>
          </div>

          <p className="text-gray-700">{place.description}</p>
        </div>

        {/* Events Section */}
        <div className="bg-white rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Próximos Eventos</h3>
          
          {upcomingEvents.length > 0 ? (
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{getEventIcon(event.type)}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{event.title}</h4>
                      <p className="text-purple-600 text-sm font-medium mb-2">{event.date}</p>
                      <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                      <p className="text-green-600 text-sm font-medium">{event.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">📅</div>
              <p className="text-gray-500">Nenhum evento programado</p>
            </div>
          )}
        </div>

        {/* Highlights */}
        <div className="bg-white rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Destaques</h3>
          <div className="space-y-2">
            {place.highlights.map((highlight, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span className="text-gray-700">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact and Hours */}
        <div className="bg-white rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Informações</h3>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <MapPin size={16} className="text-gray-400 mt-1" />
              <div>
                <p className="text-gray-700">{place.address}</p>
                <button className="text-purple-600 text-sm hover:underline">Ver no mapa</button>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone size={16} className="text-gray-400" />
              <a href={`tel:${place.phone}`} className="text-purple-600 hover:underline">
                {place.phone}
              </a>
            </div>

            <div className="flex items-start space-x-3">
              <Clock size={16} className="text-gray-400 mt-1" />
              <div>
                <p className="text-gray-700 font-medium">Hoje: {place.openingHours.today}</p>
                <div className="mt-2 space-y-1">
                  {place.openingHours.week.map((day, index) => (
                    <p key={index} className="text-sm text-gray-600">{day}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Avaliações</h3>
          
          <div className="space-y-4">
            {place.reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{review.user}</span>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-2 text-purple-600 font-medium hover:bg-purple-50 rounded-lg transition-colors">
            Ver todas as avaliações
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetailPage;

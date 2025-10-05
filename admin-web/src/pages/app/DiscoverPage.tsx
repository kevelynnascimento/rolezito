import { useState, useEffect } from 'react';
import { MapPin, List, Filter, Search } from 'lucide-react';
import DiscoverHeader from '../../components/app/DiscoverHeader';
import FeaturedSections from '../../components/app/FeaturedSections';
import PlacesList from '../../components/app/PlacesList';
import MapView from '../../components/app/MapView';
import FilterModal from '../../components/app/FilterModal';
import LocationPermissionModal from '../../components/app/LocationPermissionModal';
import { useGeolocation } from '../../hooks/useGeolocation';

// City coordinates mapping
const CITY_COORDINATES: Record<string, { latitude: number; longitude: number }> = {
  'São Paulo - SP': { latitude: -23.5505, longitude: -46.6333 },
  'Rio de Janeiro - RJ': { latitude: -22.9068, longitude: -43.1729 },
  'Belo Horizonte - MG': { latitude: -19.9167, longitude: -43.9345 },
  'Brasília - DF': { latitude: -15.7939, longitude: -47.8828 },
  'Salvador - BA': { latitude: -12.9777, longitude: -38.5016 },
  'Fortaleza - CE': { latitude: -3.7172, longitude: -38.5433 },
  'Recife - PE': { latitude: -8.0476, longitude: -34.8770 },
  'Porto Alegre - RS': { latitude: -30.0346, longitude: -51.2177 },
  'Vitória - ES': { latitude: -20.3155, longitude: -40.3128 },
  'Guarapari - ES': { latitude: -20.6746, longitude: -40.4983 },
  'Anchieta - ES': { latitude: -20.7957, longitude: -40.6422 },
  'Domingos Martins - ES': { latitude: -20.3607, longitude: -40.6594 },
  'Vila Velha - ES': { latitude: -20.3297, longitude: -40.2925 },
  'Linhares - ES': { latitude: -19.3947, longitude: -40.0643 },
  'Itaúnas - ES': { latitude: -18.4181, longitude: -39.8331 },
  'Conceição da Barra - ES': { latitude: -18.5886, longitude: -39.7362 },
  'Santa Teresa - ES': { latitude: -19.9363, longitude: -40.5977 },
  'Marechal Floriano - ES': { latitude: -20.4159, longitude: -40.6727 },
  'Piúma - ES': { latitude: -20.8336, longitude: -40.7266 },
  'Ibatiba - ES': { latitude: -20.2347, longitude: -41.5086 },
  'Aracruz - ES': { latitude: -19.8207, longitude: -40.2767 },
  'Fundão - ES': { latitude: -19.9372, longitude: -40.4062 },
  'Iriri - ES': { latitude: -20.7867, longitude: -40.4997 },
  'Marataízes - ES': { latitude: -21.0398, longitude: -40.8387 },
  'Presidente Kennedy - ES': { latitude: -21.0961, longitude: -41.0464 },
  'São Mateus - ES': { latitude: -18.7214, longitude: -39.8579 },
  'Sooretama - ES': { latitude: -19.1897, longitude: -40.0977 },
  'Itapemirim - ES': { latitude: -21.0101, longitude: -40.8302 },
  'Castelo - ES': { latitude: -20.6033, longitude: -41.2031 },
  'Afonso Cláudio - ES': { latitude: -20.0778, longitude: -41.1261 },
  'Colatina - ES': { latitude: -19.5387, longitude: -40.6269 },
  'Barra de São Francisco - ES': { latitude: -18.7546, longitude: -40.8965 },
  'Nova Venécia - ES': { latitude: -18.715, longitude: -40.4017 },
  'Cachoeiro de Itapemirim - ES': { latitude: -20.8486, longitude: -41.1121 },
  'Muqui - ES': { latitude: -20.9502, longitude: -41.3466 },
  'Venda Nova do Imigrante - ES': { latitude: -20.3272, longitude: -41.1356 },
  'Santa Leopoldina - ES': { latitude: -20.0999, longitude: -40.5272 },
  'Alfredo Chaves - ES': { latitude: -20.6396, longitude: -40.7547 },
  'Mimoso do Sul - ES': { latitude: -21.0621, longitude: -41.3617 },
  'Iconha - ES': { latitude: -20.7913, longitude: -40.8132 },
  'Vargem Alta - ES': { latitude: -20.6696, longitude: -41.0086 },
  'Muniz Freire - ES': { latitude: -20.465, longitude: -41.415 },
  'Pancas - ES': { latitude: -19.2221, longitude: -40.8536 },
  'Pedro Canário - ES': { latitude: -18.3004, longitude: -39.9576 },
  'Montanha - ES': { latitude: -18.1302, longitude: -40.3662 },
  'Baixo Guandu - ES': { latitude: -19.5213, longitude: -41.0109 },
  'Ecoporanga - ES': { latitude: -18.3702, longitude: -40.8362 },
  'Jaguaré - ES': { latitude: -18.907, longitude: -40.0752 },
  'Pinheiros - ES': { latitude: -18.4141, longitude: -40.2171 },
  'São Gabriel da Palha - ES': { latitude: -19.0195, longitude: -40.5367 },
  'Viana - ES': { latitude: -20.3825, longitude: -40.4933 },
  'Serra - ES': { latitude: -20.1211, longitude: -40.3074 },
  'Cariacica - ES': { latitude: -20.2632, longitude: -40.4165 },
};

const DiscoverPage = () => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('São Paulo');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [useUserLocation, setUseUserLocation] = useState(false);
  const [hasAskedForLocation, setHasAskedForLocation] = useState(false);

  const { requestLocation, loading: locationLoading, hasLocation, latitude, longitude, error } = useGeolocation();

  // Mostrar modal de localização na primeira visita
  useEffect(() => {
    const hasAskedBefore = localStorage.getItem('hasAskedForLocation');
    if (!hasAskedBefore) {
      setShowLocationModal(true);
    } else {
      setHasAskedForLocation(true);
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('discoverScroll');
    if (saved) {
      window.scrollTo(0, parseInt(saved, 10));
      localStorage.removeItem('discoverScroll');
    }
  }, []);

  const handleRequestLocation = async () => {
    try {
      setShowLocationModal(true);
    } catch (error) {
      console.error('Erro ao mostrar modal de localização:', error);
    }
  };

  const handleAcceptLocation = async () => {
    try {
      await requestLocation();
      setUseUserLocation(true);
      setShowLocationModal(false);
      setHasAskedForLocation(true);
      localStorage.setItem('hasAskedForLocation', 'true');
      console.log('Localização obtida:', { latitude, longitude });
    } catch (error) {
      console.error('Erro ao obter localização:', error);
      // Em caso de erro, continua com cidade
      setShowLocationModal(false);
      setHasAskedForLocation(true);
      localStorage.setItem('hasAskedForLocation', 'true');
    }
  };

  const handleDeclineLocation = () => {
    setShowLocationModal(false);
    setHasAskedForLocation(true);
    setUseUserLocation(false);
    localStorage.setItem('hasAskedForLocation', 'true');
  };

  // Derive cityLocation from selectedCity if not using user location
  const cityLocation = !useUserLocation && selectedCity && CITY_COORDINATES[selectedCity]
    ? CITY_COORDINATES[selectedCity]
    : undefined;

  return (
    <div className="min-h-screen bg-gray-50">
      <DiscoverHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        useUserLocation={useUserLocation}
        setUseUserLocation={setUseUserLocation}
        userCoordinates={hasLocation ? { latitude: latitude!, longitude: longitude! } : null}
        onRequestLocation={handleRequestLocation}
      />

      {/* View Toggle and Filter */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <List size={16} />
              <span>Lista</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'map'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <MapPin size={16} />
              <span>Mapa</span>
            </button>
          </div>

          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
          >
            <Filter size={16} />
            <span>Filtros</span>
          </button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div>
          <FeaturedSections 
            userLocation={useUserLocation && hasLocation ? { latitude: latitude!, longitude: longitude! } : null}
          />
          <PlacesList 
            userLocation={useUserLocation && hasLocation ? { latitude: latitude!, longitude: longitude! } : null}
            selectedCity={selectedCity}
          />
        </div>
      ) : (
        <MapView 
          userLocation={useUserLocation && hasLocation ? { latitude: latitude!, longitude: longitude! } : null}
          cityLocation={cityLocation}
          selectedCity={selectedCity}
        />
      )}

      <FilterModal 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
      />

      <LocationPermissionModal
        isOpen={showLocationModal}
        onAccept={handleAcceptLocation}
        onDecline={handleDeclineLocation}
        isLoading={locationLoading}
      />
    </div>
  );
};

export default DiscoverPage;

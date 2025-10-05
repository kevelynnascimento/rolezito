import { Search, MapPin, ChevronDown, Bell, Navigation, ToggleLeft, ToggleRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface DiscoverHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  useUserLocation: boolean;
  setUseUserLocation: (use: boolean) => void;
  userCoordinates?: { latitude: number; longitude: number } | null;
  onRequestLocation: () => void;
}

const DiscoverHeader = ({
  searchQuery,
  setSearchQuery,
  selectedCity,
  setSelectedCity,
  useUserLocation,
  setUseUserLocation,
  userCoordinates = null,
  onRequestLocation
}: DiscoverHeaderProps) => {
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [cityFilter, setCityFilter] = useState('');

  const cities = [
    'São Paulo|SP',
    'Rio de Janeiro|RJ',
    'Belo Horizonte|MG',
    'Brasília|DF',
    'Salvador|BA',
    'Fortaleza|CE',
    'Recife|PE',
    'Porto Alegre|RS',
    'Vitória|ES',
    'Guarapari|ES',
    'Anchieta|ES',
    'Domingos Martins|ES',
    'Vila Velha|ES',
    'Linhares|ES',
    'Itaúnas|ES',
    'Conceição da Barra|ES',
    'Santa Teresa|ES',
    'Marechal Floriano|ES',
    'Piúma|ES',
    'Ibatiba|ES',
    'Aracruz|ES',
    'Fundão|ES',
    'Iriri|ES',
    'Marataízes|ES',
    'Presidente Kennedy|ES',
    'São Mateus|ES',
    'Sooretama|ES',
    'Itapemirim|ES',
    'Castelo|ES',
    'Afonso Cláudio|ES',
    'Colatina|ES',
    'Barra de São Francisco|ES',
    'Nova Venécia|ES',
    'Cachoeiro de Itapemirim|ES',
    'Muqui|ES',
    'Venda Nova do Imigrante|ES',
    'Santa Leopoldina|ES',
    'Alfredo Chaves|ES',
    'Mimoso do Sul|ES',
    'Iconha|ES',
    'Vargem Alta|ES',
    'Muniz Freire|ES',
    'Pancas|ES',
    'Pedro Canário|ES',
    'Montanha|ES',
    'Baixo Guandu|ES',
    'Ecoporanga|ES',
    'Jaguaré|ES',
    'Pinheiros|ES',
    'São Gabriel da Palha|ES',
    'Viana|ES',
    'Serra|ES',
    'Cariacica|ES',
  ];

  const unreadNotifications = 2;

  useEffect(() => {
    if (isCityDropdownOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCityDropdownOpen]);

  const handleSelectCity = () => {
    setUseUserLocation(false);
  };

  const handleSelectLocation = () => {
    if (!userCoordinates) {
      onRequestLocation();
    } else {
      setUseUserLocation(true);
    }
  };

  const displayLocation = useUserLocation && userCoordinates
    ? 'Localização atual'
    : selectedCity;

  const locationIcon = useUserLocation && userCoordinates
    ? <Navigation size={16} className="text-purple-600" />
    : <MapPin size={16} className="text-purple-600" />;

  const handleCloseCityDropdown = () => setIsCityDropdownOpen(false);

  const filteredCities = cities.filter(city => city.toLowerCase().includes(cityFilter.toLowerCase()));

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Top Bar with City Selection and Notifications */}
      <div className="px-2 py-3 flex items-center justify-between">
        <div className="flex items-center justify-center">
          <div className="flex items-center bg-white rounded-full p-1 shadow-sm border border-purple-200">
            <button
              onClick={handleSelectLocation}
              className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${useUserLocation
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-purple-600 hover:bg-purple-50'
                }`}
            >
              <Navigation size={16} />
              <span>Localização</span>
            </button>
            <button
              onClick={handleSelectCity}
              className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${!useUserLocation
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-purple-600 hover:bg-purple-50'
                }`}
            >
              <MapPin size={16} />
              <span>Cidade</span>
            </button>
          </div>
        </div>

        <Link
          to="/app/notifications"
          className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Bell size={20} className="text-gray-600" />
          {unreadNotifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadNotifications}
            </span>
          )}
        </Link>
      </div>

      <div className="px-4 pt-3 pb-5 flex justify-center">
        <div className="relative">
          {!useUserLocation ? (
            <button
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors"
            >
              <MapPin size={16} className="text-purple-600" />
              <span className="font-medium">{selectedCity}</span>
              <ChevronDown size={16} />
            </button>
          ) : (
            <div className="flex items-center space-x-2 text-gray-700">
              <Navigation size={16} className="text-purple-600" />
              <span className="font-medium">
                {userCoordinates ? 'Localização atual' : 'Aguardando localização...'}
              </span>
            </div>
          )}

          {isCityDropdownOpen && !useUserLocation && (
            <>
              {/* Overlay */}
              <div
                className="fixed inset-0 bg-black bg-opacity-40 z-40"
                onClick={handleCloseCityDropdown}
              />
              {/* Dropdown modal */}
              <div className="fixed left-0 right-0 top-[56px] bottom-[56px] z-50 flex flex-col items-center justify-start p-0 md:top-[64px] md:bottom-[64px]">
                <div className="bg-white w-full max-w-md mx-auto rounded-t-2xl shadow-xl border border-gray-200 flex flex-col overflow-hidden animate-fade-in-up h-full">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <span className="font-semibold text-gray-900 text-lg">Selecione a cidade</span>
                    <button
                      className="text-gray-400 hover:text-purple-600 transition-colors p-1"
                      onClick={handleCloseCityDropdown}
                      aria-label="Fechar"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <div className="px-6 py-3 border-b border-gray-50">
                    <input
                      type="text"
                      placeholder="Filtrar cidade..."
                      value={cityFilter}
                      onChange={e => setCityFilter(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                    />
                  </div>
                  <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
                    {filteredCities.length === 0 ? (
                      <div className="px-6 py-8 text-center text-gray-400">Nenhuma cidade encontrada</div>
                    ) : (
                      filteredCities.map((city) => {
                        const [cityName, state] = city.split('|');
                        return (
                          <button
                            key={city}
                            onClick={() => {
                              setSelectedCity(`${cityName} - ${state}`);
                              setIsCityDropdownOpen(false);
                            }}
                            className="w-full text-left px-6 py-4 hover:bg-purple-50 text-base transition-colors flex items-center gap-2"
                          >
                            <span className="font-medium text-gray-900">{cityName}</span>
                            <span className="ml-2 px-2 py-1 rounded bg-purple-100 text-purple-700 text-xs font-semibold">{state}</span>
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar bares, restaurantes, baladas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default DiscoverHeader;

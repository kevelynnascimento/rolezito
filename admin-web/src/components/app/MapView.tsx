import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, DivIcon } from 'leaflet';
import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

// Ícones SVG inline para pubs, restaurantes e música
const pubSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' width='32' height='32'><path fill='#a16207' d='M432 32H16C7.2 32 0 39.2 0 48v16c0 8.8 7.2 16 16 16h16v80c0 53 43 96 96 96h16v144h-40c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h240c13.3 0 24-10.7 24-24v-16c0-13.3-10.7-24-24-24h-40V256h16c53 0 96-43 96-96V80h16c8.8 0 16-7.2 16-16V48c0-8.8-7.2-16-16-16zM96 80h256v80c0 35.3-28.7 64-64 64H160c-35.3 0-64-28.7-64-64V80zm256 384H96v-16h256v16z'/></svg>`;
const restaurantSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 416 512' width='32' height='32'><path fill='#16a34a' d='M416 64c0-17.7-14.3-32-32-32H32C14.3 32 0 46.3 0 64v384c0 17.7 14.3 32 32 32h352c17.7 0 32-14.3 32-32V64zm-64 352H64V96h288v320z'/></svg>`;
const musicSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' width='32' height='32'><path fill='#7c3aed' d='M511.1 32.1c-2.8-13.2-15.7-21.5-28.9-18.7l-352 72C123.2 87.2 112 99.1 112 112v272.4c-9.8-2.7-20.2-4.4-32-4.4-44.2 0-80 28.7-80 64s35.8 64 80 64 80-28.7 80-64V224l288-59v119.4c-9.8-2.7-20.2-4.4-32-4.4-44.2 0-80 28.7-80 64s35.8 64 80 64 80-28.7 80-64V48c0-7.6-3.4-14.7-8.9-19.2z'/></svg>`;

interface MapViewProps {
  userLocation?: { latitude: number; longitude: number } | null;
  cityLocation?: { latitude: number; longitude: number };
  places?: Array<{ id: string; name: string; latitude: number; longitude: number }>;
}

// Adiciona tipagem para Place com type, address e description
interface Place {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  type?: 'pub' | 'restaurant' | 'music';
  address?: string;
  description?: string;
  imageUrl?: string;
}

// Corrige o ícone padrão do marker do leaflet para vermelho
const DefaultIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

// Função para garantir tipagem correta para o Leaflet
function getLeafletIcon(svg: string): Icon | DivIcon {
  return new DivIcon({
    html: svg,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }) as DivIcon;
}

const pubIcon = getLeafletIcon(pubSvg);
const restaurantIcon = getLeafletIcon(restaurantSvg);
const musicIcon = getLeafletIcon(musicSvg);

// Mock de locais na Serra, especialmente Morada de Laranjeiras
const serralocalPlaces: Place[] = [
  {
    id: 'pub-morada',
    name: 'Pub do Morada',
    type: 'pub',
    latitude: -20.1765,
    longitude: -40.2342,
    address: 'Av. Central, 100, Morada de Laranjeiras, Serra',
    description: 'O melhor pub da região, com cervejas artesanais e música ao vivo.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'rest-morada',
    name: 'Restaurante Sabor da Serra',
    type: 'restaurant',
    latitude: -20.1758,
    longitude: -40.2335,
    address: 'Rua das Laranjeiras, 200, Morada de Laranjeiras, Serra',
    description: 'Culinária capixaba e ambiente familiar.',
    imageUrl: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'music-morada',
    name: 'Bar e Música Laranja',
    type: 'music',
    latitude: -20.1772,
    longitude: -40.2350,
    address: 'Rua do Samba, 50, Morada de Laranjeiras, Serra',
    description: 'Bar com shows ao vivo e drinks especiais.',
    imageUrl: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'pub-serra',
    name: 'Serra Beer House',
    type: 'pub',
    latitude: -20.1285,
    longitude: -40.3074,
    address: 'Av. Tal, 500, Serra',
    description: 'Pub tradicional com variedade de cervejas.',
    imageUrl: 'https://images.unsplash.com/photo-1514361892635-cebb9b6b9d14?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'rest-serra',
    name: 'Restaurante Vista Verde',
    type: 'restaurant',
    latitude: -20.1300,
    longitude: -40.3100,
    address: 'Rua das Palmeiras, 80, Serra',
    description: 'Restaurante com vista para as montanhas.',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80'
  }
];

function MapAutoCenter({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

// Cria um marker vermelho com animação de borda vermelha piscando, maior e mais rápida
const BlinkingIcon = new DivIcon({
  html: `
    <div class="blinking-marker">
      <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png" style="display:block; width:25px; height:41px;" />
      <div class="blinking-border"></div>
    </div>
  `,
  className: '',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const MapView = ({ userLocation, cityLocation, places = [], selectedCity }: MapViewProps & { places?: Place[], selectedCity?: string }) => {
  // Define o centro do mapa
  const center = useMemo(() => (
    userLocation
      ? [userLocation.latitude, userLocation.longitude]
      : cityLocation
        ? [cityLocation.latitude, cityLocation.longitude]
        : [-23.5505, -46.6333]
  ), [userLocation, cityLocation]);

  // Mostra os marcadores mockados sempre que o usuário estiver em Serra OU selecionar a cidade Serra/Morada de Laranjeiras
  const userInSerra = userLocation &&
    userLocation.latitude > -20.18 && userLocation.latitude < -20.12 &&
    userLocation.longitude > -40.32 && userLocation.longitude < -40.22;
  const isSerra = cityLocation && cityLocation.latitude === -20.1211 && cityLocation.longitude === -40.3074;
  const isMorada = cityLocation &&
    cityLocation.latitude > -20.18 && cityLocation.latitude < -20.12 &&
    cityLocation.longitude > -40.32 && cityLocation.longitude < -40.22;
  let mapZoom = 14;
  if (isMorada) mapZoom = 15;
  if (isSerra) mapZoom = 13;
  const showSerraMarkers = userInSerra || isSerra || isMorada || (selectedCity && selectedCity.toLowerCase().includes('serra'));
  const placesToShow: Place[] = showSerraMarkers ? serralocalPlaces : (places as Place[]);

  // Sempre usa o marker customizado com animação
  return (
    <div className="h-96 w-full rounded-xl overflow-hidden shadow relative z-0" style={{ minHeight: 200 }}>
      <style>{`
        .custom-marker-popup .leaflet-popup-content-wrapper {
          border-radius: 1rem;
          box-shadow: 0 6px 32px 0 rgba(0,0,0,0.18);
          padding: 0;
        }
        .custom-marker-popup .leaflet-popup-content {
          margin: 0;
          min-width: 260px;
          max-width: 340px;
          padding: 0;
        }
        .blinking-marker { position: relative; display: inline-block; }
        .blinking-marker .blinking-border {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 4px solid #fff;
          box-shadow: 0 0 12px 4px #fff;
          transform: translate(-50%, -60%);
          pointer-events: none;
          animation: blink-border 0.7s infinite alternate;
          opacity: 0.5;
        }
        @keyframes blink-border {
          0% { opacity: 0.5; box-shadow: 0 0 12px 4px #fff; }
          100% { opacity: 0.15; box-shadow: 0 0 28px 14px #fff; }
        }
      `}</style>
      <MapContainer center={center as [number, number]} zoom={mapZoom} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true}>
        <MapAutoCenter center={center as [number, number]} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {placesToShow.map((place) => (
          <Marker key={place.id} position={[place.latitude, place.longitude]} icon={BlinkingIcon}>
            <Popup minWidth={280} maxWidth={340} className="custom-marker-popup">
              <div className="space-y-2 p-2">
                <div className="font-bold text-gray-900 text-lg leading-tight">{place.name}</div>
                {place.address && <div className="text-xs text-gray-500 mb-1">{place.address}</div>}
                {place.description && <div className="text-sm text-gray-700 mb-2">{place.description}</div>}
                <Link
                  to={`/app/place/${place.id}`}
                  className="w-full block px-4 py-2 rounded-lg bg-primary text-white text-base font-semibold shadow hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 text-center"
                  style={{ minWidth: 120 }}
                >
                  Ver detalhes
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;

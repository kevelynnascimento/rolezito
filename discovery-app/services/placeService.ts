import makeRequest from './api';
import { Category } from './categoryService';
import { User } from './authService';

export interface PlaceImage {
  id: string;
  url: string;
  order: number;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: Pick<User, 'id' | 'username' | 'fullName' | 'avatar'>;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  price?: string;
  type: string;
}

export interface Place {
  id: string;
  name: string;
  description: string;
  address: string;
  phone?: string;
  latitude: number;
  longitude: number;
  openingHours?: {
    today: string;
    week: string[];
  };
  isOpen: boolean;
  styleChips?: Array<{ label: string }>;
  highlights?: string[];
  averageRating: number;
  reviewCount: number;
  category: Category;
  images: PlaceImage[];
  reviews?: Review[];
  events?: Event[];
  distance?: number;
  _count?: {
    reviews: number;
    favorites: number;
  };
}

export interface PlaceFilters {
  category?: string;
  city?: string;
  lat?: number;
  lng?: number;
  radius?: number;
}

export interface CreatePlaceRequest {
  name: string;
  description: string;
  address: string;
  phone?: string;
  latitude: number;
  longitude: number;
  categoryId: string;
  openingHours?: {
    today: string;
    week: string[];
  };
  styleChips?: Array<{ label: string }>;
  highlights?: string[];
}

export const placeService = {
  getAll: async (filters?: PlaceFilters): Promise<Place[]> => {
    const queryParams = new URLSearchParams();
    
    if (filters?.category) queryParams.append('category', filters.category);
    if (filters?.city) queryParams.append('city', filters.city);
    if (filters?.lat) queryParams.append('lat', filters.lat.toString());
    if (filters?.lng) queryParams.append('lng', filters.lng.toString());
    if (filters?.radius) queryParams.append('radius', filters.radius.toString());

    const query = queryParams.toString();
    return makeRequest(`/places${query ? `?${query}` : ''}`);
  },

  getById: async (id: string): Promise<Place> => {
    return makeRequest(`/places/${id}`);
  },

  create: async (data: CreatePlaceRequest): Promise<Place> => {
    return makeRequest('/places', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Busca lugares próximos baseado na localização atual
  getNearby: async (lat: number, lng: number, radius: number = 5): Promise<Place[]> => {
    return placeService.getAll({ lat, lng, radius });
  },

  // Busca eventos que acontecem em um place específico
  getEventsForPlace: async (placeId: string): Promise<Event[]> => {
    return makeRequest(`/places/${placeId}/events`);
  },

  // Busca todos os eventos (places do tipo evento)
  getAllEvents: async (filters?: PlaceFilters): Promise<Event[]> => {
    const queryParams = new URLSearchParams();
    queryParams.append('type', 'event'); // Filtra apenas eventos
    
    if (filters?.category) queryParams.append('category', filters.category);
    if (filters?.city) queryParams.append('city', filters.city);
    if (filters?.lat) queryParams.append('lat', filters.lat.toString());
    if (filters?.lng) queryParams.append('lng', filters.lng.toString());
    if (filters?.radius) queryParams.append('radius', filters.radius.toString());

    const query = queryParams.toString();
    return makeRequest(`/events${query ? `?${query}` : ''}`);
  },

  // Busca places e eventos combinados (nossa nova abordagem)
  getPlacesAndEvents: async (filters?: PlaceFilters & { includeEvents?: boolean }): Promise<Place[]> => {
    const queryParams = new URLSearchParams();
    
    if (filters?.category) queryParams.append('category', filters.category);
    if (filters?.city) queryParams.append('city', filters.city);
    if (filters?.lat) queryParams.append('lat', filters.lat.toString());
    if (filters?.lng) queryParams.append('lng', filters.lng.toString());
    if (filters?.radius) queryParams.append('radius', filters.radius.toString());
    if (filters?.includeEvents) queryParams.append('includeEvents', 'true');

    const query = queryParams.toString();
    return makeRequest(`/places-and-events${query ? `?${query}` : ''}`);
  },
};
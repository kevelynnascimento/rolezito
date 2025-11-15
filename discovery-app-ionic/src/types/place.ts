export enum PlaceType {
  LOCAL = 'LOCAL',
  EVENT = 'EVENT',
}

export interface Place {
  id: string;
  type: PlaceType;
  image: string;
  title: string;
  tag: string;
  rating: number;
  distance: string;
  status: 'Aberto' | 'Fechado';
  eventDate?: string; // Para eventos
  eventTime?: string; // Para eventos
  description?: string;
  address?: string;
  phone?: string;
  website?: string;
  openingHours?: string;
  vibes?: string[];
}
export enum PlaceType {
  LOCAL = 'local',
  EVENT = 'event'
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
  // Propriedades específicas para eventos
  eventDate?: string; // Data do evento (apenas para tipo EVENT)
  eventTime?: string; // Horário do evento (apenas para tipo EVENT)
  eventEndDate?: string; // Data de fim do evento (opcional)
  eventEndTime?: string; // Horário de fim do evento (opcional)
  ticketUrl?: string; // URL para compra de ingressos (apenas para tipo EVENT)
  eventLocation?: string; // Local onde o evento acontece (apenas para tipo EVENT)
  // Propriedades adicionais
  description?: string;
  address?: string;
  phone?: string;
  website?: string;
  categories?: string[];
  vibes?: string[];
}

// Removido PlaceWithEvents pois não haverá mais correlação direta entre local e evento
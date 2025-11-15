import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonCard,
  IonCardContent,
  IonChip,
  IonIcon,
} from '@ionic/react';
import { locationOutline } from 'ionicons/icons';
import './style.css';
import { Place, PlaceType } from '../../types/place';
import { getSolidColorImage } from '../../utils/imageUtils';

interface Props {
  place: Place;
  onFavorite?: () => void;
}

export const PlaceCard: React.FC<Props> = ({ place }) => {
  const history = useHistory();
  const [imageError, setImageError] = useState(false);
  const isOpen = place.status === 'Aberto';
  const isEvent = place.type === PlaceType.EVENT;

  // Formatar data e hora para eventos
  const formatEventDateTime = () => {
    if (!isEvent || !place.eventDate || !place.eventTime) return '';
    
    const date = new Date(place.eventDate);
    const dateStr = date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit' 
    });
    
    return `${dateStr} às ${place.eventTime}`;
  };

  // Gerar imagem de fallback baseada no ID do place
  const getFallbackImageUrl = () => {
    const colorIndex = parseInt(place.id) % 6; // 6 cores diferentes
    return getSolidColorImage(90, 120, colorIndex);
  };

  const handleCardClick = () => {
    history.push(`/place/${place.id}`);
  };

  return (
    <IonCard className="place-card" onClick={handleCardClick} button>
      <div className="place-card-content">
        {/* Badge para tipo */}
        <div className={`type-badge ${isEvent ? 'event-badge' : 'local-badge'}`}>
          <span className="type-badge-text">
            {isEvent ? 'EVENTO' : 'LOCAL'}
          </span>
        </div>
        
        <div className="card-image-container">
          <img 
            src={imageError ? getFallbackImageUrl() : place.image} 
            alt={place.title}
            className="card-image"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        </div>

        <IonCardContent className="card-content">
          <div className="card-info">
            <h2 className="place-title">{place.title}</h2>
            <p className="place-tag">{place.tag}</p>
            
            {/* Informações específicas para eventos */}
            {isEvent && place.eventDate && place.eventTime && (
              <p className="event-datetime">{formatEventDateTime()}</p>
            )}

            <div className="info-row">
              <div className="info-left">
                <IonIcon icon={locationOutline} className="location-icon" />
                <span className="info-text">{place.distance}</span>
              </div>
              
              <IonChip 
                className={`status-chip ${isOpen ? 'status-open' : 'status-closed'}`}
                color={isOpen ? 'success' : 'danger'}
              >
                {place.status}
              </IonChip>
            </div>
          </div>
        </IonCardContent>
      </div>
    </IonCard>
  );
};
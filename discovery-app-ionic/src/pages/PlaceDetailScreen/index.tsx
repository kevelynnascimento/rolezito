import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  IonPage,
  IonContent,
  IonIcon,
  IonChip,
  IonButton,
  IonFab,
  IonFabButton,
} from '@ionic/react';
import {
  locationOutline,
  callOutline,
  globeOutline,
  timeOutline,
  heartOutline,
  heart,
  calendarOutline,
} from 'ionicons/icons';
import { PlaceType } from '../../types/place';
import './style.css';
import { usePlaceDetail } from '../../hooks/usePlaceDetail';
import { PageHeader } from '../../components/PageHeader';

interface RouteParams {
  id: string;
}

export const PlaceDetailScreen: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const { place } = usePlaceDetail(id);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isEvent = place?.type === PlaceType.EVENT;

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  const handleDirections = () => {
    if (place?.address) {
      const query = encodeURIComponent(place?.address);
      window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
    }
  };

  const formatEventDateTime = () => {
    if (!isEvent || !place?.eventDate || !place?.eventTime) return '';

    const date = new Date(place?.eventDate);
    const dateStr = date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    return `${dateStr} às ${place?.eventTime}`;
  };

  const formatOpeningHours = () => {
    if (!place?.openingHours) return 'Não disponível';
    return place?.openingHours;
  };

  const isOpen = place?.status === 'Aberto';

  return (
    <IonPage>
      <PageHeader title="Detalhes" showBackButton/>
      <IonContent fullscreen className="place-detail-content">
        {/* Hero Image */}
        <div className="hero-image-container">
          <img
            src={imageError ? 'https://via.placeholder.com/600x400' : place?.image}
            alt={place?.title}
            className="hero-image"
            onError={() => setImageError(true)}
          />
          <div className={`type-badge-overlay ${isEvent ? 'event-badge' : 'local-badge'}`}>
            <span className="type-badge-text">
              {isEvent ? 'EVENTO' : 'LOCAL'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="detail-content">
          {/* Title and Status */}
          <div className="title-section">
            <h1 className="place-title">{place?.title}</h1>
            <IonChip
              className={`status-chip ${isOpen ? 'status-open' : 'status-closed'}`}
              color={isOpen ? 'success' : 'danger'}
            >
              {place?.status}
            </IonChip>
          </div>

          <p className="place-category">{place?.tag}</p>

          {/* Rating and Distance */}
          <div className="info-row">
            <div className="rating-container">
              <span className="rating-star">⭐</span>
              <span className="rating-text">{place?.rating.toFixed(1)}</span>
            </div>
            <div className="distance-container">
              <IonIcon icon={locationOutline} className="info-icon" />
              <span className="distance-text">{place?.distance}</span>
            </div>
          </div>

          {/* Event Date/Time - Only for events */}
          {isEvent && place?.eventDate && place?.eventTime && (
            <div className="info-section">
              <div className="section-header">
                <IonIcon icon={calendarOutline} className="section-icon" />
                <h3 className="section-title">Data e Horário</h3>
              </div>
              <p className="section-text">{formatEventDateTime()}</p>
            </div>
          )}

          {/* Description */}
          {place?.description && (
            <div className="info-section">
              <h3 className="section-title">Sobre</h3>
              <p className="section-text">{place?.description}</p>
            </div>
          )}

          {/* Address */}
          {place?.address && (
            <div className="info-section">
              <div className="section-header">
                <IonIcon icon={locationOutline} className="section-icon" />
                <h3 className="section-title">Endereço</h3>
              </div>
              <p className="section-text">{place?.address}</p>
              <IonButton
                fill="outline"
                size="small"
                className="directions-button"
                onClick={handleDirections}
              >
                Como chegar
              </IonButton>
            </div>
          )}

          {/* Opening Hours - Only for locals */}
          {!isEvent && (
            <div className="info-section">
              <div className="section-header">
                <IonIcon icon={timeOutline} className="section-icon" />
                <h3 className="section-title">Horário de Funcionamento</h3>
              </div>
              <p className="section-text">{formatOpeningHours()}</p>
            </div>
          )}

          {/* Contact */}
          <div className="info-section">
            <div className="section-header">
              <IonIcon icon={callOutline} className="section-icon" />
              <h3 className="section-title">Contato</h3>
            </div>
            {place?.phone && (
              <div className="contact-item">
                <IonIcon icon={callOutline} className="contact-icon" />
                <a href={`tel:${place?.phone}`} className="contact-link">
                  {place?.phone}
                </a>
              </div>
            )}
            {place?.website && (
              <div className="contact-item">
                <IonIcon icon={globeOutline} className="contact-icon" />
                <a
                  href={place?.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  Visitar website
                </a>
              </div>
            )}
          </div>

          {/* Tags/Vibes */}
          {place?.vibes && place?.vibes.length > 0 && (
            <div className="info-section">
              <h3 className="section-title">Estilos</h3>
              <div className="vibes-container">
                {place?.vibes.map((vibe: string, index: number) => (
                  <IonChip key={index} color="primary" className="vibe-chip">
                    {vibe}
                  </IonChip>
                ))}
              </div>
            </div>
          )}

          {/* Bottom spacing for FAB */}
          <div className="bottom-spacing" />
        </div>
      </IonContent>

      {/* FAB Favorite Button */}
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton color={isFavorite ? 'danger' : 'light'} onClick={handleFavoriteToggle}>
          <IonIcon icon={isFavorite ? heart : heartOutline} />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

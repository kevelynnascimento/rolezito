import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from '@ionic/react';
import { PlaceCard } from '../components/PlaceCard';
import { PlaceSkeleton } from '../components/PlaceSkeleton';
import { useFavorites } from '../hooks/useFavorites';
import './FavoritesScreen.css';

export const FavoritesScreen: React.FC = () => {
  const { favorites, loading, refreshing, error, refresh } = useFavorites();

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await refresh();
    event.detail.complete();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Favoritos</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="favorites-content">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent
            pullingText="Puxe para atualizar..."
            refreshingText="Carregando favoritos..."
            pullingIcon="arrow-down-outline"
            refreshingSpinner="crescent"
          />
        </IonRefresher>

        <div className="favorites-list">
          {loading ? (
            <PlaceSkeleton count={5} />
          ) : error ? (
            <div className="error-container">
              <p>Erro: {error}</p>
            </div>
          ) : refreshing ? (
            <PlaceSkeleton count={3} />
          ) : favorites.length > 0 ? (
            favorites.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
              />
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-icon">💜</div>
              <h2>Nenhum favorito ainda</h2>
              <p>Adicione places e eventos aos seus favoritos para vê-los aqui!</p>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};
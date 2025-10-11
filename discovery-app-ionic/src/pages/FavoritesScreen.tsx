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
import { Place, PlaceType } from '../types/place';
import './FavoritesScreen.css';

// Mock data para favoritos - Using Picsum Photos (more reliable)
const favoritePlaces: Place[] = [
  {
    id: 'fav1',
    type: PlaceType.LOCAL,
    image: 'https://picsum.photos/seed/favbar1/400/300',
    title: 'Bar do Zeca',
    tag: 'Bar • Música ao vivo',
    rating: 4.5,
    distance: '0.8 km',
    status: 'Aberto',
  },
  {
    id: 'fav2',
    type: PlaceType.LOCAL,
    image: 'https://picsum.photos/seed/favbar2/400/300',
    title: 'Bar do João',
    tag: 'Bar • Ambiente familiar',
    rating: 4.2,
    distance: '1.2 km',
    status: 'Fechado',
  },
  {
    id: 'fav3',
    type: PlaceType.LOCAL,
    image: 'https://picsum.photos/seed/favrest1/400/300',
    title: 'Restaurante da Ana',
    tag: 'Restaurante • Comida caseira',
    rating: 4.8,
    distance: '2.0 km',
    status: 'Aberto',
  },
  {
    id: 'fav4',
    type: PlaceType.LOCAL,
    image: 'https://picsum.photos/seed/favclub1/400/300',
    title: 'Balada Top',
    tag: 'Balada • Música eletrônica',
    rating: 4.7,
    distance: '3.5 km',
    status: 'Aberto',
  },
  {
    id: 'fav5',
    type: PlaceType.EVENT,
    image: 'https://picsum.photos/seed/favevent1/400/300',
    title: 'Festival de Música',
    tag: 'Evento • Música',
    rating: 4.9,
    distance: '1.8 km',
    status: 'Aberto',
    eventDate: '2025-10-15',
    eventTime: '19:00',
  },
];

export const FavoritesScreen: React.FC = () => {
  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      event.detail.complete();
    }, 1000);
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
          <IonRefresherContent />
        </IonRefresher>

        <div className="favorites-list">
          {favoritePlaces.length > 0 ? (
            favoritePlaces.map((place) => (
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
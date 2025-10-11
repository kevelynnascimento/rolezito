import React, { useState } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonModal,
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonChip,
} from '@ionic/react';
import { 
  locationOutline, 
  chevronDownOutline, 
  closeOutline,
} from 'ionicons/icons';
import './DiscoverHeader.css';

interface Props {
  useUserLocation: boolean;
  setUseUserLocation: (value: boolean) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

// Cidades disponíveis
const mockCities = [
  { name: 'Vitória', uf: 'ES' },
  { name: 'Vila Velha', uf: 'ES' },
  { name: 'Serra', uf: 'ES' },
  { name: 'Cariacica', uf: 'ES' },
  { name: 'Guarapari', uf: 'ES' },
  { name: 'Anchieta', uf: 'ES' },
  { name: 'Domingos Martins', uf: 'ES' },
  { name: 'Linhares', uf: 'ES' },
  { name: 'Itapemirim', uf: 'ES' },
  { name: 'Santa Teresa', uf: 'ES' },
  { name: 'Piúma', uf: 'ES' },
];

export const DiscoverHeader: React.FC<Props> = ({
  useUserLocation,
  setUseUserLocation,
  selectedCity,
  setSelectedCity,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cityFilter, setCityFilter] = useState('');

  const filteredCities = mockCities.filter((city) =>
    city.name.toLowerCase().includes(cityFilter.toLowerCase())
  );

  const selectedCityObj = mockCities.find(c => c.name === selectedCity);

  return (
    <>
      <IonHeader className="discover-header">
        <IonToolbar className="header-toolbar">
          {/* Toggle buttons */}
          <div className="header-controls">
            <div className="toggle-group">
              <IonButton
                fill={useUserLocation ? 'solid' : 'outline'}
                color={useUserLocation ? 'primary' : 'medium'}
                size="small"
                className={`toggle-button left ${useUserLocation ? 'active' : ''}`}
                onClick={() => setUseUserLocation(true)}
              >
                <IonIcon icon={locationOutline} slot="start" />
                Localização
              </IonButton>
              <IonButton
                fill={!useUserLocation ? 'solid' : 'outline'}
                color={!useUserLocation ? 'primary' : 'medium'}
                size="small"
                className={`toggle-button right ${!useUserLocation ? 'active' : ''}`}
                onClick={() => {
                  setUseUserLocation(false);
                  setCityFilter('');
                  setModalVisible(true);
                }}
              >
                Cidade
                <IonIcon icon={chevronDownOutline} slot="end" />
              </IonButton>
            </div>

            {/* Notifications - commented out as per original */}
            {/* <IonButton fill="clear" className="notification-button">
              <IonIcon icon={notificationsOutline} />
              {notificationCount > 0 && (
                <div className="notification-badge">{notificationCount}</div>
              )}
            </IonButton> */}
          </div>
        </IonToolbar>
        
        {/* Location info card */}
        <div className="location-info">
          <IonButton
            fill="clear"
            className="location-card"
            onClick={() => {
              if (!useUserLocation) {
                setCityFilter('');
                setModalVisible(true);
              }
            }}
            disabled={useUserLocation}
          >
            <IonIcon icon={locationOutline} className="location-icon" />
            <div className="location-text">
              <span className="location-city">
                {useUserLocation ? 'Utilizando sua localização atual' : selectedCity}
              </span>
              {!useUserLocation && selectedCityObj && (
                <IonChip className="uf-chip" color="primary">
                  {selectedCityObj.uf}
                </IonChip>
              )}
            </div>
          </IonButton>
        </div>
      </IonHeader>

      {/* City Selection Modal */}
      <IonModal isOpen={modalVisible} onDidDismiss={() => setModalVisible(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Selecione uma cidade</IonTitle>
            <IonButton
              fill="clear"
              slot="end"
              onClick={() => setModalVisible(false)}
            >
              <IonIcon icon={closeOutline} />
            </IonButton>
          </IonToolbar>
        </IonHeader>
        
        <IonContent>
          <IonSearchbar
            value={cityFilter}
            onIonInput={(e) => setCityFilter(e.detail.value!)}
            placeholder="Buscar cidade..."
            showClearButton="focus"
          />
          
          <IonList>
            {filteredCities.map((city) => (
              <IonItem
                key={city.name}
                button
                onClick={() => {
                  setSelectedCity(city.name);
                  setModalVisible(false);
                }}
              >
                <IonLabel>
                  <div className="city-item">
                    <span>{city.name}</span>
                    <IonChip color="primary" className="uf-chip-small">
                      {city.uf}
                    </IonChip>
                  </div>
                </IonLabel>
              </IonItem>
            ))}
            {filteredCities.length === 0 && (
              <IonItem>
                <IonLabel className="no-results">
                  Nenhuma cidade encontrada
                </IonLabel>
              </IonItem>
            )}
          </IonList>
        </IonContent>
      </IonModal>
    </>
  );
};
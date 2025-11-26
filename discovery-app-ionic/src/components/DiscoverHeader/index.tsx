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
  notificationsOutline,
} from 'ionicons/icons';
import './style.css';

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
          {/* Toggle button */}
          <div className="header-controls">
            <div className="toggle-container">
              <div className="toggle-track">
                <div className={`toggle-slider ${useUserLocation ? 'left' : 'right'}`} />
                <button
                  className={`toggle-option ${useUserLocation ? 'active' : ''}`}
                  onClick={() => setUseUserLocation(true)}
                >
                  <IonIcon icon={locationOutline} />
                  <span>Localização</span>
                </button>
                <button
                  className={`toggle-option ${!useUserLocation ? 'active' : ''}`}
                  onClick={() => {
                    setUseUserLocation(false);
                    setCityFilter('');
                    setModalVisible(true);
                  }}
                >
                  <span>Cidade</span>
                  <IonIcon icon={chevronDownOutline} />
                </button>
              </div>
            </div>

            <IonButton fill="clear" className="notification-button">
              <IonIcon icon={notificationsOutline} />
                <div className="notification-badge">2</div>
            </IonButton>
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
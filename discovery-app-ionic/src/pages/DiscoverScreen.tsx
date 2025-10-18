import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonChip,
  IonRange,
  IonFab,
  IonFabButton,
  IonToast,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from '@ionic/react';
import { 
  closeOutline, 
  filterOutline,
  checkmarkOutline,
  closeCircleOutline 
} from 'ionicons/icons';
import { PlaceCard } from '../components/PlaceCard';
import { AdBanner } from '../components/AdBanner';
import { DiscoverHeader } from '../components/DiscoverHeader';
import { PlaceSkeleton } from '../components/PlaceSkeleton';
import { Place, PlaceType } from '../types/place';
import { usePlacesAndEvents } from '../hooks/usePlaceEvents';
import './DiscoverScreen.css';

export const DiscoverScreen: React.FC = () => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [useUserLocation, setUseUserLocation] = useState(true);
  const [selectedCity, setSelectedCity] = useState('Vitória');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [distance, setDistance] = useState(10);
  const [praAgora, setPraAgora] = useState(true);
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<PlaceType | 'all'>('all');

  // Busca places e eventos usando o hook
  const { places, loading, refreshing, error, refresh } = usePlacesAndEvents({
    category: selectedCategory,
    type: selectedType,
  });

  // Categorias disponíveis
  const categories = [
    { id: 'Bar', label: '🍺 Bar' },
    { id: 'Restaurante', label: '🍽️ Restaurante' },
    { id: 'Balada', label: '🎉 Balada' },
    { id: 'Lanchonete', label: '🍔 Lanchonete' },
    { id: 'Pizzaria', label: '🍕 Pizzaria' },
    { id: 'Hotel', label: '🛏️ Hotel' },
    { id: 'Pousada', label: '🏡 Pousada' },
    { id: 'Motel', label: '💋 Motel' },
    { id: 'Cerimonial', label: '🎪 Cerimonial' },
    { id: 'Evento', label: '📅 Evento' },
  ];

  // Estilos específicos por categoria
  const categoryStyles: { [key: string]: { id: string; label: string; }[] } = {
    'Bar': [
      { id: 'agitado', label: '🔥 Agitado' },
      { id: 'aovivo', label: '🎶 Música ao vivo' },
      { id: 'vista', label: '🌅 Vista bonita' },
      { id: 'barato', label: '💸 Preço acessível' },
      { id: 'lgbt', label: '🏳️‍🌈 LGBT-friendly' },
      { id: 'happy-hour', label: '🍻 Happy hour' },
      { id: 'terraco', label: '🌿 Terraço' },
    ],
    'Restaurante': [
      { id: 'romantico', label: '💖 Romântico' },
      { id: 'familiar', label: '👨‍👩‍👧‍👦 Familiar' },
      { id: 'vista', label: '🌅 Vista bonita' },
      { id: 'barato', label: '💸 Preço acessível' },
      { id: 'gourmet', label: '👨‍🍳 Gourmet' },
      { id: 'terraco', label: '🌿 Terraço' },
      { id: 'vegano', label: '🌱 Opções veganas' },
    ],
    // Add more categories as needed...
  };

  // Função para obter estilos da categoria selecionada
  const getAvailableStyles = () => {
    if (!selectedCategory) return [];
    return categoryStyles[selectedCategory] || [];
  };

  // Função para toggle de vibe
  const toggleVibe = (vibeId: string) => {
    setSelectedVibes(prev =>
      prev.includes(vibeId)
        ? prev.filter(id => id !== vibeId)
        : [...prev, vibeId]
    );
  };

  // Função para obter os filtros ativos
  const getActiveFilters = () => {
    const filters = [];
    
    if (praAgora) {
      filters.push({
        id: 'pra-agora',
        label: '⚡ Aberto agora',
        type: 'praAgora',
        value: 'true'
      });
    }
    
    if (selectedType !== 'all') {
      filters.push({
        id: `type-${selectedType}`,
        label: selectedType === PlaceType.LOCAL ? '📍 Locais' : '📅 Eventos',
        type: 'placeType',
        value: selectedType
      });
    }
    
    if (selectedCategory) {
      const categoryObj = categories.find(c => c.id === selectedCategory);
      if (categoryObj) {
        filters.push({
          id: `category-${selectedCategory}`,
          label: categoryObj.label,
          type: 'category',
          value: selectedCategory
        });
      }
    }
    
    selectedVibes.forEach(vibeId => {
      const availableStyles = getAvailableStyles();
      const vibe = availableStyles.find(v => v.id === vibeId);
      if (vibe) {
        filters.push({
          id: `vibe-${vibeId}`,
          label: vibe.label,
          type: 'vibe',
          value: vibeId
        });
      }
    });
    
    return filters;
  };

  // Função para criar lista com anúncios intercalados
  const createListWithAds = () => {
    const listWithAds: Array<{ type: 'place' | 'ad'; data?: Place; adId?: string }> = [];
    
    places.forEach((place, index) => {
      listWithAds.push({ type: 'place', data: place });
      
      if ((index + 1) % 5 === 0 && index + 1 < places.length) {
        listWithAds.push({ 
          type: 'ad', 
          adId: `ad-${Math.floor((index + 1) / 5)}` 
        });
      }
    });
    
    return listWithAds;
  };

  const handleAdPress = () => {
    console.log('Anúncio clicado');
  };

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await refresh();
    event.detail.complete();
  };

  const removeFilter = (filter: { type: string; value: string }) => {
    if (filter.type === 'praAgora') {
      setPraAgora(false);
    } else if (filter.type === 'category') {
      setSelectedCategory(undefined);
      setSelectedVibes([]);
    } else if (filter.type === 'vibe') {
      setSelectedVibes(prev => prev.filter(id => id !== filter.value));
    } else if (filter.type === 'placeType') {
      setSelectedType('all');
    }
  };

  return (
    <IonPage>
      <DiscoverHeader
        useUserLocation={useUserLocation}
        setUseUserLocation={setUseUserLocation}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />

      <IonContent className="discover-content">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent
            pullingText="Puxe para atualizar..."
            refreshingText="Carregando..."
            pullingIcon="arrow-down-outline"
            refreshingSpinner="crescent"
          />
        </IonRefresher>

        {/* Seção de feedback dos filtros */}
        {getActiveFilters().length > 0 ? (
          <div className="filters-feedback" onClick={() => setFilterVisible(true)}>
            <div className="active-filters">
              {getActiveFilters().map((filter) => (
                <IonChip 
                  key={filter.id}
                  className="filter-chip"
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFilter(filter);
                  }}
                >
                  <span>{filter.label}</span>
                  <IonIcon icon={closeCircleOutline} />
                </IonChip>
              ))}
            </div>
            <div className="filters-count">
              <span className="filters-text">
                {getActiveFilters().length} filtro{getActiveFilters().length > 1 ? 's' : ''} ativo{getActiveFilters().length > 1 ? 's' : ''}
              </span>
              <span className="tap-hint">Toque para editar filtros</span>
            </div>
          </div>
        ) : (
          <div className="filters-prompt" onClick={() => setFilterVisible(true)}>
            <div className="prompt-content">
              <div className="prompt-icon">
                <IonIcon icon={filterOutline} />
              </div>
              <div className="prompt-text">
                <span className="prompt-title">Filtrar resultados</span>
                <span className="prompt-subtitle">Encontre exatamente o que você procura</span>
              </div>
            </div>
          </div>
        )}

        {/* Lista de places */}
        <div className="places-list">
          {loading ? (
            <PlaceSkeleton count={6} />
          ) : error ? (
            <div className="error-container">
              <p>Erro: {error}</p>
            </div>
          ) : refreshing ? (
            <PlaceSkeleton count={3} />
          ) : (
            createListWithAds().map((item, idx) => {
              if (item.type === 'ad') {
                return (
                  <AdBanner
                    key={item.adId}
                    adId={item.adId}
                    onPress={handleAdPress}
                  />
                );
              } else {
                return (
                  <PlaceCard
                    key={`place-${idx}`}
                    place={item.data!}
                    onFavorite={() => setSnackbarVisible(true)}
                  />
                );
              }
            })
          )}
        </div>
      </IonContent>

      {/* FAB Filter Button */}
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton color="primary" onClick={() => setFilterVisible(true)}>
          <IonIcon icon={filterOutline} />
        </IonFabButton>
      </IonFab>

      {/* Filter Modal */}
      <IonModal isOpen={filterVisible} onDidDismiss={() => setFilterVisible(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Filtros</IonTitle>
            <IonButton 
              fill="clear" 
              slot="end" 
              onClick={() => setFilterVisible(false)}
            >
              <IonIcon icon={closeOutline} />
            </IonButton>
          </IonToolbar>
        </IonHeader>
        
        <IonContent className="filter-modal-content">
          {/* Filtro por tipo */}
          <div className="filter-section">
            <IonLabel className="section-label">Tipo</IonLabel>
            <div className="type-filters">
              <IonButton
                fill={selectedType === 'all' ? 'solid' : 'outline'}
                color={selectedType === 'all' ? 'primary' : 'medium'}
                className="type-button"
                onClick={() => setSelectedType('all')}
              >
                🔍 Todos
              </IonButton>
              <IonButton
                fill={selectedType === PlaceType.LOCAL ? 'solid' : 'outline'}
                color={selectedType === PlaceType.LOCAL ? 'primary' : 'medium'}
                className="type-button"
                onClick={() => setSelectedType(PlaceType.LOCAL)}
              >
                📍 Locais
              </IonButton>
              <IonButton
                fill={selectedType === PlaceType.EVENT ? 'solid' : 'outline'}
                color={selectedType === PlaceType.EVENT ? 'primary' : 'medium'}
                className="type-button"
                onClick={() => setSelectedType(PlaceType.EVENT)}
              >
                📅 Eventos
              </IonButton>
            </div>
          </div>

          {/* Disponibilidade */}
          <div className="filter-section">
            <IonLabel className="section-label">Disponibilidade</IonLabel>
            <IonItem>
              <IonCheckbox 
                checked={praAgora} 
                onIonChange={e => setPraAgora(e.detail.checked)} 
                slot="start"
              />
              <IonLabel>⚡ Aberto agora</IonLabel>
            </IonItem>
          </div>

          {/* Categoria */}
          <div className="filter-section">
            <IonLabel className="section-label">Categoria</IonLabel>
            <IonItem>
              <IonSelect
                value={selectedCategory}
                placeholder="📍 Selecione uma categoria"
                onIonChange={e => {
                  setSelectedCategory(e.detail.value);
                  setSelectedVibes([]);
                }}
              >
                <IonSelectOption value={undefined}>Todas as categorias</IonSelectOption>
                {categories.map(category => (
                  <IonSelectOption key={category.id} value={category.id}>
                    {category.label}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </div>

          {/* Estilos - apenas se uma categoria estiver selecionada */}
          {selectedCategory && (
            <div className="filter-section">
              <IonLabel className="section-label">
                Estilos para {categories.find(c => c.id === selectedCategory)?.label.split(' ')[1]}
              </IonLabel>
              <p className="section-sublabel">
                Selecione os estilos que mais combinam com você
              </p>
              <div className="style-chips">
                {getAvailableStyles().map(style => (
                  <IonChip
                    key={style.id}
                    color={selectedVibes.includes(style.id) ? 'primary' : 'medium'}
                    onClick={() => toggleVibe(style.id)}
                    className="style-chip"
                  >
                    {style.label}
                    {selectedVibes.includes(style.id) && (
                      <IonIcon icon={checkmarkOutline} />
                    )}
                  </IonChip>
                ))}
              </div>
            </div>
          )}

          {/* Distância */}
          <div className="filter-section">
            <IonLabel className="section-label">
              Distância máxima ({distance} km)
            </IonLabel>
            <IonItem>
              <IonRange
                min={1}
                max={20}
                step={1}
                value={distance}
                onIonChange={e => setDistance(e.detail.value as number)}
                pin={true}
                ticks={true}
                snaps={true}
              >
                <IonLabel slot="start">1 km</IonLabel>
                <IonLabel slot="end">20 km</IonLabel>
              </IonRange>
            </IonItem>
          </div>

          {/* Botão aplicar */}
          <div className="filter-apply">
            <IonButton 
              expand="block" 
              onClick={() => setFilterVisible(false)}
              color="primary"
            >
              Buscar
            </IonButton>
          </div>
        </IonContent>
      </IonModal>

      {/* Toast */}
      <IonToast
        isOpen={snackbarVisible}
        onDidDismiss={() => setSnackbarVisible(false)}
        message="O local foi adicionado nos favoritos!"
        duration={2000}
        color="success"
      />
    </IonPage>
  );
};
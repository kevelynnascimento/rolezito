import { useState } from 'react';
import { PlaceCard } from '@/components/PlaceCard';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { FAB, Portal, Modal, Button, Text, Chip, Snackbar, Divider, useTheme } from 'react-native-paper';
import { DiscoverHeader } from '@/components/DiscoverHeader';
import Slider from '@react-native-community/slider';
import SafeAreaContainer from '@/components/SafeAreaContainer';
import SafeAreaContainerWithBottomMenu from '@/components/SafeAreaContainerWithBottomMenu';
import ScreenContainer from '@/components/ScreenContainer';


export default function DiscoverScreen() {
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<'Aberto' | 'Fechado' | null>(null);
  const [useUserLocation, setUseUserLocation] = useState(true);
  const [selectedCity, setSelectedCity] = useState('Vitória');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [distance, setDistance] = useState(10);
  const [praAgora, setPraAgora] = useState(true); // Toggle "Pra agora?" - ligado por padrão
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]); // Novo estado para vibes
  const theme = useTheme();

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
  ];

  // Estilos específicos por categoria
  const categoryStyles = {
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
    'Balada': [
      { id: 'agitado', label: '🔥 Agitado' },
      { id: 'aovivo', label: '🎶 Shows ao vivo' },
      { id: 'eletronica', label: '🎧 Música eletrônica' },
      { id: 'lgbt', label: '�️‍🌈 LGBT-friendly' },
      { id: 'vip', label: '✨ Área VIP' },
      { id: 'pista', label: '💃 Pista de dança' },
    ],
    'Lanchonete': [
      { id: 'barato', label: '💸 Preço acessível' },
      { id: 'rapido', label: '⚡ Atendimento rápido' },
      { id: 'delivery', label: '🛵 Delivery' },
      { id: '24h', label: '🕐 24 horas' },
      { id: 'drive', label: '🚗 Drive-thru' },
    ],
    'Pizzaria': [
      { id: 'familiar', label: '👨‍👩‍👧‍👦 Familiar' },
      { id: 'barato', label: '💸 Preço acessível' },
      { id: 'delivery', label: '🛵 Delivery' },
      { id: 'rodizio', label: '🍕 Rodízio' },
      { id: 'forno-lenha', label: '🔥 Forno à lenha' },
    ],
    'Hotel': [
      { id: 'luxo', label: '✨ Luxo' },
      { id: 'piscina', label: '🏊‍♂️ Piscina' },
      { id: 'spa', label: '💆‍♀️ Spa' },
      { id: 'vista', label: '🌅 Vista bonita' },
      { id: 'cafe', label: '☕ Café da manhã' },
      { id: 'centro', label: '🏙️ Centro da cidade' },
    ],
    'Pousada': [
      { id: 'aconchegante', label: '🏠 Aconchegante' },
      { id: 'natureza', label: '� Contato com natureza' },
      { id: 'vista', label: '� Vista bonita' },
      { id: 'cafe', label: '☕ Café da manhã' },
      { id: 'pets', label: '🐕 Pet-friendly' },
    ],
    'Motel': [
      { id: 'romantico', label: '💖 Romântico' },
      { id: 'luxo', label: '✨ Luxo' },
      { id: 'jacuzzi', label: '🛁 Jacuzzi' },
      { id: 'suites', label: '🏠 Suítes temáticas' },
      { id: 'garage', label: '🚗 Garagem privativa' },
    ],
  };

  // Função para obter estilos da categoria selecionada
  const getAvailableStyles = () => {
    if (!selectedCategory) return [];
    return categoryStyles[selectedCategory as keyof typeof categoryStyles] || [];
  };

  // Função para toggle de vibe
  const toggleVibe = (vibeId: string) => {
    setSelectedVibes(prev =>
      prev.includes(vibeId)
        ? prev.filter(id => id !== vibeId)
        : [...prev, vibeId]
    );
  };

  // Função para limpar filtros
  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedVibes([]);
    setPraAgora(false);
  };

  // Função para remover categoria específica e limpar estilos
  const removeCategory = () => {
    setSelectedCategory(null);
    setSelectedVibes([]); // Limpa estilos quando remove categoria
  };

  // Função para remover vibe específica
  const removeVibe = (vibeId: string) => {
    setSelectedVibes(prev => prev.filter(id => id !== vibeId));
  };

  // Função para obter os filtros ativos
  const getActiveFilters = () => {
    const filters = [];
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

  const places = [
    {
      image: "https://picsum.photos/200",
      title: "Bar do Zeca",
      tag: "Bar",
      rating: 4.5,
      distance: "0.8 km",
      status: "Aberto" as 'Aberto',
    },
    {
      image: "https://picsum.photos/200",
      title: "Bar do João",
      tag: "Bar",
      rating: 4.2,
      distance: "1.2 km",
      status: "Fechado" as 'Fechado',
    },
    {
      image: "https://picsum.photos/200",
      title: "Restaurante da Ana",
      tag: "Restaurante",
      rating: 4.8,
      distance: "2.0 km",
      status: "Aberto" as 'Aberto',
    },
    {
      image: "https://picsum.photos/200",
      title: "Balada Top",
      tag: "Balada",
      rating: 4.7,
      distance: "3.5 km",
      status: "Aberto" as 'Aberto',
    },
    {
      image: "https://picsum.photos/200",
      title: "Balada Top",
      tag: "Balada",
      rating: 4.7,
      distance: "3.5 km",
      status: "Aberto" as 'Aberto',
    },
    {
      image: "https://picsum.photos/200",
      title: "Balada Top",
      tag: "Balada",
      rating: 4.7,
      distance: "3.5 km",
      status: "Aberto" as 'Aberto',
    },
    {
      image: "https://picsum.photos/200",
      title: "Balada Top",
      tag: "Balada",
      rating: 4.7,
      distance: "3.5 km",
      status: "Aberto" as 'Aberto',
    },
  ];

  return (
    <SafeAreaContainerWithBottomMenu>
      <DiscoverHeader
        useUserLocation={useUserLocation}
        setUseUserLocation={setUseUserLocation}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />
      <ScreenContainer backgroundColor="#F8FAFC">
        {/* Seção de feedback dos filtros e título */}
        <View style={styles.feedbackSection}>
          {/* Feedback dos filtros ativos */}
          {(getActiveFilters().length > 0 || praAgora) && (
            <TouchableOpacity
              style={styles.filtersContainer}
              onPress={() => setFilterVisible(true)}
              activeOpacity={0.8}
            >
              <View style={styles.filtersRow}>
                <View style={styles.activeFilters}>
                  {/* Feedback do "Pra agora" como um filtro */}
                  {praAgora && (
                    <TouchableOpacity
                      style={styles.filterTag}
                      onPress={(e) => {
                        e.stopPropagation();
                        setPraAgora(false);
                      }}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.filterTagText}>⚡ Aberto agora</Text>
                      <Text style={styles.filterRemoveIcon}>×</Text>
                    </TouchableOpacity>
                  )}

                  {getActiveFilters().map((filter) => (
                    <TouchableOpacity
                      key={filter.id}
                      style={styles.filterTag}
                      onPress={(e) => {
                        e.stopPropagation();
                        if (filter.type === 'category') {
                          removeCategory();
                        } else if (filter.type === 'vibe') {
                          removeVibe(filter.value);
                        }
                      }}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.filterTagText}>{filter.label}</Text>
                      <Text style={styles.filterRemoveIcon}>×</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {(getActiveFilters().length > 0 || praAgora) && (
                  <TouchableOpacity
                    style={styles.clearFiltersButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      clearFilters();
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.clearFiltersText}>Limpar</Text>
                  </TouchableOpacity>
                )}
              </View>
              <Text style={styles.filtersCount}>
                {praAgora ? `Buscando lugares abertos${getActiveFilters().length > 0 ? ` • ${getActiveFilters().length} filtro${getActiveFilters().length > 1 ? 's' : ''} ativo${getActiveFilters().length > 1 ? 's' : ''}` : ''}` :
                  `${getActiveFilters().length} filtro${getActiveFilters().length > 1 ? 's' : ''} ativo${getActiveFilters().length > 1 ? 's' : ''}`}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          {places.map((place, idx) => (
              <PlaceCard
                key={idx}
                image={place.image}
                title={place.title}
                tag={place.tag}
                rating={place.rating}
                distance={place.distance}
                status={place.status}
                onFavorite={() => setSnackbarVisible(true)}
              />
          ))}
        </ScrollView>
        <Portal>
          <Modal visible={filterVisible} onDismiss={() => setFilterVisible(false)} contentContainerStyle={styles.modalContainer}>
            {/* Cabeçalho fixo do modal */}
            <View style={styles.modalHeader}>
              <Text variant="titleMedium" style={styles.modalTitle}>Filtros</Text>
              <Button
                mode="text"
                onPress={() => setFilterVisible(false)}
                style={styles.closeButton}
                labelStyle={styles.closeButtonLabel}
                contentStyle={styles.closeButtonContent}
                compact
                accessibilityLabel="Fechar filtros"
              >
                ✕
              </Button>
            </View>

            {/* Conteúdo scrollável do modal */}
            <ScrollView 
              style={styles.modalScrollView}
              contentContainerStyle={styles.modalScrollContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Toggle "Pra agora?" */}
              <View style={styles.filterSection}>
                <Text variant="labelLarge" style={styles.sectionLabel}>Disponibilidade</Text>
                <TouchableOpacity
                  style={[
                    styles.availabilityCard,
                    praAgora && styles.availabilityCardSelected
                  ]}
                  onPress={() => setPraAgora(!praAgora)}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.availabilityCardText,
                    praAgora && styles.availabilityCardTextSelected
                  ]}>
                    ⚡ Aberto agora
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Seleção de categoria */}
              <View style={styles.filterSection}>
                <Text variant="labelLarge" style={styles.sectionLabel}>Categoria</Text>
                <View style={styles.categoryGrid}>
                  {categories.map((category) => (
                    <TouchableOpacity
                      key={category.id}
                      style={[
                        styles.categoryCard,
                        selectedCategory === category.id && styles.categoryCardSelected
                      ]}
                      onPress={() => {
                        if (selectedCategory === category.id) {
                          setSelectedCategory(null);
                          setSelectedVibes([]); // Limpa estilos ao desselecionar categoria
                        } else {
                          setSelectedCategory(category.id);
                          setSelectedVibes([]); // Limpa estilos ao trocar categoria
                        }
                      }}
                      activeOpacity={0.7}
                    >
                      <Text style={[
                        styles.categoryCardText,
                        selectedCategory === category.id && styles.categoryCardTextSelected
                      ]}>
                        {category.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Seleção de estilos - apenas se uma categoria estiver selecionada */}
              {selectedCategory ? (
                <View style={styles.filterSection}>
                  <Text variant="labelLarge" style={styles.sectionLabel}>
                    Estilos para {categories.find(c => c.id === selectedCategory)?.label.split(' ')[1]}
                  </Text>
                  <Text style={styles.sectionSubLabel}>
                    Selecione os estilos que mais combinam com você
                  </Text>
                  <View style={styles.styleChipContainer}>
                    {getAvailableStyles().map((style) => (
                      <Chip
                        key={style.id}
                        selected={selectedVibes.includes(style.id)}
                        onPress={() => toggleVibe(style.id)}
                        style={[
                          styles.styleChip,
                          selectedVibes.includes(style.id) && styles.styleChipSelected
                        ]}
                        textStyle={[
                          styles.styleChipText,
                          selectedVibes.includes(style.id) && styles.styleChipTextSelected
                        ]}
                      >
                        {style.label}
                      </Chip>
                    ))}
                  </View>
                </View>
              ) : (
                <View style={styles.filterSection}>
                  <Text variant="labelLarge" style={styles.sectionLabel}>
                    Estilos
                  </Text>
                  <View style={styles.emptyStylesContainer}>
                    <Text style={styles.emptyStylesText}>
                      📍 Primeiro selecione uma categoria acima para ver os estilos disponíveis
                    </Text>
                  </View>
                </View>
              )}

              {/* Filtro de distância */}
              <View style={styles.filterSection}>
                <Text variant="labelLarge" style={styles.sectionLabel}>
                  Distância máxima ({distance} km)
                </Text>
                <View style={styles.sliderContainer}>
                  <Slider
                    style={styles.slider}
                    minimumValue={1}
                    maximumValue={20}
                    step={1}
                    minimumTrackTintColor="#A78BFA"
                    maximumTrackTintColor="#E0D7FB"
                    thumbTintColor="#A78BFA"
                    value={distance}
                    onValueChange={setDistance}
                  />
                  <View style={styles.sliderLabels}>
                    <Text style={styles.sliderLabel}>1 km</Text>
                    <Text style={styles.sliderLabel}>20 km</Text>
                  </View>
                </View>
              </View>

              {/* Espaço extra para o botão fixo */}
              <View style={styles.modalBottomSpacer} />
            </ScrollView>

            {/* Botão fixo no bottom */}
            <View style={styles.modalFooter}>
              <Button 
                mode="contained" 
                style={styles.applyButton}
                contentStyle={styles.applyButtonContent}
                labelStyle={styles.applyButtonLabel}
                onPress={() => setFilterVisible(false)}
              >
                Aplicar {getActiveFilters().length > 0 ? `(${getActiveFilters().length + (praAgora ? 1 : 0)})` : 'Filtros'}
              </Button>
            </View>
          </Modal>
        </Portal>
        <FAB
          icon="filter-variant"
          style={styles.fab}
          onPress={() => setFilterVisible(true)}
          color="#fff"
          customSize={60}
        />
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={2000}
          style={{ backgroundColor: '#A78BFA' }}
        >
          O local foi adicionado nos favoritos!
        </Snackbar>
      </ScreenContainer>
    </SafeAreaContainerWithBottomMenu>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    marginHorizontal: 8,
  },
  fab: {
    position: 'absolute',
    right: 18,
    bottom: 18,
    backgroundColor: '#A78BFA',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  modalContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 24,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    maxHeight: '90%',
    minHeight: '60%',
    flexDirection: 'column',
  },
  
  // Modal Header
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  closeButton: {
    minWidth: 32,
    minHeight: 32,
    borderRadius: 16,
    margin: 0,
    padding: 0,
  },
  closeButtonLabel: {
    fontSize: 20,
    color: '#6B7280',
    fontWeight: 'bold',
    lineHeight: 20,
  },
  closeButtonContent: {
    minWidth: 32,
    minHeight: 32,
  },

  // Modal ScrollView
  modalScrollView: {
    flex: 1,
  },
  modalScrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  // Filter Sections
  filterSection: {
    marginTop: 8,
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  sectionSubLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 20,
  },

  // Category Grid
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    width: '48%',
    alignItems: 'center',
    marginBottom: 12,
    minHeight: 52,
    justifyContent: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryCardSelected: {
    backgroundColor: '#F4F3FF',
    borderColor: '#A78BFA',
    elevation: 3,
    shadowColor: '#A78BFA',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  categoryCardText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },
  categoryCardTextSelected: {
    color: '#7C5CFA',
    // fontWeight: '600',
  },

  // Availability Card (full width)
  availabilityCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
    minHeight: 56,
    justifyContent: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  availabilityCardSelected: {
    backgroundColor: '#F4F3FF',
    borderColor: '#A78BFA',
    elevation: 3,
    shadowColor: '#A78BFA',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  availabilityCardText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  availabilityCardTextSelected: {
    color: '#7C5CFA',
  },

  // Style Chips
  styleChipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  styleChip: {
    marginRight: 0,
    marginBottom: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  styleChipSelected: {
    backgroundColor: '#F4F3FF',
    borderColor: '#A78BFA',
  },
  styleChipText: {
    fontSize: 13,
    color: '#374151',
  },
  styleChipTextSelected: {
    color: '#7C5CFA',
    fontWeight: '500',
  },

  // Empty Styles
  emptyStylesContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  emptyStylesText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },

  // Slider
  sliderContainer: {
    marginTop: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -8,
  },
  sliderLabel: {
    fontSize: 12,
    color: '#6B7280',
  },

  // Modal Footer
  modalFooter: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  applyButton: {
    backgroundColor: '#A78BFA',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#A78BFA',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  applyButtonContent: {
    paddingVertical: 4,
  },
  applyButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },

  // Modal Bottom Spacer
  modalBottomSpacer: {
    height: 20,
  },

  // Existing feedback styles
  feedbackSection: {
    paddingBottom: 8,
  },
  filtersContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filtersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  activeFilters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    marginRight: 8,
  },
  filterTag: {
    backgroundColor: '#EEF2FF',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 6,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterTagText: {
    fontSize: 12,
    color: '#5B21B6',
    fontWeight: '500',
    marginRight: 4,
  },
  filterRemoveIcon: {
    fontSize: 14,
    color: '#5B21B6',
    fontWeight: 'bold',
    marginLeft: 2,
    opacity: 0.7,
  },
  clearFiltersButton: {
    backgroundColor: '#F1F5F9',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  clearFiltersText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  filtersCount: {
    fontSize: 11,
    color: '#64748B',
    fontStyle: 'italic',
  },
});

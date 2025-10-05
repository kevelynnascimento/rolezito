import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, StyleSheet, Linking, Dimensions, TouchableOpacity, Platform, RefreshControl } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, Card, IconButton, Badge, Button, Divider, Chip, Modal, Portal, TextInput, Snackbar, ActivityIndicator } from 'react-native-paper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Header } from '../../components/Header';
import { CustomMapView } from '../../components/MapView';
import SafeAreaContainer from '@/components/SafeAreaContainer';
import ScreenContainer from '@/components/ScreenContainer';
import { usePlace } from '@/hooks/usePlaces';
import { useFavorites } from '@/hooks/useFavorites';
import { reviewService } from '@/services/reviewService';

export default function PlaceDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showNavigationModal, setShowNavigationModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const [ratingSnackbar, setRatingSnackbar] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const screenWidth = Dimensions.get('window').width;

  // Hooks da API
  const { place, loading, error, refetch } = usePlace(id as string);
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleScroll = (event: any) => {
    if (!place?.images?.length) return;
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (screenWidth - 32));
    setCurrentImageIndex(index);
  };

  const handleNavigationOption = (option: string) => {
    if (!place) return;

    const lat = place.latitude;
    const lng = place.longitude;
    const destination = encodeURIComponent(place.address);

    let url = '';

    switch (option) {
      case 'googlemaps':
        if (Platform.OS === 'ios') {
          url = `maps://app?daddr=${lat},${lng}`;
        } else {
          url = `geo:0,0?q=${lat},${lng}(${destination})`;
        }
        break;
      case 'waze':
        url = `waze://?ll=${lat},${lng}&navigate=yes`;
        break;
      case 'uber':
        url = `uber://?action=setPickup&pickup=my_location&dropoff[latitude]=${lat}&dropoff[longitude]=${lng}&dropoff[nickname]=${destination}`;
        break;
    }

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        // Fallback para Google Maps web
        const webUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        Linking.openURL(webUrl);
      }
    });

    setShowNavigationModal(false);
  };

  const handleRatingSubmit = async () => {
    if (!place || userRating === 0) return;

    setSubmittingReview(true);
    try {
      await reviewService.create(place.id, {
        rating: userRating,
        comment: userComment,
      });

      setShowRatingModal(false);
      setUserRating(0);
      setUserComment('');
      setRatingSnackbar(true);
      
      // Recarregar dados do lugar para atualizar reviews
      await refetch();
    } catch (error: any) {
      console.error('Erro ao enviar avaliação:', error);
      // Aqui você pode mostrar um erro para o usuário
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleFavorite = async () => {
    if (!place) return;
    await toggleFavorite(place.id);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // Loading state
  if (loading && !refreshing) {
    return (
      <SafeAreaContainer>
        <Header title="Carregando..." showBackButton={true} />
        <ScreenContainer backgroundColor="#FFFFFF">
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
            <Text style={{ marginTop: 16 }}>Carregando detalhes...</Text>
          </View>
        </ScreenContainer>
      </SafeAreaContainer>
    );
  }

  // Error state
  if (error || !place) {
    return (
      <SafeAreaContainer>
        <Header title="Erro" showBackButton={true} />
        <ScreenContainer backgroundColor="#FFFFFF">
          <View style={styles.errorContainer}>
            <Text style={{ textAlign: 'center', marginBottom: 16 }}>
              {error || 'Lugar não encontrado'}
            </Text>
            <Button mode="contained" onPress={refetch}>
              Tentar novamente
            </Button>
          </View>
        </ScreenContainer>
      </SafeAreaContainer>
    );
  }

  return (
    <SafeAreaContainer>
      <Header title={place.name} showBackButton={true} />
      <ScreenContainer backgroundColor="#FFFFFF">
        <ScrollView 
          style={styles.container} 
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Galeria de Imagens */}
          <View style={styles.imageContainer}>
            {place.images && place.images.length > 0 ? (
              <>
                <ScrollView
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  onScroll={handleScroll}
                  scrollEventThrottle={16}
                  style={styles.imageCarousel}
                >
                  {place.images.map((image, index) => (
                    <Image
                      key={index}
                      source={{ uri: image.url }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  ))}
                </ScrollView>
                
                {/* Indicadores de Páginas */}
                {place.images.length > 1 && (
                  <View style={styles.pageIndicators}>
                    {place.images.map((_, index) => (
                      <View
                        key={index}
                        style={[
                          styles.pageIndicator,
                          index === currentImageIndex && styles.activePageIndicator,
                        ]}
                      />
                    ))}
                  </View>
                )}
              </>
            ) : (
              <View style={[styles.image, styles.placeholderImage]}>
                <MaterialIcons name="image" size={64} color="#ccc" />
                <Text style={{ color: '#999', marginTop: 8 }}>Sem imagens</Text>
              </View>
            )}

            {/* Botão de Favorito */}
            <TouchableOpacity 
              style={styles.favoriteButton}
              onPress={handleFavorite}
            >
              <MaterialIcons
                name={isFavorite(place.id) ? "favorite" : "favorite-border"}
                size={24}
                color={isFavorite(place.id) ? "#FF6B6B" : "#FFFFFF"}
              />
            </TouchableOpacity>
          </View>

          {/* Informações Básicas */}
          <Card style={styles.infoCard}>
            <Card.Content>
              <View style={styles.titleRow}>
                <View style={{ flex: 1 }}>
                  <Text variant="headlineSmall" style={styles.title}>
                    {place.name}
                  </Text>
                  <Text variant="bodyMedium" style={styles.category}>
                    {place.category.icon} {place.category.name}
                  </Text>
                </View>
                <Badge 
                  style={[
                    styles.statusBadge,
                    { backgroundColor: place.isOpen ? '#10B981' : '#EF4444' }
                  ]}
                >
                  {place.isOpen ? 'Aberto' : 'Fechado'}
                </Badge>
              </View>

              {/* Rating */}
              <View style={styles.ratingContainer}>
                <View style={styles.ratingLeft}>
                  <MaterialIcons name="star" size={20} color="#FFD700" />
                  <Text style={styles.ratingText}>
                    {place.averageRating > 0 ? place.averageRating.toFixed(1) : 'Sem avaliações'}
                  </Text>
                  {place.reviewCount > 0 && (
                    <Text style={styles.reviewCount}>
                      ({place.reviewCount} avaliações)
                    </Text>
                  )}
                </View>
                <Button
                  mode="outlined"
                  onPress={() => setShowRatingModal(true)}
                  style={styles.rateButton}
                >
                  Avaliar
                </Button>
              </View>

              <Divider style={{ marginVertical: 16 }} />

              {/* Descrição */}
              <Text variant="bodyMedium" style={styles.description}>
                {place.description}
              </Text>

              {/* Highlights/Características */}
              {place.highlights && place.highlights.length > 0 && (
                <View style={styles.highlightsContainer}>
                  <Text variant="labelLarge" style={styles.sectionTitle}>
                    Características
                  </Text>
                  <View style={styles.highlightsList}>
                    {place.highlights.map((highlight, index) => (
                      <Chip key={index} style={styles.highlight} textStyle={styles.highlightText}>
                        {highlight}
                      </Chip>
                    ))}
                  </View>
                </View>
              )}

              {/* Style Chips */}
              {place.styleChips && place.styleChips.length > 0 && (
                <View style={styles.styleChipsContainer}>
                  <Text variant="labelLarge" style={styles.sectionTitle}>
                    Estilo
                  </Text>
                  <View style={styles.styleChipsList}>
                    {place.styleChips.map((chip, index) => (
                      <Chip key={index} style={styles.styleChip} textStyle={styles.styleChipText}>
                        {chip.label}
                      </Chip>
                    ))}
                  </View>
                </View>
              )}
            </Card.Content>
          </Card>

          {/* Informações de Contato */}
          <Card style={styles.contactCard}>
            <Card.Content>
              <Text variant="labelLarge" style={styles.sectionTitle}>
                Informações de Contato
              </Text>
              
              <View style={styles.contactItem}>
                <MaterialIcons name="place" size={20} color="#666" />
                <Text style={styles.contactText}>{place.address}</Text>
              </View>

              {place.phone && (
                <TouchableOpacity 
                  style={styles.contactItem}
                  onPress={() => Linking.openURL(`tel:${place.phone}`)}
                >
                  <MaterialIcons name="phone" size={20} color="#666" />
                  <Text style={[styles.contactText, styles.clickableText]}>
                    {place.phone}
                  </Text>
                </TouchableOpacity>
              )}

              {/* Horário de Funcionamento */}
              {place.openingHours && (
                <View style={styles.hoursContainer}>
                  <Text variant="labelMedium" style={styles.hoursTitle}>
                    Horário de Funcionamento
                  </Text>
                  <Text style={styles.hoursToday}>
                    Hoje: {place.openingHours.today}
                  </Text>
                  {place.openingHours.week.map((day, index) => (
                    <Text key={index} style={styles.hoursDay}>
                      {day}
                    </Text>
                  ))}
                </View>
              )}
            </Card.Content>
          </Card>

          {/* Ações */}
          <View style={styles.actionButtons}>
            <Button
              mode="contained"
              onPress={() => setShowNavigationModal(true)}
              style={[styles.actionButton, { backgroundColor: '#A78BFA' }]}
              icon="directions"
            >
              Como Chegar
            </Button>

            <Button
              mode="outlined"
              onPress={() => router.push(`/place/${place.id}/reviews`)}
              style={styles.actionButton}
            >
              Ver Avaliações
            </Button>
          </View>

          {/* Mapa */}
          <Card style={styles.mapCard}>
            <Card.Content>
              <Text variant="labelLarge" style={styles.sectionTitle}>
                Localização
              </Text>
              <CustomMapView 
                latitude={place.latitude} 
                longitude={place.longitude}
                title={place.name}
                description={place.address}
              />
            </Card.Content>
          </Card>

          {/* Eventos (se houver) */}
          {place.events && place.events.length > 0 && (
            <Card style={styles.eventsCard}>
              <Card.Content>
                <Text variant="labelLarge" style={styles.sectionTitle}>
                  Próximos Eventos
                </Text>
                {place.events.map((event) => (
                  <View key={event.id} style={styles.eventItem}>
                    <Text variant="labelMedium" style={styles.eventTitle}>
                      {event.title}
                    </Text>
                    <Text variant="bodySmall" style={styles.eventDescription}>
                      {event.description}
                    </Text>
                    <Text variant="bodySmall" style={styles.eventDate}>
                      {new Date(event.date).toLocaleDateString('pt-BR')}
                      {event.price && ` • ${event.price}`}
                    </Text>
                  </View>
                ))}
              </Card.Content>
            </Card>
          )}
        </ScrollView>

        {/* Modal de Navegação */}
        <Portal>
          <Modal
            visible={showNavigationModal}
            onDismiss={() => setShowNavigationModal(false)}
            contentContainerStyle={styles.navigationModal}
          >
            <Text variant="titleMedium" style={styles.modalTitle}>
              Como você quer ir?
            </Text>

            <TouchableOpacity
              style={styles.navigationOption}
              onPress={() => handleNavigationOption('googlemaps')}
            >
              <MaterialIcons name="map" size={24} color="#4285F4" />
              <Text style={styles.navigationOptionText}>Google Maps</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navigationOption}
              onPress={() => handleNavigationOption('waze')}
            >
              <MaterialIcons name="navigation" size={24} color="#33CCFF" />
              <Text style={styles.navigationOptionText}>Waze</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navigationOption}
              onPress={() => handleNavigationOption('uber')}
            >
              <MaterialIcons name="local-taxi" size={24} color="#000000" />
              <Text style={styles.navigationOptionText}>Uber</Text>
            </TouchableOpacity>

            <Button
              mode="text"
              onPress={() => setShowNavigationModal(false)}
              style={styles.cancelButton}
            >
              Cancelar
            </Button>
          </Modal>
        </Portal>

        {/* Modal de Avaliação */}
        <Portal>
          <Modal
            visible={showRatingModal}
            onDismiss={() => !submittingReview && setShowRatingModal(false)}
            contentContainerStyle={styles.ratingModal}
          >
            <Text variant="titleMedium" style={styles.modalTitle}>
              Avalie este lugar
            </Text>

            {/* Estrelas */}
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setUserRating(star)}
                  disabled={submittingReview}
                >
                  <MaterialIcons
                    name="star"
                    size={40}
                    color={star <= userRating ? "#FFD700" : "#E0E0E0"}
                  />
                </TouchableOpacity>
              ))}
            </View>

            {/* Comentário */}
            <TextInput
              label="Seu comentário"
              value={userComment}
              onChangeText={setUserComment}
              mode="outlined"
              multiline
              numberOfLines={4}
              style={styles.commentInput}
              disabled={submittingReview}
            />

            <View style={styles.ratingModalActions}>
              <Button
                mode="text"
                onPress={() => setShowRatingModal(false)}
                disabled={submittingReview}
              >
                Cancelar
              </Button>
              <Button
                mode="contained"
                onPress={handleRatingSubmit}
                disabled={userRating === 0 || submittingReview}
                loading={submittingReview}
                style={{ backgroundColor: '#A78BFA' }}
              >
                Enviar
              </Button>
            </View>
          </Modal>
        </Portal>

        <Snackbar
          visible={ratingSnackbar}
          onDismiss={() => setRatingSnackbar(false)}
          duration={3000}
          style={{ backgroundColor: '#10B981' }}
        >
          Avaliação enviada com sucesso!
        </Snackbar>
      </ScreenContainer>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  imageContainer: {
    position: 'relative',
  },
  imageCarousel: {
    height: 250,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 250,
  },
  placeholderImage: {
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageIndicators: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pageIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activePageIndicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
    borderRadius: 20,
  },
  infoCard: {
    margin: 16,
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  title: {
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  category: {
    color: '#6B7280',
  },
  statusBadge: {
    color: '#FFFFFF',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: '600',
    color: '#1F2937',
  },
  reviewCount: {
    marginLeft: 8,
    color: '#6B7280',
  },
  rateButton: {
    marginLeft: 16,
  },
  description: {
    color: '#4B5563',
    lineHeight: 20,
  },
  highlightsContainer: {
    marginTop: 16,
  },
  sectionTitle: {
    color: '#1F2937',
    fontWeight: '600',
    marginBottom: 8,
  },
  highlightsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  highlight: {
    backgroundColor: '#F3F4F6',
  },
  highlightText: {
    color: '#4B5563',
  },
  styleChipsContainer: {
    marginTop: 16,
  },
  styleChipsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  styleChip: {
    backgroundColor: '#EEF2FF',
  },
  styleChipText: {
    color: '#6366F1',
  },
  contactCard: {
    margin: 16,
    marginVertical: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    marginLeft: 8,
    color: '#4B5563',
    flex: 1,
  },
  clickableText: {
    color: '#6366F1',
  },
  hoursContainer: {
    marginTop: 16,
  },
  hoursTitle: {
    color: '#1F2937',
    fontWeight: '600',
    marginBottom: 4,
  },
  hoursToday: {
    color: '#059669',
    fontWeight: '500',
    marginBottom: 8,
  },
  hoursDay: {
    color: '#6B7280',
    marginBottom: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  mapCard: {
    margin: 16,
    marginVertical: 8,
  },
  eventsCard: {
    margin: 16,
    marginVertical: 8,
  },
  eventItem: {
    marginBottom: 16,
  },
  eventTitle: {
    color: '#1F2937',
    fontWeight: '600',
  },
  eventDescription: {
    color: '#6B7280',
    marginVertical: 4,
  },
  eventDate: {
    color: '#059669',
  },
  navigationModal: {
    backgroundColor: 'white',
    padding: 24,
    margin: 20,
    borderRadius: 16,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#1F2937',
    fontWeight: '600',
  },
  navigationOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  navigationOptionText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  cancelButton: {
    marginTop: 8,
  },
  ratingModal: {
    backgroundColor: 'white',
    padding: 24,
    margin: 20,
    borderRadius: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    gap: 8,
  },
  commentInput: {
    marginBottom: 20,
  },
  ratingModalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
});
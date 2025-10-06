import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, Badge, IconButton, Card, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Place, PlaceType } from '@/types/place';

type Props = {
  place: Place;
  onFavorite?: () => void;
};

// Props alternativas para manter compatibilidade (deprecated)
type LegacyProps = {
  image: string;
  title: string;
  tag: string;
  rating: number;
  distance: string;
  status: 'Aberto' | 'Fechado';
  onFavorite?: () => void;
};

export function PlaceCard(props: Props | LegacyProps) {
  const { colors } = useTheme();
  const router = useRouter();

  // Verifica se é o novo formato ou o formato legacy
  const place = 'place' in props ? props.place : {
    id: props.title === 'Bar do João' ? '1' : '2', // fallback para compatibilidade
    type: PlaceType.LOCAL,
    image: props.image,
    title: props.title,
    tag: props.tag,
    rating: props.rating,
    distance: props.distance,
    status: props.status,
  };

  const onFavorite = 'place' in props ? props.onFavorite : props.onFavorite;
  
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

  return (
    <Card
      style={styles.card}
      onPress={() => router.push({ pathname: '/place/[id]', params: { id: place.id } })}
    >
      <View style={{ overflow: 'hidden', borderRadius: 12 }}>
        <View style={styles.row}>
          {/* Badge para tipo */}
          <View style={[
            styles.typeBadge,
            isEvent ? styles.eventBadge : styles.localBadge
          ]}>
            <Text style={[
              styles.typeBadgeText,
              isEvent ? styles.eventBadgeText : styles.localBadgeText
            ]}>
              {isEvent ? 'EVENTO' : 'LOCAL'}
            </Text>
          </View>
          
          <Image source={{ uri: place.image }} style={styles.image} />

          <View style={styles.content}>
            <Text style={styles.title} numberOfLines={1}>{place.title}</Text>
            <Text style={styles.tagText}>{place.tag}</Text>
            
            {/* Informações específicas para eventos */}
            {isEvent && place.eventDate && place.eventTime && (
              <Text style={styles.eventDateTime}>{formatEventDateTime()}</Text>
            )}

            <View style={styles.infoRow}>
              {/* TODO: Remover comentário para ativar avaliação no card */}
              {/* <MaterialIcons name="star" size={18} color="#FBBF24" />
              <Text style={styles.infoText}> {place.rating}</Text>
              <Text style={styles.separator}>•</Text> */}
              <MaterialIcons
                name="location-on"
                size={18}
                color="#A78BFA"
              />
              <Text style={styles.infoText}>
                {` ${place.distance}`}</Text>
              <Badge
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor: isOpen ? '#E3FCE4' : '#FDEAEA',
                    color: isOpen ? '#2E7D32' : '#C62828',
                    fontSize: 11,
                  },
                ]}
              >
                {place.status}
              </Badge>
            </View>
          </View>

          {/* TODO: Remover comentário para ativar favoritos no card */}
          {/* <IconButton
            icon="heart-outline"
            iconColor="#777"
            size={28}
            style={styles.heart}
            onPress={() => onFavorite && onFavorite()}
          /> */}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
    marginVertical: 6,
    marginHorizontal: 2,
    height: 120, // Altura fixa para padronizar
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    position: 'relative',
  },
  image: {
    width: 90,
    height: 120, // Altura fixa igual ao card
  },
  content: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  tagText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
    marginBottom: 6,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  infoText: {
    fontSize: 12,
    color: '#444',
  },
  separator: {
    fontSize: 12,
    color: '#888',
    marginHorizontal: 4,
  },
  statusBadge: {
    borderRadius: 12,
    marginLeft: 'auto',
    height: 20,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  heart: {
    position: 'absolute',
    top: 0,
    right: 3,
    zIndex: 1,
  },
  typeBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 2,
  },
  eventBadge: {
    backgroundColor: '#FF6B35',
  },
  localBadge: {
    backgroundColor: '#10B981',
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  eventBadgeText: {
    color: '#fff',
  },
  localBadgeText: {
    color: '#fff',
  },
  eventDateTime: {
    fontSize: 11,
    color: '#FF6B35',
    fontWeight: '600',
    marginTop: 2,
    marginBottom: 4,
  },
});

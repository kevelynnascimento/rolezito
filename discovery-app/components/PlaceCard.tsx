import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, Badge, IconButton, Card, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = {
  image: string;
  title: string;
  tag: string;
  rating: number;
  distance: string;
  status: 'Aberto' | 'Fechado';
  onFavorite?: () => void;
};

export function PlaceCard({ image, title, tag, rating, distance, status, onFavorite }: Props) {
  const { colors } = useTheme();
  const isOpen = status === 'Aberto';
  const router = useRouter();

  // Simulação: id fictício baseado no título
  const id = title === 'Bar do João' ? '1' : '2';

  return (
    <Card
      style={styles.card}
      onPress={() => router.push({ pathname: '/place/[id]', params: { id } })}
    >
      <View style={{ overflow: 'hidden', borderRadius: 12 }}>
        <View style={styles.row}>
          <Image source={{ uri: image }} style={styles.image} />

          <View style={styles.content}>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            <Text style={styles.tagText}>{tag}</Text>

            <View style={styles.infoRow}>
              {/* TODO: Remover comentário para ativar avaliação no card */}
              {/* <MaterialIcons name="star" size={18} color="#FBBF24" />
              <Text style={styles.infoText}> {rating}</Text>
              <Text style={styles.separator}>•</Text> */}
              <MaterialIcons
                name="location-on"
                size={18}
                color="#A78BFA"
              />
              <Text style={styles.infoText}>
                {` ${distance}`}</Text>
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
                {status}
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
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    position: 'relative',
  },
  image: {
    width: 90,
    height: '100%',
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
});

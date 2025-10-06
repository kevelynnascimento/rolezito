import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';

interface AdBannerProps {
  onPress?: () => void;
  adId?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ onPress, adId }) => {
  const theme = useTheme();

  // Diferentes tipos de anúncios para variar o conteúdo
  const adVariations = [
    {
      title: "Descubra ofertas especiais",
      description: "Promoções exclusivas para você",
      emoji: "🎉"
    },
    {
      title: "Delivery grátis hoje",
      description: "Peça seu prato favorito sem taxa",
      emoji: "🚚"
    },
    {
      title: "Happy hour até 19h",
      description: "Bebidas com até 50% de desconto",
      emoji: "🍺"
    },
    {
      title: "Novas experiências",
      description: "Encontre lugares incríveis perto de você",
      emoji: "⭐"
    }
  ];

  // Seleciona um anúncio baseado no ID para consistência
  const adIndex = adId ? parseInt(adId.split('-')[1]) % adVariations.length : 0;
  const selectedAd = adVariations[adIndex];

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: theme.colors.surface }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Text style={[styles.adLabel, { color: theme.colors.outline }]}>
          Anúncio
        </Text>
        <View style={styles.adContent}>
          <Text style={styles.emoji}>{selectedAd.emoji}</Text>
          <View style={styles.textContent}>
            <Text style={[styles.adTitle, { color: theme.colors.onSurface }]}>
              {selectedAd.title}
            </Text>
            <Text style={[styles.adDescription, { color: theme.colors.onSurfaceVariant }]}>
              {selectedAd.description}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 2, // Mesmo que PlaceCard
    marginVertical: 6,   // Mesmo que PlaceCard
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 3,        // Mesmo que PlaceCard
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,         // Mesmo que PlaceCard
    },
    shadowOpacity: 0.08, // Mesmo que PlaceCard
    shadowRadius: 8,     // Mesmo que PlaceCard
    backgroundColor: '#fff',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 90, // Altura similar ao PlaceCard
    paddingVertical: 10,
  },
  adLabel: {
    fontSize: 9,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
    opacity: 0.6,
  },
  adContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  emoji: {
    fontSize: 20,
  },
  textContent: {
    flex: 1,
    alignItems: 'center',
  },
  adTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
    textAlign: 'center',
  },
  adDescription: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
    opacity: 0.8,
  },
});
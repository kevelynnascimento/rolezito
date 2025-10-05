// src/components/DiscoverHeader.tsx
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Button,
  Modal,
  Portal,
  Searchbar,
  IconButton,
  useTheme,
  List,
  Badge,
} from 'react-native-paper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

type Props = {
  useUserLocation: boolean;
  setUseUserLocation: (value: boolean) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
};

// Agora cada cidade tem um UF
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
  // Adicione mais cidades/UFs se quiser
];

export function DiscoverHeader({
  useUserLocation,
  setUseUserLocation,
  selectedCity,
  setSelectedCity,
}: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [cityFilter, setCityFilter] = useState('');
  const theme = useTheme();
  const router = useRouter(); // Adicionado para navegação
  // Simulação de notificações não lidas
  const notificationCount = 2;

  const filteredCities = mockCities.filter((city) =>
    city.name.toLowerCase().includes(cityFilter.toLowerCase())
  );

  // selectedCity agora é string (nome), precisamos buscar o UF correspondente
  const selectedCityObj = mockCities.find(c => c.name === selectedCity);

  return (
    <>
      {/* Header unificado com controles e informação de localização */}
      <View style={styles.headerContainer}>
        <View style={styles.headerBarContainer}>
          <View style={styles.headerLeftToggle}>
            {/* Toggle de localização/cidade */}
            <TouchableOpacity
              style={[
                styles.toggleButton,
                useUserLocation && styles.toggleButtonActive,
                { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
              ]}
              onPress={() => setUseUserLocation(true)}
              activeOpacity={0.85}
            >
              <MaterialIcons name="location-on" size={18} color={useUserLocation ? '#7C5CFA' : '#6B7280'} />
              <Text style={[styles.toggleButtonText, useUserLocation && { color: '#7C5CFA', fontWeight: 'bold' }]}>Localização</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                !useUserLocation && styles.toggleButtonActive,
                { borderTopLeftRadius: 0, borderBottomLeftRadius: 0, marginLeft: -1 },
              ]}
              onPress={() => {
                setUseUserLocation(false);
                setCityFilter(''); // Limpa a pesquisa anterior
                setModalVisible(true);
              }}
              activeOpacity={0.85}
            >
              <Text style={[styles.toggleButtonText, !useUserLocation && { color: '#7C5CFA', fontWeight: 'bold' }]}>Cidade</Text>
              <MaterialIcons name="keyboard-arrow-down" size={18} color={!useUserLocation ? '#7C5CFA' : '#6B7280'} />
            </TouchableOpacity>
          </View>
          {/* TODO: Remover comentário para ativar notificações */}
          {/* Notificações à direita */}
          {/* <TouchableOpacity style={styles.notificationIconBar} onPress={() => router.push('/notifications')}>
            <MaterialIcons name="notifications-none" size={26} color="#6B7280" />
            {notificationCount > 0 && (
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{notificationCount}</Text>
              </View>
            )}
          </TouchableOpacity> */}
        </View>
        
        {/* Card informativo de localização integrado ao header */}
        <View style={styles.locationCardContainer}>
          <View style={styles.locationCardWrapper}>
            <TouchableOpacity
              style={styles.locationCard}
              onPress={() => {
                if (!useUserLocation) {
                  setCityFilter(''); // Limpa a pesquisa anterior
                  setModalVisible(true);
                }
              }}
              activeOpacity={useUserLocation ? 1 : 0.7}
              disabled={useUserLocation}
            >
              <MaterialIcons name="my-location" size={20} color={theme.colors.primary} style={{ marginRight: 10 }} />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.locationCardCity}>
                      {useUserLocation ? 'Utilizando sua localização atual' : selectedCity}
                    </Text>
                    {!useUserLocation && selectedCityObj && (
                      <View style={styles.ufBadge}>
                        <Text style={styles.ufBadgeText}>{selectedCityObj.uf}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modal}
        >
          <View style={styles.modalHeader}>
            <Text variant="titleMedium">Selecione uma cidade</Text>
            <IconButton icon="close" onPress={() => setModalVisible(false)} />
          </View>

          <Searchbar
            placeholder="Buscar cidade..."
            value={cityFilter}
            onChangeText={setCityFilter}
            style={{ marginBottom: 16 }}
          />

          <ScrollView style={{ maxHeight: 300 }} >
            {filteredCities.map((city) => (
              <List.Item
                key={city.name}
                title={() => (
                  <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 6 }}>
                    <Text>{city.name}</Text>
                    <View style={styles.ufBadgeSmall}>
                      <Text style={styles.ufBadgeTextSmall}>{city.uf}</Text>
                    </View>
                  </View>
                )}
                left={() => <List.Icon icon="city" />}
                onPress={() => {
                  setSelectedCity(city.name);
                  setModalVisible(false);
                }}
              />
            ))}
            {filteredCities.length === 0 && (
              <Text style={{ textAlign: 'center', marginTop: 12 }}>
                Nenhuma cidade encontrada
              </Text>
            )}
          </ScrollView>
        </Modal>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    shadowColor: '#A78BFA',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  headerBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 18,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  headerLeftToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    zIndex: 1,
  },
  toggleButtonActive: {
    backgroundColor: '#fff',
    borderColor: '#7C5CFA',
    zIndex: 2,
  },
  toggleButtonText: {
    marginLeft: 5,
    marginRight: 5,
    color: '#6B7280',
    fontSize: 15,
    fontWeight: 'bold', // Sempre bold
  },
  notificationIconBar: {
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badgeContainer: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    borderRadius: 12,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    zIndex: 2,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  locationCardContainer: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 12,
  },
  locationCardWrapper: {
    width: '100%',
    alignSelf: 'center',
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minWidth: 0,
    width: '100%',
  },
  locationCardCity: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  modal: {
    margin: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ufBadge: {
    backgroundColor: '#EDE9FE',
    borderRadius: 12,
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ufBadgeText: {
    color: '#7C5CFA',
    fontWeight: 'bold',
    fontSize: 13,
  },
  ufBadgeSmall: {
    backgroundColor: '#EDE9FE',
    borderRadius: 12,
    marginLeft: 8,
    paddingHorizontal: 7,
    paddingVertical: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ufBadgeTextSmall: {
    color: '#7C5CFA',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
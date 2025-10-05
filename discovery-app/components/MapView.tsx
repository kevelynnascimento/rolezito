import React, { useState } from 'react';
import { View, StyleSheet, Linking, Platform } from 'react-native';
import { Modal, Portal, Button, Text, Card, IconButton } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface MapViewProps {
  latitude: number;
  longitude: number;
  title: string;
  address: string;
}

export function CustomMapView({ latitude, longitude, title, address }: MapViewProps) {
  const [showNavigationModal, setShowNavigationModal] = useState(false);

  const handleMapPress = () => {
    setShowNavigationModal(true);
  };

  const handleNavigationOption = (option: string) => {
    const lat = latitude;
    const lng = longitude;
    const destination = encodeURIComponent(address);

    let url = '';

    switch (option) {
      case 'googlemaps':
        if (Platform.OS === 'ios') {
          url = `comgooglemaps://?q=${lat},${lng}&center=${lat},${lng}&zoom=16`;
        } else {
          url = `geo:${lat},${lng}?q=${lat},${lng}(${destination})`;
        }
        break;
      case 'apple':
        url = `http://maps.apple.com/?q=${destination}&ll=${lat},${lng}`;
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
        // Fallback para URLs web
        let webUrl = '';
        switch (option) {
          case 'googlemaps':
            webUrl = `https://maps.google.com/?q=${lat},${lng}`;
            break;
          case 'apple':
            webUrl = `https://maps.apple.com/?q=${destination}&ll=${lat},${lng}`;
            break;
          case 'waze':
            webUrl = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
            break;
          case 'uber':
            webUrl = `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[latitude]=${lat}&dropoff[longitude]=${lng}`;
            break;
        }
        if (webUrl) {
          Linking.openURL(webUrl);
        }
      }
    });

    setShowNavigationModal(false);
  };

  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'mapClick' || data.type === 'markerClick') {
        setShowNavigationModal(true);
      }
    } catch (error) {
      console.log('Error parsing WebView message:', error);
    }
  };

  // HTML do mapa usando OpenStreetMap e Leaflet
  const mapHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
        <style>
            body { margin: 0; padding: 0; }
            #map { height: 100vh; width: 100%; }
        </style>
    </head>
    <body>
        <div id="map"></div>
        <script>
            const map = L.map('map', {
                zoomControl: false,
                dragging: false,
                touchZoom: false,
                doubleClickZoom: false,
                scrollWheelZoom: false,
                boxZoom: false,
                keyboard: false
            }).setView([${latitude}, ${longitude}], 16);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            
            const marker = L.marker([${latitude}, ${longitude}]).addTo(map);
            marker.bindPopup('${title}');
            
            map.on('click', function() {
                window.ReactNativeWebView.postMessage(JSON.stringify({type: 'mapClick'}));
            });
            
            marker.on('click', function() {
                window.ReactNativeWebView.postMessage(JSON.stringify({type: 'markerClick'}));
            });
        </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        source={{ html: mapHtml }}
        style={styles.map}
        onMessage={handleWebViewMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
      
      <Portal>
        <Modal
          visible={showNavigationModal}
          onDismiss={() => setShowNavigationModal(false)}
          contentContainerStyle={styles.modalContent}
        >
          <Card style={styles.navigationCard}>
            <Card.Content>
              <View style={styles.modalHeader}>
                <MaterialIcons name="navigation" size={24} color="#A78BFA" />
                <Text variant="titleMedium" style={styles.modalTitle}>
                  Abrir navegação
                </Text>
                <IconButton
                  icon="close"
                  size={20}
                  onPress={() => setShowNavigationModal(false)}
                  style={styles.closeButton}
                />
              </View>
              
              <Text style={styles.addressText}>{address}</Text>
              
              <View style={styles.navigationOptions}>
                <Button
                  mode="outlined"
                  onPress={() => handleNavigationOption('googlemaps')}
                  style={styles.navigationButton}
                  icon={() => <MaterialIcons name="map" size={20} color="#4285F4" />}
                  labelStyle={styles.buttonLabel}
                >
                  Google Maps
                </Button>
                
                {Platform.OS === 'ios' && (
                  <Button
                    mode="outlined"
                    onPress={() => handleNavigationOption('apple')}
                    style={styles.navigationButton}
                    icon={() => <MaterialIcons name="map" size={20} color="#007AFF" />}
                    labelStyle={styles.buttonLabel}
                  >
                    Apple Maps
                  </Button>
                )}
                
                <Button
                  mode="outlined"
                  onPress={() => handleNavigationOption('waze')}
                  style={styles.navigationButton}
                  icon={() => <MaterialIcons name="navigation" size={20} color="#00BFFF" />}
                  labelStyle={styles.buttonLabel}
                >
                  Waze
                </Button>
                
                <Button
                  mode="outlined"
                  onPress={() => handleNavigationOption('uber')}
                  style={styles.navigationButton}
                  icon={() => <MaterialIcons name="local-taxi" size={20} color="#000000" />}
                  labelStyle={styles.buttonLabel}
                >
                  Uber
                </Button>
              </View>
            </Card.Content>
          </Card>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  map: {
    flex: 1,
  },
  modalContent: {
    margin: 20,
  },
  navigationCard: {
    borderRadius: 16,
    backgroundColor: '#fff',
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalTitle: {
    flex: 1,
    marginLeft: 8,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  closeButton: {
    margin: 0,
  },
  addressText: {
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 18,
  },
  navigationOptions: {
    gap: 8,
  },
  navigationButton: {
    borderRadius: 8,
    borderColor: '#E5E7EB',
    marginBottom: 4,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
});

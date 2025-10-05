
import { useState, useEffect } from 'react';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
}

export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: false,
  });

  const requestLocation = (): Promise<{ latitude: number; longitude: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocalização não é suportada neste navegador'));
        return;
      }

      setState(prev => ({ ...prev, loading: true, error: null }));

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setState({
            latitude,
            longitude,
            error: null,
            loading: false,
          });
          resolve({ latitude, longitude });
        },
        (error) => {
          let errorMessage = 'Erro ao obter localização';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Permissão de localização negada pelo usuário';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Informação de localização indisponível';
              break;
            case error.TIMEOUT:
              errorMessage = 'Tempo limite para obter localização excedido';
              break;
          }

          setState({
            latitude: null,
            longitude: null,
            error: errorMessage,
            loading: false,
          });
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    });
  };

  const clearLocation = () => {
    setState({
      latitude: null,
      longitude: null,
      error: null,
      loading: false,
    });
  };

  return {
    ...state,
    requestLocation,
    clearLocation,
    hasLocation: state.latitude !== null && state.longitude !== null,
  };
};

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// ✅ Substitua por um destes:
// Para Windows/Linux: encontre seu IP com 'ipconfig' ou 'ifconfig'
// Para Android Emulator: use 10.0.2.2
// Para iOS Simulator: use localhost funciona
// Para dispositivo físico: use o IP da sua máquina na rede local

const getApiUrl = () => {
  // Detecta se está rodando no emulador Android
  const isAndroidEmulator = __DEV__ && Platform.OS === 'android';
  
  if (isAndroidEmulator) {
    return 'http://192.168.68.101:3000/api'; // Android Emulator
  }
  
  // Para iOS Simulator ou dispositivo físico, use seu IP local
  return 'http://192.168.68.101:3000/api'; // ⚠️ SUBSTITUA pelo seu IP
};

const API_BASE_URL = getApiUrl();

// Interceptor para adicionar token automaticamente
const makeRequest = async (endpoint: string, options: RequestInit = {}) => {
  try {
    console.log('Making request to:', `${API_BASE_URL}${endpoint}`);
    
    const token = await AsyncStorage.getItem('authToken');
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const config = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    console.log('Request config:', config);

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Error response:', errorText);
      
      let error;
      try {
        error = JSON.parse(errorText);
      } catch {
        error = { message: errorText || 'Erro na requisição' };
      }
      
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Response data:', data);
    return data;
    
  } catch (error) {
    console.error('Request error:', error);
    throw error;
  }
};

export default makeRequest;
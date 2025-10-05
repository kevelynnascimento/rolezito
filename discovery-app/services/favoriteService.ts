import makeRequest from './api';
import { Place } from './placeService';

export const favoriteService = {
  getAll: async (): Promise<Place[]> => {
    return makeRequest('/favorites');
  },

  add: async (placeId: string): Promise<{ message: string }> => {
    return makeRequest(`/favorites/${placeId}`, {
      method: 'POST',
    });
  },

  remove: async (placeId: string): Promise<{ message: string }> => {
    return makeRequest(`/favorites/${placeId}`, {
      method: 'DELETE',
    });
  },

  check: async (placeId: string): Promise<{ isFavorite: boolean }> => {
    return makeRequest(`/favorites/${placeId}/check`);
  },
};
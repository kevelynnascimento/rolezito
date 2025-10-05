import makeRequest from './api';
import { Place } from './placeService';

export interface CreateReviewRequest {
  rating: number;
  comment: string;
}

export const reviewService = {
  create: async (placeId: string, data: CreateReviewRequest) => {
    return makeRequest(`/places/${placeId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getByPlace: async (placeId: string, rating?: number) => {
    const query = rating ? `?rating=${rating}` : '';
    return makeRequest(`/places/${placeId}/reviews${query}`);
  },
};
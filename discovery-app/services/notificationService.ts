import makeRequest from './api';

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  placeId?: string;
  createdAt: string;
}

export const notificationService = {
  getAll: async (): Promise<Notification[]> => {
    return makeRequest('/notifications');
  },

  markAsRead: async (id: string): Promise<{ message: string }> => {
    return makeRequest(`/notifications/${id}/read`, {
      method: 'PATCH',
    });
  },
};
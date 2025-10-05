import makeRequest from './api';

export interface Category {
  id: string;
  name: string;
  icon: string;
  filters?: Array<{ id: string; label: string }>;
}

export const categoryService = {
  getAll: async (): Promise<Category[]> => {
    return makeRequest('/categories');
  },

  create: async (data: Omit<Category, 'id'>): Promise<Category> => {
    return makeRequest('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
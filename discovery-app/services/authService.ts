import makeRequest from './api';

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phone?: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    return makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    return makeRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
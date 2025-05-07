import axios from 'axios';

// Base URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

export const authService = {
  // User registration
  register: async (userData) => {
    return axios.post(`${API_URL}/auth/register`, userData);
  },

  // User login
  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data; // { token, user }
  },

  // Get current user profile
  getMe: async (token) => {
    return axios.get(`${API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};

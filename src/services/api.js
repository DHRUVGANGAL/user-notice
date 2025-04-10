// src/services/api.js
import axios from 'axios';

import { API_URL } from '../config';
// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL, // Adjust this to your backend URL
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API calls
export const signUp = async (userData) => {
  const response = await api.post('/signup', userData);
  return response.data;
};

export const signIn = async (credentials) => {
  const response = await api.post('/signin', credentials);
  return response.data;
};

// Notices API calls
export const fetchNotices = async () => {
  const response = await api.get('/notices');
  return response.data;
};

export default api;
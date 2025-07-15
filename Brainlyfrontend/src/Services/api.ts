import axios from 'axios';

// FIX: Changed to a named export for better clarity and to avoid default export issues.
export const api = axios.create({
  baseURL: '/api/v1',
});

// This interceptor will automatically add the JWT token to the
// 'Authorization' header of every outgoing request if the token exists.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    // Note: Your backend expects the token directly, not with a "Bearer" prefix.
    config.headers.Authorization = token;
  }
  return config;
});

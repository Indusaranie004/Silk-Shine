// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1.0';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for auth tokens if needed
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export const UserService = {
  create: (userData) => {
    const endpoint = `/${userData.role.toLowerCase()}/register`;
    return api.post(endpoint, userData);
  },
  login: (credentials) => api.post('/auth/login', credentials),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (resetData) => api.post('/auth/reset-password', resetData),
};

export const ClientService = {
  // Get all clients
  getAllClients: () => api.get('/admin/clients'),
  
  // Delete client
  deleteClient: (clientId) => api.delete(`/admin/clients/${clientId}`),
  
  // Search clients
  searchClients: (searchTerm) => api.get(`/admin/clients/search?name=${encodeURIComponent(searchTerm)}`),
  
  /* // Get client by ID
  getClientById: (clientId) => api.get(`/admin/clients/${clientId}`),
  
  // Create new client
  createClient: (clientData) => api.post('/admin/clients', clientData),
  
  // Update client
  updateClient: (clientId, clientData) => api.put(`/admin/clients/${clientId}`, clientData) */
};

export const StaffService = {
  getAllStaff: () => api.get('/staff'),
  deleteStaff: (staffID) => api.delete(`/staff/${staffID}`),  // ✅ renamed
  updateStaff: (staffID, staffData) => api.patch(`/staff/${staffID}`, staffData)
};

export default api;

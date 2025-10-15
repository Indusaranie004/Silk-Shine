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
    getStaffById: (userId) => api.get(`/staff/${userId}`), // ✅ add this

  deleteStaff: (staffID) => api.delete(`/staff/${staffID}`),  // ✅ renamed
  updateStaff: (staffID, staffData) => api.put(`/staff/${staffID}`, staffData)
};

// src/services/api.js
export const ServiceAPI = {
  // Get all services
  getAll: () => api.get('/services'),

  // Create service (with image upload)
  create: (formData) =>
    api.post('/services', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  // Update service
  update: (id, formData) =>
    api.put(`/services/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  // Delete service
  delete: (id) => api.delete(`/services/${id}`),

  // Search services by category (optional)
  searchByCategory: (category) => api.get(`/services/category/${category}`),
}

export const ClientProfileAPI = {
  getProfile: (userId) => api.get(`/client/profile/${userId}`),
  updateProfile: (userId, profileData) => api.put(`/client/profile/${userId}`, profileData),
  deleteProfile: (userId) => api.delete(`/client/profile/${userId}`)
};






export default api;

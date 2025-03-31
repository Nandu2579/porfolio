// In a file like src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? '/api' // In production, relative URL works if served from same domain
    : 'http://localhost:5000/api' // Development server URL
});

export default api;
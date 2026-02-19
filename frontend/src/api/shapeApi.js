import axios from 'axios';

/**
 * Axios instance pre-configured with the backend base URL.
 */
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const ShapeAPI = {
  
  getAllShapes: () => api.get('/shapes'),

  getShapeById: (id) => api.get(`/shapes/${id}`),

  createShape: (shapeData) => api.post('/shapes', shapeData),

  updateShape: (id, shapeData) => api.put(`/shapes/${id}`, shapeData),

  deleteShape: (id) => api.delete(`/shapes/${id}`),
};

export default ShapeAPI;

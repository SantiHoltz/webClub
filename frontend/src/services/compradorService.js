import axios from 'axios';
import { API_BASE_URL, axiosConfig } from '../config/api.config.js';

// Crear instancia de axios con configuración
const apiClient = axios.create(axiosConfig);

const compradorService = {
  // Obtener todos los compradores
  async obtenerCompradores() {
    try {
      const response = await apiClient.get('/compradores');
      return response.data;
    } catch (error) {
      console.error('Error al obtener compradores:', error);
      throw error;
    }
  },

  // Obtener un comprador por número de cuadrícula
  async obtenerCompradorPorCuadricula(cuadricula) {
    try {
      const response = await apiClient.get(`/compradores/${cuadricula}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener comprador de cuadrícula ${cuadricula}:`, error);
      throw error;
    }
  },

  // Crear un nuevo comprador
  async crearComprador(comprador) {
    try {
      const response = await apiClient.post('/compradores', comprador);
      return response.data;
    } catch (error) {
      console.error('Error al crear comprador:', error);
      throw error;
    }
  },

  // Actualizar un comprador
  async actualizarComprador(cuadricula, datos) {
    try {
      const response = await apiClient.put(`/compradores/${cuadricula}`, datos);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar comprador de cuadrícula ${cuadricula}:`, error);
      throw error;
    }
  },

  // Eliminar un comprador
  async eliminarComprador(cuadricula) {
    try {
      const response = await apiClient.delete(`/compradores/${cuadricula}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar comprador de cuadrícula ${cuadricula}:`, error);
      throw error;
    }
  }
};

export default compradorService; 
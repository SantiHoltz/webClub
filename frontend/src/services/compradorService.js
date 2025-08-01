import axios from 'axios';

// Configuración base de axios
const API_BASE_URL = 'http://localhost:3000';

const compradorService = {
  // Obtener todos los compradores
  async obtenerCompradores() {
    try {
      const response = await axios.get(`${API_BASE_URL}/compradores`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener compradores:', error);
      throw error;
    }
  },

  // Obtener un comprador por número de cuadrícula
  async obtenerCompradorPorCuadricula(cuadricula) {
    try {
      const response = await axios.get(`${API_BASE_URL}/compradores/${cuadricula}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener comprador de cuadrícula ${cuadricula}:`, error);
      throw error;
    }
  },

  // Crear un nuevo comprador
  async crearComprador(comprador) {
    try {
      const response = await axios.post(`${API_BASE_URL}/compradores`, comprador);
      return response.data;
    } catch (error) {
      console.error('Error al crear comprador:', error);
      throw error;
    }
  },

  // Actualizar un comprador
  async actualizarComprador(cuadricula, datos) {
    try {
      const response = await axios.put(`${API_BASE_URL}/compradores/${cuadricula}`, datos);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar comprador de cuadrícula ${cuadricula}:`, error);
      throw error;
    }
  },

  // Eliminar un comprador
  async eliminarComprador(cuadricula) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/compradores/${cuadricula}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar comprador de cuadrícula ${cuadricula}:`, error);
      throw error;
    }
  }
};

export default compradorService; 
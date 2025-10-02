// Configuración de la API según el entorno
const API_CONFIG = {
  // Desarrollo local
  development: {
    baseURL: 'http://localhost:3000',
    timeout: 10000
  },
  // Producción en Render
  production: {
    baseURL: 'https://webclub-ia76.onrender.com',
    timeout: 15000
  }
};

// Determinar el entorno actual
const isDevelopment = import.meta.env.MODE === 'development';

// Exportar la configuración del entorno actual
export const currentConfig = API_CONFIG[isDevelopment ? 'development' : 'production'];

// Exportar la URL base para uso directo
export const API_BASE_URL = currentConfig.baseURL;

// Configuración completa para axios
export const axiosConfig = {
  baseURL: currentConfig.baseURL,
  timeout: currentConfig.timeout,
  headers: {
    'Content-Type': 'application/json'
  }
};

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import compradorService from '../services/compradorService';
import './Admin.css';

const Admin = () => {
  const [nombre, setNombre] = useState('');
  const [metros, setMetros] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [compradores, setCompradores] = useState([]);
  const [cuadriculaEliminar, setCuadriculaEliminar] = useState('');
  const [isLoadingEliminar, setIsLoadingEliminar] = useState(false);
  const navigate = useNavigate();

  // Verificar autenticación al cargar la página
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      cargarCompradores();
    }
  }, [navigate]);

  const cargarCompradores = async () => {
    try {
      const compradoresData = await compradorService.obtenerCompradores();
      setCompradores(compradoresData);
    } catch (error) {
      console.error('Error al cargar compradores:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!nombre.trim() || !metros.trim()) {
      setError('Por favor completa todos los campos');
      return;
    }

    const cantidadMetros = parseInt(metros);
    if (isNaN(cantidadMetros) || cantidadMetros <= 0) {
      setError('La cantidad de metros debe ser un número positivo');
      return;
    }

    setIsLoading(true);
    setError('');
    setMensaje('');

    try {
      // Crear un comprador por cada metro cuadrado
      for (let i = 0; i < cantidadMetros; i++) {
        const nuevoComprador = {
          nombre: nombre
          // No especificamos cuadricula para que el backend asigne automáticamente
        };
        
        await compradorService.crearComprador(nuevoComprador);
      }

      setMensaje(`Se crearon ${cantidadMetros} compradores exitosamente`);
      setNombre('');
      setMetros('');
    } catch (error) {
      setError('Error al crear los compradores. Por favor intenta de nuevo.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEliminar = async (e) => {
    e.preventDefault();
    
    if (!cuadriculaEliminar.trim()) {
      setError('Por favor ingresa un número de cuadrícula');
      return;
    }

    const cuadricula = parseInt(cuadriculaEliminar);
    if (isNaN(cuadricula) || cuadricula <= 0) {
      setError('El número de cuadrícula debe ser un número positivo');
      return;
    }

    setIsLoadingEliminar(true);
    setError('');
    setMensaje('');

    try {
      await compradorService.eliminarComprador(cuadricula);
      setMensaje(`Comprador de cuadrícula ${cuadricula} eliminado exitosamente`);
      setCuadriculaEliminar('');
      cargarCompradores(); // Recargar la lista
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError(`No existe un comprador con la cuadrícula ${cuadricula}`);
      } else {
        setError('Error al eliminar el comprador. Por favor intenta de nuevo.');
      }
      console.error('Error:', error);
    } finally {
      setIsLoadingEliminar(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Panel de Administración</h1>
        <button onClick={handleLogout} className="logout-button">
          Cerrar Sesión
        </button>
      </div>

      <div className="admin-content">
        <div className="form-card">
          <h2>Crear Nuevos Compradores</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre del Comprador:</label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingresa el nombre del comprador"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="metros">Cantidad de Metros Cuadrados:</label>
              <input
                type="number"
                id="metros"
                value={metros}
                onChange={(e) => setMetros(e.target.value)}
                placeholder="Ingresa la cantidad de metros"
                min="1"
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}
            {mensaje && <div className="success-message">{mensaje}</div>}

            <button 
              type="submit" 
              className="create-button"
              disabled={isLoading}
            >
              {isLoading ? 'Creando...' : 'Crear Compradores'}
            </button>
          </form>
        </div>

        <div className="form-card">
          <h2>Eliminar Comprador</h2>
          <form onSubmit={handleEliminar}>
            <div className="form-group">
              <label htmlFor="cuadriculaEliminar">Número de Cuadrícula:</label>
              <input
                type="number"
                id="cuadriculaEliminar"
                value={cuadriculaEliminar}
                onChange={(e) => setCuadriculaEliminar(e.target.value)}
                placeholder="Ingresa el número de cuadrícula a eliminar"
                min="1"
                required
              />
            </div>

            <button 
              type="submit" 
              className="delete-button"
              disabled={isLoadingEliminar}
            >
              {isLoadingEliminar ? 'Eliminando...' : 'Eliminar Comprador'}
            </button>
          </form>
        </div>

        <div className="form-card">
          <h2>Lista de Compradores</h2>
          <div className="compradores-list">
            {compradores.length === 0 ? (
              <p className="no-compradores">No hay compradores registrados</p>
            ) : (
              <div className="compradores-grid">
                {compradores.map((comprador) => (
                  <div key={comprador.cuadricula} className="comprador-item">
                    <span className="cuadricula">#{comprador.cuadricula}</span>
                    <span className="nombre">{comprador.nombre}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin; 
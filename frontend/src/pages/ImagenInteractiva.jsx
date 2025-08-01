import React, { useState, useEffect } from 'react';
import imagenCancha from '../assets/img/Cancha.png';
import compradorService from '../services/compradorService';
import './ImagenInteractiva.css';

const ImagenInteractiva = () => {
  const [hoveredSquare, setHoveredSquare] = useState(null);
  const [compradores, setCompradores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar compradores al montar el componente
  useEffect(() => {
    const cargarCompradores = async () => {
      try {
        setLoading(true);
        const datos = await compradorService.obtenerCompradores();
        setCompradores(datos);
        setError(null);
      } catch (err) {
        console.error('Error al cargar compradores:', err);
        setError('Error al cargar los datos de compradores');
      } finally {
        setLoading(false);
      }
    };

    cargarCompradores();
  }, []);

  // Función para obtener el nombre de la persona por número de cuadrado
  const obtenerPersona = (numeroCuadrado) => {
    const comprador = compradores.find(c => c.cuadricula === numeroCuadrado);
    return comprador ? comprador.nombre : "Disponible";
  };

  // Función para verificar si un cuadrado está comprado
  const estaComprado = (numeroCuadrado) => {
    return compradores.some(c => c.cuadricula === numeroCuadrado);
  };

  // Función para calcular la posición del tooltip
  const calcularPosicionTooltip = (numeroCuadrado) => {
    // Lógica para numeración horizontal (como en el código original)
    const columna = (numeroCuadrado - 1) % columnas;
    
    // Determinar si está cerca de los bordes
    const estaEnBordeIzquierdo = columna < 3;
    const estaEnBordeDerecho = columna > columnas - 4;
    
    let posicion = {
      top: '-45px',
      bottom: 'auto',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000
    };
    
    // Solo ajustar posición horizontal para evitar que se salga
    if (estaEnBordeIzquierdo) {
      // Si está en el borde izquierdo, ajustar hacia la derecha
      posicion.left = '0%';
      posicion.transform = 'translateX(0)';
    } else if (estaEnBordeDerecho) {
      // Si está en el borde derecho, ajustar hacia la izquierda
      posicion.left = '100%';
      posicion.transform = 'translateX(-100%)';
    } else {
      // Posición centrada
      posicion.left = '50%';
      posicion.transform = 'translateX(-50%)';
    }
    
    return posicion;
  };



  const filas = 19; // 19 filas de tablas horizontales
  const columnas = 32; // 32 tablas verticales por fila
  const totalCuadrados = filas * columnas; // 608 cuadrados totales

  // Crear array de cuadrados
  const cuadrados = Array.from({ length: totalCuadrados }, (_, index) => index + 1);

  // Mostrar loading mientras se cargan los datos
  if (loading) {
    return (
      <div className="imagen-interactiva-container">
        <h2>Cancha Club Argentino - Marcos Juárez</h2>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Cargando datos de compradores...</p>
        </div>
      </div>
    );
  }

  // Mostrar error si hay algún problema
  if (error) {
    return (
      <div className="imagen-interactiva-container">
        <h2>Cancha Club Argentino - Marcos Juárez</h2>
        <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
          <p>Error al cargar los datos: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="imagen-interactiva-container">
      <h2>Cancha Club Argentino - Marcos Juárez</h2>
      <p>Pasa el mouse sobre las tablas de la cancha para ver quién las compró</p>
      
      <div className="imagen-container">
        <div className="imagen-fondo">
          <img src={imagenCancha} alt="Cancha Club Argentino" className="imagen-principal" />
        </div>
        
        <div className="cuadricula-overlay">
          {cuadrados.map((numero) => (
            <div
              key={numero}
              className={`cuadrado ${estaComprado(numero) ? 'comprado' : 'disponible'}`}
              onMouseEnter={() => setHoveredSquare(numero)}
              onMouseLeave={() => setHoveredSquare(null)}
            >
              {hoveredSquare === numero && (
                <div className="tooltip" style={calcularPosicionTooltip(numero)}>
                  <span className="tooltip-text">
                    {obtenerPersona(numero)}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="estadisticas">
        <p>Total de m²: 567</p>
        <p>m² vendidos: {compradores.length}</p>
        <p>m² disponibles: {567 - compradores.length}</p>
        <p>Porcentaje de m² vendidos: {((compradores.length / 567) * 100).toFixed(2)}%</p>
        <p className="mensaje-especial">"Sumate a los que ya están dejando su huella"</p>
      </div>
    </div>
  );
};

export default ImagenInteractiva; 
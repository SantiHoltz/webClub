import React, { useState } from 'react';
import imagenCancha from '../assets/img/Cancha.png';
import './ImagenInteractiva.css';

const ImagenInteractiva = () => {
  const [hoveredSquare, setHoveredSquare] = useState(null);
  
  const personas = [
    { id: 1, nombre: "Juan Pérez", cuadrado: 1 },
    { id: 2, nombre: "María García", cuadrado: 33 },
    { id: 3, nombre: "Carlos López", cuadrado: 65 },
    { id: 4, nombre: "Ana Martínez", cuadrado: 97 },
    { id: 5, nombre: "Luis Rodríguez", cuadrado: 129 },
    { id: 6, nombre: "Sofia Torres", cuadrado: 161 },
    { id: 7, nombre: "Diego Silva", cuadrado: 193 },
    { id: 8, nombre: "Carmen Ruiz", cuadrado: 225 },
    { id: 9, nombre: "Roberto Morales", cuadrado: 257 },
    { id: 10, nombre: "Patricia Vargas", cuadrado: 289 },
    { id: 11, nombre: "Miguel Herrera", cuadrado: 321 },
    { id: 12, nombre: "Laura Mendoza", cuadrado: 353 },
    { id: 13, nombre: "Fernando Castro", cuadrado: 385 },
    { id: 14, nombre: "Isabel Rojas", cuadrado: 417 },
    { id: 15, nombre: "Ricardo Vega", cuadrado: 449 },
    { id: 16, nombre: "Elena Morales", cuadrado: 481 },
    { id: 17, nombre: "Pedro Jiménez", cuadrado: 513 },
    { id: 18, nombre: "Carmen López", cuadrado: 545 },
    { id: 19, nombre: "Roberto Silva", cuadrado: 577 },
    { id: 20, nombre: "Ana García", cuadrado: 609 },
    { id: 21, nombre: "Carlos Ruiz", cuadrado: 2 },
    { id: 22, nombre: "María López", cuadrado: 34 },
    { id: 23, nombre: "Roberto Torres", cuadrado: 66 },
    { id: 24, nombre: "Carmen Silva", cuadrado: 98 },
    { id: 25, nombre: "Fernando Morales", cuadrado: 130 },
    { id: 26, nombre: "Isabel Jiménez", cuadrado: 162 },
    { id: 27, nombre: "Ricardo Castro", cuadrado: 194 },
    { id: 28, nombre: "Elena Rojas", cuadrado: 226 },
    { id: 29, nombre: "Pedro Vega", cuadrado: 258 },
    { id: 30, nombre: "Laura Mendoza", cuadrado: 290 },
    { id: 31, nombre: "Miguel Herrera", cuadrado: 322 },
    { id: 32, nombre: "Ana García", cuadrado: 354 },
    { id: 33, nombre: "Luis Rodríguez", cuadrado: 386 },
    { id: 34, nombre: "Sofia Torres", cuadrado: 418 },
    { id: 35, nombre: "Diego Silva", cuadrado: 450 },
    { id: 36, nombre: "Carmen Ruiz", cuadrado: 482 },
    { id: 37, nombre: "Roberto Morales", cuadrado: 514 },
    { id: 38, nombre: "Patricia Vargas", cuadrado: 546 },
    { id: 39, nombre: "Miguel Herrera", cuadrado: 578 },
    { id: 40, nombre: "Laura Mendoza", cuadrado: 610 },
    { id: 41, nombre: "Fernando Castro", cuadrado: 3 },
    { id: 42, nombre: "Isabel Rojas", cuadrado: 35 },
    { id: 43, nombre: "Ricardo Vega", cuadrado: 67 },
    { id: 44, nombre: "Elena Morales", cuadrado: 99 },
    { id: 45, nombre: "Pedro Jiménez", cuadrado: 131 },
    { id: 46, nombre: "Carmen López", cuadrado: 163 },
    { id: 47, nombre: "Roberto Silva", cuadrado: 195 },
    { id: 48, nombre: "Ana García", cuadrado: 227 },
    { id: 49, nombre: "Luis Rodríguez", cuadrado: 259 },
    { id: 50, nombre: "Sofia Torres", cuadrado: 291 },
    { id: 51, nombre: "Diego Silva", cuadrado: 323 },
    { id: 52, nombre: "Carmen Ruiz", cuadrado: 355 },
    { id: 53, nombre: "Roberto Morales", cuadrado: 387 },
    { id: 54, nombre: "Patricia Vargas", cuadrado: 419 },
    { id: 55, nombre: "Miguel Herrera", cuadrado: 451 },
    { id: 56, nombre: "Laura Mendoza", cuadrado: 483 },
    { id: 57, nombre: "Fernando Castro", cuadrado: 515 },
    { id: 58, nombre: "Isabel Rojas", cuadrado: 547 },
    { id: 59, nombre: "Ricardo Vega", cuadrado: 579 },
    { id: 60, nombre: "Elena Morales", cuadrado: 611 },
    { id: 61, nombre: "Pedro Jiménez", cuadrado: 4 },
    { id: 62, nombre: "Carmen López", cuadrado: 36 },
    { id: 63, nombre: "Roberto Silva", cuadrado: 68 },
    { id: 64, nombre: "Ana García", cuadrado: 100 },
    { id: 65, nombre: "Luis Rodríguez", cuadrado: 132 },
    { id: 66, nombre: "Sofia Torres", cuadrado: 164 },
    { id: 67, nombre: "Diego Silva", cuadrado: 196 },
    { id: 68, nombre: "Carmen Ruiz", cuadrado: 228 },
    { id: 69, nombre: "Roberto Morales", cuadrado: 260 },
    { id: 70, nombre: "Patricia Vargas", cuadrado: 292 },
    { id: 71, nombre: "Miguel Herrera", cuadrado: 324 },
    { id: 72, nombre: "Laura Mendoza", cuadrado: 356 },
    { id: 73, nombre: "Fernando Castro", cuadrado: 388 },
    { id: 74, nombre: "Isabel Rojas", cuadrado: 420 },
    { id: 75, nombre: "Ricardo Vega", cuadrado: 452 },
    { id: 76, nombre: "Elena Morales", cuadrado: 484 },
    { id: 77, nombre: "Pedro Jiménez", cuadrado: 516 },
    { id: 78, nombre: "Carmen López", cuadrado: 548 },
    { id: 79, nombre: "Roberto Silva", cuadrado: 580 },
    { id: 80, nombre: "Ana García", cuadrado: 612 },
    { id: 81, nombre: "Luis Rodríguez", cuadrado: 5 },
    { id: 82, nombre: "Sofia Torres", cuadrado: 37 },
    { id: 83, nombre: "Diego Silva", cuadrado: 69 },
    { id: 84, nombre: "Carmen Ruiz", cuadrado: 101 },
    { id: 85, nombre: "Roberto Morales", cuadrado: 133 },
    { id: 86, nombre: "Patricia Vargas", cuadrado: 165 },
    { id: 87, nombre: "Miguel Herrera", cuadrado: 197 },
    { id: 88, nombre: "Laura Mendoza", cuadrado: 229 },
    { id: 89, nombre: "Fernando Castro", cuadrado: 261 },
    { id: 90, nombre: "Isabel Rojas", cuadrado: 293 },
    { id: 91, nombre: "Ricardo Vega", cuadrado: 325 },
    { id: 92, nombre: "Elena Morales", cuadrado: 357 },
    { id: 93, nombre: "Pedro Jiménez", cuadrado: 389 },
    { id: 94, nombre: "Carmen López", cuadrado: 421 },
    { id: 95, nombre: "Roberto Silva", cuadrado: 453 },
    { id: 96, nombre: "Ana García", cuadrado: 485 },
    { id: 97, nombre: "Luis Rodríguez", cuadrado: 517 },
    { id: 98, nombre: "Sofia Torres", cuadrado: 549 },
    { id: 99, nombre: "Diego Silva", cuadrado: 581 },
    { id: 100, nombre: "Carmen Ruiz", cuadrado: 613 },
    { id: 101, nombre: "Roberto Morales", cuadrado: 6 },
    { id: 102, nombre: "Patricia Vargas", cuadrado: 38 },
    { id: 103, nombre: "Miguel Herrera", cuadrado: 70 },
    { id: 104, nombre: "Laura Mendoza", cuadrado: 102 },
    { id: 105, nombre: "Fernando Castro", cuadrado: 134 },
    { id: 106, nombre: "Isabel Rojas", cuadrado: 166 },
    { id: 107, nombre: "Ricardo Vega", cuadrado: 198 },
    { id: 108, nombre: "Elena Morales", cuadrado: 230 },
    { id: 109, nombre: "Pedro Jiménez", cuadrado: 262 },
    { id: 110, nombre: "Carmen López", cuadrado: 294 },
    { id: 111, nombre: "Roberto Silva", cuadrado: 326 },
    { id: 112, nombre: "Ana García", cuadrado: 358 },
    { id: 113, nombre: "Luis Rodríguez", cuadrado: 390 },
    { id: 114, nombre: "Sofia Torres", cuadrado: 422 },
    { id: 115, nombre: "Diego Silva", cuadrado: 454 },
    { id: 116, nombre: "Carmen Ruiz", cuadrado: 486 },
    { id: 117, nombre: "Roberto Morales", cuadrado: 518 },
    { id: 118, nombre: "Patricia Vargas", cuadrado: 550 },
    { id: 119, nombre: "Miguel Herrera", cuadrado: 582 },
    { id: 120, nombre: "Laura Mendoza", cuadrado: 614 },
    // ... puedes agregar más personas según necesites
  ];

  // Función para obtener el nombre de la persona por número de cuadrado
  const obtenerPersona = (numeroCuadrado) => {
    const persona = personas.find(p => p.cuadrado === numeroCuadrado);
    return persona ? persona.nombre : "Disponible";
  };

  // Función para verificar si un cuadrado está comprado
  const estaComprado = (numeroCuadrado) => {
    return personas.some(p => p.cuadrado === numeroCuadrado);
  };

  // Función para calcular la posición del tooltip
  const calcularPosicionTooltip = (numeroCuadrado) => {
    const fila = Math.floor((numeroCuadrado - 1) / columnas);
    const columna = (numeroCuadrado - 1) % columnas;
    
    // Determinar si está cerca de los bordes
    const estaEnBordeIzquierdo = columna < 3;
    const estaEnBordeDerecho = columna > columnas - 4;
    const estaEnBordeInferior = fila > filas - 3;
    
    let posicion = {
      top: estaEnBordeInferior ? '-45px' : 'auto',
      bottom: estaEnBordeInferior ? 'auto' : '-45px',
      left: '50%',
      transform: 'translateX(-50%)'
    };
    
    // Ajustar posición horizontal si está cerca de los bordes
    if (estaEnBordeIzquierdo) {
      posicion.left = '0';
      posicion.transform = 'translateX(0)';
    } else if (estaEnBordeDerecho) {
      posicion.left = 'auto';
      posicion.right = '0';
      posicion.transform = 'translateX(0)';
    }
    
    return posicion;
  };

  const filas = 19; // 19 filas de tablas horizontales
  const columnas = 32; // 32 tablas verticales por fila
  const totalCuadrados = filas * columnas; // 608 cuadrados totales

  // Crear array de cuadrados
  const cuadrados = Array.from({ length: totalCuadrados }, (_, index) => index + 1);

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
        <p>m² vendidos: {personas.length}</p>
        <p>m² disponibles: {567 - personas.length}</p>
        <p>Porcentaje de m² vendidos: {(personas.length / 567 * 100).toFixed(2)}%</p>
        <p className="mensaje-especial">"Sumate a los que ya están dejando su huella"</p>
      </div>
    </div>
  );
};

export default ImagenInteractiva; 
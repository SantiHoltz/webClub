import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import './Encabezado.css';

const Encabezado = () => {
  return (
    <header className="encabezado">
      <div className="encabezado-container">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-imagen" />
          <h1>Argentino de Marcos Juarez</h1>
        </div>
        
        <nav className="navegacion">
          <ul className="nav-lista">
            <li className="nav-item">
              <NavLink 
                to="/" 
                className={({ isActive }) => `nav-link ${isActive ? 'nav-link-activo' : ''}`}
              >
                Presentación
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/cuadrados" 
                className={({ isActive }) => `nav-link ${isActive ? 'nav-link-activo' : ''}`}
              >
                Progreso
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/comprar" 
                className={({ isActive }) => `nav-link ${isActive ? 'nav-link-activo' : ''}`}
              >
                Comprar
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Encabezado;

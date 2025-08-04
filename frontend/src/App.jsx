import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Encabezado from './components/Encabezado'
import ImagenInteractiva from './pages/ImagenInteractiva'
import Presentacion from './pages/Presentacion'
import Comprar from './pages/Comprar'
import './App.css'


function App() {
  return (
    <Router>
      <div className="App">
        <Encabezado />
        <Routes>
          <Route path="/" element={<Presentacion />} />
          <Route path="/cuadrados" element={<ImagenInteractiva />} />
          <Route path="/comprar" element={<Comprar />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

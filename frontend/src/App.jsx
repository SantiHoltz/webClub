import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Encabezado from './components/Encabezado'
import ImagenInteractiva from './pages/ImagenInteractiva'
import Presentacion from './pages/Presentacion'
import Comprar from './pages/Comprar'
import Login from './pages/Login'
import Admin from './pages/Admin'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'


function App() {
  return (
    <Router>
      <div className="App">
        <Encabezado />
        <Routes>
          <Route path="/" element={<Navigate to="/presentacion" />} />
          <Route path="/presentacion" element={<Presentacion />} />
          <Route path="/cuadrados" element={<ImagenInteractiva />} />
          <Route path="/comprar" element={<Comprar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

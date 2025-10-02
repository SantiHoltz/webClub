import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Ruta principal de prueba
app.get("/", (req, res) => {
  const currentUrl = req.protocol + '://' + req.get('host');
  res.send(`
    <html>
      <head>
        <title>Servidor Express</title>
        <style>
          body { background-color: #f2f2f2; font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
          .container { background: #fff; padding: 2rem; border-radius: 12px; box-shadow: 0 0 12px rgba(0,0,0,0.1); text-align: center; }
          .status { color: green; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🚀 API Funcionando</h1>
          <p>URL: <strong>${currentUrl}</strong></p>
          <p>Estado: <span class="status">✅ Activo</span></p>
          <p>Entorno: <strong>${process.env.NODE_ENV || 'development'}</strong></p>
          <hr>
          <h3>Rutas disponibles:</h3>
          <ul style="text-align: left; display: inline-block;">
            <li>GET / - Esta página</li>
            <li>GET /test - Prueba simple</li>
            <li>GET /health - Estado del servidor</li>
          </ul>
        </div>
      </body>
    </html>
  `);
});

// Ruta de prueba simple
app.get("/test", (req, res) => {
  res.json({ 
    message: "Backend funcionando correctamente", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Ruta de health check
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// Middleware para manejar errores
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    console.error('Error de JSON:', error.message);
    return res.status(400).json({ 
      error: 'JSON inválido', 
      message: error.message
    });
  }
  next();
});

// Ruta 404 personalizada
app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    message: `La ruta ${req.method} ${req.path} no existe`,
    availableRoutes: ["/", "/test", "/health"]
  });
});

// Iniciar servidor solo si no estamos en Vercel
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor iniciado en puerto ${PORT}`);
  });
}

// Exportar para Vercel
export default app;

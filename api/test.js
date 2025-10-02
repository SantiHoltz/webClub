import express from 'express';
import cors from "cors";

const app = express();

// Middleware
app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Ruta principal de prueba
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>API Test</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 2rem; }
          .success { color: green; font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>🚀 API Funcionando</h1>
        <p class="success">✅ Servidor Express activo</p>
        <p>Timestamp: ${new Date().toISOString()}</p>
        <p>Entorno: ${process.env.NODE_ENV || 'development'}</p>
      </body>
    </html>
  `);
});

// Ruta de prueba
app.get("/test", (req, res) => {
  res.json({ 
    message: "API funcionando correctamente", 
    timestamp: new Date().toISOString(),
    status: "OK"
  });
});

// Exportar para Vercel
export default app;
